---
title: Frequently Asked Questions
description: A list of some of the most commonly asked questions about Shoko.
---

<script setup>
const osLocationColumns = [
  { name: 'OS', header: 'OS' },
  { name: 'Location', header: 'Location' }
];

const osLocationData = [
  {
    OS: 'Windows',
    Location: 'C:\\ProgramData\\ShokoServer'
  },
  {
    OS: 'Linux/macOS',
    Location: '~/.shoko/Shoko.CLI/'
  }
];
</script>

# Frequently Asked Questions

Listed below are some of the most commonly asked questions by new users about Shoko.These inquiries cover a broad
spectrum of topics, ranging from its essential features to the support for various plugins

## General

:::details What Are The System Requirements?
While Shoko itself does not have any minimum requirement and could technically run on just about any hardware setup,
we do have some general guidelines for optimal performance.

**Collection Size:**

Shoko works with collections of all sizes, however its important to keep in mind that the larger your collection,
the more resources Shoko will need to use.

**Hashing Process:**

Hashing is a resource-intensive operation that involves significant CPU and I/O usage, as the entire file needs to
be read and processed. If time is not a critical factor and you are willing to trade off processing speed, the
hashing process can be performed on lower-spec systems. However, it's important to be aware that hashing large files
on lower-spec systems may result in slower performance and longer processing times.

When running Shoko on your NAS, hashing might also impact the overall (RAID) performance of the device.

**CPU:**

We suggest running Shoko on any modern amd64/x86_64 CPUs for optimum experience.

Users attempting to run Shoko on ARM devices such as Raspberry Pi's and similar ones will take significant
performance hits and will experience less than optimal performance. See the
**Can Shoko Server Run on ARM/Apple M processors?** question below for additional info involving other
platforms than amd64/x86_64.

**Memory (RAM):**

To ensure smooth operations, it is recommended to allocate at least 1GB of dedicated RAM to the system. Keep in mind
that during the hashing process, RAM usage can increase significantly. Users with limited memory on their systems
may experience slowdowns and delays in processes.
:::

:::details What About Shoko Desktop on Linux/MacOS?
There are no plans to add Linux or MacOS support to **Shoko Desktop** as it is being phased out.
:::

:::details Does Shoko Support Adult Content?
Yes, Shoko can process your adult content provided there is a relevant entry on AniDB for it. However, certain
metadata sites may not support it so its possible you'll be missing additional information.

Please note, Shoko does not allow you to add custom entries for unsupported content nor is this a planned feature.
:::

:::details Does Shoko Support Streaming From Different Websites?
No, Shoko does not support streaming directly from websites such as Crunchy Roll.
:::

:::details Does Shoko Allow Me to Stream my Collection?
While it's not possible to directly view and play your collection, you can utilize one of our media player plugins.
These plugins make your collection both viewable and playable in the specified media player.
:::

:::details Does Shoko Have a Public API?
Yes it does!

With Shoko Server running, navigate to **/swagger/** to see a list of all available endpoints. Additionally, each
endpoint can be tested once you authenticate if you're curious on the data returned by said endpoint.
:::

## Shoko Server

:::details Does Shoko Server Run on Linux/NAS?
Using [Docker](https://www.docker.com/) you can run **Shoko Server** natively on Linux or your NAS device.

We've created a [Server Install Guide](/getting-started/installing-shoko-server) that we highly recommend all users
to follow to properly install and configure Shoko Server.

If needed, additional support can be found by visiting our **Discord Server**.
:::

:::details Can Shoko Server Run on ARM/Apple M processors?
Running Shoko Server natively on certain systems, such as those with ARM or Apple M processors, can lead to
challenges, including missing libraries and other unforeseen issues. To mitigate these problems, you can use
[Docker](https://www.docker.com/), which allows you to run **Shoko Server** on your device within a container.
This approach ensures that all necessary libraries are available.

However, it's important to note that running Shoko Server on ARM/Apple M devices is **not officially supported**
at this time as our team is focusing on other priorities. Consequently, you may encounter issues that we are unable
to assist with.

With that said, we have **untested builds** available on [GitHub](https://github.com/ShokoAnime/ShokoServer/releases)
and encourage ARM64 users to try it out.
:::

:::details How Do I Backup My Collection?
While we currently do not offer a solution to backup your database whenever you'd like, we do automatically backup
your database before updating Shoko to the latest version. If you need to restore an older version you'll find your
backups in the following locations.

<EasyTable :columns="osLocationColumns" :data="osLocationData" />

The directory for Linux/macOS might differ, if you changed it on the Docker commandline during
[installation](/getting-started/installing-shoko-server).
:::

:::details I've Been Banned From AniDB?
The message you're encountering indicates a **temporary ban** due to excessive connection attempts. AniDB imposes such
bans when it suspects data leeching through numerous rapid connection attempts. In reality, this doesn't imply any
wrongdoing on your part. You simply need to wait for the ban to lift, which can range from 15 minutes to 24 hours,
depending on severity.

AniDB's API imposes two distinct types of bans, namely **HTTP and UDP**. In case a user receives a temporary ban for one
of these, Shoko will automatically cease sending data associated with the banned API. However, it will continue to
utilize the other API whenever feasible. It's important to note that this doesn't guarantee that all your commands
will be executed successfully since each API handles different sets of data. As a result, you may notice your queue
idling even when there are pending commands awaiting processing.

For more information on AniDB bans and how to minimize them, check the
[Understanding AniDB Bans](/shoko-server/understanding-anidb-ban) page.
:::

## Shoko Metadata / Shoko Relay

:::details I'm Missing Posters/Information In Plex When Using ShokoMetadata?
This can happen when a problem occurs while scanning files and downloading the respective metadata.

To fix this, please follow these steps:

1. Unmatch the Series/Movie in question (you can find that in the Context menu for the entry, usually accessible by
   clicking the 3 Dots)
2. Create a file called **.plexignore** in the folder of the Series/Movie, which only contains "\*"
3. Rescan your library, the Series/Movie should get removed
4. Run package clean up (found under Settings -> Trouble Shooting of the Plex Media Server) as well as database
   optimization
5. Remove the .plexignore file
6. Rescan your library
7. All media files and information should now be available and properly displayed.

If you still have problems after following those steps, feel free to hop on our discord.
:::

:::details Series Are Not Being Grouped Properly / Episode Imported But Not Showing Up
Its important to remember that even though Shoko is providing Metadata to Plex, you still need to follow Plex naming
conventions for folder and filenames.

We recommend not nesting related series and instead keeping your folder structure flat and naming said folders
similar to how AniDB names the series. Here is an example of folder structure and naming for one of the more
problematic series.

```txt
- Jujutsu Kaisen (2023)
- Jujutsu Kaisen
- Jujutsu Kaisen 0
```

Here is an example of how you would name a file for Jujutsu Kaisen (2023).

```txt
Jujutsu Kaisen (2023) - 01.mkv
```

:::

## Shokofin

:::details I changed a setting for Shokofin, but my library is not showing the new changes.
Some changes to the plugin settings may require you to do a full metadata refresh or to even recreate the library. In
general if metadata feels like it's missing or should be updated, run a full metadata refresh or recreate the library if
that didn't help. See the following pages for more information on
[metadata refreshes](/jellyfin/recommendations/#refreshing-metadata) and
[library re-creation](/jellyfin/recommendations/#library-re-creation-is-your-friend).
:::

:::details Why are my series not being grouped according to my collections in Shoko?
First, make sure that "Use Shoko groups for shows" is enabled in the plugin settings. If you are not using the VFS, you
will need to make sure your files are organized in a way that Jellyfin prefers in an AniDB-compatible way as mentioned
in the Shokofin Recommendations page [here](/jellyfin/recommendations/#jellyfins-file-structure-requirements).
Whether you are using the VFS feature or not, a library re-creation can fix any grouping issues. More info on library
creation can be found in the [Shokofin Recommendations](/jellyfin/recommendations/#library-re-creation-is-your-friend)
page.
:::

:::details Why are some of my shows getting incorrect metadata?
Make sure that you are only using Shoko as the metadata provider for your your library. The recommended way to setup a
library using Shokofin can be found in [Configuring Shokofin](/jellyfin/configuring-shokofin/#creating-a-shoko-library).
Using multiple metadata providers can cause issues since Jellyfin will mix metadata it finds from all the providers in
order of priority set which might not always apply the correct metadata. Refreshing all metadata or even re-creating
the library can fix incorrect metadata so long as Shoko Server has identified everything properly in the first place
and if Shoko is set as the only provider for the library. See the following pages for more information on
[metadata refreshes](/jellyfin/recommendations/#refreshing-metadata) and
[library re-creation](/jellyfin/recommendations/#library-re-creation-is-your-friend).
:::
