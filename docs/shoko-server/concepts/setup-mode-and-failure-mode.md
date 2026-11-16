---
title: Setup Mode & Failure Mode
description: "The two states where Shoko Server is reachable but not running: before the first-run setup is finished, and after a start that failed. What each one allows, and how to get out of it."
---

# Setup Mode & Failure Mode

Shoko Server starts in two halves. The first half brings up the web server, loads the plugins and sets them up. The
second half opens the database, connects to AniDB, starts watching your folders and starts the scheduled actions.
Only when both halves are done is the server **started**, and only then does the Web UI let you sign in.

There are two ways to end up with only the first half:

- **Setup mode.** A new install stops after the first half and waits for you to finish the first-run setup.
- **Failure mode.** Something went wrong during the start, but the web server was already up, so the server stays
  reachable and tells you what failed instead of quitting.

In both, the web server answers and the Web UI loads, but your collection isn't available. Most of the API answers
`503` with a short message, and media server and player plugins can't connect.

Seeing **Shoko failed to start**? See [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start).

:::warning Anyone Can Use the Server in These Modes, by Default
In setup mode and failure mode the server doesn't check who you are. Everyone who reaches the server's port is let
in as the setup user, without a password or API key, with full rights to everything that answers in that mode.
Don't leave a server sitting in either mode where people you don't trust can reach it, or set a
[setup token](#protect-them-with-a-setup-token).
:::

### Protect Them with a Setup Token

Set a setup token, a password of your choosing, with the `SHOKO_SETUP_TOKEN`
[environment variable](/shoko-server/how-to/use-environment-variables) (or `Web.SetupToken` in `settings-server.json`)
and restart. From then on, setup mode and failure mode only let in requests that give the token as their API key:
in Swagger, enter it under **Authorize**; in a script, send it in the `apikey` header like any API key. Leave it empty
to keep both modes open, as they are by default.

<!-- TODO: say that the Web UI asks for the setup token once the stock Web UI's setup-token prompt is released. -->

Plugins can set or clear the setup token too, for example during their own onboarding. A token set that way is saved
in the settings and takes effect at once, but while `SHOKO_SETUP_TOKEN` is set, the environment variable wins and
can't be changed from a plugin.

The token only matters in these two modes. Once the server has started, you sign in with your account as usual.

## Setup Mode

A fresh install is in setup mode until the first-run setup has finished successfully. Opening the Web UI takes you to
the sign-in page, which says *"Welcome, and thank you for installing Shoko!"* and offers **Continue** in place of the
sign-in form. **Continue** opens the first-run wizard.

While the server is in setup mode:

- **Works:** the first-run wizard, saving the settings it asks for, and the AniDB login test.
- **Doesn't work yet:** your collection, the dashboard, settings outside the wizard, signing in, and every client.
  The database hasn't been opened, so there's nothing to show. The queue is running, but tasks that need the database
  wait.
- **Not started yet:** watching your managed folders, the AniDB connection for file lookups, and the scheduled
  actions.

### Finishing Setup

The wizard walks you through **Acknowledgement**, **Local Account**, **AniDB Account**, **Metadata Sources**, **Start
Server**, **Managed Folders** and **Data Collection**. Each step is described in
[Running Shoko Server](/getting-started/running-shoko-server).

The step that ends setup mode is **Start Server**. Clicking its **Start Server** button runs the second half of the
start: the database is created (or upgraded), your local account is made, the plugins' own databases are brought up
to date, and Shoko connects to AniDB and starts watching folders. The **Status** line shows each stage as it goes. When
it reads **Started!**, **Next** takes you on to **Managed Folders**, signed in as the local account you created.

Setup mode is over as soon as that start succeeds, even if you close the wizard there: from then on, the server
starts fully on every start. **Finish** on the last step queues **Run Import** and opens the dashboard.

### When Start Server Fails

If something goes wrong after you click **Start Server**, the **Status** line shows the error instead of **Started!**,
and both **Back** and **Next** stay greyed out. The server is now in failure mode.

Setup only counts as finished once the start has succeeded, so after you've fixed the cause (see
[What Can Cause It](#what-can-cause-it)) and restarted the server, it comes back in setup mode and you go through the
wizard again. Reload the Web UI once the server is back up, to get to the sign-in page with **Continue**.

## Failure Mode

Failure mode means the server got as far as starting its web server, then something stopped the start. Rather than
exiting, which would leave you with no page at all and a Docker container that restarts over and over, it stays up
and reports why. Nothing in the queue runs until the next start, and anything after the failing step simply didn't
happen.

### What You See

Every page of the Web UI shows a status page instead, with, from top to bottom:

- The headline **Shoko failed to start**.
- *"The server process is still running, so you can restart it from here."*, only when your install lets the server
  restart itself, which the Docker image does by default.
- *"Still stuck? Hop on our Discord and share the message above."*
- The message the server gave for the failure, in a box. This is the most useful thing on the page. If the database
  is also blocked, the box starts with *"Database blocked:"* and the reason.
- A **Restart Server** button, again only when the server can restart itself.

For a failed plugin, the box only names the plugin and says *"See the plugin for the reason."* The reason itself is
kept with the plugin: see [Fix a Failed Plugin](/shoko-server/how-to/recover-from-a-failed-start#fix-a-failed-plugin)
for how to read it.

While the server is still starting normally, the status page reads **Shoko is starting up…** with the current step
underneath instead. That isn't failure mode: a large database upgrade can take a long time, so leave it alone until it
either finishes or fails.

### What Can Cause It

The message tells you which kind of failure it is. These are the ones you're most likely to see:

| Message | What happened | What to do |
| --- | --- | --- |
| *"Failed to start because plugin "Name" (1.2.3) failed. See the plugin for the reason."* | An enabled plugin couldn't be loaded or set up: it's built for another version of Shoko, it needs another plugin that's missing or disabled, or it threw an error | Disable, replace or uninstall it. See [Fix a Failed Plugin](/shoko-server/how-to/recover-from-a-failed-start#fix-a-failed-plugin) |
| *"Failed to start because 2 plugins failed: …"* | The same, for several plugins at once | The same, for each one it names |
| *"Failed to start. Could not connect to database!"* | Shoko runs on a database server (MySQL, MariaDB or SQL Server) and couldn't reach it. It tries for at least a minute first, showing *"Waiting for database connection... (1/60)"* | Make sure the database server is running and reachable from Shoko, then restart |
| *"The database version is bigger than the supported version by Shoko Server. You should upgrade Shoko Server or manually restore your database from a backup."* | The database was last used by a newer version of Shoko than this one | Go back to the newer version, or restore a backup taken with this one. See [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server) |
| *"Plugin "Name" (…) could not apply the migration …"* or *"… could not prepare its database …"* | A plugin's own database couldn't be brought up to date | The message names the plugin and the database, says how to go back to the copy taken before the update, and how to disable the plugin |

For anything else, the message is the error the server ran into, and the log has the full story. Whatever the
cause, failure mode always ends with a restart once you've fixed it: the start never picks itself back up. The steps
are in [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start).

## What This Means for You

- **Finish the first-run setup in one sitting.** Until you do, anyone who can reach the server can use the setup,
  unless you've set a [setup token](#protect-them-with-a-setup-token).
- **Failure mode is there to help you.** The server stays up so you can see what went wrong and fix it without
  digging through files first.
- **A failed plugin is the most common cause, and the easiest to fix.** Disable or uninstall it, restart, and deal
  with the plugin once the server is running again. See
  [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start).
- **Always restart after fixing the cause.** Nothing resumes by itself.
- **Forgot your password?** That's not failure mode. See the [FAQ](/faq#reset-your-password).

## Related

- [Running Shoko Server](/getting-started/running-shoko-server)
- [Plugin Management](/shoko-server/settings/plugin-management)
- [Logs](/shoko-server/logs)
- [The Queue](/shoko-server/concepts/the-queue)
- [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start)
- [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server)
- [FAQ](/faq)
