---
title: Watch State Sync | Jellyfin
description: How Shokofin keeps watched state, play counts and resume positions in sync between Jellyfin users and Shoko Server accounts.
---

# Watch State Sync

Shokofin can keep the watch state of each Jellyfin user in sync with an account on Shoko Server. Shoko can then pass that
state on to your AniDB MyList. This page explains what gets synced, when it happens, and which side wins when the two
disagree. For the setup steps, see [Sync Watch State](/jellyfin/how-to/sync-watch-state).

## Linking a Jellyfin User to a Shoko Account

Synchronization is configured per Jellyfin user in the Shokofin settings under **Users** → **User Settings**. Each Jellyfin
user is linked to one Shoko account:

- **Any Shoko account works.** The account doesn't need to be an administrator. Give each person their own Shoko
  account so their watch history stays separate.
- **Your password is not stored.** When you save, Shokofin signs in once and keeps only an API key (it shows up in Shoko
  under **Settings** → **API Keys** as "Shoko Jellyfin Plugin (Shokofin) - User Key"). To link a different account, pick the user and
  click **Remove** to delete the saved settings for that user, then link again.
- **Tag restrictions still apply.** If the Shoko account has tag restrictions, series hidden from that account can't be
  synced.

Leaving **Enable Synchronization Features** unchecked turns sync off for that user, whatever the other options say.

## What Gets Synced

Watch state is synced **per file**, for episodes and movies that Shoko recognized:

| Jellyfin | Shoko |
| --- | --- |
| Played / unplayed | Watched / unwatched |
| Play count | Watched count |
| Playback position (resume point) | Resume position |
| Last played date | Last updated date |

The following is **not** synced:

- Favourites and user ratings.
- Watch state on series or seasons as a whole. Only the underlying episode files are synced.
- Missing episodes (placeholders for episodes you don't have). There is no file to attach the state to.
- Audio and subtitle track choices.

If you have multiple versions of the same episode merged into one entry, each version is its own file and is synced on
its own.

## When Syncing Happens

Each option under **User Settings** controls one trigger. They can be combined.

| Option | What it does |
| --- | --- |
| **Sync Watch-State on Import or Refresh** | When an item is added to the library or its metadata is refreshed, the watch state is **imported from Shoko** into Jellyfin. Nothing is sent to Shoko by this option. |
| **Sync Watch-State After Playback** | When playback stops, the position and watched state are sent to Shoko. |
| **Sync Watch-State Events During Playback** | Play, pause, resume and stop events are sent to Shoko as they happen. |
| **Sync Watch-State Live During Playback** | While a video plays, the position is sent to Shoko roughly once a minute, and immediately after you seek. This only works when **Sync Watch-State Events During Playback** is also enabled. |
| **Lazy Sync Watch-State Events With Shoko** | Holds back playback reports until the video has been playing for a short while, so a mis-click or a quick preview doesn't mark anything as watched in Shoko. |
| **Sync Watch-State for Restricted Media** | Includes restricted (H) titles. Without it, those titles are skipped. |

With lazy sync enabled, nothing is sent until the video has played for about a minute, or until you skip ahead. If you stop watching before then, nothing is
sent to Shoko for that session.

Marking an item as played or unplayed by hand in Jellyfin is always sent to Shoko as long as
**Enable Synchronization Features** is on, regardless of the other options.

:::tip Recommended combination
Enable **Sync Watch-State on Import or Refresh** and **Sync Watch-State After Playback**. That keeps Jellyfin up to date with
Shoko and records everything you finish watching. Add **Events During Playback** and **Live During Playback** together if you
also want resume points in Shoko to follow along while you watch.
:::

## The Sync Tasks

Three scheduled tasks go through every episode and movie in your Shokofin libraries for every user with sync enabled. None
of them run on a schedule by default. See [Scheduled Tasks](/jellyfin/scheduled-tasks) to add a trigger.

| Task | Direction | Rule |
| --- | --- | --- |
| **Export User Data** | Jellyfin → Shoko | Sends Jellyfin's state when Shoko has none, or when Jellyfin's last played date is newer. |
| **Import User Data** | Shoko → Jellyfin | Takes Shoko's state when Jellyfin has none, or when Shoko's last updated date is newer. |
| **Sync User Data** | Both | Whichever side has the newer date wins. If only one side has any data, that side is used. |

When both sides already agree, nothing is written.

Playback reports that fail, for example because Shoko was offline, are not retried. Run **Sync User Data** afterwards to
catch up. Scheduling it daily is an easy way to make sure nothing gets lost.

:::warning Sign-in errors
If a user's Shoko API key is deleted or expires, syncing for that user fails with an "Invalid or expired API Token" error,
and the sync tasks stop. In the Shokofin settings, pick the user, click **Remove**, and link them again.
:::

## Passing Watch State On to AniDB

Shokofin only talks to Shoko. Whether Shoko forwards watch state to your AniDB MyList is set in Shoko under
**Settings** → **AniDB** → **Mylist Options**:

- **Set Watched** and **Set Unwatched** send changes from Shoko to AniDB.
- **Read Watched** and **Read Unwatched** pull changes from AniDB into Shoko, which Shokofin can then import.

Shoko Server v6 no longer includes Trakt support.

## Related

- [Sync Watch State](/jellyfin/how-to/sync-watch-state), step by step.
- [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely), which uses the export and import tasks.
- [Settings Reference → Users](/jellyfin/configuring-shokofin#users)
- [Scheduled Tasks](/jellyfin/scheduled-tasks)
- [Troubleshooting: Watch state does not reach Shoko](/jellyfin/troubleshooting#watch-state-does-not-reach-shoko)
