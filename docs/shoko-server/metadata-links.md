---
title: Metadata Links
description: Linking your AniDB series to the series, movies and episodes of a metadata source, and moving those links between servers.
---

# Metadata Links

A metadata source adds to what Shoko knows about a series once the two are linked: extra titles and descriptions,
more artwork, and the source's own seasons and episode numbering. Most links are made for you by the source's
auto-linker, which you pick under [Metadata settings](/shoko-server/settings/metadata#auto-linking). This page covers
the ones you make, check or move yourself.

Everything here works the same for every source. The examples use TMDB because it's the source most collections have
links for.

## Managing Links

Go to a series in your collection and look for the **Edit**, **Remove** or **Add Link** buttons in the
**Metadata Sites** panel of the **Overview** tab.

![Shoko Server - Metadata Sites - Panel](/images/shoko-server/shoko-server-metadata-sites-panel.jpg)

Adding a link opens the **Metadata Linking** page for the series, where you pick the source and then a matching entry
from it.

![Shoko Server - Metadata Linking - Page - Unlinked](/images/shoko-server/shoko-server-matadata-linking-page-unlinked.jpg)

Editing or saving a link lets you manage the individual episode assignments.

![Shoko Server - Metadata Linking - Page - Linked](/images/shoko-server/shoko-server-matadata-linking-page-linked.jpg)

### Multi-Entry Series

Some AniDB series need several links to be complete, because the source splits what AniDB keeps together. Take
[Fate/Stay Night: Heaven's Feel](https://anidb.net/anime/10755): the AniDB entry covers what TMDB considers three
separate movies. Each of those has to be added and attached to its own "episode" with the **Add Link** button.

![Shoko Server - Metadata Linking - Page - Multi-Series](/images/shoko-server/shoko-server-matadata-linking-page-multi-series.jpg)

### Multi-Entry Episodes

A source can also split a single AniDB episode into several of its own. TMDB's
[bible](https://www.themoviedb.org/bible/tv/59f743289251416e71000037#5b71c6b4c3a3684161000001) has the unfortunate
rule that anime with several "segments" or "stories" in one episode must be split into separate entries, which
inflates the episode count of some series — fortunately it doesn't seem to be strictly enforced. In the original
[Urusei Yatsura](https://anidb.net/anime/377), the first 23 episodes are each split in two on TMDB. Add each part by
clicking **Add Link** next to the AniDB episode title and selecting the individual parts as the source lists them.

![Shoko Server - Metadata Linking - Page - Multi-Episode](/images/shoko-server/shoko-server-matadata-linking-page-multi-episode.jpg)

## Curated Mappings

If you're new to Shoko, or have a library with no links yet, two .csv files of AniDB → TMDB links that have been
checked by hand are available below. Import either one as described under
[Importing](#importing) instead of auto-linking the whole library.

- [Shoko: AniDB → TMDB Mappings](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed)
- [Shoko: AniDB → TMDB Mappings (Comments)](https://gist.github.com/natyusha/b46aeaf2f5f6e5a9333d6f501be6c9ee)

## Exporting and Importing Links

The links between your AniDB anime and a source's series, movies and episodes can be exported to a CSV file and
imported again. Use it to back up your links, to share them with another Shoko Server, or to import curated mappings
like the ones above.

Both buttons are in the **Cross-References** section of
[Settings → Metadata](/shoko-server/settings/metadata#cross-references), along with the source picker that decides
which source's links they act on. Links are exported and imported for one source at a time.

### Exporting

Click **Export**, choose what to include, and click **Export** in the dialog. The links are downloaded as a CSV file.

| Option | What it does |
| --- | --- |
| **Sections** | Which links to include: **Movie Links**, **Series Links** and **Episode Links**. At least one is required. |
| **Automatic Links** | **Include All**, **User Verified Only** (only links you made or confirmed yourself) or **Automatic Only**. |
| **Episode Mapping** | **Include All**, **Unmapped Only** or **Mapped Only**. Only affects series and episode links. |
| **Include Comments** | Adds human-readable comments to the file describing each link. They're ignored when importing. |
| **Filters** | Optional. Only export links matching the given **AniDB Anime ID**, **AniDB Episode ID**, or the source's own **Series ID**, **Episode ID** or **Movie ID**. Each ID only filters the sections that contain it. |

If nothing matches the options you chose, you'll see **Nothing to export** instead of a download.

### Importing

Click **Import**, then drag a CSV file into the dialog or click **Browse** to pick one. The file must use the same
format that exporting produces, and be for the source you picked.

| Option | What it does |
| --- | --- |
| **Remove Existing** | Remove existing movie and episode links for any AniDB episode in the file that aren't part of the file. On by default. |
| **Add Missing Movies** | Queue the source's movies the file links that aren't downloaded yet. On by default. |
| **Add Missing Series** | Queue the source's series the file links that aren't downloaded yet. On by default. |

Click **Import** in the dialog to start.
