---
title: Metadata Sources
description: Why AniDB is the base of every series, how TMDB and other sources add to it through links, and when links are made and refreshed.
---

# Metadata Sources

AniDB is the base of everything in Shoko. Every series is an AniDB anime and every episode an AniDB episode (see
[Groups & Series](/shoko-server/concepts/groups-and-series)), so AniDB decides what exists in your collection.

Other **metadata sources** add to that base. A source never creates series or episodes of its own: it adds titles,
descriptions, artwork and its own way of numbering things to the AniDB entries it's **linked** to. Without a link, a
source knows nothing about your series.

## The Sources

- **AniDB** is built in and always there. Its information comes in when a file is recognized, and with it the series.
- **TMDB** comes as a plugin bundled with Shoko Server, so it's available out of the box.
- **More sources** come from plugins, such as the AniList plugin. You install them under
  [Plugin Management](/shoko-server/settings/plugin-management).

Every source works the same way in Shoko: the same kind of links, the same linking page and the same settings. The
examples on this page use TMDB, since it's the source most collections are linked to.

## Links

A link ties an AniDB entry to an entry of a source. There are three kinds:

| Link | Ties together | Example |
| --- | --- | --- |
| Series | an AniDB anime and a show of the source | a TV anime and its TMDB show |
| Movie | an AniDB episode and a movie of the source | the one episode of an AniDB movie and the TMDB movie |
| Episode | an AniDB episode and an episode of the source | episode 3 on AniDB and S01E03 on TMDB |

The two sides don't have to match one for one. Since AniDB gives every season and cour an entry of its own, several
AniDB anime are often linked to the same TMDB show, each to its own part of it. The reverse happens too: one AniDB
entry may need several TMDB movies, or one AniDB episode several TMDB episodes. See
[Multi-Entry Series](/shoko-server/metadata-links#multi-entry-series).

When a series is linked to a show, Shoko also lines up the anime's episodes with the show's, comparing air dates,
titles and episode numbers. Each episode link gets a match rating that says how sure the match is, from a perfect
date and title match down to a best guess, and links you set yourself are marked as set by you.

## What a Link Gives You

Once a series is linked, Shoko downloads the linked entry and its episodes from the source and uses them alongside
AniDB:

- **Titles and descriptions** in more languages. Which language you see is decided by the lists under
  [Language Options](/shoko-server/settings/collection#language-options), the same way for every source. By default
  TMDB keeps its English and original titles, its English descriptions, and the titles and descriptions in the
  languages listed there; its provider settings can have it keep every language. Choosing a name by hand is still
  possible, under **Edit Series** → **Name**.
- **Artwork:** more posters, backdrops and logos, and episode thumbnails. Without a link, a series only has its AniDB
  poster.
- **Cast, crew and studios** from the source, where its providers supply them.
- **The source's seasons and alternate orderings**, which media server plugins can use to build shows the way the
  source does.

What each of these looks like in the Web UI, and how media servers use them, is on
[Metadata Features](/shoko-server/metadata-features). Which kinds of information a source fetches at all, and which
images, is set in [Metadata settings](/shoko-server/settings/metadata#each-source).

## Auto-Linking

You can link every series by hand, but you don't have to. Each source can have an **Auto-Linker**, set in
[Settings → Metadata](/shoko-server/settings/metadata#auto-linking) together with **Auto Link** and
**Auto Link Restricted**. For TMDB, Shoko sets this up for you: the TMDB plugin is picked as the auto-linker and
**Auto Link** is on. With **Auto Link** on, Shoko searches the source for every series that isn't linked to it yet:

- when a new series is added,
- whenever its AniDB information is refreshed, or a new file is linked to it,
- and for the whole collection when you run **Search for TMDB Matches** in the **Actions** modal, or
  **Search for Metadata Matches** from [Scheduled Actions](/shoko-server/settings/scheduled-actions).

The auto-linker scores what it finds. For TMDB that means comparing titles, air dates and episode counts, along with
hints such as a TMDB entry listed on the anime's AniDB page or the link of its prequel. It links the best candidates
and turns the rest down, for example when the titles or dates don't match, the episode count is too far off, or
another anime already has it. The linking page lists the candidates before you type a search, each marked with where
it came from, but the ones it would turn down are listed too, unmarked (see
[Fix a Wrong Metadata Link](/shoko-server/how-to/fix-a-wrong-metadata-link)).

### Your Own Links Are Kept

Automatic searching only looks at series that have no link to the source yet, so a link that's already there, made
by you or by the auto-linker, is never replaced by it. Removing a link also marks the series so the auto-linker
leaves it alone: it won't be linked automatically again, however often it's searched. Linking it yourself still
works.

One maintenance action does remove automatic links: **Re-judge Dated Metadata Links** checks the automatic series and
movie links that rest on air dates against the current matching rules, removes the ones that no longer pass, and
searches those series again. Links matched by their title, and links you made or verified, are left alone. It only
runs when you start it, or set triggers for it.

## Refreshes

What Shoko downloaded for a linked entry is refreshed from the source:

- whenever the anime's AniDB information is refreshed, which includes when a new file is linked to it, and every day
  for anime with an episode airing soon (**Refresh Anime Airing Soon**),
- when you pick **Update TMDB Info** under **Edit Series** → **Update Actions**,
- for the whole collection when you run **Refresh All Linked Metadata** from
  [Scheduled Actions](/shoko-server/settings/scheduled-actions), where you can also give it triggers of its own.

An entry refreshed within the last hour is skipped. A refresh keeps the episode links that are already there and only
fills in the gaps, so episode mappings you fixed by hand survive it.

Entries nothing links to any more, for example after you removed a wrong link, are kept for a while and then removed
on their own, after **Purge Unlinked Metadata After (Days)** in
[Metadata settings](/shoko-server/settings/metadata#general-options).

## What This Means for You

- Missing TMDB information on a series usually means it isn't linked. The **Missing TMDB Links** count on the
  dashboard shows how many series still have no TMDB link, leaving out music videos, anime of type Other or Unknown,
  and the series marked to be left alone.
- Before your first big import, check that TMDB has an **Auto-Linker** and **Auto Link** is on, so links are made as
  series come in.
- A wrong automatic link is fixed by removing it and linking the right entry yourself, and it stays fixed. See
  [Fix a Wrong Metadata Link](/shoko-server/how-to/fix-a-wrong-metadata-link).
- Media server plugins can rely on your links, for example Shokofin's TMDB Shows & Movies Structure, which needs every
  series and episode linked correctly. See
  [Using Metadata Links in Media Servers](/shoko-server/metadata-features#using-metadata-links-in-media-servers).

## Related

- [Metadata Links](/shoko-server/metadata-links): managing links by hand, and exporting and importing them.
- [Metadata Features](/shoko-server/metadata-features): alternate orderings, extra images and media servers.
- [Metadata Settings](/shoko-server/settings/metadata): sources, providers, auto-linking and image options.
- [Collection Settings](/shoko-server/settings/collection): title and description languages.
- [Groups & Series](/shoko-server/concepts/groups-and-series)
