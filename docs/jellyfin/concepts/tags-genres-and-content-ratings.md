---
title: Tags, Genres & Content Ratings | Jellyfin
description: How Shokofin turns AniDB tags, TMDB data and Shoko custom tags into Jellyfin tags, genres, content ratings, studios and production locations.
---

# Tags, Genres & Content Ratings

AniDB has one of the richest tag databases for anime: thousands of tags, arranged in a tree, many with a weight and a
spoiler flag. Jellyfin, on the other hand, has two flat lists per item, **Tags** and **Genres**. Shokofin's
**Tag & Genre Settings** decide which part of that tree ends up in each list. The same tags are also used to estimate a
content rating when TMDB doesn't provide one.

:::info Advanced settings
Everything under **Metadata** → **Tag & Genre Settings**, plus **Content Rating Sources**, **Production Location Sources**
and **Only Animation Studios**, is only visible in [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode). The
defaults work well for most people; this page explains what to change if they don't.
:::

Tags, genres and studios are set on shows, seasons and movies, not on individual episodes. After changing any of these
settings, refresh the library with **Replace all metadata**.

## How Tags Are Chosen

Tags and genres are configured separately but work the same way. For each list, Shokofin:

1. Collects every tag of the entry that sits inside one of the ticked **Tag Sources** (or **Genre Sources**).
2. Drops tags that don't pass the **Inclusion Filters**, **Minimum Weight** and **Maximum Depth**.
3. Removes anything on the **Exclude List**.

Tag names are shown in title case, e.g. `Coming Of Age`.

### Sources

Each source is a branch of the AniDB tag tree, plus a few special sources.

| Source | What it contains |
|---|---|
| **Content indicators** | Tags for sex, nudity, violence and similar content. |
| **Dynamic \| General** | The general *dynamic* tags that describe the feel of the show, such as *comedy* or *romance*. |
| **Dynamic \| Cast** | Tags about the cast. |
| **Dynamic \| Ending** | Tags about how the story ends. These are often spoilers. |
| **Elements \| General** | Story elements. The *speculative fiction* grouping is flattened, so tags like *fantasy* and *science fiction* appear directly. |
| **Elements \| Pornography & sexual abuse** | That part of the elements branch, kept separate so you can leave it out. |
| **Elements \| Tropes & motifs** | Recurring tropes and motifs. |
| **Fetishes** | Fetish tags. |
| **Origin \| Production** | Where and how it was produced, such as *Japanese production*. |
| **Origin \| Development** | Development history: *development hell*, *fan-made* and *remake*. |
| **Setting \| Place** | Where the story takes place. |
| **Setting \| Time period** | When the story takes place. |
| **Setting \| Yearly seasons** | AniDB tags for the season the story takes place in, such as *summer*. |
| **Source material** | A single generated label, see [below](#source-material). |
| **Target audience** | *Shounen*, *seinen*, *josei*, *kodomo* and so on. |
| **Technical aspects \| General** | Technical and production-related tags. |
| **Technical aspects \| Adaptions** | What else the work was adapted into. |
| **Technical aspects \| Awards** | Awards the work has won. |
| **Technical aspects \| Multi-anime projects** | Franchises and projects spanning several anime. |
| **Themes \| General** | The themes the story explores. |
| **Themes \| Death** | Themes around death. |
| **Themes \| Tales** | Tales, myths and legends the story draws on. |
| **Ungrouped** | AniDB tags that haven't been put into a category yet. |
| **Unsorted** | AniDB's backlog of tags that still need moderation. |
| **Custom user tags** | Custom tags you added to the series in Shoko, see [below](#custom-user-tags). |
| **TMDB \| Keywords** | The keywords of the linked TMDB show or movie. |
| **TMDB \| Genres** | The genres of the linked TMDB show or movie. |
| **Yearly Season \| The first yearly season for the entity** | The airing season the entry started in, such as `Spring 2012`. |
| **Yearly Season \| All yearly seasons for the entity** | Every airing season the entry aired in. Winter seasons span two years, e.g. `Winter 2011/12`. |

TMDB keywords and genres are added as they are. The inclusion filters, weight, depth and exclude list only apply to
AniDB tags and custom tags.

Pick at most one of the two **Yearly Season** options. If both are ticked, all seasons are added.

#### Source Material

**Source material** doesn't pass AniDB's source tags through. Instead, it adds exactly one readable label, one of:

- `Original Work`
- `Adapted From A Manga`, `Adapted From A Manhua`, `Adapted from a Manhwa`
- `Adapted From A Novel`
- `Adapted From A Visual Novel`, `Adapted From An Eroge`, `Adapted From A Video Game`
- `Adapted From A Live-Action Movie`, `Adapted From A Live-Action Show`, `Adapted From A Korean Drama`
- `Adapted From Western Media`
- `Radio Programme`

That makes it a good genre: every entry gets exactly one.

### Custom User Tags

Custom tags you add to a series in Shoko are available through the **Custom user tags** source. To add one, open the
series in Shoko's Web UI and use the tag icon (**Edit Tags**) to open the **Custom Tags** dialog.

- A plain tag such as `Favourites` is always added when **Custom user tags** is ticked.
- Slashes create a hierarchy, and nested tags follow the same source rules as AniDB tags. For example, `themes/cozy` is
  only added when **Themes | General** is ticked too. That lets you slot your own tags into the categories you already
  use for genres or tags.

:::warning Tags managed by Shokofin
Shokofin stores some of its own settings as custom tags on the series, in the `Shokofin/…`, `Series Type/…` and
`Target Audience/…` namespaces. They show up in Shoko's **Custom Tags** dialog, but not as tags in Jellyfin. Don't
remove them by hand; change the setting in Shokofin instead. See
[Per-series settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings).
:::

### Inclusion Filters

The **Tag Inclusion Filters** and **Genre Inclusion Filters** lists decide which kinds of tags may pass:

| Filter | Tags it allows |
|---|---|
| **Type \| Parent tags** | Tags that have more specific tags below them, e.g. *fantasy*. |
| **Type \| Child tags** | Tags with nothing below them. |
| **Type \| Abstract tags** | Grouping tags that exist only to organize the tree, e.g. *elements*. |
| **Type \| Weightless tags** | Tags without a weight. |
| **Type \| Weighted tags** | Tags that have a weight. |
| **Spoiler \| Global spoiler** | Tags that are spoilers everywhere, including tags below a spoiler tag. |
| **Spoiler \| Local spoiler** | Tags that are a spoiler for this particular entry. |

A tag must be allowed by every filter that applies to it. For example, a weighted child tag that's a local spoiler
needs **Type | Child tags**, **Type | Weighted tags** and **Spoiler | Local spoiler** all ticked.

### Minimum Weight

AniDB weighs how strongly a tag applies, shown in Shokofin as 0.5 to 3.0. **Minimum Weight for Tags** and
**Minimum Weight for Genres** drop weighted tags below the chosen value. Weightless tags aren't affected; use the
**Type | Weightless tags** filter for those.

### Maximum Depth

**Maximum Depth for Tags** and **Maximum Depth for Genres** limit how far below its source a tag may sit. `0` means no
limit.

Depth counts from the source's own starting point. With **Elements | General** as a genre source and a maximum depth of
`1`, *fantasy* (directly in the elements branch) is kept, but a more specific tag nested under *fantasy* has depth 2 and
is dropped. That keeps genres broad while tags stay detailed.

### Exclude Lists

**Exclude List for Tags** and **Exclude List for Genres** take a comma-separated list of names to leave out, regardless
of source. Matching ignores upper and lower case. Both default to `18 restricted`.

### Ignore Unverified Tags

**Ignore Unverified Tags** (enabled by default) skips user-submitted AniDB tags that AniDB's moderators haven't approved
yet.

### Defaults

| Setting | Tags | Genres |
|---|---|---|
| Sources | Everything except **Ungrouped**, **Unsorted**, both **TMDB** sources and **The first yearly season** | **Elements \| General**, **Source material**, **Target audience** |
| Inclusion filters | Everything except the two spoiler filters | Everything except the two spoiler filters |
| Minimum weight | **All Allowed** | **2.0** |
| Maximum depth | `0` (no limit) | `1` |
| Exclude list | `18 restricted` | `18 restricted` |

## Recipes

### Streaming-Service Style Genres

Short genre lists like *Action, Fantasy, Adapted From A Manga*:

1. **Genre Sources**: **Dynamic | General**, **Elements | General** and **Source material** only.
2. **Minimum Weight for Genres**: **2.0** or higher.
3. **Maximum Depth for Genres**: `1`.
4. Optionally tick **TMDB | Genres** instead of the AniDB sources, for series linked to TMDB.

### Spoiler-Free Tags

1. **Tag Sources**: untick **Dynamic | Ending**.
2. **Tag Inclusion Filters**: make sure **Spoiler | Global spoiler** and **Spoiler | Local spoiler** are unticked (the
   default).

### Your Own Collections as Tags

1. In Shoko, add custom tags like `Rewatch` or `Club Picks` to series.
2. Keep **Custom user tags** ticked in **Tag Sources**.
3. In Jellyfin, filter the library by those tags.

## Content Ratings

Jellyfin uses an item's content rating for parental controls and shows it on the item page. Shokofin sets it on shows,
seasons, episodes and movies from the sources in **Metadata** → **Miscellaneous Settings** →
**Content Rating Sources** <Badge type="danger" text="Advanced" />. They're tried in order, and the first source with a rating wins.

- **TMDB | Follow country/region set in library** uses the TMDB certification for the library's
  **Country/Region**, or for the United States when the library has none set. Shoko only stores certifications for some
  countries, so a rating for your country may not be available.
- **AniDB | Approximate content rating based on tags** estimates a US TV rating from the entry's AniDB tags.

The default order is TMDB first, then AniDB.

:::info The AniDB estimate is a US rating
The AniDB estimate is always a US TV rating (TV-Y, TV-G, TV-PG and so on), so it's only used in libraries whose
**Country/Region** is the United States or isn't set.
:::

### How the AniDB Estimate Works

The starting point is the entry's target audience tag:

| Target audience | Starting rating |
|---|---|
| *mina* | TV-G |
| *kodomo* | TV-Y |
| *shoujo*, *shounen* | TV-Y7 |
| *josei*, *seinen* | TV-14 |
| *18 restricted* | XXX |

The rating is then raised, never lowered, by these tags:

| Tag | Raised to at least |
|---|---|
| *borderline porn* (ecchi) | TV-MA |
| *Gainax bounce*, *breast fondling*, *paper clothes*, *skimpy clothing* | TV-14 |
| *sexual humour*, *very bloody wound in low-PG series* | TV-PG |
| *ecchi* or *nudity* with weight 2.0+ / 1.5+ / 1.0+ | TV-14 / TV-PG / TV-Y7 |
| *sex* (content indicator) | TV-14 |
| *violence* with weight 2.0+ / 1.0+ (not for TV-G entries) | TV-14 / TV-Y7 |
| *gore* (not for TV-G entries) | TV-Y7 |

Finally, US content indicator letters are added where they're valid for the resulting rating:

| Letter | Added for |
|---|---|
| **D** (suggestive dialogue) | *sexual humour*, or *sex* with weight 1.0 or lower |
| **S** (sexual situations) | *sex* with weight above 1.0, or *nudity* with weight 2.0+ |
| **V** (violence) | *violence* with weight 1.0+ |
| **FV** (fantasy violence) | *violence* in an entry also tagged *fantasy* |

For example, a seinen fantasy action series with suggestive jokes and strong violence might end up as `TV-14-DV`.

### Override the Rating for One Series

If the estimate is wrong for a series, add a custom tag named `Target Audience/<rating>` to it in Shoko, for example
`Target Audience/TV-14` or `Target Audience/TV-MA`. Content indicators can be added to the rating too, e.g.
`Target Audience/TV-14-V`. The tag replaces the AniDB estimate for that series. It's not shown as a tag in Jellyfin.

Step-by-step instructions are in [Ratings & Parental Controls](/jellyfin/how-to/ratings-and-parental-controls).

### Restricted Titles

Entries AniDB marks as restricted (hentai) get a custom rating of `XXX` in Jellyfin, on the show and on its episodes.
Use Jellyfin's parental controls to hide them from users.

## Studios and Production Locations

- **Studios** come from AniDB's staff list: companies credited as a studio, leaving out production committees. Enable
  **Only Animation Studios** <Badge type="danger" text="Advanced" /> to keep only the studio credited for the animation
  work. For entries shown from TMDB data, TMDB's studios are used and this setting doesn't apply.
- **Production locations** come from the first source in
  **Production Location Sources** <Badge type="danger" text="Advanced" /> that has any. **AniDB** derives countries from the *origin* tags, e.g. a
  *Japanese production* becomes Japan. **TMDB** uses TMDB's production countries. The default order is AniDB
  first, then TMDB.

## Related

- [Ratings & Parental Controls](/jellyfin/how-to/ratings-and-parental-controls)
- [Titles, Descriptions & Images](/jellyfin/concepts/titles-descriptions-and-images)
- [Settings Reference → Metadata](/jellyfin/configuring-shokofin#metadata)
- [Shoko Web UI: Collection](/shoko-server/collection)
