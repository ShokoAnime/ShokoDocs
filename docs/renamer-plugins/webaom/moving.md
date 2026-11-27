---
title: Moving Files | WebAOM Renamer
description: Information on how to use the WebAOM renamer for moving files.
---

# Moving Files

The WebAOM renamer is capable of moving files to a new location based on the anime metadata provided by Shoko using
one of two methods: without group aware sorting and with group aware sorting. Either way, it only picks among managed
folders, and only for files Shoko has matched to an AniDB anime. For when Shoko moves files, and which files it leaves
alone, see [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).

## Without Group Aware Sorting (Default)

By default, this renamer will attempt to move files into a flat `Anime Title / Filename` structure.

When determining the destination of a new file:

1. If there are other files of the same anime, it tries to move the new file into the folder of one of them. It goes
   through the anime's episodes from the latest air date to the earliest, and takes the first file that meets these
   requirements:
   - Its episode belongs to this anime only. Episodes whose files are also linked to another anime are skipped.
   - It is inside a managed folder that doesn't have the `Source` or `Both` drop type. This can be any other managed
     folder, one with the `None` drop type included.
   - There is enough disk space to accommodate the file, unless the file is already in that managed folder.
   - It isn't in the folder the new file is already in.
2. Otherwise, the managed folder and subfolder are chosen:
   - The first managed folder (undefined order) found that meets these requirements is chosen:
     - Its drop type is `Destination` or `Both`.
     - Its location exists.
     - There is enough disk space to accommodate the file.
   - The subfolder is set to the Shoko preferred language anime title.
     - If the anime title has illegal characters, they will be replaced with unicode alternatives.

If no folder meets these requirements, the file isn't moved, and the result reads
`The renamer "WebAOMRenamer" could not find a valid destination.`

## Group Aware Sorting

When group aware sorting is enabled, anime will be moved into subfolders depending on whether they are part of a Shoko group with one or more other anime series.
It doesn't look for the folders of other files of the same anime.

- The managed folder is chosen:

  - If the anime is marked as `Restricted` on AniDB, it will try to move it to the first `Destination` managed folder with a path that contains the string `hentai` (case insensitive), and otherwise to the first `Destination` managed folder.
  - Otherwise, it will try to move to the first `Destination` managed folder without the string.
  - A managed folder with the `Both` drop type counts as a `Destination` here.
  - The renamer doesn't check whether the folder's location exists or has enough disk space. Shoko still refuses
    to move a file into another managed folder whose drive doesn't have room for it.

- The subfolder is chosen:
  - If a file is part of an anime that is grouped with other anime series, it will be moved to `Group Name / Anime Title / Filename`.
  - Otherwise, it will be moved to `Anime Title / Filename`.
  - If the anime title has illegal characters, they will be replaced with unicode alternatives.
