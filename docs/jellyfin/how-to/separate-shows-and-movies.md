---
title: Separate Shows and Movies | Jellyfin
description: Keep anime movies out of your shows library and give them their own Jellyfin movie library, without reorganising files.
---

# Separate Shows and Movies

By default, anime movies show up inside your shows library, either as their own show or as a season of a franchise. This
guide gives you a **Shows** library with only series and a **Movies** library with only movies, both reading the same
folders. You don't need to move any files; Shoko already knows which entries are movies.

## Before You Start

- This guide assumes your libraries use the Virtual File System (VFS), the default. The VFS lets two libraries use the
  same folders without conflicts. See [The Virtual File System](/jellyfin/concepts/virtual-file-system).
- Your existing shows library needs to be **re-created**, because movies move out of it. Link your Jellyfin users to
  Shoko first; see [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely).
- Whether something counts as a movie is decided by its series type in Shoko (from AniDB), which you can override per
  series.

## In Shokofin

1. In the Shokofin settings, go to **Library** → **Basic Settings** and enable **Separate Movies from Shows**. Click
   **Save**.
2. Optional: fix entries with the wrong type. Go to **Series**, search for the entry, and set **Series Type**:
   - **Standalone Movie / Movie Collection** to treat it as a movie,
   - **TV series**, **Original Video Animation (OVA)** or another type to keep it with the shows.

   Click **Save**. The type is stored on the series in Shoko Server, so every Jellyfin server connected to it agrees.
3. Optional: group movies of the same entry into a collection with **Library** → **Collection Settings** →
   **Collections** → **Create collections for movies**. See
   [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions).
4. Optional <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" />: movies are titled
   "Series title: Episode title" by default. If most of your movies are linked to TMDB movies and you'd rather use the
   episode title on its own, enable **Metadata** → **Title Settings** → **Always Use Episode Title for TMDB
   Movies**.

## In Jellyfin

1. Re-create your shows library as a **Shows** library, following
   [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely).
2. In the Jellyfin dashboard, add a second library:
   - **Content type:** **Movies**
   - **Folders:** the same folders as your shows library
   - Everything else as in [Creating a Library](/jellyfin/quick-start#creating-a-library): Shoko as the only metadata
     downloader and image fetcher, NFO saving off.
3. Run **Dashboard** → **Libraries** → **Scan All Libraries** (on Jellyfin 10.10 it starts on its own). When it
   finishes, Shokofin starts a second full scan automatically, which fills both libraries.

## Check That It Worked

- The shows library no longer contains movie entries, and franchises no longer have movie seasons.
- The movies library contains each movie, and nothing that isn't a movie.
- Movie titles look like `Starlight Academy: Graduation`. When one AniDB entry contains several movies without their own
  titles, the later ones are numbered, such as `Starlight Academy II`.

## If It Didn't Work

- **A movie is still in the shows library, or a series is in the movies library:** its type in Shoko is different from
  what you expect. Override **Series Type** for that series, then refresh or re-create the library. A movie series whose
  main movie entry is hidden in Shoko is also treated as a show; see
  [When the main episodes are hidden](/jellyfin/concepts/episode-types-specials-and-extras#when-the-main-episodes-are-hidden).
- **Movies are missing in a "Mixed Movies and Shows" library:** use separate Shows and Movies libraries instead. Mixed
  libraries are technically supported but discouraged: Jellyfin's support for them is lacking, and features such as
  trickplay and chapter information aren't available in them. In a mixed library, movies only show up when
  **Separate Movies from Shows** is enabled.
- **The movies library is empty:** check that its folders are mapped under **Library** → **Library Settings** in the
  Shokofin settings, and see [The new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty).
- **Nothing changed in the shows library:** it wasn't re-created. See
  [Settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).

## Related

- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons)
- [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions)
- [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras), including movie special features
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library) and [Series](/jellyfin/configuring-shokofin#series)
