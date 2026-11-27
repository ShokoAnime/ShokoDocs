---
title: Unrecognized Files
description: The Unrecognized Files utility in Shoko's Web UI, tab by tab, with Link With Providers for linking files by hand, AVDump and ignoring files.
---

# Unrecognized Files

The Unrecognized Files utility lists the files Shoko couldn't identify: files that none of your release providers
recognized, so they aren't part of any series yet. It's where you search for them again, link them to episodes by hand,
add them to AniDB with AVDump, or ignore them. Open it from the top bar with **Utilities** → **Unrecognized Files**.

Why a file ends up here, and what each fix changes, is explained in
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files). To decide which fix a
file needs, follow [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file).

:::tip Check the Queue First
A file is listed here from the moment it's hashed until a release provider has answered, and files that are identified
but whose series Shoko doesn't have yet are listed too. Let the queue finish before you act on the list; see
[Make Sure Shoko Is Done](/shoko-server/how-to/fix-an-unrecognized-file#make-sure-shoko-is-done).
:::

The utility has three tabs: **Unrecognized**, **Manually Linked** and **Ignored**.

## Unrecognized

![Shoko Server - Unrecognized Files - Unrecognized Tab](/images/shoko-server/shoko-server-unrecognized-files-unrecognized-tab.jpg)

The **Unrecognized** tab lists the files with their **Managed Folder**, **Filename**, **CRC32**, **Size** and
**Created** date, and a **Status** icon that shows where each file is with AVDump. Use the search box to narrow the
list, and click rows to select files (Shift-click selects a range).

**Refresh** reloads the list. Once you've selected files, these buttons join it in the bar next to the search box
(under **Options** on a narrower window):

| Button | What it does |
| --- | --- |
| **Rescan** | Asks the release providers about the files again, right away. |
| **Rehash** | Reads the files again, calculates new hashes, and then asks the release providers again. |
| **Rename** | Opens the files in the **Relocate Files** utility. See [File Rename](/shoko-server/file-rename). |
| **Ignore** | Marks the files as ignored. See [Ignored Files](#ignored-files). |
| **Delete** | Deletes the files from disk, after a **Delete Confirmation**. |
| **Cancel Selection** | Clears the selection. |

Two more buttons appear at the end of the bar: **Link With Providers** (the icon button with sparkles) for
[Manual Linking](#manual-linking), and **AVDump Files** for [AVDump](#avdump).

### Manual Linking

Manual linking tells Shoko yourself which episodes a file contains. When to use it is covered in
[Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file#link-it-by-hand), and what a manual link keeps
in [Linking a File by Hand](/shoko-server/concepts/recognized-and-unrecognized-files#linking-a-file-by-hand). This
section describes the page.

Select the files and click **Link With Providers**. You can also open the page for a single file from the dashboard's
**Unrecognized Files** panel, and for any file, linked or not, with **Edit Link** in
[File Search](/shoko-server/file-search).

#### The Link With Providers Page

![Shoko Server - Unrecognized Files - Link With Providers](/images/shoko-server/shoko-server-unrecognized-files-link-with-providers.jpg)

The page has a card for each file, sorted by path. A card shows its state, the provider that filled it in (with
**(Edited by User)** once you've changed it), the file's release details, and the episodes it's linked to, or **Not Yet
Linked**. The count at the top shows how many files there are, how many are selected, and how many of the ready ones
are submitted.

| State | Meaning |
| --- | --- |
| **Searching for a match...** | Release providers are being asked about the file. |
| **Retrieving existing release info...** | The file already has a release, which is being loaded so you can change it. |
| **Waiting for user action** | Nothing has been filled in yet. |
| **Ready for submission** | The card has episodes and can be saved. |
| **Submitting match...** | The card is being saved. |
| **Completed** | The card is saved. |

If you've enabled **Manual Linking Release Providers** under
[Hashing & Release](/shoko-server/settings/hashing-and-release#release-provider-options), Shoko asks them about every
unrecognized file as soon as the page opens. A card they identified is ready to submit.

Click a card to select it, or Shift-click to select a range. The bar above the cards works on the selected cards, and
each button shows its shortcut key:

| Button | Key | What it does |
| --- | --- | --- |
| **Search for Release Info** | S | Opens **Auto Search for Release Info**, where you tick the providers to ask, drag them into order and click **Search**. |
| **Edit Release Info** | E | Opens [Edit Release Info](#edit-release-info) for the selected cards. |
| **Select All** / **Unselect All** | A | Selects or clears every card. |
| **Remove Selected** | D | Takes the cards off the page without saving them. |
| **Submit Selected** | Q | Saves the selected cards that are ready. Shown once a selected card is ready. |

**Submit Pending** (Enter) saves every card that's ready, and turns into **Done** once all of them are saved; click it
to go back. **Cancel** (Esc) goes back, asking first (**Abort linking**) if there are ready cards you haven't
submitted. While cards are still searching or saving, **Cancel** stops waiting for them instead.

Nothing is linked until you submit. Once a card is saved, the file is linked and Shoko fetches the series and episodes
as for any other new file. To remove a manual link again, see [Manually Linked](#manually-linked).

#### Edit Release Info

![Shoko Server - Unrecognized Files - Edit Release Info](/images/shoko-server/shoko-server-unrecognized-files-edit-release-info.jpg)

**Edit Release Info** sets the release for every selected card at once. The header shows how many files you're
editing; the info button next to the count lists them.

- **Series**: search by name or AniDB ID, and click the series. Shoko suggests a name read from the file names. The
  pencil next to the chosen series lets you pick another. If the selected cards are already linked to different series,
  it says **Multiple series selected**, and you can't choose episodes until you pick one series for all of them.
- **Episode**: what the selected files are linked to.
  - **Auto-match (from filename)**, the default, reads each file's episode number from its name. If it can't for some
    files, Shoko says *"Failed to auto-match an episode for N files"*, and those cards keep what they had.
  - **Range Fill** gives the files one episode each, in the order the cards are listed. Pick **Range Fill (not set)**
    (or press R), set the **Type** (Episode, Special, Other, Credits or Trailer) and the **Range Starting Number** in
    **Range Fill Options**, and click **Fill**. The option then names the start, for example **Range Fill (from 1)**,
    and the pencil next to it changes it. If the series runs out of episodes, Shoko says *"Only X of Y files could be
    range-filled"*.
  - An episode from the list links every selected file to that episode. For a file that contains several episodes,
    pick the first one and add each further episode with the plus button (**Add episode**); the minus button
    (**Remove episode**) takes one away again.
  - **Force Refresh**, the button next to **Episode**, fetches the series from AniDB again when an episode you need is
    missing from the list.
- **Release Group**: type to search the release groups Shoko knows, or pick **Create "…"** to use a name of your own.
- **Source**, **Version**, **Chaptered**, **Creditless**, **Uncensored** and **Comment**: what you know about the
  release.

The **Save** button appears once a series is chosen, and works once you've changed something. It applies your changes
to the cards on the page; fields you left alone keep each card's own values. You still submit the cards afterwards.

:::tip
Shoko only shows a series' type and episode count in the search results once it has that series' data. It's normal for
them to be missing when you link to a series you don't have yet; Shoko fetches the series from AniDB when you pick it.
:::

### AVDump

AVDump sends a file's hashes and media information to AniDB so you can add the file there. Once AniDB has it, Shoko
recognizes the file like any other release.

<!-- #region avdump-warning -->
:::danger Do Not AVDump Private, Modified or Corrupted Files
When AVDumping files and adding them to AniDB you must ensure that they follow AniDB's
"[What is accepted?](https://wiki.anidb.net/Content:Files#What_is_accepted?)" guidelines. Failure to comply may result
in a permanent ban from AniDB.

---

Specifically, the files must _**NOT**_ fall under the following 3 categories:

1. **Private** / **Personal**: A file that has not been publicly released on the internet.
    - This includes reencodes of existing releases or self made rips
2. **Corrupted**: A damaged or altered file that can't be properly opened, read, or used.
    - At a minimum test files for integrity before dumping them
3. **Remuxed**: A file where the audio, video, or subtitle streams have been multiplexed or modified.
    - Files which have had the language tags changed for any tracks fall under this category

If you have unrecognized files, and are _**absolutely certain**_ that they meet AniDB's aforementioned guidelines, you
may AVDump them and add them to AniDB. Otherwise, you should
[Manually Link](/shoko-server/how-to/fix-an-unrecognized-file#link-it-by-hand) them instead.
:::
<!-- #endregion avdump-warning -->

AVDump needs your AVDump key; see the [AniDB settings](/shoko-server/settings/anidb#login-options).

1. Select the files and click **AVDump Files**. Shoko dumps the files in the background: the button reads
   **Dumping Files...** meanwhile, and the **Status** column shows a spinner for each file being dumped.

   ![Shoko Server - Unrecognized Files - AVDump Dumping](/images/shoko-server/shoko-server-unrecognized-files-avdump-dumping.jpg)

2. Once every selected file has been dumped, the button reads **Finish AVDump**. Click it to open
   **Add Series to AniDB**.
3. Step 1 lists an ED2K link for each file. Click **Copy ED2K Hashes**. If copying fails, copy them from the box
   yourself and click **Next Step**.

   ![Shoko Server - Unrecognized Files - AVDump Step 1](/images/shoko-server/shoko-server-unrecognized-files-avdump-step-1.jpg)

4. Step 2: search for the series and click it (the icon next to a result opens it on AniDB instead).

   ![Shoko Server - Unrecognized Files - AVDump Step 2](/images/shoko-server/shoko-server-unrecognized-files-avdump-step-2.jpg)

   Shoko first shows the **AniDB Rules Confirmation**: it repeats AniDB's main rule and asks you to type the word for
   what can happen to your AniDB account if you ignore the rules. **Open AniDB Add Page** works once you've answered
   and a short wait has passed. Tick **Don't show this warning again for 30 days** to skip it for a while. AniDB's page
   for adding releases then opens in a new tab. Paste the hashes there.

   ![Shoko Server - Unrecognized Files - AniDB Rules Confirmation](/images/shoko-server/shoko-server-unrecognized-files-avdump-rules.jpg)
   <!-- #region anidb-fields -->

   On AniDB, you must fill in these fields yourself, as detailed under
   [Content:Files](https://wiki.anidb.net/Content:Files#Release_information):
   [Group](https://wiki.anidb.net/Content:Files#Group) /
   [CRC/Hash Status](https://wiki.anidb.net/Content:Files#CRC/hash_status) /
   [Quality](https://wiki.anidb.net/Content:Files#Quality_for_non-subtitle_files) /
   [Source](https://wiki.anidb.net/Content:Files#Source) /
   [Release Date](https://wiki.anidb.net/Content:Files#Release_date)

   Also double-check the episode number and [Version](https://wiki.anidb.net/Content:Files#Version), as they may not
   fill in correctly from the file name. All other fields are filled in once AniDB has processed your dump, except for
   things such as hardsubbed videos or incorrectly tagged audio or subtitle tracks.
   <!-- #endregion anidb-fields -->
5. Back in Shoko, click **Rescan Files**.

<!-- #region avdump-processing -->
AniDB adds the files to its database right away, so you can rescan as soon as you've added them. Processing the dumps
takes AniDB a while longer, though, so the release Shoko gets from a rescan right away is missing what the dump adds,
such as the audio and subtitle languages. Shoko searches again for releases missing those on its own, through the daily
**Scan For Missing Release Info** action.
<!-- #endregion avdump-processing -->

### Ignored Files

Some files have no entry on AniDB at all, such as disc extras, menus, or videos from another source. Mark them as
ignored to stop Shoko from searching for them: select the files and click **Ignore**. There's no confirmation; Shoko
says *"N files ignored!"*. Ignored files move to the [Ignored](#ignored) tab, where you can restore them.

## Manually Linked

![Shoko Server - Unrecognized Files - Manually Linked](/images/shoko-server/shoko-server-unrecognized-files-manually-linked.jpg)

The **Manually Linked** tab lists the series that have manually linked files, with their **Link Count**. Click a series
to list its linked episodes on the right, with how many files each has.

- To **remove a manual link**, select episodes on the right and click **Unlink**. Shoko says *"N files unlinked!"* and
  the files go back to the **Unrecognized** tab. Unlinking also updates the generic AniDB MyList entry the link added,
  as your **Delete Action** setting says (by default it marks the file Unknown), unless another manual link still uses
  it.
- To check whether AniDB has added the files since, select episodes and click **Rescan**. If a provider identifies a
  file now, its release replaces your manual link. Otherwise your link stays.

To change a manual link instead, for example to add the release group, find the file in
[File Search](/shoko-server/file-search) and use **Edit Link**.

## Ignored

![Shoko Server - Unrecognized Files - Ignored Listing](/images/shoko-server/shoko-server-unrecognized-files-ignored-listing.jpg)

The **Ignored** tab lists all files you've marked as ignored. Shoko keeps their records, but leaves them out of
searches, scans and your collection. To restore files, select them and click **Restore**. They return to the
**Unrecognized** tab and are searched for again with the other unrecognized files.

## Related

- [Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files): why files end up here.
- [Fix an Unrecognized File](/shoko-server/how-to/fix-an-unrecognized-file): which fix to use, step by step.
- [Hashing & Release Settings](/shoko-server/settings/hashing-and-release): the release providers.
- [File Search](/shoko-server/file-search): find any file and see what it's linked to.
