---
title: File Rename
description: The Relocate Files utility in Shoko's Web UI, for previewing and running renames and moves, and for managing relocation presets.
---

# File Rename

The **Relocate Files** utility (**Utilities** → **Relocate Files**, a page with the header **File Rename**) renames and
moves files with a relocation preset of your choice, and is where you manage those presets. You can preview what a
preset would do before anything changes on disk.

Shoko comes with the WebAOM Renamer, a bundled plugin; see
[Getting Started](/renamer-plugins/webaom/getting-started). Other renamers come from plugins: see
[Available Renamers](/renamer-plugins/available-renamers). For how presets, drop types and the import settings fit
together, and when Shoko renames or moves files on its own, see
[Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).

## Presets

Click the cog button next to **Add Files** to show or hide the settings.

### Choosing a Preset

The **Preset** list under **Preset Selection** picks the preset this page uses. Each entry shows the preset's name,
followed by its renamer and version. A preset whose renamer isn't installed or is disabled shows as `Name (<Unknown>)`.
With no presets at all, the list reads **No renamer found!**

The page opens with the default preset chosen. Choosing another one here only affects this page: it doesn't change the
default. If no preset is the default, the page opens with none chosen, and the preview and the **Rename Files** button
do nothing until you choose one.

### Managing Presets

The buttons next to the **Preset** list act on the chosen preset:

| Button | What it does |
| --- | --- |
| **Set as default** (star) | Makes the preset the default. It's greyed out with the tooltip **Already set as default!** when it already is. |
| **Delete Preset** (bin) | Deletes the preset. The default preset can't be deleted (**Cannot delete default preset!**), so set another one as the default first. |
| **Rename Preset** (pencil) | Changes the preset's name: enter the **Preset Name** and click **Save**. |
| **New Preset** (plus) | Opens **Create Preset**: pick the **Provider** (the renamer), enter a **Preset Name** and click **Save**. |

Shoko uses the default preset for **Rename on import** and **Move on import** (see
[Import](/shoko-server/settings/import)), and for **Relocate Files** in the **File Actions** tab of **Edit Series** or
**Edit Group**.

### Editing a Preset's Settings

The settings of the chosen preset show below the buttons, and the **Script** panel next to them holds its script. A
renamer without a script shows *This renamer does not have any script to edit!* there. For the WebAOM Renamer:

- **Max Episode Length**: the length episode titles are cut to.
- **Use Group Aware Sorting**: whether to sort series that share a group into a folder for the group. See
  [Moving Files](/renamer-plugins/webaom/moving).
- The script in the **Script** panel: the naming rules. See [Renaming Files](/renamer-plugins/webaom/renaming).

The preview updates as you edit. Click **Save** under the settings to keep your changes.

:::warning Save Your Settings
The preview uses your unsaved settings, but renaming uses the saved ones. Until you save, the **Rename Files** button
stays greyed out with the tooltip *Config has been edited, please save before renaming files*.
:::

## Renaming and Moving Files

1. Click **Add Files** and pick the files under **One Click Options** or **Select Series**:
   - **Entire Collection** adds the files of your whole collection. Click the play button next to it.
   - **Recently Imported Files** adds the number of most recently imported files you enter (up to 1000), leaving out
     unrecognized files. Click the play button next to it.
   - **Select Series** lets you search for a series. Click its name to add its files.

   The **Rename** button in [Unrecognized Files](/shoko-server/unrecognized-files) and
   [File Search](/shoko-server/file-search) also sends the files you selected there to this page.
2. Choose what to do with the **Move Files** and **Rename Files** checkboxes. **Move Files** starts out matching **Move
   on import**. **Rename Files** starts out on, or matching **Rename on import** while **Move on import** is on.
   Changing either reruns the preview.
3. Check the **Renamer Preview**. **Original Filename** shows where each file is now and **Result** where it would go:
   the managed folder's name and the folder path inside it (**Root Level** for the top of the managed folder), with the
   file name below. The **Status** icon reads **Rename pending!** for a change, **No change!** when the file is already
   where and how the preset wants it, and **Rename/preview failed!** when the preset can't handle the file, with the
   reason in red in the **Result** column.
4. Click the **Rename Files** button next to **Add Files**. It renames and moves every file in the list, whichever rows
   are selected. Each file's **Status** then reads **Rename successful!**, **No change!** or **Rename/preview failed!**.

**Refresh** reruns the preview, **Remove** takes the selected files off the list, and **Remove All** clears it.

The managed folders' drop types apply here too:

- A file in a folder with the **None** drop type can't be renamed or moved.
- A file in a **Destination** folder can only be renamed or moved while **Allow relocation inside destination on
  import** is on.

When the utility moves a file, it also moves the file's external subtitles, and deletes the folders the move leaves
empty. See [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files#subtitles-and-other-files-next-to-the-video).

## When the Renamer Is Missing

A preset whose renamer isn't installed or is disabled can't be used. Its preview never finishes loading, and renaming
with it fails for each file with `No relocation provider with ID "…" is unavailable or unknown.` Enable the renamer
again under [Plugin Management](/shoko-server/settings/plugin-management), or use another preset.

## Related

- [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files): how presets, drop types and the import
  settings work together.
- [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically): set up a drop source and
  destination, and sort an existing library.
- [Import](/shoko-server/settings/import): the import options and managed folders.
