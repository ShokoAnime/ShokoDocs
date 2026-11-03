---
title: Episode Types, Specials & Extras | Jellyfin
description: How Shokofin turns AniDB episode types into Jellyfin episodes, specials, extras, trailers and theme videos.
---

# Episode Types, Specials & Extras

Every episode in Shoko Server has an AniDB episode type: a normal episode, a special, an opening, a trailer, and so on.
Shokofin uses that type, and sometimes the episode's English title, to decide whether a file becomes a regular episode,
a special in Season 0, or an extra such as a trailer, interview or theme video. This page explains those rules and the
settings that change them.

## How Episode Types Map to Jellyfin

In a Shows library, every file lands in exactly one of these buckets.

| AniDB episode type | Shows up in Jellyfin as | Folder in the VFS |
|---|---|---|
| Episode | A normal episode in its season | `Season 01`, `Season 02`, … |
| Special | A special in Season 0 | `Season 00` |
| Special or Other, with a recognised title (see below) | An extra of the matching type | `interviews`, `clips`, `behind the scenes`, … |
| Other | An episode in an extra "(Alternate Version)" season | `Season NN` |
| Opening, Ending, Credits | A theme video and/or a special feature | `backdrops` and/or `extras` |
| Trailer | A trailer | `trailers` |
| Parody, Interview, Extra | A generic extra | `extras` |

Extras are placed on the show, and also inside their season folder when the episode belongs to a numbered season.
In a Movies library, extras are attached to every movie of the same Shoko series.

### Recognised Special Titles

Specials and "Other" episodes are checked against their English title. If the title matches one of these patterns, the
episode becomes an extra instead of a special or alternate episode.

| The English title… | Becomes |
|---|---|
| contains "interview" | Interview |
| starts with "cinema" or "theatrical" and contains "intro" or "outro", or contains "manners movie" | Clip |
| starts with "episode" and contains "ending" | Clip |
| contains "behind the scenes", "making of", "music in", "advance screening" or "premiere" | Behind the scenes |
| contains "talk show" | Featurette |

Anything else stays a special (for Special episodes) or an alternate episode (for Other episodes).

### Alternate Version Seasons

AniDB uses the "Other" type for things like director's cuts or alternate broadcasts of the same story. Shokofin keeps
them out of the main season and gives them their own season, titled after the series with "(Alternate Version)" added.

If every normal episode of a series is hidden in Shoko and you have alternate episodes, the alternate episodes are
promoted to normal episodes instead.

### Extras Need the VFS

Trailers, theme videos, interviews and every other extra only appear in libraries that use the
[Virtual File System](/jellyfin/concepts/virtual-file-system). Libraries in a legacy filtering mode hide files that Shoko
classifies as extras, because Jellyfin can only pick them up from specially named folders that the VFS creates for you.

## Openings, Endings and Trailers

In the Shokofin settings, **VFS** → **Basic Settings** controls what happens to openings, endings and trailers:

| Setting | Effect |
|---|---|
| **Add Credits as Theme Videos** | Openings, endings and credits play as background theme videos while you browse the show. On by default. |
| **Add Credits as Special Features** | Openings, endings and credits are listed under the show's special features. Off by default. |
| **Add Trailers** | Trailers are listed as native Jellyfin trailers. On by default. |

You can enable both credit options at once. With both off, credits are left out of the library entirely.

## Episode Numbers

The season and episode numbers Shokofin gives Jellyfin are counted by the plugin. They're not copied from AniDB or TMDB:
AniDB and TMDB decide the *order* of the episodes, and Shokofin then numbers them 1, 2, 3, … within each season, with no
gaps. The same applies in every [library structure](/jellyfin/concepts/library-structures-and-seasons). This is intentional: every season Jellyfin
sees is a clean, gap-free sequence, whatever numbering the source uses.

- **Hidden episodes don't take up a number.** Hide episode 3 of a 12-episode season and the remaining episodes are
  numbered 1 to 11.
- **Absolute numbering is reset per season.** If TMDB numbers a season's episodes 25 to 48, they're episodes 1 to 24
  in Jellyfin.
- **Merged seasons are numbered straight through.** Two 12-episode series [merged into one season](/jellyfin/concepts/library-structures-and-seasons#season-merging)
  become episodes 1 to 24.
- **Specials are numbered across the whole show.** All specials share Season 0 and are numbered 1, 2, 3, … in season
  order.
- **Alternate Version seasons** and specials [converted to normal episodes](#per-series-episode-conversion) follow the
  same rule: counted in the order they're listed.
- **Files with several episodes** show as a range, such as `E01-E02`.

Season numbers are counted the same way: the seasons of a show are numbered 1, 2, 3, … in show order. In the
[TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure) that
matches TMDB as long as TMDB's seasons are numbered without gaps; a season with no visible episodes is skipped, and the
seasons after it move up.

:::warning Changes can renumber episodes
Hiding or unhiding episodes, merging seasons, converting episode types, or changing the order all renumber the episodes
that come after the change. The VFS file names use these numbers, and Jellyfin stores an episode's watch state by show,
season and episode number. Watch state that only exists in Jellyfin can therefore end up on a different episode.
[Sync watch state with Shoko](/jellyfin/how-to/sync-watch-state) before making such changes, so you can restore it with
**Import User Data** afterwards.
:::

## Specials

Specials always live in Season 0, which Jellyfin shows as "Specials". Jellyfin can also show a special inside a normal
season, next to the episode it aired after. For that to work, the special needs an "airs before" or "airs after" hint,
and those hints are what the **Library** → **Basic Settings** → **Default Specials Placement Within Seasons** setting
provides.

| Option | What the hint says |
|---|---|
| **Exclude specials from the seasons** (default) | No hint. Specials only appear in Season 0. |
| **Always place specials after the normal episodes** | The special airs after its season, so it's listed at the end. |
| **Use release dates to place specials** | Specials are placed after the normal episode that aired just before them. A special that aired before the first episode is listed at the start of the season, and one that aired after the last episode is listed at the end. |
| **Loosely use the TMDB data available in Shoko to place specials** | Intended to place specials using the TMDB episode data linked in Shoko. |
| **Either loosely use the TMDB data available in Shoko or fallback to using release dates to place specials** | Intended to use the TMDB data where available and release dates otherwise. |

The two TMDB-based options are not reliable yet, so prefer **Use release dates to place specials** if you want specials
in their seasons.

Jellyfin only uses the hints when the server option **Dashboard** → **Libraries** → **Display** → **Display specials
within seasons they aired in** is enabled. It is on by default.

You can override the placement for a single series on the **Series** tab with **Specials Placement Within Seasons**.
Specials placement doesn't apply to series that use the
[TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure).

:::warning Re-create the library after changing this
Changing the specials placement, globally or for one series, needs a
[library re-creation](/jellyfin/how-to/re-create-a-library-safely). A metadata refresh leaves you with a mix of old and new
placements.
:::

### Numbering Specials in Titles

**Metadata** → **Title Settings** → **Add Prefix to Episodes** adds `S1`, `S2`, … in front of the title of every
special, for example `S2 Recap`. The number is the special's position among the specials of its own Shoko series, which
makes them easy to tell apart in a long Specials season. It's on by default.

## Force Movie Special Features <Badge type="danger" text="Advanced" />

AniDB movie entries often come with specials like making-ofs, stage greetings or commercials. By default only the
specials with a [recognised title](#recognised-special-titles) become special features. Enable **Library** → **Basic
Settings** → **Force Movie Special Features** to turn *every* special and alternate episode of every movie-type series
into a special feature of its movie.

This applies to all movie-type series in all libraries, and it replaces any per-series **Episode Conversion Mode** on
those series. The settings page warns that it will break some movie series in a Shows library, so prefer the per-series
**Convert Specials to Extra Featurettes** below if only a few movies need it.

## Per-Series Episode Conversion

On the **Series** tab, **Episode Conversion Mode** changes how the episodes of one Shoko series are treated. Use it for
the odd series whose AniDB episode types don't match how you want to watch it.

| Option | What it does | Typical use |
|---|---|---|
| **No Conversion** (default) | Uses the AniDB episode types as they are. | Most series. |
| **Convert Normal Episodes to Specials** | Treats the normal episodes as specials, so they go to Season 0. | When the episodes should only show up as specials. Usually combined with season merging, for example to merge a TV special into the main series as specials. |
| **Convert Specials to Normal Episodes** | Treats specials as normal episodes. They're listed after the regular episodes, unless you also order by air date. | An OVA series where AniDB lists the actual story episodes as specials. |
| **Convert Specials to Extra Featurettes** | Turns all specials and alternate episodes into extras. | A series whose specials are recaps, commentary or bonus clips you don't want in Season 0. |

Extras are only shown in VFS libraries, so **Convert Specials to Extra Featurettes** hides those specials in a legacy
library.

## Order Episodes by Airdate

Normally episodes are ordered by their episode number. Enable **Order episodes by airdate** on the **Series** tab to
order them by the date they aired instead. This helps with series where AniDB's numbering doesn't follow broadcast order,
or when specials were converted into normal episodes and should sit between the episodes they aired with.

This setting has no effect on series that use the
[TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure),
where TMDB decides the order.

## Hidden Episodes

Episodes can be hidden in the Shoko Web UI: open the series, go to the **Episodes** tab and use the eye icon
(**Hide Episode**). Shokofin treats a hidden episode as if it doesn't exist. That has a few effects beyond the episode
itself disappearing. For step-by-step instructions, see [Hide Episodes](/jellyfin/how-to/hide-episodes).

Hidden episodes are hidden for every Jellyfin server and user connected to that Shoko Server. To hide something from
only some people, use Jellyfin's parental controls instead.

### Seasons and Missing Episodes

Hidden episodes are left out of every season Shokofin builds, including
[merged seasons](/jellyfin/concepts/library-structures-and-seasons#season-merging). They're also never added as missing episodes by
**Add Missing Episodes/Seasons**, which makes hiding the way to get rid of "missing" entries you'll never have, such as
specials you don't collect.

Hidden episodes don't take up an episode number either; the episodes after them move up. See
[Episode Numbers](#episode-numbers).

### TMDB Episodes

In the [TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure),
seasons are built from TMDB episodes, and TMDB episodes have their own hidden state in Shoko Server, separate from the
AniDB episodes they're linked to:

- **Hide the TMDB episode** to leave it out of the season entirely, including as a missing episode. The Shoko Web UI
  doesn't offer this yet; see [Hiding Metadata Episodes](/shoko-server/metadata-features#hiding-metadata-episodes).
- **Hiding only the AniDB episode** removes your file from Jellyfin, but the TMDB episode stays in the season and can
  show up as missing.

### Files

- **A file linked only to hidden episodes isn't shown.** In a VFS library it isn't linked into the VFS at all. In a
  library using **Legacy Filtering (Strict)** it's filtered out, and with **Legacy Filtering (Lax)** it's treated like
  any file Shoko doesn't know, so Jellyfin's own naming rules decide what happens to it.
- **A file linked to several episodes keeps only the visible ones.** Its title, its episode range (such as `E01-E02`)
  and whether it's treated as a normal episode or a special are based on the episodes that aren't hidden. Hiding the
  normal episode of a file that is also linked to a special turns that file into a special.

### Specials Placement and Hidden Episodes

When specials are placed between episodes (see [Specials](#specials)), each special is anchored to the episode that aired
before it. Hidden episodes are skipped, so a special follows the nearest *visible* episode.

### When the Main Episodes Are Hidden

Hiding the main entries of a series changes how the whole series is treated:

- **All normal episodes hidden:** if the series has episodes of the "Other" type (the ones normally shown as an
  [Alternate Version season](#alternate-version-seasons)), those become the series' normal episodes instead.
- **The main movie hidden:** a series that AniDB lists as a movie is treated as a web series once its main movie entry
  is hidden, for example when you only keep the individual parts of a movie that was also released in one piece. It
  then shows up as a show rather than a movie, which matters for **Separate Movies from Shows**, movie libraries and
  movie collections. Set a **Series Type** override on the **Series** tab if you want to keep it a movie.

Both cases can move the series between libraries or seasons, so
[re-create the library](/jellyfin/how-to/re-create-a-library-safely) afterwards.

### Applying Changes

Shoko Server sends an episode update when you hide or unhide an episode. With
[Metadata Events](/jellyfin/concepts/real-time-updates) enabled, Shokofin refreshes the affected entries on its own. The
episode's files are only removed from or added back to the VFS on the next library scan, so scan the library after
hiding or unhiding episodes. Because hiding renumbers the episodes that follow, read the warning under
[Episode Numbers](#episode-numbers) first.

## Related

- [Hide Episodes](/jellyfin/how-to/hide-episodes): step-by-step instructions for hiding episodes in Shoko.
- [Place Specials & Extras](/jellyfin/how-to/place-specials-and-extras): step-by-step setup for everything on this page.
- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons): how Shoko series become shows and seasons.
- [Per-series settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings): where series overrides are stored.
- [The Virtual File System](/jellyfin/concepts/virtual-file-system): why extras need it.
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library) and [VFS](/jellyfin/configuring-shokofin#vfs).
