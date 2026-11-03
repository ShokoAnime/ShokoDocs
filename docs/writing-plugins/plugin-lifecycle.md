---
title: The Plugin Lifecycle
description: "What Shoko Server does at startup, where a plugin's code fits, and what happens when it throws."
---

# The Plugin Lifecycle

Most plugin problems are timing problems: code that asks for a service before the container exists, or reads the
database before it's open. This page is the order things happen in.

## The Startup Timeline

| Step | What the server does | What runs in your plugin |
| --- | --- | --- |
| 1 | Scans for plugins and reads each plugin's identity | Your parameterless constructor |
| 2 | Builds the web host and assembles the service container | `IPluginServiceRegistration.RegisterServices`, your queue jobs are picked up from the assembly |
| 3 | Initializes plugins | Your plugin class and your discovered contract implementations are constructed |
| 4 | Sets plugins up, in load order | `IPlugin.Setup(IServiceProvider)` |
| 5 | Tells plugins everyone is set up | `IPlugin.Ready()` |
| 6 | Starts the web host and builds the request pipeline | `IPluginApplicationRegistration.RegisterServices`, your hosted services |
| 7 | Late start: opens the database, runs pending plugin database migrations, then fires `AboutToStart` and later `Started` | Your migrations, then your handlers for those events |

**The database isn't open until step 7.** Anything in steps 1 to 6, including the constructors of your providers and
resolvers, runs without it. Cached repositories are empty there, and services that need stored data will fail or
return nothing. A hosted service is no escape: its `StartAsync` is step 6, before the database opens. Do that work
from `AboutToStart`, from a queue job, or from a hosted service that awaits
`ISystemService.WaitForStartupAsync()` first.

Step 1 happens in a throwaway load context, to read `ID`, `Name`, `Description` and the two embedded image resource
names, so the instance that serves your plugin for the rest of the process is the one from step 3. Where your build
stamped package metadata, that metadata wins over the first three, and a plugin whose `ID` differs from the stamped one
is skipped with a warning rather than failing visibly. What matters for your code is that step 1 has no
container behind it, which is why the plugin class takes no constructor dependencies and `Setup` exists.

:::warning Some Things Are Read Before `Setup` Runs
Your contract implementations are constructed at step 3, and what they declare about themselves is read there and then.
A [metadata source](/writing-plugins/metadata-sources#register-the-source) your provider names has to be registered by
`RegisterServices`, at step 2, or it isn't there when the server looks — that's what `Setup` is too late for, however
much it looks like the natural place for it. Registration itself stays open until every plugin's `Setup` has run, so
`Setup` is the last chance for a source nothing of yours has named yet, not a second chance for one a provider needs.
:::

## Where Your Dependencies Go

### `Setup(IServiceProvider)`

`Setup` is the plugin's entry point. It runs once, with a live container, before the database is open:

```csharp
public class Plugin : IPlugin
{
    private ILogger<Plugin>? _logger;

    public Guid ID { get; } = new("2f4b7a3e-9c1d-4f6a-8b2e-5d3c7a1f9e0b");

    public string Name { get; } = "My Plugin";

    public string? Description { get; } = "What it does, in a sentence.";

    public void Setup(IServiceProvider services)
    {
        _logger = services.GetRequiredService<ILogger<Plugin>>();
        _logger.LogInformation("Setting up.");
    }
}
```

Both `Setup` and `Ready` have default implementations that do nothing, so you only implement the one you need.

### `IPluginServiceRegistration.RegisterServices(IServiceCollection, IApplicationPaths)`

Implemented as a `public static` method on any exported type in your assembly, usually the plugin class, and called
while the container is still being assembled. Only the first implementation in an assembly is used. This is where your
own services, HTTP clients, caches and hosted services are registered. There's no container to
resolve from yet, so use factory overloads when a registration needs to read something at construction time.

`IApplicationPaths`, the second parameter, is how you find the server's own directories. Your plugin's own folders live
on `PluginPaths<MyPlugin>`. The server registers that as a single open generic before this method runs, so it resolves
for whichever plugin type asks, built the first time one does and a singleton per type after that. Your own services
take it like any other dependency:

```csharp
public class NoteStore(PluginPaths<Plugin> paths)
{
    private string NotesFile => paths.GetCacheFile("notes.json");
}

public static void RegisterServices(IServiceCollection services, IApplicationPaths applicationPaths)
    => services.AddSingleton<NoteStore>();
```

The registration itself needs no path, since what you register here is built later, by which time the paths are there.
From [`Setup`](#setup-iserviceprovider) onwards you can also ask outright, with
`provider.GetRequiredService<PluginPaths<MyPlugin>>()`. What you can't do is work the folders out yourself: it takes
`IApplicationPaths` and `IPluginManager` to build one, since that's where your plugin's ID and install folder come
from, and it throws for a type that isn't a loaded plugin. A database of your own needs no path at all —
[`AddPluginDbContext`](/writing-plugins/storing-data#a-database-of-your-own) works it out. See
[Storing Data](/writing-plugins/storing-data#your-own-folders), and don't work either kind of path out yourself.

### `IPluginApplicationRegistration.RegisterServices(IApplicationBuilder, IApplicationPaths)`

Also a `public static` method, called while the HTTP pipeline is built. Register your middleware here. It's also where
recurring queue jobs are registered, since the container is built by then — `app.ApplicationServices` reaches it,
`PluginPaths<MyPlugin>` included.

### Hosted Services

For a timer, a warm-up, or anything that has to stop cleanly on shutdown, register an `IHostedService` or
`BackgroundService` in `RegisterServices`. Hosted services get full constructor injection and proper start and stop
callbacks, which the plugin class itself does not.

## Setup and Ready

`Setup` runs for each plugin in load order, which is a topological sort: a plugin that depends on another is set up
after it, and the configured plugin priority breaks the remaining ties. What a plugin depends on comes from the
`PluginDependency` items in its project, which also decide whether it loads at all — see
[Depending on Another Plugin](/writing-plugins/publishing#depending-on-another-plugin). `Ready` runs afterwards, once every plugin has
been set up.

That gives a simple rule:

- **Contribute in `Setup`.** Register yourself with another plugin's registry, subscribe to events, read your own
  configuration.
- **Consume in `Ready`.** Anything that has to see every plugin's contributions, such as freezing a registry or
  building an index of what was contributed, belongs here.

## When Setup or Ready Throws

A throw is fatal to startup, but not abrupt:

- **Every other plugin that hasn't already failed still gets the step.** `Setup` runs for all of them, and only then
  does startup fail, with an error naming every plugin that threw rather than just the first.
- **`Ready` is skipped entirely** when any plugin's `Setup` failed.
- The web host still starts, so the Web UI comes up and its status page names the plugins that failed and what they
  threw.
- The late start never runs, so the database is never opened and no collection data is available.
- Your hosted services and application registrations can still run, because the web host started. A hosted service must
  not assume `Setup` completed, its own or anyone else's, since a plugin that threw is left half set up.

If your plugin can work without some optional piece, catch the failure in `Setup` and log it instead of throwing. Throw
only when running without it would be worse than not starting.
