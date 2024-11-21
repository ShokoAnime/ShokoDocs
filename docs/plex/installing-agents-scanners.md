---
title: Installing Agents & Scanners
description: Information on how to install and configure Shoko Metadata & Shoko Relay.
---

<script setup>
const additionalOptionsColumns = [
  { name: 'Option', header: 'Option', width: '12em' },
  { name: 'Description', header: 'Description' }
];

const additionalOptionsData = [
  {
    Option: 'IncludeSpecials *Metadata Only*',
    Description: 'Files marked as specials in Shoko will be shown in the series as part of Season 0.'
  },
  {
    Option: 'IncludeOther *Metadata Only*',
    Description: 'Files marked as other in Shoko will be shown in the series as part of Season 0.'
  },
  {
    Option: 'SingleSeasonOrdering',
    Description: 'Episodes are no longer separated by seasons when matched with TMDB. All normal episodes are put into Season 1, specials into Season 0, and with Relay others into Negative Seasons.'
  }
];
</script>

# Installing Agents & Scanners

Both Shoko Metadata and Shoko Relay do not come with an installer. Please follow the manual installation instructions
below. This guide assumes you've installed Plex into the **default install directory**, so make adjustments as
needed to fit your installation.

Shoko Metadata and Shoko Relay are not stand-alone plugins; they depend on having Shoko Server installed, configured,
and running. If you haven't done so, [Download Shoko Server](https://shokoanime.com/downloads/) from our main
website and use the [Installing Shoko Server](/getting-started/installing-shoko-server) guide to properly
install and configure Shoko Server.

:::danger Nvidia Shield Compatibility
Detailed [here](https://forums.plex.tv/t/important-information-for-users-running-plex-media-server-on-nvidia-shield-devices/883484),
these plugins will not function when running Plex Media Server v1.41.0 or newer on an Nvidia Shield device. It is
possible to sideload an older PMS build to continue to use third-party plugins, but that will not be covered here.
:::

### Shoko Relay or Shoko Metadata?

Shoko Relay began as a fork/PR of Shoko Metadata, intended to introduce features that were absent in the original. Over
time, as more adjustments were made, it developed its own unique set of functionalities. This development was due to
differing opinions on what the plugin should include, leading to the creation of Shoko Relay. You can read a list of
the [Changes from Shoko Metadata](https://github.com/natyusha/ShokoRelay.bundle?tab=readme-ov-file#changes-from-shoko-metadata)
to decide which plugin you'd like to use.

Both plugins are outstanding for media playback; the decision essentially comes down to identifying which plugin best
suits your needs.

:::important
Make sure Plex Media Server is stopped before attempting to install the Agents and Scanners. Otherwise, a restart may be
necessary to make them work and appear in your Library settings.
:::

## Windows

Installing on Windows is pretty straightforward and requires minimal editing on your part. If you run into any issues,
retrace your steps and if you're still stuck, feel free to ask for help on our Discord server.

:::tip VSCode
We recommend doing the edits listed below in [VSCode](https://code.visualstudio.com/) or similar as Python is
space-sensitive and extra or missing spaces can break the file.
:::

### Shoko Relay

Before you continue, make sure that you have Shoko Server installed and running with your anime collection fully
recognized.

#### Install

1. Download and Extract the Plugin
    - Download
      the [Shoko Relay](https://github.com/natyusha/ShokoRelay.bundle/releases/latest/download/ShokoRelay.bundle.zip)
      bundle.
    - Extract the `.zip` file. You should have a folder named `ShokoRelay.bundle` after extraction.
2. Move the Plugin Folder
    - Move the `ShokoRelay.bundle` folder to the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Plug-ins
      ```
3. Install the Series Scanner
    - Note that Shoko Relay does not include a movie scanner (movies will work with it).
    - Navigate to the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Plug-ins\ShokoRelay.bundle\Contents
      ```
    - Move the `Scanners` folder into the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server
      ```

#### Editing Shoko Relay Scanner

1. Navigate to the Plex Series Scanners Directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Scanners\Series
      ```
2. Open the **Shoko Relay Scanner.py** File
3. Configure the Series Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
          'SingleSeasonOrdering': False
      }
      ```

Please see the [Series Scanner Advanced Settings](#series-scanner-advanced-settings) section for more information on
the advanced settings available for the series scanner.

### Shoko Metadata

Before you continue, make sure that you have Shoko Server installed and running with your anime collection fully
recognized.

#### Install

1. Download and Extract the Plugin
    - Download the [Shoko Metadata](https://shokoanime.com/downloads/) plugin.
    - Extract the `.zip` file. You should have a folder named `ShokoMetadata.bundle-1.5.1` after extraction.
2. Rename the Folder
    - The extracted folder will have a suffix, remove it by renaming the folder to:
      ```cmd
      ShokoMetadata.bundle
      ```
3. Move the Plugin Folder
    - Move the `ShokoMetadata.bundle` folder to the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Plug-ins
      ```
4. Install the Scanners
    - If you haven't installed custom scanners before, you may need to manually create a `Scanners` folder in
      the Plex Media Server directory.
    - Navigate to the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Plug-ins\ShokoMetadata.bundle\Contents\Resources
      ```
    - Move the `Movie` and `Series` scanner folders into the following directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Scanners
      ```

#### Editing Shoko Movie Scanner

1. Navigate to the Plex Movies Scanners directory:
    ```cmd
    %LOCALAPPDATA%\Plex Media Server\Scanners\Movies
    ```
2. Open the **Shoko Movie Scanner.py** File
3. Configure the Movies Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
      }
      ```

#### Editing Shoko Series Scanner

1. Navigate to the Plex Series Scanners Directory:
      ```cmd
      %LOCALAPPDATA%\Plex Media Server\Scanners\Series
      ```
2. Open the **Shoko Series Scanner.py** File
3. Configure the Series Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
          'IncludeSpecials': True,
          'IncludeOther': True,
          'SingleSeasonOrdering': False
      }
      ```

Please see the [Series Scanner Advanced Settings](#series-scanner-advanced-settings) section for more information on
the advanced settings available for the series scanner.

## Linux

Getting everything configured on Linux is a bit more involved than on Windows, but it's still relatively simple. If you
run into any issues, retrace your steps and if you're still stuck, feel free to ask for help on our Discord server.

### Prerequisite Steps

First, we will assign an environment variable `$PLEX_HOME` that will point to the base directory for your Plex content.
This will make it easier to follow the guide, regardless of the Plex installation method.

Below are the three most common installation methods, and what you need to do for each one before you continue with the
rest
of the guide.

:::warning Custom Installations
If you installed Plex using another method, then please assign the variable to your own, and make sure to use the
correct user when executing the
steps listed below.
:::

#### Bare-Metal Variable

Sign in with **the user responsible for running PMS** (replace `<username>` with the according username) and
assign the variable:

```sh
sudo -u <username> -s /bin/sh
export PLEX_HOME="/var/lib/plex/Plex Media Server"
```

Some distributions may install Plex to a different base directory, or if you're running a custom install of Plex,
then either make sure or tweak the above variable to lead to your **Plex Media Server** directory.
If the above variable is not set correctly, then the guide will fail at the first step.

#### Snap (plexmediaserver) Variable

Sign in as `root` on your host-system and assign the variable:

```sh
sudo -s /bin/sh
export PLEX_HOME="/var/snap/plexmediaserver/common/Library/Application Support/Plex Media Server"
```

#### Docker (plexinc/pms-docker)

:::warning Variable Selection
This section assumes you're using the official docker image (plexinc/pms-docker). If you're using any other image,
(e.g. linuxserver/plex), then either make sure or tweak the above variable to lead to your **Plex Media Server**
directory. If the above variable is not set correctly, then the guide will fail at the first step.
:::

Attach to the running **PMS container** (replace `<container name>` accordingly) and and assign the variable:

```sh
docker exec -it <container name> /bin/sh
export PLEX_HOME="/config/Library/Application Support/Plex Media Server"
```

### Shoko Relay

Before you continue, make sure that you have Shoko Server installed and running with your anime collection fully
recognized.

#### Install

1. Navigate to the Plug-ins Directory
    - Open a terminal and navigate to the `Plug-ins` directory of your Plex installation:
      ```sh
      cd "${PLEX_HOME}/Plug-ins";
      ```
2. Download and Extract the Bundle
    - Use one of the following commands to download and extract the latest Shoko Relay bundle from GitHub:
      ```sh title="Using curl"
      curl -L https://github.com/natyusha/ShokoRelay.bundle/releases/latest/download/ShokoRelay.bundle.tar.gz | tar -xzf -
      ```
      ```sh title="Using wget"
      wget -O - https://github.com/natyusha/ShokoRelay.bundle/releases/latest/download/ShokoRelay.bundle.tar.gz | tar -xzf -
      ```
3. Move the Series Scanner
    - Copy the `Scanners` folder from the extracted bundle to the `${PLEX_HOME}` directory:
      ```sh
      cp -R ShokoRelay.bundle/Contents/Scanners ../
      ```

#### Editing Shoko Relay Scanner

1. Open the **Shoko Relay Scanner.py** File
      ```sh
      ${EDITOR:-nano} "${PLEX_HOME}/Scanners/Series/Shoko Relay Scanner.py"
      ```
2. Configure the Series Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
          'SingleSeasonOrdering': False
      }
      ```

Please see the [Series Scanner Advanced Settings](#series-scanner-advanced-settings) section for more information on
the advanced settings available for the relay scanner.

### Shoko Metadata

Before you continue, make sure that you have Shoko Server installed and running with your anime collection fully
recognized.

#### Install

1. Navigate to the Plug-ins Directory
    - Open a terminal and navigate to the `Plug-ins` directory of your Plex installation:
      ```sh
      cd "${PLEX_HOME}/Plug-ins";
      ```
2. Download and Extract the Bundle
    - Use one of the following commands to download and extract the latest Shoko Metadata bundle from GitHub:
      ```sh title="Using curl"
      curl -L https://github.com/Cazzar/ShokoMetadata.bundle/archive/master.tar.gz | tar -xzf -
      ```
      ```sh title="Using wget"
      wget -O - https://github.com/Cazzar/ShokoMetadata.bundle/archive/master.tar.gz | tar -xzf -
      ```
3. Rename the Folder
    - The extracted folder will have a suffix, remove it by renaming the folder:
      ```sh
      mv ShokoMetadata.bundle-master ShokoMetadata.bundle
      ```
4. Ensure that the Scanners Directory Exists
    - Make sure the `Scanners` directory exists in the base Plex Media Server directory:
      ```sh
      mkdir -p "${PLEX_HOME}/Scanners"
      ```
5. Move the Scanners
    - Copy the scanners from the extracted bundle to the `Scanners` directory:
      ```sh
      cp -R ShokoMetadata.bundle/Contents/Resources/* ../Scanners/
      ```

#### Editing Shoko Movie Scanner

1. Open the **Shoko Movie Scanner.py** file:
    ```sh
    ${EDITOR:-nano} "${PLEX_HOME}/Scanners/Series/Shoko Movie Scanner.py"
    ```
3. Configure the Movies Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
      }
      ```

#### Editing Shoko Series Scanner

1. Open the **Shoko Series Scanner.py** file:
    ```sh
    ${EDITOR:-nano} "${PLEX_HOME}/Scanners/Series/Shoko Series Scanner.py"
    ```
3. Configure the Series Scanner
    - Make adjustments to the Prefs section to align it with your Shoko configuration.
    - For most users, you'll only need to update the username and password fields:
      ```py
      Prefs = {
          'Hostname': '127.0.0.1',
          'Port': 8111,
          'Username': 'username',
          'Password': 'password',
          'IncludeSpecials': True,
          'IncludeOther': True,
          'SingleSeasonOrdering': False
      }
      ```

## Series Scanner Advanced Settings

You may have noticed that the series scanner provides a broader range of options compared to the movie scanner.
These additional options are detailed below.

<EasyTable :columns="additionalOptionsColumns" :data="additionalOptionsData" />
