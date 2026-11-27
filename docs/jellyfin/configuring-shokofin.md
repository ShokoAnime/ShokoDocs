---
title: Settings Reference | Jellyfin
description: Every Shokofin plugin setting, what it does, its default, and what to do after changing it.
---

# Settings Reference

This page lists every setting on Shokofin's settings page, tab by tab and section by section, using the labels you see
in Jellyfin. To open the settings, go to Jellyfin's **Dashboard** → **Plugins** → **Shoko**. Most tabs only appear after
you have [connected to Shoko Server](#connecting-to-shoko-server).

:::info TMDB and TheMovieDb
Like Jellyfin, Shokofin's settings page calls TMDB "TheMovieDb". These docs follow Shoko Server and call it TMDB, so a
label such as **TMDB Shows & Movies Structure** appears as **TheMovieDb Shows & Movies Structure** in the plugin.
:::

Each setting has a short description and its default for a fresh install. For the "why" and step-by-step setups, follow
the links to the how-to guides and concept pages. Settings are saved per section with that section's **Save** button.

Changes don't always apply to media that is already in your libraries. Some only need a metadata refresh, others
require re-creating the library. See [Change Impact](#change-impact) before you change anything on an existing setup.

Settings marked <Badge type="danger" text="Advanced" /> are hidden until you enable [Advanced Mode](#advanced-mode).
Settings marked <Badge type="warning" text="Experimental" /> are still being tested.
Settings marked <Badge type="tip" text="Next release" /> are not in the current stable release yet.

:::warning Attention Windows Users
The [Virtual File System (VFS)](/jellyfin/concepts/virtual-file-system) needs permission to create symbolic links. On
Windows, enable
[Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device)
and restart Jellyfin before creating libraries. Shokofin tests this at startup. If it fails while the plugin has no
configuration yet, the default library operation mode becomes **Legacy Filtering (Strict)** instead of the VFS; an
install that already has settings keeps the VFS, and its scans fail until Developer Mode is on.
:::

## Advanced Mode

Some settings, a whole tab, and several scheduled tasks are hidden by default because most setups never need them. To
show them:

1. Connect to Shoko Server on the **Connection** tab. The **Server Version** field only appears once you're connected.
2. Click the **Server Version** field seven times. From the third click, a message counts down the remaining clicks.
3. Repeat the same clicks to hide the advanced options again.

Advanced mode reveals:

- the **Misc** tab,
- every setting marked <Badge type="danger" text="Advanced" /> on this page, including the whole **Tag & Genre
  Settings**, **Multiple Versions Settings**, **Season Merging Settings** and VFS **Generation Settings** sections,
- the **Configure settings for** selectors that let you override title, description and image settings per entity type,
- library IDs next to library names in the library selectors,
- the advanced [scheduled tasks](/jellyfin/scheduled-tasks).

## Change Impact

What you need to do after changing a setting on a library that already has media in it.

| After changing… | Do this |
|---|---|
| Connection, SignalR, Users, collection and playlist settings, multiple versions settings, Misc | Nothing. Collections, playlists and version merges are rebuilt after the next library scan, or run the matching [scheduled task](/jellyfin/scheduled-tasks). |
| Title, description, image, tag, genre, content rating, production location and studio settings; **Add Prefix to Episodes**; third party IDs and links | Refresh the library's metadata with **Replace all metadata** (and **Replace existing images** for image settings). |
| **Default Library Structure Mode** or a series' **Library Structure Mode**, season ordering, **Separate Movies from Shows**, **Series Type**, **Episode Conversion Mode**, any season merging setting | [Re-create the library](/jellyfin/how-to/re-create-a-library-safely). These change how shows and seasons are built, so existing entries are removed and added again. |
| **Default Specials Placement Within Seasons** or a series' **Specials Placement Within Seasons** | [Re-create the library](/jellyfin/how-to/re-create-a-library-safely). Refreshing alone leaves mixed metadata. |
| **Library Operation Mode** | [Re-create the library](/jellyfin/how-to/re-create-a-library-safely). |
| **VFS Location**, **Custom VFS Root Location**, **Add Release Group to Path**, **Add Resolution to Path** | Nothing to run, but affected entries are removed and added again on the next scan. Episode watch state in Jellyfin is kept, since it's tied to the show's Shoko ID and the season and episode numbers. Movie watch state is only kept for movies with a TMDB ID (see **Add Third Party IDs**); otherwise it follows the file path and is lost. Other Jellyfin-only data, such as trickplay that wasn't moved next to the media, is lost. |
| Groups, series types or TMDB links in Shoko Server | Treat it like a structure change: refresh, and re-create the library if shows or seasons end up wrong. |

To keep your watch history safe, [sync your users' watch state](/jellyfin/how-to/sync-watch-state) to Shoko before
re-creating a library.

## Connecting to Shoko Server

The **Connection** tab. The other tabs appear once you're connected. See the
[Quick Start](/jellyfin/quick-start#connecting-to-shoko-server) for a walkthrough and
[Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies) for container setups.

### Connection Settings

| Setting | Description | Default |
|---|---|---|
| Private Host URL | The address Jellyfin uses to reach Shoko Server, including the protocol and port, e.g. `http://192.168.1.10:8111`, or `http://shoko:8111` in Docker. All plugin traffic to Shoko goes here. Images reach your devices through Jellyfin, so they never need this address. | `http://127.0.0.1:8111` |
| Public Host URL | Optional. The address your browser uses to reach Shoko. It's only used for the "Shoko" links on item pages in Jellyfin. Leave it empty if the private URL also works from your browser. | *(empty)* |
| Username | The username of a Shoko Server **administrator** account. | `Default` |
| Password | The password for that account. It's only used once to create an API key and is never stored. | *(empty)* |
| Connect | Signs in and saves the API key. The key shows up in Shoko under **Settings** → **API Keys** as "Shoko Jellyfin Plugin (Shokofin)". | |
| Server Version | Shown once connected: the version of Shoko Server you're connected to. It's also the switch for [Advanced Mode](#advanced-mode). | |
| Disconnect | Removes the saved connection. Stop any running Shokofin tasks before you press it. | |

## Metadata

The **Metadata** tab controls what Shokofin fills in for your shows, seasons, episodes, movies and collections. After
changing anything here, refresh your libraries with **Replace all metadata**. For recipes, see
[Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language) and
[Titles, Descriptions & Images](/jellyfin/concepts/titles-descriptions-and-images).

### Title Settings

With [Advanced Mode](#advanced-mode) enabled, the title, description and image sections get a **Configure settings for**
selector. Pick an entity type, for example **Episode (TMDB Shows & Movies Structure)**, and tick **Enabled**. The
settings below it then apply only to that type. Types without an enabled override use **Global Settings**.


| Setting | Description | Default |
|---|---|---|
| Add Prefix to Episodes | Adds `S` and the special's number to the title of specials, e.g. `S1 Recap`. | On |
| Always Use Episode Title for TMDB Movies <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" /> | For entries linked to a TMDB movie, uses the episode title as the movie title instead of "Series: Episode". You may also need to adjust the title settings for movies. | Off |
| Configure settings for <Badge type="danger" text="Advanced" /> | Which entity type the title settings below apply to: **Global Settings**, or a Box-Set / Collection, Movie / Film, Series / Show, Season or Episode type for each of the three library structures. | Global Settings |
| Enabled <Badge type="danger" text="Advanced" /> | Turns on the override for the selected entity type. When off, that type follows the global settings. | Off |
| Remove Duplicate Titles | Removes alternate titles that repeat the main title or each other. | Off |


**Main Title**

| Setting | Description | Default |
|---|---|---|
| Title Source | The sources for the main title, tried in the order listed. Options: **Shoko \| Let Shoko decide**, **AniDB \| Default title**, **AniDB \| Follow metadata language in library**, **AniDB \| Use the language from the media's country of origin**, **TMDB \| Default title**, **TMDB \| Follow metadata language in library**, **TMDB \| Use the language from the media's country of origin**. Generic titles such as "Episode 5" are skipped in favour of the next source. | Shoko \| Let Shoko decide |
| Allow Any Title in Selected Language | Lets the AniDB language-based sources use any title in that language when no official title exists. | Off |

**Alternate/Original Title**

Alternate titles fill Jellyfin's **Original Title** field. You can add up to five, and they are joined with ` | `.

| Setting | Description | Default |
|---|---|---|
| Title Source | Same options as the main title, used for this alternate title. | None selected (no original title) |
| Allow Any Title in Selected Language | Same as for the main title. | Off |
| Add | Adds another alternate/original title. | |
| Remove | Removes this alternate/original title. | |

### Description Settings

| Setting | Description | Default |
|---|---|---|
| AniDB Description Conversion Mode | How AniDB descriptions are cleaned up. **Markdown (Default)** keeps links and spoilers as formatting. **Plain Text** strips links, formatting and spoilers. **Disabled** leaves the text untouched. Both conversion modes also remove source lines and extra blank lines. | Markdown |
| Configure settings for <Badge type="danger" text="Advanced" /> | The entity type the settings below apply to, as for titles. | Global Settings |
| Enabled <Badge type="danger" text="Advanced" /> | Turns on the override for the selected entity type. | Off |
| Add Notes | Appends the notes from the AniDB anime page to series and season descriptions. | On |
| Description Source | Sources for descriptions, in priority order: **Shoko \| Let Shoko decide**, **AniDB \| Follow metadata language in library**, **TMDB \| Follow metadata language in library**. AniDB descriptions are in English, so the AniDB source only applies to libraries with English as their metadata language. | Shoko |

### Image Settings

These settings control which images Jellyfin picks automatically for an item. They don't limit what you can choose
yourself in the **Edit Images** dialog.

| Setting | Description | Default |
|---|---|---|
| Configure settings for <Badge type="danger" text="Advanced" /> | The entity type the settings below apply to, as for titles. To make a type follow the global settings again, disable its override. | Global Settings |
| Enabled <Badge type="danger" text="Advanced" /> | Turns on the override for the selected entity type. | Off |
| Respect Preferred Image in Automatic Image Search | Images marked as preferred in Shoko Server are picked first, even if the language filters below would exclude them. | On |
| Use Community Ratings in Automatic Image Search | Orders images by community rating, after the preferred flag and language order. | Off |
| Set Image Dimensions in Automatic Image Search | Tells Jellyfin each image's size, so a library's minimum image size setting can be applied. | Off |
| Only Allow Posters By Language | Limits posters to the checked languages, in the order listed: **No language / Text-less images**, **Follow metadata language in library**, **Use the language from the media's country of origin**, **English (only applies if the metadata language in the library is not English)**. With nothing checked, all posters are allowed. | No language / Text-less images |
| Only Allow Logos By Language | The same filter for logos. | None checked (all allowed) |
| Only Allow Backdrops/Banners/Thumbnails By Language | The same filter for backdrops, banners and episode thumbnails. | None checked (all allowed) |

### Tag & Genre Settings

This whole section is <Badge type="danger" text="Advanced" />. See
[Tags, Genres & Content Ratings](/jellyfin/concepts/tags-genres-and-content-ratings) for what each category contains, with examples.

| Setting | Description | Default |
|---|---|---|
| Ignore Unverified Tags | Skips user-submitted AniDB tags that AniDB hasn't verified yet. | On |
| Tag Sources | Tag categories used for tags: Content indicators; Dynamic (General, Cast, Ending); Elements (General, Pornography & sexual abuse, Tropes & motifs); Fetishes; Origin (Production, Development); Setting (Place, Time period, Yearly seasons); Source material; Target audience; Technical aspects (General, Adaptions, Awards, Multi-anime projects); Themes (General, Death, Tales); Ungrouped; Unsorted; Custom user tags; TMDB (Keywords, Genres); Yearly Season (the first, or all yearly seasons for the entity). | Everything except Ungrouped, Unsorted, both TMDB options and the first yearly season |
| Tag Inclusion Filters | Which kinds of tags are kept: **Type \| Parent tags**, **Type \| Child tags**, **Type \| Abstract tags**, **Type \| Weightless tags**, **Type \| Weighted tags**, **Spoiler \| Global spoiler**, **Spoiler \| Local spoiler**. | All types, no spoilers |
| Minimum Weight for Tags | Minimum AniDB weight (0.5–3.0) for weighted tags. Weightless tags are controlled by the inclusion filters instead. | All Allowed |
| Maximum Depth for Tags | How far below its source category a tag may be. `0` means no limit. | `0` |
| Exclude List for Tags | Comma-separated tag names to leave out. | `18 restricted` |
| Genre Sources | The same categories as **Tag Sources**, used for genres. | Elements \| General, Source material, Target audience |
| Genre Inclusion Filters | The same filters, used for genres. | All types, no spoilers |
| Minimum Weight for Genres | Minimum weight for weighted tags used as genres. | 2.0 |
| Maximum Depth for Genres | How far below its source category a genre may be. `0` means no limit. | `1` |
| Exclude List for Genres | Comma-separated names to leave out of genres. | `18 restricted` |


### Miscellaneous Settings

| Setting | Description | Default |
|---|---|---|
| Only Animation Studios <Badge type="danger" text="Advanced" /> | Only lists the studio credited with the animation work. Applies to AniDB studios only. | Off |
| Content Rating Sources <Badge type="danger" text="Advanced" /> | Sources for content ratings, in priority order: **TMDB \| Follow country/region set in library** and **AniDB \| Approximate content rating based on tags**. See [Tags, Genres & Content Ratings](/jellyfin/concepts/tags-genres-and-content-ratings). | TMDB, then AniDB |
| Production Location Sources <Badge type="danger" text="Advanced" /> | Sources for production locations, in priority order: **AniDB**, **TMDB**. | AniDB, then TMDB |
| Add Third Party IDs | Which provider IDs to add to items for other plugins to use: **AniDB \| Series, Seasons, Episodes, Movies**, **TMDB \| Series, Episodes, Movies**, **TvDB \| Series, Episodes**. | AniDB |
| Enabled Display Providers for Third Party Links <Badge type="tip" text="Next release" /> | Which providers get external links on item pages: **Shoko**, **AniDB**, **TMDB**, **TvDB**. Shoko links use the [Public Host URL](#connection-settings) when it's set. | All |
| Add Extra Info to Link Name <Badge type="tip" text="Next release" /> | Adds IDs to link names, e.g. which AniDB episode and anime a link points to. | On |
| Max Links Per Type to Show <Badge type="tip" text="Next release" /> | Maximum number of links per provider. `0` shows all links. | `0` |

## Library

The **Library** tab controls how your media is grouped into shows, seasons, movies, collections and playlists. Many of
these settings require [re-creating the library](/jellyfin/how-to/re-create-a-library-safely), so check
[Change Impact](#change-impact) first.

### Basic Settings

| Setting | Description | Default |
|---|---|---|
| Default Library Structure Mode | How shows and movies are built in all Shokofin libraries, unless a series overrides it. **AniDB Anime Structure** makes one show per AniDB anime; it's the most direct mapping of your Shoko collection and the fastest, since it needs the fewest requests to Shoko. **Shoko Group Structure** makes one show per Shoko group, with each series as a season. **TMDB Shows & Movies Structure** uses TMDB shows, seasons and movies, and requires your AniDB anime to be properly linked to TMDB in Shoko; series without links won't show up. See [choosing a structure](/jellyfin/concepts/library-structures-and-seasons#choosing-a-structure). | AniDB Anime Structure |
| Default Shoko Group Structure Season Ordering <Badge type="danger" text="Advanced" /> | Season order in Shoko Group Structure shows: **Let Shoko decide**, **Order seasons by release date**, **Order seasons in chronological order (use indirect relations)** <Badge type="warning" text="Experimental" />, **Order seasons in chronological order (ignore indirect relations)** <Badge type="warning" text="Experimental" />. See [season ordering](/jellyfin/concepts/library-structures-and-seasons#season-ordering). | Let Shoko decide |
| Default Specials Placement Within Seasons | Where specials appear in relation to normal episodes: **Exclude specials from the seasons** (Specials season only), **Always place specials after the normal episodes**, **Use release dates to place specials**, **Loosely use the TMDB data available in Shoko to place specials**, **Either loosely use the TMDB data available in Shoko or fallback to using release dates to place specials**. Requires re-creating the library. See [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras). | Exclude specials from the seasons |
| Separate Movies from Shows | Removes movies from show libraries, so you can keep them in a separate movie library. In mixed libraries (which are discouraged), movies only show up when this is enabled. See [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies). | Off |
| Add Missing Episodes/Seasons | Adds entries for episodes and seasons you don't have yet. Each Jellyfin user must turn on showing missing episodes in their display settings to see them. Episodes hidden in Shoko are never added; see [Hidden Episodes](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes). | On |
| Use Shoko Series Titles/Images with TMDB Structure <Badge type="danger" text="Advanced" /> | For shows using the TMDB structure, uses Shoko's title and images for the show itself. Seasons and episodes still use TMDB. | Off |
| Force Movie Special Features <Badge type="danger" text="Advanced" /> | Turns all specials of AniDB movie series into special features of the movie, overriding any per-series episode conversion. This can break movie series in show libraries. | Off |

### Collection Settings

| Setting | Description | Default |
|---|---|---|
| Automatically Reconstruct Collections <Badge type="danger" text="Advanced" /> | Rebuilds Shokofin's collections after every library scan. | On |
| Collections | Which native Jellyfin collections Shokofin creates. **Do not create collections**. **Create collections for movies**: movies from the same Shoko series, or from the same TMDB collection when using the TMDB structure. **Create collections for movies and shows**: one collection per Shoko group, nested like your groups. A collection is only created when it would contain at least two items. Collections you create yourself are never touched. See [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions). | Do not create collections |

### Playlist Settings <Badge type="tip" text="Next release" />

| Setting | Description | Default |
|---|---|---|
| Automatically Reconstruct Playlists <Badge type="danger" text="Advanced" /> | Rebuilds Shokofin's playlists after every library scan. | On |
| Playlists | Which Shoko groups get a native Jellyfin playlist: **Do not create playlists**, **Create playlists for groups with mixed content (series & movies)**, **Create playlists for all groups**. A playlist is only created when it would contain at least two items. | Do not create playlists |
| Per-Series Tag Filter | Only creates playlists for groups whose series have **Include in Playlists** set on the [Series](#series) tab: **Ignore per-series tags (Default)**, **Require at least one tagged series per group**, **Require all series in a group to be tagged**. | Ignore per-series tags |
| Playlist Ordering | The order of items in each playlist: **Let Shoko decide**, **Order by release date**, or one of the two chronological orders <Badge type="warning" text="Experimental" />. | Order by release date |
| Playlist Specials Placement | Where specials go in each playlist. Same options as **Default Specials Placement Within Seasons**. | Use release dates to place specials |

### Library Settings

| Setting | Description | Default |
|---|---|---|
| Default Library Operation Mode | How new libraries are handled. **Virtual File System (VFS)** builds a clean folder structure of symbolic links for Jellyfin, showing only files Shoko recognises. **Legacy Filtering (Strict)** uses your real folders and hides anything Shoko doesn't know. **Legacy Filtering (Lax)** uses your real folders and leaves unknown files to Jellyfin. See [The Virtual File System](/jellyfin/concepts/virtual-file-system). | Virtual File System (VFS) |
| Default Iterative VFS Generation Enabled <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" /> | New libraries only link files imported since the last generation, instead of rebuilding the whole VFS on every scan. | Off |
| Default Max Iterations Before Forced Full Generation <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" /> | For new libraries: after this many iterative generations, the next one is a full generation. `0` never forces one. | `0` |
| Configure settings for | Select an existing library to change its settings below. | |
| Managed Folder Mapping | The library's media folders and the Shoko managed folder each one is mapped to. Use **+** to add a folder. For each folder, the magnifying glass refreshes the mapping on the next scan, the crossed-out folder icon makes Shokofin ignore the folder (it stays in the library as a normal Jellyfin folder), and the minus icon removes the folder. You can only add and remove folders in VFS mode. A `.shoko-ignore` file in a folder makes Shokofin ignore it when it's first added. See [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping). | |
| Library Operation Mode | The operation mode for the selected library, with the same options as above. Changing it requires re-creating the library. | The default when the library was created |
| Iterative VFS Generation Enabled <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" /> | Iterative generation for the selected library. Changes to files that were already imported, such as regrouping or relinking, are only picked up by a full generation. | The default when the library was created |
| Max Iterations Before Forced Full Generation <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" /> | As above, for the selected library. | The default when the library was created |
| Force Full VFS Generation on Next Library Refresh <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" /> | Makes the next generation a full one. It turns itself off once that generation starts. | Off |

### Multiple Versions Settings

This section is <Badge type="danger" text="Advanced" />. See
[Choose the Default Version](/jellyfin/how-to/choose-the-default-version).

| Setting | Description | Default |
|---|---|---|
| Automatically Merge Multiple Versions | Merges multiple files of the same episode or movie into a single entry with multiple versions. Only applies to videos with Shoko IDs, within the same library. | On |
| Multiple Versions Sort Selectors | Decides which version is the default, in priority order: **Imported At \| Newly imported first**, **Created At \| Newly created first**, **Resolution \| Highest resolution first**, **Release Group Name \| Alphabetically sorted**, **File Source \| Better sources first**, **File Version \| Higher versions first**, **File Variation \| Non-variations first**. Jellyfin always puts non-3D videos and wider videos first before applying these. | Imported At |


### Season Merging Settings

This section is <Badge type="danger" text="Advanced" />. Season merging combines Shoko series that belong together, for
example "Title" and "Title (2023)", into a single season. It only works for series that have an air date, are in the
same Shoko group, and use the Shoko Group Structure. See
[season merging](/jellyfin/concepts/library-structures-and-seasons#season-merging).

| Setting | Description | Default |
|---|---|---|
| Enable Season Merging | Turns season merging on for all libraries. | Off |
| Automatically Merge Seasons | Merges series automatically based on their titles, the series types and the merge window below. When off, only series with a **Season Merging Behavior** set on the [Series](#series) tab are merged, and both series need one. | Off |
| Series Types to Merge | Series types considered for automatic merging. Series type overrides are respected. Options: TV Series, TV Special, Web First Release / Original Net Animation (ONA), Original Video Animation (OVA), Standalone Movie / Movie Collection, Standalone Music Video Release, Misc. Other Type, Type Not Determined Yet. | TV Series, TV Special, ONA, OVA |
| Merge Window (days) | Maximum number of days between the start of two series for them to be merged automatically. `0` ignores release dates. | `185` |

## VFS

The **VFS** tab. These settings only affect libraries using the Virtual File System. See
[The Virtual File System](/jellyfin/concepts/virtual-file-system).

### Basic Settings

| Setting | Description | Default |
|---|---|---|
| Add Trailers | Adds trailers as native Jellyfin trailers. | On |
| Add Credits as Theme Videos | Adds openings and endings as theme videos, played in the background while you browse. | On |
| Add Credits as Special Features | Adds openings and endings as special features. | Off |
| Add Release Group to Path | Adds the release group name to file names in the VFS, or `No Group` when there is none. If the release group changes in Shoko later, the entry is removed and added again. | Off |
| Use Source File As Version Identifier <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" /> | Shows the real file name instead of the VFS file name when you pick between multiple versions. | Off |
| Add Resolution to Path | Adds the resolution, e.g. `1080p`, to file names in the VFS. If Shoko only reads the media info later, the entry is removed and added again. | Off |

### Generation Settings

This section is <Badge type="danger" text="Advanced" />.

| Setting | Description | Default |
|---|---|---|
| Resolve Links Before VFS | If your media folders contain symbolic links, follows them to the real file and links that instead. | Off |
| VFS Location | Where the VFS is stored: **Jellyfin Data Directory (Default)** or **Custom Directory**. Changing it removes and re-adds every entry, and the old location is deleted the next time Jellyfin starts. Back up any trickplay files still inside the VFS first. | Jellyfin Data Directory |
| Custom VFS Root Location | For **Custom Directory**: an absolute path, or a path relative to Jellyfin's data directory. Use a dedicated, empty folder, because Shokofin deletes anything in it that doesn't belong to a library. | *(empty)* |

## Users

The **Users** tab links Jellyfin users to Shoko accounts for syncing watch state. Nothing is synced until you set up a
user. See [Sync Watch State](/jellyfin/how-to/sync-watch-state) and
[Watch State Sync](/jellyfin/concepts/watch-state-sync).

### User Settings

| Setting | Description | Default |
|---|---|---|
| Configure settings for | The Jellyfin user to set up. | |
| Enable Synchronization Features | Master switch for this user. When off, nothing is synced regardless of the options below. When on, marking an item as played or unplayed in Jellyfin is always sent to Shoko. | Off |
| Sync Watch-State on Import or Refresh | When items are added to the library or refreshed, imports their watch state from Shoko into Jellyfin. | Off |
| Sync Watch-State After Playback | Sends the watch state and position to Shoko when playback stops. | Off |
| Sync Watch-State Events During Playback | Sends play, pause, resume and stop events to Shoko. | Off |
| Sync Watch-State Live During Playback | Sends the current position to Shoko about once a minute, and after seeking. Requires **Sync Watch-State Events During Playback**. | Off |
| Lazy Sync Watch-State Events With Shoko | Holds back updates to Shoko until playback has run for about a minute, or until you skip ahead, so accidental clicks and previews don't mark files as watched. Stopping before that sends nothing. | Off |
| Sync Watch-State for Restricted Media | Also syncs restricted (H) media. | Off |
| Username | The Shoko account to sync with. It doesn't need to be an administrator; create one in Shoko under **Settings** → **User Management** → **Add User**. | |
| Password | The password for that account. It's only used to create an API key ("Shoko Jellyfin Plugin (Shokofin) - User Key") and is never stored. To switch accounts, remove the user's settings and link again. | |

The button below the password removes all saved settings for the selected user.

## Series

The **Series** tab overrides library settings for individual Shoko series. The overrides are stored in Shoko Server as
custom tags on the series, so they apply to every Jellyfin server connected to that Shoko Server and survive reinstalling
the plugin. See [per-series settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings).

### Series Settings

| Setting | Description | Default |
|---|---|---|
| Search | Finds a series by title, by AniDB ID prefixed with `a` (e.g. `a69`), or by Shoko series ID prefixed with `s` (e.g. `s1`). | |
| Configure settings for | The series to set up. | |
| Series Type | Overrides the series type: **TV series**, **TV Special**, **Web First Release / Original Net Animation (ONA)**, **Standalone Movie / Movie Collection**, **Original Video Animation (OVA)**, **Music Video (MV)**. Affects how movies are handled and automatic season merging. | Use Original Type |
| Library Structure Mode | Overrides [Default Library Structure Mode](#basic-settings) for this series. | Follow Global Settings |
| Shoko Group Structure Season Ordering <Badge type="danger" text="Advanced" /> | Overrides season ordering for the show when this series is the main series of its group. | Follow Global Settings |
| Specials Placement Within Seasons | Overrides specials placement for this series. Requires re-creating the library. | Follow Global Settings |
| Season Merging Behavior <Badge type="danger" text="Advanced" /> | How this series is merged when season merging is enabled: **Do Not Merge This Series With Any Other Series**, **Merge With Sequel (Respects Air Date)**, **Merge With Prequel (Respects Air Date)**, **Merge With Main Story**, and **Merge Other Series Into This Series** or **Merge Into Other Series** for merge groups A to D. Merge groups link series explicitly within the same Shoko group, without needing AniDB relations. See [season merging](/jellyfin/concepts/library-structures-and-seasons#season-merging) and [merge groups](/jellyfin/concepts/library-structures-and-seasons#merge-groups). | None selected (follows global settings) |
| Episode Conversion Mode | Converts episode types for this series: **No Conversion (Default)**, **Convert Normal Episodes to Specials**, **Convert Specials to Normal Episodes**, **Convert Specials to Extra Featurettes**. See [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras). | No Conversion |
| Order episodes by airdate | Orders episodes by air date instead of episode number. Only applies to the AniDB Anime and Shoko Group structures. | Off |
| Include in Playlists <Badge type="tip" text="Next release" /> | Marks the series for the playlist **Per-Series Tag Filter**. | Off |


## SignalR

The **SignalR** tab controls Shokofin's live connection to Shoko Server, which lets it react to new files and metadata
changes. See [Real-Time Updates (SignalR)](/jellyfin/concepts/real-time-updates).

### Connection Status

| Setting | Description |
|---|---|
| Connection Status | **Enabled, Connected** (or **Connecting**, **Reconnecting**, **Disconnected**) while a connection is active. **Disabled** when not connected. **Unavailable** until the plugin is connected to Shoko Server. |
| Connect / Disconnect | Starts or stops the SignalR connection. |

### Basic Settings

| Setting | Description | Default |
|---|---|---|
| Auto Connect on Start | Connects when Jellyfin starts. It only tries once, on purpose, so it doesn't keep hammering a Shoko Server that's down: if Shoko Server isn't reachable yet, connect manually, or restart Jellyfin once Shoko is up. | Off |
| Auto Reconnect Intervals (seconds) <Badge type="danger" text="Advanced" /> | Comma-separated wait times between reconnect attempts after the connection drops, used in the order given. The last value repeats until the connection is back. Leave empty to disable reconnecting. | `0, 2, 10, 30, 60, 120, 300` |
| Event Sources <Badge type="danger" text="Advanced" /> | Which sources' metadata updates trigger a refresh: **Shoko**, **AniDB**, **TMDB**. | All |


### New Library Settings

Defaults used for libraries created from now on.

| Setting | Description | Default |
|---|---|---|
| File Events | Updates the library when files are added, moved or removed in Shoko. Works where Jellyfin's real-time monitoring doesn't, such as on network shares. Use it instead of Jellyfin's real-time monitoring, not together with it. See [Real-Time Updates](/jellyfin/concepts/real-time-updates#file-events-or-real-time-monitoring). | On |
| Metadata Events | Refreshes the affected items when metadata is added, updated or removed in Shoko. | Off |

### Existing Library Settings

| Setting | Description | Default |
|---|---|---|
| Configure settings for | The library to set up. | |
| File Events | As above, for the selected library. | The default when the library was created |
| Metadata Events | As above, for the selected library. | The default when the library was created |


## Misc

The **Misc** tab is only shown in [Advanced Mode](#advanced-mode).

### Miscellaneous Settings

| Setting | Description | Default |
|---|---|---|
| Show in Menu <Badge type="danger" text="Advanced" /> | Adds a shortcut to the plugin settings in the dashboard's sidebar. | Off |
| Ignored Folder Names <Badge type="danger" text="Advanced" /> | Comma-separated folder names to skip during scans, such as folders created by a NAS. Only applies to libraries not using the VFS, since the VFS already ignores files Shoko doesn't know. | `.streams, @recently-snapshot` |

## Creating a Shoko Library

Setting up a new library, including the recommended Jellyfin library options, is now covered in the
[Quick Start](/jellyfin/quick-start#creating-a-library).
