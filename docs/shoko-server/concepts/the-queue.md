---
title: The Queue
description: "How Shoko's queue runs its background work, why tasks wait even when the queue isn't empty, and what pausing, clearing, restarts and holds do to it."
---

# The Queue

Almost everything Shoko does in the background goes through one queue. Hashing a new file, asking AniDB which
episode it is, fetching the anime, linking it to TMDB, downloading images, renaming and moving the file: each of those
is a **task**, and each task waits its turn in the queue until a worker is free to run it.

The queue is kept in a database of its own, so it survives a restart. It's also not a simple line. Tasks that need
AniDB wait for AniDB, tasks that need the internet wait for the internet, and some kinds of task only run a few at a
time, so it's normal to see work waiting while other work goes past it. This page explains what decides that, so you
can tell a queue that's busy from one that's stuck.

## What Goes Through the Queue

A file added to a managed folder starts a chain of tasks, each queuing the next: scanning, hashing, finding the release,
fetching the anime, then the metadata and images from every linked source. See
[How Files Are Imported](/shoko-server/concepts/how-files-are-imported) for that chain.

The rest comes from three places:

- **Things you do in the Web UI.** Refreshing a series, rehashing files or running AVDump queues tasks rather than
  doing the work while you wait, and so does fetching the anime after you link a file by hand.
- **[Quick actions](/shoko-server/actions)**, which queue a batch of work once, when you click them.
- **[Scheduled actions](/shoko-server/settings/scheduled-actions)**, which queue their work whenever one of their
  triggers fires: every so often, at a time of day, at start-up, or when the queue is cleared. This is where all of
  Shoko's recurring work comes from, such as checking AniDB for file updates once a day. A scheduled action's run
  shows up in the queue as **Scheduled Action**, titled with the action's name.

## The Queue Processor Panel

The **Queue Processor** panel on the [dashboard](/shoko-server/dashboard) shows the queue as it changes. Its title
reads like this:

`Queue Processor | 3 / 20 Workers | 433 Tasks`

| Part | What it means |
| --- | --- |
| **3 / 20 Workers** | Tasks running right now, out of the most that can run at once. The second number is your CPU's thread count plus four |
| **433 Tasks** | Tasks running plus tasks waiting, including the ones that can't run yet |
| **Paused** | Only shown while the queue is paused |

Below the title is the list. Running tasks come first, each with its title (such as **Hashing File**), the time it
started and a clock icon. Waiting tasks follow, each with its type (such as **Hash File** or **Download Image**), in
roughly the order they'll run, so the same task reads **Hashing File** while it runs and **Hash File** while it waits.
Each entry has a line of details underneath, such as the file or the anime it's for. The list shows up to 100 tasks, so a long queue keeps going past the bottom of it. With nothing running or waiting, it
says **Queue is empty!**

Two icon buttons sit in the panel's header. Hover them for their names:

- **Pause All**, shown while the queue runs, and **Resume All** in its place while it's paused.
- **Clear All**, which empties the queue at once. There's no confirmation.

The number next to the server icon in the top bar (**Queue Count** when you hover it) is the same count as **Tasks**.

Only admins can pause, resume or clear the queue, and only admins see the waiting tasks in the list. Other users see
the same buttons, but the server refuses them, and they see only the counts and what's running.

:::info Blocked Tasks Look Like Waiting Ones
The panel doesn't mark which waiting tasks can't run yet. A task held back by an AniDB ban looks the same as one that's
next in line, and both count in **Tasks**. If the count stays high while the workers sit at zero, something below is
holding the tasks back.
:::

## Why Tasks Wait

A worker only takes a task that's allowed to run right now. Everything else stays in the queue, keeps its place, and
runs as soon as whatever held it back clears. Apart from holds (see
**Holding Part of the Queue** further down), which wait until they're released, none of this needs you to do anything:
the queue picks the tasks up again on its own.

### AniDB Bans and Rate Limits

AniDB has two APIs, and Shoko treats them separately:

- **The UDP API** answers which episode a file is, adds files to your MyList and a few other things. Its tasks wait
  while AniDB has banned you, while Shoko isn't logged in to AniDB (for example while the AniDB login fails), and until
  the connection to AniDB has been set up after a start.
- **The HTTP API** is where the anime data comes from. While AniDB has banned you on it, fetching anime waits until
  the ban ends, but a series can still be created when Shoko has a cached copy of the anime.

While a ban is in place, the top bar says **AniDB UDP Ban Detected!** or **AniDB HTTP Ban Detected!**. Clicking it
tells you when Shoko checks again. Tasks for the other API carry on, which is why part of an import can keep moving
while the rest stands still. Bans and how to avoid them are covered in
[Understanding AniDB Bans](/shoko-server/understanding-anidb-bans).

Even without a ban, each API only takes one task at a time, with Shoko's own pause between requests to stay under
AniDB's limits. On a large import that's the slowest part by far, and nothing makes it faster.

### No Internet Connection

Tasks that need the internet wait while Shoko thinks it's offline. The top bar then shows **No Internet Connection**;
click it to have Shoko check again. By default Shoko also checks on its own at start-up, every 30 minutes and
whenever the queue is cleared, through the **Check Network Availability** scheduled action.

### A Metadata Source That's Suspended

A source can be suspended for a while, for example when TMDB says Shoko is asking too often. Its tasks wait until the
suspension ends, while the rest of the queue runs. In **Settings** → [**Metadata**](/shoko-server/settings/metadata)
the source then shows **Suspended**, with the reason and when it resumes.

### Turns per Kind of Task

Some kinds of task only run a few at a time, however many workers are free. Hashing and reading media info run two
files at a time, since they're limited by your disks, and image downloads run four at a time. The AniDB tasks share one
turn per API, as above. A queue full of one kind of task can therefore show most workers idle: it isn't stuck, it's
working through that kind as fast as it's allowed to.

### While Shoko Starts

Tasks that need the database wait until the server has finished starting. Tasks queued before a restart sit in the
queue until then.

**Recreate All Groups** goes further: it pauses the whole queue while it runs, so the panel shows **Paused**, and
resumes it when it's done (unless you'd paused it yourself before).

## Order and Duplicates

The queue isn't first in, first out. Every kind of task has a priority, a normal one and a higher one for when it's
asked for directly. A higher priority runs first, and only tasks of the same priority run in the order they were
queued. The priorities are set so that work keeps flowing even when the queue is long:

- **Scanning folders** comes first, then **identifying files** and **renaming and moving** them, then **fetching
  anime, metadata and images**, and last the background upkeep, such as **MyList updates and votes** and purging old
  data.
- **New files go ahead of known ones.** Hashing or reading a file Shoko hasn't seen yet goes ahead of rehashing one it
  already has, and among them, **smaller files go first**.
- **What you ask for directly**, such as rehashing a file or refreshing a series, gets the higher priority and goes
  ahead of the same kind of work queued in the background.
- **A scheduled action** itself goes ahead of all of these, and the tasks it queues go in at least ahead of the lowest
  kinds of work.

Priority only orders tasks that compete for the same workers: tasks that take
[turns of their own](#turns-per-kind-of-task) run side by side. And it never takes a task past a ban, a rate limit or a
hold.

The queue never holds the same task twice. Queuing work that's already waiting or running, such as refreshing an anime
that's already about to be refreshed, adds nothing. If the new request has a higher priority, the waiting task moves
up instead. That's why running the same action twice, or a file being noticed twice, doesn't double the work.

## When a Task Fails

A task that fails with an error goes back into the queue to be tried again later. It waits 30 seconds before the first
retry, and twice as long before each one after that, up to an hour, for up to 8 retries. Each failure is logged as a
warning with the retry it's on. After the last one the task is dropped, with an error in the log saying it was
*discarded after 8 retries*.

Tasks waiting out a retry delay aren't counted in **Tasks** and don't appear in the list, so the panel can say **Queue
is empty!** while a retry is still due. They run when their time comes.

## Pausing and Clearing

**Pause All** stops the queue from starting new tasks. Tasks that are already running finish; everything else waits,
and new work still gets added. **Resume All** carries on from where it stopped. A pause only lasts until the server
restarts: after a restart the queue runs again.

**Clear All** removes every task that hasn't started, including the ones held back by a ban and the ones waiting for a
retry. Running tasks finish. It can't be undone, so it's worth knowing what you lose:

- **Lost:** the work itself. A file that was waiting to be hashed isn't in your collection yet, and a lookup or image
  download that was waiting doesn't happen. A chain of tasks loses the steps it hadn't reached yet.
- **Comes back on its own:** scheduled actions still fire on their triggers, and a few of the default ones look for
  exactly what a clear leaves behind. **Check AniDB File Updates** (daily) searches again for files with no episode,
  and **Download Missing Metadata for Files** and **Update Missing Media Info** run at the next start. Actions with a
  **When the queue is cleared** trigger are queued again right after the clear, as **Check Network Availability** is
  by default.
- **Needs you:** files that were never hashed are only found again by a scan. Run **Run Import** or **Import New
  Files** from [Actions](/shoko-server/actions), or rescan the folder.

Pausing is usually the better choice. Reach for **Clear All** when the queue is full of work you no longer want, for
example after adding the wrong folder.

## Restarts

The queue is stored as it goes, so a restart keeps it. Waiting tasks, tasks held back by a ban and tasks waiting out a
retry are all still there after the start, and pick up once the server has finished starting. A task that was running
when the server stopped either finished first or runs again after the start.

What a restart doesn't keep is a pause: the queue always starts running. Holds are kept.

:::details Holding Part of the Queue
An admin can hold part of the queue on purpose: its tasks wait, counted with the others in **Tasks**, until the hold
is released, while the rest of the queue keeps running. Running tasks finish, and holds are kept across restarts.

You can hold a single kind of task, or a whole group of workers. Each group runs certain kinds of task (all the AniDB
UDP tasks share one, for example), and the queue calls it a pool.

The Web UI has no controls for holds, so they're set through the API, for example from
[Swagger](/api/use-the-api-with-swagger):

- `GET /api/v3/Queue` lists the pools by `Name`, with the kinds of task each one runs in `HandledTypeKeys`.
- `GET /api/v3/Queue/Holds` shows what's held.
- `POST /api/v3/Queue/Holds` holds what you name, and `DELETE /api/v3/Queue/Holds` releases it. Both take a body
  like `{ "Pools": ["DownloadImageJob"], "JobTypes": [] }`, with pool names in `Pools` and kinds of task in
  `JobTypes`.

A hold on a name the queue doesn't have is refused. A hold that names something that has since gone away, such as a
plugin you uninstalled, stays listed until you release it.
:::

## What This Means for You

- **A big queue isn't a problem.** A first import of a large collection queues thousands of tasks, and the AniDB ones
  go one at a time. Let it run. See [Import a Large Collection](/shoko-server/how-to/import-a-large-collection).
- **Workers at zero with a high count means something is holding the tasks back**, usually an AniDB ban, a lost
  connection or a suspended metadata source. Look at the top bar and the [Logs](/shoko-server/logs) before restarting
  or clearing anything: a restart doesn't lift a ban, and the tasks come back anyway.
- **Clicking an action twice is harmless.** Duplicates are merged.
- **Pause rather than clear** when you only want the queue out of the way for a while.
- **Recurring work is set in one place.** To change when Shoko refreshes, scans or cleans up on its own, change the
  triggers under [Scheduled Actions](/shoko-server/settings/scheduled-actions).

## Related

- [Dashboard](/shoko-server/dashboard)
- [Actions](/shoko-server/actions)
- [Scheduled Actions](/shoko-server/settings/scheduled-actions)
- [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans)
- [How Files Are Imported](/shoko-server/concepts/how-files-are-imported)
- [Import a Large Collection](/shoko-server/how-to/import-a-large-collection)
- [Logs](/shoko-server/logs)
