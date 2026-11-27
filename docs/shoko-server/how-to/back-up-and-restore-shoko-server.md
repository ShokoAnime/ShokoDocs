---
title: Back Up and Restore Shoko Server
description: Where Shoko Server keeps its data, what to copy to back it up, the automatic backups it takes before upgrades, and how to restore either.
---

# Back Up and Restore Shoko Server

Everything Shoko Server knows lives in one place: its data folder, plus the database server if you use MySQL/MariaDB
or SQL Server. A copy of that folder, taken while the server is stopped, is a complete backup. This guide shows what's
in the folder, how to back it up, and how to restore it. The same copy is how you
[move Shoko Server to a new machine](/shoko-server/how-to/move-shoko-server-to-a-new-machine).

Your users, their watched states and resume positions, your managed folders, your episode links and manual links, your
groups and your settings are all in the database and the settings file, so they're all in the copy.

## Before You Start

- **Know where your data folder is.** It depends on how you run Shoko Server:

  | Install | Data folder |
  | --- | --- |
  | Windows | `C:\ProgramData\ShokoServer` |
  | Linux (bare metal) | `~/.shoko/Shoko.CLI`, or `~/.shoko/ShokoServer` for the tray app, in the home folder of the user running the server |
  | Docker | `Shoko.CLI` inside the host folder you mount at `/home/shoko/.shoko`, or that folder itself with `SHOKO_HOME=/home/shoko/.shoko` |

  With the [Docker Compose Builder](/getting-started/installing-shoko-server#docker-compose-builder), it's the
  `Shoko.CLI` folder inside the path you entered for Shoko's data, or that folder itself if you chose to keep the data
  directly in it.
  With the `docker run` example in [Running Shoko Server](/getting-started/running-shoko-server), it's
  `~/.shoko/Shoko.CLI`.

- **Have room for the copy.** The images and the database are the large parts.

## What's in the Data Folder

Copying the whole folder is the simplest and safest choice. If you want to know what you're copying, or need to leave
something out to save space:

| In the data folder | What it holds | Copy it? |
| --- | --- | --- |
| `settings-server.json` | The server's settings, including your AniDB login | Yes |
| `SQLite` | The database, on a default install, and the queue's own database, which stays here even with MySQL/MariaDB or SQL Server | Yes |
| `metadata-registry.json` | How the database refers to each metadata source. It must match the database | Yes, always together with the database |
| `data` | The plugins' own databases | Yes |
| `configuration` | The plugins' settings, and some of the server's own | Yes |
| `plugins` | The plugins you installed. The plugins that ship with the server aren't kept here | Yes, or install them again afterwards |
| `images` | Images downloaded from the metadata sources | Recommended. They can be downloaded again, but that takes a long time on a large collection |
| `Anime_HTTP` | A cache of the data Shoko got from AniDB for each anime | Recommended. Shoko reads it before asking AniDB again, which helps avoid [bans](/shoko-server/understanding-anidb-bans) |
| `MyList` | A local copy of your AniDB MyList, and its backups | Optional |
| `DatabaseBackup`, `SettingsBackup` | The automatic backups described [below](#automatic-backups) | Optional |
| `themes` | Web UI themes you installed | Optional |
| `webui` | The Web UI's files | Optional. The copy that ships with the server is put back when it's missing |
| `logs`, `cache`, `AVDump` | Log files, temporary files and the AVDump tool | No |

:::info MySQL/MariaDB and SQL Server
With one of these, the database lives on the database server, not in the data folder. Back it up with that server's
own tools, at the same time as the data folder, and restore both together. The data folder still holds the settings,
the plugins' databases and `metadata-registry.json`, which must match the database.
:::

## Back Up

1. **Stop Shoko Server.**
   - **Windows:** right-click the Shoko icon in the system tray and choose **Exit**.
   - **Docker:** `docker compose down`, or `docker stop <container name>`.
   - **Linux (bare metal):** `sudo systemctl stop shokoserver` if you run it as a service, otherwise press `Ctrl+C` in
     its terminal.
2. **Copy the whole data folder** somewhere safe, such as another drive or your NAS. If you use MySQL/MariaDB or SQL
   Server, back up its database now too.
3. **Start Shoko Server again.**

:::warning Stop the Server First
Recent changes sit in a `-wal` file next to each database file until they're written into the database itself. A copy
taken while the server runs can catch the two halfway, and may not open. If you see files ending in `-wal` or `-shm`
next to a database after stopping the server, copy them along with it and keep them together.
:::

## Automatic Backups

There's no button to back up the database on demand. Shoko Server does take one by itself before it changes the
database's layout, which happens when a newer version starts for the first time. You'll see *"Database changes
detected. Database backup in progress..."* while it runs.

- **Where it goes:** the `DatabaseBackup` folder in the data folder. On SQL Server, the database copy itself is
  written to that server's own default backup folder instead, while the other two parts still go to `DatabaseBackup`.
- **What it contains:** a copy of the database (a `.db3` file for SQLite, a `.sql` dump for MySQL/MariaDB, a `.bak`
  file for SQL Server) named after the database version and the date. Next to it, under the same name, are a
  `<name>.metadata-registry.json` file and a `<name>.plugin-data` folder with the plugins' databases.
- **What it doesn't contain:** your images, plugins, plugin settings and the server's settings. When an upgrade changes
  the settings file, the old one is copied to the `SettingsBackup` folder.

These backups only exist from the moments an upgrade happened. For a backup you can count on, copy the data folder
yourself as described above.

## Restore a Backup

1. **Stop Shoko Server.**
2. **Rename the current data folder** (for example to `ShokoServer.old`) instead of deleting it, so you can go back.
   Don't copy the backup on top of it: files left over from the current one, such as a database's `-wal` file, don't
   belong to the backup.
3. **Copy the backed up data folder** into its place, under the original name. If you use MySQL/MariaDB or SQL Server,
   restore the database from the backup you took at the same time.
4. **Start Shoko Server.** If the backup comes from an older version, the server upgrades it again on this start,
   backing it up first.

## Restore an Automatic Database Backup

This puts the database back as it was right before an upgrade, so anything done since is gone. Use it with the Shoko
Server version you had before that upgrade, or start the current version on it to run the upgrade again.

1. **Stop Shoko Server.**
2. In the `SQLite` folder, rename the current database file and remove its `-wal` and `-shm` files, if there are any.
3. Copy the `.db3` file from `DatabaseBackup` into the `SQLite` folder, under the name of the file you renamed.
4. Copy `<name>.metadata-registry.json` from `DatabaseBackup` into the data folder as `metadata-registry.json`,
   replacing the one there.
5. If there's a `<name>.plugin-data` folder, rename the data folder's `data` folder (for example to `data.old`) and put
   a copy of `<name>.plugin-data` in its place, named `data`. Don't copy it over the old one: leftover `-wal` and
   `-shm` files there don't belong to the backup.
6. **Going back to the version you had before the upgrade?** Copy the matching
   `SettingsBackup/settings-server.v<number>.<date>.json` over `settings-server.json` too, if that upgrade changed the
   settings file. The older version can't read the newer settings.
7. **Start Shoko Server.**

For MySQL/MariaDB or SQL Server, restore the `.sql` or `.bak` file with that server's tools instead of steps 2 and 3.

## Check That It Worked

- The dashboard's **Collection Statistics** shows the **Series**, **Files** and **Episodes Watched** you expect.
- **Settings** → **Import** → **Managed Folders** lists your folders.
- The queue isn't hashing your whole collection. If it is, Shoko is finding your files as new ones: check that the
  managed folders point at your files.

## If It Didn't Work

- **The collection is empty, or the server went through the first-run setup again.** It didn't find your database or
  settings. Stop it and check that the data folder is in the right place, for Docker inside the `Shoko.CLI` folder of
  the mounted folder. Then start it again.
- **The server refuses to start with "The database version is bigger than the supported version".** The backup comes
  from a newer Shoko Server than the one installed. Install that version or a newer one.

## Related

- [Move Shoko Server to a New Machine](/shoko-server/how-to/move-shoko-server-to-a-new-machine)
- [Move Your Library to a New Drive or Path](/shoko-server/how-to/move-your-library-to-a-new-drive-or-path)
- [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start)
- [Installing Shoko Server](/getting-started/installing-shoko-server)
