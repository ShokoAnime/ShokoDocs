---
title: Scheduled Actions
description: "Work Shoko runs on its own: what the Scheduled Actions tab shows, how to run or cancel one, and how to set the triggers that decide when it runs."
---

# Scheduled Actions

A scheduled action is work Shoko runs on its own, on the triggers you set. The tab lists every action the server and
its plugins register, grouped by category, with what each one is doing right now and when it runs next.

This is the same kind of work as the [quick actions](/shoko-server/actions) in the top bar, with one difference that
matters: a quick action runs when you click it, while a scheduled action also runs by itself whenever one of its
triggers fires.

## What Each Action Shows

Every action is a row with its name, a state badge while it's busy, and a summary line underneath:

| On the row | What it means |
| --- | --- |
| **Waiting in Queue** | A run is queued and waiting its turn |
| **Running**, or **Running 40%** | It's running, with its progress when it reports any, and a bar under the row |
| **Cancelling** | A cancel was asked for and the action is winding down |
| `Next: October 24th, 03:00 \| Daily at 03:00` | When a trigger queues it next, and the triggers in effect |
| **Due now** | A trigger is past due, so the run is about to be queued |
| **Manual only** | It has no triggers, so nothing queues it but you |

Four buttons sit at the end of the row:

- **Run now** queues a run. It's unavailable while a run is already queued or going. An action that asks for
  confirmation shows its prompt first.
- **Cancel the current run** only appears while the action is running and can be cancelled.
- **Edit triggers** opens the [triggers modal](#setting-the-triggers).
- The chevron opens the details.

Opening a row adds its description and four times:

| Field | What it means |
| --- | --- |
| **Last Run** | The last run of any kind, by hand or by a trigger |
| **Last Run by a Trigger** | The last run a trigger started |
| **Next Run** | When the next run is due |
| **Minimum Interval** | The shortest gap allowed between runs on its own |

Below those, a line tells you whether a run by hand counts for the schedule. For most actions it doesn't, and the line
reads *"The triggers count from the last run a trigger started; a manual run is not held back."* Where it does count,
it says so instead, and the triggers then count from the last run of any kind.

## Setting the Triggers

The **Edit triggers** button opens a modal for that one action, headed by its name and marked **(Custom)** when you've
set the triggers yourself or **(Defaults)** when the action's own defaults are in effect. Under the heading is the
same summary the row shows.

Add one with the **Add Trigger…** dropdown, which offers six kinds:

| Trigger | When it runs |
| --- | --- |
| **Interval** | Every so often, as a gap in days, hours and minutes |
| **Daily** | At a time of day |
| **Weekly** | At a time of day, on the days of the week you pick |
| **Monthly** | At a time of day, on the days of the month you pick — counted from the start of the month, or from its end, where the last day is `-1` |
| **At start-up** | Each time the server starts |
| **When the queue is cleared** | Each time the queue finishes emptying |

An action can carry several triggers at once, each edited in its own block and removed with its own button. With none
left, the modal says *"No triggers. It only runs manually."* Times are in the **server's** time zone, not your
browser's, and the daily, weekly and monthly triggers have to be at least the action's minimum interval apart. The
line at the bottom names that minimum and lists the action's defaults.

Changes are a draft until you save them:

- **Save Triggers** sends your triggers and closes the modal. It stays greyed out until you've changed something, and
  if the server refuses a trigger, the reason appears against it.
- **Reset to Defaults** drops your triggers so the action's own defaults apply again. It's greyed out when the
  defaults are already in effect.
- **Cancel** closes the modal and leaves the saved triggers alone.

:::tip An Action With No Triggers Isn't Broken
Plenty of actions ship with no default triggers, because they're meant for a situation rather than a routine — a purge,
a forced refresh, a repair. They say **Manual only**, and they stay that way until you give them a trigger.
:::

## The Categories

Categories come from the actions themselves, so the list grows with what you have installed. A plugin's own actions are
grouped under the plugin's name.

| Category | What's in it |
| --- | --- |
| **Import** | Scanning folders, hashing, finding releases, removing missing files |
| **AniDB** | Refreshing anime data, the calendar, notifications, moved files, AVDump |
| **Sync** | Pushing to and pulling from AniDB MyList, and other sync work |
| **Images** | Downloading, validating and maintaining artwork |
| **Maintenance** | Stats, groups, media info, metadata refreshes, database upkeep |
| **Miscellaneous** | Connectivity checks and airing schedule upkeep |
| **Destructive** | Purges that throw data away, each behind a confirmation |

:::warning Destructive Actions Mean It
The actions under **Destructive** remove stored data — metadata links, orderings, collections, unused releases. They ask
before they run and say what they'll take with them. Read that prompt rather than clicking through it, and take a
[backup](/faq) first if you're unsure.
:::
