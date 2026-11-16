---
title: Recognized & Unrecognized Files
description: How Shoko identifies a file through its release providers, why a file ends up unrecognized, how Shoko tries again, and what manual links, ignored files and AVDump change.
---

# Recognized & Unrecognized Files

Once Shoko has hashed a new file, it asks its **release providers** one question: *what is this file?* The answer, a
**release**, says which episodes the file contains and, where the provider knows, who released it and how (group,
source, version, languages). A file Shoko has an answer for is **recognized**. A file it has no answer for yet is
**unrecognized**: Shoko keeps it, but it isn't part of any series.

A file is recognized when it's linked to an AniDB episode or has a release from any provider, your own manual link
included. Recognized files go on to fetch their series and metadata; see
[How Files Are Imported](/shoko-server/concepts/how-files-are-imported). Unrecognized files wait in the
[Unrecognized Files](/shoko-server/unrecognized-files) utility, under **Utilities** → **Unrecognized Files**, until they
are identified, linked by hand or ignored.

## Release Providers

A release provider is something that can identify a file. Shoko Server comes with the **AniDB** provider, turned on.
Plugins can add more: the **Offline Importer** plugin, which also comes with Shoko Server, identifies files from their
names, but it's off until you enable it. Until you give it auto-match rules in its configuration, it only answers when
you link files by hand, and Shoko's own searches pass it by.

The **AniDB** provider looks the file's hash and size up in AniDB's database of files. That makes it very accurate, and
it's also its limit: it only knows files that someone has already added to AniDB.

You choose and order the providers on the [Hashing & Release](/shoko-server/settings/hashing-and-release#release-provider-options)
settings tab, in two lists:

- **Auto-Linking Release Providers** identify new files on their own. Shoko asks the enabled ones in order, from the
  top. The first one that has an answer wins, and the ones below it aren't asked. A provider placed above AniDB that
  doesn't have to keep to AniDB's request limit can make a big import a lot faster, since AniDB is then only asked
  about the files it doesn't know.
- **Manual Linking Release Providers** are asked about each unrecognized file when you open **Link With Providers** to
  link files by hand, and are the ones ticked at first in its **Search for Release Info**.

With no auto-linking provider enabled, Shoko doesn't try to identify files on its own at all, and **Rescan** on an
unrecognized file is refused with *"Release auto-matching is currently disabled."*

## Why a File Ends Up Unrecognized

### The Provider Doesn't Know the File

This is the usual reason, and it often surprises people: the show is on AniDB, yet the file isn't recognized. AniDB
matches **files**, not titles. If nobody has added your exact file to AniDB, the hash finds nothing. That happens with:

- **Your own rips and encodes**, and any file that was never released publicly.
- **Remuxes and edited files.** Adding or removing a track, or even changing a track's language tag, gives the file a new
  hash.
- **Brand-new releases** that nobody has added to AniDB yet.
- **Damaged files**, or a file Shoko hashed while it was still being copied. The hash then belongs to no real release.
- **Files that aren't an episode on AniDB**, such as disc extras, trailers or menus.

### Shoko Hasn't Finished Yet

A file shows as unrecognized from the moment it's hashed until a provider has answered. During a big import, the AniDB
searches go through AniDB's rate limit one at a time, so thousands of them take hours, and while AniDB has banned Shoko,
they wait until the ban ends (see [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans)). Thousands of
files can sit in **Unrecognized Files** for a while without anything being wrong. Check the **Queue Processor** panel on
the dashboard before you act on them.

## How Shoko Tries Again

An unrecognized file isn't given up on right away. AniDB may add the file later, so Shoko asks again:

- **Check AniDB File Updates**, a [scheduled action](/shoko-server/settings/scheduled-actions) that runs every 24 hours
  by default, searches again for every unrecognized file that isn't ignored.
- **Rescan Folder** on a managed folder searches again for the unrecognized files in it, within the same limit, and so
  does a full scan of a drop source folder during **Run Import**.
- **Rescan** on a file in **Unrecognized Files** searches again for that file right away.

The automatic searches stop for a file after about 15 tries. **Rescan** on the file always tries again.

## Linking a File by Hand

When no provider can identify a file, you can tell Shoko yourself which episodes it contains, with **Link With Providers**
in the Unrecognized Files utility. The steps are in [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).

Whatever you save there counts as a **manual link**, even when a manual linking provider filled it in and you only
checked it, and it's listed on the utility's **Manually Linked** tab. A card that the AniDB provider filled in is still
saved with AniDB's release, so it keeps AniDB's details about the file; only the cards nobody filled in are entirely
your own release.

A manually linked file is a full member of your collection:

- It's linked to its episodes, and the series, episode metadata and images are fetched as for any other file.
- Watched state, the collection, filters and your media player plugins treat it like any other file.
- It's handed to renaming and moving on import like any other file.

What it doesn't have is what AniDB knows about its own files: release group, source, quality, languages and the like.
Fill in what you know with **Edit Release Info** while linking (**Release Group**, **Source**, **Version**,
**Chaptered**, **Creditless**, **Uncensored**, **Comment**); anything you leave out stays unknown. To add it later,
open the file with **Edit Link** in [File Search](/shoko-server/file-search). Saving there makes any file a manual link,
including one AniDB identified.

Your AniDB MyList normally holds an entry for each file. A manual link that no AniDB lookup filled in can't have one,
because AniDB doesn't know the file. With **Add Files** on (**Settings** → **AniDB** → **MyList Options**), Shoko adds a
*generic* entry for each linked episode instead: an entry for the episode, not for a specific file, which shows up as
**Generic** on AniDB. A link that the AniDB provider filled in gets a normal file entry.

**Add All Manual Links To MyList**, under **Actions** → **AniDB**, adds the generic entries for every manual link at
once. Unlinking updates the generic entry again as your **Delete Action** setting says, unless another manual link still
uses it.

A manual link also stops the automatic searches: the file is recognized now, so Shoko no longer checks whether AniDB has
added it since. To check, use **Rescan** on the **Manually Linked** tab. If a provider identifies the file now, its
release replaces your manual link. If not, your link stays.

## Ignored Files

Some files will never be identified and don't belong to an episode at all: disc extras, menus, samples. Marking them
**ignored** tells Shoko to stop trying. An ignored file:

- Disappears from **Unrecognized Files** and moves to the **Ignored** tab.
- Is skipped by scans and by the automatic searches.
- Keeps its record, so Shoko still knows the file and its hash.

**Restore** on the **Ignored** tab puts a file back among the unrecognized ones, and the next search picks it up. The
**Check for Previously Ignored Files** scheduled action, part of **Run Import**, marks as ignored any other file record
that has the same hash as an ignored one.

## AVDump

When AniDB doesn't know a file, AVDump can send AniDB the file's hashes and media information so you can add the file
there. AniDB has the file as soon as you add it, and from then on Shoko recognizes it like any other AniDB release,
with a normal MyList file entry when **Add Files** is on. AniDB processes the dump itself later, so a release Shoko
gets before then is missing what the dump adds, such as the audio and subtitle languages, until the daily
**Scan For Missing Release Info** action fetches it again. It asks AniDB again 6 hours after the first try, then after
a day, 3 days, a week and 90 days, and stops once the release is complete.

AVDump is only for files AniDB accepts: publicly released, unmodified and not damaged. Dumping your own rips, remuxes or
corrupted files breaks AniDB's rules and can get you banned. Read the warning under
[AVDump](/shoko-server/unrecognized-files#avdump) before you use it. It also needs your AVDump key in the
[AniDB settings](/shoko-server/settings/anidb#login-options).

## Recognized but Not in a Series Yet

Sometimes a file is identified, yet doesn't appear in any series: it's recognized, but waiting for its series. Its
release links it to an episode that Shoko doesn't have yet. The usual cause is that the episode is newer than Shoko's
copy of the anime: AniDB knows the file and its episode, but Shoko doesn't fetch the same anime from AniDB again within
24 hours by default (see [HTTP API](/shoko-server/understanding-anidb-bans#http-api)).

**Utilities** → **Unrecognized Files** also lists those waiting files, with nothing marking them apart; the dashboard's
**Unrecognized Files** panel leaves them out. **File Search** lists them too, with the episodes they're linked to. So a
file in the Unrecognized Files list may already be identified and only be waiting for its series.

These files sort themselves out once Shoko has the anime's new data: after those 24 hours, **Check AniDB File Updates** queues
an update of the anime they need, and so does **Download Missing Metadata for Files**, which runs at start-up.
**Update AniDB Info - Force** in the Web UI doesn't skip the wait.

<!-- TODO: once the Web UI can run executable actions, point to the "Update AniDB Info - Force" action: it skips the wait and ignores HTTP bans too (it asks for confirmation and can extend a ban), so warn about that. -->

To get the new data sooner, lower **Minimum Hours To Redownload Anime Info** in the settings file (see
[HTTP API](/shoko-server/understanding-anidb-bans#http-api)), then use **Update AniDB Info** on the series. More on
this in [How Files Are Imported](/shoko-server/concepts/how-files-are-imported).

## What This Means for You

- An unrecognized file isn't broken. Most of the time AniDB simply doesn't have that exact file yet.
- Don't fix files while the queue is still busy with them. Wait for the release searches to finish first.
- New releases often fix themselves within a day or two, once someone adds them to AniDB.
- Link by hand what AniDB will never have, ignore what isn't an episode, and AVDump only files that AniDB accepts.
- A manually linked file won't switch to AniDB's release by itself. Rescan it on the **Manually Linked** tab when you
  think AniDB has it.

## Related

- [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file): which fix to pick, step by step.
- [Unrecognized Files](/shoko-server/unrecognized-files): the utility's tabs and buttons.
- [Hashing & Release Settings](/shoko-server/settings/hashing-and-release): choosing and ordering release providers.
- [How Files Are Imported](/shoko-server/concepts/how-files-are-imported): from hashing to an episode in a series.
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders): how files reach Shoko in the
  first place.
- [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans): why AniDB lookups sometimes wait.
