---
title: Available Programs & Plugins
description: A list of all available Programs and Plugins for use with Shoko.
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
    platform: 'Windows (amd64) / Linux (amd64/aarch64)',
    status: 'Active',
  },
  {
    name: 'Shoko Web UI',
    dev: 'Shoko Team',
    platform: 'Browser',
    status: 'Active',
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
    name: '[Shoko Relay](https://shokoanime.com/downloads/media-player-plugins/shoko-relay)',
    dev: 'natyusha',
    platform: 'Plex',
    status: 'Active',
  },
  {
    name: '[Shokofin](https://shokoanime.com/downloads/media-player-plugins/shokofin)',
    dev: 'revam',
    platform: 'Jellyfin',
    status: 'Active',
  },
  {
    name: '[Shokodi](https://shokoanime.com/downloads/media-player-plugins/shokodi)',
    dev: 'da3dsoul',
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
    name: '[My Anime 3](https://shokoanime.com/downloads/legacy-apps/my-anime-3)',
    dev: 'Shoko Team',
    platform: 'MediaPortal',
    discontinuedReason: 'Discontinued due to lack of interest in supporting MediaPortal'
  },
  {
    name: '[Shoko Desktop](https://shokoanime.com/downloads/legacy-apps/shoko-desktop)',
    dev: 'Shoko Team',
    platform: 'Windows',
    discontinuedReason: 'Support dropped in Shoko Server 6.0. Shoko Server 5.3.3 is the last release it somewhat works with.'
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

## Media Server/Player Plugins

These plugins are installed in the media server or player you watch with (such as Jellyfin, Plex or Kodi) and connect
to Shoko Server.
They're not the same as Shoko Server plugins, which are installed into Shoko Server itself under **Settings** →
**Plugin Management** in the Web UI.

<EasyTable :columns="pluginsColumns" :data="pluginsData" />

## Discontinued Programs & Plugins

<EasyTable :columns="discontinuedColumns" :data="discontinuedData" />