---
title: General Settings
description: "General settings in the Shoko Web UI: version information, restarting, themes, notifications and logs."
---

# General

![Shoko Server - Settings - General](/images/shoko-server/shoko-server-settings-general.jpg)

The **General** tab covers version details, theme customization, notifications and log files. When your installation
supports it, the tab's header also has buttons to **restart** or **shut down** Shoko Server, each asking for confirmation
first.

## Version Information

Lists the installed version and release channel of both Shoko Server and the Web UI. Click **Refresh** to check for
updates. The link next to each version shows the commits made since that version.

Shoko Server and the Web UI are independent pieces of software, so you can update one without the other, but we always
recommend updating both to reduce potential problems. The **Web UI Channel** can be switched between **Stable** and
**Dev** here.

:::warning Switching Channels
While you are more than welcome to switch channels, you can only switch back to stable when a new version of
**Shoko Server** is released. Keep in mind dailies are meant for testing new features and can break your collection,
so unless you absolutely need to, stick to Stable.
:::

## Theme Options

Choose the **Theme** for the Web UI. Shoko comes with a default theme, and **Upload Theme** adds a theme package you've
downloaded or made yourself. The selected theme's description, version and author are shown below it. See
[Web UI Themes](/shoko-server/webui-themes) for how to create and install custom themes.

## Notification Options

Notifications, or toasts as we call them, can be turned off with **Enable**, and **Notification Position** places them
in the bottom right (the default) or top right of the screen.

## Log Options

| Option | What it does |
| --- | --- |
| **Enable** | Rotates Shoko Server's log files. On by default. Changing it requires a restart. |
| **Compress Logs** | Compresses older log files. On by default. |
| **Delete Older Logs** | Deletes old log files after the **Delete Frequency** (Never, Weekly, Monthly or Quarterly). |
| **Trace Logs** | Writes far more detailed logs. Unless Shoko staff ask you to, there's no reason to enable this, as it greatly increases the size of your log files. |

The other log options are unavailable while **Enable** is off. While we **always** recommend keeping at least a week's worth of logs, it's entirely up to you how long you keep them.
