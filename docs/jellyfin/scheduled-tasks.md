---
title: Scheduled Tasks | Jellyfin
description: The scheduled tasks Shokofin adds to Jellyfin, what they do, and when to run them.
---

# Scheduled Tasks

Shokofin adds its tasks to Jellyfin's **Dashboard** → **Scheduled Tasks** page, under the **Shokofin** category. You can
run them manually or give them triggers there. More on how Jellyfin tasks work is in
[Jellyfin's documentation](https://jellyfin.org/docs/general/server/tasks/).

Most tasks run automatically when needed, so you rarely have to start them yourself. Tasks marked **Advanced mode** are
only listed after you enable [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode) in the plugin settings.

:::warning Library scans
Tasks marked **No** under *Safe during a library scan* change library items directly. Don't start them manually while
Jellyfin is scanning a library. Tasks marked **Skips itself** simply do nothing if a scan is running.
:::

## Tasks

| Task | Visibility | Default trigger | Safe during a library scan | What it does & when to run it |
|---|---|---|---|---|
| Auto-Refresh Metadata | Always | None | Skips itself | Refreshes Shokofin-managed episodes and movies that aired in the last few days (with their seasons and shows), plus items that haven't been refreshed in a long time. Give it a daily trigger if you follow airing shows and want new titles, descriptions and images to show up without a full library refresh. |
| Clean up Virtual File System Roots | Advanced mode | At startup | Skips itself | Deletes VFS folders that no longer belong to a library: VFS roots at a previous **VFS Location**, and folders for removed libraries inside the current one. It also recreates missing roots for existing libraries. Because it deletes anything unknown, a **Custom VFS Root Location** must be a dedicated folder. |
| Check Server Version | Advanced mode | At startup | Yes | Fetches the version and settings of the connected Shoko Server. Run it after updating Shoko Server if the plugin doesn't pick up the new version on its own. |
| Export User Data | Always | None | Yes | Sends watch state from Jellyfin to Shoko for every [linked user](/jellyfin/configuring-shokofin#users). Jellyfin's data wins when it's newer than Shoko's. Nothing is imported. Run it before [re-creating a library](/jellyfin/how-to/re-create-a-library-safely). |
| Import User Data | Always | None | Yes | Pulls watch state from Shoko into Jellyfin for every linked user. Shoko's data wins when it's newer, or when Jellyfin has none. Nothing is exported. Run it after re-creating a library. |
| Sync User Data | Always | None | Yes | Imports or exports watch state per item for every linked user, whichever side changed most recently. Run it once after linking a user, and consider a daily trigger to catch up on anything missed while Shoko was unreachable. See [Watch State Sync](/jellyfin/concepts/watch-state-sync). |
| Merge Episodes | Advanced mode | None | No | Merges all episode entries for the same Shoko episode into one entry with multiple versions. Use it after changing the [multiple versions settings](/jellyfin/configuring-shokofin#multiple-versions-settings), or if versions weren't merged automatically. |
| Merge Movies | Advanced mode | None | No | The same as **Merge Episodes**, for movies. |
| Split Episodes | Advanced mode | None | Skips itself | Splits all merged episode entries back into separate entries. Use it if you turn off **Automatically Merge Multiple Versions**. |
| Split Movies | Advanced mode | None | Skips itself | The same as **Split Episodes**, for movies. |
| Reconstruct Collections | Advanced mode | None | No | Rebuilds all collections managed by Shokofin. This already happens after every library scan unless **Automatically Reconstruct Collections** is off. |
| Reconstruct Playlists <Badge type="tip" text="Next release" /> | Advanced mode | None | No | Rebuilds all playlists managed by Shokofin. This already happens after every library scan unless **Automatically Reconstruct Playlists** is off. |

Besides these tasks, Shokofin also merges multiple versions of items after they're refreshed, and after library scans,
without you having to run anything.

:::info Coming from an older version?
The **Migrate Episode User Watch Data** task has been removed, because Jellyfin removed the mechanism it relied on. There
is no replacement to run. The **Cleanup Virtual
File System Roots** task is now called **Clean up Virtual File System Roots**.
:::

## Related

- [Settings Reference](/jellyfin/configuring-shokofin)
- [Sync Watch State](/jellyfin/how-to/sync-watch-state)
- [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely)
- [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions)
