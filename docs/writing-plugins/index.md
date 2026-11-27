---
title: Writing Plugins
description: "An introduction to writing plugins for Shoko Server: what a plugin can do and how this section is laid out."
---

# Writing Plugins

A Shoko Server plugin is a .NET assembly that the server loads at startup. Plugins can identify releases, hash files,
rename and move them, provide metadata and images, transform video streams, add API endpoints and background work, and
expose their own settings in the Web UI.

This section is the guided path: how to set a project up, what runs when, how configuration works, and how to publish a
plugin so other people can install it. Everything here is the `Shoko.Abstractions` package, which replaced the older
`Shoko.Plugin.Abstractions` a 5.x plugin was written against — queue jobs come from `Shoko.QueueProcessor`, referenced
alongside it.

## Where to Start

1. [Your First Plugin](/writing-plugins/getting-started) sets up a project and gets it loaded.
2. [The Plugin Lifecycle](/writing-plugins/plugin-lifecycle) explains what the server does, and when, so your code runs
   at a point where the things it needs actually exist.
3. [Configuration & Secrets](/writing-plugins/configuration) adds settings, and handles passwords and API keys safely.
4. [Form UI](/writing-plugins/form-ui) lays those settings out, and does the same for an action's parameters.
5. [Extension Points](/writing-plugins/extension-points) lists the contracts the server discovers, and how to implement
   one.
6. [Serving a Metadata Source](/writing-plugins/metadata-sources) makes your plugin a source in its own right.
7. [Actions & Background Work](/writing-plugins/actions-and-jobs) runs things on a schedule, on demand, or through the
   queue.
8. [Web APIs & Events](/writing-plugins/web-apis-and-events) covers controllers, middleware, feeds and events.
9. [Storing Data](/writing-plugins/storing-data) gives your plugin folders and a database of its own.
10. [Publishing a Plugin](/writing-plugins/publishing) packages it, writes a manifest and gets it installable.
11. [Troubleshooting](/writing-plugins/troubleshooting) collects the failures that look like nothing happened.
12. [Migrating from 5.x](/writing-plugins/migrating-from-5x) is the checklist for a plugin that already exists.

## Reference Documentation

Most areas of `Shoko.Abstractions` carry a `README.md` next to the code, with the per-member detail these pages
deliberately leave out, such as what each service method does and what each contract's methods receive:

- [Abstractions overview](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/README.md), which links to all of them
- [Plugins](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Plugin/README.md), covering the plugin and package managers
- [Configuration](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Config/Services/README.md),
  with [form UI](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/UI/README.md) alongside it
- [Video](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/README.md), with
  [release](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Release/README.md), [hashing](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Hashing/README.md),
  [relocation](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Relocation/README.md) and [streaming](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Video/Streaming/README.md) alongside it
- [Metadata](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Services/README.md), with
  [metadata providers](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Providers/README.md),
  [AniDB](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Anidb/Services/README.md) and
  [airing schedules](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Airing/README.md)
  alongside it
- [Scheduled actions](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/ScheduledActions/Services/README.md)
  and [executable actions](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Actions/Services/README.md)
- [Feeds and hubs](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Web/SignalR/README.md)

Use these pages for the path through the system, and the source documentation for the specifics of a type.
