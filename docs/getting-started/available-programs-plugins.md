---
title: Available Programs & Plugins
description: A list of all available Programs and Plugins that use Shoko.
---

<script setup>
const programsColumns = [
  { name: 'name', header: 'Name' },
  { name: 'dev', header: 'Dev' },
  { name: 'platform', header: 'Platform' },
  { name: 'status', header: 'Status' },
];

const programsData = [
  {
    name: '[Shoko Server](https://shokoanime.com/downloads/shoko-server)',
    dev: 'Shoko Team',
    platform: 'Win / Linux / Arm64',
    status: 'Active',
  },
  {
    name: 'Shoko Web UI',
    dev: 'Shoko Team',
    platform: 'Browser',
    status: 'Active',
  },
  {
    name: '[Shoko Desktop](https://shokoanime.com/downloads/legacy-apps/shoko-desktop)',
    dev: 'Shoko Team',
    platform: 'Windows',
    status: 'Maintenance Mode',
    link: 'https://shokoanime.com/downloads'
  }
];

const pluginsColumns = [
  { name: 'name', header: 'Name' },
  { name: 'dev', header: 'Dev' },
  { name: 'platform', header: 'Platform' },
  { name: 'status', header: 'Status' },
];

const pluginsData = [
  {
    name: '[Shoko Metadata](https://shokoanime.com/downloads/media-player-plugins/shoko-metadata)',
    dev: 'Cazzar',
    platform: 'Plex',
    status: 'Active',
  },
  {
    name: '[Shoko Relay](https://shokoanime.com/downloads/media-player-plugins/shokorelay)',
    dev: 'natyusha',
    platform: 'Plex',
    status: 'Active',
  },
  {
    name: '[Shokofin](https://shokoanime.com/downloads/media-player-plugins/shokofin)',
    dev: 'Revam',
    platform: 'Jellyfin',
    status: 'Active',
  },
  {
    name: '[Shokofin](https://shokoanime.com/downloads/media-player-plugins/shokodi)',
    dev: 'Da3dsoul',
    platform: 'Kodi',
    status: 'Active',
  },
  {
    name: '[Nakamori](https://shokoanime.com/downloads/media-player-plugins/nakamori)',
    dev: 'BigRetroMike',
    platform: 'Kodi',
    status: 'Active',
  }
];

const discontinuedColumns = [
  { name: 'name', header: 'Name', width: '20%' },
  { name: 'dev', header: 'Dev', width: '15%' },
  { name: 'platform', header: 'Platform', width: '15%'  },
  { name: 'discontinuedReason', header: 'Discontinued Reason' },
];

const discontinuedData = [
  {
    name: 'Anime Buddy',
    dev: 'Shoko Team',
    platform: 'Windows',
    discontinuedReason: {title: 'Discontinued Blog Post', link: 'https://shokoanime.com/blog/anime-buddy-discontinued/'}
  },
  {
    name: 'Shoko on Plex',
    dev: 'MaxPiva',
    platform: 'Plex (Plugin)',
    discontinuedReason: 'Discontinued in favor of ShokoMetadata.'
  },
  {
    name: 'My Anime 3',
    dev: 'Shoko Team',
    platform: 'MediaPortal',
    discontinuedReason: 'Discontinued due to lack of interest in supporting MediaPortal'
  }
];
</script>

# Available Programs & Plugins

The following is a compilation of known programs and plugins that utilize Shoko.

If you are aware of a program that uses Shoko Server or are currently working on one yourself, you can contribute to
the list by clicking the **Edit This Page** button on the right.

## About Maintenance & Legacy Mode

A program or plugin with a status of **Maintenance Mode** indicates a halt in active development and support, primarily
due tothe substantial time and effort needed for its upkeep. Programs or plugin in the **Legacy Mode** table are no
longer compatible with Shoko Server. Information on why they have been discontinued can be found in the table.

## Programs

<EasyTable :columns="programsColumns" :data="programsData" />

## Media Player Plugins

<EasyTable :columns="pluginsColumns" :data="pluginsData" />

## Discontinued Programs & Plugins

<EasyTable :columns="discontinuedColumns" :data="discontinuedData" />