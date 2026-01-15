---
title: Unrecognized Files
description: Information on how to utilize the Unrecognized Files Utility in Shoko's Web UI via manual linking, AVDump or ignoring.
---

# Unrecognized Files

The Unrecognized utility is designed to help you manage files that Shoko was unable to automatically process. When
Shoko is unable to match a file's hash against AniDB's database, the file is marked as unrecognized and will appear in
this section. This is the starting point for handling unrecognized files.

## Unrecognized

![Shoko Server - Unrecognized Files - Unrecognized Section](/images/shoko-server/shoko-server-unrecognized-files-unrecognized.jpg)

You have multiple options for handling unrecognized files. They will allow Shoko to recognize, process, and add them to
your collection. This is done by performing one of the following tasks: manually linking the files, dumping the files
via AVDump, or marking the files as ignored.

### Manual Linking

![Shoko Server - Unrecognized Files - Manual Link](/images/shoko-server/shoko-server-unrecognized-files-manual-link-01.jpg)

There are many instances where you will not be able to dump files to AniDB due to them
[not being eligible](https://wiki.anidb.net/Content:Files#What_is_accepted?). In these cases, you can create **Manual
Links** for each file by linking them to their respective episodes. Manual links function exactly like their
automatically generated counterparts and will retrieve the same metadata from AniDB (and TMDB if it is enabled) for the
linked episode and the series it belongs to.

After selecting the files you'd like to manually link (which are part of the same series), click on the **Manual link**
button to access the series and file/episode linking panel. This panel (which is shown in the above screenshot) will
attempt to populate the series list with shows based on the filenames in the **Selected Files** column. However, if the
series you're trying to link is not listed, you can use the search box to type in the series name or AniDB ID.

:::tip
Shoko will only display the type and number of episodes if it already possesses the series data. It's entirely normal
for this information to be missing during the linking process.
:::

Once a series is selected, Shoko will attempt to automatically match the file with its respective episode. While it
will inform you of its successes or failures, we _**highly recommend**_ always double-checking the matched episodes. For
cases where you have _**one file for multiple episodes**_: select the file and then click the **Duplicate Entry**
button, this will create a linked virtual file. Then you can select the additional episode, repeating this process as necessary.

Once you're finished, click the **Save** button to prompt Shoko to start processing the relevant tasks it would have
executed if the file had been automatically linked.

### AVDump

![Shoko Server - Unrecognized Files - AvDump](/images/shoko-server/shoko-server-unrecognized-files-avdump.jpg)

:::danger Do Not AVDump Private, Modified or Corrupted Files
When AVDumping files and adding them to AniDB you must ensure that they follow AniDB's
"[What is accepted?](https://wiki.anidb.net/Content:Files#What_is_accepted?)" guidelines. Failure to comply may result
in a permanent Ban from AniDB.

Specifically, the files must _**NOT**_ fall under the following 3 categories:

1. **Private** / **Personal**: A file that has not been publicly released on the internet.
    - This includes reencodes of existing releases or self made rips
2. **Corrupted**: A damaged or altered file that can't be properly opened, read, or used.
    - At a minimum test files for integrity before dumping them
3. **Remuxed**: A file where the audio, video, or subtitle streams have been multiplexed or modifed.
    - Files which have had the language tags changed for any tracks fall under this category

If you have unrecognized files, and are _**absolutely certain**_ that they meet AniDB's aforementioned guidelines, you
may AVDump them and add them to AniDB. Otherwise, you should
[Manually Link](/shoko-server/unrecognized-files#manual-linking) them instead.

---

Once the unrecognized files have been determined to be acceptable, the recommended way to handle them is to dump them to
AniDB using **AVDump** (which is included as part Shoko's installation process). We'll assume you've already configured
your AVDump key, if not, refer to the [AniDB](/shoko-server/settings/#anidb) section on the **Settings** page.

After selecting your files, clicking **AVDump Files** will guide you through the process, providing instructions for
each step. For files that have not been dumped (indicated by the file icon), Shoko will start dumping them in the
background as you follow the prompts in the modal.

Undumped files will always take priority when selected alongside dumped files. You won't be able to click
the **Rescan Button** until all files have been dumped. If you don't want to wait, clicking outside the modal
will close it and continue the dump process. You can then come back later, select the files, and click the
**Finish AVDump** button to resume.

---

Note that you must manually fill out the following fields on AniDB itself as detailed under
[Content:Files](https://wiki.anidb.net/Content:Files#Release_information):

[Group](https://wiki.anidb.net/Content:Files#Group) /
[CRC/Hash Status](https://wiki.anidb.net/Content:Files#CRC/hash_status) /
[Quality](https://wiki.anidb.net/Content:Files#Quality_for_non-subtitle_files) /
[Source](https://wiki.anidb.net/Content:Files#Source) /
[Release Date](https://wiki.anidb.net/Content:Files#Release_date)

The Episode Number and [Version](https://wiki.anidb.net/Content:Files#Version) also need to be double checked for accuracy, as they may fail to autofill (depending on the filename).

All other fields will be automatically populated once your AVDump clears the queue. Exceptions exist for things
such as hardsubbed videos or incorrectly tagged audio/subtitle tracks.
:::

### Ignored Files

![Shoko Server - Unrecognized Files - Ignored](/images/shoko-server/shoko-server-unrecognized-files-ignored.jpg)

At times, Shoko may try to import files that, for various reasons, lack a corresponding entry on AniDB. This might
include items like DVD/BD special features or related videos from a different source. As Shoko relies on AniDB for
matching, these files must be marked as ignored, indicating to Shoko not to attempt automatic matching for them in
future import runs.

After selecting the files you wish to mark as ignored, click the **Ignore** button on the utility navbar. There
won't be a confirmation message, as Shoko will internally mark the files as ignored. If you've made a mistake,
you can restore them, as explained in the Ignored section below.

To mark selected files as ignored, simply click the **Ignore** button. This process does not provide a confirmation
prompt. However, if you've made a mistake, you can restore them, as explained in the Ignored section below.

## Manually Linked

The Manually Linked tab provides a list of all files, grouped by series that have been manually linked. If you need to
remove a manual link this can done by selecting a series in the left pane, then selecting an episode in the right pane
and clicking the **Unlink** button.

## Ignored

![Shoko Server - Unrecognized Files - Ignored Listing](/images/shoko-server/shoko-server-unrecognized-files-ignored-listing.jpg)

The Ignored tab lists all files you've marked as ignored. Shoko acknowledges their existence but treats them as if
they are not in your collection. To restore a file, select it and click the **Restore** button in the utility navbar.
Restored files will reappear in Shoko's list of unrecognized files and will be processed according to your settings.
