---
title: Recover from a Failed Start
description: "Shoko says Shoko failed to start: find out why, fix a failed plugin or database problem while the server waits, and restart it."
---

# Recover from a Failed Start

When the Web UI only shows **Shoko failed to start**, the server is in failure mode: it started its web server, then
something stopped the rest of the start. It stays up on purpose, so you can see what went wrong and fix it. This guide
takes you from that page back to a running server.

For what failure mode is and what usually causes it, see
[Setup Mode & Failure Mode](/shoko-server/concepts/setup-mode-and-failure-mode).

## Before You Start

- Leave the server running while you fix things. A failed plugin can only be dealt with while the server is still
  up in failure mode.
- Until the start succeeds, anyone who can reach the server's port can use these routes without signing in, so do
  this from your own network and don't leave the server sitting in failure mode.

## Find Out What Failed

1. Read the message in the box on the status page. It says which kind of failure it is; the most common ones are
   listed under [What Can Cause It](/shoko-server/concepts/setup-mode-and-failure-mode#what-can-cause-it).
2. If the message isn't enough, open the newest log file. In failure mode the Web UI's [Logs](/shoko-server/logs)
   page isn't reachable, but the files are in the `logs` folder of Shoko's data folder:

   | Install | Logs folder |
   | --- | --- |
   | Windows | `C:\ProgramData\ShokoServer\logs` |
   | Linux, tray app | `~/.shoko/ShokoServer/logs` |
   | Linux, command line | `~/.shoko/Shoko.CLI/logs` |
   | Docker | `Shoko.CLI/logs`, inside the folder you mounted at `/home/shoko/.shoko`; or just `logs` in it with `SHOKO_HOME=/home/shoko/.shoko` |

   Look near the end for the lines logged as errors. The failed start is logged as *"Failed to Start Server:"*,
   followed by the same message the status page shows and the error behind it. The lines just before it show what the
   server was doing.

Then follow the section that fits: a plugin, or the database.

## Fix a Failed Plugin

The status page names the plugin and says *"See the plugin for the reason."* The Web UI doesn't offer **Plugin
Management** in failure mode, but the server's plugin routes still answer, without an API key, so you deal with the
plugin through [Swagger](/api/use-the-api-with-swagger) on the same server.

1. Open `http://<your-server>:8111/swagger/`. If you've set a
   [setup token](/shoko-server/concepts/setup-mode-and-failure-mode#protect-them-with-a-setup-token), enter it under
   **Authorize** first.
2. Run `GET /api/v3/Plugin` with **failed** set to `only`. Each plugin in the answer has its `ID`, and
   `FailureReason` or `CannotLoadReason` says what's wrong with it.
3. Do one of these with the plugin's `ID`:
   - **Disable it:** `PUT /api/v3/Plugin/{pluginID}` with the body `{ "IsEnabled": false }`.
   - **Uninstall it:** `DELETE /api/v3/Plugin/{pluginID}`.
   - **Replace it** with a build that fits your server, by installing it through the `/api/v3/Plugin/Package` routes,
     the same ones **Plugin Management** uses.
4. [Restart the server](#restart-the-server).

If another enabled plugin requires the one you're disabling or uninstalling, the request is refused and names the
plugins in the way, the same as in
[Plugin Management](/shoko-server/settings/plugin-management#plugins-that-need-other-plugins). Deal with those first,
or with all of them.

:::tip An Older Version Can Step In
When the newest installed version of a plugin can't load on your server at all, for example because it's built for a
newer Shoko, and an older installed version can, the older one is loaded in its place and the start doesn't fail.
That doesn't happen when you've pinned the newest version.
:::

## Fix a Database Problem

- **"Failed to start. Could not connect to database!"** Make sure the database server (MySQL, MariaDB or SQL Server)
  is running and that Shoko can reach it, then restart.
- **"The database version is bigger than the supported version by Shoko Server."** The database was last used by a
  newer version of Shoko. Go back to that version, or restore a backup taken with this one, as in
  [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server).
- **A message naming a plugin's database.** Follow what it says: it names the plugin and the database, says how to
  go back to the copy taken before the update, and how to disable the plugin.

## Restart the Server

Failure mode always ends with a restart. The start never picks itself back up, even once the cause is gone.

- If the status page has a **Restart Server** button, click it. It's there when your install lets the server restart
  itself, which the Docker image does by default.
- Otherwise restart it the way you started it: restart the Docker container, or on Windows choose **Exit** from the
  tray icon and start Shoko Server again.

The status page keeps checking the server while it restarts and takes you back into the Web UI once it's up. If it
was the first-run setup that failed, the server comes back in setup mode: reload the Web UI to get to the sign-in page
with **Continue**, and go through the wizard again.

## Check That It Worked

- The status page gives way to the sign-in page, or to the dashboard if you were already signed in.
- **Settings** → [**Plugin Management**](/shoko-server/settings/plugin-management) lists the plugin you dealt with as
  disabled, gone or at its new version.
- The queue on the dashboard starts working again.

## If It Didn't Work

- **The same message comes back.** The cause is still there. For a plugin, check that the request in
  [Fix a Failed Plugin](#fix-a-failed-plugin) succeeded, and that no other plugin failed alongside it: the status page
  names every plugin that failed.
- **A different plugin fails now.** Plugins can depend on each other. Read its reason the same way and deal with it too.
- **The server exits instead of coming up in failure mode.** See below.

:::details When a Plugin Crashes the Start Outright
Sometimes a plugin takes the start down before the web server is up, so there's no failure mode to show: the server
exits, and a Docker container set to restart starts it again. When Shoko can tell which plugin was behind that, it
writes the plugin down before exiting. The next start leaves that plugin out and comes up in failure mode, with the
status page naming the plugin. Its reason, read with `GET /api/v3/Plugin` as in
[Fix a Failed Plugin](#fix-a-failed-plugin), starts with *"The plugin stopped the server from starting the last
time, …"*.

That leaves you exactly one start to deal with it. The note is only kept for that one start, so the start after that
tries the plugin again. Disable or uninstall it before you restart.

If the server exits without coming back in failure mode, and the log doesn't name a plugin, the web server itself
couldn't start, for example because another program is already using its port. The log says why.
:::

If you're still stuck, the status page points you to Discord: share the message from the box.

## Related

- [Setup Mode & Failure Mode](/shoko-server/concepts/setup-mode-and-failure-mode)
- [Plugin Management](/shoko-server/settings/plugin-management)
- [Logs](/shoko-server/logs)
- [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server)
- [FAQ](/faq)
