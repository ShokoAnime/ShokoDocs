---
title: Troubleshooting Plugins
description: "Why a Shoko Server plugin doesn't load, doesn't run, or runs twice."
---

# Troubleshooting Plugins

Most plugin failures are quiet. This page is ordered by how little evidence you get.

## The Plugin Isn't Listed at All

Nothing in **Plugin Management**, and nothing in the log naming your plugin.

1. **The archive shipped its own `Shoko.Abstractions.dll`.** The plugin is loaded against its own copy, so its
   `IPlugin` isn't the server's `IPlugin`, and the assembly is skipped silently. Add `ExcludeAssets="runtime"` to the
   package reference, and `Private="false"` to any project reference. See
   [Your First Plugin](/writing-plugins/getting-started#create-the-project).
2. **Something isn't public.** Only exported types are scanned. An `internal` plugin class is invisible.
3. **There's more than one `IPlugin` in the assembly.** Only the first is used; the rest are ignored.

Those first two log nothing at all, which is what makes them hard to place. More than one `IPlugin` leaves
`Multiple implementations of IPlugin found in …`, and a dll the server couldn't read at all leaves `Failed to check
assembly … for valid IPlugin and IPluginServiceRegistration implementations`.

A plugin class that only offers a constructor taking services is the near miss here: it *is* listed, as failed, with
`Plugin failed while being created to read its identity` in the log. Move the dependencies into `Setup`.

## The Plugin Is Listed as Incompatible

It can't be loaded at all: built against a newer `Shoko.Abstractions` than the server has, built against an older
major version of it, built against the `Shoko.Plugin.Abstractions` of 5.x, missing an assembly, or needing another
plugin that isn't installed or enabled. The entry stays in the list and explains itself instead of loading, with
`CanLoad` false and `CannotLoadReason` naming which of those it is. Compare your package version with
`GET /api/v3/Plugin/Compatibility`, and build against a version the server can accept.

While it's enabled it fails the start as well, the same as any failed plugin, until it's disabled, replaced or
uninstalled — or until an older installed version can load in its place. The plugin and package routes answer during a
failed start, so all three can be done from the Web UI or the API without a working server.

A plugin carried over from a 5.x server is the common case, since plugins were copied in by hand before the package
manager existed. Its reason says what to do about it:

```text
This plugin uses the deprecated Shoko.Plugin.Abstractions namespace and is incompatible with this version of Shoko
Server. Disable or uninstall it, or install a version built for Shoko.Abstractions.
```

Installing that version is enough, and you don't have to remove the old one first: a plugin built for the old
namespace has no ID of its own, so a build of the same dll made for this server takes its place. The old entry is then
listed as replaced by it, and nothing fails.

## The Plugin Won't Load and Blames Another Plugin

One of its [dependencies](/writing-plugins/publishing#depending-on-another-plugin) isn't satisfied. `CannotLoadReason`
says which and why: the other plugin isn't installed, is installed but disabled, is there at a version the range
doesn't cover, or was itself refused. A dependency cycle reads differently — everything in or behind it is refused, and
the reason lists the plugins involved. An optional dependency never does this; when it's unsatisfied the server notes
it in the log and carries on, and one that's installed but doesn't fit your range, or lacks what you refer to, is left
out of your load context and logged — your plugin runs as if it weren't installed, on its own copy of the contracts.

Installing, enabling, disabling or uninstalling a plugin re-evaluates all of it, so the fix is usually to install or
enable what's missing, but the plugin only loads again after a restart. `GET /api/v3/Plugin/{pluginID}/Dependencies`
resolves the list against what's installed, which is quicker than reading the reason twice.

If the dependency was never meant to be required, the version range or `Optional` is wrong in your own
`PluginDependency` items, not on the server.

## The Plugin Failed and Names a Type the Server Doesn't Have

The opposite case, and the one that turns up after someone upgrades their server: the plugin was built against an
**older** `Shoko.Abstractions` and uses something that has since been removed. Every plugin's references are read
against the server's own assemblies before any of them is loaded, so the plugin is named up front rather than
throwing whenever the missing member is first touched, which could be weeks later.

This is a failed plugin rather than an incompatible one. `HasFailed` is true, and `FailureReason` carries the names:

```text
The plugin was built for a different version of the server and refers to what this server does not have: type
Shoko.Abstractions.Config.IHiddenConfiguration. Update the plugin, or disable or uninstall it.
```

At most five names are listed, followed by `and N more`. When what's missing belongs to a plugin yours depends on
instead of to the server, the reason names that plugin and its version.

A plugin in this state stops the server finishing its start-up until it is disabled, replaced or uninstalled and the
server restarted. The web host still comes up and the server's own `/api/v3/Plugin` routes answer, so it can be dealt
with from the API — the failed plugin's own controllers and middleware aren't registered, so don't expect to debug
through them. Rebuilding against the `Shoko.Abstractions` the server ships is the fix.

## The Server Won't Start and Names My Plugin

`Setup` or `Ready` threw, which is the other way a plugin stops a start-up. Every other plugin still gets the step,
and startup then fails with an error naming each plugin that threw, so check whether yours is the only one listed. The
Web UI comes up and its status page shows the error, but the database is never opened.

Fix the exception, or catch it in `Setup` and log it when the plugin can work without whatever failed. Bear in mind
that your hosted services may still have started, so they can't assume `Setup` completed. See
[The Plugin Lifecycle](/writing-plugins/plugin-lifecycle#when-setup-or-ready-throws).

## My Provider Loads but Never Runs

Being discovered isn't being enabled:

- A **release provider** starts disabled. Turn it on under **Settings** →
  [**Hashing & Release**](/shoko-server/settings/hashing-and-release#release-provider-options).
- A **hash provider** runs only when a hash type points at it, through the gear icon in the same tab.
- An **airing schedule provider** from a plugin starts with no kinds enabled on any install; only the core's own are
  seeded on a fresh one.

Don't "fix" this by registering the implementation under its interface. That doesn't make the server use it, and it
breaks resolution for everyone else. See [Extension Points](/writing-plugins/extension-points#the-registration-rule).

## There Are Two of My Class

The class implements two contracts, and the server constructs it once per contract. Register the **concrete** type as
a singleton in `RegisterServices` so both lookups get the same instance.

The same symptom appears when a class is registered under its interface: the server builds its own instance of the
concrete type, and your code resolves the other one out of the container.

## `Load()` Throws a NullReferenceException

The configuration class isn't public, so it was never discovered, and the lookup behind `Load()` has nothing to
return. Make it public. See [Configuration & Secrets](/writing-plugins/configuration#a-configuration-class).

## A Value From the API Starts With `***SECRET-UNCHANGED`

That's the placeholder the server sends instead of a secret. It carries a fingerprint of the value it stands for, so
test it with `ConfigurationSecrets.IsMasked` rather than comparing it to a fixed string. Reading the configuration in-process with `Load()` always
gives the real value; only the API masks. If your own endpoint is handing out configuration, serialize it with the
masking helpers rather than plainly.

## My Custom Action Stops Startup

A scoped action must derive **directly** from `SeriesAction`, `GroupAction`, `EpisodeAction` or `VideoAction` — an
intermediate base class of your own is rejected — and every action, scoped or global, must declare its own `Permission`
getter. Either rejection stops startup rather than skipping the action.

## Nothing Above Fits

Turn on trace logging under **Settings** → [**General**](/shoko-server/settings/general#log-options) → **Trace Logs**,
reproduce, and search the log for your plugin's name and for `plugin`. Plugin load and initialization are logged in
detail there.
