---
title: Sync Watch State | Jellyfin
description: Link each Jellyfin user to their own Shoko Server account so watched state and resume points stay in sync.
---

# Sync Watch State

By the end of this guide, each person on your Jellyfin server has their own Shoko account. What they watch in Jellyfin
is recorded in Shoko, and optionally on their AniDB MyList. Watch state already in Shoko shows up in Jellyfin.

## Before You Start

- Shokofin is installed and connected. See the [Quick Start](/jellyfin/quick-start).
- Decide who gets their own Shoko account. Anyone whose watch history should stay separate needs one.

## In Shoko Server

Repeat these steps for each person.

1. Open the Shoko Web UI and go to **Settings** → **User Management**.
2. Under **Current Users**, click the **Add User** icon.
3. Fill in **Username**, **Password** and **Confirm Password**, then click **Add**.
4. Leave **Administrator** unchecked. Sync works with regular accounts.
5. Optional: under **Tag Restrictions**, add AniDB tags this person shouldn't see, then click **Save**. Series hidden
   this way can't be synced for that account.

If you also want the watch state to reach AniDB, go to **Settings** → **AniDB** → **Mylist Options** and enable
**Set Watched** and **Set Unwatched**. To pull changes made on AniDB back into Shoko, also enable **Read Watched** and
**Read Unwatched**.

## In Shokofin

Repeat these steps for each Jellyfin user.

1. In the Jellyfin dashboard, open the Shokofin settings and go to the **Users** tab.
2. Under **User Settings**, pick the Jellyfin user from **Configure settings for**.
3. Check **Enable Synchronization Features**.
4. Choose when to sync. A good starting point:
   - **Sync Watch-State on Import or Refresh**: on.
   - **Sync Watch-State After Playback**: on.
   - **Sync Watch-State Events During Playback** and **Sync Watch-State Live During Playback**: on together, if you
     want resume points in Shoko to update while you watch. Live sync doesn't work on its own.
   - **Lazy Sync Watch-State Events With Shoko**: on, if people tend to start videos by accident.
   - **Sync Watch-State for Restricted Media**: only if this user watches restricted titles.
5. Enter the Shoko account's **Username** and **Password**.
6. Click **Save**. Shokofin signs in once and stores an API key, not the password. If the credentials are wrong, you'll
   see an error and nothing is saved for that user.

To change the linked account later, pick the user, click **Remove** to delete the saved settings for that user, and link
them again.

## In Jellyfin

1. Go to **Dashboard** → **Scheduled Tasks** and find the **Shokofin** category.
2. Run **Sync User Data** once. This merges everything already watched on either side. The newer state wins for each
   file.
3. Open **Sync User Data** and add a trigger, for example daily at night. This catches anything a playback report
   missed, such as while Shoko was offline.

:::tip Moving from Jellyfin-only watch history
If Jellyfin has the history and Shoko doesn't, run **Export User Data** instead of **Sync User Data** the first time.
It only sends data to Shoko and never changes Jellyfin.
:::

## Check That It Worked

1. As the linked Jellyfin user, play an episode to the end (or mark it as played).
2. In the Shoko Web UI, sign in as that user's Shoko account and open the series.
3. The episode shows as watched.

With lazy sync enabled, a video needs to play for about a minute before anything is reported.

## If It Didn't Work

- See [Troubleshooting: Watch state does not reach Shoko](/jellyfin/troubleshooting#watch-state-does-not-reach-shoko).
- The episode must be recognized by Shoko. Missing episodes and files Shoko doesn't know can't be synced.
- If the account's API key was deleted under **Settings** → **API Keys** in Shoko, re-link the user.
- Restricted titles are skipped unless **Sync Watch-State for Restricted Media** is on.

## Related

- [Watch State Sync](/jellyfin/concepts/watch-state-sync), how syncing works and which side wins.
- [Settings Reference → Users](/jellyfin/configuring-shokofin#users)
- [Scheduled Tasks](/jellyfin/scheduled-tasks)
- [Re-create a Library Safely](/jellyfin/how-to/re-create-a-library-safely)
