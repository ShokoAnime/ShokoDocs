---
title: Real-Time Updates (SignalR) | Jellyfin
description: How Shokofin listens to Shoko Server for new files and metadata changes and updates your Jellyfin libraries.
---

# Real-Time Updates (SignalR)

Shokofin can keep a live connection to Shoko Server using SignalR. Over that connection Shoko tells the plugin when files
are added, moved or removed, and when metadata changes. Shokofin then updates the affected parts of your Jellyfin libraries
without waiting for a full library scan.

For the setup steps, see [New Episodes Automatically](/jellyfin/how-to/new-episodes-automatically).

## The Connection

The connection is managed in the Shokofin settings under **SignalR**.

### Connection Status

**Connection Status** shows one of the following:

| Status | Meaning |
| --- | --- |
| **Enabled, Connected** | Shokofin is receiving events. |
| **Enabled, Connecting** / **Enabled, Reconnecting** | A connection attempt is in progress. |
| **Enabled, Disconnected** | The connection was active but has dropped. |
| **Disabled** | Shokofin could connect but isn't connected. Use the connect button. |
| **Unavailable** | Shokofin isn't connected to Shoko yet, or doesn't know the server version. Finish the [connection settings](/jellyfin/configuring-shokofin#connecting-to-shoko-server) first. |

The **Connect** and **Disconnect** buttons below the status take effect immediately.

### Connecting Automatically

With **Basic Settings** → **Auto Connect on Start** enabled, Shokofin connects when Jellyfin starts.

:::warning Start order matters
Auto Connect on Start makes a single attempt, on purpose: instead of retrying on its own and possibly hammering a
Shoko Server that's down, Shokofin gives up after the first failed attempt. If Shoko isn't reachable at that moment, for example because its
container starts after Jellyfin's, the status stays **Disabled** until you connect manually. Start Shoko before Jellyfin, or
check the status after a restart. See
[Troubleshooting](/jellyfin/troubleshooting#signalr-is-disabled-after-a-restart).
:::

### Reconnecting <Badge type="danger" text="Advanced" />

If an established connection drops, Shokofin retries using **Auto Reconnect Intervals (seconds)**. The default is
`0, 2, 10, 30, 60, 120, 300`:

- The intervals are used in the order you enter them.
- The last value is repeated until the connection comes back.
- Leaving the field empty turns automatic reconnecting off.

If Shoko sits behind a reverse proxy, the proxy must allow WebSocket connections. See
[Networking & Reverse Proxies](/shoko-server/networking#signalr).

## File Events

File events cover files that are added to, moved within, renamed in, or removed from Shoko.

- **New files arrive once Shoko has matched them**, not when Shoko first notices or hashes them. The event is sent as
  soon as the file is matched, whether or not Shoko renames or moves it afterwards. A file Shoko can't identify never
  produces an event.
- **Moves, renames and deletions are followed.** A move is handled as the file disappearing from its old location and
  appearing at the new one.
- **In a VFS library**, Shokofin updates the links for that file and tells Jellyfin exactly which paths changed.
- **In a legacy library**, Shokofin tells Jellyfin that the real file path changed, and Jellyfin handles the rest.

Because the events come from Shoko, they work even where Jellyfin's own real-time monitoring doesn't, such as network
shares.

### File Events or Real-Time Monitoring

Use SignalR **File Events** *or* Jellyfin's **Enable real time monitoring** on a library, not both. We recommend file
events:

- **Jellyfin sees a new file, but Shoko doesn't yet:** the file is most likely still unrecognized in Shoko, so Jellyfin
  can't show it anyway.
- **Shoko has the file, but Jellyfin didn't notice it:** file events tell Jellyfin about it.
- **Both notice it:** nothing is gained, and the file watching is doubled. On a VFS library, real-time monitoring also
  makes Shokofin watch the real media folders itself and check every changed file with Shoko.

If Shoko itself doesn't notice new files, fix that on the Shoko side; see
[Detecting New Files](/shoko-server/settings/import#detecting-new-files).

## Metadata Events

Metadata events tell Shokofin that information about a series, episode or movie was added, updated or removed in Shoko,
for example a missing episode title that has since arrived from AniDB. Shokofin then refreshes the affected shows,
seasons, episodes and movies.

- **Event Sources** <Badge type="danger" text="Advanced" /> chooses which providers' changes count: **Shoko**, **AniDB** and
  **TMDB**. All three are enabled by default.
- A metadata event refreshes metadata but doesn't replace images.

## Per-Library Settings

Whether a library reacts to events is set per library:

- **New Library Settings** are the defaults copied into each library the first time Shokofin sees it. **File Events** is on
  and **Metadata Events** is off.
- **Existing Library Settings** lets you pick a library and change **File Events** and **Metadata Events** for it.

Only libraries with **Metadata Events** enabled are refreshed when metadata changes.

## Timing and Library Scans

- **Events are grouped.** Shokofin doesn't react to each event right away. It waits until no new events have arrived for
  the same file (or, for metadata events, the same series) for a few seconds, then reacts once to the whole group. A file
  that is matched and then renamed and moved by Shoko causes one update in Jellyfin, not several.
- **Expect a short delay, then Jellyfin's own work.** After those few seconds, Jellyfin still has to gather metadata for
  the new or changed items. Depending on your library settings, such as trickplay or chapter image extraction, that can
  take anywhere from about a second to several minutes per episode.
- **Events that arrive during a library scan are skipped.** The scan itself picks up whatever changed. If something changed
  in Shoko during a scan and still isn't showing, run another scan or refresh the item. See
  [Troubleshooting](/jellyfin/troubleshooting#changes-made-during-a-scan-did-not-show-up).
- **Each item is refreshed at most once per busy period.** Once Shokofin has been idle for a short while, the same item can
  be refreshed again.

## Related

- [New Episodes Automatically](/jellyfin/how-to/new-episodes-automatically)
- [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies)
- [Settings Reference → SignalR](/jellyfin/configuring-shokofin#signalr)
- [The Virtual File System](/jellyfin/concepts/virtual-file-system)
- [Networking & Reverse Proxies](/shoko-server/networking)
