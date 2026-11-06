---
title: Installing Shoko Relay | Plex
description: Install the Shoko Relay plugin and connect it to Plex.
---

# Installing Shoko Relay

This is a plugin for [Shoko](https://shokoanime.com/) that acts as a [Custom Metadata Provider](https://forums.plex.tv/t/announcement-custom-metadata-providers/934384) for Plex. It is a successor to the [ShokoRelay.bundle](https://github.com/natyusha/ShokoRelay.bundle) legacy agent/scanner and mirrors all of its functionality (including the automation scripts). Scanning is much faster and there are many new features included as well. Just like the old bundle this is intended to work with series of all types within a single "TV Shows" library but separate movie library support is included as well. All you need to get started is a populated [Shoko Server](https://shokoanime.com/downloads/shoko-server) (_using a daily build_) and [Plex Media Server](https://www.plex.tv/media-server-downloads/).

Due to the lack of a custom scanner this plugin leverages a VFS (Virtual File System) to ensure that varied folder structures are supported. This means that your anime can be organised with whatever file or folder structure you want. There is one caveat though. A folder cannot contain more than one AniDB series at a time if you want it to fully support every single type of [local media asset](https://support.plex.tv/articles/200220717-local-media-assets-tv-shows/) (posters, theme songs, etc.). The VFS will be automatically updated when any file changes are detected by Shoko.

## Installation

### Shoko

> [!WARNING]
> The VFS is created inside each of Shoko's managed folders (that aren't marked exclusively as a "Source") under a subfolder named `!ShokoRelayVFS` (configurable under `Advanced Settings > VFS Root Path`).
> While Shoko Relay includes an internal ignore rule to block scans of VFS folders during manual and scheduled imports, **Shoko's live file watcher ("Watch For New Files") bypasses plugin ignore rules entirely**.
> To stop Shoko Server from scanning the generated links and spawning duplicate file entries, it is highly recommended to add a manual exclusion as a safety net. This covers cases where Shoko Relay isn't loaded or a managed "Destination" folder has "Watch for New Files" enabled.
>
> To achieve this, navigate to Shoko's installation directory and add the following regex entry (or one matching your configured VFS folder name) to `settings-server.json` under `Exclude`:
>
> ```json
> "Exclude": [
>   "[\\\\\\/]!ShokoRelayVFS[\\\\\\/]"
> ],
> ```

Installation can be completed via Shoko's WebUI (Recommended) or Manually. Both Methods will be detailed below:

- **WebUI** (Recommended)
  - Open Shoko's WebUI and navigate to: `Settings > Plugin Management > Repositories`
  - Click `Add Repository` and configure the following:
    - Name: `NN Plugins`
    - Manifest URL: `https://raw.githubusercontent.com/natyusha/ShokoPluginManifest/master/manifest.json`
  - Go to `Settings > Plugin Management > Browse` and find "Shoko Relay"
  - Click `Install`
- **Manual**
  - Navigate to Shoko Server's `plugins` directory and create a new subfolder called `ShokoRelay`
  - Extract [the latest pre-release](https://github.com/natyusha/ShokoRelay/releases) into the `plugins/ShokoRelay` directory
  - It may be necessary to create the `plugins` (all lowercase) folder in Shoko's root first
- Restart Shoko Server after finishing either of the above installation methods

#### Setup

- Once the Server has loaded navigate to `Settings` in Shoko's WebUI and click the "Dashboard" button under `Plugins > Shoko Relay`
  - Shoko Relay's dashboard is also available at the following URL: `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/dashboard`
- **Mandatory:**
  - Click the `Generate VFS` button in the "Shoko: VFS" section to initialize your collection
    - First time generation may take several minutes to complete with a large library
  - A report of the run will be written to `logs/shoko-vfs-build-report.log` inside the plugin directory
    - You can download the report via the dashboard's "Task Logs" section or a toast that will appear on task completion
  - The VFS will automatically update when it detects files have been added, renamed, moved or deleted
- **Recommended:**
  - Link the plugin to your Plex account via the `Start Plex Auth` button in the "Plex Authentication" section
    - Once clicked it will change to a `Login` link which will redirect you to `app.plex.tv/auth`
    - From there you can login to Plex as normal using your credentials and then close the tab
    - This will enable: Auto Scanning, Scrobbling (via sync or webhook) and enhanced collection/ratings support
  - Configure the `Sync Users` under the `Quick Actions > Watch Sync Menu` (Sync Watched States Menu) to enable webhooks and syncing
- There are additional options at the bottom under "Provider Settings" which also contains a "Help" button in the top right
  - Once clicked the help button opens a modal containing more information about some of the more complex options

> [!TIP]
> If you are sharing the symlinks over an SMB share they may not appear depending on the [Samba Configuration](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html). An example entry for `smb.conf` that may help to mitigate this is listed below:

```ini
[global]
    follow symlinks = yes
```

:::details Recommended Shoko Server Configuration

Enable the following options in Shoko to ensure that Plex has at least one source of metadata for everything:

- `Settings > AniDB > Download Options`
  - [x] Character Images
  - [x] Creator Images
- `Settings > Metadata > TMDB`
  - `Providers`
    - [x] Series
    - [x] Seasons
    - [x] Episodes
    - [x] Movies
    - [x] Creators
    - [x] Studios
    - [x] Networks
  - Auto-Linker: TMDB
  - [x] Auto Link
  - [x] Auto Link Restricted
  - `TMDB Settings`
    - [x] Auto Download Alternate Ordering
  - [x] Use Own Image Options
  - [x] Download Backdrops
  - [x] Download Posters
  - [x] Download Logos
  - [x] Download Staff Images
  - [x] Download Networks (available in `settings-server.json`)
- `Settings > Collection > Relation Options`
  - [x] Auto Group Series
  - [x] Determine Main Series Using Relation Weighing

:::

### Plex

#### Metadata Agent

- Navigate to `Settings > Metadata Agents`
- Click `Add Provider` in the Metadata Providers header and supply the following URL:
  - `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay`
- Click `Add Agent` in the Metadata Agents header, name it `Shoko Relay` and select it as the primary provider
- Optional: Under `additional providers` select `Plex NFO Series` then click the `+`
- Under `additional providers` select `Plex Local Media` then click the `+`
- Ensure that the additional provider(s) are above the `Shoko Relay` primary entry and `Save`

#### Library

> [!TIP]
> If you previously used the legacy `ShokoRelay.bundle` you can simply convert your existing libraries to the new agent. This allows you to maintain watched states and video preview thumbnails. Files that end up with different episode assignments will _not_ migrate correctly and will have to be handled manually (this is guaranteed for "Other" type episodes that were in Season -4).\
> _Running "Refresh All Metadata" for the converted libraries is required after the first scan completes._

- The standard Shoko Relay agent setup requires a `TV Shows` type library to be created (or an existing one to be used)
- Under `Add Folders` be sure to only enter the path to `!ShokoRelayVFS` (or the configured `VFS Root Path`) as the directory
- Under `Advanced` simply change the Scanner of the library to `Plex TV Series` and the Agent to `Shoko Relay`
  - You can override Provider Settings on a per-library basis by adding an additional Metadata Provider with `/options/` appended
    - The format is described in [Controller API: Metadata Provider](/plex/shoko-relay-api#metadata-provider)
    - _Overrides only apply to live metadata requests. Background automations (e.g. Collection Generation or Critic Ratings) will always use the global dashboard configuration_
- Additionally it is highly recommended to set the following Advanced settings:
  - [x] Use season titles
  - [x] Use local assets
  - Collections: `Hide items which are in collections`
  - Seasons: `Hide for single-season series`

:::details Legacy Agent Cleanup

Once you are happy with your new libraries you can safely delete all of the old data left behind from any anime related legacy agents you may have used. To do so simply navigate to your [Plex Media Server data directory](https://support.plex.tv/articles/202915258-where-is-the-plex-media-server-data-directory-located/) and search for the full agent name. You can then delete all of the files and folders found that match the search result. Some example search terms are listed below:

```text
com.plexapp.agents.hama
com.plexapp.agents.shoko
com.plexapp.agents.shokorelay
```

:::
