---
title: User Management Settings
description: "User Management settings in the Shoko Web UI: users, passwords, avatars and tag restrictions."
---

# User Management

![Shoko Server - Settings - User Management](/images/shoko-server/shoko-server-settings-users.jpg)

The **User Management** tab manages Shoko user accounts: usernames, passwords, avatars and which tags each user is
restricted from seeing. Shoko doesn't have a full-fledged user system, but multiple accounts are useful for media player
plugins and for tracking separate watch states.

## Current Users

Lists all users. Click the edit icon to load a user into the options below, or the delete icon to remove them. You can't
delete the account you're logged in with.

**Add User** asks for a **Username**, **Password** and **Confirm Password**.

:::tip Accounts for Media Server/Player Plugins
Plugins that sync watch states, such as [Shokofin](/jellyfin/how-to/sync-watch-state), link each media player user to a
Shoko account; for Plex, see [Syncing Watched States (Legacy)](/plex/legacy-agents-and-scanners/syncing-watched-states). Give each person their own account
so they have their own watch state. These accounts don't need **Administrator**.
:::

## User Options

| Option | What it does |
| --- | --- |
| **Pick Avatar** / **Remove Avatar** | Sets an avatar for the Web UI. You can crop and zoom the image before applying it. |
| **Change Password** | Sets a new password. Tick **Logout all sessions** to sign the account out everywhere, including API keys issued to it. |
| **Display Name** | The account's username. |
| **Administrator** | Gives the account access to settings and other admin-only features. |
| **AniDB User** | Marks this as the account whose watch states are synced with AniDB. Don't enable it for more than one user, since multiple AniDB accounts aren't supported. |
| **Plex Users** | The Plex usernames whose watch states belong to this account, for [syncing watched states (legacy)](/plex/legacy-agents-and-scanners/syncing-watched-states). |

Click **Save** to apply changes to the selected user.

## Tag Restrictions

Search **Available Tags** and click a tag to add it to **Selected Tags**. Series with a selected tag are hidden from this
user.

:::warning Restricting Tags
Tag restrictions take precedence over every other setting related to viewing series.

Only AniDB tags can be selected. A restricted series is hidden from *everything* that uses that account, including media
player plugins such as Shokofin and Shoko Relay. Don't add restrictions to the account your media server/player plugin connects
with unless you want those series hidden there too.
:::
