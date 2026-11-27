---
title: How Files Are Imported
description: What Shoko Server does between a file being added to a managed folder and that file showing up as an episode of a series, and how to tell which stage a file is in.
---

# How Files Are Imported

When you add a file to a managed folder, Shoko doesn't know what it is yet. It works that out in a line of stages,
and each stage is a task in the [queue](/shoko-server/concepts/the-queue) that only starts once the stage before it is
done:

1. **Shoko notices the file**, because it watches the folder, scans it, or is told about it.
2. **Shoko hashes the file**, reading all of it to get a fingerprint of its contents.
3. **Shoko looks up the release**, asking AniDB (and any other release provider you use) which episodes the file
   contains.
4. **Shoko gets the anime from AniDB**, and creates the series, its episodes and a group for it.
5. **Shoko asks the other metadata sources**, such as TMDB, for their information and images.
6. **Shoko renames or moves the file**, if you've asked it to.

Stages 3 and 4 talk to AniDB, which only allows a request every few seconds. That's why a handful of new files are
done quickly, while a large collection can take hours or days. Knowing the stages lets you tell whether a file is stuck
or just waiting its turn.

| Stage | What you see in the queue | Where the file shows up |
| --- | --- | --- |
| Noticed | **Scan Managed Folder** when the folder is scanned; a watched or notified file goes straight to **Hash File** | Nowhere yet |
| Hashed | **Hash File** | **Unrecognized Files**, until its release is found |
| Release lookup | **Get Release Information for Video From Provider**, then **Finalize Release Search** | **Unrecognized Files** if nothing was found |
| AniDB anime | **Get AniDB Anime Data** | In its series, and in **Recently Imported** |
| Other sources | **Search Metadata**, **Refresh Metadata**, **Download Metadata Images**, **Download Image** | In its series, with more information and images |
| Renaming and moving | **Rename/Move Video** | At its new location |

The queue shows a waiting task by its type and a running one by what it's doing, so **Hash File** reads
**Hashing File** while it runs, and **Rename/Move Video** reads **Renaming/Moving Video**.

## Shoko Notices the File

Shoko learns about a new file in a managed folder in one of three ways: it **watches** the folder
(**Watch For New Files**), a **scan** walks through the folder, or something **notifies** Shoko through its API. A file
that has only been noticed doesn't show up anywhere in the Web UI yet. See
[Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders#how-shoko-notices-new-files)
for how each one works and when a folder is scanned.

## Hashing

AniDB identifies a file by its **ED2K hash** and its size: a fingerprint calculated from every byte of the file. Two
copies of the same release give the same hash, wherever they come from and whatever they're called, so the file name
doesn't matter for matching. By default Shoko also calculates a CRC32 hash, and you can add more types under
[Hashing & Release](/shoko-server/settings/hashing-and-release#hashing-options). Right after hashing, in the same task,
Shoko reads the file's media information, such as its streams, languages and length, if it doesn't have it yet.

Because the whole file is read, hashing runs at the speed of your disk or network. A large Blu-ray file can take
several minutes, and much longer over a slow network share. Shoko hashes two files at a time by default, new files
before ones it's hashing again and smaller files first, so the big ones wait until the smaller ones are done.

**A file only exists in Shoko once it's hashed.** Before that, it isn't in **Unrecognized Files**, **File Search** or
anywhere else. If Shoko finds the same contents in a second place, it records a second location of the same file
instead of a new file, and a file it already knows the release of skips the lookup.

## The Release Lookup

Once a file is hashed, Shoko asks the **release providers** which release it is: the group, the source, and above all
which episodes the file contains. The providers are asked in the order of **Auto-Linking Release Providers** under
[Hashing & Release](/shoko-server/settings/hashing-and-release#release-provider-options), and the first one that knows
the file wins. By default that's **AniDB**, which looks the file up by its hash and size. See
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files) for what the providers are
and what counts as recognized.

In the queue, each provider's lookup is a **Get Release Information for Video From Provider** task, with the provider
and the file in its details, followed by **Finalize Release Search**. When **Add Files** is on under
[AniDB](/shoko-server/settings/anidb#mylist-options), a matched file also gets an **Add Entry to AniDB MyList** task.

When no provider knows the file, it's **unrecognized**. It stays in your managed folder and in **Unrecognized Files**
until you or Shoko do something about it. Once a day, the **Check AniDB File Updates** scheduled action searches again
for every unrecognized file that isn't ignored, since someone may have added it to AniDB in the meantime, until a file
has had about 15 tries. **Rescan Folder** on the file's managed folder searches again too, within the same limit. See
[Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file) for what you can do yourself.

**Unrecognized Files** also lists files whose lookup is still waiting in the queue, so during a large import it often
just means "not looked up yet". See
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files#shoko-hasn-t-finished-yet).

## AniDB Anime, Series and Episodes

A release names AniDB episodes. If Shoko doesn't have the anime they belong to, or its copy is out of date, it queues
**Get AniDB Anime Data** for it. That task fetches the anime and all its episodes from AniDB, then creates the
**series**, its **episodes** and a **group** to put the series in. See [Groups & Series](/shoko-server/concepts/groups-and-series)
for how series end up in groups.

Only now does the file show up in its series and in the dashboard's **Recently Imported**. Shoko doesn't fetch the same
anime again within 24 hours by default, so the other files of an anime it just fetched need no new request for it. A
collection with many episodes per series goes faster than one with many short series.

The same task also queues the anime's images, and with the [download options](/shoko-server/settings/anidb#download-options)
on, the images of its characters and staff and the details of its staff (**Fetch AniDB Creator Details**). With
**Always Download Related Anime** or **Auto Group Series** on, it also fetches the anime's related anime, as far as
**Related Depth** allows.

Sometimes a file is recognized but waiting for its series, usually because its episode is newer than Shoko's copy of
the anime. See [Recognized but Not in a Series Yet](/shoko-server/concepts/recognized-and-unrecognized-files#recognized-but-not-in-a-series-yet)
for how Shoko catches up.

## Other Metadata Sources and Images

Once the series exists, Shoko asks every other [metadata source](/shoko-server/concepts/metadata-sources), such as
TMDB, for its part:

- If the anime isn't linked to anything on that source yet and the source's **Auto Link** is on, **Search Metadata**
  looks for a match and links it.
- For each linked show or movie, **Refresh Metadata** fetches its information, and Shoko matches its episodes to the
  AniDB ones.
- **Download Metadata Images** picks the images you want, and each one is fetched by a **Download Image** task.

These sources aren't AniDB, so they don't wait for AniDB's limits. They have limits of their own: a source that's
rate limited pauses itself and shows as **Suspended** under [Metadata](/shoko-server/settings/metadata#each-source). If
an auto-link picks the wrong show, see [Fix a Wrong Metadata Link](/shoko-server/how-to/fix-a-wrong-metadata-link).

## Renaming and Moving

When **Rename on import** or **Move on import** is on under [Import](/shoko-server/settings/import#import-options),
Shoko queues **Rename/Move Video** once the file is matched, for a file in a **Source** or **Both** folder, or in a
**Destination** folder with **Allow relocation inside destination on import** on. Because names usually come from the series and episodes, it renames or moves the file again when the anime's
information arrives or changes. Files that aren't recognized are only renamed by a renamer that handles them. See
[Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files) and
[Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically).

## Why It Can Take So Long

Every new file needs at least one AniDB request to be looked up, and every new anime another, while Shoko waits two
seconds between requests, or six once it has been busy for about ten seconds. When AniDB bans you anyway, the tasks that
need it wait, so the queue can sit with thousands of tasks and no busy workers until the ban lifts. See
[Understanding AniDB Bans](/shoko-server/understanding-anidb-bans) for what each ban holds and how long it lasts, and
[The Queue](/shoko-server/concepts/the-queue) for why tasks wait.

## Watching Each Stage

| Where | What it tells you |
| --- | --- |
| [**Queue Processor**](/shoko-server/dashboard#queue-processor) on the dashboard | How many workers are busy and how many tasks are left. Running tasks show what they're doing (**Hashing File**), waiting ones their type, each with details such as the file path or the provider. **Paused** shows when the queue is paused. |
| **Unrecognized Files** on the dashboard | Hashed files without a release: not looked up yet, or not found. It leaves out the ones waiting for their series. |
| **Utilities** → [**Unrecognized Files**](/shoko-server/unrecognized-files) | The same files, plus files that are recognized but waiting for their series, with nothing marking them apart. |
| [**Recently Imported**](/shoko-server/dashboard#recently-imported) on the dashboard | The latest episodes (**Episodes**) and series (**Series**) that have a file. |
| The top bar | **AniDB UDP Ban Detected!** or **AniDB HTTP Ban Detected!** while AniDB has banned you. Click it to see when Shoko checks again. |
| **Log** in the top bar ([Logs](/shoko-server/logs)) | Every step for every file, including lookups that found nothing. |

## What This Means for You

- **A new file not showing up at all** hasn't been noticed or hashed yet. Check that the folder is watched or rescan
  it, and look for **Hash File** in the queue.
- **A file in Unrecognized Files during an import** is most likely still waiting for its lookup. Wait for the queue to
  empty before acting on it.
- **A file recognized but not in a series** is waiting for its series, usually because its episode is newer than
  Shoko's copy of the anime. See
  [Recognized but Not in a Series Yet](/shoko-server/concepts/recognized-and-unrecognized-files#recognized-but-not-in-a-series-yet).
- **An idle queue with tasks left** usually means AniDB has banned you or a source is suspended. Check the top bar
  first.
- **Importing a large collection** is mostly waiting on AniDB. See
  [Import a Large Collection](/shoko-server/how-to/import-a-large-collection).

## Related

- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders)
- [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files)
- [Metadata Sources](/shoko-server/concepts/metadata-sources)
- [The Queue](/shoko-server/concepts/the-queue)
- [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans)
- [Import a Large Collection](/shoko-server/how-to/import-a-large-collection)
- [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file)
