---
title: Actions & Background Work
description: "Operations a user can run, work that runs on a schedule, and jobs that go through Shoko Server's queue."
---

<script setup>
import { data } from '../.vitepress/data/packages.data';
</script>

# Actions & Background Work

Shoko Server has three ways for a plugin to do something that isn't a reply to an API call. Which one you want depends
on who starts it.

| You want | Use |
| --- | --- |
| Something a user starts on a series, group, episode or file | A scoped [executable action](#executable-actions) |
| Something a user starts on nothing in particular | A global [executable action](#executable-actions) |
| Something that runs on a schedule, and that an admin can run by hand | A [scheduled action](#scheduled-actions) |
| A unit of work that should queue, retry and show up in the queue | A [queue job](#queue-jobs) |

## Executable Actions

An executable action is an operation offered against an entry: it has a scope, a caller and a permission.

A scoped action has to derive **directly** from `SeriesAction`, `GroupAction`, `EpisodeAction` or `VideoAction`; one
that acts on nothing in particular implements `IExecutableAction` itself and is registered as a global action. An
intermediate base class of your own, even one deriving from those, is rejected, as is a `Permission` getter inherited
rather than declared on the action itself — every action, scoped or global, declares its own. Neither is skipped
quietly: both stop startup.

Actions are probed at startup, resolved from the root container, so an action can't depend on anything scoped and
shouldn't hold something that needs disposing. To refer to one of your own later, ask
`IActionService.GetActionInfo<MyAction>()` rather than working out its id.

### Parameters

An action's parameters are its own public settable properties. An invocation's payload is populated straight onto the
instance, and the metadata the action declares — `Name`, `Description`, `Category`, `IsPrimaryAction`, `Permission`,
`RequiresConfirmation`, `ConfirmationMessage` and the scoped entity — is left out by name and type, so what's left is
what you added:

```csharp
public class SweepAction(MyCache cache) : SeriesAction
{
    public override string Name => "Sweep";

    public override ActionPermission Permission => ActionPermission.User;

    [Display(Name = "Force", Description = "Sweep even when nothing looks stale.")]
    public bool Force { get; set; }

    [Display(Name = "Sources")]
    public List<string> Sources { get; set; } = [];

    public override Task Execute(CancellationToken token = default) { /* … */ }
}
```

Because the payload lands on the instance, the parameters are described by exactly the same `UiDefinition` a
configuration is, and everything in [Form UI](/writing-plugins/form-ui) applies to them: sections, visibility
conditions, buttons, live-edit hooks and server-listed options alike. A client renders an invocation form from
`GET /api/v3/Action/{actionID}/UiDefinition` the way it renders a settings page, and the action's entry in
`/api/v3/Action` says whether there's one to render at all. Defaults come from the instance the server built when it registered the action, so a
property initialiser is the default a caller sees.

Anything a configuration can describe works, enums and nested objects included; [Shapes That Don't
Work](/writing-plugins/configuration#shapes-that-don-t-work) lists what doesn't. Over the API a name with no matching
property is refused, since the parameter schema is closed — only an in-process `InvokeAsync` ignores one. Both the instance `Validate` is asked on and the one that executes are populated, so
`Validate` sees what `Execute` will.

An omitted parameter keeps the value the instance was constructed with, which makes every parameter optional unless
it's marked `[Required]` or declared `required`. Such a parameter is marked required in the definition, and an
invocation without it is refused, an absent body included.

:::danger A Parameter the Server Can't Describe Stops Start-Up
A parameter shape the form can't render — a collection inside a collection, a dictionary keyed by something that isn't
text, a condition that could never hold, an options provider that doesn't fit — fails when the action is registered,
exactly as the same shape in a configuration fails. An action with no way to be invoked from a UI is treated as a
defect rather than something to recover from, so the rules in
[Shapes That Don't Work](/writing-plugins/configuration#shapes-that-don-t-work) apply here too.
:::

## Scheduled Actions

A scheduled action is work that runs on its own: a nightly clean-up, a periodic refresh. It's global and admin-only,
with no scope, no caller and no parameters. Work that takes options is an executable action instead.

```csharp
public class PurgeMyCacheAction(MyCache cache) : IScheduledAction
{
    public string Name => "Purge My Plugin's Cache";

    public string? Description => "Drops every cached response, forcing a refetch.";

    public ActionCategory Category => ActionCategory.PluginInferred;

    public IReadOnlyList<ActionTrigger> DefaultTriggers => [ActionTrigger.DailyAt(new TimeOnly(4, 30))];

    public async Task Execute(IProgress<decimal> progress, CancellationToken token)
    {
        // …
    }
}
```

There's nothing to register: every public, non-abstract class in your main assembly implementing `IScheduledAction` is
picked up and registered transient, so keep the action a thin shell over a service of yours.

- **`DefaultTriggers` is a suggestion.** Build them with `ActionTrigger.AtStartup`, `.Every`, `.DailyAt`, `.WeeklyOn`,
  `.MonthlyOn` and `.OnQueueCleared`, which fires when someone clears the queue rather than when it merely runs dry.
  The admin can replace them, and an action with none only runs by hand.
- **`MinimumInterval`** stops an admin scheduling your action more often than it can stand.
- **`RequiresConfirmation` and `ConfirmationMessage`** put a confirmation in front of a destructive one.
- **`Validate(token)`** refuses a run that can't work right now. It's asked again in the queue just before `Execute`,
  since the first answer can be hours old by then, and a refusal there skips the run.
- **Report progress and honour the token.** Progress is 0 to 100.

:::danger Two Ways to Stop the Server Starting
A type that implements both `IScheduledAction` and `IExecutableAction` fails startup, as does a `MinimumInterval` that
isn't whole minutes between a minute and 366 days, or a default trigger that breaks its own minimum. Either way the web
host still comes up and names your plugin, but the server never finishes starting until you fix it — and the pass that
registers actions stops there, so plugins behind yours don't get theirs registered either.
:::

An action's id is derived from its class's full name, so **renaming or moving the class loses the triggers an admin
set**. Ask `IScheduledActionService.GetScheduledAction<MyAction>()` for it rather than deriving it yourself. That
service also lists actions, sets and resets triggers, and runs or cancels one.

## Queue Jobs

Work that should queue, retry, deduplicate and show up in the queue UI is a queue job.

Queue jobs live in a separate package, which tracks the abstractions' version from release on:

```xml-vue
<PackageReference Include="Shoko.QueueProcessor" Version="{{ data.queueProcessor }}" ExcludeAssets="runtime;native" />
```

`runtime;native` matters: the package brings EF Core and SQLite with it, and excluding `runtime` alone leaves the
native libraries behind to clash with the server's.

Implement `IQueueJob` directly. The server's own `BaseJob` types are internal to it. Jobs are discovered from your
assembly, so there's nothing to register, and `IQueueScheduler` queues them. The exception is a generic job class,
which the scan skips: register each closed version with `services.AddQueueJobTypes([...])` and queue it through the
`Type` overloads.

Jobs are deduplicated by a key built from the job type's full name and the members you mark with `[JobKeyMember]` —
or, when you mark none, every primitive property except those you mark `[JobKeyIgnore]` — so two jobs with the same
name in different plugins don't collide. A class-level `[JobKeyMember("id")]` replaces the type
name with an id of your choosing, which then has to be unique on its own.

Two things a job gets by asking for them:

- **Cancellation**, by injecting `IJobCancellationAccessor`. Without it a running job can't be cancelled, and
  `IQueueScheduler.Cancel` says so. A job that stops with an `OperationCanceledException` after a user cancel isn't
  retried; after a shutdown it's queued again unchanged, so make sure it can stand being re-run.
- **Progress**, by injecting `IJobProgressAccessor`.

Mark a job `[DatabaseRequired]` when it needs the database, rather than checking yourself. Mark a job that runs for one provider
`[ProviderJob]`, taking the provider as its single generic type argument — a metadata, release or airing schedule
provider, since the attribute does nothing for any other type — and it waits while that provider is
[suspended](/writing-plugins/metadata-sources#when-the-service-won-t-answer) rather than failing against a service that
won't answer.

:::tip Prefer a Scheduled Action for Recurring Work
`RecurringJobRegistry` runs a job on a fixed interval that nobody can change, and Shoko's own recurring work no longer
uses it. If an admin should be able to reschedule the work, or run it by hand, write a scheduled action instead.
:::
