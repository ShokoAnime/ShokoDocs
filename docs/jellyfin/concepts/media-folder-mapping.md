---
title: Media Folder Mapping | Jellyfin
description: How Shokofin matches the folders in your Jellyfin libraries to Shoko Server's managed folders, and how to manage or ignore those mappings.
---

# Media Folder Mapping

Before Shokofin can do anything with a folder in a Jellyfin library, it needs to know which of Shoko Server's
**managed folders** that folder corresponds to. (On Shoko Server 5.x managed folders are called *import folders*.)
Jellyfin and Shoko often see the same files at different paths, for example when one of them runs in Docker, so
Shokofin works this out by itself instead of asking you for paths.

## How Matching Works

When a folder is added to a library, Shokofin:

1. Picks up to about 100 video files from the folder and its sub-folders.
2. Takes each file's path *relative to the Jellyfin folder*, for example `Shingeki no Kyojin/Episode 01.mkv`, and asks
   Shoko which file ends with that path.
3. Notes which managed folder each match came from, and where inside that managed folder the Jellyfin folder starts.
4. Picks the managed folder with the most matches.

The result is stored as the folder's mapping: a managed folder plus, if needed, a sub-path inside it.

**Only the part of the path below the Jellyfin folder has to match.** The part above it can be completely different.

### Example: Docker and Windows

| | Path |
| --- | --- |
| Shoko (Windows) managed folder | `D:\Anime` |
| Jellyfin (Docker) media folder | `/data/anime` |
| A file as Shoko sees it | `D:\Anime\Shingeki no Kyojin\Episode 01.mkv` |
| The same file as Jellyfin sees it | `/data/anime/Shingeki no Kyojin/Episode 01.mkv` |

Both end in `Shingeki no Kyojin/Episode 01.mkv`, so `/data/anime` maps to the `D:\Anime` managed folder.

### Example: A Library for Part of a Managed Folder

If Shoko's managed folder is `/mnt/anime` and contains `shows` and `movies` sub-folders, you can give a Jellyfin library
only `/media/anime/movies`. It maps to the managed folder with the sub-path `movies`, and only files from that
sub-folder are used.

### Example: One Jellyfin Folder Covering Two Managed Folders

If Shoko has two managed folders, `/mnt/anime/airing` and `/mnt/anime/finished`, and your Jellyfin library uses the
parent folder `/media/anime`, the folder can only map to **one** of them, whichever has more matches in the sample.
Files from the other managed folder never show up.

:::tip Keep it one-to-one
Add each of Shoko's managed folders to Jellyfin as its own media folder, or as a sub-folder of one. Don't use a Jellyfin
folder that spans several managed folders.
:::

## Seeing and Managing Mappings

In the Shokofin settings, open **Library** → **Library Settings** and pick a library in **Configure settings for**.
**Managed Folder Mapping** lists each media folder in that library:

```text
/data/anime | Anime (1)
/data/anime/movies | Anime (1) movies
/data/other | Not Mapped
/data/music | Not Mapped (Ignored)
```

Each row shows the Jellyfin path, then the managed folder name with its ID and the sub-path, or **Not Mapped**.
**(Refresh Pending)** means the mapping will be worked out again. **(Ignored)** means Shokofin leaves the folder alone.

Each row has three buttons:

| Button | What it does |
| --- | --- |
| Magnifying glass | Marks the mapping to be refreshed, or un-marks it. Use it after you've changed folder paths in Shoko or Jellyfin. The icon changes while a refresh is pending. |
| Folder | Toggles whether Shokofin ignores this folder. See [ignored folders](#ignored-folders). |
| Minus | Removes the folder from the library's mappings. |

The **Library Operation Mode** for the library is set in the same place. **Default Library Operation Mode**, above
it, applies to libraries you create later.

:::info Adding and removing folders
In a VFS library, Jellyfin's own library editor only shows the VFS folder, so the **+** button next to
**Managed Folder Mapping** and the minus buttons are how you add or remove media folders. In legacy libraries, both are disabled; add and remove folders
in Jellyfin's library settings as usual.
:::

Remember to press **Save** after making changes.

## When a Folder Isn't Mapped

If none of the sampled files are known to Shoko, the folder shows **Not Mapped**.

- In a **VFS** library the folder still disappears from the library's folder list, but it contributes no files. The
  library silently misses everything in it.
- In a **legacy** library Shokofin doesn't filter the folder at all, so Jellyfin shows its contents as-is.

Common causes:

- Shoko hasn't imported or identified the files yet.
- The folder structure below the Jellyfin folder differs from Shoko's, for example after moving files in only one of
  them.
- The folder isn't inside any of Shoko's managed folders.

Fix the cause, then use the magnifying glass on that row and save. See also
[Troubleshooting: a media folder shows Not Mapped](/jellyfin/troubleshooting#a-media-folder-shows-not-mapped).

## Ignored Folders

An ignored folder is one Shokofin doesn't manage. In a VFS library, an ignored folder stays in the Jellyfin library
next to the VFS folder, and Jellyfin reads it with its own rules and metadata providers. That's how you can mix, say, a
folder of live-action shows into a VFS library.

There are two ways to ignore a folder:

- **A `.shoko-ignore` file.** Put an empty file named `.shoko-ignore` directly inside the folder *before* adding the
  folder to a library. Shokofin checks for it only when a folder is added, so adding the file later does nothing.
- **The folder button** on the folder's row in **Managed Folder Mapping**.

See [Include or Exclude Folders](/jellyfin/how-to/include-or-exclude-folders) for step-by-step instructions.

## Using the Same Folder in Several Libraries

With the VFS, each library gets its own VFS folder, so the same real folder can be used in several libraries, such as a
Shows library and a Movies library. Nothing extra is needed; see
[Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies).

Legacy libraries can have trouble when two libraries use the exact same folder path, because of how Jellyfin stores
media folders. Give each library its own path to the same files instead:

- **Bare metal:** create a symbolic link to the media folder and use the link's path in the second library.
- **Docker:** mount the same host folder at two different paths in the Jellyfin container.

## Related

- [The Virtual File System](/jellyfin/concepts/virtual-file-system)
- [Include or Exclude Folders](/jellyfin/how-to/include-or-exclude-folders)
- [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies)
- [Quick Start: creating a library](/jellyfin/quick-start#creating-a-library)
- [Settings Reference → Library](/jellyfin/configuring-shokofin#library)
