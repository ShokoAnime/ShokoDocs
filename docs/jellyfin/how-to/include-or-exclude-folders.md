---
title: Include or Exclude Folders | Jellyfin
description: Mix folders Shoko doesn't manage into a Shokofin library, keep folders out of Shoko, and skip NAS clutter in legacy libraries.
---

# Include or Exclude Folders

This guide covers three situations:

- You want a folder that Shoko doesn't manage, such as live-action shows or home videos, to show up in the same
  Jellyfin library as your anime.
- You want Shoko, and therefore Shokofin, to leave a folder alone completely.
- Your NAS or other software creates helper folders that clutter a legacy library.

## Before You Start

- For the first situation, the library should use the **Virtual File System (VFS)** operation mode. In legacy
  libraries, folders Shoko doesn't know are either hidden (**Legacy Filtering (Strict)**) or already left to Jellyfin
  (**Legacy Filtering (Lax)**). See [legacy filtering modes](/jellyfin/concepts/virtual-file-system#legacy-filtering-modes).
- Content in an ignored folder gets its metadata from Jellyfin's other metadata providers, not from Shokofin. Enable
  those providers for the library if you want metadata for it.

## Mix Another Folder into a VFS Library

### Option A: A `.shoko-ignore` File (for Folders You Haven't Added Yet)

1. Create an empty file named `.shoko-ignore` directly inside the folder, for example `/media/live-action/.shoko-ignore`.
2. In Jellyfin, open **Dashboard** → **Libraries**, edit the library, and add the folder as a media folder.
3. Save, then run **Dashboard** → **Libraries** → **Scan All Libraries**. Adding a folder is only picked up after a full
   library scan, which Jellyfin 10.11 and later don't start on their own; Shokofin starts a second one afterwards.

Shokofin only checks for `.shoko-ignore` when a folder is added to a library. Adding the file to a folder that's already
in the library does nothing; use option B, or remove the folder and add it again.

### Option B: The Ignore Button in the Shokofin Settings

1. In the Shokofin settings, open **Library** → **Library Settings**.
2. In **Configure settings for**, pick the library.
3. If the folder isn't listed under **Managed Folder Mapping** yet, press **+** next to the heading and pick the folder.
4. On the folder's row, press the folder button. The row now ends with **(Ignored)**.
5. Press **Save**, then run **Dashboard** → **Libraries** → **Scan All Libraries**.

In both cases the folder stays in the Jellyfin library next to the VFS folder, and Jellyfin reads it with its own naming
rules.

## Keep Shoko Away from a Folder

Shokofin only works with files Shoko knows about. To keep a folder out of both:

1. In Shoko, open **Settings** → **Import** → **Managed Folders** and check that the folder is neither a managed folder
   itself nor inside one.
2. If it is inside a managed folder, move it outside, or remove that managed folder and add narrower ones instead.
3. Don't add the folder to a Jellyfin library that uses Shokofin, or ignore it as described above.

## Skip NAS Helper Folders in a Legacy Library

Some NAS systems and tools create folders such as `@recently-snapshot` or `.streams` inside your media folders. In a
legacy library, these can end up being scanned.

1. Turn on [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode).
2. In the Shokofin settings, open **Misc** → **Miscellaneous Settings** → **Ignored Folder Names**.
3. Add the folder names as a comma-separated list, for example `.streams, @recently-snapshot, @eaDir`.
4. Press **Save**, then scan the library.

VFS libraries don't need this: the VFS only ever contains files Shoko has identified.

## Check That It Worked

- **Mixed-in folder:** the folder is listed in Jellyfin's library settings next to the Shokofin VFS folder. Its
  content appears in the library after the scan.
- **Managed Folder Mapping:** the folder's row shows **(Ignored)**.
- **Legacy clutter:** the helper folders no longer show up as shows or seasons.

## If It Didn't Work

- You added `.shoko-ignore` after the folder was already in the library → use the ignore button, or remove and re-add
  the folder.
- The mixed-in content shows up without metadata → enable other metadata providers for the library in Jellyfin.
- Anime from Shoko is missing instead → see
  [Troubleshooting: a media folder shows Not Mapped](/jellyfin/troubleshooting#a-media-folder-shows-not-mapped).

## Related

- [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping)
- [The Virtual File System](/jellyfin/concepts/virtual-file-system)
- [Settings Reference → Library](/jellyfin/configuring-shokofin#library)
- [Settings Reference → Misc](/jellyfin/configuring-shokofin#misc)
