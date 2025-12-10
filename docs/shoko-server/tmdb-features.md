---
title: TMDB Features
description: An overview of various TMDB related things in Shoko's Web UI.
---

# TMDB Features

There are several features which are only available when a series in Shoko has a TMDB link.
They will be detailed below along with instructions for importing curated links.

## Curated TMDB Mappings

For users who are new to Shoko or don't have any TMDB links, two .csv files are available below which have been
manually checked for accuracy.

:::warning Stable Users
For those still using Shoko Server v5.1.0 the most up to date files which are listed below will not import correctly.
[Here](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed/65351313e7990c339c8813e956e8364fd24197d9)
is a link to an older .csv which will still import.
:::

Either of these files can be imported using Shoko's `/Tmdb/Import` v3 API endpoint in
[/swagger/](/faq#general) (Shoko's public API) to bypass fully auto-linking an unlinked library.

- [Shoko: AniDB → TMDB Mappings](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed)
- [Shoko: AniDB → TMDB Mappings (Comments)](https://gist.github.com/natyusha/b46aeaf2f5f6e5a9333d6f501be6c9ee)

## Managing TMDB Links

To manage TMDB links simply navigate to a series in your Shoko collection then look for the **Edit**, **Remove** or **Add** Link buttons.
These buttons are located in the **Metadata Sites** panel of the **Overview** tab (shown in the image below).

![Shoko Server - Metadata Sites - Panel](/images/shoko-server/shoko-server-metadata-sites-panel.jpg)

Adding a link will take you to the **Metadata Linking** page for the series where a matching TMDB **TV** or **Movie** entry can be selected.

![Shoko Server - Metadata Linking - Page - Unlinked](/images/shoko-server/shoko-server-matadata-linking-page-unlinked.jpg)

Editing or saving a link will allow you to manage individual episode assignments.

![Shoko Server - Metadata Linking - Page - Linked](/images/shoko-server/shoko-server-matadata-linking-page-linked.jpg)

### Mutli-Entry Series
Some AniDB series will require multiple TMDB links to complete all of their metadata. Using [Fate/Stay Night: Heaven's Feel](https://anidb.net/anime/10755)
as an example, it can be observed that the AniDB entry includes what TMDB considers to be three separate movies.
So each of those entries would have to be added and attached to their respective "episode" using the **Add Link** button.

![Shoko Server - Metadata Linking - Page - Multi-Series](/images/shoko-server/shoko-server-matadata-linking-page-multi-series.jpg)

### Multi-Entry Episodes
TMDB's [bible](https://www.themoviedb.org/bible/tv/59f743289251416e71000037#5b71c6b4c3a3684161000001) contains the unfortunate rule that anime with multiple "segments" or "stories" in a single episode must be split into separate entries.
This causes some series to have significantly inflated episode counts on TMDB (fortunately this rule doesn't seem to be strictly enforced).
Using the original [Urusei Yatsura](https://anidb.net/anime/377) as an example, note that the first 23 episodes are split into two parts each on TMDB. This requires manually adding
each part by clicking the **Add Link** button next to the AniDB episode title and then selecting the individual parts of the episode as listed on TMDB.

![Shoko Server - Metadata Linking - Page - Multi-Episode](/images/shoko-server/shoko-server-matadata-linking-page-multi-episode.jpg)

## Alternate Episode Ordering

It is quite common for anime to have multiple ways of grouping the episodes into seasons. This includes: DVD/BD
ordering, stream site listings or even manga story arcs. Using [Bleach](https://anidb.net/anime/2369) as an example you can see that [TMDB](https://www.themoviedb.org/tv/30984-bleach/seasons) doesn't split
the original run into seasons while many people may expect it to. Fortunately, TMDB's [Episode Groups](https://www.themoviedb.org/tv/30984-bleach/episode_groups) page provides several
alternate ordering options in case you would like to use one of those instead.

In order to select an alternate ordering for a series a few prerequisites must be met:
- The series must have a TMDB link
- TMDB's Episode Groups page for the series must have at least one entry
- **Download Alternate Ordering** must be enabled under Shoko's **TMDB Download Options**

:::warning Stable Users
For those still using Shoko Server v5.1.0 the UI referenced below will not be accessible. Instructions which use the API
will be provided at the end of this section instead.
:::

If a series meets the above requirements simply navigate to it and click **Edit Link** (pencil next to the TMDB link) and then
**Open Settings** (gear next to the TMDB title). From the now open **TMDB Show Settings** modal simply select the desired ordering
and click Save.

![Shoko Server - Metadata Linking - Page - Ordering](/images/shoko-server/shoko-server-matadata-linking-page-ordering.jpg)

### Stable Version Instructions

Navigate to Shoko's `/Tmdb/Show/{showID}/Ordering/SetPreferred` v3 API endpoint which is available via [/swagger/](https://docs.shokoanime.com/faq#general)
and authenticate. Using Bleach as an example once again, you would enter `30984` (Bleach's TMDB ID) into the `showID` box. Then you would set
the 16 character `AlternateOrderingID` in the request body to one of the ones available [here](https://www.themoviedb.org/tv/30984-bleach/episode_groups)
(both IDs are available from the URL on TMDB). Lastly, click **Execute** and the ordering will be applied.


```json
{
  "AlternateOrderingID": "663fb548c10d4be3e80b2f6d"
}
```

## Additional Image Support

Without TMDB links Shoko only supports a single poster per series. To enable additional posters, backdrops and logos make sure to enable them in
Shoko's [TMDB Options](/shoko-server/settings#tmdb-options). Once enabled, the default image (for each of the aforementioned types) can be managed in the **Selected Image Info**
panel of the **Images** tab on a series page. Simply select the desired image and then click the **Set As Preferred** button.

:::info Episode Thumbnails
Individual episodes will also have images attached to them when a TMDB link is present (with movie links using the backdrop as a fallback)
but they cannot be customised from the WebUI at this time.
:::

![Shoko Server - Selected Image Info - Panel](/images/shoko-server/shoko-server-selected-image-info-panel.jpg)
