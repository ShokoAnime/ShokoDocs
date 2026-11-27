---
title: Use Environment Variables
description: Set Shoko Server's settings from environment variables, as in a Docker setup, how they behave, and a few useful ones.
---

# Use Environment Variables

Most of Shoko Server's settings can also be set with an environment variable. That's handy in Docker, where the
settings can live in your compose file next to the rest of the container's setup, and for settings the Web UI doesn't
show.

## Set a Variable

With Docker Compose, add the variables under `environment:` of the Shoko service, next to `PUID`, `PGID` and `TZ`:

```yaml
services:
  shoko:
    image: ghcr.io/shokoanime/server:latest
    environment:
      - PUID=1000
      - PGID=100
      - TZ=Etc/UTC
      - SHOKO_PORT=8112
      - LOGGING_FILE_LOG_LEVEL=Debug
```

With `docker run`, pass each one with `-e`, such as `-e SHOKO_PORT=8112`. Outside Docker, set them in the environment
of whatever starts Shoko Server, such as its systemd service or a script.

`PUID`, `PGID` and `TZ` belong to the Docker image rather than to Shoko Server; see
[Docker Image Variables](#docker-image-variables).

## Variables for Settings

Most variables stand in for a setting. They behave like this:

- **They're read when the server starts.** Change one, then restart Shoko Server (for Docker, recreate the container
  with `docker compose up -d`).
- **A variable wins over the settings file.** Shoko Server uses the variable's value instead of the one in
  `settings-server.json`, but never writes it into the file. Remove the variable, and the file's value is used again
  at the next start.
- **A setting set by a variable usually can't be changed elsewhere.** Saving a different value for it, in the Web UI or
  through the API, is refused while the variable is set. A few settings, such as the log levels and the images path,
  still take a change, but the variable's value comes back at the next start.
- **Values are written as text.** Use `true` or `false` for a switch, a plain number for a number, and the name of an
  option for a choice, such as `Debug`. A list is a JSON array, such as `["127.0.0.1","172.16.0.0/12"]`.

Some useful ones:

| Variable | What it sets |
| --- | --- |
| `SHOKO_PORT` | The port the server listens on, `8111` by default. |
| `SHOKO_IMAGES_PATH` | Where downloaded images are kept, for example on another drive. Inside the data folder by default. |
| `ANIDB_USER`, `ANIDB_PASS` | Your AniDB login. |
| `SHOKO_TRUSTED_PROXIES` | The reverse proxies whose forwarded headers Shoko trusts, as a JSON array. See [Networking & Reverse Proxies](/shoko-server/networking#trusting-your-proxy). |
| `SHOKO_CORS_ORIGINS` | The web pages on other hosts allowed to call the API, as a JSON array such as `["http://192.168.1.20:3000"]`. Any page may when it's empty. |
| `SHOKO_SWAGGER_ENABLED`, `SHOKO_SWAGGER_PREFIX` | Whether [Swagger](/api/use-the-api-with-swagger) is served, and at which path. |
| `SHOKO_WEBUI_ENABLED` | Set it to `false` to run without a Web UI, for example when you only use Shoko through a media server plugin. |
| `SHOKO_SETUP_TOKEN` | A token that setup mode and failure mode require as the API key. Empty (the default) leaves both modes open. See [Protect Them with a Setup Token](/shoko-server/concepts/setup-mode-and-failure-mode#protect-them-with-a-setup-token). |
| `SHOKO_PLUGIN_UPGRADE_ON_START_ENABLED` | Set it to `false` to keep plugins at the versions you installed instead of upgrading them when the server starts. |
| `LOGGING_FILE_LOG_LEVEL` | How much goes into the log files, such as `Debug` when you're tracking down a problem. |

Error reporting and telemetry have variables of their own, such as `SHOKO_SENTRY_DSN=off` to send no error reports; see
[Set Up Error Reporting & Telemetry](/shoko-server/how-to/set-up-error-reporting-and-telemetry).

## Other Server Variables

A few variables aren't settings. Shoko Server reads them when it starts, and they're never part of the settings file:

| Variable | What it does |
| --- | --- |
| `SHOKO_HOME` | Where Shoko Server keeps its data folder. In Docker it's `/home/shoko/.shoko/Shoko.CLI` unless you change it. |
| `MEDIAINFO_PATH` | The MediaInfo program Shoko runs, when it isn't the `mediainfo` command on the path. |

## Docker Image Variables

The Docker image reads these before it starts Shoko Server:

| Variable | What it does |
| --- | --- |
| `PUID`, `PGID` | The user and group the server runs as, `1000` and `100` by default. At start, the container gives them the data folder if they don't already own it. Running as root (`PUID=0`) needs a `SHOKO_HOME` of its own. |
| `TZ` | The time zone, such as `Europe/Berlin`, for log times and scheduled actions. |
| `UMASK` | The umask the server runs with, which decides the permissions of files it creates, such as `002`. |
| `NO_CHOWN` | Set it to `true` to stop the container from changing who owns the data folder at start. |
| `EXTRA_GROUPS` | More groups for the server's user, by name or number, separated by spaces or commas. Use it to give the server access to a device you pass into the container, with the group's number from the host. |
| `INSTALL_PACKAGES` | Extra Debian packages to install before the server starts, separated by spaces or commas, such as drivers a plugin needs. They're installed again whenever the container is recreated. |
| `ENABLE_RESTART` | Whether the server may be restarted from the Web UI. `true` by default. |
| `ENABLE_SHUTDOWN` | Whether the server may be shut down from the Web UI. `false` by default. |

## Related

- [Networking & Reverse Proxies](/shoko-server/networking): the port and trusted proxies.
- [Back Up and Restore Shoko Server](/shoko-server/how-to/back-up-and-restore-shoko-server): where the data folder is.
- [Set Up Error Reporting & Telemetry](/shoko-server/how-to/set-up-error-reporting-and-telemetry): error reports and
  telemetry.
