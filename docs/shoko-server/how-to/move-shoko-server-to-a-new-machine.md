---
title: Move Shoko Server to a New Machine
description: Move Shoko Server to another machine, or from a Windows or bare-metal Linux install into Docker, and keep your whole collection.
---

# Move Shoko Server to a New Machine

Moving Shoko Server is a backup on the old machine and a restore on the new one, plus making sure the new machine sees
your files where Shoko expects them. Your users, watched states, resume positions, links, groups and settings all come
along. This works between any two installs, including from Windows or a bare-metal Linux install into Docker.

## Before You Start

- **Read what to copy.** [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server)
  explains where the data folder is on each install and what's in it.
- **Use the same Shoko Server version or a newer one** on the new machine. A newer version upgrades the database on its
  first start, after backing it up. An older version refuses to start with *"The database version is bigger than the
  supported version by Shoko Server."*
- **Using MySQL/MariaDB or SQL Server?** The new machine must reach the same database server, or you move the database
  with that server's own tools at the same time as the data folder.

## Move the Server

1. **Install Shoko Server on the new machine** the usual way, as in
   [Installing Shoko Server](/getting-started/installing-shoko-server), but don't go through the first-run setup. If
   it has already started, stop it: you're about to replace its data folder.
2. **If you gave any import action a trigger**, remove it on the old machine under
   [Scheduled Actions](/shoko-server/settings/scheduled-actions), and note it so you can add it back later. That means
   **Remove Missing Files**, **Import New Files**, **Scan Managed Folders** and any other import action. The triggers
   are kept in the database, so they come along, and a run missed while the server was off fires once when the new
   machine starts, maybe before it can see your files.
3. **Stop Shoko Server on the old machine and copy its data folder**, as in
   [Back Up](/shoko-server/how-to/back-up-and-restore-shoko-server#back-up).
4. **Put the copy where the new install keeps its data folder**, replacing what's there:
   - **Windows:** `C:\ProgramData\ShokoServer`.
   - **Docker:** the contents of the old data folder go into the `Shoko.CLI` folder inside the host folder you mount at
     `/home/shoko/.shoko`, for example `/srv/shoko/Shoko.CLI`, or straight into the host folder if you set
     `SHOKO_HOME=/home/shoko/.shoko`. From Docker to Docker, copy the whole mounted folder and keep the same mount.
     Then give the copied files to the user the container runs as, the **PUID** and **PGID** from the install guide,
     for example `sudo chown -R 1000:100 /srv/shoko`. The container only fixes ownership by itself when the data folder
     isn't already owned by that user.
   - **Linux (bare metal):** `~/.shoko/Shoko.CLI`, or `~/.shoko/ShokoServer` for the tray app.
5. **Check the settings file for old paths**, but only when the data folder's own path changed, for example from
   Windows or bare-metal Linux into Docker. An older settings file can hold full paths to the database, its backups and
   the images, and with those pointing at the old machine Shoko starts on a new, empty database. Open
   `settings-server.json`, search for the old data folder's path, and cut each match down to the part after it:
   `"C:\\ProgramData\\ShokoServer\\SQLite"` becomes `"SQLite"`. A folder you kept outside the data folder, such as
   images on another drive, needs its new full path instead.
6. **Make your files reachable at the paths Shoko knows**, or plan to change them:
   - **Keep the same paths.** With Docker this is easy: mount your media at the same path inside the container as
     before. If a managed folder was `/mnt/anime`, mount your media folder at `/mnt/anime` again, wherever it is on the
     new host. Moving from bare-metal Linux into Docker, mount each media folder at the path it had on the old machine.
   - **Change the paths.** Moving from Windows to Linux or Docker, or to new drive letters, the paths can't stay the
     same. After the first start, change each managed folder's **Location** as
     [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path)
     describes. Your files keep their records, because those are tied to the managed folder, not to its path.
7. **Start Shoko Server** on the new machine and sign in with your usual account. There's no first-run setup, since the
   settings and the database came along. Don't run the old server at the same time: both would work on the same AniDB
   account and, if they can reach the same files, on the same files.
8. **Add back the triggers** you removed in step 2, once Shoko sees your files at the right paths.

:::danger Fix the Locations Before Anything Cleans Up
Until every managed folder points at the right place, don't run **Remove Missing Files**, **Run Import** or a
rescan: they drop the records of files they can't reach, as
[Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders) and
[What Not to Do](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path#what-not-to-do) explain.
:::

Plugins you installed came along too, and the ones that ship with the server come with the new install. Moving
between Windows and Linux or Docker, a plugin built for only one of them can't load on the other, and the server stops
in failure mode naming it. The Web UI only shows a status page then, so fix the plugin as
[Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start) describes, then restart.

## Check That It Worked

- The dashboard's **Collection Statistics** shows the same **Series**, **Files** and **Episodes Watched** as before.
- **Settings** → **Import** → **Managed Folders** lists your folders with the locations you expect.
- An episode you know plays from its file, and the dashboard's **Continue Watching** (or **Next Up**, if you've
  combined the two) still lists what you were in the middle of.
- The queue isn't hashing your whole collection. If it is, Shoko is finding your files as new ones: check the
  managed folder locations.

## If It Didn't Work

- **The collection is empty, or the server went through the first-run setup again.** It didn't find your database or
  settings. Stop it, and check that the data folder is in the right place (for Docker, inside the `Shoko.CLI` folder of
  the mounted folder) and that no path in `settings-server.json` still points at the old machine. Then start it again.
- **The server refuses to start with "The database version is bigger than the supported version".** The new machine
  runs an older Shoko Server than the old one. Install the same version or a newer one.
- **The server stops in failure mode with a plugin listed.** See
  [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start).
- **Files show as missing, or managed folders are empty.** Shoko can't reach your files at the paths it knows. Fix the
  mounts or change the folder locations, see
  [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path).
- **Images are missing.** They weren't copied, or the images path in the settings file still points at the old
  machine. Fix the path if needed, then run **Actions** → **Images** → **Update All Images** to download the missing
  ones again.

## Related

- [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server)
- [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path), for a new
  drive, share or mount without moving the server
- [Managed Folders & Drop Folders](/shoko-server/concepts/managed-folders-and-drop-folders)
- [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start)
- [Installing Shoko Server](/getting-started/installing-shoko-server)
