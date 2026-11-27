---
title: Groups & Series
description: How Shoko turns AniDB anime into series, episodes and groups, how files are tied to episodes, and how grouping is decided.
---

# Groups & Series

Shoko organizes your collection the way AniDB does. Every **series** in Shoko is exactly one AniDB anime, its
**episodes** are that anime's AniDB episodes, and your **files** are linked to those episodes. On top of that, Shoko
puts series into **groups**, so a franchise with several AniDB entries can sit together under one name.

```text
Group
└── Series (one AniDB anime)
    └── Episode (one AniDB episode)
        └── File
```

Once you know that a series is an AniDB anime, most of what Shoko does with your collection becomes predictable.

## One AniDB Anime, One Series

AniDB gives every season, cour, movie, OVA and special release its own entry. Shoko follows it, so each of them is a
series of its own. A show with three seasons and a movie is four series in Shoko, not one show with three seasons.

This surprises people coming from libraries built on TMDB or similar sites, where a long-running show is one entry with
numbered seasons. Numbered seasons are mostly an American TV habit: in Japan, a new season of an anime is usually
released as a new series, with its own title and its own episode 1, and AniDB lists it that way. So in Shoko,
"season 2" is usually a separate series with its own episode 1. Grouping is how those
entries end up side by side, and metadata sources such as TMDB can add their own season and episode numbering on top
(see [Metadata Sources](/shoko-server/concepts/metadata-sources)).

Shoko creates a series once a file is recognized as part of that anime, and keeps it when the files are later removed
(see [Series Without Files](#series-without-files)). Information about related anime may be downloaded too, but that
doesn't make them series in your collection.

## Episodes and Their Types

AniDB sorts the episodes of an anime into types, and Shoko keeps them:

| AniDB type | What it holds | **Type** filter option |
| --- | --- | --- |
| Episode | The regular episodes, numbered 1, 2, 3 and so on. | **Episodes** |
| Special | Specials and extra episodes. | **Specials** |
| Credits | Openings and endings. | **Credits** |
| Other | Anything else AniDB lists separately. | **Others** |
| Trailer | Trailers, promos and commercials. | **Misc.** |
| Parody | Parodies and spoofs. | **Misc.** |

The **Episodes** tab of a series only shows regular episodes at first. To see the others, change **Type** in the
**Search & Filter** panel to **All**, or to the option in the table above (**Misc.** covers trailers, parodies and
episodes of unknown type). This is only a filter on the page: it isn't the same as hiding an episode, which keeps it
out of view everywhere (see [Hiding Episodes](/shoko-server/collection#hiding-episodes)).

Missing episode counts only look at regular episodes that have aired.

## Files and Episodes

Shoko recognizes a file by its hash, and links it to the episodes it contains. That link isn't always one-to-one:

- **One file, several episodes.** A file holding two episodes back to back is linked to both.
- **Several files, one episode.** Two releases of the same episode (a TV version and a Blu-ray version, say) are both
  linked to that episode, and so are the parts of an episode split over several files.

How a file gets recognized, and what to do when it isn't, is covered in
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files).

## Groups

A group is a container for related series. The collection lists groups, and opening one shows its series sorted by
when they first aired. A group with only one series opens straight to that series.

### How a Series Gets Its Group

A series is given its group once, when Shoko creates it. What happens depends on **Auto Group Series** in
[Settings → Collection](/shoko-server/settings/collection#relation-options), which is off by default:

- **Off:** every new series gets a group of its own. Nothing is grouped until you do it.
- **On:** Shoko follows the AniDB relations of the new series (sequel, prequel, side story and so on) to the anime
  related to it. If one of those is already a series in your collection, the new series joins that series' group.
  Otherwise it gets a new group. Relations you exclude under **Exclude following relations** aren't followed.

Grouping can only follow relations to anime Shoko has information about. That's why turning on **Auto Group Series**
also has Shoko download information about related anime, even ones you have no files for, as far as
[Related Depth](/shoko-server/settings/anidb) allows.

Changing **Auto Group Series** or the relation options doesn't move any series that already has a group. It applies
to series added from then on, and to **Recreate All Groups** (see below).

### The Main Series and the Group Name

Every group has a main series. The group takes its name from the main series' title, in your preferred language
from [Language Options](/shoko-server/settings/collection#language-options), and its poster from the main series too.

The main series is, in this order:

1. The series you picked with **Set as main series**.
2. The anime the group was created with, while it's still in the group. With **Auto Group Series** on, that's the
   related anime that aired first, or the one **Determine Main Series Using Relation Weighing** picks.
3. Otherwise, the series in the group, nested groups included, that aired first.

Relation weighing favors TV series, then web series, then OVAs, and anime with more sequels. A group you create
yourself has no such anime, and moving that series out of its group clears it.

A name you give the group yourself replaces the main series' title, and stays until you change it.

### Nested Groups

A group can also hold other groups, for example a franchise group holding one group for the TV series and one for the
movies. Shoko never nests groups on its own; you arrange them yourself. See
[Nested Groups](/shoko-server/collection#nested-groups).

### Changing Groups by Hand

Moving series between groups, renaming groups and picking the main series are all done in the Web UI. The steps are
in [Managing Groups](/shoko-server/collection#managing-groups).

### What Recreate All Groups Throws Away

**Recreate All Groups** (under **Actions**, and in
[Settings → Scheduled Actions](/shoko-server/settings/scheduled-actions)) deletes every group and builds them again
from your current **Relation Options**: with **Auto Group Series** off, that means one group per series. Everything
you set on your groups is lost:

- series you moved between groups by hand,
- custom group names and descriptions,
- the main series you picked,
- nested groups.

The new groups also get new IDs, so anything that remembered a group by its ID sees a different group afterwards.
While it runs, Shoko pauses the queue and holds back other database work.

:::warning Think Before You Recreate
Once you've arranged groups by hand, prefer moving the few series that need it over recreating everything. If you
only changed language settings, **Rename All Groups** is enough and keeps your arrangement.
:::

## Series Without Files

A series stays in Shoko when its files are removed, and keeps showing in the collection. Over time these build up.
**Utilities** → [Series Without Files](/shoko-server/series-without-files) lists them, and lets you delete the ones
you don't need.

## Missing Series

If a series you expect isn't in the collection, it's usually one of these:

- **Its files aren't recognized yet.** Shoko only creates the series once a file is linked to the anime and the anime's
  AniDB information is in. A large import, or a pause in AniDB requests, can delay it. See
  [How Files Are Imported](/shoko-server/concepts/how-files-are-imported).
- **Your user can't see it.** Series carrying a tag your account is restricted from are hidden from that account
  everywhere. See [Tag Restrictions](/shoko-server/settings/user-management#tag-restrictions).
- **A filter hides it.** Check the active filter in the collection.

## What This Means for You

- Expect several series per franchise. Turn on **Auto Group Series** before your first import if you want them
  grouped for you, or group them by hand afterwards.
- Media server plugins build on these groups and series. With Shokofin's Shoko Group Structure, for example, a group
  becomes a show and its series become seasons, so your grouping decides what you see there. See
  [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons#shaping-groups-in-shoko).
- How you lay out your folders doesn't matter to Shoko, which recognizes files by their hash, nor to Shokofin, whose
  [virtual file system](/jellyfin/concepts/virtual-file-system) builds its own. For anything else that reads your folders directly, one folder per series fits
  anime better than one folder per show with `Season 1`, `Season 2` and so on inside, since each of those seasons is a
  series of its own. The default renamer sorts files that way; see
  [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).
- Looking for specials, openings or trailers? They're there, under another episode type.
- Be careful with **Recreate All Groups** once you've grouped anything by hand.

## Related

- [Collection](/shoko-server/collection), with [Managing Groups](/shoko-server/collection#managing-groups) for the
  steps.
- [Collection Settings](/shoko-server/settings/collection): languages and relation options.
- [Metadata Sources](/shoko-server/concepts/metadata-sources): what TMDB and other sources add to a series.
- [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files)
- [Series Without Files](/shoko-server/series-without-files)
