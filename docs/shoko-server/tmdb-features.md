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

Either of these files can be imported using Shoko's `/Tmdb/Import` v3 API endpoint in
[/swagger/](/faq#general) (Shoko's public API) to bypass fully auto-linking an unlinked library.

- [Shoko: AniDB → TMDB Mappings](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed)
- [Shoko: AniDB → TMDB Mappings (Comments)](https://gist.github.com/natyusha/b46aeaf2f5f6e5a9333d6f501be6c9ee)

## Managing TMDB Links

To manage TMDB links simply navigate to a series in your Shoko collection then look for the **Edit**, **Remove** or **Add** Link buttons.
These buttons are located in the **Metadata Sites** panel of the **Overview** tab (shown in the image below).

![Shoko Server - Metadata Sites - Panel](/images/shoko-server/shoko-server-metadata-sites-panel.jpg)

Adding a link will take you to the **Metadata Linking** page for the series where a matching series or movie can be selected.

![Shoko Server - Metadata Linking - Page - Unlinked](/images/shoko-server/shoko-server-matadata-linking-page-unlinked.jpg)

Editing or saving a link will allow you to manage individual episode assignments.

![Shoko Server - Metadata Linking - Page - Linked](/images/shoko-server/shoko-server-matadata-linking-page-linked.jpg)

## Alternate Episode Ordering

It is quite common for anime to have multiple ways of grouping the episodes into seasons. This includes: DVD/BD
ordering, stream site listings or even manga story arcs. Using Bleach as an example you can see that [TMDB](https://www.themoviedb.org/tv/30984-bleach/seasons) doesn't split
the original run into seasons while many people may expect it to. Fortunately, TMDB's [Episode Groups](https://www.themoviedb.org/tv/30984-bleach/episode_groups) page provides several
alternate ordering options in case you would like to use one of those instead.

In order to select an alternate ordering for a series a few prerequisites must be met:
- The series must have a TMDB link
- TMDB's Episode Groups page for the series must have at least one entry
- **Download Alternate Ordering** must be enabled under Shoko's **TMDB Download Options**

If a series meets the above requirements simply navigate to it and click **Edit Link** (pencil next to the TMDB link) and then
**Open Settings** (gear next to the TMDB title). From the now open **TMDB Show Settings** modal simply select the desired ordering
and click Save.

![Shoko Server - Metadata Linking - Page - Ordering](/images/shoko-server/shoko-server-matadata-linking-page-ordering.jpg)