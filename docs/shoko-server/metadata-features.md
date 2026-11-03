---
title: Metadata Features
description: What a metadata link gives you in Shoko — alternate episode orderings, hidden episodes, extra images, and what media servers do with them.
---

# Metadata Features

These are the things a series gains once it's [linked](/shoko-server/metadata-links) to a metadata source. They work
the same for every source, though the examples use TMDB, since it's the source most collections have links for.

## Alternate Episode Orderings

Anime often has more than one way of grouping its episodes into seasons: DVD or BD ordering, how a streaming site
lists it, even the arcs of the manga. Take [Bleach](https://anidb.net/anime/2369), which
[TMDB](https://www.themoviedb.org/tv/30984-bleach/seasons) doesn't split into seasons at all, where many people would
expect it to — its [episode groups](https://www.themoviedb.org/tv/30984-bleach/episode_groups) page offers several
alternatives.

To use one, the series needs:

- a link to the source,
- at least one ordering offered by the source for that series,
- and the source's provider set to download them, which is one of
  [its own settings](/shoko-server/settings/metadata#provider-settings) — for TMDB that's
  **Auto Download Alternate Ordering**, which is off until you turn it on.

Then go to the series, click **Edit Link** (the pencil next to the link), then **Open Settings** (the gear next to the
source's title). Pick the ordering you want in the modal and click **Save**.

![Shoko Server - Metadata Linking - Page - Ordering](/images/shoko-server/shoko-server-matadata-linking-page-ordering.jpg)

## Hiding Metadata Episodes

A source's episodes have their own hidden state, separate from the AniDB episodes they're linked to. A hidden episode
is left out of that source's episode lists by default, so it doesn't show up in programs that build seasons from the
source, such as Shokofin's TMDB Shows & Movies Structure. Hiding the linked AniDB episode doesn't hide the source's
episode, and vice versa.

This isn't in the Web UI yet. Use Shoko's API through [/swagger/](/faq#general) instead:

1. Open `http://<shoko-server>:8111/swagger/` and click **Authorize**. Enter an API key in the `apikey` field; you can
   create one under **Settings** → **API Keys** → **Generate API Key**.
2. Find the episode's full ID, which looks like `tmdb://episode/123` or `anidb://episode/456`.
3. Hide it with `POST /api/v3/Metadata/Episode/Hidden` and the body
   `{ "EpisodeID": "tmdb://episode/123", "Value": true }`. Send `false` to unhide it again.

`GET /api/v3/Metadata/Episode/Hidden?episodeID=<full ID>` reports whether one is hidden. Only an admin can change it.

## Extra Images

Without a metadata link, Shoko only has a single poster per series. Once one is in place, the extra posters, backdrops
and logos that the source serves are downloaded, as far as the
[image options](/shoko-server/settings/metadata#image-options) allow.

The default image of each type is then chosen in the **Selected Image Info** panel of the **Images** tab on a series
page: select the image you want and click **Set As Preferred**.

![Shoko Server - Selected Image Info - Panel](/images/shoko-server/shoko-server-selected-image-info-panel.jpg)

:::info Episode Thumbnails
Episodes get images of their own where the link provides them, with movie links falling back to the backdrop, but
they can't be chosen from the Web UI yet.
:::

## Using Metadata Links in Media Servers

Media server plugins can use your links for more than extra artwork. Both of the plugins below use TMDB links today.

### Jellyfin (Shokofin)

Shokofin can use your TMDB links to build Jellyfin shows with TMDB's seasons and episode numbers, pull TMDB titles,
descriptions and content ratings, and place TMDB movies into collections. The **TMDB Shows & Movies Structure**
requires every AniDB entry you want to show to be properly linked, including correct episode links for the
[multi-entry cases](/shoko-server/metadata-links#multi-entry-series). A series without TMDB links won't appear in a
library using that structure.

Shokofin follows the alternate ordering selected for a series, so pick it before creating the library. See
[Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons) for a step-by-step guide.

### Plex (Shoko Relay)

With a TMDB link, Shoko Relay adds Plex theme songs, falls back to TMDB titles and descriptions where AniDB has none,
and adds backdrops and extra posters. With single season ordering disabled, it also supports seasons for long-running
anime, combining several Shoko series into one Plex entry, and alternate episode orderings. See
[TMDB Matching](/plex/configuring-shoko-relay#tmdb-matching) for details.
