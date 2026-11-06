---
title: AnimeThemes Integration | Plex
description: Use Shoko Relay to map AnimeThemes WebM videos, generate Theme.mp3 files, and play local themes.
---

## AnimeThemes Integration

Shoko Relay includes full [AnimeThemes](https://animethemes.moe/) integration. This allows those who are fans of anime openings and endings to have automatic OP/ED metadata for the majority of their collection.

### Themes as Video Extras

The plugin will look for '.webm' theme files in a folder called `!AnimeThemes` (or the configured `AnimeThemes Root Path`) which is located in the root of your anime library (this works for any "destination" type folder managed by Shoko). These files must have the same name as they do on the AnimeThemes website and then a mapping must be generated for them, in what is essentially a 3 step process. Simply navigate to the "AnimeThemes: VFS" section of the dashboard page to get started.

1. Download anime theme videos and place them in the `!AnimeThemes` folder
   - There is a torrent available with over 19000+ themes and a button on the dashboard for downloading themes from the current season
   - An endpoint (`/animethemes/webm/download`) is also available to help download things not available in the current torrent
2. Generate a mapping for the videos by clicking the `Build Mapping File` button:
   - If you have the torrent click the `Import Curated Mapping File` button to download the [current torrent mapping](https://gist.github.com/natyusha/bb33a3b3bc95bc7a3869633e23d522bb)
     - This will overwrite any existing mappings if they exist
   - Mapping the torrent takes ~8 hours (due to rate limits) and generated mappings will be appended to it
3. Apply the mapping to the VFS by clicking the `Generate` button
   - The themes will be placed in the "Shorts" folder of their respective series

:::tip
By default, the plugin appends metadata attributes to the filename, such as `[SPOIL, SUBS]`. If you prefer a cleaner look, you can disable this by unchecking `Advanced Settings > Append AnimeThemes Tags` in the dashboard's Provider Settings. Note that a fresh "Generate" run is required to rename existing links after changing this setting.
:::

### Themes as Series BGM

There is also support for generating `Theme.mp3` files as local metadata. This will add them to the VFS automatically and can be run for either a single series or as a batch operation. This process requires Shoko Relay to have access to [FFmpeg/FFprobe](https://ffmpeg.org/download.html). Place system appropriate binaries in one of the following locations: Shoko Server's `Utilities` folder in a subfolder named `FFmpeg` (case sensitive), the ShokoRelay plugin folder, or the system PATH. This is required due to AnimeThemes not providing the '.mp3' files that Plex requires for this feature (they use '.ogg').

- This is available under the "AnimeThemes: MP3" section of the dashboard
- Input the path (relative to Shoko or a mapping) to a folder containing an anime series and then click `Generate`
- The `Audit Theme.mp3 Files` button will check for the availability of an opening for any theme file that isn't tagged as "Opening 1"
  - This is for cases where the ED was downloaded before the OP existed on AnimeThemes
- The `Current Season Filter Toggle` will limit batch operations to anime airing in the current season (with a one-month buffer)
- The `Force Overwrite Toggle` will overwrite any `Theme.mp3` files found in the configured path (or during a batch)
- The `Recursive Batch Toggle` (on by default) will enable batch operations on every subfolder of the configured path
- By default this will grab the first available OP with a fallback to the first ED
- If you want a specific OP/ED you can enter it under `Slug` i.e. `OP2`
- Rarely a single AniDB entry will be mapped to multiple AnimeThemes entries. In cases like this the `Off.` or "Index Override" can be set to pick the next match
  - Generally this means entering a `1`
- _Theme.mp3 generation can be run per folder from the [VFS Browser](/plex/additional-information#vfs-browser) page (uses the default settings)_

#### Miniplayer

There is a mini media player included on the dashboard which will play downloaded themes if enabled. You can set it to looped playback or even have it shuffle through all of your Theme.mp3 files if desired. The progress bar is fully functional and you can pause playback by middle clicking it.

### AnimeThemes Player

Shoko Relay includes a browser based video player designed specifically for local AnimeThemes playback. It can be accessed via the `Open Video Player` icon (clapboard) within the "AnimeThemes: VFS" section of the dashboard, as an embed in Shoko's WebUI under `Settings > Plugins > Shoko Relay > AnimeThemes Player`, or via a dedicated URL: `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/player`.

There is an included tree view which allows you to browse your themes by `Group > Series` (as they would appear in Plex) or by `Source Folder > Series`. Within the tree view any series which is not associated with Shoko's collection will be greyed out (group view will also place them in the "Missing from Collection" branch). A search box is included which will filter the tree view based on series, group, folder or filename level queries. The filter supports tag-based filtering syntax using `+` (inclusion) and `-` (exclusion) operators. Support for Loop, Shuffle, and Sequential playback is also available via a 4 stage toggle button.

:::tip
There is a help button in the top right of the video player which will show a full list of keybinds and filters.
:::

#### Favourites

You can mark any theme as a favourite by clicking the heart icon `❤` next to its name in the tree view. Once marked as a favourite the icon for a given item will change to be red in colour and it will be persisted to a settings file based on its AnimeThemes VideoID. To quickly view only your marked themes, type `favs` into the search bar. This keyword can be combined with other search terms as well as tags (e.g., `+nc favs gundam`) to find specific favourites.
