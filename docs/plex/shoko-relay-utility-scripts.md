---
title: Shoko Relay Utility Scripts
description: Information on how to use the Shoko Relay utility scripts.
---

<script setup>
const preColumns = [
  { name: 'Dependency', header: 'Dependency' },
  { name: 'AnimeThemes', header: 'Anime Themes' },
  { name: 'CollectionPosters', header: 'Collection Posters' },
  { name: 'ForceMetadata', header: 'Force Metadata' },
  { name: 'RescanRecent', header: 'Rescan Recent' },
  { name: 'WatchedSync', header: 'Watched Sync' }
];

const preTableData = [
  {
    Dependency: '[Python 3](https://www.python.org/downloads/)',
    AnimeThemes: '✔️',
    CollectionPosters: '✔️',
    ForceMetadata: '✔️',
    RescanRecent: '✔️',
    WatchedSync: '✔️'
  },
  {
    Dependency: '[PlexAPI](https://pypi.org/project/PlexAPI/)',
    AnimeThemes: '❌',
    CollectionPosters: '✔️',
    ForceMetadata: '✔️',
    RescanRecent: '❌',
    WatchedSync: '✔️'
  },
  {
    Dependency: '[Requests](https://pypi.org/project/requests/)',
    AnimeThemes: '✔️',
    CollectionPosters: '✔️',
    ForceMetadata: '❌',
    RescanRecent: '✔️',
    WatchedSync: '✔️'
  },
  {
    Dependency: '[FFmpeg](https://ffmpeg.org/download.html)',
    AnimeThemes: '✔️',
    CollectionPosters: '❌',
    ForceMetadata: '❌',
    RescanRecent: '❌',
    WatchedSync: '❌'
  }
];

const plexConfigColumns = [
  { name: 'Option', header: 'Option' },
  { name: 'Description', header: 'Description' },
];

const plexConfigTableData = [
  {
    Option: 'Username',
    Description: 'The username for the **admin account** of your Plex server.',
  },
  {
    Option: 'Password',
    Description: 'The password for the **admin account** of your Plex server. Skip this setting if two-factor authentication is in use.',
  },
  {
    Option: 'ServerName',
    Description: 'The name of your Plex server.',
  },
  {
    Option: 'LibraryNames',
    Description: `The names of any libraries which you want the scripts to interact with. **Must be formatted as a Python list** e.g. \`'LibraryNames': ['Anime Shows', 'Anime Movies'],\``,
  },
];

const shokoConfigColumns = [
  { name: 'Option', header: 'Option', width: '9em' },
  { name: 'Description', header: 'Description' }
];

const shokoConfigTableData = [
  {
    Option: 'Hostname',
    Description: 'The IP address for the computer where Shoko Server is located.'
  },
  {
    Option: 'Port',
    Description: 'The port Shoko Server uses, by default its **8111**'
  },
  {
    Option: 'Username',
    Description: 'The username for the **local account** you created during the **First Run** setup in Shoko Server.'
  },
  {
    Option: 'Password',
    Description: 'The password for the **local account** you created during the **First Run** setup in Shoko Server.'
  }
];

const animeThemesConfigColumns = [
  { name: 'Option', header: 'Option', width: '9em' },
  { name: 'Description', header: 'Description' }
];

const animeThemesConfigTableData = [
  {
    Option: 'FFplay_Enabled',
    Description: 'Whether the AnimeThemes script will playback the song after downloading or not.'
  },
  {
    Option: 'FFplay_Volume',
    Description: 'The volume of the audio playback if it is enabled.'
  },
  {
    Option: 'BatchOverwrite',
    Description: 'Whether the batch argument will overwrite **Theme.mp3** files or not.'
  }
];

</script>

# Shoko Relay Utility Scripts

Shoko Relay includes several utility / automation scripts which can help to quickly add full length theme songs,
automatic collection posters, correct negative season numbers, synced watched states, and more.

The scripts require basic knowledge of running Python and other simple commands in a terminal. They are located in the
`.\Contents\Scripts` folder inside `ShokoRelay.bundle` and can be moved to whatever location is convenient for the
user (as long as the `config.py` file is kept in the same folder).

For ease of use, adding the Scripts folder to the **[PATH](https://en.wikipedia.org/wiki/PATH_(variable))** is also
recommended.

:::info
In depth information about each script and its functionality can be found in the Shoko
Relay [Readme](https://github.com/natyusha/ShokoRelay.bundle?tab=readme-ov-file#scripts). These scripts also function
with Shoko Metadata.
:::

## Prerequisites

Before using any of the scripts you must have the requisite dependencies installed. For more information on using Python
scripts in general check out the Python 3 docs for [linux](https://docs.python.org/3/using/unix.html#on-linux)
or [windows](https://docs.python.org/3/using/windows.html).

<EasyTable :columns="preColumns" :data="preTableData" />

:::warning FFMPEG on Windows
When installing FFmpeg on Windows make sure to add it to the **PATH** by
editing [Windows environment variables](https://phoenixnap.com/kb/ffmpeg-windows#ftoc-heading-4) or using the following
command: `setx /m PATH "PATHTOFFMPEG"`.
:::

## Configuration

After installing the dependencies you must use a text editor to enter your Shoko and Plex credentials (as well as
several other options) into the included `config.py` file. The configuration file contains 4 sections which will be
detailed below.

##### Plex Server Configuration

<EasyTable :columns="plexConfigColumns" :data="plexConfigTableData" />

##### Shoko Server Configuration

<EasyTable :columns="shokoConfigColumns" :data="shokoConfigTableData" />

##### Anime Themes Configuration

<EasyTable :columns="animeThemesConfigColumns" :data="animeThemesConfigTableData" />

##### Path Remapping for Rescan-Recent

This section is for remapping paths from Shoko's to the system where the scripts are running. It uses regex substitution
pairs to achieve this in the following format: `'^/ShokoPath/': '/LocalPath/'`. Regex substitution pairs require double
backslashes on windows e.g. `'^/anime/': 'M:\\Anime\\'`. As many pairs as required can be manually added to this
section.

## Running the Scripts

Once the configuration has been completed simply run the scripts from a terminal. Arguments and example commands for
each script will be listed below.

:::tip
Append `-h` or `--help` as an argument when running the scripts to access their help pages and avoid having to consult
the readme for all of the commands.
:::

### AnimeThemes

Run in a terminal `animethemes.py` with the working directory set to a folder containing an anime series. If the anime
has been matched by Shoko Server it will grab the anidbID and use that to match with an AnimeThemes anime entry.
Append the arguments "slug" / "offset" `animethemes.py slug offset` in order to specify which opening or ending to
download.

- slug: an optional identifier which must be the first argument and is formatted as "op", "ed", "op2", "ed2" and so on
- offset: an optional single digit number which must be the second argument if the slug is provided

Append the argument "play" to the commands above to run in "Preview" mode.

- play: for force enabling FFplay and disabling Theme.mp3 generation, must be the last or sole argument and is simply
  entered as "play"

Append the argument "batch" `animethemes.py batch` when running the script on multiple folders at a time.

- batch: must be the sole argument and is simply entered as "batch"

###### Example Commands:

:::info
Using bash / cmd respectively and assuming that both the script and FFmpeg can be called directly from PATH.
:::

Library Batch Processing:

- `for d in "/PathToAnime/"*/; do cd "$d" && animethemes.py batch; done`
- `for /d %d in ("X:\PathToAnime\*") do cd /d %d && animethemes.py batch`

Fix "Mushoku Tensei II: Isekai Ittara Honki Dasu" Matching to Episode 0 (offset to the next animethemes match):

- `cd "/PathToMushokuTenseiII"; animethemes.py 1`
- `cd /d "X:\PathToMushokuTenseiII" && animethemes.py 1`

Same as above but download the second ending instead of the default OP:

- `cd "/PathToMushokuTenseiII"; animethemes.py ed2 1`
- `cd /d "X:\PathToMushokuTenseiII" && animethemes.py ed2 1`

Download the 9th Opening of Bleach:

- `cd "/PathToBleach"; animethemes.py op9`
- `cd /d "X:\PathToBleach" && animethemes.py op9`

Preview the 9th Opening of Bleach

- `cd "/PathToBleach"; animethemes.py op9 play`
- `cd /d "X:\PathToBleach" && animethemes.py op9 play`

### Collection-Posters

Run in a terminal `collection-posters.py` to set Plex collection posters to user provided ones or Shoko's.

- Any Posters in the "PostersFolder" must have the same name as their respective collection in Plex.
- The following characters must be stripped from the filenames: \ / : * ? " < > |
- The accepted file extensions are: bmp / gif / jpe / jpeg / jpg / png / tbn / tif / tiff / webp

Append the argument "clean" `collection-posters.py clean` if you want to remove old collection posters instead.

- This works by deleting everything but the newest custom poster for all collections.

### Force-Metadata

Run in a terminal `force-metadata.py` to remove empty collections, normalize collection sort titles, rename negative
seasons and add original titles in Plex. Append the argument "full" `force-metadata.py full` if you want to do a
time-consuming full metadata clean up.

:::warning

In "full" mode you must wait until the Plex activity queue is fully completed before advancing to the next step (with
the enter key) or this will not function correctly.

- You can tell if Plex is done by looking at the library in the desktop/web client or checking the logs in your "PMS
  Plugin Logs" folder for activity.

- This may take a significant amount of time to complete with a large library so it is recommended to run the first step
  overnight.
  :::

### Rescan-Recent

Run in a terminal `rescan-recent.py` to trigger a Plex rescan of the 5 most recently added series in Shoko. Change the
number of recently added series (from 1-99) to rescan with an argument when 5 isn't enough:

- `rescan-recent.py 20` would rescan the 20 most recently added series

Append the argument "import" `rescan-recent.py import` if you want to force shoko to import unrecognized files instead.

### Watched-Sync

Run in a terminal `watched-sync.py` to sync watched states from Plex to Shoko. Append a relative date suffix as an
argument to narrow down the time frame and speed up the process:

- `watched-sync.py 2w` would return results from the last 2 weeks
- `watched-sync.py 3d` would return results from the last 3 days

The full list of suffixes (from 1-999) are: m=minutes, h=hours, d=days, w=weeks, mon=months, y=years

Append the argument "import" `watched-sync.py import` if you want to sync watched states from Shoko to Plex instead.

- The script will ask for (Y/N) confirmation for each Plex user that has been configured.
