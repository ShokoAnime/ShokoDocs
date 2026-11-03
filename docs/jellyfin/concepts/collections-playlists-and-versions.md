---
title: Collections, Playlists & Versions | Jellyfin
description: How Shokofin builds Jellyfin collections and playlists from your Shoko data, and how it merges multiple versions of the same episode or movie.
---

# Collections, Playlists & Versions

Shokofin can build native Jellyfin collections and playlists from how your anime is organized in Shoko Server. It can
also combine several files of the same episode or movie into one entry with multiple versions. All of this is off or
automatic by default. This page explains what each option builds.

## Collections

Collections are set in the Shokofin settings under **Library** → **Collection Settings** → **Collections**.

| Option | What gets a collection |
| --- | --- |
| **Do not create collections** (default) | Nothing. Collections Shokofin created earlier are removed. |
| **Create collections for movies** | Each Shoko series that holds more than one movie, such as a film trilogy listed as one AniDB entry. With the [TMDB Shows & Movies structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure) and **Separate Movies from Shows** both enabled, movies are grouped by their TMDB movie collection instead. |
| **Create collections for movies and shows** | Shoko groups, holding both shows and movies. With the AniDB Anime and TMDB structures, shows and movies are collected by their Shoko group. With the Shoko Group Structure, each group is already a show, so the collection is the group above it; see [Nested Groups and Collections](/jellyfin/concepts/library-structures-and-seasons#nested-groups-and-collections). Groups inside groups become collections inside collections. The collection uses the Shoko group's name. |

A few rules apply in every mode:

- A collection is only created when it would contain at least two items.
- Collections you create yourself are never touched. Shokofin only manages the collections it created.
- Collection titles for movie collections follow the **Box-Set / Collection** title settings. See
  [Titles, Descriptions & Images](/jellyfin/concepts/titles-descriptions-and-images).

### When Collections Update

With **Automatically Reconstruct Collections** <Badge type="danger" text="Advanced" /> enabled (the default), collections are
rebuilt after every library scan. You can also rebuild them at any time with the **Reconstruct Collections** task in
[Scheduled Tasks](/jellyfin/scheduled-tasks). Don't run it while a library scan is running.

:::tip
If a group looks wrong in the collection, fix the group in Shoko (**Collection** → open the group → **Edit Group**), then
run **Reconstruct Collections**.
:::

## Playlists <Badge type="tip" text="Next release" />

Playlists turn a Shoko group into one list you can play from start to finish, for example a franchise with TV seasons
and movies in between. They are set under **Library** → **Playlist Settings**.

### Which Groups Get a Playlist

**Playlists** chooses the groups:

| Option | Result |
| --- | --- |
| **Do not create playlists** (default) | No playlists. |
| **Create playlists for groups with mixed content (series & movies)** | Only groups that contain both shows and movies. |
| **Create playlists for all groups** | Every group. |

**Per-Series Tag Filter** narrows that down using the **Include in Playlists** option in the **Series** tab:

| Option | Result |
| --- | --- |
| **Ignore per-series tags** (default) | The tag isn't used. |
| **Require at least one tagged series per group** | A group gets a playlist if any of its series has **Include in Playlists** enabled. |
| **Require all series in a group to be tagged** | Every series in the group must have it enabled. |

As with collections, a group needs at least two items to get a playlist.

### Order and Specials

**Playlist Ordering** is meant to choose how items are ordered. Currently every playlist is ordered by air date, oldest
first.

**Playlist Specials Placement** decides whether specials are in the playlist. **Exclude specials from the playlist** leaves
them out. Currently every other option includes them in air date order.

### Ownership and Updates

Playlists are public, so every Jellyfin user can see them. They are owned by the first user account on your Jellyfin
server. With **Automatically Reconstruct Playlists** <Badge type="danger" text="Advanced" /> enabled (the default),
playlists are rebuilt after each library scan. You can also run the **Reconstruct Playlists** task.

## Multiple Versions

When you have more than one file for the same episode or movie, for example a TV release and a Blu-ray release,
Shokofin can show them as one entry with a version picker instead of separate entries.

- **Automatically Merge Multiple Versions** <Badge type="danger" text="Advanced" /> is on by default. Merging happens after
  items are scanned or refreshed.
- Only files for the same Shoko episode are merged, and only within the same library.
- **Multiple Versions Sort Selectors** <Badge type="danger" text="Advanced" /> decide which version plays by default.
  Jellyfin always sorts some things itself first.
- The **Merge Episodes**, **Merge Movies**, **Split Episodes** and **Split Movies** tasks <Badge type="danger" text="Advanced" />
  merge or split everything at once.

For choosing the default version step by step, see [Choose the Default Version](/jellyfin/how-to/choose-the-default-version).

## Related

- [Choose the Default Version](/jellyfin/how-to/choose-the-default-version)
- [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies)
- [One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise)
- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons)
- [Settings Reference → Library](/jellyfin/configuring-shokofin#library)
- [Scheduled Tasks](/jellyfin/scheduled-tasks)
