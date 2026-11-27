---
title: Form UI
description: "Lay a plugin's settings out, show and hide fields, put buttons on them, react while they're edited, and list options only the server knows."
---

# Form UI

A configuration class and an executable action's parameters are described in exactly the same way. The server derives
two things from the class: a JSON schema, which stays the authority for **validation**, and a `UiDefinition`, which is
the authority for **rendering**. In the definition the references are resolved, the labels are worked out, each
constraint sits on the element it applies to and every element carries a concrete kind, so a client draws the form
without interpreting the schema.

```
GET /api/v3/Configuration/{configID}/UiDefinition
GET /api/v3/Action/{actionID}/UiDefinition
```

[Configuration & Secrets](/writing-plugins/configuration) covers declaring a configuration and handling its secrets,
and [Actions & Background Work](/writing-plugins/actions-and-jobs#parameters) covers an action's parameters. This page
is the part they share: the attributes that say how the form looks and behaves. All of it applies to a nested class
too, which is described the same way wherever it appears.

## Layout

Members render in the order you declared them. Nothing is reordered behind your back, so a class can go field, field,
nested class, field, and that's what people see.

Three things change that, and all of them are yours to ask for:

- **`[Display(Order = 1)]`** moves a member ahead of every member that doesn't set one.
- **`[SectionName("Login")]`** gathers every member carrying that name into one titled group, entered at the position
  of the first member in it. A later member with the same name joins that group rather than opening a second one.
- **`[Section(..., AppendFloatingSectionsAtEnd = true)]`** moves every gathered group past the members left in place.

A member that is a class of its own, or a list of them, stays an ordinary item and takes its heading from its own
label, so the default section never gathers it — give it a `[SectionName]` and it joins that section like any other
member. That's why a tabbed configuration gets one tab per nested class without you naming anything:

```csharp
[Section(DisplaySectionType.Tab, DefaultSectionName = "Misc.", AppendFloatingSectionsAtEnd = true)]
public class MyConfiguration : IConfiguration
{
    public LibraryConfiguration Library { get; set; } = new();    // its own tab
    public NetworkConfiguration Network { get; set; } = new();    // its own tab

    [SectionName("Login")] public string? Username { get; set; }  // the "Login" tab
    [SectionName("Login")] public string? Password { get; set; }

    public bool Verbose { get; set; }                             // the "Misc." tab
}
```

`DisplaySectionType` picks how a group is drawn: `Tab`, `FieldSet`, `Minimal` or `Checkbox`. Laid out as tabs a member
with no section name has nowhere to live, so those members are gathered into a default section, titled with the class's
own label unless `DefaultSectionName` names it. Naming one gathers the loose members in any layout, so leave it unset
anywhere but tabs and they stay where they are.

A gathered section has no type of its own, so the class is where it's described:

```csharp
[Section(DisplaySectionType.Tab, DefaultSectionName = "Misc.")]
[FloatingSection("Login", Description = "Credentials for the service.")]
public class MyConfiguration : IConfiguration { /* … */ }
```

The member still names the section it belongs to; `[FloatingSection]` only describes the section it names. A name no
member uses leaves nothing behind, and a section nothing describes still renders, without a description.

`[Section(..., ShowSaveAction = true)]` puts a save button on the class's own container, for a form long enough that
the one at the end isn't where someone is looking. It belongs to `[Section]`, not to a gathered section, and an
action's parameter form has nothing to save, so it's ignored there.

A `Checkbox` section has to name one of its own serialised `bool` members with `ToggleMember`, which switches it on and
off, and no other section type may name one — either way round fails the description. A client draws that member as the
section's checkbox rather than as a field inside it:

```csharp
[Section(DisplaySectionType.Checkbox, ToggleMember = nameof(Enabled))]
public class ExperimentalSection
{
    public bool Enabled { get; set; }

    public string Value { get; set; } = string.Empty;
}
```

## How a Member Renders

Every element carries its kind, a label, a description, its size, its visibility and whatever constraints apply to it.
The kind comes from the member's own type, and four attributes override it:

| Kind | Authored as |
| --- | --- |
| `boolean`, `integer`, `float`, `string` | The property's own type |
| `password` | `[PasswordPropertyText]` or `[DataType(DataType.Password)]` |
| `text-area`, `code-editor` | `[TextArea]`, `[CodeEditor(CodeEditorLanguage.Json)]` |
| `enum` | An `enum`, with its members and aliases resolved |
| `select` | A `SelectComponent<T>` member |
| `list`, `record` | A collection or a dictionary, shaped by `[List]` / `[Record]` |
| `section-container` | A nested class |
| `reference` | A type that recursed, pointing into the definition's `Definitions` |

`[Badge("Experimental", Theme = DisplayColorTheme.Warning)]` is not a kind of its own: it puts a small labelled marker
next to a member's label, whatever that member renders as. `DisplayColorTheme` runs `Default`, `Primary`, `Secondary`,
`Important`, `Warning`, `Danger`, and the same themes colour a button.

Three more knobs sit on the member rather than on its kind. `[Visibility(Size = DisplayElementSize.Full)]` asks for a
wider field, `[Visibility(Advanced = true)]` marks a setting as an advanced one for a client to keep behind its own
advanced toggle, and `[List(HideAddAction = true, HideRemoveAction = true)]` — or the same two on `[Record]` — takes
away the buttons that would let someone add or remove entries, for a collection only your code should change.
`[CodeEditor(CodeEditorLanguage.Json, AutoFormatOnLoad = true)]` asks a client to pretty-print the value as it loads
the editor; the stored text is left as it is.

The default a form starts from is whatever a freshly constructed instance holds, so a property initialiser counts the
same as `[DefaultValue]`, which wins when both are given. A nested class carries no default of its own, since its
members carry theirs, and a password never carries one. An action's parameters take their defaults from the instance
the server built when it registered the action.

### Rows That Name Themselves

A list of classes renders as rows, and each row needs a label. The clearest way to give it one is a `TitleComponent`,
which says what the row calls itself rather than leaving it to be inferred:

```csharp
[List(ListType = DisplayListType.ComplexTab)]
public List<EndpointConfiguration> Endpoints { get; set; } = [];

public class EndpointConfiguration
{
    /// <summary>What this row calls itself.</summary>
    public TitleComponent Name { get; set; } = new();

    /// <summary>What tells two rows apart.</summary>
    [Key, Url]
    public string Url { get; set; } = string.Empty;
}
```

The list points at the component's `Title` and `SubTitle`, and a dictionary's values are labelled the same way. Failing
that the member marked `[Key]` is used, and a dictionary entry with neither is labelled by the key it's stored under.
Pick something readable: that value is what shows up in the tab, the header or the picker.

A title only labels a row. A tabbed, inline or dropdown list still needs a member marked `[Key]` to tell its rows
apart, and fails to describe without one.

`DisplayListType` decides the shape: `Flat` is one row per entry, `ComplexInline` stacks them, `ComplexTab` gives each
one a tab, `ComplexDropdown` folds them behind a picker, and `EnumCheckbox` renders a list of enum values as
checkboxes. `DisplayRecordType` is the same for a dictionary, without the inline and checkbox variants. Leave the
layout unset and the server settles it before serving, so a client switches on the answer rather than working it out
again.

### Flag Enums

A `[Flags]` enum is a list of its members, and renders exactly as a `List<TEnum>` does — add
`[List(ListType = DisplayListType.EnumCheckbox)]` for checkboxes. Its item lists only the members with a single bit
set, in declaration order, and the value is stored and sent as an array of those names: `["Read", "Write"]`, or `[]`
for none.

A member combining several bits, such as `All = Read | Write`, is server-side only: it's accepted when read and
expanded into its bits, and never written or listed. An enum with no single-bit member at all is refused, as is a list
of flags enums or a flags enum as a dictionary key.

## Showing and Hiding

`[Visibility]` states a member's resting visibility — `Visible`, `Hidden` or `ReadOnly` — and, optionally, one
condition that switches it:

```csharp
[Visibility(
    DisplayVisibility.Hidden,
    ToggleWhenMemberIsSet = nameof(Mode),
    ToggleWhenSetTo = LibraryMode.Remote,
    ToggleVisibilityTo = DisplayVisibility.Visible
)]
public string? RemoteUrl { get; set; }
```

`DisableWhenMemberIsSet` does the same for the enabled state instead of the visible one. `ToggleOperator` and
`DisableOperator` pick how the comparison is made; it's equality by default, and `null` is a legal value to compare
against:

| Operator | Takes | For |
| --- | --- | --- |
| `Equals`, `NotEquals` | `…WhenSetTo` | One value, the everyday case |
| `IsEmpty`, `IsNotEmpty` | nothing | A cleared field, which holds `""` rather than `null` |
| `In`, `NotIn` | `…WhenSetToAny` | A set, instead of one condition per value |
| `GreaterThan`, `LessThan` | a numeric `…WhenSetTo` | Numbers |
| `Contains` | `…WhenSetTo` | A substring, or an entry of a collection |

A condition names a member relative to the class it's declared in, and may descend into a nested class, which `nameof`
spells with an interpolated string. That's still a constant, so it survives a rename:

```csharp
[Visibility(
    DisableWhenMemberIsSet = $"{nameof(Nested)}.{nameof(NestedConfiguration.Mode)}",
    DisableOperator = UiConditionOperator.NotEquals,
    DisableWhenSetTo = NestedMode.Local
)]
public string LocalPath { get; set; } = string.Empty;
```

:::warning A Condition That Can't Hold Fails the Description
An operator handed the wrong sort of value, a numeric comparison against text, a path naming a member the class
doesn't have, or a path pointing through a list or dictionary, which has no index to say which entry it meant, all
fail when the class is described rather than rendering an element stuck in a state you didn't intend. For a
configuration that's at startup; for an action's parameters it's when the action is registered, which is also startup.
:::

Conditions can't reach outside the object they're declared in. Inside a list entry or a dictionary value a condition
resolves against that one entry, which is what makes "disable this row's button while this row's id is unset" work. A
definition describes a type rather than an instance, so it can't know where any given instance sits in the document —
and for the same reason nothing in it carries a path to itself. A client tracks the position of the container it
descended into and sends that path back when it invokes something.

## Buttons

A `[CustomAction]` method becomes a button. [Configuration & Secrets](/writing-plugins/configuration#buttons-on-the-settings-page)
covers what the method may take and return; where the button lands, and when it's offered, follow the same rules as a
field:

| Authored as | Renders |
| --- | --- |
| `Position = DisplayButtonPosition.Auto` | Inline, in the order it was declared, among the fields |
| `Position = Start` / `End` | Pinned to the top or the bottom of whatever holds it |
| `SectionName = "Login"` | Inside that gathered section, as a member carrying the same name would be |

`Theme` and `Size` take a `DisplayColorTheme` and a `DisplayElementSize` (`Normal`, `Small`, `Large`, `Full`), and
`Icon` names an MDI icon in PascalCase without the `mdi-` prefix. `ToggleWhenMemberIsSet` and `DisableWhenMemberIsSet`
work as they do on `[Visibility]`, with the same operators, so a button can be offered only once the settings around
it make it meaningful.

## Reacting While the User Edits

Besides a button, a class can declare lifecycle hooks with `[ConfigurationAction]`:

| Hook | Runs |
| --- | --- |
| `New` | When a fresh instance is created |
| `Load` | When the configuration is fetched for editing |
| `Save` | When it's saved |
| `Validate` | When it's validated, and before every save |
| `LiveEdit` | While someone is editing, before anything is saved |

A hook is declared on the class it belongs to, so a nested class handles its own edits. Two of them own their side of
the job entirely, which is the point of declaring one:

- **`Load`** is handed a fresh instance, not the stored document. To build on the saved one, load it yourself and
  return what you want edited.
- **`Save`** is handed what was submitted, once the schema and the `Validate` hook have accepted it, and **nothing is
  written unless it writes it**. That makes it the place to drop anything that shouldn't reach disk.

Only `LiveEdit` is raised by an event, and it can narrow itself to the events and the members it cares about:

```csharp
[ConfigurationAction(ConfigurationActionType.LiveEdit,
    Events = [ReactiveEventType.Unfocused, ReactiveEventType.Edited],
    ReactiveMembers = [nameof(FfmpegPath), $"{nameof(Nested)}.{nameof(NestedConfiguration.Mode)}"])]
public ConfigurationActionResult OnEdit(ConfigurationActionContext<MyConfiguration> context) { /* … */ }
```

A request carries one event and a handler is interested in as many as it likes, so name none and the handler takes them
all. Leave `ReactiveMembers` off and it watches everything in its own class and everything below it, whether or not a
nested class has a handler of its own — both run. Dispatch prefers the handler that named the raised event and falls back to one that named none.

Every handler the edited path passes through whose events and `ReactiveMembers` cover the edit runs, innermost first,
and each is handed what the one before it returned,
so a handler can build on it. A live edit answers with JSON Patch operations against the document that was posted
rather than a whole configuration, and a path that doesn't resolve — what a row still being composed client-side looks
like — simply doesn't react, where an explicitly invoked button on a missing thing fails.

So that a client knows when posting the document is worth it, every container says whether it reacts: `HasLiveEdit` for
the class itself, `HasNestedLiveEdit` for something below it. With both unset a client editing in that branch posts
nothing.

:::warning A Hook That Can't React Fails the Description
A member `ReactiveMembers` names but the class doesn't have, a name pointing through a list or dictionary, or either
property on a hook that no event raises, all fail when the class is described.
:::

## Options the Server Lists

`[OptionsProvider]` on a method turns the members it names into choices the server lists when asked, which is how a
dropdown offers folders on disk, users in the database or whatever a probe found. A method without the attribute is
never looked at, whatever its name or shape:

```csharp
public int LibraryId { get; set; }

public Dictionary<string, SweepMode> ModeByFolder { get; set; } = [];

[OptionsProvider(nameof(LibraryId))]
public async Task<IReadOnlyList<SelectOption<int>>> ListLibraries(ILibraryService libraries)
    => (await libraries.GetAll()).Select(x => new SelectOption<int>(x.ID, x.Name)).ToList();

[OptionsProvider(nameof(ModeByFolder), Target = OptionsTarget.Keys)]
public string[] ListFolders(IFolderService folders)
    => folders.GetNames();

[OptionsProvider(nameof(ModeByFolder))]
public SweepMode[] ListModes([OptionsKey] string folder, IFolderService folders)
    => folders.IsReadOnly(folder) ? [SweepMode.Read] : [SweepMode.Read, SweepMode.Write];
```

The method is public, static or not, and not generic. It returns an array or any `IEnumerable<T>` of the option type,
or of `SelectOption<T>` of it when each option wants a label of its own, directly or through a `Task` or `ValueTask`.
Its parameters are filled in the way a button's are: the configuration being edited, unsaved changes included, the user
and any registered service. On an executable action the provider runs on an instance prepared the way invoking it
prepares one — scoped to its entity, given its caller, populated with the parameters entered so far — and may take the
entity and the caller too.

`Target` picks the part of a member the options are for:

| Member | `OptionsTarget.Values` (the default) | `OptionsTarget.Keys` |
| --- | --- | --- |
| A scalar, `T` or `T?` | the value itself | refused |
| A list, `List<T>` or `T[]` | each entry | refused |
| A `[Flags]` enum | each entry, a single-bit member | refused |
| A `Dictionary<K, V>` | the value of one key, or each entry of a list value | each key |

A provider of a dictionary's values may take the key of the entry being asked about, through one parameter marked
`[OptionsKey]` whose type is the dictionary's key type exactly, and narrow the values to that key. The key comes from
the path, so it needn't be in the dictionary yet: a client asks for the keys, lets someone pick one, then asks for that
key's values. Each part of a member has one provider at most, so a dictionary's keys and its values may each have their
own, and a `SelectComponent<T>` carries its own options and takes none.

Every member one provider names takes the same option type, and the method lists exactly that type — there's no
bridging, so listing `long` for an `int` member is refused. An option type is one a client can tell apart and show as
text: a primitive, `string`, `decimal` or an enum; `Guid`, `DateTime`, `DateTimeOffset`, `DateOnly`, `TimeOnly`,
`TimeSpan` or `Uri`; or any type, your own included, that implements `IParsable<TSelf>` of itself or carries a
`[TypeConverter]` that converts it to and from text or one of those primitives. Any other class, record, struct or
collection is refused.

A client POSTs the edited document to the form's own route with `/Options` appended, and a `path` query parameter picks
what to list, in the same notation a button is invoked with:

```
POST /api/v3/Configuration/{configID}/Options?path=ModeByFolder
POST /api/v3/Configuration/{configID}/Options?path=ModeByFolder["Anime"]
POST /api/v3/Action/{actionID}/Options?path=…
POST /api/v3/{Group|Series|Episode|File}/{id}/Action/{actionID}/Options?path=…
```

The answer is a list of `{ "Value": …, "Label": "…" }` in the provider's own order, with nulls left out and an empty
list meaning there's nothing to choose from right now. `Label` is always set: yours when you gave one, otherwise the
value as text, and an enum member is labelled the way the form's own list of that enum names it. There's no server-side
search, so the list is the whole current one and a client filters it locally.

A provider may refuse the draft it's handed by throwing `GenericValidationException`, for instance when the credentials
it needs to list anything are wrong. The route then answers with a validation problem keyed by member path.

:::tip Store the Choice, Not the Options
When the stored value can simply be the chosen option, the attribute above is all it takes. A choice that needs more —
a selector that shouldn't be persisted, and a read-only mirror of what was chosen so it survives its option
disappearing — is worked through in full under *a choice only the server can enumerate* in the source reference below.
:::

## Reference

Most of the shapes on this page that can't work are caught while you compile, if you reference the analyzers package:
see [Catching Mistakes at Compile Time](/writing-plugins/publishing#catching-mistakes-at-compile-time).

[Form UI](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/UI/README.md) in the source has the
shape of a served `UiDefinition`, the per-member detail behind each attribute here, and the two worked patterns.
[Configuration](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Abstractions/Config/Services/README.md)
covers the rest of the configuration system around it.
