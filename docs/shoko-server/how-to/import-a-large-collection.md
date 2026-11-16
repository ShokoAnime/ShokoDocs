---
title: Import a Large Collection
description: Point Shoko Server at an existing library of hundreds or thousands of files for the first time, with as few AniDB requests and bans as possible.
---

# Import a Large Collection

Pointing Shoko at a library you already have means every file has to be hashed and looked up on AniDB, and every anime
fetched from it. AniDB only allows a request every few seconds, so the import is mostly waiting on AniDB. This guide
sets Shoko up to send AniDB fewer requests, helps you follow the import, and tells you what to check once it's done.
For what each stage does, see [How Files Are Imported](/shoko-server/concepts/how-files-are-imported).

## Before You Start

- **Expect it to take a while.** Shoko keeps to AniDB's limits: two seconds between requests, and six once it has
  been busy for about ten seconds. Every new file needs one request to be looked up, and one more to be added to
  your MyList if **Add Files** is on. That's a few hundred files an hour at best, so a library of several thousand
  files takes a day or more.
- **Other release providers can speed it up.** A plugin's release provider that doesn't go through AniDB's request
  limit, placed above AniDB under
  [Auto-Linking Release Providers](/shoko-server/settings/hashing-and-release#release-provider-options), identifies the
  files it knows without an AniDB lookup, so only the rest wait for AniDB. The anime are still fetched from AniDB.
- **Keep your files on storage that stays online**, and keep Shoko running while it imports. The queue is kept across
  restarts, so a restart doesn't lose progress, but nothing gets done while Shoko is stopped.
- **Use only Shoko with AniDB while it imports.** Other tools and media server plugins that talk to AniDB can bring on
  a ban sooner. See [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans#exclusively-utilize-shoko).

## Choose Settings That Save AniDB Requests

You can set these during the first-run setup, on the **AniDB** tab of **Metadata Sources**, or later under
**Settings** → [**AniDB**](/shoko-server/settings/anidb#download-options). They're all in **Download Options** and
**MyList Options**.

1. **Leave Always Download Related Anime off and Related Depth at 1.** Both are the defaults. With **Always Download
   Related Anime** on, Shoko also fetches every anime related to the ones in your collection, as many steps away as
   **Related Depth** says, and each one is another AniDB request. [**Auto Group Series**](/shoko-server/settings/collection#relation-options)
   fetches related anime the same way, so if you turn it on, keep **Related Depth** at **1**.
2. **Consider turning Creator Images off for the import.** With it on, Shoko looks up the details of every new staff
   member and studio on AniDB, one request each, and a large collection has thousands of them. These lookups wait behind
   the file lookups, but they still add to the total. You can fetch them all after the import (see
   [Afterwards](#afterwards)).
3. **Turn Add Files off if you don't use your AniDB MyList.** With it on, every matched file gets one more AniDB request
   to add it to your MyList. If you do use your MyList, leave it on.

:::info Character Images
**Character Images** only decides whether character images are downloaded. It doesn't add lookups like
**Creator Images** does, since the characters come with the anime itself.
:::

## Add Your Folders

How you add your folders decides when Shoko starts scanning them:

- **Finish**, at the end of the first-run setup, scans every managed folder you added during the setup.
- A folder you add later, under **Settings** → [**Import**](/shoko-server/settings/import#managed-folders) or with
  **Add Folder** on the dashboard's **Managed Folders**, isn't scanned by itself. It's only scanned when you click
  **Rescan Folder** on it, or run **Import New Files** or **Run Import** from [**Actions**](/shoko-server/actions).
  **Watch For New Files** only picks up files added from then on.

Either way works, and adding everything at once doesn't send AniDB more requests in total. For a very large library,
import a part at a time:

1. During the first-run setup, add the managed folder for one part of your library, such as one drive or one
   subfolder, and click **Finish**.
2. Wait until the queue has no more lookups for that part, and check its results (see
   [Check That It Worked](#check-that-it-worked)).
3. Add the next folder with **Add Folder**, click **Rescan Folder** on it, and repeat.

A smaller part reaches the end of its lookups sooner, so its **Unrecognized Files** list soon means something, and a
problem (a wrong folder, a release AniDB doesn't know) shows up before thousands more files are queued behind it.

## Follow the Import

The dashboard's [**Queue Processor**](/shoko-server/dashboard#queue-processor) shows how many workers are busy and how
many tasks are left. Expect to see these kinds of tasks. They overlap rather than run one batch after another: each kind
runs as soon as it has work and a free worker, in the order of their
[priorities](/shoko-server/concepts/the-queue#order-and-duplicates).

| Task | What it is |
| --- | --- |
| **Scan Managed Folder** | Shoko walks through the folder and queues every video file it finds. |
| **Hash File** | Shoko reads each file to calculate its hash. Two files at a time, smaller files first. |
| **Get Release Information for Video From Provider** | The lookup on AniDB, one every few seconds. |
| **Add Entry to AniDB MyList** | Only with **Add Files** on. |
| **Get AniDB Anime Data** | Fetches a new anime and creates its series. |
| **Fetch AniDB Creator Details** | Only with **Creator Images** on. |
| **Search Metadata**, **Refresh Metadata**, **Download Image** | Other sources such as TMDB, and images. |

While it runs:

- **Unrecognized Files grows, and that's normal.** A file is listed there as soon as it's hashed, until its lookup
  finds its release. During the import, most of the files there are still waiting for their lookup, not unrecognized.
- **Series fill in as their anime arrive.** The dashboard's [**Recently Imported**](/shoko-server/dashboard#recently-imported)
  shows the latest episodes and series.
- **Hold off on AniDB actions** such as **Update All AniDB Info**, which queues a refresh of every anime on top of the
  import.

## If AniDB Bans You

Even with Shoko keeping to AniDB's limits, a long import can get you temporarily banned. You'll see it in the top bar:

- **AniDB UDP Ban Detected!** holds file lookups, MyList updates and staff details.
- **AniDB HTTP Ban Detected!** holds fetching anime, but a series can still be created when Shoko has a cached copy of
  the anime.

Click the message to see when Shoko checks again. You don't need to do anything: Shoko stops sending AniDB requests of
that kind, the tasks that need them wait in the queue, and everything else keeps running. The queue may show thousands
of tasks and no busy workers until the ban is over. Bans last from minutes to a day; see
[Understanding AniDB Bans](/shoko-server/understanding-anidb-bans).

A UDP ban that starts while lookups are running can make a few of them come back empty, so those files show up in
**Unrecognized Files** even though AniDB knows them. They're searched again by the daily retry (see
[Afterwards](#afterwards)), or when you click **Rescan Folder** on their managed folder.

:::tip XML Cache
Shoko keeps a copy of every anime it fetches from AniDB in its `Anime_HTTP` folder, and it reads from that copy when it
can't reach AniDB's HTTP API. With the [XML cache](/shoko-server/understanding-anidb-bans#utilize-the-xml-cache) in that
folder, Shoko can keep creating series from it during an HTTP ban. Outside a ban, Shoko still asks AniDB for every new
anime, so the cache doesn't save requests.
:::

## Check That It Worked

1. Wait until the **Queue Processor** says **Queue is empty!**, or at least shows no more lookups.
2. Look through your series in the [**Collection**](/shoko-server/collection), or the **Series** tab of
   **Recently Imported**.
3. Open **Utilities** → [**Unrecognized Files**](/shoko-server/unrecognized-files). What's left there now is what
   AniDB really doesn't know, plus files that are recognized but waiting for their series, with nothing marking
   them apart. See [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files).

## Afterwards

- **Unrecognized files:** see [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file). Give them a
  day first: the **Check AniDB File Updates** scheduled action searches again for every unrecognized file that isn't
  ignored once a day, until a file has had about 15 tries, and Shoko queues the anime that recognized files are
  still waiting for at every start and once a day.
- **Staff details:** if you turned **Creator Images** off, turn it back on under **Settings** → **AniDB**. Then open
  **Settings** → [**Scheduled Actions**](/shoko-server/settings/scheduled-actions) and click the play button (**Run now**)
  on **Download Missing AniDB Creators**, which queues a lookup for every staff member and studio still missing their
  details.
- **New files from now on:** set **Watch For New Files** on your folders, or have your tools notify Shoko. See
  [Detecting New Files](/shoko-server/settings/import#detecting-new-files). To have new files sorted as they come in,
  see [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically).

## If It Didn't Work

- **A folder's files never showed up:** a folder added after the first-run setup isn't scanned until you click
  **Rescan Folder**. Also check that its **Location** is the path as Shoko sees it, for example inside its Docker
  container.
- **The queue sits idle with tasks left and no ban in the top bar:** another source may be suspended (see
  [Metadata](/shoko-server/settings/metadata#each-source)), or the queue may be paused. See
  [The Queue](/shoko-server/concepts/the-queue).
- **Nothing is looked up at all:** check your AniDB login under **Settings** → **AniDB** with **Test**. Without it,
  Shoko can't ask AniDB about your files.
- **Something else:** the log (**Log** in the top bar, see [Logs](/shoko-server/logs)) lists every step for every
  file.

## Related

- [How Files Are Imported](/shoko-server/concepts/how-files-are-imported)
- [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans)
- [The Queue](/shoko-server/concepts/the-queue)
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders)
- [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file)
- [AniDB Settings](/shoko-server/settings/anidb)
