---
title: Syncing Watched States | Plex
description: Information on how to sync watched states from Plex to Shoko.
sidebar:
  order: 5
---

# Syncing Watched States

Both Shoko Metadata and Shoko Relay are capable of syncing watched states from Plex to Shoko using a variety of methods
which will be detailed below.

## Using the "Sync Plex Watch Status" Action

Before you continue, make sure that you have a populated Library in Plex which utilizes
a [Shoko Agent/Scanner](/plex/installing-agents-scanners) combo.

:::warning Multi Episode Files Compatibility
Currently the "Sync Plex Watch Status" action doesn't fully sync files which are mapped to multiple AniDB episode
entries and will only sync the first match.
:::

1. Authenticate Plex

   - Navigating to **Settings** > **Integrations** in the Shoko Server WebUI.
   - In the **Plex Options** section at the bottom click **Authenticate**.

   ![Shoko - Plex Authentication](/images/shoko-relay/Shoko-Relay-Plex-Auth.jpg)

2. - It will redirect you and have you log into your Plex account.
   - If successful, you'll see the following message.

   ![Shoko - Plex Synced](/images/shoko-relay/Shoko-Relay-Plex-Synced.jpg)

3. Select Your Plex Server and Libraries

   - Return to **Settings** > **Integrations** in the Shoko Server WebUI.
   - The Server dropdown in the Plex section should now be available.
   - Select your Plex Server and then any Libraries you would like to sync.
   - Hit Save.

4. Configure Plex Home Users

   - Navigating to **Settings** > **User Management** in the Shoko Server WebUI.
   - Enter any usernames you would like to sync into the "Plex Users" field, comma separated.
   - This is essential for those who don't use their Plex server's admin account for all their viewing.

5. Run the Action
   - Click the Actions button in the WebUI navigation bar.
   - Go to the Plex Section and click the **Sync Plex Watch Status** entry.

## Using Webhooks (Plex Pass)

If you are a Plex Pass user, you can use Webhooks to forward scrobble events to Shoko Server. It is still mandatory to
set the Plex username as detailed in the [steps above](#using-the-sync-plex-watch-status-action). This way you don't
need to run the "Sync Plex Watch Status" action manually.

:::warning Episode Type & Manually Marked Issues
Currently this only works with regular Episodes. Special, Other, ThemeSong, Trailer, Parody, and Movie Type episodes can
not be detected and won't update their status. When utilizing TMDB episode ordering; seasons > 1 that don't use absolute
numbering will not work correctly either. It should also be noted that Plex webhooks do not function with things that are
manually marked as watched in Plex's UI.

To resolve the aforementioned issues, you will need to run the "Sync Plex Watch Status" action, mark things as watched
by hand in Shoko's WebUI, or use a utility script.
:::

1. Navigate to the Plex Server Settings

   - To set up a Webhook, open your Plex WebUI and go to Settings (wrench icon).
   - Under your username in the left menu, Select **Webhooks**.

2. Add the Webhook

   - Click the button to add a Webhook and enter your Shoko Server URL:
     ```
     http://<shoko-server-ip>:8111/plex
     ```
   - Replace `<shoko-server-ip>` accordingly.

3. Save Your Changes
   - Now when playing an episode (with everything set up correctly), you should see scrobble events in your Shoko
     Server log.

## Using a Utility Script (Advanced)

Syncing via utility script is the most robust method as it works with any episode type and can be filtered with a time
range to significantly speed up the process. As a caveat, it also requires the most effort and knowledge to set up.

Configuration instructions are available on the [Shoko Relay Utility Scripts](/plex/shoko-relay-utility-scripts) page. Once
`config.py` has been properly filled out the [Watched-Sync](/plex/shoko-relay-utility-scripts/#watched-sync) script can be
run on demand.

:::tip Using a Scheduler
Using Task Scheduler on Windows, Cron on Linux, or any other automation equivalent to run the `watched-sync.py` script
on a schedule allows this method to be "Set and Forget".
:::

To illustrate, running the following simple command on a daily schedule would automatically sync all Plex watched states
to Shoko until the schedule is removed.

```sh
watched-sync.py 1d
```
