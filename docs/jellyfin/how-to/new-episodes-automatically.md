---
title: New Episodes Automatically | Jellyfin
description: Set up Shoko Server and Shokofin so new episodes you add show up in Jellyfin on their own.
---

# New Episodes Automatically

By the end of this guide, you can add a new episode to a folder, whether you copied it, ripped it or got it some other
way, and it appears in Jellyfin by itself. Shoko Server imports and identifies the file, Shokofin hears about it over
SignalR, and only the affected show is updated. There's no need to wait for or start a library scan.

```text
file added → Shoko imports & identifies → Shokofin gets a file event → Jellyfin shows the episode
```

## Before You Start

- Shokofin is installed and connected, and you have a working library. See the [Quick Start](/jellyfin/quick-start).
- Jellyfin must be able to see the file at its final location. If Shoko moves files into a destination folder, that
  destination must be one of the library's media folders.
- In Docker or behind a reverse proxy, the SignalR connection needs to reach Shoko. See
  [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies).

## In Shoko Server

Managed folders were called import folders on Shoko Server 5.x.

1. Open the Shoko Web UI and go to **Settings** → **Import** → **Managed Folders**.
2. For the folder you add new files to, click **Edit Folder** (or **Add Folder** for a new one):
   - Set **Watch For New Files** to **Yes** so Shoko notices new files straight away. This relies on change
     notifications from the operating system (inotify on Linux), which often don't arrive for network shares or some
     Docker setups. If they don't, leave it off and have whatever adds the file notify Shoko through its API instead.
     See [Detecting New Files](/shoko-server/settings/import#detecting-new-files).
3. Click **Save**.

That's all Shoko needs. As soon as Shoko has matched a new file, it sends an event, and the file shows up in Jellyfin.
You don't need to have Shoko rename or move files for this.

Optional: if you do want Shoko to organize new files, set **Drop Type** to **Source** on the folder you add files to and
to **Destination** (or **Both**) on the folder your Jellyfin library points at, and enable **Rename on import** and
**Move on import** under **Import Options**. Shokofin follows the move, so the file still shows up in the right place.

## In Shokofin

1. In the Jellyfin dashboard, open the Shokofin settings and go to the **SignalR** tab.
2. Under **Connection Status**, click **Connect**. The status should change to **Enabled, Connected**.
3. Under **Basic Settings**, check **Auto Connect on Start** and click **Save**.
4. Under **Existing Library Settings**, pick your library from **Configure settings for**.
5. Make sure **File Events** is checked. Check **Metadata Events** too if you want episode titles and descriptions that
   arrive later to be filled in automatically.
6. Click **Save**.

## In Jellyfin

1. In the library's settings, leave **Enable real time monitoring** off. File events already cover every file Shoko
   imports, and enabling both only doubles the file watching. See
   [File events or real-time monitoring](/jellyfin/concepts/real-time-updates#file-events-or-real-time-monitoring).
2. Go to **Dashboard** → **Scheduled Tasks** and open **Auto-Refresh Metadata** in the **Shokofin** category.
3. Add a daily trigger. This refreshes recently aired episodes, which helps with shows that are still airing and get
   their details filled in over time.

## Check That It Worked

1. Put a new episode into your drop source folder, or straight into the library folder.
2. Wait for Shoko to hash and identify it. You can follow this on the Shoko dashboard.
3. A few seconds after Shoko matches the file, Jellyfin starts adding it. Shokofin waits briefly so that related changes,
   such as a rename and move right after matching, are handled in one go. Jellyfin then gathers the episode's metadata,
   which can take from about a second to several minutes per episode depending on your library settings.

Files that Shoko can't identify don't show up. Find them in the Shoko Web UI under **Utilities** →
**Unrecognized Files**.

## If It Didn't Work

- **Shoko never notices the new file:** it doesn't show up in Shoko at all until you run an import by hand. The operating
  system's change notifications aren't reaching Shoko, which is common with network shares and some Docker setups. Have
  whatever adds the file notify Shoko through its API instead. See
  [Detecting New Files](/shoko-server/settings/import#detecting-new-files).
- **The status says Disabled after a restart:** Shoko probably wasn't reachable when Jellyfin started. See
  [Troubleshooting: SignalR is disabled after a restart](/jellyfin/troubleshooting#signalr-is-disabled-after-a-restart).
- **The file was added while a library scan was running:** events during a scan are skipped. See
  [Troubleshooting: Changes made during a scan did not show up](/jellyfin/troubleshooting#changes-made-during-a-scan-did-not-show-up).
- **The file was moved somewhere Jellyfin can't see:** check that the destination folder is part of the library.
- **The file is still unrecognized in Shoko:** see [Unrecognized Files](/shoko-server/unrecognized-files).

## Related

- [Real-Time Updates (SignalR)](/jellyfin/concepts/real-time-updates), how file and metadata events work.
- [Settings Reference → SignalR](/jellyfin/configuring-shokofin#signalr)
- [Scheduled Tasks](/jellyfin/scheduled-tasks)
- [Running Shoko Server](/getting-started/running-shoko-server)
