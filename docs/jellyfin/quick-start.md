---
title: Quick Start | Jellyfin
description: Connect Shokofin to Shoko Server and create your first Shoko-powered Jellyfin library.
---

# Quick Start

This page takes you from a freshly installed plugin to a working anime library. It assumes Shokofin is already
[installed](/jellyfin/installing-shokofin) and that Shoko Server has identified the files you want to show in Jellyfin.

## Connecting to Shoko Server

Open the Shokofin settings in the Jellyfin dashboard (**Dashboard** → **Plugins** → **Shoko**). Every tab except
**Connection** stays hidden until the plugin is connected.

1. Enter the **Private Host URL**. This is the address Jellyfin uses to reach Shoko Server, including the scheme and the
   port, for example `http://192.168.1.20:8111`. Always write the full URL: a URL with a scheme but no port uses the
   scheme's default port (80 for `http://`), not `8111`.
2. Leave **Public Host URL** empty unless you want the "Shoko" links on item pages to open a different address than the
   private one (for example when Jellyfin is used from outside your home network). It is not used for images; those are
   always served through Jellyfin.
3. Enter the **Username** and **Password** of a Shoko Server account with **Administrator** rights, then click
   **Connect**.

Once connected, the **Server Version** field shows the Shoko Server version and the remaining tabs appear.

:::tip Running Jellyfin in Docker?
Inside a container, `localhost` points at the Jellyfin container itself, not at Shoko Server. Use the Shoko container
name or the host's IP address instead. See [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies).
:::

:::info Why an administrator account?
Shokofin reads server settings, lists your managed folders, and saves per-series settings as custom tags on Shoko Server.
Those actions require an administrator account. To sync watch state for individual people, you can link each Jellyfin
user to a normal Shoko account later; see [Sync Watch State](/jellyfin/how-to/sync-watch-state).
:::

Your password is not stored. Shokofin exchanges it for an API key, which you can find in the Shoko Web UI under
**Settings** → **API Keys** as **Shoko Jellyfin Plugin (Shokofin)**. If you ever delete that key, click **Disconnect**
in the plugin settings and connect again.

## Choose Your Defaults First

A few settings decide how your library is laid out on disk and in Jellyfin. Changing them later means
[re-creating the library](/jellyfin/how-to/re-create-a-library-safely), so take a minute to decide before you create one. The
defaults work well for most people.

- **Library structure**: keep **AniDB Anime Structure** (one show per AniDB entry) unless you have a reason to change it.
  It is the most direct mapping of your Shoko data and the fastest, since it needs the fewest requests to Shoko Server.
  The alternatives are one show per Shoko group (arrange your groups in Shoko first, see
  [Managing Groups](/shoko-server/collection#managing-groups)), or TMDB shows and seasons, which requires every AniDB entry to be
  properly linked to TMDB in Shoko Server. See
  [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons#choosing-a-structure).
- **Library operation mode**: keep the Virtual File System (VFS), which means your files can be organised any way you
  like on disk. See [The Virtual File System](/jellyfin/concepts/virtual-file-system).

:::warning Windows Users
The VFS is built from symbolic links, and Windows only lets regular programs create them when
[Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device)
is enabled. Shokofin tests this when Jellyfin starts. If it fails on a fresh install, the default library operation mode
becomes **Legacy Filtering (Strict)** instead of the VFS. On an existing install the setting is left alone, and scans of
VFS libraries fail until Developer Mode is on. Either way, enable it and restart Jellyfin before you create the library
if you want the VFS.
:::
- **Specials placement**: specials stay in their own "Specials" season by default. See
  [Place Specials & Extras](/jellyfin/how-to/place-specials-and-extras).
- **Movies**: decide whether movies should appear inside your shows library or in a separate movies library. See
  [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies).

Title, description, image, tag and rating settings can be changed at any time; a metadata refresh applies them. The
[Change Impact](/jellyfin/configuring-shokofin#change-impact) table lists what each setting needs.

## Creating a Library

Create a new library for your anime rather than enabling Shokofin on an existing one. Go to **Dashboard** →
**Libraries** and add a new library. The options below matter for Shokofin; anything not mentioned can be set to your
preference.

![Shokofin - Library Dashboard](/images/shokofin/Shokofin-Library-Dashboard.png)

### Content Type

![Shokofin - Library Settings - Content Type](/images/shokofin/Shokofin-Library-Content-Type.png)

Choose **Shows** for most setups. Anime movies still appear inside a Shows library unless you enable **Separate Movies
from Shows**, in which case you also create a **Movies** library for them.

**Mixed Movies and Shows** is technically supported, but discouraged: Jellyfin's own support for mixed libraries is
lacking, and features such as trickplay and chapter information aren't available in them. Use a **Shows** library, plus
a **Movies** library if you separate movies. Other content types are not supported, and Shokofin ignores those libraries.

### Folders

![Shokofin - Library Settings - Folders](/images/shokofin/Shokofin-Library-Folders.png)

Add the folders that contain your anime, as Jellyfin sees them. They don't have to use the same paths as Shoko Server;
Shokofin matches them to your Shoko managed folders by looking at the files inside. What must match is the folder
structure *below* the folder you add. For example, if Shoko knows a managed folder as `D:\Anime` and Jellyfin sees the
same disk at `/mnt/anime`, add `/mnt/anime` (or a sub-folder such as `/mnt/anime/Series`).

When the library uses the VFS, Shokofin replaces the folders shown here with its own generated folder after the first
scan. You don't have to add the VFS folder yourself. The folders you added, and how each one is mapped to Shoko,
are listed in the plugin settings under **Library** → **Library Settings**. See
[Media Folder Mapping](/jellyfin/concepts/media-folder-mapping) for details.

### Language and Country

![Shokofin - Library Settings - Language and Country](/images/shokofin/Shokofin-Library-Lang-and-Country.png)

The **preferred download language** is used by every title, description and image option that follows the library's
metadata language, for example **AniDB | Follow metadata language in library**. The **country/region** decides which
TMDB content rating is used. See [Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language).

### Embedded Info

![Shokofin - Library Settings - Embedded Info](/images/shokofin/Shokofin-Library-Embedded-Info.png)

Leave both options disabled. Embedded titles and info from the files would mix with the metadata Shokofin provides.

### Real Time Monitoring

![Shokofin - Library Settings - Real Time Monitoring](/images/shokofin/Shokofin-Library-Real-Time-Monitoring.png)

Leave this **off** if you use Shokofin's SignalR **File Events** for the library, which is what we recommend. Don't
enable both on the same library:

- Jellyfin can only show files Shoko has already recognized. If Jellyfin notices a new file before Shoko does, it can't
  show it yet anyway.
- If Shoko has recognized the file but Jellyfin hasn't noticed it, SignalR file events take care of it.
- If both notice the file, nothing is gained, and the file watching is doubled.

See [New Episodes Automatically](/jellyfin/how-to/new-episodes-automatically).

### Metadata Downloaders

![Shokofin - Library Settings - Metadata Downloaders](/images/shokofin/Shokofin-Library-Metadata-Downloaders.png)

Enable **Shoko** and disable every other metadata downloader, for every item type. Shokofin ignores a library entirely
unless **Shoko** is enabled here, and other providers tend to misidentify anime and mix their metadata into yours.

### Automatically Refresh Metadata

![Shokofin - Library Settings - Automatically Refresh](/images/shokofin/Shokofin-Library-Automatically-Refresh.png)

Optional. If you keep Shokofin connected over SignalR, it can refresh entries on demand when Shoko Server updates their
metadata, which makes periodic refreshes less necessary.

### Similar Item Providers <Badge type="tip" text="Next release" />

![Shokofin - Library Settings - Similar Item Providers](/images/shokofin/Shokofin-Library-Similar-Items.png)

Jellyfin 12 added this section, so you won't see it on 10.10 or 10.11. It decides where the "More Like This"
suggestions on an item come from.

Tick **Shoko** and untick **Local Genre/Tag**, so suggestions come from the metadata sources Shoko already keeps,
AniDB's similar anime and TMDB's recommendations, rather than from tag overlap. **Shoko** only appears when your Shoko
Server is new enough to serve suggestions.

A series suggests other series, and a movie other movies. Jellyfin matches these to your library by provider, and it
only looks at items of the same type, so a series never suggests the film that continues it.

### Metadata Savers

![Shokofin - Library Settings - Metadata Savers](/images/shokofin/Shokofin-Library-Metadata-Savers.png)

:::danger Important
With the VFS, NFO files written into the generated folder are removed automatically, and NFO files in your real media
folders are ignored.

If you are **not** using the VFS, **do not** enable NFO metadata saving, and delete any `.nfo` files already in your
anime folders. Jellyfin prefers NFO files over every metadata provider, so Shokofin can't correct anything stored in
them.

Find and delete NFO files with one of these commands. Substitute the path to your library.

###### Windows (PowerShell):

```powershell
Get-ChildItem -Path 'C:\path\to\library\' -Recurse -Filter '*.nfo' | Remove-Item
```

###### Linux:

```sh
find /path/to/library/ -name "*.nfo" -type f -delete
```

:::

### Image Fetchers

![Shokofin - Library Settings - Image Fetchers](/images/shokofin/Shokofin-Library-Image-Fetchers.png)

Enable **Shoko** and move it to the top for every item type. Other image fetchers can add incorrect images; **Screen
Grabber** is known to work well alongside Shokofin for episode thumbnails.

### Saving Artwork Into Media Folders

![Shokofin - Library Settings - Saving Artwork](/images/shokofin/Shokofin-Library-Saving-Artwork.png)

With the VFS, leave this disabled. Artwork would be saved inside the generated VFS folder, where it is lost whenever the
library is rebuilt. Without the VFS it's up to you.

### Saving Trickplay Images Next to Media

![Shokofin - Library Settings - Saving Trickplay](/images/shokofin/Shokofin-Library-Saving-Trickplay.png)

Enable this. With the VFS, Shokofin moves trickplay folders next to your real files and links them back, so they survive
a library re-creation. If the media folder is read-only, the trickplay files stay in the VFS instead.

### Merge Series Across Folders

![Shokofin - Library Settings - Merge Series](/images/shokofin/Shokofin-Library-Merge-Series.png)

With the VFS this has no effect. Without the VFS, enable it so Shokofin can group episodes into series regardless of
which folder they're in.

### Your First Scan

Save the library. With the VFS, setting up a new library takes two full library scans:

1. **Start the first scan yourself.** On Jellyfin 10.11 and later, go to **Dashboard** → **Libraries** and click
   **Scan All Libraries** once the library has been created. Jellyfin 10.10 starts this scan on its own. During this
   scan Shokofin maps your folders to Shoko and prepares the VFS, but the library stays empty. When it finishes,
   Shokofin swaps the library's folders for the VFS.
2. **The second scan fills the library.** Shokofin starts it automatically as soon as the first one has finished.

:::danger Don't skip the first Scan All Libraries
On Jellyfin 10.11 and later nothing happens until you run **Scan All Libraries**, and the library stays empty. Refreshing
only this one library doesn't count either: Shokofin still swaps the folders, but no follow-up scan is started, so
nothing shows up until the next full scan.

The same applies after you add or remove media folders in a VFS library.
:::

Large collections can take a while; progress shows on the dashboard. If the library stays empty after the second scan,
see [The new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty).

## Next Steps

- [Sync Watch State](/jellyfin/how-to/sync-watch-state) with Shoko for each Jellyfin user.
- Make [New Episodes Automatically](/jellyfin/how-to/new-episodes-automatically) appear.
- Get [Titles & Artwork in Your Language](/jellyfin/how-to/titles-and-artwork-in-your-language).
- Show [One Show for a Whole Franchise](/jellyfin/how-to/one-show-for-a-whole-franchise).
- Browse every option in the [Settings Reference](/jellyfin/configuring-shokofin).
