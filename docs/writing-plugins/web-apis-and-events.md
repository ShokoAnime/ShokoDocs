---
title: Web APIs & Events
description: "Add API endpoints and middleware from a plugin, react to server events, and queue background work."
---

# Web APIs & Events

## Where Your Routes Live

A plugin that serves anything over HTTP picks one **namespace**: a short, URL-safe name of its own, usually the
plugin's name. The casing is yours to pick; the server's own APIv3 uses PascalCase. Everything the plugin serves lives
under `plugin/<namespace>`:

| What | Path |
| --- | --- |
| API endpoints | `/api/plugin/<namespace>/…` |
| Pages and static assets | `/plugin/<namespace>/…` |
| SignalR hubs | `/signalr/plugin/<namespace>/…` |

Use the same namespace in all three, so a client that knows one of your paths can work out the others:

```csharp
[ApiController]
[Authorize]
[Route("api/plugin/MyPlugin/[controller]")]
public class MissingController : ControllerBase { … }
```

The server keeps `/plugin` clear for you, and the Web UI never answers for it, even when it's served from the root. Two
plugins picking the same namespace is a conflict nothing detects, so choose something unmistakably yours. See
[Routes a plugin serves](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Web/Services/README.md#routes-a-plugin-serves).

## API Endpoints

A plugin can add controllers, and they're picked up along with the server's own. Two filters decide whether a request
reaches yours:

| Situation | Response | How to opt out |
| --- | --- | --- |
| The server hasn't finished starting | `503 Service Unavailable` | `[InitFriendly]` |
| The database is blocked | `400 Bad Request` | `[DatabaseBlockedExempt]` |

The not-started check is middleware, so it covers every request, hubs and endpoints you map yourself included. The
database check is an MVC filter, so it guards controller actions only: an endpoint you map yourself is never refused
by it, and `[DatabaseBlockedExempt]` does nothing there.

Both attributes live in `Shoko.Abstractions.Web.Attributes` and can be put on a controller or on a single action. Use
them only for endpoints that genuinely work in those states, such as a setup or status endpoint. Everything that
touches collection data should keep the default behaviour.

Middleware goes in `IPluginApplicationRegistration.RegisterServices`, which runs while the request pipeline is built.
See [The Plugin Lifecycle](/writing-plugins/plugin-lifecycle#where-your-dependencies-go).

:::danger Middleware Doesn't See Your Own Endpoints
The server matches and executes endpoints before it calls your registration hook, so middleware you add there only sees
requests that fell past every endpoint, your own included. Nothing warns you: the middleware registers and simply never
runs for the routes you were trying to guard.

Attach the behaviour to the endpoint instead, with `RequireAuthorization()` or `AddEndpointFilter` when you map it, or
with a filter or attribute on the controller.
:::

## Telling Clients What You Offer

Two lists on your plugin class are how a client finds out what you brought: **features**, which say what the server can
now do, and **pages**, which are UI of your own for someone to open.

### Features

`GetFeatures()` advertises what you can do, so a client turns its own UI on by asking rather than by probing your
endpoints for a 404. It's called every time a client asks, so leave out a feature your current configuration can't
deliver:

```csharp
public IReadOnlyList<PluginFeature> GetFeatures() =>
[
    new()
    {
        Name = "my-sync",
        Version = new(1, 2, 0),
        Visibility = PluginFeatureVisibility.Authenticated,
        Metadata = JObject.FromObject(new { supportsBackfill = true }),
    },
];
```

- **`Name`** is lowercase kebab-case and at most 64 characters, so it can go straight into a URL. Identity is your
  plugin's ID plus this name, so it only has to be unique within your plugin.
- **`Version`** defaults to `1.0.0`. Bump the major on a breaking change, including a change to the shape of
  `Metadata`, and the minor on an addition. Only major, minor and patch are advertised.
- **`Visibility`** is `Anonymous`, `Authenticated` (the default) or `Admin`, and each level includes the ones below it.
- **`Metadata`** is an optional `JObject` of parameters, advertised at the same visibility as the feature itself.

Clients read the list from `GET /api/v3/Plugin/Features`, which answers at the caller's own level: an unauthenticated
caller gets the `Anonymous` features, a signed-in user gets those and the `Authenticated` ones, and an administrator
gets everything, along with which plugin each came from. Only an active plugin advertises anything, and features come
in plugin load order and then in the order you listed them.

:::warning An Anonymous Feature's Metadata Is Public
Visibility covers the metadata too, at the feature's own level, so anything in an `Anonymous` feature can be read
without signing in. Put nothing there that a stranger shouldn't see.
:::

An invalid feature is dropped rather than raised: a malformed or missing name, a null version, an undefined
visibility, or a second feature reusing a name you already used. Each drop is logged as a warning naming the feature
and the reason, once per run. `PluginFeature.IsValid(feature, out var error)` is public so you can check one feature
yourself, but it can't see a duplicate name, which is only caught across the whole list.

### Pages

`GetPages()` offers a link to UI of your own, which the Web UI lists for the user under
[Plugins](/shoko-server/settings/plugin-management#plugin-pages) in its settings:

```csharp
public IReadOnlyList<PluginPage> GetPages() =>
[
    new() { Name = "My Plugin", Url = "/plugin/MyPlugin/index.html" },
];
```

Serve the page itself from [your own namespace](#where-your-routes-live), or point `Url` at an absolute one somewhere
else entirely.

- **`CanEmbed`** defaults to `true`, which shows the page inside the Web UI. Set it to `false` for anything that sends
  frame-busting headers or needs a top-level origin of its own, and the link opens a new window instead.
- **`Visibility`** is `Admin`, the default, or `Authenticated` for every signed-in user. There's no anonymous page,
  since nobody is shown the link before they sign in.

:::danger Visibility Only Hides the Link
It decides who is offered the page, and nothing more. The page and every route behind it still have to check the caller
themselves, exactly as if the link were public.
:::

The list is de-duplicated by `Name` and then by `Url`, first one wins, so two pages sharing either lose one of them
with no warning. Each surviving page gets an ID — a UUIDv5 of its URL within your plugin's ID — which is stable across
restarts and changes when you change the URL, so it's what a client can keep in a route of its own. Clients read the
pages a caller may see from `GET /api/v3/Plugin/Pages`, which answers at the caller's own level;
`GET /api/v3/Plugin/{pluginID}/Pages` lists one plugin's pages for an administrator, visibility and all.

A page is your own UI, not the settings form the server generates from a configuration class. For that, see
[Configuration & Secrets](/writing-plugins/configuration) and [Form UI](/writing-plugins/form-ui).

## Pushing to Clients

The server has an aggregate hub that clients can connect to, so the way to push something is to add a **feed** to it
rather than stand up a second connection of your own. A client that is connected still has to ask for your feed by
name — nothing is sent to one that hasn't joined it — so a feed is an offer, not a broadcast.

Derive from `EventEmitter`, name the feed, and register it from `RegisterServices`:

```csharp
public class MyFeed : EventEmitter
{
    public override string Name => "myplugin";
}

public static void RegisterServices(IServiceCollection services, IApplicationPaths applicationPaths)
    => services.AddEventEmitter<MyFeed>();
```

Clients join it on whatever connection they have, either when they connect with
`/signalr/aggregate?feeds=myplugin` or afterwards with the hub's `feed.join_single` and `feed.join_many` methods, and
your messages then arrive as `<name>:<subject>`. They can drop it again with `feed.leave_single`, and `feed.list_all`
tells them which feeds a server offers, yours included.

The joins and `feed.replace_all` also take a `lastConnectedAt`, which reaches your feed as the third argument of
`GetInitialMessagesForUser`, so a client reconnecting can be given what it missed. SignalR doesn't honour the
parameter's default, so a client has to pass it even when it has nothing to say: `invoke('feed.join_many', feeds,
null)`, not `invoke('feed.join_many', feeds)`, which is rejected for providing too few arguments.

A client already on your feed can ask for that starting state again with `feed.resend_initial`, which takes the feed's
name and a `lastConnectedAt` and sends your `<name>:connected` message once more — how a client that hands the one
connection to several parts of itself gives a part that starts listening later its own starting state. It answers
`false` when the connection isn't on the feed, or the feed isn't there, and it sends nothing when your initial
messages come back empty. The missing-default caveat applies here too, so pass both arguments.

Every call that changes the feeds — the two joins, the two leaves, `feed.replace_all` and `feed.clear_all` — answers
with the feeds the connection is on afterwards, so a client sees whether yours took. A name missing from that answer
was either unknown to the server or refused by the feed's `CanConnect`; comparing it with `feed.list_all` tells those
two apart. Joining a feed that isn't there raises nothing: the name is simply skipped.

On connect the hub sends the same list as a `feed.joined` message, once the feeds named in the query have joined,
after any `<name>:connected` message they had to send, and an empty list when the query named none. The name carries no colon, so
it can't collide with a feed's `<name>:<subject>` messages. Handling it is optional, and a client that doesn't want it
just ignores it: only one that configured logging on the hub itself — `configureLogging` in JavaScript,
`ConfigureLogging` in .NET — ever mentions an unhandled message.

Keep your feed's name stable once you've shipped it: to a client, a renamed feed is indistinguishable from one that was
never there. That cuts the other way in the client's favour, though — naming your feed costs nothing on a server where
your plugin isn't installed, so a client can ask for it on every connection without checking first. If it needs to know
whether you're actually there, that's what [features](#features) are for.

Send with `SendAsync(subject, args)`, `SendToUserAsync(user, subject, args)` for one person,
`SendWhereAsync(predicate, subject, args)` for the users on the feed who pass a test, asked once per user, or
`SendPerUserAsync(subject, …)` when each user should get different arguments, which is how you keep restricted content
out of someone's feed. The base class handles joining, leaving and group membership, and `CanConnect(IUser)` refuses a
user outright. A joining connection is sent `GetInitialMessagesForUser(...)`, or `GetInitialMessages()` when that
returns `null`, as the feed's `<name>:connected` message — and nothing at all when the messages come back empty.

Feed names are first-come, first-served across the whole server, so prefix yours with the plugin's name.

### A Hub of Your Own

A feed only pushes. When clients need to **call into** your plugin over SignalR, map a hub from
`IPluginApplicationRegistration.RegisterServices`, under your namespace:

```csharp
public static void RegisterServices(IApplicationBuilder application, IApplicationPaths applicationPaths)
{
    application.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<MyHub>("/signalr/plugin/MyPlugin/events").RequireAuthorization();
    });
}
```

- **You don't need `AddSignalR`.** The server already registers it, with the Newtonsoft protocol, so your hub
  serializes like everything else. Call it only when you need `AddHubOptions<THub>` for your own hub.
- **Always require authorization.** `RequireAuthorization()` admits any signed-in user, and
  `RequireAuthorization("admin")` administrators only.
- **Clients sign in with their API key**, as a bearer token or, for a browser that can't set headers on a WebSocket,
  as the `access_token` query parameter. The JavaScript client does the latter with
  `withUrl(url, { accessTokenFactory: () => apiKey })`.
- **To push from elsewhere in the plugin**, inject `IHubContext<MyHub>` rather than holding on to a hub instance,
  which only lives for one call.
- **Your method signatures are the contract, literally.** SignalR matches a call by argument count, so an optional
  parameter still has to be passed, as `null` if need be, and two methods of the same name fail at start-up with
  "Overloading is not supported". Give a second shape a second name.

## Swagger

Your controllers get a Swagger document per API version they declare, named `<DllName>-<version>` after your main dll
— `MyPlugin-v3` — with no work from you.
Endpoints you map yourself from the application hook land in the `-v1` document, and a plain `RequestDelegate` only
shows up if you give it `WithGroupName("<DllName>")`.

## Events

Services expose events you can subscribe to from `Setup`, from a hosted service, or from a contract implementation.

How an event is raised decides what your handler owes the caller. Some are dispatched on a background task, so an
exception in your handler goes nowhere and the order events arrive in isn't guaranteed. That's how the configuration
events and the image manager's events behave. Others are raised synchronously on the thread doing the work, where a
throwing handler makes the caller's own call throw, although whatever it was reporting has already been stored. Check
the owning service's README, linked from the
[abstractions overview](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/README.md), before assuming either.

The video file events are the ones most plugins want, and they have a few sharp edges.

:::warning Handling File Events
- **Handlers run concurrently.** Several files are processed at once, so a handler has to be thread-safe.
- **Exceptions are handled differently per event.** A throw from `VideoFileDetected` or `VideoFileHashed` is caught
  and logged; from `VideoFileDeleted` it's swallowed without a log; from `VideoFileRelocated` it reaches the relocation
  call, where it can make a move that already happened report failure. Handle your own errors in all of them.
- **Don't rely on the sender.** `VideoFileDetected` is raised with a `null` sender, while the other `IVideoService`
  events pass the service. Use the event arguments.
- **`VideoFileDetected` isn't a "first seen" event.** It's raised on every scan until the file has a location record,
  so the same file can be reported more than once.
:::

Both `VideoFileDetectedEventArgs` and `VideoFileEventArgs` carry `Path`, the absolute path of the file, alongside
`RelativePath` and the managed folder.

:::danger RelativePath Starts With a Separator
`RelativePath` begins with a directory separator, so `Path.Combine(managedFolder.Path, args.RelativePath)` throws the
folder away and returns the relative path as though it were absolute. Use `Path` when you want the file's location, or
`Path.Join`, which keeps both parts.
:::

To find out whether a file was matched to a release, subscribe to `SearchCompleted` on `IVideoReleaseService` and check
`IsSuccessful`, or `ReleaseInfo is null && Exception is null` when you want "searched and found nothing" apart from
"the search itself failed". Don't use `VideoFileHashed` for this: it fires before the search is even scheduled.

The SignalR file events sent to clients deliberately carry only the relative path and the managed folder's id, the
same as APIv3, where absolute paths are opt-in. The absolute path is for in-process plugin code.

### Who Caused It

Many events carry an `Actor`, the user and device behind whatever triggered them. Read it from the event arguments
rather than from `IActorContext`, because most events run on a background task once the request is over, and by then
the context is gone.

If you start a loop or timer from a request, give it a scope of its own with `IActorContext.BeginScope(null)` so its
work is attributed to the system rather than to whoever happened to be on the request that started it.

Events worth knowing about beyond the file ones: `IPluginManager.PluginEnabled` and `PluginDisabled`, raised only on a
real change; `IUserService.ApiTokenGenerated` and `ApiTokenInvalidated`; and
`IAuthenticationThrottleService.AuthenticationFailed`, which reports the address, username and lockout state, never the
password.

:::tip Checking Credentials in Your Own Endpoint
If your plugin has an endpoint that checks a credential, put `IAuthenticationThrottleService` in front of it: ask
`ThrottleAuthentication` before the lookup, then `RegisterFailure` or `Reset`. It answers the same way for an unknown
user as for a locked-out one, and the whole server shares one policy.
:::
