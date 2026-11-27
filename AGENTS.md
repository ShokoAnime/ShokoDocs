# AGENTS.md

Guidance for AI agents writing or editing these docs.

## Example Data

Use one made-up franchise and one made-up release group throughout the docs, in text, code blocks and screenshots.
Never show real series, episode titles, file names or release groups, and never show anyone's own library.

### The Series: *Starlight Academy*

In Shoko, *Starlight Academy* is one group with four series:

| Shoko series | AniDB type | First aired | Notes |
| --- | --- | --- | --- |
| Starlight Academy | TV Series | Oct 2019 | 12 episodes, 2 specials |
| Starlight Academy (2020) | TV Series | Jan 2020 | 12 episodes, the second half of the story |
| Starlight Academy: Summer Break | OVA | Aug 2020 | 2 episodes, a side story |
| Starlight Academy: Graduation | Movie | Mar 2021 | The finale |

On TMDB, the two TV entries are one show with a single 24-episode season. The specials and the OVA are listed under
Season 0, and the finale is a separate TMDB movie.

Where a page needs more, extend the franchise rather than inventing another one:

- *Starlight Academy: Encore* and *Starlight Academy: Finale* are later series whose titles don't follow the year
  pattern (used for season merging).
- *Starlight Academy TV* and *Starlight Academy Movies* are sub-groups (used for nested groups).
- A second untitled movie in one AniDB entry is *Starlight Academy II*.

Episode titles for *Starlight Academy*, when a page or screenshot needs them:

| Episode | Title |
| --- | --- |
| 1 | The First Night Sky |
| 2 | Telescope Club Recruits |
| 3 | A Wish on a Falling Star |
| 4 | Clouds over the Observatory |

Add more to this table when you need them, so every page uses the same ones.

The reference page for the example is
[Library Structures and Seasons](docs/jellyfin/concepts/library-structures-and-seasons.md).

### The Release Group: *Student Stargazers* (`SSZ`)

- Full name **Student Stargazers**, short name or tag **SSZ**. Neither is a real AniDB group (checked against AniDB's
  group list on 2026-11-16).
- File names look like `[SSZ] Starlight Academy - 03 [1080p].mkv`, with the episode number padded to two digits.
  Specials use `S1`, `S2`, and the movie `[SSZ] Starlight Academy - Graduation [1080p].mkv`.
- Folders look like `Anime/Starlight Academy/`.

### Screenshots

Take screenshots against a test server, never a real library. When the UI needs real AniDB or TMDB data to work, keep the
data real and replace the text on the page before you capture it: file names, folder paths, series and episode titles,
and release groups, using the names above. Crop out posters and other artwork from real series, or replace them with
a plain placeholder. Hashes, sizes and dates may stay as they are.

## Guides and Web UI Pages

A how-to guide and the page describing the Web UI it uses each have their own job:

- **The guide covers the task:** what to check first, which fix to pick, short steps, how to tell it worked, and what to
  do when it didn't. Its steps name only the clicks needed and link to the Web UI page for the rest. It may reuse that
  page's screenshots at the steps where people get lost.
- **The Web UI page is the reference:** every screen, button and option, with the screenshots. It points to the guide
  for task advice instead of repeating it.

Text that must read the same on both, such as a warning agreed with AniDB, lives once, in a region of the Web UI page
(`<!-- #region name -->` … `<!-- #endregion name -->`), and the guide includes it with
`<!--@include: ../page.md#name-->`. Inside a list item, indent the region markers and the include like the item's text.
