---
title: Dashboard
description: Overview of the Dashboard in the WebUI.
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

const jobNameColumns = [
    { name: 'Job Name', header: 'Job Name' },
    { name: 'Default', header: 'Default' },
    { name: 'Description', header: 'Description' }
];

const jobNameData = [
    {
      'Job Name': 'HashFileJob',
      'Default': '1',
      'Description': 'Determines how many workers are allocated to hashing files'
    },
    {
      'Job Name': 'UpdateTmdbShowJob',
      'Default': '1',
      'Description': 'Determines how many workers are allocated to running TMDB series tasks.'
    },
    {
      'Job Name': 'UpdateTmdbMovieJob',
      'Default': '1',
      'Description': 'Determines how many workers are allocated to running TMDB movie tasks.'
    }
];

const importFolderColumns = [
    { name: 'Name', header: 'Name', width: '15%' },
    { name: 'Description', header: 'Description' }
];

const importFolderData = [
    {
      Name: 'Name',
      Description: 'The name assigned to the import folder used for visual purposes only.'
    },
    {
      Name: 'Location',
      Description: 'The actual location of the import folder, relative to where Shoko is installed.'
    },
    {
      Name: 'Drop Type',
      Description: 'This setting tells Shoko how to handle this folder when processing your files. \n The **Source** option instructs Shoko to grab files from this folder and move them to another import folder marked as Destination.  \n The **Both** option allows Shoko to perform the moving actions without actually relocating the files, which enables renaming on import or applying any custom renamer settings.  \n Finally, The **None** option tells Shoko not to perform any actions on the folder, which is typically paired with Watch For New Files set to Yes.'
    },
    {
      Name: 'Watch For New Files',
      Description: 'A true/false setting which tells Shoko to monitor the import folder for new files. If set to **no**, you\'ll have to use the **Import Files** action to update your collection.'
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

The Queue Processor optimizes task management for your collection by intelligently allocating tasks across a dynamic
pool of workers, enhancing efficiency and throughput.

### Task Prioritization

A key feature of the Queue Processor is its ability to prioritize tasks effectively. It organizes tasks by type and
dynamically adjusts priorities to account for external constraints, like rate limitations. Tasks that might be slowed
down by these factors are identified and de-prioritized, allowing other ready-to-run tasks to move forward. This
strategy prevents bottlenecks caused by "stuck" tasks, ensuring a smooth and continuous workflow, and boosts overall
productivity by reducing idle worker time.

### Dynamic Worker Allocation

Based on your system's capabilities, **specifically the CPU thread count plus two**, the Queue Processor adjusts the
number of workers to handle incoming tasks efficiently. This scalable approach makes sure resources are used
efficiently, adjusting to the workload as it changes in real-time.

### Dynamic Worker Configuration

While we **strongly recommend** sticking with the default settings, the Queue Processor does allow you to adjust the
number of workers per task type. This can be useful if you have a specific task that requires more resources than
others, enabling you to allocate more workers to that task type. However, please note that this is an **export level**
feature and can cause **irreversible damage** to your computer if misused. It should only be used by those who fully
understand the implications of changing these settings.

In the **settings-server.json** file, add the following key to the Quartz section:

```json
"LimitedConcurrencyOverrides": {
     "JOBNAME": COUNT
   }
```

In the table below you'll find a list of job names and description.

<EasyTable :columns="jobNameColumns" :data="jobNameData" />

## Unrecognized Files

![Shoko Server - Dashboard - Unrecognized Files](/images/shoko-server/shoko-server-dashboard-unrecognized.jpg)

Unrecognized files are files that have been successfully hashed by Shoko but failed to find a match in AniDB's hashing
database for various reasons. If you have a few files that need to be processed, clicking on the **Dump Truck** icon
will initiate the AVDump process. After it's completed, you can click on the **Checkmark File** icon to copy the
ED2K and proceed with dumping the file on AniDB.

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

## Import Folders

![Shoko Server - Dashboard - Import Folders](/images/shoko-server/shoko-server-dashboard-import.jpg)

The Import Folders section allows you to add and edit import folders while listing all the available folders used in
your collection. You can add new import folders by clicking the **folder plus icon** located in the panel header. Each
listed import folder has its own set of actions, including Rescan Folder and Edit Folder.

The first action, **Rescan Folder**, will rescan every file within the folder itself. This is useful if, for some reason,
and depending on your settings, files added to that import folder were not automatically detected.

The second action, **Edit Folder**, allows you to edit the selected import folder by changing its name, location,
drop type, and watch indicator. You can refer to the table below for more information on each setting.

### Import Folder Options

<EasyTable :columns="importFolderColumns" :data="importFolderData" />

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
