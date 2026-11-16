---
title: Managed Folders & Drop Folders
description: What a managed folder is, how Shoko tells a file apart from the places it's stored, what each drop type does, and how Shoko notices new and missing files.
---

# Managed Folders & Drop Folders

A managed folder is a folder you hand over to Shoko. Shoko keeps a record of every video file it finds inside it, and
from then on it trusts the folder: it expects the folder to stay at the same path, stay reachable, and only change when
files are added, moved or removed. Everything Shoko knows about your collection hangs off those records, so how a
managed folder behaves decides what Shoko does when a drive goes offline or a file disappears.

You add and edit managed folders under **Settings** → **Import** → **Managed Folders**, or in the **Managed Folders**
panel on the dashboard. The fields are listed under [Managed Folders](/shoko-server/settings/import#managed-folders).

## Files and Locations

Shoko doesn't identify a file by its name or its path. It identifies it by its **content**: the ED2K hash Shoko
calculates when it first sees the file, together with the file size. That's what the release providers look up, what
episodes are linked to, and what watched state belongs to.

Where the file sits is a separate thing, a **location**: a managed folder plus the path inside it. One file can have
several locations. If the same file sits in two folders, Shoko has one file with two locations, not two files.

| | Identified by | Holds |
| --- | --- | --- |
| A file | Its hash and size | Episode links, release info, media info, its own watched date |
| A location | Its managed folder and the path inside it | Only where the file is |

What this means:

- **Renaming or moving files yourself is best avoided; let Shoko do it.** The episode links survive, but the file
  usually loses its record along the way. See [Files Moved or Renamed by Hand](#files-moved-or-renamed-by-hand).
- **Changing a file's contents makes it a new file.** A remux, a re-encode or even edited track language tags change the
  hash, so Shoko treats the result as a file it has never seen.
- **Copies are duplicates, not extra episodes.** A second copy of a file is another location of the same file. The
  dashboard's **Collection Statistics** counts them as **Duplicate Hashes**, and **Delete duplicates on import**
  ([Import Options](/shoko-server/settings/import#import-options)) deletes a newly found copy and keeps the one Shoko
  already had. Two *different* files for the same episode are two releases instead; see
  [Release Management](/shoko-server/release-management).

## Shoko Expects Folders to Stay Online

Shoko assumes a managed folder is always there. It isn't built for removable drives or cloud storage that comes and
goes, because of how it treats files that have disappeared.

### When a File Disappears

Deleting or moving a file outside of Shoko doesn't update Shoko right away, not even in a watched folder: watching only
reports new files. The record stays until one of these runs:

- **A full scan of the folder.** **Rescan Folder**, and the scans of drop sources by **Run Import**,
  **Scan Managed Folders** and **Scan Drop Folders**, first check every location Shoko has in that folder and remove the
  ones whose file is gone. A scan for new files only, such as **Import New Files** or the scan of every other folder
  during **Run Import**, only adds files and leaves these records alone.
- **Remove Missing Files**, from **Actions** → **Import**, which checks every location in every managed folder.
- **A notification** for that path through the API (see [Detecting New Files](/shoko-server/settings/import#detecting-new-files)).

If the location was the file's last one, Shoko drops its record of the file: its resume positions, its own watched
date and its import date. Its episode links and the episodes' watched state stay, so if the file comes back it's linked
again. Shoko also updates it in your AniDB MyList as your **Delete Action** setting (**Settings** → **AniDB** →
**MyList Options**) says (by default it marks the file Unknown). **Remove Missing Files (Keep in MyList)** does the
same without touching MyList.

### Files Moved or Renamed by Hand

When you move or rename a file yourself, Shoko removes the old location before it saves the new one. So:

- A file that keeps its name, and whose old copy is gone, loses its record as described above, whether the folder is
  watched or not.
- Any file Shoko only finds by a scan loses its record the same way.
- Only a file that you renamed, and that Shoko notices while watching the folder, is hashed again and keeps its record.

Its episode links and the episodes' watched state survive either way, so the file shows up in its series again once
Shoko has hashed it. To move whole folders without losing anything, see
[Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path). To rename
and sort files, let Shoko do it; see [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).

### When a Whole Folder Is Missing

A scan of a managed folder whose path doesn't exist, or that holds no files at all, stops without removing anything. The
log says the folder is *"temporarily or permanently unavailable"*. That protects you from a scan running while a drive
is unplugged or a share isn't mounted yet.

That protection only covers the whole folder. If part of a folder is missing, such as a second drive mounted inside it,
a scan removes the records of every file that's gone.

:::warning Remove Missing Files Doesn't Check the Folder
**Remove Missing Files** has no such check. Run it while a drive or share is offline and Shoko drops its record of
every file on it, as described in [When a File Disappears](#when-a-file-disappears). Make sure every managed folder is
reachable before you run it.
:::

To move a whole folder to a new drive or path without losing anything, see
[Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path) and
[Removing a Managed Folder](/shoko-server/settings/import#removing-a-managed-folder).

## Drop Types

The **Drop Type** of a managed folder says what Shoko may do with its files when it renames and moves files on its own.

| Drop type | Files in this folder | Files from other folders |
| --- | --- | --- |
| **None** | Left where they are, with their names | Not a destination (see below) |
| **Source** | Renamed and moved out, into a destination | Never moved here |
| **Destination** | Left alone, unless **Allow relocation inside destination on import** is on | Can be moved here |
| **Both** | Renamed and moved, like a source | Can be moved here |

Some details that matter:

- **Nothing moves unless you turn it on.** **Rename on import** and **Move on import** are both off by default
  ([Import Options](/shoko-server/settings/import#import-options)). With both off, the drop type makes no difference to
  your files.
- **Allow relocation inside destination on import** is on by default, so files already in a **Destination** folder are
  renamed and tidied too. Turn it off if Shoko should only ever touch files arriving from a source.
- **Which destination and which subfolder** is the renamer's choice, not the folder's; see
  [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).
- The WebAOM Renamer can follow earlier files of a series into a **None** folder; see
  [Moving](/renamer-plugins/webaom/moving).
- **Unrecognized files usually stay put.** Shoko only hands a file it couldn't identify to a renamer that says it
  handles such files, so an unrecognized file normally stays in the source folder until it's
  [fixed](/shoko-server/how-to/fix-an-unrecognized-file).
- **Drop sources get a full look on every import.** **Run Import** and the **Scan Managed Folders** and
  **Scan Drop Folders** scheduled actions check every file in a source folder again, so a file that couldn't be moved
  last time gets another try.

A common setup is one **Source** folder where new files arrive and one **Destination** folder that holds your sorted
library. [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically) walks through it.

## How Shoko Notices New Files

A new file only becomes part of your collection once Shoko knows it's there. There are three ways that happens:

- **Watching.** With **Watch For New Files** set to **Yes**, Shoko asks the operating system to report new files in the
  folder and picks each one up as it appears. This often doesn't work for network shares and some Docker setups.
- **Notifying.** A script or tool that adds files can tell Shoko about each new path through the API.
- **Scanning.** A scan walks the folder and finds every file Shoko has no record of yet: **Import New Files** or
  **Run Import** from **Actions**, **Rescan Folder** on a managed folder, or a scheduled action such as
  **Import New Files** or **Scan Managed Folders** given a trigger under
  [Scheduled Actions](/shoko-server/settings/scheduled-actions). They have no triggers by default.

The details, including why watching fails on network shares and how to call the API, are on
[Detecting New Files](/shoko-server/settings/import#detecting-new-files).

Whichever way Shoko hears about a file, it only takes files whose extension is in **Video Extensions**, and scans skip
files you've marked as ignored. A new file is hashed first, and only gets a record in Shoko once it has been hashed.
From there it goes on to be identified; see [How Files Are Imported](/shoko-server/concepts/how-files-are-imported).

Shoko starts watching when it starts. A watched folder that isn't there at that moment, such as a share that mounts
later, isn't watched until Shoko Server restarts or you save a change to any managed folder.

## Rescan Folder or Import New Files?

Both scan, but they look at different files.

| | **Rescan Folder** | **Import New Files** |
| --- | --- | --- |
| Where | The one managed folder you clicked it on | Every managed folder |
| Files Shoko has never seen | Hashed and identified | Hashed and identified |
| Files that are gone | Records removed | Left alone |
| Known unrecognized files | Searched for again, up to about 15 tries | Left alone |
| Known recognized files | Handed to renaming and moving again, if the folder's drop type and your import options allow it | Left alone |

**Rescan Folder** is the icon button on each managed folder, in the dashboard panel and in **Settings** → **Import**. Use
it when files in one folder seem stuck or weren't picked up. Use **Import New Files** when you've added files and Shoko
hasn't noticed them yet.

**Run Import** does more than either: among other things it scans drop sources in full and every other folder for new
files, searches for metadata links and downloads missing images. See [Actions](/shoko-server/actions).

:::tip Searching Again for One File
A folder rescan only searches again for an unrecognized file until Shoko has tried it about 15 times. To make Shoko try one file again no matter what, use **Rescan** on the file in
[Unrecognized Files](/shoko-server/unrecognized-files). See
[Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).
:::

## What This Means for You

- Make sure your drives and shares are mounted before Shoko Server starts, and keep them mounted. A folder that's
  missing at start-up isn't watched.
- Never run **Remove Missing Files** while a managed folder is offline.
- Avoid reorganizing files by hand. The episode links survive, but a file usually loses its record: its resume
  positions, its own watched date and its import date, and it's updated in MyList as your **Delete Action** says.
- Shoko doesn't notice deleted files by itself. Let a scan or **Remove Missing Files** clean up afterwards.
- If watching doesn't reach Shoko, give **Import New Files** a trigger, or have your tools notify Shoko.
- Use **Source** for the folder new files arrive in, **Destination** for your library, and **None** for folders Shoko
  should never rearrange.

## Related

- [Import Settings](/shoko-server/settings/import): the managed folder fields, removing a folder, and detecting new files.
- [How Files Are Imported](/shoko-server/concepts/how-files-are-imported): what happens to a file after Shoko notices it.
- [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files): how files are moved between drop folders.
- [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically): a source and destination setup.
- [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path): changing
  a drive or path safely.
- [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files): what happens when a file
  can't be identified.
