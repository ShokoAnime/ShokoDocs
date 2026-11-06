---
title: Controlling Shoko Relay | Plex
description: Control Shoko Relay's Plex automations, scheduled tasks, and dashboard actions.
---

# Controlling Shoko Relay

After [installing Shoko Relay](/plex/installing-shoko-relay), use the plugin dashboard to control automations and quick actions. It is available in Shoko's WebUI under **Settings > Plugins > Shoko Relay > Dashboard**, or directly at `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/dashboard`.

## Automation Controls

### Force Partial Scans

- When `Force Partial Scans` is enabled Plex's HTTP API will be used to scan folders modified by the VFS watcher
- On certain setups this is much more reliable than Plex's default "Scan my library automatically" or "Run a partial scan when changes are detected" implementation
- _Requires Plex authentication **and** should not be used if Plex's auto scanning is enabled_

### Auto Scrobble

- When `Auto Scrobble` is enabled Plex's [webhook](https://support.plex.tv/articles/115002267687-webhooks/) will be used to forward scrobble events to shoko
- This can be enabled in the Plex Web/Desktop App under `Settings > Webhooks`
  - Click `Add Webhook` and enter: `http(s)://{ShokoHost}:{ShokoPort}/api/plugin/ShokoRelay/plex/webhook`
  - Click `Save Changes` to complete the process
- The webhook respects the `Include Ratings`, `Include Progress` and `Sync Users` settings in the `Sync Watched States Menu`
  - `Sync Users` defaults to "None" and must be configured before the webhook will function
  - For clarity "All" users means both the admin and the configured extra Plex users
- Managed users must be added to `Extra Plex Users` on the dashboard if you wish them to be included
- _Requires Plex authentication **and** a Plex Pass subscription_

### Scheduling

- `UTC Offset` An input which controls the starting time in UTC for scheduled tasks
- `Plex Int.` An input which will schedule [Generate Collections](#collection-generation), [Apply Critic Ratings](#critic-rating-application), and [Sync Plex Images](#plex-image-sync) every `N` hours
  - These tasks will run on individual series automatically when new episodes are added regardless of the configured interval
  - An interval of 24-hours or above is recommended as Shoko rarely updates this information for old series
  - This will also safely empty any trash in the managed Plex libraries if `Empty Plex Trash Threshold` is configured
  - _Requires Plex authentication_
- `Sync Int.` An input which will schedule watched state syncing from Plex to Shoko every `N` hours
  - This includes ratings (votes) and progress if `Include Ratings` or `Include Progress` are enabled respectively in the `Quick Actions > Watch Sync Menu` (Sync Watched States Menu)
    - Currently progress will only sync from Plex to Shoko and not the other way around
  - To speed up the process the scheduled watched sync only considers things watched during the scheduled interval +1 hour
    - A full sync may need to be run if Shoko or Plex downtime exceeds the considered time period
  - _Requires Plex authentication_
- `Import Int.` An input which will schedule Shoko to import new or unrecognized files every `N` hours
  - Make sure to set `AniDB > Update Options > Files With Missing Info` to "Never" if you use this
- The scheduled tasks above can be disabled by setting their configured interval to `0`.

#### Run Plex Automation Now

The button in the top right of the Automation Controls panel will run all three Plex automations sequentially without waiting for the scheduled interval.

## Quick Actions

### Collection Generation

- While Plex's Provider Framework assigns items to collections, it does not set their summaries or apply custom sort titles/artwork
  - This enhanced metadata must be injected manually via Plex's HTTP API instead
- Click the `Generate Collections` button in the "Quick Actions" section of the dashboard to start this process
- If `Advanced Settings > Plex Data Path` is configured this action will also clean up old collection images
- The primary series description will be used as the collection's summary
- _Requires Plex authentication_

As a bonus this supports using the primary series images as the collection images (if configured under "Provider Settings"). Custom local posters can also be used by placing them in the configured `Collection Images Root Path` (default `!CollectionImages`) folder. These files are simply named after the Shoko group name (or ID) that you wish them to apply to. If the name of a file matches that of a smart collection the images will be applied to it too. Empty collections (excluding smart collections) will also be removed automatically during collection generation.

Applying a hyphenated suffix to the image that matches Plex's naming conventions for logos or backdrops will allow them to be set as well. Examples will be provided below for applying various local collection images to a group named "Bleach" in Shoko:

- Bleach.jpg
- Bleach-logo.png
- Bleach-square.jpg
- Bleach-background.jpg

### Critic Rating Application

- The Provider Framework fully supports TMDB ratings but there is no support for custom rating sources like AniDB
- To mitigate this the `Apply Critic Ratings` button in the "Quick Actions" section of the dashboard is available
  - This will add generic ratings to every series/episode (when available) in Plex which are what is used when sorting by "Critic Rating" in the UI
- The rating source for this can be configured (or disabled) under `Critic Rating Mode` in the Provider Settings
- _Requires Plex authentication_

### Plex Image Sync

- An optional Plex automation which syncs the following types of local metadata images back to Shoko and marks them as preferred:
  - Collection Posters in the configured `Collection Images Root Path`
  - Local posters from the VFS Root of a series (`poster.ext`, `folder.ext` or `show.ext`)
  - Local backdrops from the VFS Root of a series (`art.ext`, `backdrop.ext`, `background.ext` or `fanart.ext`)
  - Local logos from the VFS Root of a series (`clearlogo.ext` or `logo.ext`)
  - Local episode thumbnails from the VFS Root of a series (with the same base filename as the corresponding episode)
  - Plex's auto generated episode thumbnails (skipped if "TMDB Thumbnails" is enabled or a local thumbnail is present)
- This allows Shoko and Plex to share the same local image metadata with a single source of truth
- This will not run during the Plex Metadata Fixup or scheduled Plex Automation Interval unless `Advanced Settings > Plex Image Sync` is enabled
- _Requires Plex authentication_

### Shoko Actions

- `Run Import` A button which will make shoko rescan all managed folders for new or unrecognized files
- `Watch Sync Menu` A button which opens a modal (Sync Watched States Menu) allowing for watched state syncing from Plex to Shoko or Shoko to Plex
  - This includes any users configured under `Extra Plex Users` in the "Plex Authentication" section unless the `Sync Users` setting excludes them
  - When syncing from Plex to Shoko the `Temporary Library Filter` can also be used to import watched states from non-Shoko Relay libraries via physical filename matching
  - _Requires Plex authentication_
- `Purge Missing` A button which will remove files that are no longer present from Shoko
  - If `Empty Plex Trash Threshold` is configured under Advanced Settings, this will safely empty the trash for your Plex libraries
  - Unlike the "Remove Missing Files" action in Shoko's WebUI this will remove all traces of the files from the Shoko DB
  - This will also remove files that are in folders which the plugin has told Shoko to ignore
  - Entries will _always_ be removed from the AniDB MyList as well
