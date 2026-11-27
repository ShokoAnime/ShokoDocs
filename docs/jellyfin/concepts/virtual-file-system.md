---
title: The Virtual File System | Jellyfin
description: How Shokofin's Virtual File System (VFS) presents your Shoko collection to Jellyfin, where it lives, and what it needs from your storage.
---

# The Virtual File System

Jellyfin decides what a show, season, episode or movie is by looking at folder and file names. Shoko Server already
knows exactly what every file is, no matter how your files are named or organized. The **Virtual File System (VFS)**
bridges the two: Shokofin builds a folder tree of symbolic links that follows Jellyfin's naming rules to the letter,
using what Shoko knows, and points your Jellyfin library at that tree instead of at your real media folders.

Your real files are never moved, renamed or modified. The VFS is the default **Library Operation Mode** for new
libraries and is the recommended way to use Shokofin.

## What You Get

- Your files can be organized on disk however you like. Jellyfin only ever sees the VFS.
- Files Shoko doesn't recognize never show up in the library.
- Extras, trailers and credits (OPs/EDs) become native Jellyfin extras, trailers and theme videos.
- Changes in Shoko, such as regrouping series or relocating files, are reflected by regenerating the tree. You don't
  have to rename anything yourself.

## How a VFS Library Works

1. **Mapping.** Each media folder in your Jellyfin library is matched to a managed folder in Shoko. See
   [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping).
2. **File list.** Shokofin asks Shoko for every file it knows in that managed folder. A file is only included when
   Shoko has identified it and it actually exists at the matching path inside the Jellyfin media folder.
3. **Link tree.** Shokofin creates a symbolic link for each file in a per-library folder, using names derived from
   the [library structure](/jellyfin/concepts/library-structures-and-seasons) you chose.
4. **Path swap.** Shokofin removes your real media folders from the Jellyfin library and adds the library's VFS folder
   in their place. This is why the library's folder list in Jellyfin shows a path inside the Jellyfin data directory.

:::warning A new library needs Scan All Libraries
Shokofin swaps the library's folders for the VFS when a **full** library scan (**Dashboard** → **Libraries** →
**Scan All Libraries**) finishes, and then starts another full scan on its own to pick up the VFS. The first scan looks
empty; the second one fills the library.

- **Jellyfin 10.11 and later:** creating or editing a library doesn't start that first full scan. Run
  **Scan All Libraries** yourself.
- **Jellyfin 10.10:** the first full scan starts on its own.

Refreshing a single library isn't a full scan. The swap still happens once Shokofin is idle, but no follow-up scan is
started, so the library stays empty until the next **Scan All Libraries**. The same applies after you add or remove
media folders in a VFS library.
:::

The tree is regenerated during library scans and when Shokofin receives file events from Shoko (see
[Real-Time Updates](/jellyfin/concepts/real-time-updates)). You should never edit anything inside the VFS by hand;
Shokofin will undo or overwrite it.

## What the Tree Looks Like

A **Shows** library using the AniDB Anime structure might look like this:

```text
<Jellyfin data>/Shokofin/VFS/<library id>/
├── Kimi no Na wa. [Shoko Series=1234]
│   └── ...
├── Shingeki no Kyojin [Shoko Series=456]
│   ├── Season 00
│   │   └── Shingeki no Kyojin S00E01 [Shoko Series=456] [Shoko File=9001].mkv
│   ├── Season 01
│   │   ├── Shingeki no Kyojin S01E01 [Shoko Series=456] [Shoko File=8001].mkv
│   │   ├── Shingeki no Kyojin S01E01 [Shoko Series=456] [Shoko File=8001].en.ass
│   │   ├── Shingeki no Kyojin S01E02 [Shoko Series=456] [Shoko File=8002].mkv
│   │   └── extras
│   │       └── Episode 3 [Shoko Series=456] [Shoko File=8103].mkv
│   ├── backdrops
│   │   └── Opening 1 [Shoko Series=456] [Shoko File=8201].mkv
│   ├── extras
│   │   └── Episode 3 [Shoko Series=456] [Shoko File=8103].mkv
│   └── trailers
│       └── Trailer 1 [Shoko Series=456] [Shoko File=8301].mkv
```

- **Show folders** are named `<title> [Shoko Series=<id>]`, using the default AniDB title (or the default TMDB title in
  the TMDB structure). The title in the folder name is only there for you; Jellyfin gets its displayed title from
  Shokofin's metadata, so your title settings don't affect folder names.
- **Season folders** are `Season 01`, `Season 02`, and so on. Specials go in `Season 00`.
- **Episode files** are `<title> S01E02 [Shoko Series=<id>] [Shoko File=<id>].<ext>`. The bracketed IDs are how
  Shokofin identifies each item. A file that contains only part of an episode gets a `.pt1`, `.pt2`… suffix.
- **Extras** go into the folder Jellyfin expects for their type: `extras`, `trailers`, `backdrops` (theme videos),
  `behind the scenes`, `clips`, `interviews`, and so on. Extras are placed at show level, and also inside the season
  when the episode belongs to one. Which episodes count as extras is explained in
  [Episode Types, Specials & Extras](/jellyfin/concepts/episode-types-specials-and-extras).

In a **Movies** library, every movie gets its own folder:

```text
<Jellyfin data>/Shokofin/VFS/<library id>/
├── Kimi no Na wa. [Shoko Series=1234] [Shoko Episode=5678]
│   ├── Movie [Shoko Series=1234] [Shoko File=4321].mkv
│   └── trailers
│       └── Trailer 1 [Shoko Series=1234] [Shoko File=4322].mkv
```

### Optional Parts of the File Name

In the Shokofin settings, **VFS** → **Basic Settings** has two options that add information to every linked file name:

| Setting | Adds | Example |
| --- | --- | --- |
| **Add Release Group to Path** | The release group's short name, full name, or `No Group` | `[SubsPlease]` |
| **Add Resolution to Path** | The standardized resolution, when known | `[1080p]` |

Because Jellyfin identifies items by path, changing either setting, or Shoko later updating the release group or
resolution of a file, makes the affected episodes and movies disappear and reappear as new items. Use them only if you
really need them.

**Use Source File As Version Identifier** <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" />
doesn't change anything on disk. It makes Jellyfin show the real file name, instead of the VFS file name, as the
version name when an item has [multiple versions](/jellyfin/concepts/collections-playlists-and-versions).

## External Files

Shokofin also links files that belong to a video, as long as Jellyfin would recognize them next to the real file:

- **Subtitles and audio tracks.** The file name must start with the video's file name (without extension) followed by
  Jellyfin's usual separators and flags, for example `Episode 01.mkv` →
  `Episode 01.en.forced.ass`. <Badge type="tip" text="Next release" /> Matching files in sub-folders of the video's folder are found too; the
  sub-folder names are added to the linked name so Jellyfin can still read language and flags.
- **Trickplay images.** If Jellyfin, or another plugin, writes trickplay data or a subtitle into the VFS, Shokofin
  moves it next to your real file and links it back. It survives a library rebuild that way. This only happens when
  Jellyfin can write to your media folder; on read-only media it stays in the VFS.
- **NFO files** are always removed from the VFS, so they can never override Shokofin's metadata. NFO files in your
  real media folders are left alone.

:::warning Artwork saved into the VFS is not kept
If **Save artwork into media folders** is enabled in the Jellyfin library settings, the artwork ends up inside the VFS.
It isn't moved out or cleaned up, and it is lost whenever the VFS is rebuilt. Leave that library option disabled for
VFS libraries.
:::

## Where the VFS Lives

By default the VFS is stored in the Jellyfin data directory under `Shokofin/VFS`, with one folder per library named
after the library's ID.

You can move it with **VFS** → **Generation Settings** → **VFS Location** <Badge type="danger" text="Advanced" />.
Choose **Custom Directory** and enter a **Custom VFS Root Location**: an absolute path, or a path relative to the
Jellyfin data directory.

:::danger Use a dedicated, empty folder
Shokofin treats the whole VFS location as its own. On the next startup it deletes the previous VFS location, and
anything inside the current one that doesn't belong to a library. Never point the custom location at a folder that
contains anything else.

Changing the location also changes every path in your libraries, so all items are removed and added again. Plan it
like a [library re-creation](/jellyfin/how-to/re-create-a-library-safely).
:::

## Storage Requirements

The VFS is made of symbolic links, so it needs a place where Jellyfin can create them.

- **Windows.** Creating symbolic links requires Developer Mode. Follow
  [Microsoft's guide](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device),
  then restart Jellyfin. Shokofin checks at startup whether it can create a symbolic link. When it can't, an install
  without any plugin configuration yet defaults to **Legacy Filtering (Strict)** instead of the VFS; on an install that
  already has settings, scans of VFS libraries keep failing until Developer Mode is on.
- **File systems without symbolic links.** Some file systems can't hold symbolic links, such as exFAT/FAT drives and
  some SMB or NAS shares. If Jellyfin's data directory is on one of those, set a
  [custom VFS location](#where-the-vfs-lives) on a local disk (ext4, btrfs, NTFS, APFS, …). Your media itself can stay
  on the share; only the links need a capable file system.
- **Docker.** The links point at the media paths *inside the Jellyfin container*, so they look broken when viewed from
  the host. That's expected. Keep the Jellyfin data directory, or your custom VFS location, on a persistent volume so the
  VFS and any trickplay data stored in it survive container re-creation.
- **Permissions.** Jellyfin needs write access to the VFS location. Write access to your media folders is optional and
  only used to move trickplay and subtitle files next to your media.

:::tip An unavailable mount won't empty your library
If a media folder is missing or empty during a scan, for example because a network share isn't mounted yet, Shokofin
skips generating the VFS for it and keeps the existing entries instead of removing everything.
:::

## Iterative Generation <Badge type="danger" text="Advanced" /> <Badge type="warning" text="Experimental" />

For very large libraries, or media on slow storage, regenerating the whole tree on every scan takes time. Iterative
generation only links files Shoko imported since the last generation, and checks for removed files, instead of
rebuilding everything.

- Turn it on for an existing library under **Library** → **Library Settings** → **Iterative VFS Generation Enabled**,
  after picking the library in **Configure settings for**. **Default Iterative VFS Generation Enabled** does the same
  for libraries you create later.
- **Max Iterations Before Forced Full Generation** makes every *N*th generation a full one. For example, `10` means one
  full generation followed by nine iterative ones. `0` means it never forces a full generation on its own.
- **Force Full VFS Generation on Next Library Refresh** does one full generation on the next scan, then switches
  itself off.

What iterative generation doesn't pick up until the next full generation: changes to files that were already imported,
such as a series moving to another Shoko group, a file being re-linked to other episodes, or a structure change.
Force a full generation after making changes like that.

## Legacy Filtering Modes

If you don't want the VFS, you can set a library's **Library Operation Mode** to one of the legacy modes. Jellyfin then
reads your real folders directly, and Shokofin only filters what it sees and provides metadata.

| Mode | Files and folders Shoko doesn't know |
| --- | --- |
| **Legacy Filtering (Strict)** | Hidden from the library. |
| **Legacy Filtering (Lax)** | Left for Jellyfin to handle with its own naming rules and metadata providers. |

In both legacy modes:

- **Extras, trailers and credits are never shown.** Files Shoko classifies as extras are always filtered out, because
  Shokofin can't place them where Jellyfin expects them.
- **Jellyfin's naming rules apply.** Follow Jellyfin's [Shows](https://jellyfin.org/docs/general/server/media/shows/)
  and [Movies](https://jellyfin.org/docs/general/server/media/movies/) guides.
- **Keep each AniDB anime in its own folder.** Otherwise Jellyfin merges them into one show, no matter what Shoko says.
  An AniDB-style folder structure is easy to get with Shoko's [renamer](/shoko-server/file-rename).
- **Keep files Shoko doesn't recognize away** from the folders you give Jellyfin, unless you use Lax mode on purpose.
- **Folder name filtering.** **Misc** → **Miscellaneous Settings** →
  **Ignored Folder Names** <Badge type="danger" text="Advanced" /> skips folders that a NAS or other software creates. The default list is
  `.streams, @recently-snapshot`.
- **Group structure is fragile.** Shoko Group structure works, but any regrouping in Shoko can conflict with how the
  folders on disk are arranged. With the VFS that problem doesn't exist.

Changes to your folder structure in a legacy library usually need a metadata refresh with **Replace all metadata**
before Jellyfin shows them correctly.

## Related

- [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping)
- [Include or Exclude Folders](/jellyfin/how-to/include-or-exclude-folders)
- [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely)
- [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies)
- [Settings Reference → VFS](/jellyfin/configuring-shokofin#vfs)
- [Troubleshooting: the new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty)
- [Troubleshooting: library scans fail on Windows](/jellyfin/troubleshooting#library-scans-fail-on-windows)
