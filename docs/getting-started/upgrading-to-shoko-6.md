---
title: Upgrading to Shoko 6
description: "What to do before upgrading from Shoko Server 5.3.3 to 6.0, what the first start will do on its own, and what to do about each thing you see."
---

# Upgrading to Shoko 6

Shoko Server 5.3.3 is the last 5.x release, and 6.0 upgrades an existing install in place: the first start migrates
your settings file and your database where they are, backing both up as it goes, and keeps everything else. There is
little to do beforehand — most of what matters happens during that first start, which stops and waits for you if it
needs to.

:::danger The Upgrade Is One Way
Once 6.0 has migrated your database, 5.3.3 won't open it again — it refuses to start with *"The Database Version is
bigger than the supported version by Shoko Server."* Going back means restoring the backups Shoko takes during the
upgrade, and anything you did in 6.0 in the meantime is lost with them.
:::

## Before You Upgrade

Your settings and your database are backed up by the server itself, as part of the first start. What's left is
knowing what you had, and deciding whether your images are worth a copy.

1. **Copy your images only if you might go back to 5.3.3.** The first start moves every cached image into a new
   layout, one folder per metadata source, with the files renamed after the IDs 6.0 gives them, so a copy taken
   beforehand is the only one 5.3.3 can still read. Nothing is deleted on the way, and 6.0 downloads anything that
   does go missing, so there's no other reason to take one.
2. **Note how your files are being renamed.** Which renamer you use, which script or configuration is the default,
   and whether it came from a plugin. See [File Rename](/shoko-server/file-rename).
3. **Leave your plugins installed.** Every plugin built for 5.x is refused by 6.0, and the first start stops when an
   enabled one can't load — but it stops with the server still reachable and before the database is touched, so you
   can replace the plugin there and restart. That's the better order: a renamer's saved presets are migrated only
   for renamers that are loaded during the first start, so a renaming plugin updated at that point keeps its
   presets. The way to have them ready is to find where each plugin publishes its manifest, so you can add that as
   a repository and install from it at the stop — see
   [Plugin Management](/shoko-server/settings/plugin-management#repositories). Failing that, have the 6.0 builds
   themselves at hand before you begin.
4. **Check the clients you use.** Shoko Desktop is gone: 6.0 dropped the API it spoke, and 5.3.3 is the last server
   it works with — see [the FAQ](/faq). For everything else, check the install guide of the
   [media server/player plugin](/getting-started/available-programs-plugins#media-server-player-plugins) you use for the build that goes with a 6.x server.

## What the First Start Will Do

Expect the first start to take considerably longer than usual. It reports what it's doing as a startup message,
which the Web UI shows while it waits. Once it's past the plugins and into the database, leave it alone until it's
done.

1. **Your settings file is migrated.** 5.3.3 wrote version 11 of it and 6.0 writes version 30. The file as it was is
   copied to `SettingsBackup/settings-server.v11.<timestamp>.json` in the data directory first. That copy is what you
   restore if you ever go back, since several of the settings in between changed shape rather than just names.
2. **It stops if a plugin can't be loaded.** The plugins are scanned, loaded and started before the database is
   touched, and a plugin built for 5.x is refused — *"This plugin uses the deprecated Shoko.Plugin.Abstractions
   namespace and is incompatible with this version of Shoko Server."* An enabled plugin that can't load holds the
   start right there. The server itself is up and answering, so it's yours to deal with: replace the plugin with its
   6.0 build, or disable or uninstall it. Nothing below has happened yet, so nothing is half-done.

   **Then restart the server.** The start doesn't pick itself back up once the plugins are sorted out. On the next
   start they load, and it carries on into the database.
3. **Your database is backed up, then upgraded.** You'll see *"Database changes detected. Database backup in
   progress..."*, and the copy is named after your database schema and the version it came from, next to your data —
   or in the backup directory, if you've set one. Any plugin databases are copied alongside it. The schema is then
   brought up to 6.0's, step by step, with the data fixes that belong to those steps — among them moving your cached
   images into their new layout — and a SQLite database is compacted afterwards when there's enough to reclaim.

## What Moved, and What's Gone

| In 5.3.3 | In 6.0 |
| --- | --- |
| Import folders | Managed folders. The same folders, under a new name |
| Renamer scripts and configurations | Relocation presets, served by relocation providers |
| The built-in WebAOM renamer | A bundled plugin, shipped with the server |
| The built-in TMDB features | A bundled plugin. Its settings move into that plugin's own configuration |
| The built-in Plex features | A bundled legacy compatibility plugin. Its settings stay in the server's own, but disabling the plugin turns off every legacy Plex feature with it |
| Import-on-start and the update frequency settings | Scheduled actions, with triggers that decide when they run |
| Web UI settings stored once for the server | Now kept per user |
| Settings only an admin could read | Readable by anyone signed in, with every secret masked on the way out, and writable only by an admin — apart from each user's own Web UI settings, which they read and write themselves, so the Web UI works when you aren't an admin |
| Trakt | Removed for good, as [Integrations](/shoko-server/settings/integrations) notes |
| APIv1, used by Shoko Desktop | Gone. APIv2 and APIv3 are still there |
| Plugins as dlls you copied in | Installed into folders of their own by the plugin package manager |

Nothing in that table needs doing by hand. It's there so that a setting you can't find after the upgrade is one you
can stop looking for.

## What You See

| What you see | What it is | What to do |
| --- | --- | --- |
| The server never finishes starting, and a plugin is listed as incompatible: *"This plugin uses the deprecated Shoko.Plugin.Abstractions namespace and is incompatible with this version of Shoko Server."* | A 5.x plugin is still installed and enabled | Replace it with its 6.0 build, or disable or uninstall it, and restart. The server is reachable while it waits there, so you don't have to stop it to get at your plugins |
| *"The Database Version is bigger than the supported version by Shoko Server"* | 5.3.3 was started again against a database 6.0 already migrated | Restore the database backup and the `settings-server.v11.*.json` copy taken during the upgrade, or go back to 6.0 |
| The startup message hasn't changed in a long while | A backup or a migration step is still running, on a database that may be large | Let it finish, and read the log if you want to see where it is. Restarting part way only makes it start the step again |
| Your renamer preset or script is missing | Its renamer wasn't loaded when the migration ran, usually because the plugin hadn't been updated yet | It's kept as a file under `failed_migrations` beside your data. Install the plugin's 6.0 build and restart: the preset is imported then, under its original name |
| Files are being renamed or moved differently than before | A different preset ended up as the default | Check which one is the default before letting the server move anything, under [File Rename](/shoko-server/file-rename) |
| Settings you had set look empty or missing | They moved, rather than being reset | Work through [what moved](#what-moved-and-what-s-gone). Your old file is in `SettingsBackup` if you want to read values out of it |
| The Web UI looks like the old one, or doesn't work against the new server | The Web UI lives in your data directory, and the copy shipped with the server only replaces it when the shipped one is newer — so one you updated yourself to a higher version stays put | Stop the server, delete the `webui` folder in the data directory, and start it again. The copy that ships with the server is put back in its place |
| Shoko Desktop can't connect | It spoke APIv1, which 6.0 removed | Use the [Web UI](/shoko-server/dashboard) to manage the collection, and one of the [media server/player plugins](/getting-started/available-programs-plugins#media-server-player-plugins) to watch it |

## After the Upgrade

- Check the default relocation preset before letting the server move files again.
- Check that your plugins are their 6.0 builds and enabled, under
  [Plugin Management](/shoko-server/settings/plugin-management).
- Look over your managed folders and their drop folder types, under [Import](/shoko-server/settings/import).
- Keep the first backup until you're satisfied. It's the only way back.
