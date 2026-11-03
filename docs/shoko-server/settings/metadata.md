---
title: Metadata Settings
description: "Metadata settings in the Shoko Web UI: sources and their providers, auto-linking, images, purging and cross-references."
---

# Metadata

Metadata settings choose the sources and providers Shoko gets information and images from for the series in your
collection. Everything on this page, the providers and auto-linking included, waits for **Save** at the bottom. The
exception is a provider's own settings, which have a save button of their own.

## General Options

| Option | What it does | Default |
| --- | --- | --- |
| **Purge Orphaned Metadata After (Days)** | How long an entry nothing points at is kept before Shoko removes it. One to 365 days. | 7 |
| **Purge Unlinked Metadata After (Days)** | How long a series, movie or collection with nothing linked to it is kept. Zero keeps them forever. | 14 |
| **Include Restricted in Search** | Includes restricted entries when you search a source on the [linking page](/shoko-server/metadata-links#managing-links). | Off |

## Source Defaults

These apply to every source that doesn't bring options of its own.

**Match Episodes Airing Within (Days)** is how far ahead of its air date an episode may be matched across sources,
zero to 365 days. The default is 7.

### Image Options

Each image type has a switch and, apart from studio images, a maximum. A maximum of zero means no limit, and 30 is
the highest you can set.

| Option | What it downloads | Default | Max |
| --- | --- | --- | --- |
| **Download Backdrops** | Backdrops for series and movies. | On | 10 |
| **Download Posters** | Posters for series, movies and seasons. | On | 10 |
| **Download Logos** | Logos for series and movies. | On | 10 |
| **Download Banners** | Banners for series and movies. | On | 10 |
| **Download Episode Thumbnails** | Thumbnails for episodes. | On | 1 |
| **Download Staff Images** | Images of creators and characters. | On | 10 |
| **Download Studio Images** | Images of studios. | On | — |

**Image Languages** sets which languages of images Shoko downloads, in order of preference. Images in other languages
are still known to Shoko, but aren't downloaded. Leave the list empty to download images in any language.

- **Main (x-main)** matches the original language of the series or movie.
- **No Language (none)** matches images without a language, which are usually textless artwork.
- Any other language matches images in that language.

The default order is **No Language**, **Main**, then English.

## Each Source

Below the defaults, every metadata source gets a section of its own, headed by its name and its status:

| Status | What it means |
| --- | --- |
| **Configured** | The source is ready to use. |
| **Not Configured** | Something it needs is missing, with the reason underneath. A source usually needs its provider configured first. |
| **Suspended** | The source is pausing itself — rate limited, banned, authentication failed, down for maintenance, and so on. The reason, and when it resumes, are shown underneath. |

### Providers

The **Providers** panel lists the kinds of entries the source's providers answer for, with a switch per kind:
**Series**, **Seasons**, **Episodes**, **Movies**, **Collections**, **Creators**, **Characters**, **Studios** and
**Networks**, along with any kind a plugin brings of its own. Turning a kind off is how you stop fetching it — cast
and crew are **Creators** and **Characters**, and movie collections are **Collections**.

Where several providers can answer for the same kind, they're listed in order and can be dragged to reorder: the
first enabled one is **Active** and answers, and the rest are on **Standby**, taking over in order when it's turned
off or removed. A suspended provider isn't skipped.

A provider's own name is shown beside the kind, with its plugin's name after it when the two differ.

### Auto-Linking

A source with a provider that can link on its own gets these, and one without them is shown none of it:

| Option | What it does |
| --- | --- |
| **Auto-Linker** | Which provider does the linking, or **None** to link only by hand. |
| **Auto Link** | Link series automatically as they're imported. |
| **Auto Link Restricted** | Do the same for restricted series. |

While it isn't mandatory, we strongly recommend picking an auto-linker and enabling **Auto Link**, so your collection
gets episode data without you linking every series by hand.

### Its Own Options

| Option | What it does |
| --- | --- |
| **Use Own Episode Matching Window** | Give this source its own **Match Episodes Airing Within (Days)** instead of the default. |
| **Use Own Image Options** | Give this source its own image types, maximums and languages instead of the defaults. Only shown for a source whose providers serve images. |

Unticking either sends the source back to the defaults above.

### Provider Settings

A provider that has settings of its own shows them inside its source's section. They belong to the plugin rather than
to Shoko, so they're saved with their own button and not by the page's **Save**. A provider's API key, where it takes
one, lives here.

## Cross-References

Back up or restore the links between your AniDB anime and the series, movies and episodes of a source, or share them
with another Shoko Server. Pick the source, then use **Export** or **Import**. See
[Exporting and Importing Links](/shoko-server/metadata-links#exporting-and-importing-links).
