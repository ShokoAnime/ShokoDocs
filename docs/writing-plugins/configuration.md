---
title: Configuration & Secrets
description: "Declare a Shoko Server plugin's settings so the server validates and stores them, and handle passwords and API keys safely."
---

# Configuration & Secrets

Shoko's configuration is code-first. You declare a plain C# class, and the server derives a JSON schema from it,
persists it, validates it and serves the schema over the API, so a client can render your settings and you never write
any UI yourself.

## A Configuration Class

Declare a public class implementing `IConfiguration`, and annotate it with the usual data annotations:

```csharp
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Shoko.Abstractions.Config;

[Display(Name = "My Plugin")]
public class MyConfiguration : IConfiguration, IVisibleConfiguration
{
    [Display(Name = "API Token", Description = "Your personal API token.")]
    [PasswordPropertyText]
    public string? ApiToken { get; set; }

    [Display(Name = "Sweep Interval (Hours)")]
    [Range(1, 24 * 30)]
    [DefaultValue(24)]
    public int SweepIntervalHours { get; set; } = 24;
}
```

`IVisibleConfiguration` marks the configuration as one to list on its own. All it does is clear
`ConfigurationInfo.IsHidden`, which is what `/api/v3/Configuration` reports and filters on; it doesn't promise that any
client draws a page. Leave it off for a configuration that belongs to a provider or is your plugin's main
configuration, which are meant to be shown with their owner.

Then take a `ConfigurationProvider<MyConfiguration>` in any constructor that supports injection, such as one of your
[contract implementations](/writing-plugins/extension-points) or a hosted service:

```csharp
public class MyProvider(ConfigurationProvider<MyConfiguration> configurationProvider)
{
    public void DoSomething()
    {
        var config = configurationProvider.Load();
        if (string.IsNullOrWhiteSpace(config.ApiToken))
            return;
        // …
    }
}
```

There's nothing to register. `Load()` returns the current instance, `Load(copy: true)` a copy you can mutate freely,
`New()` a fresh instance from defaults, and `Save()` persists the in-memory instance.

:::danger The Class Has to Be Public
Only public types are discovered. An `internal` configuration class is never registered, and `Load()` then fails with a
`NullReferenceException` rather than anything that names the cause. If `Load()` throws an NRE, check the class's
accessibility first.
:::

## Your Plugin's Main Configuration

A plugin can name one of its configurations as its own. Mark the class with `IPluginConfiguration`, and name it from
the plugin class through the generic form of `IPlugin`:

```csharp
public class Plugin : IPlugin<MyConfiguration>
{
    public Guid ID { get; } = new("2f4b7a3e-9c1d-4f6a-8b2e-5d3c7a1f9e0b");

    public string Name { get; } = "My Plugin";
}

public class MyConfiguration : IPluginConfiguration
{
    // Settings, as above.
}
```

The constraint is `class, IPluginConfiguration, new()`, and the type has to live in your plugin's own assembly. The
server attaches it to the plugin's `LocalPluginInfo.ConfigurationInfo`, and the plugin's entry from
`GET /api/v3/Plugin` carries it as `Configuration`. That nested copy leaves its own `Plugin` field empty, since the
two would otherwise describe each other without end; the standalone configuration endpoints fill it in as usual.

The main configuration is meant to be shown with the plugin rather than listed on its own, which is why the
first-party plugins don't mark it visible. Add `IVisibleConfiguration` on top only when the configuration earns being
listed in its own right as well. A configuration can be a plugin's main one, a provider's, and visible, all at once.

## Configurations per User

A configuration can be kept per user rather than once for the whole server: one JSON object per user, which is how a
web interface, an app or a plugin of yours stores someone's own preferences. Register each one from `RegisterServices`:

```csharp
public class ViewerConfiguration : IUserConfiguration
{
    [Display(Name = "Items per Page")]
    [Range(10, 200)]
    [DefaultValue(50)]
    public int PageSize { get; set; } = 50;
}

public class Plugin : IPlugin, IPluginServiceRegistration
{
    public static void RegisterServices(IServiceCollection services, IApplicationPaths applicationPaths)
        => services.AddUserConfiguration<Plugin, ViewerConfiguration>("my-viewer");
}
```

A typed user configuration is described like any other: it gets a `ConfigurationInfo`, so its schema, its custom
validation, its [secrets](#secrets) and its [generated form](/writing-plugins/form-ui) all work, per user. What it
doesn't get is a configuration file of its own — each user's document is a row in the database — and `Load<TConfig>`
hands back a fresh instance built from your defaults when a user has nothing stored.

```csharp
public class MyController(IUserConfigurationService userConfigurations)
{
    public void BumpPageSize(IUser user)
    {
        var config = userConfigurations.Load<ViewerConfiguration>(user, "my-viewer");
        config.PageSize = 100;
        userConfigurations.Save(user, "my-viewer", config);
    }
}
```

The ID is lowercase kebab-case and at most 64 characters, like a metadata source's value. The core holds `webui`, and
two registrations of one ID stop start-up; routes and lookups take it in any case. `Name` and `Description`, through
the optional `configure` callback, are for display only, and the name defaults to the ID.

A configuration that is only ever written by a client of yours can skip the type: `AddUserConfiguration<Plugin>` takes
plain JSON text, optionally with a schema to check it against, as either `SchemaPath` — absolute or relative to the
data folder, without a `..` segment, re-read whenever it changes — or `SchemaJson`. A missing or broken schema file
refuses saves unless you set `Strict` to `false`, which saves them unvalidated instead.

Users reach their own through `/api/v3/User/Current/Configuration/{configurationID}`, with `GET`, `PUT` and `DELETE`,
and an admin reaches anyone's under `/api/v3/User/{userID}/Configuration/{configurationID}`. Only a registered
configuration can be saved, while any stored one can be read or deleted, so the leftovers of a plugin that is gone can
still be cleared.

## Secrets

Mark any member holding a password, token or API key with `[PasswordPropertyText]` or `[DataType(DataType.Password)]`.
Either one describes the member as a password field, replaces a set value with a masked placeholder on the
configuration endpoints, and restores the stored value when the configuration comes back to be saved. So those
endpoints never hand out a secret, and an unchanged secret survives a save from the Web UI. A secret that holds nothing
has nothing to mask and goes out as it is, which is how "not configured" stays apart from "withheld".

Loading your own configuration in-process is never masked. `Load()` always gives you the real value.

Secrets inside a list are handled too, and need nothing from you. Each masked value carries a fingerprint that says
which stored value it stands for, so reordering, removing or renaming entries is safe.

:::warning Serving Your Own Configuration
If your plugin exposes its configuration through its own endpoint, serializing it plainly leaks the secret. Use the
masking helpers on `IConfigurationService`: `SerializeWithMasking`, `MaskSecrets` and `RestoreMaskedSecrets`. For a
single value rather than a whole document, `ConfigurationSecrets.IsMasked` and `.Resolve` are the ones you want.

A client of yours should send back exactly the masked value it was given, and recognise one with
`ConfigurationSecrets.IsMasked` rather than by comparing strings, since the placeholder isn't a fixed piece of text.

That also means anything posting a configuration back hands you the mask rather than the secret. Saving copes with
that on its own, but an endpoint that *uses* a secret has to resolve it first, with
`ConfigurationSecrets.Resolve(posted, stored)`, which reads a mask as "the one you already have".
:::

## Describing Your Settings

The form is generated from your class, so what people see comes from the annotations on it:

| Annotation | Effect |
| --- | --- |
| `[Display(Name, Description)]` | The label and the help text, on the class and on each member |
| `[DefaultValue]` | The default the schema and the settings page show; what a fresh instance holds is its property initialiser |
| `[Range]`, `[RegularExpression]` | Validation, enforced on load as well as on save |
| `[Required]` | Validation too, but see the warning below |
| `[PasswordPropertyText]` | Masks the value over the API |

That's the whole of it for an ordinary setting. Laying the form out in sections, choosing how a member renders, showing
and hiding fields as other settings change, reacting while someone edits and offering options only the server can list
are all covered in [Form UI](/writing-plugins/form-ui).

:::danger `[Required]` Can Make a Plugin Unusable
Validation runs when the configuration is **loaded**, not only when it's saved, and a `[Required]` member that hasn't
been filled in fails it. On a fresh install nothing has been filled in, so every `Load()` throws from the moment the
plugin is installed, and the settings page can't rescue it.

The same goes for a `[Range]` or `[RegularExpression]` that your default value doesn't satisfy. Give every member a
default that validates, and check for what you actually need at the point of use.
:::

Ordinary XML doc comments work as well, and are usually the nicer way to write a longer explanation:

```csharp
/// <summary>
/// How long to wait between sweeps. Keep this high unless you're testing,
/// since each sweep re-reads the whole collection.
/// </summary>
[Display(Name = "Sweep Interval (Hours)")]
public int SweepIntervalHours { get; set; } = 24;
```

:::warning Doc Comments Need the Documentation File
Those comments only reach the settings page if your project generates its documentation file and ships it next to the
assembly:

```xml
<GenerateDocumentationFile>true</GenerateDocumentationFile>
```

Without it the build is fine and the plugin loads, but every description is simply missing. `shoko-build` packs the
whole output directory, so the generated file ships with the plugin on its own. Add
`<NoWarn>$(NoWarn);CS1591</NoWarn>` if you'd rather not be warned about public members you haven't documented.
:::

Descriptions are tidied up before they're shown, from either source, so you can wrap them however reads best in code:

- **Line breaks within a paragraph are stitched back together**, and runs of spaces collapse, so the indentation of a
  doc comment or a raw string literal doesn't leak into the settings page.
- **A blank line starts a new paragraph.**
- **Write prose.** Nothing promises that headings, lists or images in a description are rendered, so keep it to
  sentences.

That makes a raw string literal a comfortable way to write a longer description:

```csharp
[Display(
    Name = "Sweep Interval (Hours)",
    Description = """
    How long to wait between sweeps. Keep this high unless you're
    testing, since each sweep re-reads the whole collection.

    Setting it below 6 is rarely useful.
    """
)]
public int SweepIntervalHours { get; set; } = 24;
```

## Buttons on the Settings Page

`[CustomAction]` puts a button on the settings page, wired to an instance method on the configuration class, or on the
class of a nested object inside it. The method runs on that object, so it can read and change the settings around it:

```csharp
[CustomAction]
[Display(Name = "Test Token")]
public ConfigurationActionResult TestTokenAction(ConfigurationActionContext<MyConfiguration> context)
    => new("Connected.", DisplayColorTheme.Important);
```

The method has to return a `ConfigurationActionResult`, or a `Task<ConfigurationActionResult>`. One that returns
anything else still runs when the button is pressed, but its result is dropped and the button reports nothing back. Parameters are optional and resolved by type, so take the context when
you want the surrounding settings, and nothing when you don't.

The button's label comes from `[Display(Name)]`. Without one, the method name is split into words and a trailing
"Action" or "Handler" is dropped, so `TestTokenAction` becomes "Test Token". Where the button sits, what it looks like
and whether it's offered at all are [the form's business](/writing-plugins/form-ui#buttons).

## Shapes That Don't Work

The [analyzers package](/writing-plugins/publishing#catching-mistakes-at-compile-time) turns most of what follows into
a build error, which is a better way to find out than a failed schema generation at runtime.

Most C# shapes describe themselves fine: scalars, enums, nested classes, lists and dictionaries all become editable
settings without help. A few don't, and are worth knowing before you design a configuration around them.

- **No collection directly inside a collection.** A `List<List<T>>`, or a dictionary of dictionaries, has nothing to
  edit as a unit. Wrap the inner one in a class. A dictionary whose values are lists is fine.
- **A dictionary key has to be expressible as text**: a string, an enum that isn't `[Flags]`, or a type marked
  `[Serializable]` or implementing `ISerializable`.
- **A dictionary has to be a generic one.** A `Hashtable` still serialises as a JSON object, but the generator can't
  read a key and value type off it. Use `Dictionary<TKey, TValue>`.
- **A complex `[List]` display type needs something to label each entry with.** Put `[Key]` on a property of the item
  type, or on the list itself, or describing the type throws and it gets no UI at all. A plain list needs none, though
  without a key a client has no label to put on a row.
- **A [`[Visibility]`](/writing-plugins/form-ui#showing-and-hiding) condition has to resolve from the class it's
  declared on.** It can name a member of that class, or descend into one of its nested classes, but not one reached
  through a list or dictionary, and the comparison has to suit the member's type.

The **Plugins** section of the settings sidebar lists the pages a plugin brings with it, which are its own UI rather
than anything generated from a configuration. See
[Plugin Management](/shoko-server/settings/plugin-management#plugin-pages).

## Reference

[Configuration](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Config/Services/README.md) in the source covers the rest: validation, sections, per-member
display hints, and the `IConfigurationService` API that `ConfigurationProvider<T>` wraps.
[Form UI](/writing-plugins/form-ui) covers the other half here, and
[its source reference](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/UI/README.md) has the
per-attribute detail along with the shape of the `UiDefinition` the server serves to clients.
