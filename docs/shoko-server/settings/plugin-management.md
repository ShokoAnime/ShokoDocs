---
title: Plugin Management Settings
description: "Plugin Management in the Shoko Web UI: installing, updating and configuring Shoko Server plugins."
---

# Plugin Management

The **Plugin Management** tab installs, updates and removes Shoko Server plugins. Plugins add features to Shoko Server
itself, such as release providers or relocation providers. They're not the same as [media server/player plugins](/getting-started/available-programs-plugins#media-server-player-plugins), which are
installed in the media server or player you watch with.

The search box filters every section, and the gear icon opens the [update settings](#update-settings).

## Installed

Lists your installed plugins with their version. For each plugin you can:

- **Enable or disable** it with the power icon.
- **Uninstall** it with the trash icon. Tick **Remove plugin configuration** to also remove its settings; leave it
  unticked to keep them in case you reinstall the plugin later.

A **Restart required** badge means the change takes effect after restarting Shoko Server, which you can do from the
[General](/shoko-server/settings/general) tab. **Incompatible** means the plugin can't be loaded by your version of
Shoko Server.

Some built-in plugins can't be disabled or uninstalled. Disabling or uninstalling a plugin that others depend on
takes them into account; see [Plugins That Need Other Plugins](#plugins-that-need-other-plugins).

## Browse

Lists the plugins available from your [repositories](#repositories), with their description, authors and tags. The
latest release has an **Install** button, unavailable when it's already installed or incompatible; older versions are under **Show older versions**. Installing shows the
release notes before you confirm.

## Updates

**Check For Updates** looks for newer versions of your installed plugins. Click **Upgrade** next to a plugin to review
its release notes and install the update. Updates also need a restart to take effect.

## Plugins That Need Other Plugins

A plugin can depend on other plugins, and Shoko brings those along. Installing one from **Browse**, or upgrading it,
installs every plugin it requires that you don't have yet, or installs nothing at all when one of them can't be met —
no enabled repository has it, an installed version is pinned outside the range the plugin asks for, or the versions
can't be reconciled. Dependencies a plugin only suggests are left alone.

A plugin that arrived this way is marked as installed as a dependency, and has no enabled state of its own: it's
enabled while a plugin that needs it is enabled, and switches off with it. Enabling or disabling it yourself gives it
a state of its own, which then wins, and installing it on purpose makes it an ordinary plugin.

Uninstalling a plugin also uninstalls the dependencies it leaves behind that nothing else needs, apart from versions
you pinned or asked to keep. Plugins you installed yourself are never removed for you.

Dependencies also decide what you can switch off:

- **Disabling** is refused while another enabled plugin requires it, and names the plugins in the way. A plugin that
  lists it as optional carries on without it, so it isn't one of them.
- **Uninstalling** is refused while an installed plugin requires it, enabled or not.
- **Enabling** is refused while a plugin it requires is missing, and names what's missing. A dependency that's only
  enabled because something needs it counts as enabled here.

## Repositories

Repositories are where plugins come from. Shoko ships with two of them:

| Repository | What it holds | |
| --- | --- | --- |
| **Shoko Core Repository** | Plugins that are part of the official Shoko organization. | Enabled |
| **Shoko Community Repository** | Plugins owned by their own authors, curated by the Shoko team. | Disabled |

Both are added the first time your server starts with them, and only that once: if you remove one, it stays removed.
The community repository is added disabled, which means it's never synced and its plugins aren't offered, so **Browse**
shows the core repository's plugins until an admin enables it.

To add your own, **Add Repository** asks for a **Name** and a **Manifest URL**. **Sync All** refreshes every
repository, and each repository has its own sync and delete buttons along with the time of its last sync. What a
repository holds is up to whoever maintains it, so the plugin list you see in **Browse** comes from the repositories
themselves rather than from this page.

## Update Settings

The gear icon opens settings for keeping plugins up to date:

| Option | What it does | Default |
| --- | --- | --- |
| **Automatically Upgrade Plugins** | Installs plugin updates on its own, instead of waiting for you to click **Upgrade**. | Off |
| **Inactive Version Retention** | How long the version a plugin was upgraded from stays installed, before the **Purge Inactive Plugin Versions** scheduled action removes it. It counts from the upgrade, not from the restart that activated the new version. | 30 Days |

## Plugin Pages

Plugins can bring pages of their own: whatever interface the plugin chose to serve, rather than its settings. They're
listed under **Plugins** in the settings sidebar, below the built-in tabs, grouped by the plugin they came from. A
page that can be embedded opens inside the settings, with a button on it to open it in a new browser tab instead; one
that can't opens in a new tab straight away.
