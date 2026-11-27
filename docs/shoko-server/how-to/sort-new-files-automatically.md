---
title: Sort New Files Automatically
description: Set up a drop source where you add new files and destination folders where Shoko Server puts them, renamed and sorted into one folder per series.
---

# Sort New Files Automatically

When you're done, you'll have a **drop source**, a folder where you put every new file, and one or more **destination**
folders, where Shoko Server moves each file once it knows what it is, renamed and sorted into a folder per series. Files
Shoko can't match stay in the drop source, so it doubles as a list of what still needs your attention.

This guide uses the WebAOM Renamer that ships with Shoko. [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files)
explains how renaming and moving work behind the scenes.

## Before You Start

- **Two separate folders.** The drop source can't be inside a destination folder or the other way round: Shoko doesn't
  allow one managed folder inside another. A folder next to your library works, for example `/anime/incoming` next to
  `/anime/library`, as long as `/anime` itself isn't a managed folder.
- **Paths as Shoko Server sees them.** If Shoko runs in Docker, use the paths inside the container, and give it write
  access to both folders. Mount their common parent folder as one volume, not each folder on its own, so files are
  moved instead of copied; see
  [Mount Folders You Move Files Between as One Volume](/getting-started/installing-shoko-server#docker-compose-recommended).
- **A renamer.** The **WebAOM Renamer** is enabled by default. If you turned it off, enable it again under
  [Plugin Management](/shoko-server/settings/plugin-management), or install another renamer (see
  [Available Renamers](/renamer-plugins/available-renamers)).

## Set Up the Folders

1. Open **Settings** → **Import** and find **Managed Folders**.
2. Click **Add Folder** (the folder icon with a plus). In **Add New Managed Folder**:
   - **Name**: something you'll recognize, such as `Incoming`.
   - **Location**: the drop source's path, or browse to it with the folder icon.
   - **Drop Type**: **Source**.
   - **Watch For New Files**: **Yes**, so Shoko notices a file as soon as you add it.

   Click **Save**.
3. Add your library folder the same way with **Drop Type** set to **Destination**. If it's already a managed folder,
   click **Edit Folder** on it instead and change its **Drop Type**. **Watch For New Files** is up to you
   here, as Shoko keeps track of the files it moves in.
4. Repeat step 3 for every other folder Shoko may move files into.

Nothing in a folder with the **None** drop type is renamed or moved. Where the WebAOM Renamer puts files, including
when it uses such a folder, is described in [Moving Files](/renamer-plugins/webaom/moving).

:::tip Network Shares and Docker
Watching only works when the operating system reports new files to Shoko, which network shares often don't. If new
files in your drop source aren't noticed, see [Detecting New Files](/shoko-server/settings/import#detecting-new-files).
:::

## Check the Default Preset

Shoko renames and moves files on its own with the **default preset**, a saved configuration of a renamer. Make sure
there is one, and that it's the one you want, before you turn anything on.

1. Open **Utilities** → **Relocate Files**, and click the cog button to show the settings.
2. The **Preset** list under **Preset Selection** opens on the default preset. When it's the default, the star button
   next to it is greyed out, with the tooltip **Already set as default!**.
3. If the star can be clicked, click it (**Set as default**). On a new install, the WebAOM preset named **Default**
   isn't set as the default yet, so this is the step that makes it the default. To use another preset, choose it in
   the **Preset** list first.

   :::details If the Star Does Nothing
   Right after opening the page with no default preset, no preset is chosen yet, even though the **Preset** list shows
   one, and choosing the entry that's already shown does nothing. Choose another preset first, then the one you want,
   and click the star. If it's the only preset, add a second one with **New Preset** (pick the **Provider**, enter a
   **Preset Name** and click **Save**), so you can switch between them. You can delete the extra one with **Delete
   Preset** afterwards.
   :::
4. With the default preset chosen, its settings show below the list. For the WebAOM Renamer that's **Use Group Aware
   Sorting**, which puts series that share a group into a folder for the group (see
   [Moving Files](/renamer-plugins/webaom/moving)), and **Max Episode Length**. The naming script is in the **Script**
   panel next to it; see [Renaming Files](/renamer-plugins/webaom/renaming). Click **Save** under the settings to keep
   your changes.

## Preview a Few Files

The utility shows you what the preset would do, without touching anything on disk.

1. Click **Add Files**. Use **Recently Imported Files** (enter how many, then click the play button), or search under
   **Select Series** and click a series or two.
2. Tick both the **Move Files** and the **Rename Files** checkbox.
3. Look through the **Result** column of the **Renamer Preview**. Each row shows the managed folder and folder path the
   file would go to, with the new name below. The **Status** icon reads **Rename pending!** for a change and **No
   change!** when the file is already where and how the preset wants it.

The preview only works for files in a managed folder whose drop type isn't **None**, and files in a **Destination**
folder only while **Allow relocation inside destination on import** is on. Otherwise the **Result** column says why.

If the results look wrong, adjust the preset's settings and watch the preview update. Don't click the **Rename Files**
button next to **Add Files** unless you want every file in the list renamed and moved right now. Click **Remove All** to
clear the list when you're done.

## Turn On Renaming and Moving

1. Open **Settings** → **Import**.
2. Under **Import Options**, turn on **Rename on import** and **Move on import**.
3. Decide on **Allow relocation inside destination on import**. It's on by default, which also renames files that are
   already in your destination folders whenever their details on AniDB change. Turn it off if files should keep their
   name once they've been sorted.
4. Click **Save**.

## Add a Test File

1. Copy one episode into the drop source.
2. Watch the tasks in the queue panel on the [dashboard](/shoko-server/dashboard). The file is hashed, its release
   is searched for, and a task moves it once it's matched. That task shows as **Rename/Move Video** while it waits, and as
   **Renaming/Moving Video** while it runs. With a new anime, Shoko first fetches its details from AniDB.

## Check That It Worked

- The file is gone from the drop source, and the series' folder in your destination folder has it under its new name.
- Its subtitle files, if it had any with the same name next to it, moved along.
- The folder you put it in inside the drop source is gone too, if the move left it empty. The drop source itself stays.

## If It Didn't Work

- **The file is still in the drop source, under its old name.** Shoko hasn't matched it. Look for it under
  [Unrecognized Files](/shoko-server/unrecognized-files). The WebAOM Renamer never moves unrecognized files, so they wait
  in the drop source. Once you link it, it's renamed and moved like any other file. See
  [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).
- **Nothing happened at all, and the file isn't in Shoko.** Shoko didn't notice it. Click **Rescan Folder** on the drop
  source under **Settings** → **Import**, and see [Detecting New Files](/shoko-server/settings/import#detecting-new-files).
- **The file was matched, but stayed where it was.** Check that there is a default preset, as in
  [Check the Default Preset](#check-the-default-preset), and that its renamer is available: in the **Preset** list, a
  preset whose renamer is missing shows as `Name (<Unknown>)`. Then check the [log](/shoko-server/logs) for a line
  starting with `Error Renaming/Moving File`, which gives the reason.
- **The log or the preview says** `The renamer "WebAOMRenamer" could not find a valid destination.` The WebAOM Renamer
  found no folder to put the file in. Make sure at least one managed folder has the **Destination** or **Both** drop
  type, that its location exists, and that its drive has more free space than the file needs. The renamer skips a
  destination without room for the file.
- **The preview says** `Not relocating file as it is not in a drop source or drop destination.` The file is in a folder
  with the **None** drop type. Change it to **Source**, **Destination** or **Both**.
- **The preview says** `Not relocating file because it's in a drop destination not also marked as a drop source and
  relocating inside destinations is disabled.` Turn on **Allow relocation inside destination on import**, or set the
  folder's drop type to **Both**.
- **The log shows errors for a file that was sorted just fine.** Shoko tries to rename and move a file right after its
  release is saved, and again when the release search finishes, so these two lines are expected:

  - `Error Renaming/Moving File: Not enough data to do renaming for the recognized file. An entry it is linked to has
    not been stored yet.` The anime was new to Shoko. The file is sorted once its details have been fetched from AniDB.
  - `Error Renaming/Moving File: Not relocating file because it's in a drop destination not also marked as a drop
    source and relocating inside destinations is disabled.` The file was already moved into a **Destination** folder,
    and **Allow relocation inside destination on import** is off.
- **The file was renamed, but not moved, or the other way round.** Check that both **Rename on import** and **Move on
  import** are on.
- **The file wasn't moved because a file with that name is already there.** Shoko doesn't move a file onto another
  one, apart from replacing an older version of the same release from the same release group. If it's the same episode in another
  release, decide which one to keep under [Release Management](/shoko-server/release-management).

## Sort a Library That's Already There

The import settings only act on new files and on files whose details change. To rename and sort the files you already
have, run the preset on them by hand. The **Rename Files** button works on every file in the list, so try it on one
series first.

1. Make sure the folders they're in have the **Destination** (or **Both**) drop type, and that **Allow relocation inside
   destination on import** is on. To move files out of a folder altogether, give that folder the **Source** drop type
   and make sure there's another **Destination** folder.
2. In **Utilities** → **Relocate Files**, click **Add Files** and click one series under **Select Series**.
3. Tick the **Move Files** and **Rename Files** checkboxes as you need, and check the **Result** column.
4. Click the **Rename Files** button next to **Add Files**. Each file's **Status** turns to **Rename successful!**, or
   **Rename/preview failed!** with the reason in the **Result** column. Check the files on disk.
5. When you're happy, click **Remove All**, add the rest with **Add Files** (**Entire Collection**, or series by
   series), and click **Rename Files** again.

## Related

- [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files): how presets, drop types and the import
  settings fit together.
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders): what each drop type means.
- [Import Settings](/shoko-server/settings/import): every import option and the managed folder dialog.
- [File Rename](/shoko-server/file-rename): the **Relocate Files** utility.
- [Moving Files](/renamer-plugins/webaom/moving): where the WebAOM Renamer puts files.
