---
title: Titles, Descriptions & Images | Jellyfin
description: How Shokofin picks titles, original titles, descriptions, artwork and external links for your Jellyfin library.
---

# Titles, Descriptions & Images

Shokofin doesn't store any metadata of its own. Every title, description and image comes from what Shoko Server already
knows about your collection: AniDB data, TMDB data for linked series, and anything you have customized in
Shoko. The **Metadata** tab of the Shokofin settings decides which of those sources wins for each field.

This page explains what each option really picks. If you just want a working setup, jump to the [recipes](#recipes) or
follow [Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language).

:::tip Changes need a refresh
Metadata settings only apply to items when Jellyfin refreshes them. After changing anything on this page, run a library
refresh with **Replace all metadata** (and **Replace existing images** for image settings). See
[Change Impact](/jellyfin/configuring-shokofin#change-impact).
:::

## What the Library Language and Country Do

Every Jellyfin library has a **Preferred download language** and a **Country/Region** in its metadata settings. Shokofin
reads both:

- **Language** drives every option labelled *Follow metadata language in library*: title sources, description sources
  and the image language filters. When a library has no language set, images treat it as English.
- **Country/Region** only affects [content ratings](/jellyfin/concepts/tags-genres-and-content-ratings#content-ratings). When it's
  unset, the United States is assumed.

Neither setting does anything else. In particular, setting the library language to Japanese doesn't translate anything:
it only changes which of the already-downloaded titles and descriptions get picked.

## Titles

In the Shokofin settings, titles are configured under **Metadata** → **Title Settings**. There are two kinds:

- The **Main Title** is the name Jellyfin displays and sorts by.
- Up to five **Alternate/Original Title** entries. They're joined with ` | ` and stored in Jellyfin's *Original title*
  field.

Each title is built from a **Title Source** list. Tick the sources you want and order them with the arrows. Shokofin tries
them from top to bottom and uses the first one that returns a usable title.

### Title Sources

| Title Source | Series, seasons & collections | Episodes |
|---|---|---|
| **Shoko \| Let Shoko decide** | The title Shoko shows. It follows Shoko's **Settings** → **Collection** → **Language Options** → **Series Title** list, and respects a series title override set in Shoko. For a show built from a Shoko group, it's the group name (including a custom group name). | The episode title Shoko shows, following the **Episode Title** language list and any episode title override. |
| **AniDB \| Default title** | AniDB's main title, usually the romanized one (e.g. *Shingeki no Kyojin*). | AniDB's English episode title. |
| **AniDB \| Follow metadata language in library** | The *official* AniDB title in the library's language. | The AniDB episode title in the library's language. |
| **AniDB \| Use the language from the media's country of origin** | The official AniDB title in the original language, guessed from the language of AniDB's main title (a romanized Japanese title means Japanese, romanized Chinese means Chinese, and so on). | The AniDB episode title in that original language. |
| **TMDB \| Default title** | TMDB's default title for the linked show, season or movie. | TMDB's English episode title. |
| **TMDB \| Follow metadata language in library** | The TMDB title in the library's language. | The TMDB episode title in the library's language. |
| **TMDB \| Use the language from the media's country of origin** | The TMDB title in the show's original language as listed on TMDB. | The TMDB episode title in that language. |

A source can come up empty. The entry might not be linked to TMDB, or there might be no title in the requested language.
Shoko only stores TMDB titles for the languages in its **Language Options**, so a language missing there is missing in
Jellyfin too. In that case, Shokofin moves on to the next source in the list. If every source is empty, the item gets no
title from that list.

Generic placeholder titles are skipped as if they were empty, so the next source gets a chance. For episodes that means
titles like *Episode 5*, *Special 2*, *OVA* or *Part 1 of 2*. For series and seasons it means titles like *Season 2* or
*2nd Season*.

### Allow Any Title in Selected Language

AniDB marks some titles as *official* and others as synonyms or short titles. By default, the two AniDB
"language" sources only accept official titles for series, seasons and collections. Enable
**Allow Any Title in Selected Language** to fall back to any AniDB title in that language when no official one exists.
It's useful for languages where AniDB rarely has official titles. Each title list (main and each alternate) has its own
checkbox.

### Remove Duplicate Titles

When **Remove Duplicate Titles** is enabled, alternate titles that are identical to the main title, or to each other,
are dropped before they're joined into the original title. Enable it if you configure several alternate titles that
often resolve to the same text.

### Add Prefix to Episodes

**Add Prefix to Episodes** (enabled by default) puts `S1`, `S2`, … in front of the titles of specials, numbered within
their own series. For example, `S3 Picture Drama`. It makes specials easy to tell apart when they're shown within
normal seasons.

### Movie Titles

Movies from AniDB and Shoko are named `Series title: Episode title`, for example *Kizumonogatari: Tekketsu-hen*.
Shokofin adjusts that pattern in a few cases:

- If the episode title is a generic one such as *Complete Movie*, just the series title is used.
- If there's no episode title and the movie is part 2 or later, a Roman numeral is added instead, e.g. *Title II*.
- If the series title and the episode title are the same, it's only used once.
- Movies in the [TMDB Shows & Movies Structure](/jellyfin/concepts/library-structures-and-seasons#tmdb-shows-movies-structure)
  use the TMDB movie title directly.

**Always Use Episode Title for TMDB Movies** <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" />
changes this for entries whose Shoko episode is linked to a TMDB movie. The episode title is used as-is, without the
series title in front. That fits anime films that have a real name of their own on TMDB. Configure the title sources so
the episode title is the one you want; a TMDB source first is usually best.

### Per-Entity-Type Overrides <Badge type="danger" text="Advanced" />

With [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode) enabled, the **Title Settings**,
**Description Settings** and **Image Settings** sections each get a **Configure settings for** selector. It starts at
**Global Settings**, which applies to everything. Pick an entity type, tick **Enabled**, and the settings you change
now apply only to that type of item, in that library structure. When an entity type isn't enabled, it follows the
Global Settings.

| Library structure | Entity types you can override |
|---|---|
| AniDB Anime Structure | Movie / Film, Series / Show, Season, Episode |
| Shoko Group Structure | Box-Set / Collection, Movie / Film, Series / Show, Season, Episode |
| TMDB Shows & Movies Structure | Box-Set / Collection, Movie / Film, Series / Show, Season, Episode |

Typical uses:

- TMDB episode names for episodes, but AniDB romanized titles for shows.
- Textless posters for seasons, but logos in the show's language.

The structure that applies is the one the item's Shoko series actually uses, including any
[per-series structure](/jellyfin/concepts/library-structures-and-seasons#per-series-settings). Collections created from Shoko groups
always use the Shoko Group Structure's **Box-Set / Collection** override.

## Descriptions

Descriptions are configured under **Metadata** → **Description Settings**.

### Description Sources

**Description Source** works like the title source lists: the first source with a description wins.

| Description Source | What it provides |
|---|---|
| **Shoko \| Let Shoko decide** | The description Shoko shows, following Shoko's **Descriptions** language list. For a show built from a Shoko group, it's the group's description. |
| **AniDB \| Follow metadata language in library** | The AniDB description. AniDB descriptions are written in English, so this only matches libraries whose language is English. |
| **TMDB \| Follow metadata language in library** | The TMDB overview in the library's language, if Shoko has downloaded that language. |

### AniDB Description Conversion Mode

AniDB descriptions contain AniDB's own markup: links to characters and creators, spoiler blocks and source lines.
**AniDB Description Conversion Mode** decides how Shokofin cleans them up:

| Mode | What happens |
|---|---|
| **Markdown (Default)** | Links become Markdown links and spoilers are kept as a bold label with italic text. Source lines, "Summary by" lines, stray `*`/`--` lines and bold/italic markup codes are removed, and repeated empty lines collapse into one. |
| **Plain Text** | The same clean-up, but links become plain text and spoiler blocks are removed entirely. |
| **Disabled** | The description is used exactly as AniDB provides it. |

For example, this AniDB text:

```text
A young man named http://anidb.net/ch7888 [Okabe Rintarou] runs a tiny "Future Gadget Laboratory".

Source: ANN

Note: The first episode aired one hour early.
```

becomes this in Markdown mode:

```text
A young man named [Okabe Rintarou](http://anidb.net/ch7888) runs a tiny "Future Gadget Laboratory".

**Note:** The first episode aired one hour early.
```

and in Plain Text mode the name is just `Okabe Rintarou`, with no bold markers around `Note:`.

### Add Notes

AniDB often adds notes at the end of a description, such as broadcast quirks or which version a summary describes.
Shokofin always separates them from the description. With **Add Notes** enabled (the default), they're added back at
the end as **Note:**, or **Note 1:**, **Note 2:** and so on when there are several. Disable it to drop them. With
[per-entity-type overrides](#per-entity-type-overrides), you can keep notes on shows but drop them on seasons, for
example.

## Images

Images are configured under **Metadata** → **Image Settings**. Shokofin offers every image Shoko has for an item:
AniDB posters and TMDB posters, backdrops, logos and thumbnails. The settings decide which of them Jellyfin picks
automatically.

### How Automatic Selection Works

When Jellyfin looks for artwork (on a new item, or on a refresh with **Replace existing images**), it takes the first
image of each type that Shokofin offers. Shokofin orders that list like this:

1. **Language filter.** Only images whose language class is ticked in the matching list are kept:
   - **Only Allow Posters By Language** for posters.
   - **Only Allow Logos By Language** for logos.
   - **Only Allow Backdrops/Banners/Thumbnails By Language** for everything else.

   If nothing is ticked in a list, nothing is filtered for that image type.
2. **Preferred images first.** With **Respect Preferred Image in Automatic Image Search** enabled, the image marked as
   preferred in Shoko comes first. A preferred image is also kept even when the language filter would have removed it.
3. **Language order.** The remaining images follow the order of the ticked language classes.
4. **Community rating.** With **Use Community Ratings in Automatic Image Search** enabled, images with the same language
   class are ordered by their community rating (when the source site provides one), best first.

The language classes are:

| Language class | Matches images… |
|---|---|
| **No language / Text-less images** | with no language set, usually artwork without any text on it |
| **Follow metadata language in library** | in the library's language (English when the library has no language) |
| **Use the language from the media's country of origin** | in the original language of the media, e.g. Japanese |
| **English (only applies if the metadata language in the library is not English)** | in English |

By default, posters are limited to **No language / Text-less images** and preferred images are respected. Logos,
backdrops, banners and thumbnails aren't filtered.

A few extra rules keep items from ending up empty:

- If the poster filter would leave a show or season without any poster, the first available AniDB poster is used anyway.
- Episodes without a thumbnail fall back to backdrops.
- Show images also include the images of all of its seasons, which helps shows built from several Shoko series.

**Set Image Dimensions in Automatic Image Search** sends each image's width and height to Jellyfin. Only enable it if
you've set a minimum image width for the library in Jellyfin and want Jellyfin to skip smaller images.

### Setting a Preferred Image in Shoko

To pin a specific poster, backdrop or logo for a series, open Shoko's Web UI:

1. Go to **Collection** and open the series.
2. Open the **Images** tab, then **Posters**, **Backdrops** or **Logos**.
3. Select the image and click **Set As Preferred Poster** (or **Backdrop** / **Logo**).
4. In Jellyfin, refresh the series with **Replace existing images**.

### Choosing Images by Hand

Jellyfin's **Edit Images** dialog shows every image Shokofin can offer, not just the automatic pick. They aren't
filtered by language, and each shows its real language, size and rating, so you can choose a specific image manually.
Opening **Edit Images** on a *Specials* season shows the show's images.

### Where Images Are Loaded From

Shokofin serves all artwork through Jellyfin itself: clients load images from your Jellyfin server, which fetches them
from Shoko. Your Jellyfin clients never need to reach Shoko directly, and the **Public Host URL** setting has nothing
to do with images.


## Third-Party IDs and External Links

**Metadata** → **Miscellaneous Settings** controls two related things.

### Add Third Party IDs

**Add Third Party IDs** stores other sites' IDs on your items, so other Jellyfin plugins, such as trailer or intro
plugins, can use them. Shoko's own IDs are always added. Enabled by default: AniDB.

| ID | Series | Season | Episode | Movie |
|---|---|---|---|---|
| **AniDB** | anime ID | anime ID | episode ID | anime ID |
| **TMDB** | show ID | — | episode ID | movie ID |
| **TvDB** | show ID | — | episode ID | — |

### External Links <Badge type="tip" text="Next release" />

Items get links to the matching pages in Shoko, on AniDB, on TMDB and on TvDB in the external links section of the item
page. People (cast and staff) link to their AniDB creator page. Three settings tune what shows up:

- **Enabled Display Providers for Third Party Links** picks which sites get links. All four are enabled by default.
- **Add Extra Info to Link Name** (enabled by default) adds the IDs to each link's label. That helps when an item links
  to several entries on the same site.
- **Max Links Per Type to Show** caps how many links per site are shown. `0` shows all of them.

The Shoko links use your **Public Host URL** when it's set, and the Private Host URL otherwise. Set a Public Host URL if
the Private Host URL isn't reachable from the browsers you use Jellyfin in.

## Recipes

### English Titles, with the Japanese Title as the Original Title

For a library whose language is English:

1. **Main Title** → **Title Source**, in this order:
   - **TMDB | Follow metadata language in library**
   - **AniDB | Follow metadata language in library**
   - **Shoko | Let Shoko decide**
2. **Alternate/Original Title** → **Title Source**: **AniDB | Use the language from the media's country of origin**.
3. Refresh the library with **Replace all metadata**.

### Romanized Main Titles, English as the Original Title

1. **Main Title** → **Title Source**: **AniDB | Default title**.
2. **Alternate/Original Title** → **Title Source**, in this order:
   - **AniDB | Follow metadata language in library**
   - **TMDB | Follow metadata language in library**
3. Enable **Remove Duplicate Titles** so shows whose romanized title is already English don't repeat it.

### TMDB Episode Names, AniDB Show Names <Badge type="danger" text="Advanced" />

1. Enable [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode).
2. Leave **Global Settings** as it is, with an AniDB or Shoko source first.
3. Set **Configure settings for** to **Episode (AniDB Anime Structure)** and tick **Enabled**.
4. Put **TMDB | Follow metadata language in library** first in its **Title Source** list, with
   **Shoko | Let Shoko decide** as a fallback.
5. If you use the Shoko Group Structure too, repeat step 3 and 4 for **Episode (Shoko Group Structure)**.

Episodes of series that aren't linked to TMDB simply fall back to the next source.

## Related

- [Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language)
- [Tags, Genres & Content Ratings](/jellyfin/concepts/tags-genres-and-content-ratings)
- [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons)
- [Settings Reference → Metadata](/jellyfin/configuring-shokofin#metadata)
- [Metadata Links in Shoko](/shoko-server/metadata-links)
