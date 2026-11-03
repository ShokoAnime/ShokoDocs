---
title: Place Specials & Extras | Jellyfin
description: Decide where specials, openings, endings and trailers appear in your Jellyfin library.
---

# Place Specials & Extras

Choose whether specials stay in a separate Specials season or show up between the episodes they aired with, whether
openings and endings play as theme videos or appear as special features, and what to do with series whose specials
aren't really episodes.

```text
Before                                  After ("Use release dates to place specials")
Show                                    Show
├── Specials                            ├── Specials
│   ├── S1 Recap                        │   └── …
│   └── S2 Beach Episode                └── Season 1
└── Season 1                                ├── Episode 6
    ├── Episode 6                           ├── S1 Recap
    └── Episode 7                           ├── Episode 7
                                            └── S2 Beach Episode
```

## Before You Start

- Extras (theme videos, trailers, special features) only appear in libraries that use the
  [Virtual File System](/jellyfin/concepts/virtual-file-system).
- Changing specials placement needs a library re-creation. Read
  [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely) first so you don't lose watch state.
- Specials placement has no effect on series that use the
  [TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure).

## In Shoko Server

Hide the episodes you never want to see in Jellyfin, such as a special you consider filler. See
[Hide Episodes](/jellyfin/how-to/hide-episodes) for the steps, and for what else changes when you hide episodes.

## In Shokofin

### Place Specials Within Seasons

1. In the Shokofin settings, open the **Library** tab.
2. Under **Basic Settings**, set **Default Specials Placement Within Seasons**:
   - **Use release dates to place specials** puts each special after the episode that aired before it. This is the
     most reliable choice.
   - **Always place specials after the normal episodes** lists them at the end of their season.
   - **Exclude specials from the seasons** keeps them in the Specials season only.
3. Click **Save**.

To use a different placement for one series:

1. Open the **Series** tab and search for the series by title, or by AniDB ID prefixed with `a` (for example `a69`).
2. Select it under **Configure settings for**.
3. Set **Specials Placement Within Seasons**, then click **Save**.

### Choose What Happens to Openings, Endings and Trailers

1. Open the **VFS** tab.
2. Under **Basic Settings**:
   - Enable **Add Credits as Theme Videos** to play openings and endings in the background while browsing a show.
   - Enable **Add Credits as Special Features** to list them with the show's special features.
   - Enable **Add Trailers** to list trailers as Jellyfin trailers.
3. Click **Save**.

Both credit options can be on at the same time. Turn both off to leave credits out.

### Fix a Series Whose Specials Aren't Episodes

Some series have specials that are really recaps, commentary or bonus clips. Turn them into extras instead:

1. Open the **Series** tab and select the series.
2. Set **Episode Conversion Mode** to **Convert Specials to Extra Featurettes**.
3. Click **Save**.

For the opposite case, an OVA whose real story episodes are listed as specials on AniDB, pick **Convert Specials to
Normal Episodes** and enable **Order episodes by airdate** so they sit in broadcast order.

### Number Specials in Their Titles

**Metadata** → **Title Settings** → **Add Prefix to Episodes** adds `S1`, `S2`, … in front of special titles. It's on
by default; turn it off if you prefer plain titles.

## In Jellyfin

1. Check that **Dashboard** → **Libraries** → **Display** → **Display specials within seasons they aired in** is enabled.
   Without it, Jellyfin ignores the placement and only shows specials in the Specials season.
2. If you changed specials placement, [re-create the library](/jellyfin/how-to/re-create-a-library-safely).
3. For the other changes on this page, open the library's menu, choose **Refresh metadata**, select **Replace all
   metadata**, and start the refresh. Changes to VFS extras are picked up by the next library scan.

## Check That It Worked

- Open a show with specials and a normal season. The specials should appear between episodes (or at the end), and
  still be listed in Specials.
- Open a show's page and wait a moment: its opening should start playing in the background if theme videos are enabled
  in your Jellyfin client's display settings.
- The converted series shows its former specials under special features instead of in Specials.

## If It Didn't Work

- Specials are still only in Season 0: check the Jellyfin display option above, then make sure you re-created the
  library rather than refreshing it. See [Settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).
- No extras at all: the library is probably using a legacy filtering mode. Extras need the VFS.
- A special became an interview or clip unexpectedly: its English title matched one of the
  [recognised title patterns](/jellyfin/concepts/episode-types-specials-and-extras#recognised-special-titles).

## Related

- [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras): how every episode type is handled.
- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons): where seasons come from.
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library), [VFS](/jellyfin/configuring-shokofin#vfs) and
  [Series](/jellyfin/configuring-shokofin#series).
