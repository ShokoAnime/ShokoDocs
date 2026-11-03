---
title: Hashing & Release Settings
description: "Hashing & Release settings in the Shoko Web UI: hashing providers, release providers and release management."
---

# Hashing & Release

The **Hashing & Release** tab configures how Shoko hashes files, which providers it asks to identify releases, and how
it compares and cleans up multiple releases of the same episodes. This tab has its own **Cancel** and **Save** buttons.

## Hashing Options

| Option | What it does |
| --- | --- |
| **Parallel Mode** | Runs all enabled hashing providers at the same time instead of one after another. Off by default. |
| **Hashing Providers** | The providers that hash your files. Use the gear icon to choose which hash types a provider calculates, and the info icon for details about the provider. The built-in hasher always calculates ED2K, since Shoko needs it to identify files. |

## Release Provider Options

Release providers find release information (such as the release group, source and episodes) for your files. Providers
can come from Shoko Server itself or from [plugins](/shoko-server/settings/plugin-management). Tick a provider to enable
it and drag providers to set their priority.

- **Auto-Linking Release Providers** are used when Shoko identifies files on its own.
- **Manual Linking Release Providers** are offered when you link files by hand in the Web UI, for example from
  [Unrecognized Files](/shoko-server/unrecognized-files).

## Release Management

These settings decide which release of an episode Shoko considers the best one, and whether redundant releases are
removed. See [Release Management](/shoko-server/release-management) for managing releases per series.

### Deletion

| Option | What it does | Default |
| --- | --- | --- |
| **Auto Delete on Import** | Checks for redundant releases at the end of every import. | Off |
| **Per-file Deletion for Airing Series** | For series that are still airing (no end date on AniDB, or one in the future), removes individual redundant files instead of only whole releases, keeping files for episodes that aren't covered yet. | On |

:::warning Deletion must also be allowed
The check only removes files when deletion is allowed in Shoko Server's settings file (`AllowDeletion` in the release
comparison preferences), which isn't available in the Web UI. Otherwise it only logs what it would remove.
:::

### Quality Preferences

| Option | What it does |
| --- | --- |
| **Episode Type Scope** | **All Together** compares a release's coverage of normal episodes and specials as one, **Per Episode Type** compares them separately. |
| **Signal Priority** | The order in which qualities are compared. By default: source, corruption, resolution, bit depth, video codec, chapters, audio and subtitle streams, languages, audio codec, release group, version and censorship. The first quality that differs decides. |
| **Prefer Higher Bit Depth** | Prefers releases with a higher video bit depth. On by default. |
| **Source Order**, **Resolution Order**, **Video Codec Order**, **Audio Codec Order**, **Audio Language Order**, **Subtitle Language Order**, **Sub Group Order** | Comma-separated preference lists, most preferred first. Source, resolution and codec lists come with a default order. An empty list means no preference. |
