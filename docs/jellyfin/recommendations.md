---
title: Best Practices | Jellyfin
description: Habits that keep a Shokofin library tidy, correct and easy to maintain.
---

# Best Practices

A handful of habits prevent most of the problems people run into with Shokofin. Each links to a page with the details.

## Use the Virtual File System

Leave the **Library Operation Mode** on **Virtual File System (VFS)**. The VFS lays out your files the way Jellyfin
expects no matter how they're organized on disk, keeps unrecognized files out of your library, and makes extras,
trailers and theme videos work. It also lets several libraries reuse the same media folders without conflicts.
See [The Virtual File System](/jellyfin/concepts/virtual-file-system).

On Windows, enable Developer Mode and restart Jellyfin before creating your first library. Without it, Shokofin can't
create symbolic links, and a fresh install falls back to **Legacy Filtering (Strict)**. See
[Library scans fail on Windows](/jellyfin/troubleshooting#library-scans-fail-on-windows).

## Use Shoko as the Only Metadata Provider

In each Shokofin library, keep **Shoko** as the only enabled metadata downloader and the top image fetcher, and leave
embedded titles and NFO metadata savers off. Other providers identify anime differently, and Jellyfin mixes their
results into what Shokofin provides. The **Screen Grabber** image fetcher is safe to keep for episode thumbnails. See
[Quick Start](/jellyfin/quick-start#creating-a-library).

## Fix Things in Shoko, Not in Jellyfin

Shokofin shows what Shoko Server knows. If a show is split or grouped wrongly, has the wrong TMDB link, or
an episode is in the wrong place, fix it in the Shoko Web UI by editing the group, the TMDB links or the series there, and
then refresh or re-create the library. Edits made directly in Jellyfin's metadata editor are overwritten or lost the next
time the library is refreshed or re-created.

Per-series choices, such as which library structure a series uses, belong in the **Series** tab of the Shokofin
settings. See [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons).

## Don't Edit Shokofin's Tags by Hand

Shokofin saves per-series settings as custom tags on the series in Shoko (the `Shokofin/…` and `Series Type/…` tags).
They show up in the **Custom Tags** modal in the Shoko Web UI, but change them from the **Series** tab in the Shokofin
settings instead. See [Per-Series Settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings).

## Refreshing Metadata

Whenever you change a Shokofin setting, existing items keep their old metadata until they're refreshed. For settings that
only affect metadata (titles, descriptions, tags, genres, images and ratings), refresh the library in Jellyfin with
**Replace all metadata** selected (and **Replace existing images** if you changed image settings).

Settings that change how shows, seasons and movies are built need a re-created library instead. The
[Change Impact](/jellyfin/configuring-shokofin#change-impact) table lists which is which.

## Library Re-creation Is Your Friend

If a library looks wrong after changing settings, or something doesn't behave as expected, re-creating the library is the
cleanest fix: delete it, wait for it to disappear from the Jellyfin home screen, and create it again. Try a full metadata
refresh first, since it's quicker and often enough.

Before re-creating, make sure watch state is safe: enable watch-state sync for each Jellyfin user and run **Export User
Data**, then run **Import User Data** once the new library has finished scanning. Follow
[Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely) for the full steps.

## Keep Watch State and Metadata Up to Date

- Give the **Sync User Data** task a daily trigger under **Dashboard** → **Scheduled Tasks**, so anything missed during
  playback, for example while Shoko was offline, is caught up. See [Sync Watch State](/jellyfin/how-to/sync-watch-state).
- Give the **Auto-Refresh Metadata** task a daily trigger if you follow airing shows, so recently aired episodes pick up
  titles and descriptions that were added after they first appeared. See [Scheduled Tasks](/jellyfin/scheduled-tasks).
- Connect SignalR so new files and metadata updates reach Jellyfin without waiting for a scan. See
  [New Episodes Automatically](/jellyfin/how-to/new-episodes-automatically).

## Library File Dates

Using `Use date scanned into the library` as the date for newly added files can cause issues with sorting and organizing
your media, because that date may not reflect when the files were actually added. It also affects the dates of seasons
and shows.

To avoid this, change `Dashboard` → `Libraries` → `Display` → `Date added behavior for new content` to
`Use file creation date`. This keeps the dates Jellyfin uses consistent across individual files, seasons and entire
series.

## Jellyfin's File Structure Requirements

With the VFS you don't need to organize your files in any particular way. Shokofin builds the structure Jellyfin needs.

If you use **Legacy Filtering (Strict)** or **Legacy Filtering (Lax)** instead, your files must follow Jellyfin's own
[Shows](https://jellyfin.org/docs/general/server/media/shows/) and
[Movies](https://jellyfin.org/docs/general/server/media/movies/) naming guides, with each AniDB anime in its own folder.
Files Shoko classifies as extras (such as credits and trailers) aren't shown in legacy libraries. See
[The Virtual File System](/jellyfin/concepts/virtual-file-system) for the differences between the modes.
