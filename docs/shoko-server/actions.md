---
title: Actions
description: An overview of the quick actions in Shoko's Web UI, and where to run the same work on a schedule.
---

<script setup>
const createTableData = (data) => ({
  columns: [
    { name: 'Name', header: 'Name', width: '25%' },
    { name: 'Description', header: 'Description' }
  ],
  data: data
});

const importData = createTableData([
  {
    Name: 'Run Import',
    Description: 'This checks for new files, hashes them etc, scans Drop Folders, checks and scans for community site links (tmdb, etc), and downloads missing images.'
  },
  {
    Name: 'Remove Missing Files',
    Description: 'Deletes entries in Shoko and MyList for files that are no longer accessible.'
  },
  {
    Name: 'Remove Missing Files (Keep in MyList)',
    Description: 'Deletes entries in Shoko, while retaining them in MyList, for files that are no longer accessible.'
  },
  {
    Name: 'Import New Files',
    Description: 'Queues a task to import only new files found in the managed folders.'
  }
]);

const aniDBData = createTableData([
  {
    Name: 'Download Missing AniDB Data',
    Description: 'Downloads XML data from AniDB forcefully. Use this only if the XML has been edited, deleted, or if Shoko has unexpectedly closed or crashed.'
  },
  {
    Name: 'Sync AniDB Votes',
    Description: 'Sync Series & Episode Votes from Shoko to AniDB.'
  },
  {
    Name: 'Add All Manual Links To MyList',
    Description: 'Syncs Manually Linked Episodes to your MyList. File entries on AniDB will show up as Generic.'
  },
  {
    Name: 'Update All AniDB Info',
    Description: 'Update all Series information with the latest data from AniDB.'
  },
  {
    Name: 'Update AniDB Calendar',
    Description: 'Updates the \'Upcoming Anime\' calendar in Shoko with the most recent information from AniDB.'
  },
  {
    Name: 'Get AniDB Notifications',
    Description: 'Fetch unread notifications and messages from AniDB.'
  },
  {
    Name: 'Process Moved Files',
    Description: 'Process file moved messages from AniDB. This will force an update on the affected files.'
  },
  {
    Name: 'OVERWRITE AniDB MyList',
    Description: 'Syncs all Series & Episode watch state data from Shoko to AniDB. THIS IS A ONE-WAY ACTION AND WILL OVERWRITE ALL ANIDB DATA!'
  }
]);

const tmdbData = createTableData([
  {
    Name: 'Search for TMDB Matches',
    Description: 'Scan for TMDB matches for all unlinked AniDB anime.'
  },
  {
    Name: 'Update All TMDB Shows',
    Description: 'Updates all TMDB Shows in the local database.'
  },
  {
    Name: 'Delete Unused TMDB Shows',
    Description: 'Deletes all unused TMDB Shows that are not linked to any AniDB anime.'
  },
  {
    Name: 'Update All TMDB Movies',
    Description: 'Updates all TMDB Movies in the local database.'
  },
  {
    Name: 'Delete Unused TMDB Movies',
    Description: 'Deletes all unused TMDB Movies that are not linked to any AniDB anime.'
  },
  {
    Name: 'Download Missing TMDB People',
    Description: 'Downloads any TMDB People missing in the local database.'
  },
  {
    Name: 'Delete All TMDB Movie Collections',
    Description: 'Deletes all TMDB Movie Collections stored in the local database, and removes any images associated with them.'
  },
  {
    Name: 'Delete All TMDB Show Alternate Orderings',
    Description: 'Deletes all TMDB Show Alternate Orderings stored in the local database.'
  }
]);

const shokoData = createTableData([
  {
    Name: 'AVDump Mismatched Files',
    Description: 'Scans the library, detects files without a hash match in AniDB, and runs AVDump on them.'
  },
  {
    Name: 'Recreate All Groups',
    Description: 'Deletes all existing groups in Shoko and recreates them.'
  },
  {
    Name: 'Rename All Groups',
    Description: 'Renames all default groups, excluding those with custom names, using the current language settings.'
  },
  {
    Name: 'Update Missing AniDB Release Groups',
    Description: 'Checks AniDB for updated data on files in your collection that lack a release group.'
  },
  {
    Name: 'Update Missing AniDB File Info',
    Description: 'Updates AniDB files lacking file information, including those missing release groups and those with outdated internal data versions.'
  },
  {
    Name: 'Update All Mediainfo',
    Description: 'Runs MediaInfo on every file in your collection to update their metadata.'
  },
  {
    Name: 'Update Series Stats',
    Description: 'Updates all series in your collection, recalculating totals, remainders, and watched statuses of items.'
  }
]);

const imagesData = createTableData([
  {
    Name: 'Update All Images',
    Description: 'Updates and downloads all missing images from AniDB and TMDB.'
  },
  {
    Name: 'Validate All Images',
    Description: 'Identifies any invalid images and re-downloads them.'
  }
]);

const plexData = createTableData([
  {
    Name: 'Sync Plex Watch Status',
    Description: 'Synchronizes watch states with Plex.'
  },
  {
    Name: 'Force Unlink Plex',
    Description: 'Invalidates the Plex token forcefully.'
  }
]);
</script>

# Actions

Quick actions are one-off tasks you queue from the Web UI's top bar. Many of them are for troubleshooting: they redo a
part of the import or the metadata download that went wrong, or that left something missing. For every part of the
automation that can be switched off, there's an action that does that part on demand.

Open them with the **Actions** button in the top bar. Picking a group lists its actions, and each one tells you what it
does above the button that queues it. The work itself runs through the queue, so you can follow it on the
[Dashboard](/shoko-server/dashboard) or in the [Logs](/shoko-server/logs).

To have Shoko run this kind of work on its own instead, on triggers you choose, see
[Scheduled Actions](/shoko-server/settings/scheduled-actions).

![Shoko Server - Actions](/images/shoko-server/shoko-server-actions.jpg)

## Import

<EasyTable :columns="importData.columns" :data="importData.data" />

## AniDB

<EasyTable :columns="aniDBData.columns" :data="aniDBData.data" />

## TMDB

<EasyTable :columns="tmdbData.columns" :data="tmdbData.data" />

## Shoko

<EasyTable :columns="shokoData.columns" :data="shokoData.data" />

## Images

<EasyTable :columns="imagesData.columns" :data="imagesData.data" />

## Plex

<EasyTable :columns="plexData.columns" :data="plexData.data" />
