---
title: Fix an Unrecognized File
description: Work out why a file is unrecognized and pick the right fix, from waiting and searching again to rehashing, AVDump, linking it by hand or ignoring it.
---

# Fix an Unrecognized File

A file shows up under **Unrecognized Files** when Shoko couldn't work out which episodes it contains. This guide helps
you pick the right fix for each file, so it ends up in its series (or out of the way, if it doesn't belong to one).
Which fix is right depends on what kind of file it is, so start by finding out why it's unrecognized:
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files) explains the reasons.

The utility's tabs and buttons are described on [Unrecognized Files](/shoko-server/unrecognized-files).

## Before You Start

- Open the utility from the top bar: **Utilities** → **Unrecognized Files**. The **Unrecognized** tab lists the files.
- Select files by clicking their rows (Shift-click selects a range). The buttons for the selected files appear in the
  bar next to the search box, or under **Options** on a narrower window.
- **AVDump** needs your AVDump key in the [AniDB settings](/shoko-server/settings/anidb#login-options). The other fixes
  need nothing extra.

## Make Sure Shoko Is Done

Before you start on the utility, let the queue drain on its own once. A file is listed as unrecognized from the moment
it's hashed until a provider has answered, so a file in the list may simply not have been looked up yet: its search
may still be waiting in the queue, or it never ran because the queue was cleared. During a big import, or while AniDB
has banned Shoko, files can wait in this list for a long time without anything being wrong.

1. Look at the **Queue Processor** panel on the dashboard. If it still has tasks queued, wait for them to finish. Don't
   click **Clear All** to hurry it along: clearing drops the waiting searches instead of pausing them.
2. If AniDB has banned Shoko, the lookups wait until the ban ends. See
   [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans).
3. If the queue was cleared while files were still waiting to be looked up, select every file on the **Unrecognized**
   tab and click **Rescan**, then wait for the queue to drain again. Otherwise the daily **Check AniDB File Updates**
   [scheduled action](/shoko-server/settings/scheduled-actions) catches up on them.
4. Click **Refresh** in the utility to update the list.

Only fix the files that are still listed once the queue has drained.

## Pick a Fix

| The file is | Fix |
| --- | --- |
| A public release from the last day or two | [Wait and search again](#wait-and-search-again) |
| One you replaced or that was still being copied when Shoko first saw it | [Rehash it](#rehash-the-file) |
| A public, unmodified release that AniDB still doesn't have | [Add it to AniDB with AVDump](#add-it-to-anidb-with-avdump) |
| Your own rip or encode, a remux, or a file with edited tracks | [Link it by hand](#link-it-by-hand) |
| An extra, menu, sample or anything else that isn't an episode on AniDB | [Ignore it](#ignore-it) |

Not sure which one it is? Search AniDB for the series and look at its files. If your file's release group and version
are listed there but Shoko still can't find it, try **Rehash** first. If that doesn't help, your copy was most likely
changed after release or is damaged, and linking it by hand is the safe choice.

## Wait and Search Again

A brand-new release is often unknown to AniDB for a little while. Shoko searches again for every unrecognized file once a
day with the **Check AniDB File Updates** [scheduled action](/shoko-server/settings/scheduled-actions), so most new
releases sort themselves out.

To search again yourself:

1. Select the files.
2. Click **Rescan**. Shoko queues a new search for each one and says *"Rescanning N files!"*.

**Rescan** always searches, even for a file the daily search has given up on after about 15 tries.

## Rehash the File

Shoko identifies a file by its hash. If the file changed after Shoko hashed it, for example because it was still being
copied or you replaced it with a fixed copy, the hash Shoko has belongs to no real release.

1. Select the files.
2. Click **Rehash**. Shoko reads each file again, calculates new hashes, and then searches for the release again.

If the file is still unrecognized afterwards, the hash was right, and the file is simply one AniDB doesn't have.

## Add It to AniDB with AVDump

<!--@include: ../unrecognized-files.md#avdump-warning-->

1. Select the files and click **AVDump Files**. Wait until every selected file has been dumped and the button reads
   **Finish AVDump**, then click it.
2. In **Add Series to AniDB**, click **Copy ED2K Hashes**, then **Next Step**.
3. Search for the series and click it, then answer the **AniDB Rules Confirmation** and click **Open AniDB Add Page**.
   AniDB's page for adding releases opens in a new tab. Paste the hashes there.
   <!--@include: ../unrecognized-files.md#anidb-fields-->
4. Back in Shoko, click **Rescan Files**.

<!--@include: ../unrecognized-files.md#avdump-processing-->

Each step of the dialog, and what the **Status** column shows while dumping, is described under
[AVDump](/shoko-server/unrecognized-files#avdump).

## Link It by Hand

For a file AniDB will never have, tell Shoko yourself which episodes it contains. The file then joins its series like
any other, but without AniDB's file details (release group, source, languages), unless you fill them in. See
[Linking a File by Hand](/shoko-server/concepts/recognized-and-unrecognized-files#linking-a-file-by-hand) for what a
manual link keeps and what it doesn't.

1. Select the files, ideally those of one series together, and click **Link With Providers** (the icon button next to
   **AVDump Files**). A page opens with a card for each file.

   ![Shoko Server - Unrecognized Files - Link With Providers](/images/shoko-server/shoko-server-unrecognized-files-link-with-providers.jpg)

2. Select the cards to link (or press **A** for **Select All**) and click **Edit Release Info**.
3. Search for the series and click it. Under **Episode**, keep **Auto-match (from filename)** to read the episode
   numbers from the file names, pick **Range Fill** to give the files one episode each in a row, or pick one episode.
   Optionally fill in the release group and the other details, then click **Save**. Nothing is linked yet.

   ![Shoko Server - Unrecognized Files - Edit Release Info](/images/shoko-server/shoko-server-unrecognized-files-edit-release-info.jpg)

4. Check that every card has its episodes. Cards Shoko couldn't auto-match still need one: select them and repeat
   step 3.
5. Click **Submit Pending**. When the button reads **Done**, click it to go back.

Shoko then fetches the series and its episodes as for any other new file. Every option of the page and of
**Edit Release Info**, a file containing several episodes, the card states and the shortcut keys are described under
[Manual Linking](/shoko-server/unrecognized-files#manual-linking).

To change a manual link later, for example to add the release group, find the file in
[File Search](/shoko-server/file-search), select it and click **Edit Link**. The same page opens with the file's
current release filled in.

### Undo a Manual Link

On the **Manually Linked** tab, pick the series, select the episodes and click **Unlink**. The files go back to the
**Unrecognized** tab. What unlinking does to your AniDB MyList, and how to check whether AniDB has added a manually
linked file since, is under [Manually Linked](/shoko-server/unrecognized-files#manually-linked).

## Ignore It

Disc extras, menus, samples and other files that aren't an episode on AniDB will never be identified. Ignoring them
stops Shoko from searching for them and takes them out of the list.

1. Select the files.
2. Click **Ignore**. There's no confirmation. Shoko says *"N files ignored!"*.

To undo it, open the **Ignored** tab, select the files and click **Restore**. They return to the **Unrecognized** tab.

## Check That It Worked

- The file is gone from the **Unrecognized** tab after you click **Refresh**.
- A linked or identified file shows up in its series, and on the dashboard under **Recently Imported** once Shoko has
  fetched the series.
- A manually linked file is listed on the **Manually Linked** tab; an ignored one on the **Ignored** tab.
- [File Search](/shoko-server/file-search) finds the file and shows the episodes it's linked to.

## If It Didn't Work

- **The file is still unrecognized after a rescan:** AniDB doesn't have that exact file. Wait a day or two if it's a
  new release, otherwise link it by hand.
- **Rescan says *"Release auto-matching is currently disabled."*:** no provider is enabled under
  **Auto-Linking Release Providers**. Enable one under [Hashing & Release](/shoko-server/settings/hashing-and-release#release-provider-options).
- **The file stays in the Unrecognized list although it's already matched, and it isn't in any series:** it's
  recognized, but waiting for its series, usually because the episode is newer than Shoko's copy of the anime. See
  [Recognized but Not in a Series Yet](/shoko-server/concepts/recognized-and-unrecognized-files#recognized-but-not-in-a-series-yet)
  for how it sorts itself out and how to hurry it along.
- **Thousands of files are unrecognized after a first import:** the queue is most likely still working through them.
  See [Import a Large Collection](/shoko-server/how-to/import-a-large-collection).

## Related

- [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files): why files end up here, and
  what each fix changes.
- [Unrecognized Files](/shoko-server/unrecognized-files): the utility, tab by tab.
- [Hashing & Release Settings](/shoko-server/settings/hashing-and-release): which providers identify your files.
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders): scanning, and how files
  reach Shoko.
- [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans): why AniDB lookups sometimes wait.
