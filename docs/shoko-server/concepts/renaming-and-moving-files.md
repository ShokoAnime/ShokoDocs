---
title: Renaming & Moving Files
description: How Shoko Server renames and moves your files, which renamer and settings it uses, and when it does so on its own.
---

# Renaming & Moving Files

Shoko Server can give your files consistent names and sort them into folders. It never makes up a name or a folder by
itself, though. That decision belongs to a **relocation provider**, more often called a renamer, which is handed
everything Shoko knows about one file and answers with a new name and a destination. Shoko then does the work: it
creates the folders, moves the file, takes its subtitles along and cleans up behind it.

Which renamer runs, and with which settings, is set by a **preset**: a saved configuration of one renamer. One preset
is the **default preset**, and that's the one Shoko uses whenever it renames or moves a file on its own.

You manage presets and rename files by hand in the **Relocate Files** utility (**Utilities** → **Relocate Files**),
described in [File Rename](/shoko-server/file-rename).

## Relocation Providers

Shoko ships with one renamer, the **WebAOM Renamer**. It comes as a bundled plugin, so it's there on every install,
and it can be turned off like any other plugin under [Plugin Management](/shoko-server/settings/plugin-management).
It names files with a script in the style of the WebAOM tool and sorts them into one folder per series. See
[Getting Started](/renamer-plugins/webaom/getting-started) for what it can and can't do.

Every other renamer comes from a plugin. [Available Renamers](/renamer-plugins/available-renamers) explains where to
find them. Renamers differ in more than their naming rules: some only rename, some only move, and only some accept
files that Shoko hasn't matched to an episode (see [Files Shoko Can't Sort](#files-shoko-can-t-sort)).

## Presets

A preset ties a renamer to one set of its settings. For the WebAOM Renamer that's the naming script, a **Max Episode
Length** for episode titles, and whether to **Use Group Aware Sorting**. One renamer can back several presets, for
example one that renames only and one that also sorts into group folders. [File Rename](/shoko-server/file-rename)
explains how to create, edit and choose them.

When Shoko starts with no presets at all and the WebAOM Renamer is enabled, it creates a WebAOM preset named
**Default** with the sample script. On a fresh install, that preset isn't set as the default yet, so set it with **Set
as default** before you turn on renaming or moving; see
[Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically).

## The Default Preset

The default preset is what Shoko uses when nobody picks one:

- Renaming and moving new files on import, and again later when their metadata changes (see
  [When Shoko Renames or Moves Files on Its Own](#when-shoko-renames-or-moves-files-on-its-own)).
- **Relocate Files** in the **File Actions** tab of **Edit Series** or **Edit Group**. That action follows your import
  settings, so it does nothing while both **Rename on import** and **Move on import** are off.

If there's no default preset, or its renamer isn't available, Shoko can't rename or move anything on its own, and files
stay where they are until you fix it.

## When Shoko Renames or Moves Files on Its Own

Nothing is renamed or moved automatically until you turn it on under **Settings** → **Import** → **Import Options**:

| Option | What it does |
| --- | --- |
| **Rename on import** | Lets the default preset give files a new name. |
| **Move on import** | Lets the default preset move files to another folder. Folders a move leaves empty are deleted. |
| **Allow relocation inside destination on import** | Also renames or moves files that already sit in a **Destination** folder. On by default. |

Each half works on its own: with only **Rename on import**, files are renamed where they are, and with only **Move on
import**, they're moved under their current name.

With either one on, Shoko runs the default preset:

- **When a new file has been matched.** After Shoko has hashed a new file and found its release, it renames and moves
  the file once the release is saved and the anime's details are in. See
  [How Files Are Imported](/shoko-server/concepts/how-files-are-imported).
- **When a file gets linked later**, for example when you link an unrecognized file to its episodes by hand, or a later
  search finds its release.
- **When the anime's details change.** When an AniDB refresh adds the anime, or changes its series or its episodes, the
  files linked to it are run through the preset again. Your files follow along when an episode title is corrected on
  AniDB.

Whether a file is touched at all depends on the **Drop Type** of the managed folder it's in, and so does whether a
folder is offered as a destination. See [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders).

:::info Files Already in Your Library
With **Allow relocation inside destination on import** on, which is the default, the files in your **Destination**
folders are renamed again whenever their anime's details change. Turn it off if you only want new files from your drop
sources to be renamed, and want files to keep their names once they've arrived.
:::

## How a Destination Is Chosen

The renamer picks the destination, from the managed folders Shoko offers it. The WebAOM Renamer puts a new file next to
the other files of its series when it can, and otherwise into the first **Destination** folder with room for it, in a
folder named after the series. [Moving Files](/renamer-plugins/webaom/moving) has its rules, including when it uses a
folder with the **None** drop type.

Whatever the renamer answers, Shoko checks it before moving anything:

- The new location has to be inside the managed folder the renamer picked.
- When the file moves to another managed folder, the drive has to have enough free space for it.
- Missing folders on the way are created.

A file that's already where the renamer wants it isn't touched. If another file already has the new name, the file
isn't moved, with one exception: when the other file is an older version of the same release from the same release
group (a v1 where you're adding the v2), the older file is deleted and the new one takes its place.

## Files Shoko Can't Sort

A renamer has to say which kinds of files it can handle, and Shoko never hands it any other kind:

- **Unrecognized files**, which Shoko couldn't match to anything, have no series or episode to name them after. Only a
  renamer that supports unrecognized files gets them. The WebAOM Renamer doesn't, so they stay where they were added.
- **Files linked only to another source**, whose release links them to entries from a source such as TMDB but not to
  AniDB, are recognized, but a renamer that sorts by AniDB anime has nothing to work with. Only a renamer that says it
  supports them gets them. The WebAOM Renamer doesn't.
- **Files that are recognized, but waiting for their series**, usually because the episode is newer than Shoko's copy
  of the anime, wait too. Unless the renamer says it can cope with missing details, Shoko sorts them once the series
  is there; see **Recognized but Not in a Series Yet** in
  [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files).

See [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files) for what counts as
recognized. Once you link an unrecognized file, it's sorted like any other.

## Subtitles and Other Files Next to the Video

When Shoko renames or moves a video, it takes the external subtitle files along: files in the same folder whose names
start with the video's name, in a text subtitle format (such as `.srt`, `.ass`, `.ssa`, `.smi` or `.txt`) or VobSub
(`.idx` and `.sub`). They get the video's new name and keep the rest of their own, so `Episode 01.en.ass` next to
`Episode 01.mkv` becomes `New Name.en.ass`. A subtitle file that already has that name at the destination is replaced.

Nothing else is moved: `.nfo` files, images, font folders and the like stay behind.

## Empty Folders

When a move leaves a folder empty, Shoko deletes it, along with any parent folders that are empty as a result, up to
the managed folder. The managed folder itself is always kept. A folder with anything left in it, even a single
`.nfo` file, isn't deleted.

On its own, Shoko cleans up this way when **Move on import** is on. Renaming by hand in the **Relocate Files** utility
always cleans up after the files it moves.

## Renaming by Hand

The **Relocate Files** utility runs any preset on files you pick, whether the import settings are on or not, and
previews the result first; see [File Rename](/shoko-server/file-rename). Drop types still apply: a file in a folder
with the **None** drop type can't be renamed or moved, not even by hand, and a file in a **Destination** folder only
when **Allow relocation inside destination on import** is on.

## When a Renamer Can't Be Used

A preset's renamer can be missing (not installed, or disabled), or unable to work right now, for example because it's
missing something it needs or the service behind it has paused it. Either way, the file stays where it is. An
automatic rename or move that fails writes the reason to the [log](/shoko-server/logs), and
[File Rename](/shoko-server/file-rename) shows how such a preset looks in the utility.

## What This Means for You

- **Check the default preset before you turn anything on.** Preview a few files with it in the **Relocate Files**
  utility first; see [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically).
- **Files only move between managed folders**, and only out of a folder whose drop type lets them.
- **Unrecognized files stay put.** With the WebAOM Renamer, a drop source keeps whatever Shoko couldn't match, which
  makes it a handy to-do list. See [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).
- **Names follow the metadata.** With automatic renaming on, a title change on AniDB renames your files again, in your
  destination folders too unless you turn off **Allow relocation inside destination on import**.
- **Only subtitles come along.** Keep other extra files out of your drop sources, or expect to move them yourself.

## Related

- [Sort New Files Automatically](/shoko-server/how-to/sort-new-files-automatically): set up a drop source and
  destination step by step.
- [File Rename](/shoko-server/file-rename): the **Relocate Files** utility.
- [Import Settings](/shoko-server/settings/import): the import options and managed folders.
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders): drop types and how new
  files are noticed.
- [Moving Files](/renamer-plugins/webaom/moving) and [Renaming Files](/renamer-plugins/webaom/renaming): the WebAOM
  Renamer's rules.
- [Available Renamers](/renamer-plugins/available-renamers): where other renamers come from.
