---
title: Library Structures & Seasons | Jellyfin
description: The three ways Shokofin can turn your Shoko collection into Jellyfin shows and seasons, when to use each, and how to shape seasons per series.
---

# Library Structures & Seasons

Shoko Server knows your collection as AniDB anime (Shoko **series**) organised into Shoko **groups**. Jellyfin only knows
**shows**, **seasons**, **episodes** and **movies**. A *library structure* is the rule Shokofin uses to translate one into
the other. There are three of them, you can pick a default for every library, and you can override it for any single
Shoko series.

This page explains what each structure produces, which one to choose and, for the Shoko Group Structure, how to
decide what becomes a season, including merging several Shoko series into a single season.

:::info The example used on this page
To compare the structures side by side, this page follows one made-up franchise, *Starlight Academy*. In Shoko it is one
group with four series:

| Shoko series | AniDB type | First aired | Notes |
| --- | --- | --- | --- |
| Starlight Academy | TV Series | Oct 2019 | 12 episodes, 2 specials |
| Starlight Academy (2020) | TV Series | Jan 2020 | 12 episodes, the second half of the story |
| Starlight Academy: Summer Break | OVA | Aug 2020 | 2 episodes, a side story |
| Starlight Academy: Graduation | Movie | Mar 2021 | The finale |

On TMDB the two TV entries are one show with a single 24-episode season, the specials and OVA are listed
under Season 0, and the finale is a separate TMDB movie.
:::

## Choosing a Structure

In the Shokofin settings, the default is set under **Library** → **Basic Settings** → **Default Library Structure Mode**.
A single Shoko series can use a different one under **Series** → **Library Structure Mode**
(see [Per-Series Settings](#per-series-settings)).

| | AniDB Anime Structure | Shoko Group Structure | TMDB Shows & Movies Structure |
| --- | --- | --- | --- |
| A Jellyfin show is… | one Shoko series (one AniDB anime) | one Shoko group | one TMDB show (or movie) |
| A season is… | the series' normal episodes | one Shoko series, or several merged together | a TMDB season |
| Episode order comes from | AniDB | AniDB (merged seasons combined) | TMDB |
| Needs extra work in Shoko | No | Tidy groups | Correct AniDB ↔ TMDB links for every series |
| Speed | Fastest (fewest requests to Shoko) | Slower | Slower |
| Series without the prerequisite | — | Shown as their own show | **Not shown at all** |
| Season ordering & merging | Not applicable | Yes | Not applicable |
| Matches what online databases show | AniDB | Your own grouping | TMDB / most streaming services |

In every structure, the actual season and episode numbers are counted by Shokofin: 1, 2, 3, … per season, without gaps.
See [Episode Numbers](/jellyfin/concepts/episode-types-specials-and-extras#episode-numbers).

**Use the AniDB Anime Structure (the default) unless you specifically want grouping or TMDB's seasons.** It is the
purest structure, with every AniDB entry as its own show exactly as on AniDB, and the fastest, because it needs the fewest
requests to Shoko. It also needs no preparation. The trade-off: sequels, split cours, OVAs and movies are separate
shows, which can make long franchises feel scattered.

**Use the Shoko Group Structure when** you want franchises to read as one show with several seasons, and you're
willing to keep your Shoko groups tidy. This is the most flexible structure: you decide what belongs to a group in
Shoko, and you can [merge several series into one season](#season-merging).

**Use the TMDB Shows & Movies Structure when** you want seasons and episode order to match TMDB and most
streaming services, or you share the library with people who look things up there. **It requires properly linked
AniDB ↔ TMDB links in Shoko** for every series, including the episode links, and only works as well as those links
are.

:::tip Mix and match
You don't have to pick one structure for everything. A common setup is the AniDB or Shoko Group Structure as the
default, with the TMDB structure turned on for a handful of long-running shows whose AniDB split doesn't match how
people watch them, or the reverse.
:::

## AniDB Anime Structure

Every Shoko series becomes its own show.

```text
Starlight Academy/
├── Specials            ← the 2 specials
└── Season 1            ← 12 episodes
Starlight Academy (2020)/
└── Season 1            ← 12 episodes
Starlight Academy: Summer Break/
└── Season 1            ← 2 episodes
Starlight Academy: Graduation/
└── Season 1            ← the movie
```

- Normal episodes go into **Season 1** and specials into **Specials** (season 0).
- Episodes AniDB lists as "Other" (for example an alternate version of the story) get their own extra season, titled
  with "(Alternate Version)".
- Movie series appear as shows in a show library unless you separate movies from shows. See
  [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies).
- Nothing needs to be prepared in Shoko. This is also the fallback other structures use for series they can't handle.

## Shoko Group Structure

Every Shoko group becomes one show, and every Shoko series inside that group becomes a season.

```text
Starlight Academy/                     ← the Shoko group
├── Specials                           ← specials from every series in the group
├── Season 1  Starlight Academy
├── Season 2  Starlight Academy (2020)
├── Season 3  Starlight Academy: Summer Break
└── Season 4  Starlight Academy: Graduation
```

- The show's title comes from the Shoko group name (including a custom group name you set in Shoko), and its
  description from the group.
- Which series belong together is decided entirely in Shoko. See
  [Seasons in Shoko Group Structure](#seasons-in-shoko-group-structure).
- The order of the seasons is configurable. See [Season Ordering](#season-ordering).
- Several series can share one season. See [Season Merging](#season-merging).

## TMDB Shows & Movies Structure

The show, its seasons and the order of the episodes come from TMDB. Episodes are numbered from 1 in each season, even
where TMDB numbers them across seasons, and TMDB episodes hidden in Shoko are left out. See
[Episode Numbers](/jellyfin/concepts/episode-types-specials-and-extras#episode-numbers) and
[TMDB episodes](/jellyfin/concepts/episode-types-specials-and-extras#tmdb-episodes).

:::important Prerequisite: correct AniDB ↔ TMDB links
This structure is built entirely from the TMDB links in Shoko Server: each Shoko series must be linked to the right TMDB
show or movie, and its episodes must be linked to the right TMDB episodes. Check and fix links on the series'
**Metadata Linking** page in Shoko before you switch. See [Metadata Links](/shoko-server/metadata-links).
:::

```text
Starlight Academy/                     ← the TMDB show
├── Specials                           ← TMDB Season 0: the 2 specials and both Summer Break episodes
└── Season 1                           ← TMDB Season 1: 24 episodes from both AniDB entries
Starlight Academy: Graduation/         ← the TMDB movie
```

- Several AniDB entries linked to the same TMDB show end up in the same Jellyfin show, in TMDB's order.
- Series linked to a TMDB movie show up as that movie. Movies that belong to a TMDB collection are gathered under that
  collection.
- Titles, descriptions and artwork come from TMDB by default. To keep Shoko's title and artwork on the top-level show
  only, enable **Library** → **Basic Settings** →
  **Use Shoko Series Titles/Images with TMDB Structure** <Badge type="danger" text="Advanced" />. Seasons and episodes still use TMDB.
- Season ordering, season merging and specials placement don't apply; TMDB already decides all of that.

:::warning Unlinked series disappear
There is no fallback. A Shoko series that has no TMDB link, or a file whose episodes aren't linked to TMDB episodes, is
**not shown in the library at all**. Check your TMDB links in Shoko before switching, and set
**Series** → **Library Structure Mode** to **AniDB Anime Structure** or **Shoko Group Structure** for series that
can't be linked. The [Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons) guide walks through this.
:::

## Seasons in Shoko Group Structure

With the Shoko Group Structure, "a season" doesn't have to mean what AniDB or TMDB call a season. Anything you put in the
same Shoko group becomes a season of the same show: sequels, split cours, OVAs, side stories, even movies. That gives you
two ways to shape a show:

1. **Decide which Shoko series are in the group.** Each one becomes its own season.
2. **Merge several Shoko series into one season.** For example, two cours that AniDB lists separately become one
   24-episode season. See [Season Merging](#season-merging).

### Shaping Groups in Shoko

Groups are managed in the Shoko Web UI; see [Managing Groups](/shoko-server/collection#managing-groups) for how to move
series between groups, rename groups, pick the main series and group new series automatically. What matters for
Jellyfin:

- **The group name becomes the show title.** A custom name you set in Shoko is used as-is.
- **The main series matters.** Its [season ordering](#season-ordering) setting applies to the whole show, and it's the
  base the other seasons are numbered around.
- **Changes need a re-create.** Moving series between groups changes which shows and seasons exist, so
  [re-create the library](/jellyfin/how-to/re-create-a-library-safely) afterwards.
- **Careful with Recreate All Groups.** It throws away every manual group change and custom group name in Shoko.

### Things That Change What Ends Up in a Show

- **Groups with sub-groups aren't shows.** If a Shoko group contains sub-groups, its sub-groups become the shows. See
  [Nested Groups and Collections](#nested-groups-and-collections).
- **Separate Movies from Shows** (**Library** → **Basic Settings**) takes movie series out of the group show. They
  appear in your movie library instead.
- **Series with a different structure leave the show.** If one series in the group uses the AniDB or TMDB structure
  through a per-series override, it becomes its own show and the rest of the group stays together.
- **Hidden episodes are dropped.** Episodes hidden in Shoko don't appear in any season, and hiding the main episodes can
  change how a series is treated. See [Hidden Episodes](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes).

### Nested Groups and Collections

In Shoko, groups can contain other groups. With the Shoko Group Structure, that's how you get collections on top of
your shows: each group is a show, so the group *above* it becomes the collection.

```text
Shoko                                   Jellyfin
Starlight Academy (group)               Starlight Academy (collection)
├── Starlight Academy TV (group)        ├── Starlight Academy TV (show, one season per series)
│   ├── Starlight Academy               ├── Starlight Academy Movies (show)
│   └── Starlight Academy (2020)        └── Starlight Academy: Encore (show)
├── Starlight Academy Movies (group)
│   └── …
└── Starlight Academy: Encore (series)
```

- **Every group without sub-groups becomes a show**, with its series as seasons, just like a top-level group.
- **A series placed directly in a group that also has sub-groups** becomes its own show.
- **Groups above them become collections**, and deeper nesting gives collections inside collections. Set
  **Library** → **Collection Settings** → **Collections** to **Create collections for movies and shows**, and a
  collection is only created when it would hold at least two items.

The Shoko Web UI can't create nested groups yet; it takes a few API calls. See
[Nested Groups](/shoko-server/collection#nested-groups) in the server docs. Re-create the library after changing the
group structure.

## Season Ordering

<Badge type="danger" text="Advanced" />

With the Shoko Group Structure, **Library** → **Basic Settings** → **Default Shoko Group Structure Season Ordering**
decides the order of the seasons inside a show. It can be overridden per series under **Series** → **Shoko Group
Structure Season Ordering**, but only the override on the group's **main series** is used, since the whole show shares
one order.

| Option | Order |
| --- | --- |
| Let Shoko decide (Default) | The order Shoko Server returns the series in the group. |
| Order seasons by release date | By each series' first air date; series without a date go last. |
| Order seasons in chronological order (use indirect relations) <Badge type="warning" text="Experimental" /> | By AniDB relations: prequels before sequels, main stories before side stories. When two series aren't directly related, their other relations are weighed to guess their position, then air dates break ties. |
| Order seasons in chronological order (ignore indirect relations) <Badge type="warning" text="Experimental" /> | Same, but only direct prequel/sequel and main/side story relations are used; everything else falls back to air date. |

Chronological ordering relies on AniDB relation data. Make sure Shoko downloads related entries
(**Settings** → **AniDB** → **Download Options** → **Always Download Related Anime**). Because it's a best-effort
estimate, complicated franchises can still come out in an unexpected order; release date ordering is the predictable
choice.

Seasons are numbered in the resulting order, starting at 1. A series with alternate-version episodes takes up an extra
season number right after its own.

## Season Merging

<Badge type="danger" text="Advanced" />

Season merging puts several Shoko series from the same group into **one season**, with the episodes numbered
continuously. With merging, *Starlight Academy* looks like this:

```text
Starlight Academy/
├── Specials
├── Season 1  Starlight Academy + Starlight Academy (2020)   ← 24 episodes
├── Season 2  Starlight Academy: Summer Break
└── Season 3  Starlight Academy: Graduation
```

Episodes in a merged season are listed series by series: all episodes of the first series, then the next merged series,
and so on, each in episode order. Enable **Order episodes by airdate** on the season's first series to order every
episode of the merged season by air date instead.

### Requirements

Merging only happens when **all** of these are true for every series involved:

1. **Library** → **Season Merging Settings** → **Enable Season Merging** is on.
2. The series use the **Shoko Group Structure** (by default or through an override).
3. The series are in the **same Shoko group**.
4. None of them has **Do Not Merge This Series With Any Other Series** set.

There are two ways series get merged, and they don't mix:

- **Along AniDB relations:** automatic merging, **Merge With Sequel**, **Merge With Prequel** and **Merge With Main
  Story**. Series are only merged with their prequels and sequels (or main and side stories), step by step along the
  chain. These also need an **air date** in Shoko, and series without a per-series merge behaviour need their type (or
  overridden **Series Type**) ticked under **Series Types to Merge**. By default that's TV Series, TV Special, Web First
  Release / Original Net Animation (ONA) and Original Video Animation (OVA).
- **Through [merge groups](#merge-groups):** explicit links you set yourself. They don't need AniDB relations, air dates
  or matching titles.

### Automatic Merging

With **Automatically Merge Seasons** on (it's off on a fresh install), a series is merged into its prequel
automatically when:

- the prequel aired **before** it,
- the gap between the two series' first air dates is within **Merge Window (days)** (default 185; set it to 0 to ignore
  dates), and
- the sequel's AniDB main title is the prequel's title followed by a year in brackets, such as
  `Starlight Academy (2020)`, or a year plus part or cour number such as `Starlight Academy (2020 dai 2 cour)`. The
  prequel's own title may carry a year too, so `Title (2019)` and `Title (2020)` also match.

Main and side stories are **never** merged automatically; use an override for those. Titles that don't follow the
year pattern, like `Starlight Academy: Encore`, aren't merged automatically either.

### Merging by Hand, per Series

Open the **Series** tab, select a series, and tick one or more options under **Season Merging Behavior**. A behaviour set
here skips the air-date, merge-window, title and series-type checks for that pair.

| Option | What it does |
| --- | --- |
| Do Not Merge This Series With Any Other Series | Never merge this series, even automatically. |
| Merge With Sequel (Respects Air Date) | Merge this series' sequel into the same season. Setting it here, or **Merge With Prequel** on the sequel, or both, all work. |
| Merge With Prequel (Respects Air Date) | Merge this series into its prequel's season. Setting it here, or **Merge With Sequel** on the prequel, or both, all work. |
| Merge With Main Story | Merge this side story into its main story's season. |
| Merge Other Series Into This Series (Merge Group A–D) | Make this series the target of that merge group. See [Merge groups](#merge-groups). |
| Merge Into Other Series (Merge Group A–D) | Make this series a source of that merge group. See [Merge groups](#merge-groups). |

:::warning With automatic merging off, set both sides
If **Automatically Merge Seasons** is off, every series without its own merge behaviour is treated as
"do not merge", including as a merge *partner*. Setting **Merge With Sequel** on the first series alone isn't enough;
the sequel needs a merge behaviour too (for example **Merge With Prequel**). This doesn't apply to merge groups.
:::

### Merge Groups

Merge groups link series explicitly, in the order you choose, without relying on AniDB relations. The only
requirement besides the ones above is that all linked series are in the same Shoko group.

Each group letter (A–D) has two roles:

- **Target**: **Merge Other Series Into This Series**: the series the others are merged into.
- **Source**: **Merge Into Other Series**: a series that's merged into that letter's target.

Within one Shoko group, a letter has **one target** and **any number of sources**. Letters only apply inside their own
Shoko group, so you can reuse them in other groups.

**Links chain across letters.** A series can be a source of one letter and the target of another, so you can lay out a
season in any order. For five series *S1* to *S5* that are sequels of each other:

| Series | Merge group options |
| --- | --- |
| S2 | Merge Other Series Into This Series (Merge Group A) |
| S4 | Merge Into Other Series (Merge Group A), Merge Other Series Into This Series (Merge Group B) |
| S1 | Merge Into Other Series (Merge Group B), Merge Other Series Into This Series (Merge Group C) |
| S5 | Merge Into Other Series (Merge Group C), Merge Other Series Into This Series (Merge Group D) |
| S3 | Merge Into Other Series (Merge Group D) |

This gives one season with the series in the order **S2, S4, S1, S5, S3**. Merging the same series along their relations
would give S1, S2, S3, S4, S5.

How the order is decided:

- The season follows the links: each target is followed by its sources, and each source by whatever is linked to it.
- Several sources of the same target are ordered by air date.
- **Order episodes by airdate** on the season's first series still orders all of its episodes by air date.

**Merge groups are exclusive.** A series with any merge group option only merges through merge groups. Automatic
merging, **Merge With Sequel**, **Merge With Prequel** and **Merge With Main Story** ignore it, and won't pull it into
another season either.

**Mistakes are handled predictably** and logged as a warning in Jellyfin's log:

- Two targets for the same letter in one Shoko group: the one that aired first is used.
- Links that loop back on themselves: the loop is broken at the series that aired first.
- A source without a target in its Shoko group: it stays its own season.

### Recipes

**Two AniDB entries that are really one season**, like *Starlight Academy* and *Starlight Academy (2020)*:
enable **Enable Season Merging** and turn on **Automatically Merge Seasons**. The year suffix and the 92 days between
premieres are enough. If the second part aired more than 185 days later, raise **Merge Window (days)** or set
**Merge With Sequel** on the first series.

**A second part whose title doesn't match**, like *Starlight Academy* and *Starlight Academy: Encore*: set
**Merge With Sequel (Respects Air Date)** on *Starlight Academy*, or **Merge With Prequel (Respects Air Date)** on
*Encore*. With automatic merging off, set both.

**A side story inside its main season**, like putting *Summer Break* into season 1: set **Merge With Main Story** on
*Starlight Academy: Summer Break*. Its episodes are slotted in by air date.

**Three series into one season**, like *Starlight Academy*, *Encore* and *Finale*: set **Merge Other Series Into This
Series (Merge Group A)** on *Starlight Academy*, and **Merge Into Other Series (Merge Group A)** on both *Encore* and
*Finale*. The two sources follow the target in air date order. Use group B for a second, independent merged season in
the same show.

**A season in a custom order**: use a chain of merge groups, as in the S2, S4, S1, S5, S3 example under
[Merge groups](#merge-groups).

## Per-Series Settings

Every option on the **Series** tab overrides the matching global default for one Shoko series. Leave an option on
**Follow Global Settings** (or **Use Original Type**) to keep using the default.

| Setting | What it overrides |
| --- | --- |
| Series Type | The AniDB type used by type-specific features: movie handling, **Series Types to Merge**, movie special features. |
| Library Structure Mode | Which of the three structures this series uses. |
| Shoko Group Structure Season Ordering <Badge type="danger" text="Advanced" /> | Season order for the show, when this is the group's main series. |
| Specials Placement Within Seasons | Where specials are placed. See [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras). |
| Season Merging Behavior <Badge type="danger" text="Advanced" /> | How this series merges. See [Merging by hand](#merging-by-hand-per-series). |
| Episode Conversion Mode | Treat normal episodes as specials, specials as episodes, or specials as extras. See [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras). |
| Order episodes by airdate | Order episodes by air date instead of episode number. See [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras). |
| Include in Playlists <Badge type="tip" text="Next release" /> | Always include this series when playlists are generated. See [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions). |

**Finding a series:** type in **Search**. You can search by title, by AniDB ID prefixed with `a` (for example `a69`), or
by Shoko series ID prefixed with `s` (for example `s1`), then pick it under **Configure settings for**.

### Where These Settings Are Stored

Per-series settings are **not** stored in Jellyfin. Shokofin saves them on the series in Shoko Server, as custom tags
such as `Shokofin/Structure/Shoko`, `Shokofin/Merge/…` or `Series Type/Movie`. That means:

- they survive reinstalling Shokofin or Jellyfin,
- every Jellyfin server connected to the same Shoko Server uses them, and
- they are visible in the Shoko Web UI under a series' **Custom Tags**, with a description saying they're managed by
  Shokofin.

Change them from the Shokofin settings rather than adding or removing those tags by hand. Creating tags in Shoko needs
an administrator, which is why the connection in **Connection** uses an administrator account.

## What Needs a Re-create

Library structure decides how shows, seasons and folders are laid out, so changes here move items around rather than just
updating their metadata. After changing any of the following, re-create the affected libraries
([Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely)):

- **Default Library Structure Mode** or a series' **Library Structure Mode**
- season ordering, season merging settings, or a series' **Season Merging Behavior**
- **Separate Movies from Shows**, or a series' **Series Type**
- specials placement
- groups in Shoko (moving series, splitting or joining groups)

A metadata refresh is enough for **Use Shoko Series Titles/Images with TMDB Structure** and for changing a group's name.

## Related

- [One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise)
- [Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons)
- [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies)
- [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras)
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library) and [Series](/jellyfin/configuring-shokofin#series)
- [Metadata Links](/shoko-server/metadata-links) in Shoko Server
