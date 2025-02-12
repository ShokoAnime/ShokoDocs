---
title: Scheduled Tasks | Jellyfin
description: Learn about the scheduled tasks provided by Shokofin.
---

<script setup>
const containerColumns = [
  { name: 'Advanced', header: '⚠' },
  { name: 'Task', header: 'Task', width: '20%' },
  { name: 'Description', header: 'Description' },
];

const shokofinScheduledTasksData = [
  {
    Advanced: "⚠",
    Task: "Check Server Version",
    Description: "Retrieve and update the known version of the connected Shoko Server.",
  },
  {
    Advanced: "⚠",
    Task: "Cleanup Virtual File System Roots",
    Description: "Removes any stale or leftover virtual file system roots that could have been left behind due to an outdated install or unfinished library removal.",
  },
  {
    Advanced: "⚠",
    Task: "Clear Plugin Cache",
    Description: "Forcefully clears the plugin cache. Only should be ran for debugging or troubleshooting purposes. \n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Export User Data",
    Description: "Export the user data stored in Jellyfin to Shoko Server. Will not import user data from Shoko Server.",
  },
  {
    Advanced: "",
    Task: "Import User Data",
    Description: "Import the user data stored in Shoko Server to Jellyfin. Will not export user data from Jellyfin.",
  },
  {
    Advanced: "⚠",
    Task: "Merge Episodes",
    Description: "Merge all episode entries with the same Shoko Episode ID into a single entry.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Merge Movies",
    Description: "Merge all movie entries with the same Shoko Episode ID into a single entry.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Migrate Episode User Watch Data",
    Description: "Migrate user watch data for episodes stored in Jellyfin to the newest ID namespace.",
  },
  {
    Advanced: "⚠",
    Task: "Reconstruct Collections",
    Description: "Reconstruct all native Jellyfin collections managed by Shokofin outside of a library scan.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Split Episodes",
    Description: "Split all episode entries with the same Shoko Episode ID into separate entries.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Split Movies",
    Description: "Split all movie entries with the same Shoko Episode ID into separate entries.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Sync User Data",
    Description: "Synchronize the user data stored in Jellyfin with Shoko Server. Imports and exports data as needed.",
  },
];
</script>

# Scheduled Tasks

Shokofin comes with a set of tasks that can be accessed within the Jellyfin dashboard under the Scheduled Tasks section
in the sidebar. More info on what Jellyfin tasks are can be found
[here](https://jellyfin.org/docs/general/server/tasks/).

## Tasks

The following tasks are available in Shokofin:

:::info About Advanced Tasks
Shokofin provides some advanced tasks that are normally hidden. They can be made accessible through the plugin
settings by clicking the Shoko Server version number under the Connection Settings section 7 times. Advanced tasks
will be indicated using the **⚠** symbol in the section below.
:::

<EasyTable :columns="containerColumns" :data="shokofinScheduledTasksData" />
