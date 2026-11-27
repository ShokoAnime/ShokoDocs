---
title: Hide Episodes | Jellyfin
description: Hide episodes in Shoko Server so Shokofin leaves them out of your Jellyfin library, and understand what else changes when you do.
---

# Hide Episodes

Hiding an episode in Shoko Server is the way to keep it out of Jellyfin: a filler special you never want to see, a
recap, or an entry you'd rather not have listed as "missing". Shokofin leaves hidden episodes out of every season it
builds, and files that only contain hidden episodes don't show up at all.

Hiding can change more than a single entry, for example which episodes count as the main episodes of a series. Read
[What hiding does in Jellyfin](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes) before hiding the main episodes or the
main movie of a series.

## Before You Start

- Hidden episodes are hidden for **every** Jellyfin server and user connected to that Shoko Server. To hide something
  from only some people, use Jellyfin's parental controls instead; see
  [Ratings & Parental Controls](/jellyfin/how-to/ratings-and-parental-controls).
- The files stay on disk and in Shoko. Unhiding the episode brings them back.
- Hiding renumbers the episodes that come after it, and Jellyfin ties watch state to episode numbers.
  [Sync watch state with Shoko](/jellyfin/how-to/sync-watch-state) first. See
  [Episode Numbers](/jellyfin/concepts/episode-types-specials-and-extras#episode-numbers).

## In Shoko Server

1. Hide each episode as described in [Hiding Episodes](/shoko-server/collection#hiding-episodes): open the series, go to
   the **Episodes** tab, and click the eye icon (**Hide Episode**) on the episode's thumbnail.
2. Looking for a special, credit or other entry? The **Episodes** tab only lists normal episodes by default; change the
   type filter to **All**.
3. Using the TMDB Shows & Movies Structure? Also hide the TMDB episode, as described in
   [Hiding Metadata Episodes](/shoko-server/metadata-features#hiding-metadata-episodes). Otherwise the TMDB episode stays in the
   season and can show up as missing.

## In Jellyfin

1. Scan the library, for example with **Dashboard** → **Libraries** → **Scan All Libraries**. With the VFS, this is what
   removes or re-adds the episode's files.
2. If [Metadata Events](/jellyfin/concepts/real-time-updates) are enabled for the library, Shokofin refreshes the affected
   entries on its own after the change in Shoko. Without them, refresh the series: open it, choose **Refresh metadata**
   and pick **Replace all metadata**.
3. If you hid or unhid the main episodes or the main movie of a series, the series may switch between being a movie and
   a show (see [When the main episodes are hidden](/jellyfin/concepts/episode-types-specials-and-extras#when-the-main-episodes-are-hidden)).
   In that case [re-create the library](/jellyfin/how-to/re-create-a-library-safely).

## Check That It Worked

- The episode no longer appears in its season, not even as a missing episode, and the episodes after it have moved up
  by one.
- Episodes that shared a file with the hidden episode still show, with titles and episode numbers for the visible
  episodes only.
- Specials placed between episodes are anchored to the nearest visible episode.

## If It Didn't Work

- **The episode still shows after a scan and refresh:** Shokofin caches Shoko data while it's busy. Wait a minute after
  the scan finishes, then refresh the series again.
- **It still shows as a missing episode in the TMDB structure:** that structure builds seasons from TMDB episodes,
  which are hidden separately. Hide the TMDB episode too; see
  [TMDB episodes](/jellyfin/concepts/episode-types-specials-and-extras#tmdb-episodes).
- **Later episodes have different numbers now:** that's expected. Episode numbers are counted without gaps, so hidden
  episodes don't leave a hole. See [Episode Numbers](/jellyfin/concepts/episode-types-specials-and-extras#episode-numbers).
- **A movie now appears in your shows library, or a series disappeared:** you hid the main movie entry, so the series is
  treated as a web series instead of a movie. See
  [When the main episodes are hidden](/jellyfin/concepts/episode-types-specials-and-extras#when-the-main-episodes-are-hidden).
- **A whole series is gone:** every episode with a file is hidden. See
  [A series is missing from the library](/jellyfin/troubleshooting#a-series-is-missing-from-the-library).

## Related

- [Hidden Episodes](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes): everything that changes when episodes are hidden.
- [Place Specials & Extras](/jellyfin/how-to/place-specials-and-extras): other ways to control where specials go.
- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons): how hidden episodes affect merged seasons.
