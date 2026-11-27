---
title: Fix a Wrong Metadata Link
description: Replace a show or movie from another metadata source, such as TMDB, that was linked to the wrong series, fix its episode mapping, and keep the wrong link from coming back.
---

# Fix a Wrong Metadata Link

The auto-linker of a metadata source such as TMDB gets most series right, but now and then it links a series to the
wrong show or movie, or lines up its episodes with the wrong episodes of that source. You'll notice it as the wrong
poster, titles or descriptions, or as odd seasons in a media server. The steps are the same for every source, and this
guide uses TMDB as the example. It replaces the wrong link with the right one, checks the episode mapping, and makes
sure the auto-linker doesn't put the wrong link back.

How links work in general is explained in [Metadata Sources](/shoko-server/concepts/metadata-sources).

## Before You Start

- Know which show or movie is right. Looking it up on the source's own site helps. On
  [TMDB](https://www.themoviedb.org), the number in its address (`46195` in `/tv/46195-...`) is its TMDB ID, which you
  can search by.
- Remember that on AniDB, and so in Shoko, each season or cour is a series of its own. Several series linked to the
  same show is normal, each covering its own part of it. A link is only wrong when it points at the wrong
  show, or the episodes point at the wrong part of it.

## Find the Link

1. Open the series in the **Collection** and stay on the **Overview** tab.
2. Look at the **Metadata Sites** panel. Below the AniDB entry, each link has its own row, labelled with the source and
   the entry's ID: `TMDB (s46195)` for a show, `TMDB (m12345)` for a movie.
3. Click the label to open the entry on the source's site in a new tab, and check it's the one you expect.

If the show or movie is right and only the episodes are off, skip to
[Fix the Episode Mapping](#fix-the-episode-mapping).

## Remove the Wrong Link

Click the red cross (**Remove Link**) at the end of the wrong link's row. It's removed straight away, without asking,
together with its episode links.

Removing a link also marks the series so the auto-linker leaves it alone: from now on it won't link the series again
on its own. That's what keeps the wrong link from coming back; see
[Keep It from Coming Back](#keep-it-from-coming-back).

## Add the Right Link

1. Click **Add link** at the bottom of the **Metadata Sites** panel. The **Metadata Linking** page opens.
2. If you have more than one metadata source, pick the source from the list, such as **TMDB**.
3. In the header, such as **TMDB | Not linked**, choose **Series** for a show or **Movie** for a movie.
4. Find the entry:
   - With the search box empty, the list shows the candidates the auto-linker found for this series, with badges
     saying where each came from: **Search**, **Current link**, **Prequel link**, **AniDB resource** or
     **Cross-source link**. Candidates it would turn down are listed too, so being on the list doesn't make an entry
     right. Check it on the source's site before picking it.
   - Or type in the search box, such as **Enter Title or TMDB ID...**: a title, or the source's ID.
5. Click the title of the right result. (Clicking its ID opens it on the source's site instead.) Shoko fetches the
   entry, and it appears next to the AniDB series.

For a show, the episode mapping appears below. For a movie, see
[Link a Movie](#link-a-movie).

## Fix the Episode Mapping

For a new link, the page shows how Shoko would match the episodes. For an existing link, click the pencil
(**Edit Link**) on its row in the **Metadata Sites** panel to get to the same page.

Each row has the AniDB episode on the left, the source's episode on the right, and a badge in between saying how the two
were matched. The header counts them as **Perfect**, **Approximate**, **Fallback** and **Override**. Hover over a badge
to see what it stands for, such as **Date & Title**, **Best Guess** or **User Override**.

Go through the rows that aren't a perfect match:

- **Wrong episode:** click the source's episode and pick the right one. You can search the list by episode title or
  by season and episode number.
- **Should be linked to nothing:** pick **Do Not Link Entry** at the top of the list.
- **One AniDB episode covers two episodes of the source:** once the AniDB episode is linked, click the plus
  (**Add link**) on it to add a second episode, and the minus (**Remove link**) to take an extra one away again. See
  [Multi-Entry Episodes](/shoko-server/metadata-links#multi-entry-episodes).

Only the episodes you change are saved as set by you; the rest keep the rating Shoko gave them. Then click
**Save Links**. Shoko returns to the series, and a new link is fetched from the source along with its images.

### Link a Movie

For a movie, the page lists the AniDB episodes with a **Movie** column next to them. Click **Add Link** on the episode
the movie stands for (for an AniDB movie, usually its only episode), then **Save Links**.

### When One Series Needs Several Links

Some AniDB series need more than one entry from a source, for example one AniDB entry that TMDB splits into three
movies. Add each one with **Add link** in the **Metadata Sites** panel, as above. See
[Multi-Entry Series](/shoko-server/metadata-links#multi-entry-series).

## Refresh the Series

A new link is downloaded for you, so there's usually nothing else to do.

<!-- TODO: rewrite the TMDB-only Web UI actions in this guide once the executable actions land in the Web UI. -->

For TMDB, the Web UI also has buttons to fetch the latest later: open **Edit Series** → **Update Actions** and pick
**Update TMDB Info**, or **Update TMDB Images - Force** to download the images again.

## Keep It from Coming Back

Removing a link in the **Metadata Sites** panel is all it takes. A source's auto-linker only ever searches series that
have no link to that source, and it skips series you've removed a link from, so the wrong entry isn't linked again
when the series is refreshed, when new files are added, or when **Search for Metadata Matches** in scheduled actions
(or, for TMDB, **Search for TMDB Matches** in the **Actions** modal) runs. Links you add yourself are kept as they are.

For TMDB, the same mark also means **Auto-Search TMDB Match** (under **Edit Series** → **Update Actions**) does nothing
for this series any more, just as it does nothing for any series while **Auto Link** is off. To see what the auto-linker
would pick, use **Add link** with an empty search box instead.

:::details Letting the Auto-Linker Search This Series Again
The Web UI has no switch for this. Use the API through [Swagger](/api/use-the-api-with-swagger): send
`PUT /api/v3/Series/{seriesID}/Metadata/{source}/AutoLinking` with the body `{ "Disabled": false }`, where
`{seriesID}` is the number in the series' address in the Web UI and `{source}` is the source, such as `TMDB`. The
auto-linker then treats the series like any other: it's only searched while it has no link to that source.
:::

## Check That It Worked

- The **Metadata Sites** panel shows the right ID, for example `TMDB (s46195)`.
- Once the queue has worked through the new link, the series shows the right titles, descriptions and images. Which
  titles you see depends on [Language Options](/shoko-server/settings/collection#language-options).
- **Edit Link** shows the episodes you changed counted under **Override** in the header.

## If It Didn't Work

- **The search finds nothing:** try the original title, or search by the source's ID. Make sure **Series** or **Movie**
  is set to the right kind. Adult entries only show up with **Include Restricted in Search** on in
  [Metadata settings](/shoko-server/settings/metadata#general-options).
- **"Failed to refresh data!" when picking a result:** Shoko couldn't fetch the entry from the source. Check its
  status in [Metadata settings](/shoko-server/settings/metadata#each-source); a suspended source shows why and when it
  resumes.
- **An episode is greyed out with "Episode is linked to another show.":** that AniDB episode is linked to an
  episode of a different show, which happens with series linked to several shows. Change it through that show's
  **Edit Link**.
- **"This episode is already linked to a different movie!":** remove that movie's link from the episode first.
- **Save Links stays disabled ("No links to save!"):** nothing has changed on the page yet.
- **A media server still shows the old show:** it keeps what it read before. With Shokofin's TMDB Shows & Movies
  Structure, a series that moved to another TMDB show also moves to another Jellyfin show; see
  [Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons).

## Related

- [Metadata Links](/shoko-server/metadata-links): managing links, multi-entry cases, and exporting and importing
  links.
- [Metadata Sources](/shoko-server/concepts/metadata-sources): auto-linking and refreshes.
- [Metadata Features](/shoko-server/metadata-features): what a link gives you, including alternate orderings.
- [Metadata Settings](/shoko-server/settings/metadata#auto-linking): the auto-linker and its switches.
