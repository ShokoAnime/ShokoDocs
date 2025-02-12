---
title: Moving Files | WebAOM Renamer
description: Information on how to use the WebAOM renamer for moving files.
---

# Moving Files

The WebAOM renamer is capable of moving files to a new location based on the anime metadata provided by Shoko using
one of two methods: without group aware sorting and with group aware sorting.

## Without Group Aware Sorting (Default)

By default, this renamer will attempt to move files into a flat `Anime Title / Filename` structure.

When determining the destination of a new file:

1. If there exists other file(s) associated with the same anime, it will try to move the new file to the same folder as the first file (sorted by latest episode air date first) that meets these requirements:
   - It is inside an import folder that is not a `Source` drop type.
   - There is enough disk space to accomodate the file.
2. Otherwise, the import folder and subfolder are chosen:
   - The first import folder (undefined order) found that meets these requirements is chosen:
     - It is marked as a `Destination`
     - The file path exists
     - There is enough disk space to accomodate the file
   - The subfolder is set to the Shoko preferred language anime title.
     - If the anime title has illegal characters, they will be replaced with unicode alternatives. See: [the ReplaceInvalidFolderNameCharacters function](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Server/Utilities/Utils.cs).

## Group Aware Sorting

When group aware sorting is enabled, anime will be moved into subfolders depending on whether they are part of a Shoko group with one or more other anime series.

- The import folder is chosen:

  - If the anime is marked as `Restricted` on AniDB, it will try to move it to the first `Destination` import folder with a path that contains the string `hentai` (case insensitive).
  - Otherwise, it will try to move to the first `Destination` import without the string.

- The subfolder is chosen:
  - If a file is part of a anime that is grouped with other anime series, it will be moved to `Group Name / Anime Title / Filename`.
  - Otherwise, it will be moved to `Anime Title / Filename`.
  - If the anime title has illegal characters, they will be replaced with unicode alternatives. See: [the ReplaceInvalidFolderNameCharacters function](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Server/Utilities/Utils.cs).
