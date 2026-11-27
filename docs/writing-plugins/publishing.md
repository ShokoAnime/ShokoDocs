---
title: Publishing a Plugin
description: "Package a Shoko Server plugin, write a repository manifest and make it installable from the Web UI."
---

<script setup>
import { data } from '../.vitepress/data/packages.data';
</script>

# Publishing a Plugin

A published plugin is two things: a zip archive of the build output, and a manifest that tells the server what the
archive is and where to fetch it. People add the manifest's URL as a repository, then install from
[Plugin Management](/shoko-server/settings/plugin-management).

## Build With Shoko.BuildTools

`shoko-build` builds the plugin, embeds its identity metadata, packages the archive and updates the manifest:

```bash
dotnet tool install --global Shoko.BuildTools

shoko-build -c Release \
  --manifest manifest.json \
  --output ./dist/plugin.zip \
  --url https://example.org/owner/repo/releases/download/v1.0.5/plugin.zip
```

The `--url` is where the archive will be reachable once you upload it, and is what ends up in the manifest. Both
`--output` and `--url` accept placeholders such as `{name}`, `{tag}` and `{runtime}`, so one invocation can produce a
whole runtime matrix, and `--prune` keeps only the most recent releases per channel.

:::warning Identity Metadata
A plugin built without embedded identity metadata logs a warning on every startup, and its `PluginDependency` items
never reach the server, which reads dependencies from the stamped metadata alone. Either build with `shoko-build`, or
add the `Shoko.BuildTools.Targets` package to your project, which injects the metadata during a normal build. See
[which half does what](#which-half-does-what).
:::

## Building Without the Tool

`shoko-build` is for cutting a release. A plain `dotnet build` stamps the same identity metadata on its own once the
targets package is referenced, which is what you want for local builds, debug builds and whatever your IDE runs when
you press play:

```xml-vue
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Version>1.0.5</Version>
    <EnableDynamicLoading>true</EnableDynamicLoading>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <PluginName>My Plugin</PluginName>
    <PluginTags>example,metadata</PluginTags>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Shoko.Abstractions" Version="{{ data.abstractions }}" ExcludeAssets="runtime" />
    <PackageReference Include="Shoko.BuildTools.Targets" Version="{{ data.targets }}" PrivateAssets="All" ExcludeAssets="runtime" />
    <PackageReference Include="Shoko.BuildTools.Analyzers" Version="{{ data.analyzers }}" PrivateAssets="All" />
  </ItemGroup>

</Project>
```

```bash
dotnet build
```

Reference the targets package even in a plugin you release with `shoko-build`. The tool only stamps the builds you run
it for, so without the package every other build — the ones you actually run while developing — produces an assembly
with no identity metadata, which the server complains about on every start.

`EnableDynamicLoading` is the other half of that: it's what copies your plugin's own NuGet dependencies into its output
folder, which is where the server's loader looks for them. Without it the plugin builds cleanly and then can't find
them at runtime. Both the tool and the targets package turn it on, so the property in the example above is only worth
writing to be explicit — or to set it to `false`, which wins over the package's default, as does
`-p:EnableDynamicLoading=false`. Neither gets past `shoko-build`, which passes it as a global property.
A project that imports the targets from source rather than the package gets no such default and sets it itself.
Packages the server itself ships keep `ExcludeAssets="runtime"`, or copying dependencies brings a second copy of those
along too.

The analyzers package is dev-time only, and turns mistakes that would surface at runtime into build errors. See
[Catching Mistakes at Compile Time](#catching-mistakes-at-compile-time).

### Which Half Does What

There are three packages, and they're not alternatives: the targets package belongs in every plugin, the tool is how
you cut a release, and the analyzers are there to fail a build you'd otherwise have to debug at runtime.

| | `Shoko.BuildTools` | `Shoko.BuildTools.Targets` | `Shoko.BuildTools.Analyzers` |
| --- | --- | --- | --- |
| How it's used | A global `dotnet tool`, run as `shoko-build` | A `PackageReference`, on any build | A `PackageReference`, on any build |
| Stamps the assembly | Yes | Yes | No |
| Packs the archive and writes the manifest | Yes | Never | No |
| Sets `EnableDynamicLoading` | Yes | Yes, unless the project sets it | No |
| Checks your code as you compile | No | No | Yes |
| When you want it | Releases | Always | Always |

Both of the first two read the same properties and items, so what you put in the `.csproj` holds whichever way the
plugin is built. The targets package also stamps `ReleaseDate`, `SourceRevision` and `ReleaseTag` from the repository,
and `ReleaseChannel` when the property is set.

## Where the Metadata Comes From

Three places can state your plugin's identity: the project, the command line and `manifest.json`. The command line
wins, then the project, then the manifest, and a list replaces rather than merges — except the tags `shoko-build`
detects in your source, which it adds on top of whatever was stated. A plain build stamps only the tags you state.

| | In the project | On the command line | In the manifest |
| --- | --- | --- | --- |
| ID | `PluginID` | `--id` | `id` |
| Name | `PluginName` | `--name` | `name` |
| Overview | `PluginOverview` | `--overview` | `overview` |
| Tags | `PluginTags` | `--tags` | `tags` |
| Dependencies | `PluginDependency` items, or `PluginDependencies` | `--dependencies` | — |

The properties are ordinary MSBuild ones, so they go in a `PropertyGroup` in your `.csproj`:

```xml
<PropertyGroup>
  <PluginName>My Plugin</PluginName>
  <PluginTags>example,metadata</PluginTags>
</PropertyGroup>
```

Dependencies are the exception in that table: they never come from the manifest, only from the project or the command
line. See [Depending on Another Plugin](#depending-on-another-plugin).

State nothing anywhere and the build still manages: with no manifest, the ID, name and description are read out of your
plugin class's source with Roslyn. A literal `Guid` is read as it stands, and an ID it can only reach through a
`UuidUtility.GetV5(...)` call is computed from the type name that call names — or from the plugin class's own name when
the argument can't be read, which changes if you ever rename the class. That's why your plugin class should carry a
`Guid` of its own from the first commit. An ID the build can't work out at all is simply not stamped.

A stated ID — `--id` or the `PluginID` property — has to match the `id` of whichever manifest the build read, the one
it found beside the project included, since that build updates the manifest and so must be describing the same plugin.
A mismatch stops the build.

The release channel comes from `--channel`, else `-p:ReleaseChannel`, else the assembly version: a revision above zero
means `Dev`, anything else `Stable`. An unrecognised name fails the build rather than falling back. Release notes come
from `--release-notes`, `--release-notes-path` or the `RELEASE_NOTES` environment variable, in that order; passing both
flags is an error, and notes are only written when supplied, so a second runtime's archive joining a release doesn't
blank what the first one recorded.

## Catching Mistakes at Compile Time

Some mistakes can be seen in the source, and `Shoko.BuildTools.Analyzers` is where those checks live. It analyses
nothing at runtime and ships nothing with your plugin: reference it with `PrivateAssets="All"` and it only ever runs
while you compile.

```xml-vue
<PackageReference Include="Shoko.BuildTools.Analyzers" Version="{{ data.analyzers }}" PrivateAssets="All" />
```

Every rule is an error rather than a warning, because each one describes something the server cannot do at all, and the
message says which member is at fault, why it can't work and what to write instead, with a link to the rule's entry in
the [analyzer reference](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.BuildTools.Analyzers/README.md):

```text
error SHOKO0001: Property 'Nested' has type 'List<List<string>>', which nests a collection inside a collection. … Wrap
the inner collection in a class and use a collection of that class instead.
```

The rules shipped so far, `SHOKO0001` to `SHOKO0016`, are all about configuration and form shapes: collections inside
collections, a dictionary key that isn't text, a `[List]` display type the element type can't support, a complex list
row with nothing to name it by, a condition that could never hold, an options provider that can't be called or names
a member that can't take options, a flags enum without single-bit members, a checkbox section with no boolean to
switch. Those are the shapes [Form UI](/writing-plugins/form-ui) describes, and the ones
[Configuration & Secrets](/writing-plugins/configuration#shapes-that-don-t-work) warns about in prose.

That's where it started, not where it stops. The package is for anything about a plugin that can be judged statically,
so expect rules for other contracts as they're written — which also means a newer version can fail a build that passed
before, on code that was always wrong.

## Depending on Another Plugin

A plugin can require another plugin. Dependencies are build inputs, stamped into the assembly and recorded on the
release the build adds to the manifest, so they belong in the project, one item per plugin:

```xml
<ItemGroup>
  <!-- Example Library, which this plugin can't run without. -->
  <PluginDependency Include="0f8a1c2e-1111-2222-3333-444455556666" Version="^1.2.0" />
  <!-- Example Extras, used when it happens to be installed. -->
  <PluginDependency Include="7d3b9f40-aaaa-bbbb-cccc-ddddeeeeffff" Version=">=2.0" Optional="true" />
</ItemGroup>
```

- `Include` is the other plugin's ID, the `Guid` from its plugin class.
- `Version` is required, as `>=1.0.0`, `^1.0.0`, `~1.0.0` or an exact `1.0.0`.
- `Optional` defaults to `false`. A required dependency that's missing, disabled or of the wrong version stops your
  plugin from loading; an optional one is loaded before yours when it's there and ignored when it isn't. One that's
  installed but doesn't fit — a version outside your range, or without the types you refer to — is left out of your
  plugin's load context instead of failing it, so yours loads as if it weren't installed and falls back to your own
  copy of its contracts.
- An item that doesn't parse, a range the server can't evaluate, or the same plugin listed twice stops the build and
  names the item.

They're an ordinary item group, so a `Condition`, items from a `Directory.Build.props`, and a version read from a
property all work as they do anywhere else. The `PluginDependencies` property and `--dependencies` take the same
dependencies as one string, `<guid>@<range>[:optional|:required]` separated by commas, and either replaces the items
outright — the property warns when it's overriding some — which is how `-p:PluginDependencies=…` rewrites them for a
single build.

A manifest has no top-level `dependencies` field. A build that still finds one warns and ignores it; what counts is the
`dependencies` on each release entry, which the build writes from the project.

### What the Server Does With Them

Dependencies decide both whether a plugin loads and when:

- **Load order.** A dependency is set up before the plugin that needs it, which is the topological sort described in
  [The Plugin Lifecycle](/writing-plugins/plugin-lifecycle#setup-and-ready).
- **Installing.** Installing a release whose required dependencies aren't satisfied is refused, unless the install asks
  for them to be installed along with it.
- **Enabling and disabling.** Enabling is refused while a required dependency is missing, and disabling is refused
  while another loaded plugin requires it, unless the request forces it. A plugin that only lists it as optional goes
  on without it, so it never stands in the way.
- **Starting.** A required dependency that's absent, disabled, the wrong version or itself refused keeps your plugin
  from loading, and the reason names it. So does a dependency cycle, which refuses everything in or behind it. An
  unsatisfied optional dependency is only noted in the log.
- **Restarts.** Installing, enabling, disabling or uninstalling re-evaluates all of this, but a plugin that can load
  again only does so after a restart.

A client can read the graph without guessing: `GET /api/v3/Plugin/{pluginID}/Dependencies` resolves one plugin's
dependencies against what's installed, `/Dependents` lists the loaded plugins that need it, and
`GET /api/v3/Plugin/DependencyGraph` returns the graph of every loaded plugin at once. Both answer for what's loaded
this session, so a disabled or refused plugin is in neither.

## The Manifest

The manifest describes the plugin and its releases:

```json
{
  "$schema": "https://raw.githubusercontent.com/ShokoAnime/ShokoServer/refs/heads/master/Shoko.BuildTools/manifest.schema.json",
  "id": "2f4b7a3e-9c1d-4f6a-8b2e-5d3c7a1f9e0b",
  "name": "My Plugin",
  "overview": "What it does, in a sentence.",
  "authors": "Your Name",
  "repository_url": "https://github.com/you/Shoko.Plugin.MyPlugin",
  "tags": ["example"],
  "thumbnail_url": "https://example.org/my-plugin/thumbnail.png",
  "icon_url": "https://example.org/my-plugin/icon.png",
  "releases": [
    {
      "version": "1.0.0",
      "tag": "v1.0.0",
      "channel": "Stable",
      "released_at": "2026-01-16T14:12:10Z",
      "archives": [
        {
          "runtime": "any",
          "abstraction": "6.0.0",
          "url": "https://example.org/owner/repo/releases/download/v1.0.0/plugin.zip",
          "checksum": "sha256:…"
        }
      ],
      "dependencies": [
        { "id": "0f8a1c2e-1111-2222-3333-444455556666", "version": "^1.2.0" }
      ]
    }
  ]
}
```

The `id` has to be the same `Guid` as your plugin class's `ID`. A release carries its version, tag, channel, source
revision, at least one archive and the dependencies that build stated, and an archive carries its runtime, the
abstraction version it was built against, a URL and a checksum. `shoko-build` fills these in for you, the dependencies
included, so the entry says what that particular release needs. A manifest without an `id` or a `name` doesn't load at
all; the overviews are optional, but they're what people see while browsing, so write them.

`thumbnail_url` and `icon_url` are the two images a repository shows for your plugin, and both are optional. The older
`image_url` is deprecated: it couldn't say which of the two it was, so it's read as a thumbnail, which isn't what
authors were supplying it for. An existing manifest keeps working, but write the two named fields instead.

`type` is optional and defaults to `package`, which is what a plugin's own manifest is. Its only other value,
`manifest`, marks a reference entry in an aggregate repository; see [Hosting It](#hosting-it).

`extensions` is an optional object for data of your own, allowed on the package, on a release and on an archive. The
server hands it back through the API exactly as written and never reads a key of it, so it's where a frontend or a
tool of yours keeps what the manifest has no field for. `shoko-build` leaves it alone when it updates the manifest,
along with anything else it doesn't recognise.

`manifest.schema.json` next to the build tool's source is the full schema.

## Icon and Thumbnail

A plugin can carry its own two images, which is what the server shows once the plugin is installed. Neither is
required.

- The **thumbnail** is the wide one, shown where there's room for it.
- The **icon** is square, shown beside your plugin's name where there isn't. Supply something still readable at 24
  pixels, since the server neither crops nor scales it.

### Where the Server Looks

There are three places to put one, and a file on disk wins over an embedded resource:

| Shipped as | Thumbnail | Icon |
| --- | --- | --- |
| A file in the plugin's own directory | `thumbnail.*` | `icon.*` |
| A file beside a loose dll | `<dll name>.thumbnail.*` | `<dll name>.icon.*` |
| An embedded resource | `EmbeddedThumbnailResourceName` | `EmbeddedIconResourceName` |

Installing a plugin always gives it a directory of its own, and the file belongs at the top of it; subdirectories
aren't searched. The loose-dll case is someone copying a single dll into the plugins folder by hand — how every plugin
arrived before the package manager existed — which leaves it no directory to itself, so its images are named after the
dll instead: `MyPlugin.icon.png` next to `MyPlugin.dll`.

The extension has to be one the server knows — `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.bmp` or `.tiff` —
and the bytes have to be a real image in one of those formats, since the format the server reads out of the file, not
the extension, decides the media type it's served with. SVG stays sharpest at both sizes.

### Embedding One

Add the image to your project as a resource:

```xml
<ItemGroup>
  <EmbeddedResource Include="assets\Icon.png" />
  <EmbeddedResource Include="assets\Thumbnail.png" />
</ItemGroup>
```

Then name it from [the plugin class](/writing-plugins/getting-started#write-the-plugin-class), the one implementing
`IPlugin` that already carries your `ID` and `Name`:

```csharp
public class Plugin : IPlugin
{
    // ID, Name and Description as usual.

    public string? EmbeddedIconResourceName => "MyPlugin.assets.Icon.png";

    public string? EmbeddedThumbnailResourceName => "MyPlugin.assets.Thumbnail.png";
}
```

Both are ordinary `IPlugin` members that default to `null`, so a plugin without images implements neither, and there's
nothing magic about them: the server asks your class for a name and reads back exactly that resource. Which makes the
name the whole contract, and it isn't the file's.

The name a resource ends up with is your root namespace, then the path to the file with the separators turned into
dots. Two things about that catch people out:

- **The name has to start with your assembly name.** A plugin may only name resources in its own assembly, so one
  rooted anywhere else is ignored — and nothing is logged when it is. A project whose `RootNamespace` differs from its
  `AssemblyName` gets a default name that never matches.
- **Directory names are rewritten.** A folder called `brand-assets` becomes `brand_assets` in the name, while the file
  name keeps its dashes.

`LogicalName` settles both by saying outright what the resource is called:

```xml
<EmbeddedResource Include="brand-assets\my-icon.svg" LogicalName="MyPlugin.icon.svg" />
```

[Shoko.Plugin.Tmdb](https://github.com/ShokoAnime/Shoko.Plugin.Tmdb/blob/stable/source/Shoko.Plugin.Tmdb.csproj) ships
its two SVGs that way, with the names kept as constants so its metadata provider can name the icon again for the
source.

The first time the server reads an embedded image it writes it out beside the plugin under the file name from the table
above, and serves that file from then on, so the plugin's directory has to be writable. A file you shipped yourself is
never overwritten.

Both images are served at `GET /api/v3/Plugin/{pluginID}/Icon` and `/Thumbnail`, and under `/{pluginVersion}` for a
particular installed version. A plugin carrying neither answers `404`.

The abstractions' [Thumbnail and icon](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Plugin/README.md#thumbnail-and-icon)
says the same beside the code.

### Icons for the Parts Inside

Some of the parts a plugin registers carry an icon of their own, found the same way: a file beside the plugin wins, an
embedded resource named on the part is extracted there, and for a loose dll every name below is prefixed with
`<dll name>.`.

| Part | Named on | File name | With none |
| --- | --- | --- | --- |
| A metadata provider | `IMetadataSeriesProvider` or `IMetadataMovieProvider` | `<source>-icon.*` | The source has no icon |
| An image contributor | `IMetadataImageContributor` | `<source>.images-icon.*` | The contributor has no icon |
| An airing schedule provider | `IAiringScheduleProvider` | `<type name>.airing-icon.*` | Your plugin's icon stands in |

Each of them names it through an `EmbeddedIconResourceName` of its own, declared on that interface and defaulting to
`null` the same way, under the same rules as the plugin's. A source has
one icon however many providers answer for it, and a series provider's name wins over a movie provider's. To give a
part your plugin's own icon, name the same resource again.

### The Manifest's Two URLs

`thumbnail_url` and `icon_url` in [the manifest](#the-manifest) are a separate pair: they're what a repository shows
while someone is browsing, before anything is installed, so they're images you host rather than files you ship. The
server keeps the two sides apart — nothing reads your embedded images to fill the manifest in, and nothing falls back
to the manifest for an installed plugin — so a plugin that should look like itself before *and* after installing wants
both.

The server downloads each URL once, caches it under the plugins folder and serves it at
`GET /api/v3/Plugin/Package/{packageID}/Icon` or `/Thumbnail`. Two things follow from that:

- The cache is keyed by the URL, so replacing the image at a URL that's already been fetched changes nothing. Publish
  the new one at a new URL.
- The extension it's cached under comes from the response's `Content-Type`, so a host that answers with something that
  isn't an image media type leaves the package with no image at all.

Pointing both URLs at the raw image files in your own repository, as TMDB does, keeps the pair you host and the pair
you ship the same two files.

## Hosting It

- The manifest must be served as raw JSON, with a content type of `application/json` or `text/plain`. A link to a
  repository's file *page* won't work; use the raw file URL.
- The URL has to be absolute, over http or https.
- The archive URLs in the manifest are fetched by the server directly, so they must be publicly reachable too.
- A manifest served over https may not point at plain http. A linked manifest, an image or an archive at an `http://`
  address is left out, with the reason in the log and, for an archive, in the release's refusals, and a redirect from
  https to http is refused by name rather than failing as a bare redirect. A relative address takes the manifest's own
  scheme, and a manifest served over http may name whatever it likes, so this only bites a mixed feed.

A manifest can describe one plugin or several. The server accepts:

| Form | What it is |
| --- | --- |
| A single object | One plugin's manifest |
| An array of objects | Several plugins in one repository |
| Reference entries | `{ "id": "…", "type": "manifest", "url": "…" }` inside an array, pointing at one single-object manifest |

**Publish your own plugin's manifest as a single object.** That's the form a reference can point at, so a curated list
can link yours instead of copying it — which is how the two repositories Shoko ships are built: each is an array of
reference entries, one per plugin, each pointing at the raw `manifest.json` on that plugin's `metadata` branch. The
array form is for a repository that lists several plugins of its own.

Reference entries are how an aggregate feed works: one repository URL that lists other people's manifests. **What a
reference points at has to be a single object.** An array there is refused, and so is a further reference, so the
chain is one link long. A single-object manifest can't carry a reference at all. A reference entry carries the
referenced package's `id` beside the `url`, and nothing else: a name, overview or release list on it is ignored, since
those come from the manifest it points at.

The two mistakes cost different amounts. A reference whose target is an array or unparseable is dropped on its own: the
log says the linked manifest couldn't be read and that its packages are left out, and the rest of the repository syncs
as usual. A reference the server simply can't reach keeps serving the copy it cached last time, and says so in the log.
A manifest that *is* a reference object at the top level fails the whole sync instead, and the repository keeps
whatever it last synced.

The same plugin may be listed by more than one manifest in a repository — a stable manifest and a dev one are the same
package at two addresses — and the server unions their releases. What it won't read twice is the same package at the
same address, which is just a repository listing an entry twice.

Adding a repository doesn't validate its contents. A broken manifest shows up as a failed sync, so check the server's
logs if a repository stays empty.

## Keeping the Manifest Somewhere

The manifest has to live at a stable URL that you can update on every release, and the obvious place is the repository
you're releasing from — except that a release writing it back there lands a bot commit on the branch everyone works
from, which they all have to pull before their next push.

Shoko's own plugins answer that with a branch that holds nothing but the live manifest, named `metadata`. The
`manifest.json` on your code branch stays a stub: the identity the build stamps into the assembly, and an empty release
list. The release workflow fetches the live manifest over that stub before it builds, so the embedded metadata and the
published manifest can't disagree, adds the new release entry to it, and commits it to `metadata` and nowhere else.
People point their repository at the raw file on that branch.

Seed the branch by hand, once, before the first release: a copy of the manifest with your real identity filled in. The
workflow adds releases to it and changes nothing else. It has no fallback to the stub on purpose, so a first release
with no branch stops at the fetch — before anything is built or uploaded — rather than publishing a release whose
manifest still describes a template.

[Shoko.Plugin.Tmdb](https://github.com/ShokoAnime/Shoko.Plugin.Tmdb) is the worked example. Its live manifest is on the
`metadata` branch, and its
[release workflow](https://github.com/ShokoAnime/Shoko.Plugin.Tmdb/blob/stable/.github/workflows/release.yml) is
commented step by step, through the fetch, the packaging and the single commit at the end. The
[plugin template](https://github.com/ShokoAnime/Plugin-Template) ships the same workflow, but a repository made from it
starts with a placeholder identity and no `metadata` branch, so the seeding above is still yours to do.

Any host works, as long as the URL stays put and serves raw JSON.

## Installing It

Your plugin doesn't have to be listed anywhere for people to install it: they add your manifest URL as a repository of
their own. Shoko also ships with a
[core and a community repository](/shoko-server/settings/plugin-management#repositories), but both are curated by the
Shoko team, so being listed in one isn't something you arrange yourself.

For people using your plugin:

1. **Settings** → **Plugin Management** → **Repositories** → **Add Repository**, with a name and the manifest URL.
2. **Browse**, find the plugin and click **Install**. The release notes are shown before it's confirmed.
3. Restart Shoko Server when prompted.

For your own testing, copying the build output into a sub-folder of the server's `plugins` directory and restarting
works just as well, and skips the packaging entirely.

## Updates

Publishing an update is adding a release to the same manifest and uploading the new archive. Servers that have your
repository pick it up when they sync, and people either upgrade from the **Updates** tab or let
[automatic upgrades](/shoko-server/settings/plugin-management#update-settings) handle it.

Keep the plugin's `Guid` stable across releases. It's how the server knows an update is an update, rather than a
different plugin.
