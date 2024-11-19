---
title: Scheduled Tasks
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
    description: "Retrieve and update the known version of the connected Shoko Server.",
  },
  {
    Advanced: "⚠",
    Task: "Cleanup Virtual File System Roots",
    description: "Removes any stale or leftover virtual file system roots that could have been left behind due to an outdated install or unfinished library removal.",
  },
  {
    Advanced: "⚠",
    Task: "Clear Plugin Cache",
    description: "Forcefully clears the plugin cache. Only should be ran for debugging or troubleshooting purposes. \n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Export User Data",
    description: "Export the user data stored in Jellyfin to Shoko Server. Will not import user data from Shoko Server.",
  },
  {
    Advanced: "",
    Task: "Import User Data",
    description: "Import the user data stored in Shoko Server to Jellyfin. Will not export user data from Jellyfin.",
  },
  {
    Advanced: "⚠",
    Task: "Merge Episodes",
    description: "Merge all episode entries with the same Shoko Episode ID into a single entry.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Merge Movies",
    description: "Merge all movie entries with the same Shoko Episode ID into a single entry.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Migrate Episode User Watch Data",
    description: "Migrate user watch data for episodes stored in Jellyfin to the newest ID namespace.",
  },
  {
    Advanced: "⚠",
    Task: "Reconstruct Collections",
    description: "Reconstruct all native Jellyfin collections managed by Shokofin outside of a library scan.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Split Episodes",
    description: "Split all episode entries with the same Shoko Episode ID into separate entries.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "⚠",
    Task: "Split Movies",
    description: "Split all movie entries with the same Shoko Episode ID into separate entries.\n**Do not run while a library scan is in progress!**",
  },
  {
    Advanced: "",
    Task: "Sync User Data",
    description: "Synchronize the user data stored in Jellyfin with Shoko Server. Imports and exports data as needed.",
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
