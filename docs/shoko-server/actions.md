---
title: Actions
description: An overview of the Actions available in Shoko's WebUI.
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
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Run Import',
    Description: 'Scans for new files in Shoko folders, computes their hashes, and searches AniDB and TvDB for metadata and images.'
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
    Description: 'Scans import folders and imports only the new files identified within the import folder.'
  }
]);

const aniDBData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Download Missing AniDB Data',
    Description: 'Downloads XML data from AniDB forcefully. Use this only if the XML has been edited, deleted, or if Shoko has unexpectedly closed or crashed.'
  },
  {
    Name: 'Sync AniDB Votes',
    Description: 'Sync Series & Episode Votes from Shoko to AniDB.'
  },
  {
    Name: 'Sync AniDB MyList',
    Description: 'Syncs all Series & Episode watch state data from Shoko to AniDB. THIS IS A ONE-WAY ACTION AND WILL OVERWRITE ALL ANIDB DATA!'
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
  }
]);

const traktData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Sync Trakt Collection',
    Description: 'Sync watch states from Shoko to Trakt. THIS IS A ONE-WAY ACTION AND WILL OVERWRITE ALL TRAKT DATA!'
  },
  {
    Name: 'Update All Trakt Info',
    Description: 'Sync all info for Series from Trakt to Shoko.'
  }
]);

const tvDBData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Regenerate TvDB Links',
    Description: 'Recreates all episode matches for TvDB. This action is generally not required unless specifically instructed by a member of the Shoko team or mentioned in the release notes.'
  },
  {
    Name: 'Update All TvDB Info',
    Description: 'Update all Series information with the latest data from TvDB.'
  }
]);

const tmdbData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Update All MovieDB Info',
    Description: 'Updates information for all movie-related entries in your collection.'
  }
]);

const shokoData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
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
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Update All Images',
    Description: 'Updates and downloads all missing images from AniDB and TvDB.'
  },
  {
    Name: 'Validate All Images',
    Description: 'Identifies any invalid images and re-downloads them.'
  }
]);

const plexData = createTableData([
  {
    Name: 'Action',
    Description: 'The name assigned to the import folder used for visual purposes only.'
  },
  {
    Name: 'Sync Plex Watch Status',
    Description: 'Synchronizes watch states with Plex.'
  }
]);
</script>

# Actions

Actions are tasks, or groups of tasks, that perform different functionalities based on the nature of the action itself.
Many actions are tailored for troubleshooting, aiming to address unique situations where errors occurred during the
import process or where an issue arose during the metadata download process, leading to missing or corrupted data.
Additionally, for every part of the automation process that can be disabled, there is a corresponding action that
can be run to preform that specific part.

Actions are straightforward, with their functions detailed below each action name. For reference, we've included the
same information below.

![Shoko Server - Actions](/images/shoko-server/shoko-server-actions.jpg)

## Import

<EasyTable :columns="importData.columns" :data="importData.data" />

## AniDB

<EasyTable :columns="aniDBData.columns" :data="aniDBData.data" />

## Trakt

<EasyTable :columns="traktData.columns" :data="traktData.data" />

## TvDB

<EasyTable :columns="tvDBData.columns" :data="tvDBData.data" />

## TMDB

<EasyTable :columns="tmdbData.columns" :data="tmdbData.data" />

## Shoko

<EasyTable :columns="shokoData.columns" :data="shokoData.data" />

## Images

<EasyTable :columns="imagesData.columns" :data="imagesData.data" />

## Plex

<EasyTable :columns="plexData.columns" :data="plexData.data" />
