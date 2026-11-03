---
title: Extension Points
description: "The contracts Shoko Server discovers automatically, how to implement one, and the defaults that decide whether it runs."
---

# Extension Points

Most of what a plugin does is implementing a contract. The server finds those implementations itself: there's no
registration call, and no way to hand a service an implementation directly.

## How Discovery Works

Implement the interface on a public class. At startup the server takes every exported type implementing the contract,
constructs it with dependency injection, and keeps that instance for the life of the process.

```csharp
public class MyReleaseProvider : IReleaseInfoProvider
{
    private readonly ILogger<MyReleaseProvider> _logger;

    public MyReleaseProvider(ILogger<MyReleaseProvider> logger)
        => _logger = logger;

    // … the contract's members
}
```

Three things follow from that:

- **Constructor injection works here**, unlike on the plugin class. An `HttpClient`, your own rate limiter or a
  `ConfigurationProvider<T>` all arrive the normal way.
- **The constructor runs before the database is open**, so don't read collection data or call services that need it
  there. Keep the constructor to holding onto what was injected.
- **A type that throws while being constructed fails your plugin.** The error is logged, the type is skipped, and the
  plugin is listed as failed with that reason. The server and the other plugins still start.

## The Registration Rule

| What you want | What to do |
| --- | --- |
| The server uses your implementation | Nothing. Discovery handles it. |
| Your own code also resolves it | `services.AddSingleton<MyProvider>();`, the concrete type, in `RegisterServices` |
| Anything else | Don't |

Never register an implementation **under its interface**, as in `AddSingleton<IReleaseInfoProvider, MyProvider>()`. The
server looks up the concrete type, so it doesn't read that registration and builds a second instance anyway, and
resolving a single `IReleaseInfoProvider` anywhere else now returns whichever plugin registered last.

A singleton registration of the concrete type is also the fix when one class implements **two** contracts: the server
constructs it once per contract, so without a singleton you get two independent instances.

## The Contracts

| Contract | What it does | Reference |
| --- | --- | --- |
| `IReleaseInfoProvider` | Identifies which release and episodes a file belongs to | [Video/Release](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Release/README.md) |
| `IHashProvider` | Calculates file hashes | [Video/Hashing](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Hashing/README.md) |
| `IRelocationProvider` | Renames and moves files, a renamer in everyday use | [Video/Relocation](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Relocation/README.md) |
| `IManagedFolderIgnoreRule` | Decides which files and folders the server ignores | [Video](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/README.md) |
| `IVideoStreamTransform` | Transforms video streams during playback | [Video/Streaming](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Streaming/README.md) |
| `IPlaybackObserver` | Observes playback | [Video/Streaming](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Streaming/README.md) |
| `IAiringScheduleProvider` | Supplies airing schedules | [Metadata/Airing](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Airing/README.md) |
| `IMetadataProvider` | Makes your plugin a metadata source in its own right | [Metadata/Providers](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Providers/README.md) |
| `IMetadataImageContributor` | Adds artwork to other sources' entries | [Metadata/Providers](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Providers/README.md#adding-images-to-other-sources-entries) |
| `IMetadataResolver` | Serves entries of a kind your plugin invented, which the server holds nothing for | [Metadata/Providers](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Providers/README.md#resolving-your-own-kinds) |
| `IResourceResolver` | Resolves external resources | [Metadata/Resources](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Resources/README.md) |
| `IWebUIProvider` | Serves a web UI of its own, in place of the Shoko Web UI | [Web/Services](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Web/Services/README.md#web-uis) |

Each reference documents that contract's members, the order it's called in, and the mistakes that are easy to make.

Metadata providers, image contributors and airing schedule providers can each carry an icon of their own, shipped with
your plugin the way its own icon is; see
[Icons for the parts inside](/writing-plugins/publishing#icons-for-the-parts-inside).

Serving a whole metadata source is more than one contract, and has [a page of its own](/writing-plugins/metadata-sources).

A web UI provider is the odd one out: it **is** an `IFileProvider`, mounted with the standard static file middleware,
so the server asks it for every file — including the fallback to your index for client-side routes. Its `MountPath`
is yours to pick as long as it isn't under `/api`, `/plugin`, `/signalr` or the Swagger UI's path, and a plugin that
asks for one of those fails to start.

## Being Discovered Isn't Being Enabled

This is the part that looks like your plugin is broken when it isn't. A discovered implementation a service accepts
stays loaded for the life of the process — metadata providers and image contributors are the two that refuse one
outright, and say why in the log. Whether an accepted one is used is decided per contract, and the defaults don't agree
with each other:

- **Release providers** start **disabled**, unless the provider is called `AniDB`. Enable yours under **Settings** →
  [**Hashing & Release**](/shoko-server/settings/hashing-and-release#release-provider-options) → **Auto-Linking Release
  Providers**, and drag it into the priority order you want.
- **Hash providers** have no enable switch of their own. A provider runs when a hash type is pointed at it, under
  **Settings** → [**Hashing & Release**](/shoko-server/settings/hashing-and-release#hashing-options) → **Hashing
  Providers**, using the gear icon. A hash type stays with the first provider that has it, so taking one over means
  turning it off for the current holder at the same time.
- **Airing schedule providers** from a plugin start with **no kinds enabled at all**, on every install. Yours is listed
  and contributes nothing until someone switches a kind on, so check `EnabledKinds` before you fetch anything.
- **Metadata providers** start **enabled** instead, for the kinds they name in `DefaultEnabledKinds`, which is every
  kind they serve unless they narrow it. The first provider to claim a source takes the entity types nobody has
  claimed yet, and that decision is stored, so a provider installed later doesn't take them
  over. What gates you instead is `IsConfigured`: while it's `false`, auto-linking passes you by and a search says so,
  naming your `NotConfiguredReason`.

- **Web UI providers** are served to nobody until someone asks for them, unless you opt in. With no web UI picked,
  the server serves the first plugin web UI in load order that sets **`IsDefaultCandidate`**, and the Shoko Web UI
  when none does. Setting it says yours is willing to be the only web UI on a brand-new server, first-run setup
  included, so a web UI meant for one purpose — a kiosk view, an admin panel — leaves it `false` and is served only
  when an admin picks it through `PATCH /api/v3/WebUI/Provider` or maps a host to it. Opting in is a willingness, not
  a claim: when two web UIs opt in, the plugin load order settles it, and that order is the admin's to sort. It's read
  when the server works out what to serve, not on every request as `MountPath` is.

A contract that isn't listed here has no switch of its own: an ignore rule is simply applied, and an image
contributor is on for every pair it covers until an admin turns one off. A stream transform is the other way round,
starting off until it's enabled.

When you're testing your own provider and nothing happens, check this before you change any code.

## Actions

Actions are a separate mechanism from the discovered contracts: operations a user runs against an entry, and work that
runs on a schedule. Both live on their own page, [Actions & Background Work](/writing-plugins/actions-and-jobs).
