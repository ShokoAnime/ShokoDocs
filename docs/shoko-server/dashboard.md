---
title: Dashboard
description: An overview of the Dashboard in Shoko's Web UI.
---

<script setup>
const displayOptionsColumns = [
    { name: 'Name', header: 'Name', width: '23%' },
    { name: 'Description', header: 'Description' }
];

const displayOptionsData = [
    {
      Name: 'Combine Continue Watching & Next Up',
      Description: 'As the name suggests, enabling this setting will combine these two sections. Leaving a modified Continue Watching widget that display both sets of information.'
    },
    {
      Name: 'Hide R18 Content',
      Description: 'Checked by default, when unchecked, series with the R18 tag will show in every widget where applicable.'
    },
    {
      Name: 'Shoko News Posts',
      Description: 'Allows you to define how many news posts from the Shoko site to show, feel free to set it to 100.'
    },
    {
      Name: 'Recently Imported Episodes',
      Description: 'This setting lets you define how many episodes are displayed in the Recently Imported widget. There is a maximum limit of 100 episodes, and if you set it to anything higher, it will default to 100.'
    },
    {
      Name: 'Recently Imported Series',
      Description: 'This setting lets you define how many series are displayed in the Recently Imported widget. There is a maximum limit of 100 episodes, and if you set it to anything higher, it will default to 100.'
    }
];
</script>

# Dashboard

The Web UI Dashboard is designed to give you a general overview of your collection, featuring multiple widgets that
offer a quick glance at various aspects, including import status, current watch status, upcoming episodes, and more.

## Display Settings

![Shoko Server - Dashboard - Display Settings](/images/shoko-server/shoko-server-dashboard-display.jpg)

Display Settings allow you to change what widgets are on your dashboard, certain widget properties and even the
layout of the dashboard itself.

To modify the dashboard layout, click the blue **Enable Edit Mode** button. In this mode, you can freely move and
resize the widgets by selecting the arrow in the bottom-right corner. Most widgets can be any size you'd like,
so feel free to get creative. Once done, click the **Save** button to apply your new dashboard layout, or the
**Cancel** button if you've changed your mind. If you feel like you've made a mistake and no longer like your new
layout or want the original layout back, click the **Default** button in the floating edit panel.

The first section **Available Widgets** lists every widget available and a corresponding indicator to either show or
hide it. Making changes here can create unique gaps in your dashboard layout so make sure to edit it after to resolve
any issues.

The second section **Display Options** has various widget-related settings which are outlined below.

<EasyTable :columns="displayOptionsColumns" :data="displayOptionsData" />

## Queue Processor

![Shoko Server - Dashboard - Queue Processor](/images/shoko-server/shoko-server-dashboard-queue.jpg)

The Queue Processor panel shows Shoko's queue: the background tasks it's running and the ones waiting their turn. The
title shows how many workers are busy out of how many can run at once, and how many tasks are in the queue, with
**Paused** added while the queue is paused. Running tasks are listed first, with the time they started, then the
waiting ones, each with details such as the file or the provider it's for. **Pause All** (or **Resume All**) and
**Clear All** in the panel header pause, resume or empty the queue.

Tasks often wait even when workers are free: AniDB bans and rate limits, a lost internet connection, a suspended
metadata source and per-type limits all hold work back. See [The Queue](/shoko-server/concepts/the-queue) for why,
and for what pausing and clearing do.

## Unrecognized Files

![Shoko Server - Dashboard - Unrecognized Files](/images/shoko-server/shoko-server-dashboard-unrecognized.jpg)

Unrecognized files are files Shoko has hashed but none of its release providers could identify, including files whose
lookup is still waiting in the queue. See
[Recognized & Unrecognized Files](/shoko-server/concepts/recognized-and-unrecognized-files) for why that happens. If you have a few files that need to be processed, clicking on the **Dump Truck** icon
will initiate the AVDump process. After it's completed, you can click on the **Checkmark File** icon to copy the
ED2K and proceed with dumping the file on AniDB. The **Link With Providers** icon next to it opens the file on the
**Link With Providers** page, to [link it by hand](/shoko-server/unrecognized-files#manual-linking).

For those dealing with a larger number of files or wanting to ensure there are no hashing issues, we recommend using
the Unrecognized Utility.

## Recently Imported

![Shoko Server - Dashboard - Recently Imported](/images/shoko-server/shoko-server-dashboard-imported.jpg)

After a file has been successfully matched, the corresponding episode and series will appear in the Recently
Imported widget, which displays the last 20 episodes imported by default. Clicking the Series tab in the
upper-right will show the last 20 series imported by default. It's important to note that series are not
duplicated in this view. If you import an episode of a show one week and another the following week, the series
entry will be moved up, but it won't be shown twice.

## Collection Statistics

![Shoko Server - Dashboard - Collection Statistics](/images/shoko-server/shoko-server-dashboard-stats.jpg)

Collection Statistics, as the name suggests, provide a summary of various aspects of your collection, divided into
three distinct sections. The first section lists the number of episodes and series in your collection, along with
the total hours you've watched. The second section displays your cumulative file size and highlights any unknown,
multiple, or duplicate files. The final section provides information about missing metadata and episode numbers,
giving you a quick overview of areas that may need attention.

## Media Type

![Shoko Server - Dashboard - Media Type](/images/shoko-server/shoko-server-dashboard-type.jpg)

Media Type is represented by a simple horizontal bar chart that breaks down the various series in your collection
by type, listing the number of each type and their overall percentage of your collection.

## Managed Folders

![Shoko Server - Dashboard - Managed Folders](/images/shoko-server/shoko-server-dashboard-import.jpg)

The Managed Folders panel lists the folders Shoko imports files from. **Add Folder** in the panel header adds a new
one, and each folder has two buttons:

- **Rescan Folder** checks every file in the folder: it finds files that weren't noticed and drops the records of
  files that are gone. Use it after adding a folder, since a new folder isn't scanned by itself.
- **Edit Folder** changes the folder's name, location, drop type and whether it's watched for new files. The fields
  are described under [Managed Folders](/shoko-server/settings/import#managed-folders) in the import settings.

See [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders) for what the drop types
and watching mean.

## Shoko News

![Shoko Server - Dashboard - Shoko News](/images/shoko-server/shoko-server-dashboard-news.jpg)

As the name suggests, this panel displays the latest news from the Shoko blog. We **highly recommend** checking it
out whenever a new blog post is added. Not checking it out might just hurt our feelings

## Continue Watching

![Shoko Server - Dashboard - Continue Watching](/images/shoko-server/shoko-server-dashboard-continue.jpg)

The Continue Watching section lists episodes that you’ve started but haven’t finished. It displays the series name,
episode name, and a progress bar showing how much of the episode is left. Please note that this information is pulled
from external media players using their Shoko-related plugins. There might be additional settings within those plugins
that need to be configured for in-progress episodes to appear here.

## Next Up

![Shoko Server - Dashboard - Next Up](/images/shoko-server/shoko-server-dashboard-next.jpg)

Next Up is similar to Continue Watching but displays the next unwatched episode in a series you are currently
watching. Like Continue Watching, this section’s information is sourced from external media players that use
Shoko-related plugins. Keep in mind that there might be additional settings within those plugins that need to be
configured for upcoming episodes to appear here.

## Upcoming Anime

![Shoko Server - Dashboard - Upcoming Anime](/images/shoko-server/shoko-server-dashboard-upcoming.jpg)

Upcoming Anime is a mini-calendar that tracks currently airing shows you are watching and displays the date for
the next episode. You can also access a week-long calendar by clicking on the **All** tab in the upper-right corner.
Please note that the number of days in the week view is currently hardcoded, with no plans to change it at this
time. Additionally, if **Hide R18 Content** is unchecked, adult titles will appear in this list.

## Recommended Anime

![Shoko Server - Dashboard - Recommended Anime](/images/shoko-server/shoko-server-dashboard-recommended.jpg)

Recommended Anime uses an internal algorithm to recommend new series to watch based on what you've previously
watched. Currently, this recommendation system only applies to series within your collection, so it's not
uncommon for smaller collections to have this section empty.
