---
title: Move Your Library to a New Drive or Path
description: Point Shoko Server at your files' new drive, share, folder or Docker mount, and keep every file's links, watched state and resume positions.
---

# Move Your Library to a New Drive or Path

Your files moved: a new drive, a new NAS share, a renamed parent folder, or a different Docker mount. This guide gets
Shoko Server looking at the new place while keeping everything it knows about each file: its episode links and manual
links, everyone's watched state and resume positions, and the file's import date.

Shoko remembers each file as a managed folder plus the file's path inside that folder. So the safest move by far is
one where the inside of the folder stays the same and you only tell Shoko where the folder is now.

## Before You Start

- **Finish moving or copying first.** Check that the new location has everything, with the same folders and file
  names inside.
- **Make the new location reachable from Shoko Server.** A network share must be mounted on the machine running Shoko
  Server. In Docker, the new location must be mounted into the container, and you'll use the path inside the
  container.
- **Note your numbers.** Write down **Files**, **Unrecognized Files** and **Episodes Watched** from the dashboard's
  **Collection Statistics**, to compare afterwards.
- **Hold off on clean-ups.** Don't run **Remove Missing Files**, and don't rescan the affected folders, until you're
  done. [What Not to Do](#what-not-to-do) explains why.

## Pick the Right Way

| What changed | What to do |
| --- | --- |
| Only the host side of a Docker mount. The path inside the container is the same | Nothing in Shoko. Recreate the container with the new mount and you're done |
| The whole folder is somewhere else, with the same folders and file names inside | [Change the managed folder's location](#change-a-managed-folder-s-location). This is the recommended way |
| Several managed folders under one parent that moved or was renamed | [Change the location](#change-a-managed-folder-s-location) of each of them |
| The files were reorganized: renamed, split up or merged into other folders | [Add the new location as a managed folder](#add-the-new-location-as-a-managed-folder) |
| You want to move files around inside a managed folder | Let Shoko move them, see [Moving Files Inside a Managed Folder](#moving-files-inside-a-managed-folder) |

## Change a Managed Folder's Location

Changing the location changes nothing else. Shoko doesn't rescan, rehash or re-import anything, and every file
record simply points at the new place.

1. If you're on Docker and the path inside the container changed, recreate the container with the new mount first, so
   the new path exists for Shoko Server.
2. Open **Settings** → **Import** → **Managed Folders**, or the **Managed Folders** panel on the dashboard.
3. Click **Edit Folder** on the folder that moved.
4. In **Location**, enter the new path as Shoko Server sees it, or click the folder icon to browse to it. Leave
   **Drop Type** and **Watch For New Files** as they are.
5. Click **Save**.

If **Watch For New Files** is on, Shoko starts watching the new location right away.

Shoko only accepts a location that exists on the server and that isn't inside another managed folder (or around one).
If several managed folders moved together, change each of them.

Once you've [checked that it worked](#check-that-it-worked), you can click **Rescan Folder** to have Shoko look over
the folder at its new location. Only do this when the new location is complete: a rescan removes the records of files
it can't find there, and updates them in your AniDB MyList as your **Delete Action** setting under
[AniDB](/shoko-server/settings/anidb) says (by default it marks the files Unknown).

## Add the New Location as a Managed Folder

When the files didn't keep their layout, Shoko has to find them again. Each file is recognized by its content, not
its path: Shoko matches it by file name and size where it can, and otherwise hashes it again. Its episode links, manual
links and episode watched states come back with it, through the release Shoko stored for the file's content.

The way that keeps the most is to **copy** the files to the new location and leave the old copy where it is until Shoko
has found them all. Each file then gets a second location on the record it already has, and nothing is removed along
the way.

1. Open **Settings** → **Import** and make sure **Delete duplicates on import** is off. While both copies are
   reachable, every file found at the new location is a duplicate of the old one, and that option deletes the new
   copy from disk.
2. Copy the files to the new location.
3. Click **Add Folder**, fill in **Name** and **Location**, pick **Watch For New Files**, and click **Save**. Leave
   **Drop Type** at **None** until you're done, unless you want Shoko to sort the files: with another drop type, the
   files it recognizes can be renamed or moved as they're found.
4. Click **Rescan Folder** on the new folder. Adding a folder doesn't scan it by itself.
5. Wait until the queue has finished the scan and any hashing.
6. Remove the old managed folder: click **Edit Folder** on it, then **Delete**, pick **The files only moved** and click
   **Remove Folder Only**. Your files keep their records.
7. Run **Actions** → **Import** → **Remove Missing Files (Keep in MyList)**. It clears the locations left over from the
   old folder. It checks every managed folder, so make sure all of them are reachable first. A file Shoko didn't find
   at the new location loses its record here, so check the numbers first.
8. Delete the old copy of the files yourself.

If you can't keep both copies, for example because the files were moved rather than copied, you can still start at
step 3, but files that kept their names lose their records, as
[Moving Files Inside a Managed Folder](#moving-files-inside-a-managed-folder) explains. Prefer
[changing the location](#change-a-managed-folder-s-location) whenever the layout allows it.

## Moving Files Inside a Managed Folder

Shoko keeps its records up to date when it moves or renames files itself. When you move files by hand, Shoko only
sees a file disappear from one path and appear at another, and it removes the old location before saving the new one.
For a file that kept its name, or one Shoko only finds by a scan, Shoko drops its record of the file: its resume
positions, its own watched date and its import date. Its episode links and the episodes' watched state stay, so the
file is linked again. Only a renamed file that Shoko notices while
[watching the folder](/shoko-server/settings/import#detecting-new-files) is hashed again and keeps its record.
[Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders) has the details.

To rename files or move them into a new layout, use the [File Rename](/shoko-server/file-rename) utility or
[Shoko's own renaming and moving](/shoko-server/concepts/renaming-and-moving-files) instead.

## What Not to Do

:::danger Don't Clean Up While Files Are Out of Reach
- **Don't run Remove Missing Files** while a managed folder is offline, half-copied, or not yet pointed at its new
  location. It checks every managed folder and removes the record of every file it can't reach.
  **Remove Missing Files** also updates them in your AniDB MyList as your **Delete Action** setting under
  [AniDB](/shoko-server/settings/anidb) says (by default it marks the files Unknown).
  **Remove Missing Files (Keep in MyList)** leaves your MyList alone, but removes the records just the same.
- **Don't rescan a folder that's partly missing**, for example while one of several disks behind it is offline or a
  copy is still running. Every full scan, such as **Rescan Folder** or the scan of a drop source by **Run Import**,
  first removes the records of the folder's files it can't find, and updates them in your AniDB MyList as **Delete Action** says. A folder that's
  missing entirely, or empty, is skipped instead, so a whole drive being unplugged doesn't cost you anything.
- **Don't pick "The files are gone for good"** when removing a managed folder whose files only moved. It removes the
  records of every file that isn't also in another managed folder, with their resume positions, and
  **Also remove these files from your AniDB MyList** is ticked by default.
:::

## Check That It Worked

- **Settings** → **Import** → **Managed Folders** shows the new **Location**, with the same size and series count as
  before.
- The dashboard's **Collection Statistics** shows the numbers you noted: **Files**, **Unrecognized Files** and
  **Episodes Watched**.
- Open an episode you know in your collection: its file's **Location** under **File Details** is the new path, and the
  file plays.
- After a location change, the queue isn't hashing the folder's files. If it is, Shoko doesn't recognize them at the
  new location: check the path.

## If It Didn't Work

- **"Path does not exist. Managed Folders must be a location that exists on the server."** Shoko Server can't see that
  path. Check the spelling, that the drive or share is mounted on the machine running Shoko Server, and in Docker that
  you entered the path inside the container, not on the host.
- **"Unable to nest a managed folder within another managed folder."** The new location is inside another managed
  folder, or contains one. Change or remove that other folder first.
- **Files show as missing after changing the location.** The layout inside the new location differs from the old
  one. Set the location back, or follow
  [Add the New Location as a Managed Folder](#add-the-new-location-as-a-managed-folder).
- **The Unrecognized Files count went up.** Some files were treated as new and are waiting for their release to be
  found again. Give the queue time, then see
  [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).

## Related

- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders)
- [Import Settings](/shoko-server/settings/import), for the managed folder dialog and detecting new files
- [Move Shoko Server to a New Machine](/shoko-server/how-to/move-shoko-server-to-a-new-machine), when the whole
  server moves too
- [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files)
- [Actions](/shoko-server/actions)
