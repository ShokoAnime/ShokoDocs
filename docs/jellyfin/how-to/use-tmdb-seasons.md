---
title: Use TMDB Seasons | Jellyfin
description: Make shows, seasons and episode order in Jellyfin match TMDB by linking series in Shoko and switching to the TMDB structure.
---

# Use TMDB Seasons

AniDB often splits one show into many entries, while TMDB and most streaming services list it as one show
with numbered seasons. This guide makes Jellyfin follow TMDB: one show, TMDB's seasons, and TMDB's episode order.

```text
Before (AniDB Anime Structure)          After (TMDB Shows & Movies Structure)
Starlight Academy/                      Starlight Academy/
Starlight Academy (2020)/               ├── Specials   (TMDB Season 0)
Starlight Academy: Summer Break/        └── Season 1   (24 episodes)
Starlight Academy: Graduation/          Starlight Academy: Graduation/   (TMDB movie)
```

## Before You Start

- **Everything depends on correct AniDB ↔ TMDB links in Shoko Server.** Each series must be linked to the right TMDB
  show or movie, and its episodes to the right TMDB episodes. A series without a TMDB link, or episodes without
  episode links, **will not appear in the library at all** with this structure.
- You need to **re-create** the Jellyfin library afterwards. Link your Jellyfin users to Shoko first so their watch
  state is safe; see [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely).
- You can switch your whole collection, or just some shows. Switching only the shows you care about is the safer way to
  start.

## In Shoko Server

### Link the Series to TMDB

1. Check that automatic linking is on: **Settings** → **TMDB** → **TMDB Options** → **Auto Link** (and
   **Auto Link Restricted** if you have restricted titles). Both are on by default.
2. For series that aren't linked yet, run **Actions** → **Search for TMDB Matches**, or open a series and click
   **Edit Series** → **Update Actions** → **Auto-Search TMDB Match**.
3. Open each series you want to switch in **Collection**. On the **Overview** tab, the **Metadata Sites** panel shows the
   TMDB link. Click **Add Link** if there is none, or **Edit Link** (the pencil next to the TMDB link) to review it.
4. On the **Metadata Linking** page, pick the correct TMDB show or movie, then go through the episode list: each AniDB
   episode should point at the right TMDB episode. The header counts **Perfect**, **Approximate**, **Fallback** and
   **Override** matches. Review anything that isn't a perfect match. Use **Add link** / **Remove link** on a row to
   fix it, then click **Save Links**.
5. Repeat for every AniDB entry that belongs to the same TMDB show, for example both cours of a split season.

Series whose TMDB entry spans several AniDB entries, or episodes TMDB splits into parts, need extra care; see
[Metadata Links](/shoko-server/metadata-links) for how to link those.

### Download the Data You Want in Jellyfin

1. Go to **Settings** → **TMDB** → **TMDB Download Options** and enable what you want to see in Jellyfin:
   - **Download Crew And Cast** for cast and crew on TMDB episodes and movies,
   - **Download Movie Collections** so movies are grouped by their TMDB collection,
   - **Download Alternate Ordering** if you want to use a different episode ordering (next section).
2. TMDB titles and descriptions are only stored for the languages Shoko is set to use. Add the languages you want under
   **Settings** → **Collection** → **Language Options** (**Series Title**, **Episode Title** and **Descriptions**).
3. Click **Save**, then refresh the linked series with **Edit Series** → **Update Actions** → **Update TMDB Info**.

### Hide TMDB Episodes You Don't Want (Optional)

To leave a TMDB episode out of Jellyfin, such as a recap TMDB lists in a season, hide the TMDB episode itself. Hiding the
linked AniDB episode only removes your file, not the TMDB entry. This isn't available in the Web UI yet; see
[Hiding Metadata Episodes](/shoko-server/metadata-features#hiding-metadata-episodes).

### Pick an Alternate Episode Ordering (Optional)

Some shows have several ways to split episodes into seasons, such as DVD order or story arcs. TMDB lists these as
Episode Groups.

1. Make sure **Download Alternate Ordering** is enabled (above) and the show has Episode Groups on TMDB.
2. Open the series, click **Edit Link** (the pencil next to the TMDB link), then **Open Settings** (the gear next to the
   TMDB title).
3. In the **TMDB Show Settings** dialog, choose the ordering and click **Save**.

Shokofin uses the ordering you pick here for the seasons and episode order in the TMDB structure.

See [Alternate Episode Orderings](/shoko-server/metadata-features#alternate-episode-orderings) for more details.

## In Shokofin

1. In the Shokofin settings, choose how widely to switch:
   - **Whole collection:** **Library** → **Basic Settings** → **Default Library Structure Mode** →
     **TMDB Shows & Movies Structure**.
   - **Some shows only:** **Series** → search for the series (title, `a` + AniDB ID, or `s` + Shoko series ID) → set
     **Library Structure Mode** to **TMDB Shows & Movies Structure**. Do this for every AniDB entry linked to
     that TMDB show.
2. If you switched the whole collection, find series that have no TMDB link and set their **Library Structure Mode** to
   **AniDB Anime Structure** (or **Shoko Group Structure**), so they don't disappear.
3. Optional <Badge type="danger" text="Advanced" />: to keep Shoko's title and poster on the top-level show while seasons
   and episodes come from TMDB, enable **Library** → **Basic Settings** → **Use Shoko Series Titles/Images with Tmdb
   Structure**.
4. Click **Save**.

## In Jellyfin

1. Re-create the library, following [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely).
2. Wait for both library scans to finish.

## Check That It Worked

- Series linked to the same TMDB show appear as **one** show.
- Seasons and episodes follow the TMDB page for the show. Episode numbers start at 1 in each season, even where TMDB
  numbers episodes across seasons, and skip any TMDB episodes you hid.
- **Specials** contains what TMDB lists under Season 0.
- Linked TMDB movies appear as movies, gathered under their TMDB collection if you downloaded collections.

## If It Didn't Work

- **A series disappeared:** it has no TMDB link, or its episodes aren't linked to TMDB episodes. Link it in Shoko, or
  override it back to the AniDB structure. See
  [A series is missing from the library](/jellyfin/troubleshooting#a-series-is-missing-from-the-library).
- **Some episodes are missing or in the wrong place:** those AniDB episodes aren't linked, or are linked to the wrong
  TMDB episodes. Fix them on the **Metadata Linking** page, run **Update TMDB Info**, then refresh the show in Jellyfin.
- **Two AniDB entries show up as separate shows:** they're linked to different TMDB shows, or one of them still uses
  another **Library Structure Mode**.
- **Titles or descriptions are in the wrong language:** add the language under **Language Options** in Shoko and check
  your title settings; see [Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language).

## Related

- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons)
- [Metadata Links](/shoko-server/metadata-links) in Shoko Server
- [One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise)
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library) and [Series](/jellyfin/configuring-shokofin#series)
