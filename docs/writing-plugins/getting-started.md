---
title: Your First Plugin
description: "Set up a plugin project for Shoko Server, write the plugin class and get it loaded."
---

<script setup>
import { data } from '../.vitepress/data/packages.data';
</script>

# Your First Plugin

By the end of this page you have a plugin project that Shoko Server loads and lists under
[Plugin Management](/shoko-server/settings/plugin-management).

## Before You Start

- A Shoko Server v6 install you can restart at will. A daily build is fine, and is what the current plugin interfaces
  ship in.
- The .NET SDK for the version the server targets.
- An editor or IDE of your choice.

## Create the Project

The quickest start is the [plugin template](https://github.com/ShokoAnime/Plugin-Template). Click **Use this
template** on GitHub and you get a project that already has everything below, plus a manifest stub, a pinned
`shoko-build` and a release workflow. Its README walks through renaming the plugin and giving it its own ID, which is
the first thing to do: the template ships a placeholder ID that has to be replaced, in both `manifest.json` and
`Plugin.cs`.

For worked examples of actual functionality, see the [sample plugins](https://github.com/ShokoAnime/SamplePlugins).

The rest of this page describes what a plugin project consists of, whether you started from the template or not.

A plugin is a class library that references the `Shoko.Abstractions` package:

```xml-vue
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Shoko.Abstractions" Version="{{ data.abstractions }}" ExcludeAssets="runtime" />
  </ItemGroup>

</Project>
```

`GenerateDocumentationFile` isn't required to load, but without it your
[configuration](/writing-plugins/configuration#describing-your-settings) has no descriptions in the Web UI.

:::danger ExcludeAssets="runtime" Is Load Bearing
Without it, your build output contains its own copy of `Shoko.Abstractions.dll`, and the plugin is loaded against that
copy instead of the server's. Your `IPlugin` is then a different type from the server's `IPlugin`, the type check finds
nothing, and the assembly is skipped without an error. The plugin doesn't show up as broken, it simply isn't there.

If you reference the server's projects directly while developing, those references also need `Private="false"`, since
`ExcludeAssets="runtime"` alone doesn't stop a project reference from copying to the output directory.
:::

### Choosing a Version

`Shoko.Abstractions` is published on nuget.org. A stable server takes the matching stable version, and a daily build
the latest prerelease. Pick what your target server ships with, or an older one, and check nuget.org for the current
version rather than copying the one above.

`Shoko.QueueProcessor`, if you queue work, is meant to track the abstractions and the server from release on. While
6.0 is in alpha the two numbers run apart, so take the latest prerelease of each rather than assuming they match.

A plugin built against a **newer** abstraction than the server's is refused. It stays in the plugin list, marked as
incompatible, and explains why instead of loading — and while it's enabled it also keeps the server from finishing its
start, so disable or replace it. You can read the server's abstraction version from
`GET /api/v3/Plugin/Compatibility`, or from `IPluginManager.AbstractionVersion` inside a plugin. Installing through the
Web UI is stricter than loading: the major version has to match, the server's version has to be at least the plugin's,
and the runtime identifier has to fit.

Building against an older abstraction of the same major version is safe. Members added later simply aren't available,
and a method that the server would call, such as `Setup`, only binds when the abstraction you compiled against
declares it. Compiled against an older package, a `Setup` method is just a method, and the server never calls it. An
older *major* version is a different contract: the server refuses it with a reason of its own, and while it's enabled
it keeps the start from finishing, just as a too-new build does.

## Write the Plugin Class

One public class implementing `IPlugin` per assembly. It carries the plugin's identity, and its
[icon](/writing-plugins/publishing#icon-and-thumbnail) and
[lifecycle hooks](/writing-plugins/plugin-lifecycle#setup-and-ready) live on the same interface:

```csharp
using Shoko.Abstractions.Plugin;

public class Plugin : IPlugin
{
    public Guid ID { get; } = new("2f4b7a3e-9c1d-4f6a-8b2e-5d3c7a1f9e0b");

    public string Name { get; } = "My Plugin";

    public string? Description { get; } = "What it does, in a sentence.";
}
```

Generate the `Guid` once and never change it. It identifies your plugin for settings, updates and dependencies.

Two rules decide whether the class loads at all:

- **It needs a public parameterless constructor.** Discovery builds the class with it, long before there's a container
  to inject from, so a class offering only a constructor that takes an `ILogger`, a service or a
  `ConfigurationProvider<T>` fails there — it's listed as failed, with the error in the log, rather than loading. Take
  what you need in [`Setup`](/writing-plugins/plugin-lifecycle#setup-and-ready) instead.
- **Everything the server discovers has to be public.** Type scanning only looks at exported types, so an `internal`
  plugin class, provider or configuration class is invisible, with nothing logged to say so.

Only the first `IPlugin` in an assembly is used. A second one is ignored with a warning.

## Build and Install It

1. Build the project.
2. Copy the build output into a sub-folder of the server's `plugins` directory, which sits next to the rest of the
   server's data. One folder per plugin.
3. Restart Shoko Server.
4. Open the Web UI and go to **Settings** → **Plugin Management** → **Installed**.

Your plugin should be listed there, with the name and description from the class. If it isn't, work through
[Troubleshooting](/writing-plugins/troubleshooting), which starts with the failures that leave no trace.

## Next Steps

- [The Plugin Lifecycle](/writing-plugins/plugin-lifecycle) to take dependencies and run your own code.
- [Extension Points](/writing-plugins/extension-points) to actually do something: identify releases, hash files,
  resolve images and so on.
- [Configuration & Secrets](/writing-plugins/configuration) to add settings people can change in the Web UI.
