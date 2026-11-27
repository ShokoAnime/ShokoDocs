---
title: SignalR Hubs
description: "The three SignalR hubs Shoko Server serves, the log stream, the aggregate hub and the startup feed: who may connect, what a client can call, and every message the server sends."
---

# SignalR Hubs

Shoko Server pushes live events to its clients over
[SignalR](https://learn.microsoft.com/aspnet/core/signalr/introduction). It serves three hubs:

| Hub | Path | What it's for | Who may connect |
| --- | --- | --- | --- |
| [Log stream](#the-log-stream) | `/signalr/logging` | The server's log, as it's written. | Admins; anyone in setup and failure mode. |
| [Aggregate hub](#the-aggregate-hub) | `/signalr/aggregate` | Feeds of events about the collection, the queue, users, plugins and more. | Any signed-in user, once the server has started. |
| [Startup feed](#the-startup-feed) | `/signalr/startup` | What the server says while it starts. | Anyone, until the server has started. |

This page is for developers writing a client, or a plugin that talks to one. To add a feed of your own to the
aggregate hub, see [Pushing to Clients](/writing-plugins/web-apis-and-events#pushing-to-clients).

## Connecting

Any SignalR client works: the JavaScript `@microsoft/signalr` package, the .NET `Microsoft.AspNetCore.SignalR.Client`
package, or another implementation of the protocol. Connect to the server's own address and port, `8111` by default,
followed by the hub's path, such as `http://<your-server>:8111/signalr/aggregate`.

### Signing In

The hubs take the same API keys as the REST API. The server looks for the key in these places, in this order:

- the `apikey` header,
- an `Authorization: Bearer <key>` header,
- the `apikey` query parameter,
- the `access_token` query parameter, read only on a hub and only when none of the others gave a key.

A browser can't set headers on a WebSocket, so the JavaScript client puts the key in `access_token` when you give it
an `accessTokenFactory`. That's the usual way to sign in.

While the server is in [setup mode or failure mode](/shoko-server/concepts/setup-mode-and-failure-mode), no key is
needed, and every connection is let in as the setup user. If a
[setup token](/shoko-server/concepts/setup-mode-and-failure-mode#protect-them-with-a-setup-token) is set, the token
is the key, and a connection without it is refused.

A connection signed in with an API key is closed by the server as soon as that key is deleted or expires, so a client
should be ready to sign in again rather than reconnect with the same key forever.

### Message Format

Messages use SignalR's JSON protocol, written the same way as the REST API's JSON:

- **Property names are PascalCase**, as in the C# models: `FileID`, `RelativePath`, `ManagedFolderID`.
- **Enums are sent by name**, such as `"Information"` or `"Updated"`.
- **Dates are ISO 8601 strings**, in UTC.
- **Event names are camelCase** after the feed's name, such as `metadata:series.imageAdded` or
  `anidb:udp.stateUpdate`.
- **Metadata IDs are strings**, written as `<source>://<type>/<id>`, such as `anidb://episode/1001`.

The server treats a client as gone after 60 seconds without hearing from it. The stock clients send a keep-alive every
15 seconds, well within that.

### Calling Hub Methods

The hub methods have no overloads and SignalR matches a call by its number of arguments, so pass every argument,
optional ones included, as `null` if you have nothing to give. `invoke('feed.join_many', ['queue'])` is refused for
having too few arguments; `invoke('feed.join_many', ['queue'], null)` works.

### Through a Reverse Proxy

A SignalR client tries WebSockets first, then Server-Sent Events, then long polling. Behind a reverse proxy, forward
WebSocket upgrades for `/signalr/` and allow long-lived connections, or every client falls back to the slower
transports. See [Networking & Reverse Proxies](/shoko-server/networking#signalr).

## The Log Stream

`/signalr/logging` streams the server's log.

- **Who may connect:** admins, once the server has started. In setup and failure mode anyone may, as the setup user,
  so a start that went wrong can be followed; with a setup token set, only with the token as the key. While the server
  is still starting, before it reaches either mode, the hub refuses everyone.
- **What you can call:** nothing.

The server sends two messages:

| Message | When | Argument |
| --- | --- | --- |
| `GetBacklog` | Once, right after you connect. | An array of log messages: the most recent ones the server kept, up to 50, oldest first. |
| `Log` | For every new log message. | One log message. |

A log message looks like this:

```json
{
  "TimeStamp": "2026-11-16T09:41:07.512Z",
  "Level": "Information",
  "ThreadID": 14,
  "ProcessID": 3120,
  "Logger": "Shoko.Server.Scheduling.Jobs.Shoko.HashFileJob",
  "Caller": "Shoko.Server.Scheduling.Jobs.Shoko.HashFileJob.Process",
  "Message": "…",
  "Exception": "System.IO.IOException: …"
}
```

- **`TimeStamp`** is in UTC.
- **`Level`** is `Trace`, `Debug`, `Information`, `Warning`, `Error` or `Critical`.
- **`Exception`** is the full exception with its stack trace, and is left out when the message has none.

Which messages reach the stream follows the server's log settings: by default `Information` and above, or everything
with trace logging on. `Logging.DefaultSignalRLogLevel` in `settings-server.json` sets a level for the stream alone.

## The Aggregate Hub

`/signalr/aggregate` is where clients get events. Rather than sending everything to everyone, it's split into
**feeds**: you join the ones you want, and you get nothing from the others.

- **Who may connect:** any signed-in user, once the server has started. Before that, the hub answers `503` like the
  rest of the API. Some feeds are for admins only, and some events only reach the users allowed to see what they're
  about; see [Who Gets What](#who-gets-what).
- **Messages:** every message from a feed is named `<feed>:<event>`, such as `file:hashed` or `queue:state.changed`,
  and carries one argument, apart from `group:recreated`, which carries none.

### Joining Feeds

You can name the feeds you want when you connect, in the `feeds` query parameter, separated by commas:

```
/signalr/aggregate?feeds=queue,file,metadata
```

or join them afterwards with the hub methods below. Feed names are matched ignoring case. A name the server doesn't
know, or a feed that refuses you, is skipped without an error.

When you join a feed, it may first send you its **starting state** as a `<feed>:connected` message, such as the
queue's current counts or AniDB's ban status. Feeds with nothing to say on joining send no `connected` message.

Once the feeds from the query have joined, after their `connected` messages, the hub sends you `feed.joined` with the
list of feeds you're on. It's sent on every connection, as an empty list when the query named none, so a client can
wait for it before relying on its feeds.

### Hub Methods

Every call that joins or leaves feeds answers with the list of feeds the connection is on afterwards. A feed you asked
for that's missing from the answer was either unknown or refused you; `feed.list_all` tells the two apart.

| Method | Arguments | Answers |
| --- | --- | --- |
| `feed.list_all` | None. | Every feed the server offers, the plugins' included. |
| `feed.list_joined` | None. | The feeds the connection is on. |
| `feed.join_single` | `feed`, `lastConnectedAt` | The feeds the connection is on. |
| `feed.join_many` | `feeds` (an array), `lastConnectedAt` | The feeds the connection is on. |
| `feed.leave_single` | `feed` | The feeds the connection is on. |
| `feed.leave_many` | `feeds` (an array) | The feeds the connection is on. |
| `feed.replace_all` | `feeds` (an array), `lastConnectedAt` | Joins the feeds named and leaves every other one; answers the feeds the connection is on. |
| `feed.clear_all` | None. | Leaves every feed; answers an empty list. |
| `feed.resend_initial` | `feed`, `lastConnectedAt` | Sends the feed's `<feed>:connected` message again; answers `true` if it was sent, `false` when the connection isn't on that feed. |
| `queue.set_pool_info` | `include` (a boolean) | Nothing. Turns the per-pool detail in `queue:state.changed` on or off for this connection. |
| `queue.pause` | `paused` (a boolean) | Nothing. Pauses the queue, or resumes it with `false`. Admins only. |

`lastConnectedAt` is a date, or `null`. It tells a feed when you were last connected, so a feed that supports it can
send only what changed since. None of the core feeds uses it yet, but pass it anyway, as `null` if need be.

`feed.resend_initial` is for a client that shares one connection among several parts of itself: a part that starts
listening later can ask for the feed's starting state without the connection leaving and joining again.

The queue's per-pool detail is off by default, because it's the largest part of the queue state. Besides
`queue.set_pool_info`, you can turn it on when you connect with `queue_pools=true` in the query. It only reaches you
while you're on the `queue` feed, and the choice lasts until the connection closes.

### Core Feeds

Event names are the part after the colon: the queue's `state.changed` arrives as `queue:state.changed`. The payload
models live in `Shoko.Server/API/SignalR/Models/` in the server's source, apart from the few borrowed from APIv3.

| Feed | Who may join | Events | Payload |
| --- | --- | --- | --- |
| `action` | Admins | `triggers.changed`: a scheduled action's triggers were changed. | The action, as `GET /api/v3/Action/Scheduled` lists it. |
| | | `actions.changed`: scheduled actions were added, updated or removed. | `{ Added, Updated, Removed }`, lists of actions. |
| | | `run.started`, `run.completed`: a scheduled action started or finished a run. | `ScheduledActionRunSignalRModel`: the action, `StartedAt`, `CompletedAt`, `IsSuccess`, `IsCancelled`, `Error`. |
| `airing` | Anyone | `episode.aired`: episodes aired. | `{ AiredAt, Airings }`, the airings each user may see. |
| | | `provider.swept`: an airing schedule provider finished a sweep. | `AiringSweepCompletedSignalRModel`. |
| `anidb` | Anyone | `connected`: the state of both AniDB connections. | A list of two status objects, UDP first, then HTTP. |
| | | `udp.stateUpdate`, `http.stateUpdate`: a ban, back-off or login state changed. | See [AniDB Status](#anidb-status). |
| `avdump` | Anyone | `connected`: the AVDump sessions running. | A list of `AvdumpEventSignalRModel`. |
| | | `event`: an AVDump session started, made progress, or ended. | `AvdumpEventSignalRModel`; only the fields that apply are sent. |
| `configuration` | Anyone | `connected`, `requiresRestart`: whether saved configurations wait on a restart. | `{ RequiresRestart }`. |
| | | `saved`: a configuration was saved. | `{ ConfigurationID, RestartPendingFor }`. |
| `file` | Anyone | `detected`: a new file was found in a managed folder. | `{ RelativePath, ManagedFolderID }`. Users with tag restrictions never get it. |
| | | `hashed`: a file was hashed. | See [A File Event](#a-file-event). |
| | | `relocated`: a file was moved or renamed. | The file event, plus `Moved`, `Renamed`, `PreviousRelativePath`, `PreviousManagedFolderID`. |
| | | `deleted`: a file's location was removed. | The file event. |
| | | `updated`: a video's flags changed. | `{ FileID, Changes, IsIgnored, IsVariation }`. |
| `filter` | Anyone | `preset.stored`, `preset.updated`, `preset.deleted`: a filter was saved, changed or deleted. | `{ FilterID, ParentFilterID, Name, IsDirectory }`. |
| `group` | Anyone | `group.added`, `group.updated`, `group.removed`: a group changed. | `{ Reason, GroupID }`. |
| | | `series.moved`: a series moved to another group. | `{ SeriesID, OldGroupID, NewGroupID }`. |
| | | `recreated`: every group was rebuilt. | None. Reload your groups. |
| `managedfolder` | Anyone | `added`, `updated`, `removed`: a managed folder changed. | `{ FolderID }`. |
| `metadata` | Anyone | `series.<reason>`, `episode.<reason>`, `movie.<reason>`, `collection.<reason>`: an entry of any source changed. See below for the reasons. | `{ Source, Reason, SeriesID, ShokoSeriesIDs, Episodes }` for a series; the others are alike. |
| | | `links.changed`: links between AniDB and another source were added, changed or removed. | `{ Reason, ShokoSeriesIDs, Changes }`. |
| | | `customTag.added`, `customTag.updated`, `customTag.removed`: a custom tag changed. | `{ TagID, Name, PreviousName }`. |
| | | `series.customTagsChanged`: a series' custom tags changed. | `{ ShokoSeriesID, AddedTagIDs, RemovedTagIDs }`. |
| | | `autoLinking.changed`: auto-linking was turned on or off for a series and source. | `{ ShokoSeriesID, Source, IsDisabled }`. |
| | | `ordering.added`, `ordering.updated`, `ordering.removed`: an episode ordering changed. | `{ OrderingID, SeriesID, ShokoSeriesID }`. |
| | | `ordering.preferredChanged`: a series' preferred ordering changed. | `{ SeriesID, ShokoSeriesID, PreviousOrderingID, OrderingID }`. |
| | | `episode.hiddenChanged`: an episode was hidden or shown. | `{ EpisodeID, ShokoEpisodeID, IsHidden }`. |
| `network` | Anyone | `connected`, `availabilityChanged`: whether the server can reach the internet. | `{ NetworkAvailability, LastChangedAt }`. |
| `plugin` | Anyone | `installed`, `uninstalled`: a plugin was installed or uninstalled. | `{ PluginID, Name, Version, IsEnabled, IsPinned, IsKept, OccurredAt }`. |
| | | `installQueued`, `installStarted`, `installFailed`, `installCancelled`: a package install moved through the install queue. | `{ QueueEntryID, PackageID, Name, Version, RuntimeIdentifier, OccurredAt, Reason }`. |
| `queue` | Anyone | `connected`, `state.changed`: the queue's counts and running jobs. | See [Queue State](#queue-state). |
| `release` | Anyone | `saved`: a release was saved for a file. | `{ FileID, Release }`. |
| | | `removed`: a file's release was removed. | `{ FileID, Release }`. |
| | | `search.completed`: a release search for a file ended. | `VideoReleaseSearchCompletedSignalRModel`: `FileID`, `IsSaved`, `ReleaseInfo`, the providers tried, and the times. |
| `relocation` | Admins | `preset.stored`, `preset.updated`, `preset.deleted`: a relocation preset changed. | `{ PresetID, Name, ProviderID, IsDefault }`. |
| `restart` | Admins | `connected`, `reasonsChanged`: why the server needs a restart, if it does. | `{ RestartRequired, Reasons }`. |
| `suspension` | Anyone | `connected`: every suspension provider's status. | A list of statuses, as `GET /api/v3/Suspension` returns them. |
| | | `changed`: a provider was suspended or resumed. | One status. |
| `user` | Anyone | `added`, `updated`, `removed`: a user account changed. | `{ UserID, Reason }`. |
| | | `apiToken.generated`, `apiToken.invalidated`: an API key was created, or deleted or removed after it expired. | `{ UserID, Device, ExpiresAt, OccurredAt }`. Only the key's own user and admins get it. |
| `userData` | Anyone | `video.saved`, `episode.saved`, `series.saved`, `group.saved`: a user's watch state, rating, favourite or tags changed. | The user's data for that item, with `UserID` and a `Reason`. Only that user, and admins allowed to see the item, get it. |

The metadata reasons are `added`, `updated`, `removed`, `imageAdded`, `imageUpdated` and `imageRemoved`, so a series
update arrives as `metadata:series.updated` and a new episode as `metadata:episode.added`. The `group`
feed's events are built the same way.

Plugins can add feeds of their own to the hub, which show up in `feed.list_all` next to these. See
[Web APIs & Events](/writing-plugins/web-apis-and-events#pushing-to-clients).

### Who Gets What

Two rules decide whether a message reaches you, on top of which feeds you joined:

- **Admin-only feeds.** `action`, `relocation` and `restart` refuse anyone who isn't an admin. Joining one as another
  user is skipped like an unknown feed.
- **Tag restrictions.** A user with tag restrictions only gets events about series they're allowed to see. This
  applies to the `airing`, `avdump`, `file`, `group`, `metadata`, `release` and `userData` feeds. An event that can't
  be checked against a series, such as a new file nobody has matched yet, only reaches users without tag
  restrictions. When one event covers several items, as `airing:episode.aired` and `metadata:links.changed` do, each
  user gets the part they may see, and nothing when that's none of it.

### Example Payloads

#### Queue State

`queue:connected` and `queue:state.changed` carry the same object. `state.changed` is sent at most four times a
second, however busy the queue is.

```json
{
  "Running": true,
  "WaitingCount": 12,
  "BlockedCount": 3,
  "ScheduledCount": 0,
  "TotalCount": 16,
  "ThreadCount": 4,
  "CurrentlyExecuting": [
    {
      "Key": "…",
      "Type": "HashFileJob",
      "Title": "Hashing File",
      "Details": { "File Path": "/Anime/Starlight Academy/[SSZ] Starlight Academy - 03 [1080p].mkv", "Find Release": true },
      "IsRunning": true,
      "StartTime": "2026-11-16T09:41:07.512Z",
      "IsBlocked": false,
      "IsScheduled": false,
      "PoolName": "…",
      "RetryCount": 0,
      "ScheduledAt": null,
      "ParentKey": null,
      "IsCancellable": true,
      "IsCancellationRequested": false,
      "Progress": 0.42
    }
  ],
  "Pools": []
}
```

`Pools` is empty unless the connection asked for the per-pool detail. The items are the same as
`GET /api/v3/Queue/Items` returns.

#### A File Event

`file:hashed`, `file:relocated` and `file:deleted` share these fields. `RelativePath` starts with a separator, and
the absolute path is never sent. `CrossReferences` lists the AniDB episodes the file is linked to, with the Shoko IDs
when the series exists; `MetadataCrossReferences` lists its links to entries of any source.

```json
{
  "FileID": 1520,
  "FileLocationID": 1611,
  "ManagedFolderID": 1,
  "RelativePath": "/Starlight Academy/[SSZ] Starlight Academy - 03 [1080p].mkv",
  "CrossReferences": [
    { "EpisodeID": 9003, "AnidbEpisodeID": 100003, "SeriesID": 310, "AnidbAnimeID": 15001, "GroupID": 120 }
  ],
  "MetadataCrossReferences": [
    { "IDs": ["anidb://episode/100003", "anidb://series/15001"], "PercentageStart": 0, "PercentageEnd": 100 }
  ],
  "UsedExistingHashes": false,
  "IsNewVideo": true,
  "IsNewFile": true,
  "Hashes": [
    { "Type": "ED2K", "Value": "…", "Metadata": null }
  ]
}
```

The last four fields are `file:hashed`'s own.

#### AniDB Status

`anidb:udp.stateUpdate` and `anidb:http.stateUpdate` carry one status, and `anidb:connected` a list of both:

```json
{
  "Value": true,
  "Message": null,
  "UpdateType": "UDPBan",
  "UpdateTime": "2026-11-16T09:41:07Z",
  "PauseTimeSecs": 1800
}
```

`UpdateType` is `None`, `UDPBan`, `HTTPBan`, `InvalidSession`, `OverloadBackoff`, `WaitingOnResponse` or
`LoginFailed`, and `Value` says whether that state is in effect. `UpdateTime` is in UTC.

## The Startup Feed

`/signalr/startup` tells a client what the server says while it starts, so it can show progress instead of polling.

- **Who may connect:** anyone, without a key, but only while the server isn't started: while it's starting, waiting
  in setup mode, or after a start that failed. Once the server has started, the hub refuses every connection, with
  `401`, or `403` when the request carried a valid API key. In setup and failure mode with a setup token set, only a
  connection giving the token as `access_token` is let in.
- **What you can call:** nothing.

The server sends three messages, in this order:

| Message | When | Argument |
| --- | --- | --- |
| `Backlog` | Once, first. | Everything the start has said so far, oldest first: `[{ Message, Time }]`. |
| `State` | Right after the backlog, then whenever the state changes. | `{ State, Message }`. |
| `Message` | For every new message after the backlog. | `{ Message, Time }`. |

`Time` is in UTC. `State` is one of four values, written as `GET /api/v3/Init/Status` writes them:

| `State` | Meaning | `Message` |
| --- | --- | --- |
| `Starting` | The server is starting. | What it's doing at the moment, or `null`. |
| `Waiting` | The server is in setup mode, waiting for the first-run setup to be finished. | `null` |
| `Failed` | The start failed, and the server is in failure mode. | Why it failed. |
| `Started` | The server has started. | `null` |

Messages always arrive before the state they led to. When the server finishes starting, the feed sends the last
messages, then `State` with `Started`, and closes the connection 2 seconds later; from then on, use the aggregate hub.
Setup mode and failure mode keep the connection open, so a client following a first-run setup sees `Waiting`, then
`Starting` once the setup is finished, then `Started`. The one exception: with a setup token set, a start that fails
closes every connection that didn't give the token, instead of telling it why. Connect again with the token as
`access_token` to follow failure mode.

The startup feed is newer than the other hubs. When it isn't there, for example on an older server, fall back to
polling `GET /api/v3/Init/Status`, which reports the same states.

## Example

This joins the queue and file feeds with the JavaScript client, and prints the queue's counts as they change:

```js
import { HubConnectionBuilder } from '@microsoft/signalr'

const apiKey = '<your API key>'

const connection = new HubConnectionBuilder()
  .withUrl('http://localhost:8111/signalr/aggregate?feeds=queue', {
    accessTokenFactory: () => apiKey,
  })
  .withAutomaticReconnect()
  .build()

connection.on('queue:connected', (state) => console.log('Queue on join:', state.TotalCount))
connection.on('queue:state.changed', (state) => console.log('Queue now:', state.TotalCount))
connection.on('file:hashed', (file) => console.log('Hashed', file.RelativePath))
connection.on('feed.joined', (feeds) => console.log('On feeds:', feeds))

await connection.start()

// Join another feed later; pass every argument, null included.
const feeds = await connection.invoke('feed.join_single', 'file', null)
console.log('Now on:', feeds)
```

A reconnect is a new connection, which starts with no feeds. When you join feeds with the hub methods rather than the
query, join them again in `onreconnected`.

## Related

- [Web APIs & Events](/writing-plugins/web-apis-and-events): adding a feed or a hub from a plugin.
- [Networking & Reverse Proxies](/shoko-server/networking#signalr): forwarding WebSockets.
- [Setup Mode & Failure Mode](/shoko-server/concepts/setup-mode-and-failure-mode): what answers while the server isn't
  started, and the setup token.
- [Use the API with Swagger](/api/use-the-api-with-swagger): API keys and the REST API.
