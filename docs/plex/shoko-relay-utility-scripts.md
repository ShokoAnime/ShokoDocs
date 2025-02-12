---
title: Shoko Relay Utility Scripts | Plex
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
  {
    Option: 'ExtraUsers (Optional)',
    Description: `The usernames of any managed or home users to sync watched states for (watched-sync.py) **Must be formatted as a Python list**  e.g. \`'ExtraUsers': ['Family'],\``,
  },
  {
    Option: 'DataFolder (Optional)',
    Description: `The Location of your Plex [data folder](https://support.plex.tv/articles/202915258-where-is-the-plex-media-server-data-directory-located/) (collection-posters.py clean). **Requires double backslashes on windows** e.g. \`'DataFolder': '%LOCALAPPDATA%\\\\Plex Media Server',\``,
  },
  {
    Option: 'PostersFolder (Optional)',
    Description: `The folder containing any custom collection posters (collection-posters.py). **Requires double backslashes on windows** e.g. \`'PostersFolder': 'M:\\\\Anime\\\\Posters',\``,
  },
  {
    Option: 'SyncAdmin',
    Description: 'Whether the watched states of the Admin account should be synced (watched-sync.py)',
  },
  {
    Option: 'X-Plex-Token (2FA)',
    Description: 'An alternate Plex authentication method for those using two-factor authentication. More info on obtaining a token [here](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/).',
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

For ease of use, adding the Scripts folder to the **[PATH](<https://en.wikipedia.org/wiki/PATH_(variable)>)** is also
recommended.

:::info
These scripts also function with Shoko Metadata (thought it is not supported).
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

- This script uses the Shoko and [AnimeThemes](https://animethemes.moe/) APIs to find the OP/ED for a series and convert it into a Theme.mp3 file which will play when viewing the series in Plex.
- The default themes grabbed by Plex are limited to 30 seconds long and are completely missing for a massive amount of anime making this a great upgrade to local metadata.

:::details Additional Information
**Requirements:**

- Python 3.7+, Requests Library (pip install requests), FFmpeg, Shoko Server

**Preferences:**

- Before doing anything with this script you must enter your Shoko credentials into `config.py`.
- To allow Theme.mp3 files to be used by Plex you must also enable "Local Media Assets" for the libraries that have your Anime in it.
  - The "Play Theme Music" option also has to be enabled in the settings for the Plex client.

**Usage:**

- Run in a terminal `animethemes.py` with the working directory set to a folder containing an anime series.
- If the anime has been matched by Shoko Server it will grab the anidbID and use that to match with an AnimeThemes anime entry.

**Behaviour:**

- By default this script will download the first OP (or ED if there is none) for the given series.
- If "FFplay_Enabled" is set to True in `config.py` the song will begin playing in the background which helps with picking the correct theme.
- FFmpeg will then encode it as a 320kbps mp3 and save it as Theme.mp3 in the anime folder.
- FFmpeg will also apply the following metadata:
  - Title (with TV Size or not)
  - Artist (if available)
  - Album (as source anime)
  - Subtitle (as OP/ED number + the version if there are multiple)
- If you want a different OP/ED than the default simply supply the AnimeThemes slug as an argument.
- For the rare cases where there are multiple anime mapped to the same anidbID on AnimeThemes you can add an offset as an argument to select the next matched entry.
- When running this on multiple folders at once adding the "batch" argument is recommended. This disables audio playback and skips folders already containing a Theme.mp3 file.
  - If "BatchOverwrite" is set to true in `config.py` the batch argument will instead overwrite any existing Theme.mp3 files.

**Arguments:**

- Append the arguments "slug" / "offset" `animethemes.py slug offset` in order to specify which opening or ending to download.
  - slug: an optional identifier which must be the first argument and is formatted as "op", "ed", "op2", "ed2", "op1-tv" and so on
  - offset: an optional single digit number which must be the second argument if the slug is provided
- Append the argument "play" to the commands above to run in "Preview" mode.
  - play: for force enabling FFplay and disabling Theme.mp3 generation, must be the last or sole argument and is simply entered as "play"
- Append the argument "batch" `animethemes.py batch` when running the script on multiple folders at a time.
  - batch: must be the sole argument and is simply entered as "batch"

**Example Commands:**

> :pencil2: **Note**  
> Using bash / cmd respectively and assuming that both the script and FFmpeg can be called directly from the PATH.

- Library Batch Processing
  - `for d in "/PathToAnime/"*/; do cd "$d" && animethemes.py batch; done`
  - `for /d %d in ("X:\PathToAnime\*") do cd /d %d && animethemes.py batch`
- Fix "Mushoku Tensei II: Isekai Ittara Honki Dasu" Matching to Episode 0 (offset to the next animethemes match)
  - `cd "/PathToMushokuTenseiII"; animethemes.py 1`
  - `cd /d "X:\PathToMushokuTenseiII" && animethemes.py 1`
- Same as above but download the second ending instead of the default OP
  - `cd "/PathToMushokuTenseiII"; animethemes.py ed2 1`
  - `cd /d "X:\PathToMushokuTenseiII" && animethemes.py ed2 1`
- Download the 9th Opening of Bleach
  - `cd "/PathToBleach"; animethemes.py op9`
  - `cd /d "X:\PathToBleach" && animethemes.py op9`
- Preview the 9th Opening of Bleach
  - `cd "/PathToBleach"; animethemes.py op9 play`
  - `cd /d "X:\PathToBleach" && animethemes.py op9 play`
    :::

### Collection-Posters

- This script uses the Python-PlexAPI and Shoko Server to apply posters to the collections in Plex.
- It will look for posters in a user defined folder and if none are found take the default poster from the corresponding Shoko group.

:::details Additional Information
**Requirements:**

- Python 3.7+, Python-PlexAPI (pip install plexapi), Requests Library (pip install requests), Plex, Shoko Relay, Shoko Server

**Preferences:**

- Before doing anything with this script you must enter your Plex and Shoko Server credentials into `config.py`.
- If your anime is split across multiple libraries they can all be added in a python list under "LibraryNames".
  - It must be a list to work e.g. `'LibraryNames': ['Anime Shows', 'Anime Movies']`
- The Plex "PostersFolder" and "DataFolder" settings require double backslashes on windows e.g. `'PostersFolder': 'M:\\Anime\\Posters',`.
  - The "DataFolder" setting is the base [Plex Media Server Data Directory](https://support.plex.tv/articles/202915258-where-is-the-plex-media-server-data-directory-located/) (where the Metadata folder is located).
  - The "PostersFolder" setting is the folder containing any custom collection posters.

**Usage:**

- Run in a terminal `collection-posters.py` to set Plex collection posters to user provided ones or Shoko's.
  - Any Posters in the "PostersFolder" must have the same name as their respective collection in Plex.
  - The following characters must be stripped from the filenames: \ / : \* ? " < > |
  - The accepted file extensions are: bmp / gif / jpe / jpeg / jpg / png / tbn / tif / tiff / webp
- Append the argument "clean" `collection-posters.py clean` if you want to remove old collection posters instead.
  - This works by deleting everything but the newest custom poster for all collections.
    :::

### Force-Metadata

- This script uses the Python-PlexAPI to force all metadata in your anime library to update to Shoko's bypassing Plex's caching or other issues.
- Any unused posters or empty collections will be removed from your library automatically while also updating negative season names, collection sort titles and original titles.
- After making sweeping changes to the metadata in Shoko (like collections or title languages) this is a great way to ensure everything updates correctly in Plex.

:::details Additional Information
**Requirements:**

- Python 3.7+, Python-PlexAPI (pip install plexapi), Plex, Shoko Relay, Shoko Server

**Preferences:**

- Before doing anything with this script you must enter your Plex credentials into `config.py`.
- If your anime is split across multiple libraries they can all be added in a python list under Plex "LibraryNames".
  - It must be a list to work e.g. `'LibraryNames': ['Anime Shows', 'Anime Movies']`

**Usage:**

- Run in a terminal `force-metadata.py` to remove empty collections, normalise collection sort titles, rename negative seasons and add original titles in Plex.
- Append the argument "full" `force-metadata.py full` if you want to do a time consuming full metadata clean up.

> :warning: **Important**  
> In "full" mode you must wait until the Plex activity queue is fully completed before advancing to the next step (with the enter key) or this will not function correctly.
>
> - You can tell if Plex is done by looking at the library in the desktop/web client or checking the logs in your "PMS Plugin Logs" folder for activity.
> - This may take a significant amount of time to complete with a large library so it is recommended to run the first step overnight.

**Behaviour:**

- This script will ignore locked fields/posters assuming that the user wants to keep them intact.
- Manually merged series will not be split apart and may need to be handled manually to correctly refresh their metadata.
- If the main title of an anime was changed on AniDB or overridden in Shoko after it was first scanned into Plex it might fail to match using this method.
  - In these cases the original title will be output to the console for the user to fix with a Plex dance or manual match.
- Video preview thumbnails and watched states are maintained with this script (unless an anime encounters the above naming issue).
- The "Original Title" for all series will be set using info Shoko Relay added to the "Sort Title" (if available).
- Negative seasons like "Season -1" which contain Credits, Trailers, Parodies etc. will have their names updated to reflect their contents.
- The "Sort Title" for all collections will be set to match the current title to avoid Plex's custom sorting rules e.g. ignoring "The" or "A"
- All Smart Collections are ignored as they are not managed by Shoko Relay
  :::

### Rescan-Recent

- This is mostly used for quickly adding currently airing series to Plex that were unrecognized when initially imported into Shoko.
- Once the files are recognized running this script will trigger a rescan in Plex for any series that they are attached to.
- This requires Plex's partial scanning (or an alternative) to be enabled.

:::details Additional Information
**Requirements:**

- Python 3.7+, Requests Library (pip install requests), Plex, Shoko Server

**Preferences:**

- Before doing anything with this script you must enter your Shoko Server credentials into `config.py`.
- The Path Remapping section can be configured when running the scripts from a location where the paths differ from Shoko's.

**Usage:**

- Run in a terminal `rescan-recent.py` to trigger a Plex rescan of the 5 most recently added series in Shoko.
- Change the number of recently added series (from 1-99) to rescan with an argument when 5 isn't enough:
  - `rescan-recent.py 20` would rescan the 20 most recently added series
- Append the argument "import" `rescan-recent.py import` if you want to force shoko to import unrecognized files instead.
  :::

### Watched-Sync

- This script uses the Python-PlexAPI and Shoko Server to sync watched states from Plex to Shoko or Shoko to Plex.
- If something is marked as watched in Plex it will also be marked as watched in Shoko and AniDB.
- This was created due to various issues with Plex and Shoko's built in watched status syncing.
  - Primarily, the webhook for syncing requires Plex Pass and does not account for things manually marked as watched.

:::details Additional Information
**Requirements:**

- Python 3.7+, Python-PlexAPI (pip install plexapi), Requests Library (pip install requests), Plex, Shoko Relay, Shoko Server

**Preferences:**

- Before doing anything with this script you must enter your Plex and Shoko Server credentials into `config.py`.
- If your anime is split across multiple libraries they can all be added in a python list under Plex "LibraryNames".
  - It must be a list to work e.g. `'LibraryNames': ['Anime Shows', 'Anime Movies']`
- If you want to track watched states from managed/home accounts on your Plex server you can add them to Plex "ExtraUsers" following the same list format as above.
  - Leave it as "None" otherwise.
- If you don't want to track watched states from your Plex Server's Admin account set "SyncAdmin" to "False".
  - Leave it as "True" otherwise.

**Usage:**

- Run in a terminal `watched-sync.py` to sync watched states from Plex to Shoko.
- Append a relative date suffix as an argument to narrow down the time frame and speed up the process:
  - `watched-sync.py 2w` would return results from the last 2 weeks
  - `watched-sync.py 3d` would return results from the last 3 days
- The full list of suffixes (from 1-999) are: m=minutes, h=hours, d=days, w=weeks, mon=months, y=years
- Append the argument "import" `watched-sync.py import` if you want to sync watched states from Shoko to Plex instead.
  - By default the script will ask for (Y/N) confirmation for each configured Plex user.
  - This can be bypassed by adding the "force" flag (-f or --force).

**Behaviour:**

- Due to the potential for losing a huge amount of data removing watch states has been omitted from this script.
  :::
