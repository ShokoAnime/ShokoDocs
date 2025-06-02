---
title: Unrecognized Files
description: Information on how to utilize the Unrecognized Files Utility in Shoko's Web UI via AVDump, manual linking or ignoring.
---

# Unrecognized Files

The Unrecognized utility is designed to help you manage files that Shoko was unable to automatically process. When
Shoko is unable to match a file's hash against AniDB's database, the file is marked as unrecognized and appears in
this section. This is the starting point for handling unrecognized files.

## Unrecognized

![Shoko Server - Unrecognized Files - Unrecognized Section](/images/shoko-server/shoko-server-unrecognized-files-unrecognized.jpg)

You have multiple options on how to handle the file(s) allowing Shoko to recognize, process, and add them to
your collection, if desired. This is done by preforming one of the following tasks, dumping the file(s) via
AVDump, manually linking the file(s), or marking the file(s) as ignored.

### AVDump

![Shoko Server - Unrecognized Files - AvDump](/images/shoko-server/shoko-server-unrecognized-files-avdump.jpg)

:::danger Do Not AVDump Private or Modified Files
When AVDumping files and adding them to AniDB you must ensure that they follow AniDB's
"[What is accepted?](https://wiki.anidb.net/Content:Files#What_is_accepted?)" guidelines. This generally means that the files must be
published and widely available on the internet, with no modifications made to them post download.
:::

The recommended way to handle unrecognized files is to dump them to AniDB using **AVDump** which is already
installed as part of the Shoko install process. We'll assume you've already configured your AVDump key, if not,
refer to the [AniDB](/shoko-server/settings/#anidb) section on the **Settings** page.

After selecting your files, clicking **AVDump Files** will guide you through the process, providing instructions for
each step. For files that have not been dumped, indicated by the white file icon, Shoko will start dumping them in
the background as you follow the prompts in the modal.

Undumped files will always take priority when selected alongside dumped files. You won't be able to click
the **Rescan Button** until all files have been dumped. If you don't want to wait, clicking outside the modal
will close it and continue the dump process. You can then come back later, select the files, and click the
**Finish AVDump** button to resume.

### Manual Linking

![Shoko Server - Unrecognized Files - Manual Link](/images/shoko-server/shoko-server-unrecognized-files-manual-link-01.jpg)

There are instances when you may not be able to dump files due to various reasons. In such situations, you can
create **Manual Links** for each file, linking them to their respective episodes. Manual links function exactly like
automatically generated links, as they retrieve the same information from AniDB and metadata sources for both
the linked episode and the series it belongs to.

After selecting the files you'd like to manually link, click on the blue **Manual link** button to access the series
and file/episode linking panel. Shoko will attempt to populate the series list with shows based on the filenames in
the Selected Files column. However, if the series you're trying to link is not listed, you can use the search input
to type in the series name or AniDB ID.

:::tip
Shoko will only display the type and number of episodes if it already possesses the series data. It's entirely normal
for this information to be missing during the process.
:::

Once a series is selected, Shoko will attempt to automatically match the file with its respective episode.
While it will inform you of its successes or failures, we **highly recommend** always double-checking the matched
episodes. In cases where you have **one file for multiple episodes**, select the file and then click the **Duplicate
Entry** button to create a linked virtual file and then select the additional episode, repeating this process as
necessary.

Once you're finished, click the blue **Save** button to prompt Shoko to start processing the relevant tasks it would
have executed if the file had been automatically linked.

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

The Manually Linked tab provides a list of all files, grouped by series that have been manually linked.

## Ignored

![Shoko Server - Unrecognized Files - Ignored Listing](/images/shoko-server/shoko-server-unrecognized-files-ignored-listing.jpg)

The Ignored tab lists all files you've marked as ignored. Shoko acknowledges their existence but treats them as if
they are not in your collection. To restore a file, select it and click the **Restore** button in the utility navbar.
Restored files will reappear in Shoko's list of unrecognized files and will be processed according to your settings.
