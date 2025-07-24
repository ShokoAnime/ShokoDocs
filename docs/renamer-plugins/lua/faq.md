---
title: Frequently Asked Questions | Lua Renamer
description: Common questions and usage scenarios for Lua Renamer.
---

# Frequently Asked Questions

Answers to common questions and usage scenarios for Lua Renamer.

## How do I split my collection across import folders?

The easiest option is to set the destination by import folder name. Keep in mind the import folder must have the Destination or Both drop type. You may also specify the destination by the full path of the import folder on the server or by referencing it directly via `importfolders`.

```lua
if anime.restricted then
  destination = "hentai"
else
  destination = "anime"
end
```

## How do I split my collection across subfolders?

```lua
if anime.type == AnimeType.Movie then
    subfolder = { "Anime Movies", anime.preferredname }
else
    subfolder = { "Anime", anime.preferredname }
end
```

## How do I group my anime according to Shoko?

Adding Shoko group name to subfolder path when there are multiple series in group.

```lua
if #groups == 1 and #groups[1].animes > 1 then
  subfolder = {groups[1].name, anime.preferredname}
end
use_existing_anime_location = false -- Allows files in Destination import folders to be moved when a group previously had 1 series.
```

## How do I move/rename my anime collection according to seasons?

AniDB, Shoko's metadata provider does not have the concept of seasons. Therefore the metadata available cannot be cleanly mapped. I recommend using Shoko Metadata for Plex or Shokofin for Jellyfin as your client instead of depending on other metadata providing plugins.

## How can I hard/soft link my files instead of moving them?

Neither Shoko nor this plugin has the ability to create file links. I recommend creating any links before the file is processed by Shoko. Usually download clients have the option to run a script on download completion. You can create a script to link files to a Shoko drop source folder. Feel free to contact me if you need help with this.  

Note: If you hard link your files you will need to create an import folder for each file system/volume used. You want to keep the files on the same file system.
