---
title: Serving a Metadata Source
description: "Make a Shoko Server plugin a metadata source of its own: register the source, implement a provider, and let the server do the rest."
---

# Serving a Metadata Source

Shoko Server serves AniDB itself; TMDB comes from a plugin it bundles. Every other source comes from a plugin too,
which registers the source and
implements a provider for it. The server owns the queue, the locking and the freshness rules, so a provider is mostly
"fetch this, hand it back".

This page is the arc. The members, the options and the per-kind detail are in
[Metadata/Providers](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Metadata/Providers/README.md).

## Register the Source

A provider answers for exactly one source, and the source has to exist before anything reads it. Register yours from a
static class, and touch that class from `RegisterServices`:

```csharp
public static class MySources
{
    static MySources()
    {
        Example = MetadataSource.Register("Example", "example", description: "The database at example.test.");
    }

    public static MetadataSource Example { get; }
}

public static void RegisterServices(IServiceCollection services, IApplicationPaths applicationPaths)
{
    // Touching it runs the static constructor, and so the registration.
    _ = MySources.Example;
}
```

The value is kebab-case, and is what settings and stored data hold. `Name` and `Description` are for display.

:::danger Register in `RegisterServices`, Not Later
Registration closes once every plugin has been set up, but that isn't the deadline that bites. Your provider's `Source`
is read once, when the server registers the providers — after `RegisterServices`, and **before** any `Setup` runs — and
an image contributor whose source isn't registered yet is refused outright.

A static field initialiser without a static constructor can also run too late. Use the shape above.
:::

A provider may not claim the sources the core answers for itself — `shoko`, `anidb`, `user` and `generated` — and is
dropped with a warning if it does. `tmdb` isn't among them: it's a plugin's source like any other. Registering a value
somebody already registered hands you back that same source rather than failing, with the aliases merged, so pick a
value of your own.

A source's icon isn't registered here: it ships with your plugin, named after the source's value, as
[Icons for the parts inside](/writing-plugins/publishing#icons-for-the-parts-inside) describes.

## Implement the Provider

Implement `IMetadataProvider`, plus at least one of `IMetadataSeriesProvider`, `IMetadataMovieProvider` or
`IMetadataAutoLinkingProvider` — a provider with only the other capability interfaces is dropped with a warning, since
there's nothing for it to hang its work on:

| Interface | What it means |
| --- | --- |
| `IMetadataSeriesProvider` | You can fetch series and their episodes |
| `IMetadataMovieProvider` | You can fetch movies |
| `IMetadataSeriesLinkingProvider` / `IMetadataMovieLinkingProvider` | You can link your entries to AniDB's |
| `IMetadataAutoLinkingProvider` | You can find those links without being told |
| `IMetadataCollectionProvider` | You have collections |
| `IMetadataImageProvider` | You have artwork |
| `IMetadataEntityProvider` | You can refresh one person, character, studio or network at a time |

The provider fetches, then writes what it found into the typed stores. It has no getters: the server reads everything
back from the stores, which is why a disabled or uninstalled plugin's data still resolves.

:::tip Say When You're Not Ready
While `IsConfigured` is `false`, say because nobody has entered an API key, auto-linking skips you quietly and a
search that needs you fails with your `NotConfiguredReason` rather than a mystery. It's worth implementing before
anything else.
:::

## Don't Write Queue Code

The server closes one job type per provider for each kind of work — refresh, search, images, entities, with series,
movies and collections sharing the refresh job — and runs them itself, so a provider writes no jobs, no locking and no
scheduling.

:::warning Keep the Class's Full Name Short
Those generated jobs are stored under a name built from your class's full name and its assembly, and the store caps it
at 256 characters. A provider buried in a long namespace loses its jobs, with only a warning in the log.
:::

## Artwork for Someone Else's Entries

If you have artwork for entries that belong to *other* sources, and no entries of your own, implement
`IMetadataImageContributor` instead — there's no provider to write. You still register a source of your own, which is
what your images and their links are kept under, and name the sources and kinds you add images for with
`MetadataEntityScope.ForSource(...)`, core sources included. The core refuses a contributor whose source is
unregistered, one of its own, or already another contributor's, so the registration timing above matters just as much
here.

Whenever the core refreshes an entry's images it queues a job per contributor that covers it, asks you for that
entity's images, and links them under your source by its image settings. `MaxConcurrentJobs` caps your own jobs, and
an admin can turn individual source-and-kind pairs off, which removes your links there.

A remote source's images are fetched through its template URL. A local source has none, so implement `GetImageStream`
to hand the core an image's contents, and override `CheckIfImageAvailable` when saying whether an image is still there
is cheaper than producing it. While nothing serves a local source, say because the plugin is disabled, its stored
images are left alone.

## When the Service Won't Answer

A service that rate limits you, bans you, rejects your key or simply starts failing is a *suspension*, and while one is
up the server holds back the queued jobs of the providers it names. Export an `ISuspensionProvider` per status a
service can be in on its own, and report from wherever that knowledge lives — your rate limiter, usually — through
`ISuspensionReporter<TProvider>`:

```csharp
public sealed class ExampleSuspensionProvider : ISuspensionProvider
{
    public string Name => "Example";

    public string? Description => null;

    public IReadOnlyList<Type> HeldProviderTypes => [typeof(ExampleMetadataProvider)];

    public Task Lift(SuspensionKind kind, CancellationToken token) => Task.CompletedTask;
}

public class ExampleRateLimiter(ISuspensionReporter<ExampleSuspensionProvider> reporter)
{
    public void OnTooManyRequests(TimeSpan retryAfter)
        => reporter.Suspend(SuspensionKind.RateLimited, resumesAt: DateTime.UtcNow + retryAfter);
}
```

There's one suspension per kind, and reporting a kind again updates the one that's up. Hand `Suspend` a `resumesAt`
when the service told you when it's over and the server clears it without a timer of yours; otherwise `Resume(kind)` as
soon as you know it's over. An admin can only lift what you reported with `isLiftable: true`, and lifting calls your
`Lift` first. Every reporter member throws while `TProvider` isn't a loaded provider, which includes any use before
the providers are registered at start-up.

Leave `reason` unset unless the service told you something a client couldn't word from the kind alone, since the core
adds no text of its own.

## Your Own Kinds of Entry

A plugin can invent kinds the server holds nothing for, such as a media server's own libraries. Implement
`IMetadataResolver` so the rest of the server can resolve them.
