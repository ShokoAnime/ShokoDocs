---
title: Storing Data
description: "Where a Shoko Server plugin keeps its files, and how to give it a database the server looks after."
---

# Storing Data

A plugin that keeps anything of its own, a cache, a scratch file or a table of notes, has two places to put it: its own
folders, or a database the server manages for it.

## Your Own Folders

`PluginPaths<MyPlugin>` is registered for you for any plugin type, so any service your plugin registers takes it as a
constructor parameter, and `Setup` can ask the provider for it with `GetRequiredService<PluginPaths<MyPlugin>>()`; see
[the lifecycle page](/writing-plugins/plugin-lifecycle#ipluginserviceregistration-registerservices-iservicecollection-iapplicationpaths).
The first three folders below belong to your plugin alone and are created the first time you ask for one:

| Member | What's in it |
| --- | --- |
| `ConfigurationsPath` | Your configuration files |
| `DatabasePath` | Your databases, included in the server's backups |
| `CachePath` | Anything you can afford to lose, excluded from backups |
| `InstallPath` | Where your plugin was installed. Treat it as read-only: an update replaces it, so anything you write there is lost |

`InstallPath` is the exception to the paragraph above: nothing creates or clears it. Installing a plugin always gives it
a folder of its own, but a lone dll someone copied into the plugins folder by hand has none, and then `InstallPath` is
that shared folder.

`GetDatabaseFile(relativePath)` and `GetCacheFile(relativePath)` resolve a file inside the database and cache folders,
creating the folder the file sits in, and refuse a rooted path or one that climbs out of the folder. The server's own
directories are on the same object, named as they are on `IApplicationPaths`.

:::warning Don't Write Into the Plugins Folder
The plugins folder holds installed plugins and nothing else, which is why `PluginPaths<MyPlugin>` has no `PluginsPath`
to write to. Anything your plugin writes at runtime goes in the folders above, so that uninstalling can clean up after
you and backups pick up what matters.
:::

## A Database of Your Own

For anything more structured than a file, the server can give you an Entity Framework Core database that it configures,
migrates, backs up and removes along with the plugin.

Write a `DbContext` taking `DbContextOptions<TContext>`, and register it from `RegisterServices`:

```csharp
public class NotesContext(DbContextOptions<NotesContext> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();
}

public class Plugin : IPlugin, IPluginServiceRegistration
{
    public static void RegisterServices(IServiceCollection services, IApplicationPaths applicationPaths)
        => services.AddPluginDbContext<Plugin, NotesContext>("notes");
}
```

The name is the file name without its extension, and it has to stay put: renaming it gives you a new, empty database.
Registered like that you get SQLite in WAL mode under your `DatabasePath`, whatever the server itself runs on, so never
call `UseSqlite` or another provider method yourself.

Inject `IDbContextFactory<NotesContext>` into singletons and hosted services and create a context per unit of work. A
scoped service can take the context itself.

:::danger There's No Database Until the Server Has Migrated It
Pending migrations run late in startup, after the server's own database is open. Until then an injected context throws
`InvalidOperationException` as it's resolved, and the factory throws when you call `CreateDbContext()` — the factory
itself is safe to take early — so `Setup`, `Ready` and a hosted service's `StartAsync` can't touch your data.

Start your database work from `AboutToStart`, after `WaitForStartupAsync()`, or in a queue job marked
`[DatabaseRequired]`. See [The Plugin Lifecycle](/writing-plugins/plugin-lifecycle#the-startup-timeline).
:::

A migration that fails stops startup, the same way a failing `Setup` does. Before the first pending migration the
server copies what it can: the SQLite file, or your tables on MySQL as a SQL dump. A database with nothing in it yet
gets no copy, and neither does SQL Server, where each migration runs in a transaction.

### On the Server's MySQL or SQL Server Database

A migration is generated for one provider, so a SQLite migration won't apply to MySQL or SQL Server. To follow the
server onto either, derive a context per server, give each its own migrations, and name them when registering:

```csharp
services.AddPluginDbContext<Plugin, NotesContext>("notes", options => options
    .WithMySqlMigrations<MySqlNotesContext>()
    .WithSqlServerMigrations<SqlServerNotesContext>());
```

`WithMySqlMigrations` carries the MySQL and MariaDB migrations. Your original context keeps the SQLite ones, and name
only the servers you actually ship migrations for. Shipping them doesn't move your data by itself: a plugin database
stays a SQLite file unless the server itself runs on MySQL or SQL Server *and* an admin has asked it to keep plugin
databases there *and* you named a context for that server. Only then do your tables live there, behind a prefix of your
own. Write for both, since which one you get isn't yours to decide.

The full migration workflow, including the design-time project and the per-server constraints, is in
[the plugin namespace](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Plugin/README.md#a-database-of-your-own).

## Settings

Anything a user should be able to change belongs in a configuration class instead, which the server stores and renders
a settings page for. See [Configuration & Secrets](/writing-plugins/configuration).
