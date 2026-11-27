---
title: One Show for a Whole Franchise | Jellyfin
description: Show every sequel, OVA and movie of a franchise as seasons of a single Jellyfin show using Shoko groups.
---

# One Show for a Whole Franchise

By default every AniDB entry is its own show in Jellyfin. This guide turns a franchise into **one show with a season per
entry** using the Shoko Group Structure, and optionally merges split cours into a single season.

```text
Before (AniDB Anime Structure)          After (Shoko Group Structure)
Starlight Academy/                      Starlight Academy/
Starlight Academy (2020)/               ├── Specials
Starlight Academy: Summer Break/        ├── Season 1  Starlight Academy
Starlight Academy: Graduation/          ├── Season 2  Starlight Academy (2020)
                                        ├── Season 3  Starlight Academy: Summer Break
                                        └── Season 4  Starlight Academy: Graduation
```

## Before You Start

- You need to **re-create** the Jellyfin library afterwards, because shows and seasons move around. Link your Jellyfin
  users to Shoko first so their watch state is safe.
  [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely) covers the whole procedure.
- Season ordering and season merging are advanced settings. Turn on
  [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode) if you want to use them.
- You can do this for your whole collection, or only for some franchises. Both are covered below.

## In Shoko Server

What ends up in a show is whatever is in the Shoko group, so start by getting the group right. The server docs cover
group management in more detail under [Managing Groups](/shoko-server/collection#managing-groups).

1. In the Shoko Web UI, open **Collection**, find the franchise's group and open it to see which series it contains.
2. If a series is missing from the group, open that series, click **Edit Series** → **Group** tab, search for the right
   group under **Move to group**, and click **Move to existing group**.
3. If a series doesn't belong, move it out the same way, or use **Create and move to new group**.
4. Open **Edit Group** → **Series** tab and click **Set as main series** on the first entry of the franchise. The main
   series controls the season ordering setting for the show.
5. Optional: give the group a nicer name with **Edit Group** → **Name**. That name becomes the show title in Jellyfin.
6. Optional, for chronological season ordering: make sure **Settings** → **AniDB** → **Download Options** →
   **Always Download Related Anime** is on, so Shoko has the relations between entries.

:::tip Let Shoko group new series for you
**Settings** → **Collection** → **Relation Options** → **Auto Group Series** puts related series into the same group as
they're added. Use **Exclude following relations** to keep things like **Alternative Version** or **Movie** out of the
group. A group with sub-groups isn't one show: its sub-groups become the shows, and the parent becomes a collection. See
[Nested Groups and Collections](/jellyfin/concepts/library-structures-and-seasons#nested-groups-and-collections).
:::

## In Shokofin

Choose **one** of the first two steps.

1. **For your whole collection:** in the Shokofin settings, go to **Library** → **Basic Settings** → **Default Library
   Structure Mode** and pick **Shoko Group Structure**. Click **Save**.
2. **For this franchise only:** go to **Series**, type the title (or `a` + AniDB ID, e.g. `a69`) into **Search**, pick
   each series of the franchise under **Configure settings for**, set **Library Structure Mode** to **Shoko Group
   Structure**, and click **Save**. Do this for every series in the group; a series still on another structure becomes
   its own show.
3. Optional <Badge type="danger" text="Advanced" />: choose the order of the seasons with **Library** → **Basic
   Settings** → **Default Shoko Group Structure Season Ordering**, or per franchise with **Series** → **Shoko Group
   Structure Season Ordering** on the group's main series. **Order seasons by release date** is the predictable choice.
4. Optional: to keep movies out of the show and in a movie library instead, enable **Library** → **Basic Settings** →
   **Separate Movies from Shows**. See [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies).

### Merge Split Cours into One Season (Optional)

<Badge type="danger" text="Advanced" />

If AniDB splits one season into two entries, like *Starlight Academy* and *Starlight Academy (2020)*:

1. Go to **Library** → **Season Merging Settings** and enable **Enable Season Merging**.
2. Turn on **Automatically Merge Seasons** (it's off on a fresh install). Entries whose title is the same plus a year,
   such as `(2020)`, that started within **Merge Window (days)** of each other are merged automatically.
3. For entries that don't match that pattern, go to **Series**, select the first entry, and tick **Merge With Sequel
   (Respects Air Date)** under **Season Merging Behavior**. If you turned **Automatically Merge Seasons** off, also tick
   **Merge With Prequel (Respects Air Date)** on the second entry.
4. Click **Save**.

All the merging options, including merge groups, are explained in
[Season Merging](/jellyfin/concepts/library-structures-and-seasons#season-merging).

## In Jellyfin

1. Re-create the library that contains the franchise, following
   [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely).
2. Wait for both library scans to finish.

## Check That It Worked

- The franchise appears **once** on the library page, with the group name as its title.
- Opening it shows one season per series (or fewer, if you merged), in the order you chose, plus **Specials** if any
  series has specials.
- With merging, the merged season's episodes are numbered continuously (for example 1–24).

## If It Didn't Work

- **A series is still its own show:** it's in a different Shoko group, it uses another **Library Structure Mode**, it's a
  movie and **Separate Movies from Shows** is on, or it sits directly in a group that has sub-groups.
- **Seasons are in the wrong order:** the ordering is taken from the group's **main series**; check which series that is
  in Shoko and which ordering applies to it.
- **Two entries didn't merge:** check the [merging requirements](/jellyfin/concepts/library-structures-and-seasons#season-merging):
  both need an air date, the same group, a ticked series type and, with automatic merging off, a merge behaviour on
  both sides.
- **Nothing changed at all:** the library wasn't re-created. See
  [Settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).

## Related

- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons)
- [Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons)
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library) and [Series](/jellyfin/configuring-shokofin#series)
