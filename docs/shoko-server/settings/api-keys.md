---
title: API Keys Settings
description: "API Keys settings in the Shoko Web UI: issued keys and generating new ones."
---

# API Keys

![Shoko Server - Settings - API Keys](/images/shoko-server/shoko-server-settings-api.jpg)

The **API Keys** tab lists every API key used by Shoko and other programs and plugins, and lets you create or remove
keys.

## Generate API Key

Type a name for the new key and click **Generate**, then copy the key. Once you leave this page you won't be able to see
it again, so be sure to copy it first. You usually only need this for a script, tool or plugin you set up yourself.

## Issued API Keys

Every issued key is listed by name, with a **Delete** button. Please refrain from removing keys that you didn't create
yourself, as they're often created automatically by a plugin you're using, and removing them can break it.

Media server/player plugins name their keys after themselves. For example, Shokofin creates a key named
`Shoko Jellyfin Plugin (Shokofin)` for its main connection and `Shoko Jellyfin Plugin (Shokofin) - User Key` for each
linked Jellyfin user. If you delete one of these, reconnect the plugin (or re-link the user) from its settings.
