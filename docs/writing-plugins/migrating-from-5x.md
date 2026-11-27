---
title: Migrating from 5.x
description: "Porting a plugin written against Shoko.Plugin.Abstractions 5.3.3 to the Shoko.Abstractions of 6.0.0, as a checklist with the symptoms that go with each step."
---

# Migrating from 5.x

A plugin built for 5.3.3 doesn't run on a 6.0.0 server, and there's no compatibility layer to fall back on. The server
recognises the old `Shoko.Plugin.Abstractions` reference, lists the plugin as incompatible with a reason, and while
it's enabled it also keeps the start from finishing — see
[The Plugin Is Listed as Incompatible](/writing-plugins/troubleshooting#the-plugin-is-listed-as-incompatible).

What the port actually touches is the shell around your plugin: the project file, the plugin class, the registration
hook, and the settings class. The code that does the work mostly survives a rename of the types it talks to. This page
is written for 5.3.3, the last 5.x release; a plugin older than 5.3.0 also has that release's renamer rewrite ahead of
it.

## The Checklist

1. [Keep the assembly name](#keep-the-assembly-name) your users already have.
2. [Repoint the project file](#the-project-file) at `Shoko.Abstractions`.
3. [Give the plugin class an ID](#the-plugin-class), and delete `Load` and `OnSettingsLoaded`.
4. [Make `RegisterServices` static](#registerservices-is-static-now).
5. [Turn the settings class into a configuration class](#settings-become-configuration).
6. [Turn renamers into relocation providers](#renamers-become-relocation-providers), keeping each class's full name.
7. [Move off `IShokoEventHandler`](#events-moved-to-the-services-that-own-them) onto the services that carry its events.
8. [Fix up the remaining names and namespaces](#everything-else-is-a-name-or-a-namespace).
9. [Write a manifest and package it](#packaging-is-new).
10. [Decide what to do with the old settings file](#what-happens-to-your-users-data) your users have on disk.

## Keep the Assembly Name

Both versions key the server setting that enables and disables a plugin on the **dll's file name**, so a port that
keeps the same assembly name inherits whatever the user already chose. A 6.x server also passes over a legacy build
when a non-legacy build of the same dll name is installed alongside it, which is how a user upgrades without having to
remove the old copy first.

Rename the assembly and you give up both: the plugin arrives as a new, enabled one, and the old copy keeps failing the
start until it's removed.

## The Project File

| 5.3.3 | 6.0.0 |
| --- | --- |
| `Shoko.Plugin.Abstractions` package reference | `Shoko.Abstractions`, with `ExcludeAssets="runtime"` |
| A `netstandard2.0` or `net8.0` target | `net10.0` |
| — | `Shoko.BuildTools.Targets`, so a plain build stamps the plugin's identity |
| — | `Shoko.BuildTools.Analyzers`, which checks what the server would otherwise refuse at runtime |
| — | `Shoko.QueueProcessor`, if you want to queue jobs of your own in 6.0 |

[Your First Plugin](/writing-plugins/getting-started#create-the-project) has the full project file, and
[Publishing a Plugin](/writing-plugins/publishing#build-with-shoko-buildtools) covers the two build packages.

:::warning The Package Rename Comes First
Every error in the port depends on this step, so do it before reading any of them. `using Shoko.Plugin.Abstractions;`
fails with `error CS0234: The type or namespace name 'Plugin' does not exist in the namespace 'Shoko'`, and every type
it brought in follows with CS0246.
:::

## The Plugin Class

5.x asked for a name and two methods. 6.x asks for an identity, and gives you hooks that run at points where the
things you need exist:

```csharp
// 5.3.3
[Plugin("my-plugin")]
public class Plugin : IPlugin
{
    public string Name => "My Plugin";

    public void Load() { }

    public void OnSettingsLoaded(IPluginSettings settings) { }
}
```

```csharp
// 6.0.0
using Shoko.Abstractions.Plugin;

public class Plugin : IPlugin
{
    public Guid ID { get; } = new("2f4b7a3e-9c1d-4f6a-8b2e-5d3c7a1f9e0b");

    public string Name { get; } = "My Plugin";

    public string? Description { get; } = "What it does, in a sentence.";

    public void Setup(IServiceProvider serviceProvider) { }

    public void Ready() { }
}
```

| 5.3.3 | 6.0.0 |
| --- | --- |
| `[Plugin("id")]` | `IPlugin.ID`, a `Guid` you generate once and never change |
| `Name` | `Name`, unchanged |
| `Load()` | `Setup(IServiceProvider)`, which is also where you take your dependencies |
| `OnSettingsLoaded(IPluginSettings)` | Nothing. Configuration is injected where it's used |
| — | `Ready()`, after the server is up |
| — | `Description`, the plugin's icon and its pages, all optional |

The ID is new, and nothing carries over into it: 5.x never read the string in `[Plugin]`, so there's no old value to
preserve. Generate a `Guid`, put the same one in the plugin class and the manifest, and leave it alone from then on —
it's what the server keys configuration, updates, dependencies and your plugin's own folders by.

Two things to watch for:

- **A missing ID is a compile error**: `error CS0535: 'Plugin' does not implement interface member 'IPlugin.ID'`.
- **A leftover `Load` or `OnSettingsLoaded` is not.** Both build clean as ordinary methods and are never called by
  anything. If your port loads, is listed, and simply does nothing, this is the first place to look.
- **The constructor can no longer take anything.** 5.x built the plugin instance through dependency injection, so a
  constructor asking for an `ILogger` or a service worked. 6.x discovers the class long before there's a container,
  with a public parameterless constructor, and a class that doesn't have one is listed as failed with the error in the
  log. Move those dependencies into `Setup`.

The lifecycle page covers [what runs when](/writing-plugins/plugin-lifecycle#the-startup-timeline), and `Setup` is
where [your dependencies go](/writing-plugins/plugin-lifecycle#setup-iserviceprovider).

## `RegisterServices` Is Static Now

`IPluginServiceRegistration` kept its name and its parameters, but the method is a static abstract interface member in
6.x. An instance method fails with
`error CS8928: 'Plugin' does not implement static interface member 'IPluginServiceRegistration.RegisterServices(IServiceCollection, IApplicationPaths)'`,
which spells out the fix:

```csharp
public static void RegisterServices(IServiceCollection serviceCollection, IApplicationPaths applicationPaths)
```

Nothing is lost by it. Registration runs before there's a container to resolve from either way, so there was never
anything instance state could contribute there. The hook may also sit on any exported type in the assembly, not only
the plugin class; see
[RegisterServices](/writing-plugins/plugin-lifecycle#ipluginserviceregistration-registerservices-iservicecollection-iapplicationpaths).

`IApplicationPaths` survived the move, with renamed members: `ExecutableDirectoryPath` is `ApplicationPath`,
`ProgramDataPath` is `DataPath`, `ImageDirectoryPath` is `ImagesPath`, and `LogDirectoryPath` is `LogsPath`. For your
plugin's own folders, use [`PluginPaths<MyPlugin>`](/writing-plugins/storing-data#your-own-folders) rather than
building paths under `PluginsPath` yourself.

## Settings Become Configuration

| 5.3.3 | 6.0.0 |
| --- | --- |
| A class implementing `IPluginSettings` | A class implementing `IConfiguration`, or `IPluginConfiguration` for your plugin's main one |
| `[PluginSettings]` | Nothing. The class is found by its interface |
| `OnSettingsLoaded(settings)` | `ConfigurationProvider<MyConfiguration>`, injected where the settings are read |
| `ISettingsProvider.SaveSettings(settings)` | `configurationProvider.Save()` |
| One settings class per assembly | As many configurations as you like, one of them markable as the plugin's own |
| `<data>/plugins/<AssemblyName>.json` | A file of its own in the plugin's configuration folder |

The gain is that the Web UI renders a settings page from the class, which is also what makes the shape of the class
matter now: a page has to be drawable from it. [Configuration & Secrets](/writing-plugins/configuration) covers the
annotations, and [Shapes That Don't Work](/writing-plugins/configuration#shapes-that-don-t-work) the ones to expect
trouble from. Nothing checked an `IPluginSettings` class, so a class carried over as-is is exactly the case
`Shoko.BuildTools.Analyzers` exists for — add it while you do this step and the checks run on every build.

Secrets are worth a second look while you're here. A password or API token that used to sit in that JSON file as plain
text has [somewhere better to go](/writing-plugins/configuration#secrets).

## Renamers Become Relocation Providers

| 5.3.3 | 6.0.0 |
| --- | --- |
| `IRenamer`, `IRenamer<T>` | `IRelocationProvider`, `IRelocationProvider<TConfig>` |
| `IBaseRenamer` | Folded into `IRelocationProvider` |
| `IUnrecognizedRenamer` | `SupportsUnrecognized => true` |
| `IFallbackRenamer` | Nothing. Nothing read it in 5.3.3 either |
| `[RenamerID("id")]`, required to load | Nothing. The type is discovered, and the server derives the ID |
| `GetNewPath(RelocationEventArgs args)` | `GetPath(RelocationContext context)` |
| `RelocationEventArgs`, with settable properties | `RelocationContext`, init-only, and carrying `Video` and a `CancellationToken` |
| `args.Settings` | `context.Configuration` |
| `args.AvailableFolders`, of `IImportFolder` | Same name, of `IManagedFolder` |
| `RelocationResult.DestinationImportFolder` | `RelocationResult.ManagedFolder` |
| `IRenamerConfig`, `DefaultSettings` | A configuration class implementing `IRelocationProviderConfiguration` |
| `IRelocationService` | `IVideoRelocationService`, where `ImportFolderHasSpace` is `ManagedFolderHasSpace` |

`RelocationResult` otherwise kept its shape, including `SkipMove`, `SkipRename` and `Error`, and gained
`FromError(…)` factories. `SupportsMoving` and `SupportsRenaming` now default to `true` instead of having to be
declared. `SupportsIncompleteMetadata` is new, and is the one worth a decision: a provider is passed over for a file
whose episodes aren't all linked unless it opts in, the way `SupportsUnrecognized` works for a file with no links at
all.

The one thing to be careful with is **the provider class's full name**, because the server derives the provider's ID
from it: a UUIDv5 of `RelocationProvider=<the type's full name>`, in the namespace of the plugin's own ID. Saved
presets point at that ID, so moving the class to another namespace, renaming it, or changing the plugin's ID detaches
every preset your users have. Keep both stable and there's nothing for them to redo.

## Events Moved to the Services That Own Them

`IShokoEventHandler` is gone. Each of its events now hangs off the service for that area, which you take through
dependency injection like any other:

| 5.3.3 `IShokoEventHandler` | 6.0.0 |
| --- | --- |
| `FileDetected` | `IVideoService.VideoFileDetected` |
| `FileHashed` | `IVideoService.VideoFileHashed` |
| `FileDeleted` | `IVideoService.VideoFileDeleted` |
| `FileMoved`, `FileRenamed` | `IVideoService.VideoFileRelocated`, one event for both |
| `FileMatched`, `FileNotMatched` | `IVideoReleaseService.SearchCompleted`, with `IsSuccessful` and `IsSaved`, or `ReleaseSaved` for the release itself |
| `SeriesUpdated`, `EpisodeUpdated`, `MovieUpdated` | `IMetadataService`, same names, with `Added` and `Removed` alongside them |
| `SettingsSaved` | `IConfigurationService.Saved` |
| `AniDBBanned` | `IAnidbService.BanOccurred`, and `BanExpired` for the other side of it |
| `AVDumpEvent` | `IAnidbAvdumpService.AvdumpEvent` |

5.3.3's services carried some of these already, in which case only the namespace changed. What did change on them is
that lookups take the model rather than its ID — `GetVideoUserData(IVideo video, IUser user)` where 5.x took
`(int userID, int videoID)` — and that a source is a `MetadataSource` rather than the `ProviderName` enum that used to
be nested in `IMetadataService`. [Web APIs & Events](/writing-plugins/web-apis-and-events) covers the events a plugin
raises and consumes, and which of them swallow a throw.

## Everything Else Is a Name or a Namespace

Namespaces are per area now, so `Shoko.Plugin.Abstractions.DataModels` has no single successor:

| 5.3.3 | 6.0.0 |
| --- | --- |
| `Shoko.Plugin.Abstractions` | `Shoko.Abstractions.Plugin` |
| `…Abstractions.DataModels` | `Shoko.Abstractions.Metadata`, `.Video`, `.User`, by what the type is |
| `…DataModels.Shoko` | `Shoko.Abstractions.Metadata.Shoko` |
| `…Abstractions.Enums` | The area's own `.Enums`, as in `Shoko.Abstractions.Metadata.Enums` |
| `…Abstractions.Events` | The area's own `.Events`, as in `Shoko.Abstractions.Video.Events` |
| `…Abstractions.Services` | The area's own `.Services`, as in `Shoko.Abstractions.Video.Services` |
| `…Abstractions.Attributes` | `Shoko.Abstractions.Config.Attributes` and `Shoko.Abstractions.UI.Attributes` |
| `…Abstractions.Extensions` | `Shoko.Abstractions.Extensions` |

And the types that were renamed outright:

| 5.3.3 | 6.0.0 |
| --- | --- |
| `IImportFolder` | `IManagedFolder`, same members plus `WatchForNewFiles` |
| `IVideoFile.ImportFolder`, `ImportFolderID` | `ManagedFolder`, `ManagedFolderID` |
| `IAniDBFile` | `IReleaseInfo`, reached from `IVideo.ReleaseInfo` |
| `IHashes`, `HashAlgorithmName` | `IVideo.Hashes`, a list of `IHashDigest` whose `Type` is a string |
| `IImageMetadata` | `IImage` |
| `AnimeTitle` | `ITitle` |
| `TextDescription` | `IText`, gathered by `IWithOverviews` |
| `IWithDescriptions` | `IWithOverviews` |
| `IWithPortraitImage.PortraitImage` | `IWithPrimaryImage.PrimaryImage` |
| `IShokoUser` | `IUser` |
| `DataSourceEnum`, `IMetadataService.ProviderName` | `MetadataSource`, a registry rather than an enum |
| `UserDataSaveReason` | `VideoUserDataSaveReason`, with per-entity reasons alongside it |
| `VoteType`, `SeriesVoted`, `VoteOnSeries` | Ratings on `IUserDataService`, reported by `SeriesUserDataSaved` |
| `CodeLanguage` | `CodeEditorLanguage`, for `[CodeEditor]` |
| `PluginUtilities` | `StringExtensions` and `NumberExtensions`, in `Shoko.Abstractions.Extensions` |
| `SettingsSavedEventArgs` | `ConfigurationSavedEventArgs` |

`MetadataSource` being a registry is the one that's more than a rename: your plugin can register a source of its own,
and [Serving a Metadata Source](/writing-plugins/metadata-sources) is the page for it.

## Packaging Is New

In 5.x a plugin was a dll a user copied into the `plugins` folder. That still loads, but it's now the exception rather
than how plugins arrive: 6.x installs every plugin into a folder of its own, from a manifest, through the plugin
package manager. What your port needs on top of the code is a manifest carrying the same ID as the plugin class, a
build that stamps the identity metadata, and somewhere for the manifest to live.
[Publishing a Plugin](/writing-plugins/publishing) is that whole path, end to end.

## What Happens to Your Users' Data

| What they have | What becomes of it |
| --- | --- |
| The enabled or disabled state | Carried over, as long as the dll keeps its name |
| Renamer configs and rename scripts | Migrated into relocation presets on the first 6.x start, if your provider is loaded then |
| `<data>/plugins/<AssemblyName>.json`, the old settings | Left where it is. Nothing reads it |
| A hand-copied dll in the `plugins` folder | Still loaded, and still refused while it's the 5.x build |

The renamer migration is the one with teeth. It matches a saved config against the full name of a loaded relocation
provider's type, so for it to find yours, the 6.x build of your plugin has to be installed **before** the first 6.x
start. One it can't place is written out as a file instead — under `failed_migrations/RenamerConfig/<type name>/` in
the server's data directory, or `RenamerScript` for an old rename script — with a warning in the log naming the
renamer. That directory is re-read on every later start, so installing the ported plugin afterwards imports the preset
then, under its original name. A file that still can't be imported is renamed to `.error` and mentioned in the log on
each start until someone deals with it.

The old settings file is yours to deal with if you want to spare your users retyping anything. Nothing in the server
reads it, so reading it once from `Setup`, writing the values through your `ConfigurationProvider<T>` and leaving the
file alone is the whole of it.

## What You See

| What you see | What it is | What to do |
| --- | --- | --- |
| `CS0234: … 'Plugin' does not exist in the namespace 'Shoko'` | The package is still the 5.x one, or the `using` is | Reference `Shoko.Abstractions`, then fix the namespaces |
| `CS0535: … does not implement interface member 'IPlugin.ID'` | The plugin class has no identity | Generate a `Guid` once, and use the same one in the manifest |
| `CS8928: … does not implement static interface member 'IPluginServiceRegistration.RegisterServices'` | The hook is an instance method | Add `static` |
| `CS0246` on `IRenamer`, `IShokoEventHandler`, `IPluginSettings`, `IImportFolder` | Contracts that were replaced | Work through the tables above |
| It builds, loads, is listed, and does nothing, and a breakpoint in `Load` never hits | `Load` or `OnSettingsLoaded` is still carrying your startup code, and neither is called by anything in 6.x | Move it into `Setup` or `Ready` |
| The plugin is listed as failed, with a constructor error in the log | The plugin class still takes its dependencies in its constructor, which 5.x allowed | Leave it a public parameterless constructor, and take them in `Setup` |
| The plugin is listed as incompatible | The 5.x build is still the one installed | Replace it; the new build takes over by dll name |
| A provider of yours isn't offered anywhere | It's `internal`, or it threw while being constructed | Make it public, and check the log for your plugin's failure |
| Your users' renamer presets are gone | The provider's type full name or the plugin's ID changed | Put both back, or re-import from `failed_migrations` |
| Settings come up empty after the port | The old JSON file isn't read any more | Carry the values over yourself, once, from `Setup` |

[Troubleshooting](/writing-plugins/troubleshooting) covers the failures that leave no trace at all, which are the same
in 6.x whether you ported the plugin or wrote it from scratch.
