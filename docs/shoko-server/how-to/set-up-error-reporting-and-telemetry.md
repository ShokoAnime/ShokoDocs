---
title: Set Up Error Reporting & Telemetry
description: Choose where Shoko Server sends its error reports, turn them off, or send them and the server's traces, metrics and logs to services you run yourself.
---

# Set Up Error Reporting & Telemetry

Shoko Server can send two kinds of information out:

- **Error reports**, through [Sentry](https://sentry.io/). By default they go to the Shoko team, so we can find and fix
  problems. You can turn them off, or send them to a Sentry-compatible server of your own instead.
- **Telemetry**, the server's traces, metrics and logs, over OpenTelemetry (OTLP). It's off by default, and only ever
  goes to a collector you run yourself, for your own monitoring.

Both are set with [environment variables](/shoko-server/how-to/use-environment-variables), or in
`settings-server.json`, and both take effect after a restart.

## Error Reports

By default, Shoko Server sends half of its errors to the Shoko team's Sentry, along with the errors of the first-party
plugins. Reports hold error messages and the details needed to fix them, not your collection or what you watch; see
[Data Collection](/getting-started/running-shoko-server#data-collection). This is only about the server: the Web UI
reports its own errors separately.

`SHOKO_SENTRY_DSN` decides where reports go:

| Value | Reports go |
| --- | --- |
| Empty (the default) | To the Shoko team. |
| `off`, or anything else that isn't an address | Nowhere. |
| A DSN starting with `https://` or `http://` | To a Sentry-compatible server of your own, such as Sentry itself, GlitchTip or Bugsink. |

With a DSN of your own, two more variables apply:

- `SHOKO_SENTRY_SAMPLE_RATE`: the share of errors sent, from `0` to `1`. Half by default.
- `SHOKO_SENTRY_PLUGINS`: the plugins whose errors are sent, as a JSON array of plugin IDs. The first-party plugins by
  default; `[]` sends every plugin's errors.

```yaml
environment:
  - SHOKO_SENTRY_DSN=https://<key>@sentry.example.com/<project>
  - SHOKO_SENTRY_SAMPLE_RATE=1
```

## Telemetry

Shoko Server can send its traces, metrics and logs to an OpenTelemetry collector you run, such as Grafana Alloy or the
OpenTelemetry Collector. Nothing is sent until you give it an address, and even then each kind has its own switch.

| Variable | What it sets |
| --- | --- |
| `SHOKO_OTLP_ENDPOINT` | The collector's address, such as `http://alloy:4318`. Empty (off) by default. |
| `SHOKO_OTLP_PROTOCOL` | `HttpProtobuf` (the default, usually port 4318) or `Grpc` (usually port 4317). |
| `SHOKO_OTLP_TRACES_ENABLED` | `true` to send traces: API requests, queue tasks, AniDB requests, hashing and more. |
| `SHOKO_OTLP_METRICS_ENABLED` | `true` to send metrics, such as the queue's size and how long tasks and AniDB requests take. |
| `SHOKO_OTLP_LOGS_ENABLED` | `true` to send the server's logs, from that start on. |
| `SHOKO_OTLP_HEADERS` | Headers sent with every export, as `key=value,key=value`, for example for a collector that wants a key. |
| `SHOKO_OTLP_SERVICE_NAME` | The name everything is sent under, `shoko-server` by default. |
| `LOGGING_OTLP_LOG_LEVEL` | Which logs are sent, `Information` and up by default. |

```yaml
environment:
  - SHOKO_OTLP_ENDPOINT=http://alloy:4318
  - SHOKO_OTLP_TRACES_ENABLED=true
  - SHOKO_OTLP_METRICS_ENABLED=true
  - SHOKO_OTLP_LOGS_ENABLED=true
```

Telemetry leaves out file paths, the details of queued tasks and anything that looks like a password or key, but the
logs are sent as they are written. Treat your collector like your log files. Sampling, database spans and the full list
of what's sent are in the server's
[telemetry reference](https://github.com/ShokoAnime/ShokoServer/blob/master/Shoko.Server/Telemetry/README.md).

A value Shoko can't use turns the export off with a warning in the log; it never stops the server from starting.

## Related

- [Use Environment Variables](/shoko-server/how-to/use-environment-variables): setting these, and how they behave.
- [Data Collection](/getting-started/running-shoko-server#data-collection): what the Shoko team's error reports are for.
- [Logs](/shoko-server/logs): the server's own log files.
