---
title: Troubleshooting | Jellyfin
description: Symptoms, causes and fixes for the most common problems when using Shokofin with Jellyfin.
---

# Troubleshooting

Find the symptom that matches what you see, check the listed causes in order, and apply the fix. Most problems come
down to one of three things: Jellyfin can't see the same files as Shoko Server, the library was set up differently
than Shokofin expects, or a setting was changed without refreshing or re-creating the library.

## Before You Ask for Help

If none of the sections below solve your problem, ask in the `#support` channel on our
[Discord server](https://discord.gg/vpeHDsg). Having the following ready saves a lot of back and forth:

- **Versions** of Shokofin, Jellyfin and Shoko Server. The Shokofin version is shown in Jellyfin under
  **Dashboard** → **Plugins**, and the Shoko Server version on the **Connection** tab of the Shokofin settings.
- **How you run things**: Docker, bare metal, Windows, NAS, and whether Jellyfin and Shoko run on the same machine.
- **The Library Operation Mode** of the affected library (Virtual File System (VFS), Legacy Filtering (Strict) or
  Legacy Filtering (Lax)). You'll find it under **Library** → **Library Settings** in the Shokofin settings.
- **The media folder paths** as Jellyfin sees them and the managed folder paths as Shoko sees them.
- **Logs** from around the time the problem happened. Open Jellyfin's **Dashboard** → **Logs**, open the newest log file,
  and search for lines containing `Shokofin`. If you need more detail than the default log level shows, raise the level
  through Jellyfin's own logging settings, reproduce the problem, and grab the log again.

:::warning
Logs can contain file paths and server addresses. Look them over before posting them publicly.
:::

## The New Library Is Empty

**Symptom:** You created a library, the first scan finished, and nothing shows up.

**Likely causes**

1. **Nobody ran Scan All Libraries.** This is the most common cause. A new VFS library needs a full library scan
   before anything shows up: Shokofin swaps the library's media folders for its own VFS folder when that scan finishes,
   then starts a second full scan on its own that fills the library. On Jellyfin 10.11 and later, creating or editing a
   library doesn't start that first scan, and refreshing just the one library doesn't count. Run **Dashboard** →
   **Libraries** → **Scan All Libraries** and wait for both scans to finish.
2. **Shoko isn't enabled as a metadata downloader.** Shokofin only manages libraries where **Shoko** is ticked as a
   metadata downloader for series, seasons, episodes or movies. Check the library settings in Jellyfin.
3. **The media folder isn't mapped to a Shoko managed folder.** See
   [A media folder shows Not Mapped](#a-media-folder-shows-not-mapped).
4. **The library type is wrong.** Only **Shows**, **Movies** and **Mixed Movies and Shows** libraries are supported, and
   mixed libraries are discouraged because Jellyfin's support for them is lacking.
5. **Your files aren't recognized by Shoko yet.** Files only appear once Shoko has identified them. Check
   **Utilities** → **Unrecognized Files** in the Shoko Web UI.

**Fix:** Correct whichever cause applies, then run **Scan Media Library** on the library. If you changed the library
type or metadata downloaders, [re-create the library](/jellyfin/how-to/re-create-a-library-safely).

## A Media Folder Shows Not Mapped

**Symptom:** Under **Library** → **Library Settings**, a media folder is listed as not mapped, and its content is
missing from the library.

Shokofin maps a media folder by sampling some of the video files inside it and asking Shoko which managed folder they
belong to. Only the part of the path *below* the media folder has to match what Shoko sees; the start of the path can
differ. Look for this line in the log:

```text
Failed to find a match for media folder at {Path} after {Amount} attempts in {TimeSpan}. (Library={LibraryId})
```

**Likely causes**

1. **The folder contents don't match.** The files and sub-folders inside the Jellyfin media folder must be the same
   files, in the same relative locations, as inside the Shoko managed folder (or a sub-folder of it). A different mount
   root is fine, for example `/data/anime` in Jellyfin and `D:\Anime` in Shoko.
2. **One media folder covers several managed folders.** A Jellyfin media folder maps to a single managed folder, at
   its root or below it. Point Jellyfin at a parent folder holding two Shoko managed folders and it maps to neither,
   because each sampled path then carries a folder name that Shoko's own path for the file doesn't have. Add each
   managed folder as its own media folder instead.
3. **None of the sampled files are recognized by Shoko.** A folder with only unrecognized files can't be matched.
4. **The folder has a `.shoko-ignore` file** or was marked as ignored, so it's never mapped on purpose.

**Fix:** Correct the paths, then click the refresh-mapping icon (magnifying glass) next to the media folder under
**Library** → **Library Settings** and save. The mapping is re-checked on the next library scan. See
[Media Folder Mapping](/jellyfin/concepts/media-folder-mapping) for worked examples.

## Library Scans Fail on Windows

**Symptom:** Scans of a VFS library fail and the log contains:

```text
Windows users are required to enable Developer Mode then restart Jellyfin to be able to create symbolic links, a feature required to use the VFS.
```

**Cause:** The VFS is built from symbolic links, and Windows only lets regular programs create them when Developer Mode
is enabled. Shokofin tests this at startup, but it only changes the default library operation mode to
**Legacy Filtering (Strict)** when the plugin has no configuration yet, so a library that already uses the VFS keeps
failing instead.

**Fix:**

1. Enable Developer Mode by following
   [Microsoft's guide](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device).
2. Restart Jellyfin.
3. Scan the library again.

:::tip Not on Windows?
A similar failure happens on any system where Jellyfin's data directory sits on a filesystem that can't hold symbolic
links, such as exFAT or some network shares. Look for `Failed to generate links for {Path} (File={FileId},Series={SeriesId})`
or `Failed to generate {FileCount} links across {SeriesCount} series for {Path}` in the log. Move the VFS to a local
filesystem with **VFS** → **Generation Settings** → **VFS Location** <Badge type="danger" text="Advanced" />. See
[The Virtual File System](/jellyfin/concepts/virtual-file-system).
:::

## SignalR Is Disabled After a Restart

**Symptom:** After restarting Jellyfin (or the whole machine), the **SignalR** tab shows the connection as disabled
or disconnected, even though **Auto Connect on Start** is enabled.

**Cause:** Auto Connect on Start makes a single attempt when Jellyfin starts. If Shoko Server isn't reachable yet, which is
common when both run in Docker and Jellyfin starts first, the attempt fails and isn't retried. The reconnect intervals
only apply to a connection that was established and then dropped. This is deliberate: rather than retrying on its own
and possibly hammering a Shoko Server that's down, Shokofin gives up after the first failed attempt. The log shows:

```text
Unable to connect to Shoko Server due to a connection error. Please reconnect manually.
```

**Fix:** Click **Connect** on the **SignalR** tab. To avoid it in the future, make sure Shoko starts before Jellyfin,
for example with `depends_on` in Docker Compose. See [Docker & Reverse Proxies](/jellyfin/how-to/docker-and-reverse-proxies).

If the status shows the connection as unavailable instead, the plugin isn't connected to Shoko at all. Reconnect on the
**Connection** tab first.

## Watch State Does Not Reach Shoko

**Symptom:** You watch something in Jellyfin, but Shoko (and anything Shoko syncs to, such as your AniDB MyList) never
marks it as watched.

**Likely causes**

1. **Synchronization isn't enabled for that Jellyfin user.** Each Jellyfin user is configured separately under the
   **Users** tab. Check that **Enable Synchronization Features** and at least **Sync Watch-State After Playback** are on.
2. **Lazy sync skipped a short playback.** With **Lazy Sync Watch-State Events With Shoko** enabled, the first events
   of a playback aren't sent. If you stop again shortly after starting, nothing is sent at all.
3. **The item is restricted.** Restricted (H) titles are only synced when **Sync Watch-State for Restricted Media** is on.
4. **The user link has expired.** If the log shows `Invalid or expired API Token`, see
   [below](#the-plugin-reports-an-invalid-or-expired-api-token).
5. **Shoko was unreachable at the time.** Failed updates aren't retried later. The log shows
   `Failed to sync watch state with Shoko. (File={FileId})`.
6. **The item has no Shoko file behind it.** Missing episodes and items outside Shokofin-managed libraries can't be
   synced.

**Fix:** Correct the settings, then run the **Sync User Data** task under **Dashboard** → **Scheduled Tasks** to catch
up on anything that was missed. See [Sync Watch State](/jellyfin/how-to/sync-watch-state).

## Images Are Missing After Updating Shoko Server

**Symptom:** After updating Shoko Server, posters and backdrops in Jellyfin are blank or refreshing images finds nothing.

**Cause:** Your Shokofin version doesn't match your Shoko Server version, most often a stable Shokofin release running
against a Shoko Server development build. That combination is never supported and breaks in different ways over time,
missing images being a common one.

**Fix:**

1. Install the Shokofin version that matches your Shoko Server. See the compatibility table on
   [Installing Shokofin](/jellyfin/installing-shokofin). Stable Shokofin only works with stable Shoko Server. Until Shoko Server `6.0.0` is released, Shokofin development builds
   work with both the latest stable Shoko Server and its development builds.
2. Refresh the affected libraries in Jellyfin with **Replace existing images** enabled.

Jellyfin clients never contact Shoko directly for images; they're passed through Jellyfin. So you don't need to expose
Shoko to your clients to fix missing images.

## Changes Made During a Scan Did Not Show Up

**Symptom:** A file was added in Shoko, or metadata was updated, while Jellyfin was scanning a library, and the change
never appeared.

**Cause:** Shokofin ignores file and metadata events from Shoko while a Jellyfin library scan is running, because the
scan is expected to pick changes up. If the change happened after the scan had already passed that item, it's missed.

**Fix:** Run **Scan Media Library** again on the library, or refresh the affected show. To keep airing shows fresh,
give the **Auto-Refresh Metadata** task a daily trigger. See [Real-Time Updates](/jellyfin/concepts/real-time-updates).

## A Series Is Missing from the Library

**Symptom:** Shoko shows a series with files, but it's not in the Jellyfin library.

**Likely causes**

1. **Its files are in an unmapped media folder.** See [A media folder shows Not Mapped](#a-media-folder-shows-not-mapped).
2. **It uses the TMDB Shows & Movies Structure without TMDB links.** That structure can only show series linked to
   TMDB in Shoko. Either link the series in Shoko or switch that series to another structure under
   **Series** → **Library Structure Mode**. See [Library Structures & Seasons](/jellyfin/concepts/library-structures-and-seasons).
3. **It's a movie in a Shows library** with **Separate Movies from Shows** enabled (or a show in a Movies library).
   Add a library of the other type. See [Separate Shows and Movies](/jellyfin/how-to/separate-shows-and-movies).
4. **All of its episodes are hidden in Shoko.** Hidden episodes and files linked only to hidden episodes aren't shown.
   If only the main movie is hidden, a movie series is treated as a show instead and may be in your other library. See
   [Hidden Episodes](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes).
5. **The connected Shoko account has restricted tags.** See
   [Series are hidden by restricted tags](#series-are-hidden-by-restricted-tags).
6. **The file is an extra in a legacy library.** Libraries using Legacy Filtering never show files Shoko classifies as
   extras (credits, trailers, and similar). The log shows `File was assigned an extra type, ignoring file.` Use the VFS
   to get them as Jellyfin extras.
7. **The files are only in a legacy library folder Shokofin doesn't know.** With Legacy Filtering (Strict), unknown
   folders are hidden and the log shows `Ignored unknown folder at path {Path}`.

## Metadata Is Wrong or Mixed

**Symptom:** A show has the wrong description, episodes from another show, or titles and images that change between
refreshes.

**Likely causes**

1. **Other metadata downloaders or image fetchers are enabled** for the library. Jellyfin combines results from all of
   them. Untick everything except **Shoko** in the library settings.
2. **NFO files exist next to your media** in a legacy library. Jellyfin prefers NFO files over any metadata provider.
   Delete them (the VFS removes them automatically).
3. **Shoko itself has it wrong.** Check the series in the Shoko Web UI. Wrong TMDB links or groups must be fixed there.
   See [Metadata Links](/shoko-server/metadata-links).
4. **Settings were changed after the library was created.** See
   [Settings changes are not showing up](#settings-changes-are-not-showing-up).

**Fix:** After correcting the cause, refresh the library with **Replace all metadata** selected. If the structure of
the library is wrong (wrong shows or seasons), [re-create the library](/jellyfin/how-to/re-create-a-library-safely).

## Settings Changes Are Not Showing Up

**Symptom:** You changed a Shokofin setting and saved it, but the library looks the same.

**Cause:** Jellyfin keeps the metadata it already has. Metadata settings (titles, descriptions, tags, images, ratings)
need a metadata refresh, while settings that change how shows, seasons and movies are built need the library to be
re-created.

**Fix:** Check the [Change Impact](/jellyfin/configuring-shokofin#change-impact) table, then either refresh the library
with **Replace all metadata** selected or [re-create the library](/jellyfin/how-to/re-create-a-library-safely).

## The Plugin Reports an Invalid or Expired API Token

**Symptom:** Nothing updates, and the log contains:

```text
Invalid or expired API Token. Please reconnect the plugin to Shoko Server by resetting the connection or deleting and re-adding the user in the plugin settings.
```

**Cause:** The API key Shokofin was given is no longer valid, usually because it was deleted in the Shoko Web UI under
**Settings** → **API Keys** (the keys are named `Shoko Jellyfin Plugin (Shokofin)` and
`Shoko Jellyfin Plugin (Shokofin) - User Key`), or because the Shoko database was reset.

**Fix:**

- For the main connection, click **Disconnect** on the **Connection** tab and connect again with your Shoko credentials.
- For a watch-state user, open the **Users** tab, select the user, remove the saved settings for the user, and link it
  again.

## Logging In to Shoko Keeps Failing

**Symptom:** Connecting on the **Connection** tab or linking a user fails, even with the right password.

**Likely causes**

1. **The Shoko account is temporarily locked.** Shoko Server v6 locks an account for a while after several failed
   login attempts, and the lock gets longer if failures continue. Wait, then try again with the correct password.
2. **The URL is wrong.** Always include the scheme and port, for example `http://192.168.1.10:8111`. In Docker,
   `localhost` points at the Jellyfin container itself, not Shoko.
3. **The main connection doesn't use an administrator account.** The **Connection** tab needs a Shoko account with
   **Administrator** enabled. Watch-state users can be regular accounts.

## Series Are Hidden by Restricted Tags

**Symptom:** Some series never appear in Jellyfin, even though everything else about them looks right.

**Cause:** In the Shoko Web UI under **Settings** → **User Management**, each user can have **Tag Restrictions**. Any
series with a restricted tag is hidden from everything that uses that account, including Shokofin.

**Fix:** Remove the tags from **Selected Tags** for the account the **Connection** tab uses (and save), or connect with
a different administrator account. Then scan the library again.
