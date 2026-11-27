---
title: Import Settings
description: "Import settings in the Shoko Web UI: import options, managed folders and detecting new files."
---

# Import

![Shoko Server - Settings - Import](/images/shoko-server/shoko-server-settings-import.jpg)

The **Import** tab configures how Shoko imports files into your collection: which file types count, whether files are
renamed and moved, and which folders Shoko manages.

## Import Options

| Option | What it does | Default |
| --- | --- | --- |
| **Rename on import** | Renames imported files using your default relocation preset. | Off |
| **Move on import** | Moves imported files from a drop source to a drop destination managed folder. | Off |
| **Allow relocation inside destination on import** | Also renames or moves files that are already inside a destination managed folder. | On |
| **Delete duplicates on import** | Deletes duplicate files automatically when they're imported. | Off |
| **Set file as watched if episode is watched** | If a user has already watched another file of the same episode, the new file gets that user's watched state. | On |
| **Video Extensions** | The file extensions Shoko imports. | MKV, AVI, MP4, MOV, OGM, WMV, MPG, MPEG, MK3D and M4V |

:::info Renaming and Moving
Shoko only renames or moves a file that's in a managed folder with the **Source** or **Both** drop type, or
**Destination** when **Allow relocation inside destination on import** is on. Files in a folder with the **None** drop
type are left where they are. See [Renaming & Moving Files](/shoko-server/concepts/renaming-and-moving-files).
:::

## Managed Folders

Managed folders are the folders Shoko imports files from (formerly called import folders). Each folder shows its
location, type and size, with buttons to **Rescan Folder** or **Edit Folder**. **Add Folder** adds a new one. A folder
you add here isn't scanned by itself: click **Rescan Folder** once it's added. See [Managed Folders & Drop
Folders](/shoko-server/concepts/managed-folders-and-drop-folders) for how Shoko uses them.

The folder dialog has these fields:

| Field | What it does |
| --- | --- |
| **Name** | A name for the folder. |
| **Location** | The folder's path as Shoko Server sees it. Use the folder icon to browse. |
| **Drop Type** | **None**, **Source** (new files are moved out of it), **Destination** (files are moved into it), or **Both**. |
| **Watch For New Files** | **Yes** to import new files as soon as they appear. See [Detecting New Files](#detecting-new-files). |

These locations must be consistently accessible and remain online, or Shoko may think the files are gone. Shoko isn't
optimized for removable or cloud-based storage.

### Removing a Managed Folder

**Delete** in the edit dialog asks what happened to the files:

- **The files only moved** keeps every file record, for example when a drive or path changed. Add the new location as
  a managed folder afterwards, and once everything is imported again, run **Remove Missing Files (Keep in MyList)**
  from **Actions** to clear out the records whose files are still missing. If only the folder's path changed, editing
  its **Location** is simpler and safer: see
  [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path).
- **The files are gone for good**: Shoko drops its record of each file: its resume positions, its own watched date and
  its import date. Its episode links and the episodes' watched state stay, so if a file comes back it's linked again.
  Files that also live in another managed folder are kept. With **Also remove these files from your AniDB MyList**
  ticked, Shoko also updates each file in your AniDB MyList as your **Delete Action** setting says (by default it marks
  the file Unknown).

## Detecting New Files

Besides scanning, Shoko Server can find out about a file you've added to a managed folder in two ways. Either it
**watches** the folder, or something **notifies** it.

### Watching a Managed Folder

Set **Watch For New Files** to **Yes** on the managed folder (**Settings** → **Import** → **Managed Folders** →
**Edit Folder**). Shoko then relies on the operating system to report changes in that folder: inotify on Linux, and the
equivalent change notifications on Windows and macOS.

This only works when those notifications actually reach Shoko Server. They often don't:

- **Network shares** (SMB/CIFS, NFS) mounted on the machine running Shoko usually don't deliver change notifications
  for changes made by other machines.
- **Docker** passes notifications through for local bind mounts, but not for network shares mounted on the host, and
  not reliably for folders shared from Windows or macOS into a Linux container.
- **Linux watch limits:** very large collections can exceed the kernel's inotify watch limit
  (`fs.inotify.max_user_watches`). Raise it if new files are only noticed in some folders.

If notifications can't reach Shoko, notify it instead.

### Notifying Shoko Server

Anything that knows when a file was added, such as the script or tool you use to copy or rip your files, can tell Shoko
to look at that path through the API. This needs an API key from an administrator account; create one under
**API Keys**.

Send the absolute path of the new file, as Shoko Server sees it (inside its container, if it runs in Docker):

```sh
curl -X POST "http://<shoko-server>:8111/api/v3/ManagedFolder/NotifyChangeDetected" \
  -H "apikey: <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{ "Path": "/anime/Incoming/Episode 01.mkv" }'
```

There's also `POST /api/v3/ManagedFolder/{folderID}/NotifyChangeDetected`, which takes a `RelativePath` inside that
managed folder instead. Shoko replies right away and checks the path in the background.

Instead of the `apikey` header, you can also pass the key as a query parameter, which helps with tools that can only
call a URL: `http://<shoko-server>:8111/api/v3/ManagedFolder/NotifyChangeDetected?apikey=<your-api-key>`. Keep in mind
that URLs, including the key, can end up in logs.

Browse all endpoints at [Swagger](/api/use-the-api-with-swagger).
