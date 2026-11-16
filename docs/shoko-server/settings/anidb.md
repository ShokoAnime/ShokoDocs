---
title: AniDB Settings
description: "AniDB settings in the Shoko Web UI: login, downloads, MyList and moved files."
---

# AniDB

![Shoko Server - Settings - AniDB](/images/shoko-server/shoko-server-settings-anidb.jpg)

The **AniDB** tab contains your AniDB login, what Shoko downloads from AniDB for your collection, how Shoko works with
your AniDB MyList, and how it handles files moved on AniDB.

## Login Options

**Username** and **Password** are what Shoko uses to connect to AniDB. If you change them, click **Test** to verify that
Shoko can log in with the new information.

If you dump files using AVDump, enter your **AVDump Key**, which can be found in the account tab of your
[AniDB Profile](https://anidb.net/user/setting). If the key (labelled "UDP API Key") is blank, simply enter one the same
way you would create a password, and click save. **HTTP Server URL** is the AniDB HTTP API address and normally doesn't
need changing.

## Download Options

| Option | What it does | Default |
| --- | --- | --- |
| **Character Images** | Downloads character images. | On |
| **Creator Images** | Downloads images of staff and studios, and looks up the details of each new staff member and studio on AniDB. | On |
| **Always Download Related Anime** | Downloads information about related anime, even if they aren't in your collection. | Off |
| **Related Depth** | How many relation steps away related anime are downloaded, from 0 to 5. Applies when **Always Download Related Anime** or [Auto Group Series](/shoko-server/settings/collection#relation-options) is on. | 1 |

:::info Relation Depth
Every related anime is another AniDB request, so we recommend keeping **Related Depth** at **1** to avoid temporary
bans from AniDB. See [Understanding AniDB Bans](/shoko-server/understanding-anidb-bans) and
[Import a Large Collection](/shoko-server/how-to/import-a-large-collection).
:::

## MyList Options

| Option | What it does | Default |
| --- | --- | --- |
| **Add Files** | Adds your files to your AniDB MyList. | On |
| **Read Watched** / **Read Unwatched** | Imports watched and unwatched states from your MyList. | On |
| **Set Watched** / **Set Unwatched** | Sends watched and unwatched states to your MyList. | On |
| **Storage State** | The storage state given to files added to your MyList. | HDD |
| **Delete Action** | What happens on AniDB when a file is removed from your collection. | Mark Unknown |

## Update Options

| Option | What it does | Default |
| --- | --- | --- |
| **Handle Moved Files** | Processes AniDB's messages about moved files and updates the affected files. | Off |

How often Shoko updates its AniDB data, such as the calendar, anime information, files with missing information and
notifications, is set by the triggers of the AniDB actions under
[Scheduled Actions](/shoko-server/settings/scheduled-actions).
