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

Listed below are some of the most commonly asked questions by new users about Shoko. These inquiries cover a broad
spectrum of topics, ranging from its essential features to the support for various plugins.

## General

### What Are The System Requirements? {#system-requirements}

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

### What Happened to Shoko Desktop? {#shoko-desktop}

**Shoko Desktop** is no longer supported. Shoko Server 6.0 removed the API it relied on, because none of that API
required signing in: anyone who could reach the server could use it. Shoko Server 5.3.3 is the last release Shoko
Desktop somewhat works with. There are no plans to bring it back, and none to add Linux or macOS support to it.

Use the [Web UI](/shoko-server/dashboard) to manage your collection, and one of the
[media server/player plugins](/getting-started/available-programs-plugins#media-server-player-plugins) for watching it.

### Does Shoko Support Adult Content? {#adult-content}

Yes, Shoko can process your adult content provided there is a relevant entry on AniDB for it. However, certain
metadata sites may not support it so its possible you'll be missing additional information.

### Does Shoko Support Streaming From Different Websites? {#streaming-websites}

No, Shoko does not support streaming directly from websites such as Crunchy Roll.

### Can I Stream My Collection? {#stream-your-collection}

Yes, in a few ways. The usual one is a
[media server/player plugin](/getting-started/available-programs-plugins#media-server-player-plugins), which makes
your collection browsable and playable in that media server or player, such as Jellyfin, Plex or Kodi.

Playing in a browser depends on your setup: it needs a plugin that can convert your files into something the browser
can play, and a web UI that can use it.

### Does Shoko Have a Public API? {#public-api}

Yes it does!

With Shoko Server running, open `/swagger/` on it to see every route of the API and try them out. See
[Use the API with Swagger](/api/use-the-api-with-swagger).

## Shoko Server

### Does Shoko Server Run on Linux/NAS? {#linux-and-nas}

Using [Docker](https://www.docker.com/) you can run **Shoko Server** natively on Linux or your NAS device.

We've created a [Server Install Guide](/getting-started/installing-shoko-server) that we highly recommend all users
to follow to properly install and configure Shoko Server.

If needed, additional support can be found by visiting our **Discord Server**.

### Can Shoko Server Run on ARM/Apple M processors? {#arm-and-apple-silicon}

**ARM:** yes. Shoko Server runs on 64-bit ARM (aarch64) Linux, natively or in [Docker](https://www.docker.com/), and
AVDump works there too.

**Apple M (macOS):** Shoko Server runs, with a few things to know:

- There's only a framework-dependent build, so install the .NET runtime it's built for first.
- Install MediaInfo, which Shoko needs to read your files' streams. Homebrew has it: `brew install media-info`.
- AVDump doesn't work on macOS: Shoko installs the same AVDump build on every system, and that build has nothing for
  macOS. So you can't [add files to AniDB](/shoko-server/how-to/fix-an-unrecognized-file#add-it-to-anidb-with-avdump)
  from Shoko.
- RHash is optional. Without it, Shoko hashes files with its own built-in hasher instead.

macOS isn't one of the officially supported platforms, so expect rough edges.

### How Do I Backup My Collection? {#back-up-your-collection}

There's no button to back up on demand. To take a backup, stop Shoko Server and copy its whole data folder, found in
the locations below. See [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server)
for what's in it, how to restore it, and how to move Shoko Server to another machine.

<EasyTable :columns="osLocationColumns" :data="osLocationData" />

On Docker, the data folder is the `Shoko.CLI` folder inside the folder you mounted at `/home/shoko/.shoko` during
[installation](/getting-started/installing-shoko-server), or that folder itself if you set
`SHOKO_HOME=/home/shoko/.shoko`.

Shoko Server also backs up the database by itself before an upgrade changes it, into the `DatabaseBackup` folder inside
the data folder.

### I've Forgotten My Password — How Do I Reset It? {#reset-your-password}

A forgotten password can be reset with a small file, without any direct database access. This works the same for the
CLI, Docker, and the Windows Tray Service.

1. Create a file named **password-reset.json** in your Shoko data folder (the folder containing
   `settings-server.json`) with the following content, replacing the values as needed:

   ```json
   { "username": "Default", "password": "NewPassword12" }
   ```

   The username is not case-sensitive. By default the data folder is `C:\ProgramData\ShokoServer` for the Windows Tray
   Service, `C:\ProgramData\Shoko.CLI` for the CLI on Windows, and `~/.shoko/Shoko.CLI` on Linux and macOS. With
   Docker, it's the `Shoko.CLI` folder inside the host folder you mounted at `/home/shoko/.shoko`. If you set
   `SHOKO_HOME`, it's the folder that points to.

2. Start the server. It will reset the password for that user, invalidate all of that user's existing API tokens
   (signed-in devices will need to sign in again), delete the file, and exit. A Docker container stops too; start it
   again with `docker compose up -d` or your container manager's restart.

3. Start the server again. It boots normally and you can sign in with the new password.

If the server exits without resetting anything, the username didn't match any user. The log says
*"Password reset requested for username '…', but no such user was found"*, and the file is kept, so you can correct it
and restart to try again. If the server starts normally and ignores the file, the file could not be read (invalid JSON,
missing username, or empty password); nothing was changed and your server stays online. Fix or delete the file, then
restart.

> [!WARNING]
> The new password is stored in plain text in the file until a successful reset deletes it. If the reset fails,
> delete the file yourself when you're done. Anyone with write access to your data folder can use this method, so
> don't expose that folder beyond what you need.

### I've Been Banned From AniDB? {#anidb-ban}

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

## Shoko Metadata / Shoko Relay

### I'm Missing Posters/Information In Plex When Using ShokoMetadata? {#plex-missing-posters}

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

### Series Are Not Being Grouped Properly / Episode Imported But Not Showing Up {#plex-grouping}

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

## Shokofin

### I created a library with Shokofin, but it's empty. {#shokofin-empty-library}

Run **Dashboard** → **Libraries** → **Scan All Libraries** in Jellyfin. A new library using the Virtual File System (VFS)
only gets set up after a full library scan, and on Jellyfin 10.11 and later that scan doesn't start on its own when you
create or edit a library. Refreshing only the one library isn't enough. When the scan finishes, Shokofin starts a second
scan by itself, which fills the library. See
[The new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty) if it's still empty after that.

### I changed a setting for Shokofin, but my library is not showing the new changes. {#shokofin-setting-not-applied}

Existing items keep their old metadata until they're refreshed. Settings that only change metadata (titles,
descriptions, tags, images, ratings) need a metadata refresh with **Replace all metadata** selected. Settings that change
how shows, seasons and movies are built need the library to be re-created. The
[Change Impact](/jellyfin/configuring-shokofin#change-impact) table lists which is which, and
[Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely) shows how to re-create a library without losing watch
state.

### Why are my series not being grouped according to my groups in Shoko? {#shokofin-grouping}

Shokofin only uses your Shoko groups when the series use the **Shoko Group Structure**. Set
**Library** → **Basic Settings** → **Default Library Structure Mode** to **Shoko Group Structure** in the Shokofin
settings, or set **Library Structure Mode** for individual series on the **Series** tab. Then
[re-create the library](/jellyfin/how-to/re-create-a-library-safely).

If the grouping is still wrong, fix the group itself in the Shoko Web UI. See
[Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons#shoko-group-structure) and
[One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise).

### Why are some of my shows getting incorrect metadata? {#shokofin-incorrect-metadata}

Make sure Shoko is the only metadata downloader enabled for the library. Jellyfin mixes metadata from every enabled
provider, and other providers often identify anime incorrectly. The recommended library setup is described in the
[Quick Start](/jellyfin/quick-start#creating-a-library).

After fixing the library options, refresh the library with **Replace all metadata** selected. If the data is wrong in
Shoko itself (for example a wrong TMDB link), fix it there first. See
[Metadata is wrong or mixed](/jellyfin/troubleshooting#metadata-is-wrong-or-mixed).

### Images disappeared or Shokofin stopped working after updating Shoko Server {#shokofin-after-server-update}

Your Shokofin and Shoko Server versions most likely don't match. Check the compatibility table on
[Installing Shokofin](/jellyfin/installing-shokofin) and install the matching version. A stable Shokofin release never works
with a Shoko Server development build. After installing the matching version,
refresh the library with **Replace existing images** enabled. See
[Images are missing after updating Shoko Server](/jellyfin/troubleshooting#images-are-missing-after-updating-shoko-server).

### My series settings came back after reinstalling the plugin {#shokofin-settings-came-back}

That's expected. The settings on Shokofin's **Series** tab, such as the library structure or season merging for a
series, are saved as custom tags on the series in Shoko Server, not in Jellyfin. They survive reinstalling Shokofin or
Jellyfin, and apply to every Jellyfin server connected to the same Shoko Server. Change or reset them from the **Series**
tab. See [Per-Series Settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings).

### Do Jellyfin clients need access to Shoko Server? {#jellyfin-clients-access}

No. Only the Jellyfin server talks to Shoko Server, and images are passed through Jellyfin. The **Public Host URL**
setting is optional and only used for the links to Shoko shown on item pages in Jellyfin. See
[Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies).
