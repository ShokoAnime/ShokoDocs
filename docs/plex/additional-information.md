---
title: Additional Information | Plex
description: Additional information about Shoko Relay's Plex metadata, VFS, and advanced features.
---

<script setup>
const episodeTypeColumns = [
  { name: 'Prefix', header: 'Prefix' },
  { name: 'Type', header: 'Type' },
  { name: 'Subfolder', header: 'Subfolder' }
];

const episodeTypeData = [
  { Prefix: 'S##E##', Type: 'Episode', Subfolder: 'Season #' },
  { Prefix: 'S##E##', Type: 'Special', Subfolder: 'Specials' },
  { Prefix: 'C# ❯', Type: 'Credits', Subfolder: 'Shorts' },
  { Prefix: 'T# ❯', Type: 'Trailer', Subfolder: 'Trailers' },
  { Prefix: 'P# ❯', Type: 'Parody', Subfolder: 'Scenes' },
  { Prefix: 'O# ❯', Type: 'Other', Subfolder: 'Featurettes' },
  { Prefix: 'U# ❯', Type: 'Unknown', Subfolder: 'Other' }
];

const contentRatingsColumns = [
  { name: 'Tag', header: 'Tag' },
  { name: 'Rating', header: 'Rating' }
];

const contentRatingsData = [
  { Tag: 'Kodomo', Rating: 'TV-Y' },
  { Tag: 'Mina', Rating: 'TV-G' },
  { Tag: 'Shoujo, Shounen', Rating: 'TV-PG' },
  { Tag: 'Josei, Seinen', Rating: 'TV-14' },
  { Tag: 'Sexual Humour', Rating: 'TV-\\*-D' },
  { Tag: 'Nudity, Sex', Rating: 'TV-\\*-S' },
  { Tag: '**★★☆** Violence', Rating: 'TV-14-V' },
  { Tag: '**★★☆** Nudity, **★⯪☆** Sex', Rating: 'TV-14-S' },
  { Tag: 'Borderline Porn (override)', Rating: 'TV-MA' },
  { Tag: '**★★⯪** Nudity, **★★☆** Sex', Rating: 'TV-MA-S' },
  { Tag: '**★★⯪** Violence', Rating: 'TV-MA-V' },
  { Tag: '18 Restricted (override)', Rating: 'X' }
];

const taskReportColumns = [
  { name: 'Action', header: 'Dashboard Action' },
  { name: 'Report', header: 'Log Filename' }
];

const taskReportData = [
  { Action: '**AnimeThemes:** Generate VFS', Report: '`at-vfs-build-report.log`' },
  { Action: '**AnimeThemes:** Build Mapping', Report: '`at-map-build-report.log`' },
  { Action: '**AnimeThemes:** Generate MP3 (Batch)', Report: '`at-mp3-build-report.log`' },
  { Action: '**AnimeThemes:** Audit MP3s', Report: '`at-mp3-audit-report.log`' },
  { Action: '**AnimeThemes:** Download WebMs', Report: '`at-webm-download-report.log`' },
  { Action: '**Plex:** Auth Refresh', Report: '`plex-auth-refresh-report.log`' },
  { Action: '**Plex:** Generate Collections', Report: '`plex-collections-build-report.log`' },
  { Action: '**Plex:** Apply Critic Ratings', Report: '`plex-ratings-apply-report.log`' },
  { Action: '**Plex:** Sync Plex Images', Report: '`plex-images-sync-report.log`' },
  { Action: '**Plex:** Run Full Automation', Report: '`plex-automation-run-report.log`' },
  { Action: '**Shoko:** Generate VFS', Report: '`shoko-vfs-build-report.log`' },
  { Action: '**Shoko:** Audit VFS', Report: '`shoko-vfs-audit-report.log`' },
  { Action: '**Shoko:** Purge Missing', Report: '`shoko-purge-missing-report.log`' },
  { Action: '**Shoko:** Sync Watched States', Report: '`shoko-sync-watched-report.log`' },
  { Action: '**Shoko:** Map Source Symlinks', Report: '`shoko-map-symlinks-report.log`' }
];
</script>

# Additional Information

For setup instructions, see [Installing Shoko Relay](/plex/installing-shoko-relay) and [Controlling Shoko Relay](/plex/controlling-shoko-relay). AnimeThemes setup and playback are covered in [AnimeThemes Integration](/plex/animethemes-integration).

### Advanced Plex Metadata

Shoko Relay has full support for all of Plex's features which involve local metadata or sidecar files:

- [Local Media Assets](https://support.plex.tv/articles/200220717-local-media-assets-tv-shows/)
  - Allows custom metadata to be added to Plex at either the series or episode level
  - This is primarily for posters or other artwork but local theme songs and subtitles are supported as well
  - _Requires the `Plex Local Media` provider to be added to the Shoko Relay Agent in Plex_
- [Local Files for Trailers and Extras](https://support.plex.tv/articles/local-files-for-tv-show-trailers-and-extras/)
  - Allows custom extras to be added to Plex at either the series, season or episode level
  - If enabled, anything inside a folder matching Plex extras naming conventions or with the inline filename suffixes will be ignored by Shoko
  - Season level extras are applied by adding a special suffix to the standard folder names (` S#`) which is not part of Plex's spec
    - e.g. `Scenes S2` would place the extras in `###/Season 2/Scenes`
  - If you don't use and/or want this feature you can disable it under `Advanced Settings > Plex Local Extras`
  - _Requires the `Plex Local Media` provider to be added to the Shoko Relay Agent in Plex_
- [NFO Metadata Files](https://support.plex.tv/articles/using-nfo-metadata-files-with-plex/).
  - Allows overriding most metadata fields for series and episodes to whatever you want
  - Relay treats `.nfo` files just like any other local metadata and will place them in the VFS accordingly
  - _Requires the `Plex NFO Series` provider to be added to the Shoko Relay Agent in Plex_
- Be sure to read each of the above Plex articles if you need help figuring out the format for any of the local metadata

### Virtual File System (VFS)

:::important
The VFS is created inside each of Shoko's managed folders: if they are configured as a "Destination", have no type set, or have not been excluded via `Managed Folder Exclusions`. A subfolder named `!ShokoRelayVFS` (renaming it is possible under `Advanced Settings > VFS Root Path`) will house it. Do not manage anything inside the VFS folders manually.
:::

When building the VFS files are placed into folders which are named according to their Shoko SeriesID. Within those folders they will be split into subfolders depending on the type of episode. For regular episodes or specials this means placement into a `Season #` or `Specials` folder. Files placed into those folders are named with the following pattern: `S##E##(-pt#)(-dup#) [{ShokoFileID}]([{isVariation}]).ext` (the parts in parenthesis are conditional). Files with `-pt#` in their name will also have `[{ShokoFileID}]([{isVariation}])` stripped to fully follow the format described in [Combining Episodes](#combining-episodes). To avoid conflicts any file which is a crossover episode will not trigger local metadata/subtitle linking.\
_The ShokoFileID is unused by Plex and is there purely to help users visualise the file mappings._

Non standard episodes on the other hand, are placed into a local series level Extra folder. Due to Plex not having individual episode pages or metadata for files placed in said folders they will be named according to the episode name (with a prefix) `X# ❯ Title.ext`. The following table showcases the assignments.

<EasyTable :columns="episodeTypeColumns" :data="episodeTypeData" />

#### "Other" Rule

`Other` type episodes have a special rule where they will attempt to place themselves in `Season 1` or `Specials` if either is empty of physical files. Otherwise, they will be placed in `Featurettes` and display as extras in Plex. This was implemented because these episodes are generally parts of a Movie and have a full set of metadata which would not appear if they were in Plex's local extras.

#### Extra-Only Series Rule

Plex requires a series to have at least one episode in a recognized season folder (`Season ##` or `Specials`) for it to be visible in a library. For series which are comprised entirely of Extras (non-standard episodes), the highest priority extra type will be promoted to `Season 1` which will allow Plex to display it. The following priority determines what is promoted first:

1. `Credits` (Shorts)
2. `Trailers` (Trailers)
3. `Parody` (Scenes)

Any remaining extras will stay in their respective subfolders as normal.

#### Crossover Episode Limitations

Crossover episodes are files which are linked to multiple episodes spanning separate AniDB series. Due to Plex's architecture they will only function in one series at a time. Since the plugin doesn't know which episode the user prefers, unwanted crossover entries must be hidden via Shoko's series page. To work around this limitation crossover episodes can also be modified (so the file's hash changes) then manually linked in Shoko to the desired episode.

#### VFS Audit

The VFS includes built-in audit functionality that scans existing VFS directories to find and prune orphaned folders, empty subdirectories, and broken symlinks whose source files were deleted or moved. It also updates the VFS Browser blueprint and generates a report at `logs/shoko-vfs-audit-report.log` in the plugin directory. It can be accessed via the `VFS Audit` button (database checkmark) in the "Shoko: VFS" section of the dashboard.

### VFS Browser

In order to help visualise the VFS and all of the files it contains there is a "VFS Browser" page included with the plugin. It can be navigated to by clicking the folder icon in the top right of the "Shoko: VFS" section of the dashboard, as an embed in Shoko's WebUI under `Settings > Plugins > Shoko Relay > VFS Browser`, or by a dedicated URL: `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/browser`. Unlike opening the VFS in a normal file browser, this will list the series title and the AniDB/Shoko IDs which correspond to each folder. Each ID will link directly to its source and there is also an included link to the `/metadata/` endpoint for series and seasons. VFS regeneration can be called on any series by clicking the "Refresh VFS Folder" `⟳` icon next to its name in the tree view (this avoids having to look up AniDB/Shoko IDs to use the filter on the dashboard). Similar to the refresh button, there is a "Theme.mp3" `♬` button which tracks if a given VFS entry has a local AnimeThemes `.mp3` attached to it or not. Clicking the button will attempt to generate a theme for any series missing one.

### Automatic Title Modification

#### Common Prefixes for Series

When a series starts with a common title prefix (and `Move Common Series Title Prefixes` is enabled in the Provider Settings) it will be moved to the end of the title. The prefixes considered common by the provider are governed by the following regex:

```regex
^(Gekijou ?(?:ban(?: 3D)?|Tanpen|Remix Ban|Henshuuban|Soushuuhen)|Eiga|OVA) (.*$)
```

#### Ambiguous Titles for Episodes

In cases where AniDB uses ambiguous episode titles the series title will be used instead (with the original title appended to it as necessary). The titles considered ambiguous by the provider are governed by the following regex:

```regex
^(Episode|Volume|Special|Short|(Short )?Movie) [S0]?[1-9][0-9]*$
```

:::note
The appended titles for both series and episodes will appear after an em dash (**—**) making it easy to search for anything affected by this.
:::

### Separate Movie Libraries

If you prefer separate movie libraries (which is not recommended), Shoko Relay provides an opt-in feature to allow this. By enabling `Movie Generation Mode` under `Advanced Settings`, the plugin will generate a dedicated VFS root for movies (default `!ShokoRelayMovieVFS`) alongside the standard unified VFS.

#### Caveats

- Shoko groups that blend series and movies will be split across two entirely separate Plex libraries, breaking the chronological viewing order that Plex would usually provide for them
- For Shoko series entries containing multiple movies, symlinks for specials will be duplicated across each movie as there is no way to automatically determine which one it belongs to
- Plex Movie libraries do not support individual metadata for specials, so they will be relegated to generic "Local Extras" without descriptions or any other metadata

:::details Usage

- Navigate to `Settings > Metadata Agents`
- Click `Add Provider` in the Metadata Providers header and supply the following URL:
  - `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/movie`
- Click `Add Agent` in the Metadata Agents header, name it `Shoko Relay Movie` and select it as the primary provider
- Optional: Under `additional providers` select `Plex NFO Movie` then click the `+`
- Under `additional providers` select `Plex Local Media` then click the `+`
- Ensure that the additional provider(s) are above the `Shoko Relay Movie` primary entry and `Save`
- Create a Plex "Movies" library and point it to a `!ShokoRelayMovieVFS` folder
- Be sure to set the Scanner to `Plex Movie` and the agent to `Shoko Relay Movie`

:::

:::details Info

#### VFS Mapping

When building the movie VFS files are placed into folders which are named according to their Shoko EpisodeID. Movies placed into those folders are named with the following pattern: `Movie(-pt#)(-dup#) [{ShokoFileID}]([{isVariation}]).ext` (the parts in parenthesis are conditional). Files with `-pt#` in their name will also have `[{ShokoFileID}]([{isVariation}])` stripped to fully follow the format described [here](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/#toc-3). Non standard episodes on the other hand are handled the same way as the [standard VFS](#virtual-file-system-vfs).\
_The ShokoFileID is unused by Plex and is there purely to help users visualise the file mappings._

#### VFS Browser

When enabled movies will also appear in the [VFS Browser](#vfs-browser) as entries under their corresponding ShokoSeriesID.

:::

### TMDB Matching

If you have a TMDB link for a given series in Shoko, it will have access to several features not available otherwise:

- Plex's default theme song support (using the TheTVDB ID provided by TMDB cross references)
- Fallback for series/episode descriptions and titles (if AniDB is missing that information)
- Background/backdrop/logo image support as well as additional main series poster options (if available)

With `TMDB Episode Numbering` enabled in the Advanced Provider Settings the following will also be supported:

- Season support for long running anime including names, posters, titles and descriptions
- Combining multiple Shoko series into a single Plex entry
- Alternate episode ordering for seasons

#### Curated TMDB Mappings

If you don't have any TMDB links in Shoko it is recommended that you start off with a curated list before auto linking. Simply navigate to `Settings > Metadata > Cross-References` in Shoko and import the following file: [**Shoko: AniDB → TMDB Mappings**](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed)

#### Alternate TMDB Episode Ordering

If you aren't happy with TMDB's default episode/season structure for a series, you can change it to an alternate.\
[**Additional Info Here**](https://docs.shokoanime.com/shoko-server/tmdb-features#alternate-episode-ordering)

:::note
If you select an alternate order for a series TMDB season posters will no longer be automatically added to Plex.
:::

#### Combining Series & Custom Episode Mappings

This allows shows which are separated on AniDB but part of the same TMDB listing to be combined into a single entry in Plex. To achieve this, click the `VFS Overrides Editor` button in the "Shoko: VFS" section of the dashboard. It will open a modal which will create (or edit an existing) `anidb_vfs_overrides.csv` file in the plugin's config directory. Each line should contain a comma separated list of AniDB IDs you wish to merge. For this to work automatically, all of the AniDB IDs on the line must share the exact same TMDB link. The first ID is the _primary series_ and the others will be merged into it (for both VFS builds and metadata lookups).

If a secondary series does _not_ share a TMDB link (or if you want to manually map episodes of a single series), you can assign specific season and episode coordinates by appending episode information to the ID. The formatting is available in the details block below:

:::details Advanced Episode Formatting

Custom episode assignments allow series to be mapped to specific seasons and episode numbers using the following syntax:

`{AniDB ID};{Episode Type}{Source Range}S##E##`

- **AniDB ID:** A single AniDB ID
- **Assignment Separator:** `;` separates the series ID from its assignments
- **Episode Type:** By default regular episodes are assumed meaning no episode type needs to be entered. Specific AniDB episode types can be targeted by prefixing the source episode number:
  - `S` - Specials (e.g. `s1s0e101`)
  - `C` - Credits / Theme Songs (e.g. `c1-2s0e201`)
  - `T` - Trailers
  - `P` - Parodies
  - `O` - Other (e.g. `o1s0e102`)
- **Source Range:** Ranges are specified with a hyphen (e.g. `1-10s1e1`), while single episodes omit it (e.g. `12s1e13`)
- **Episode Separator:** `|` separates multiple assignments for the same series

#### Notes:

- All letters (`s`, `e`, and type prefixes) are case-insensitive and leading zeros are optional
- If no source range or type is specified (e.g. `;s0e101`), all regular episodes of the secondary series are mapped sequentially starting from that episode number
- Custom assignments can also be used on a standalone line for a single series without merging secondary series

#### Examples:

- `1234;1-12s1e1|13-24s2e1` - Splits the first 24 episodes of a single series across Season 1 and Season 2 without merging other series
- `1234,5678;s0e101,91011;s0e201` - Maps all regular episodes of AniDB IDs `5678` and `91011` sequentially into Specials of `1234` starting at episodes 101 and 201
- `1234,5678;1-12s1e1|13-24s2e1` - Splits the first 24 episodes of series `5678` across Season 1 and Season 2 of `1234`
- `1234,5678;1-10s1e1|s1s0e101|o1s0e102` - Maps `5678` into `1234` with regular episodes 1–10 to Season 1, Special 1 to S00E101, and Other 1 to S00E102

:::

It is highly recommended to use this feature for series like "Akahori Gedou Hour Rabuge" where every episode is a crossover.

An example `anidb_vfs_overrides.csv` is available [here](https://gist.github.com/natyusha/a9ad00a5c16276cfbe2553346c745f1c).

:::tip
If you want all Shoko series which share a TMDB series link to be merged automatically this can be achieved by enabling `Advanced Settings > Auto Merge TMDB Series`. This will automatically disable AniDB numbering for the affected series regardless of the configured `TMDB Episode Numbering` setting.
:::

### Combining Episodes

Sometimes you may encounter a single episode which is split across multiple files. In order to ensure that all of the files are treated as a single entity you can follow Plex's [Naming Conventions](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/#toc-6). The VFS will automatically respect this type of file naming in the background. For an ideal playback experience however, it is recommended to merge these types of files together.

### Assumed Content Ratings

If `Assumed Content Ratings` are enabled in the Provider Settings the [target audience](https://anidb.net/tag/2606/animetb) and [content indicator](https://anidb.net/tag/2604/animetb) tags from AniDB will be used to roughly match the [TV Parental Guidelines](https://www.tvguidelines.org/resources/TheRatings.pdf) system. These ratings will take precedence over any ratings that TMDB might provide. The target audience tags will be checked for ratings from most restrictive to least, then the content indicators will be appended. If the tag weights for the content indicators are high enough (≥ 400 or ★★☆) the rating will be raised to compensate. A general overview is listed in the table below:

<EasyTable :columns="contentRatingsColumns" :data="contentRatingsData" />

### Task Reports & Logs

Most manual actions performed via the dashboard (as well as some direct API requests) generate a detailed report. These reports help you verify which items were processed and troubleshoot any skipped files or errors. A list of the actions which generate a log is provided below:

<EasyTable :columns="taskReportColumns" :data="taskReportData" />

#### How Logs Work

- Logs are stored in the `logs/` subfolder within the plugin directory.
- When a task completes, a toast notification appears on the dashboard with a `[view log]` link.
- These files are overwritten each time the corresponding task is run.
- To save a specific report, you must download or copy the text before running that task again.
- Links to the currently generated logs are available at the bottom of the dashboard in the "Task Logs" section

### Plugin API

Controlling this plugin directly is possible via HTTP GET/POST; see the [Controller API](/plex/shoko-relay-api) for more information.

### Missing Info

Due to this plugin relying on Plex's metadata provider feature (which is still under development) some things may be missing or not work correctly.

#### Missing from Shoko's Abstractions

- **TMDB**: taglines

#### Missing Plex Provider Features

- Collection metadata like summaries and custom sort titles/artwork (currently implemented via Plex's HTTP API)
- Custom or generic rating icons
