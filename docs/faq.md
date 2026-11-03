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

:::details What Happened to Shoko Desktop?
**Shoko Desktop** is no longer supported. Shoko Server 6.0 dropped it, and Shoko Server 5.3.3 is the last release it
somewhat works with. There are no plans to bring it back, and none to add Linux or macOS support to it.

Use the [Web UI](/shoko-server/dashboard) to manage your collection, and one of the
[media server/player plugins](/getting-started/available-programs-plugins#media-server-player-plugins) for watching it.
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
While it's not possible to directly view and play your collection, you can utilize one of our media server/player plugins.
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

:::details I've Forgotten My Password — How Do I Reset It?
A forgotten password can be reset with a small file, without any direct database access. This works the same for the
CLI, Docker, and the Windows Tray Service.

1. Create a file named **password-reset.json** in your Shoko data folder (the folder containing
   `server-settings.json`) with the following content, replacing the values as needed:

   ```json
   { "username": "Default", "password": "NewPassword12" }
   ```

   The username is not case-sensitive.

2. Start the server. It will reset the password for that user, invalidate all of that user's existing API tokens
   (signed-in devices will need to sign in again), delete the file, and exit.

3. Start the server again. It boots normally and you can sign in with the new password.

If the server exits without resetting anything, the username didn't match any user — the file is kept, so you can
correct it and restart to try again. If the server starts normally and ignores the file, the file could not be read
(invalid JSON, missing username, or empty password); nothing was changed and your server stays online.

> [!WARNING]
> The new password is stored in plain text in the file until a successful reset deletes it. If the reset fails,
> delete the file yourself when you're done. Anyone with write access to your data folder can use this method, so
> don't expose that folder beyond what you need.
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
[Understanding AniDB Bans](/shoko-server/understanding-anidb-bans) page.
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

:::details I created a library with Shokofin, but it's empty.
Run **Dashboard** → **Libraries** → **Scan All Libraries** in Jellyfin. A new library using the Virtual File System (VFS)
only gets set up after a full library scan, and on Jellyfin 10.11 and later that scan doesn't start on its own when you
create or edit a library. Refreshing only the one library isn't enough. When the scan finishes, Shokofin starts a second
scan by itself, which fills the library. See
[The new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty) if it's still empty after that.
:::

:::details I changed a setting for Shokofin, but my library is not showing the new changes.
Existing items keep their old metadata until they're refreshed. Settings that only change metadata (titles,
descriptions, tags, images, ratings) need a metadata refresh with **Replace all metadata** selected. Settings that change
how shows, seasons and movies are built need the library to be re-created. The
[Change Impact](/jellyfin/configuring-shokofin#change-impact) table lists which is which, and
[Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely) shows how to re-create a library without losing watch
state.
:::

:::details Why are my series not being grouped according to my groups in Shoko?
Shokofin only uses your Shoko groups when the series use the **Shoko Group Structure**. Set
**Library** → **Basic Settings** → **Default Library Structure Mode** to **Shoko Group Structure** in the Shokofin
settings, or set **Library Structure Mode** for individual series on the **Series** tab. Then
[re-create the library](/jellyfin/how-to/re-create-a-library-safely).

If the grouping is still wrong, fix the group itself in the Shoko Web UI. See
[Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons#shoko-group-structure) and
[One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise).
:::

:::details Why are some of my shows getting incorrect metadata?
Make sure Shoko is the only metadata downloader enabled for the library. Jellyfin mixes metadata from every enabled
provider, and other providers often identify anime incorrectly. The recommended library setup is described in the
[Quick Start](/jellyfin/quick-start#creating-a-library).

After fixing the library options, refresh the library with **Replace all metadata** selected. If the data is wrong in
Shoko itself (for example a wrong TMDB link), fix it there first. See
[Metadata is wrong or mixed](/jellyfin/troubleshooting#metadata-is-wrong-or-mixed).
:::

:::details Images disappeared or Shokofin stopped working after updating Shoko Server
Your Shokofin and Shoko Server versions most likely don't match. Check the compatibility table on
[Installing Shokofin](/jellyfin/installing-shokofin) and install the matching version. A stable Shokofin release never works
with a Shoko Server development build. Until Shoko Server `6.0.0` is released, Shokofin development builds work with
both the latest stable Shoko Server and its development builds. Afterwards,
refresh the library with **Replace existing images** enabled. See
[Images are missing after updating Shoko Server](/jellyfin/troubleshooting#images-are-missing-after-updating-shoko-server).
:::

:::details My series settings came back after reinstalling the plugin
That's expected. The settings on Shokofin's **Series** tab, such as the library structure or season merging for a
series, are saved as custom tags on the series in Shoko Server, not in Jellyfin. They survive reinstalling Shokofin or
Jellyfin, and apply to every Jellyfin server connected to the same Shoko Server. Change or reset them from the **Series**
tab. See [Per-Series Settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings).
:::

:::details Do Jellyfin clients need access to Shoko Server?
No. Only the Jellyfin server talks to Shoko Server, and images are passed through Jellyfin. The **Public Host URL**
setting is optional and only used for the links to Shoko shown on item pages in Jellyfin. See
[Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies).
:::
