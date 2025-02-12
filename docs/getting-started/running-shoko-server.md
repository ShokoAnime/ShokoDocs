---
title: Running Shoko Server
description: Information on how to setup Shoko Server after it has been installed.
editLink: true
---

# Running Shoko Server

With Shoko Server installed, the next step is to configure it. First, you'll need to ensure that Shoko Server is
running.

Windows users, check your system tray for the Shoko icon. If it's not visible, simply launch Shoko Server. Docker
users will need to execute a command to start the container. While the exact command may vary depending on your ]
setup, it should resemble something like this:

```sh [Example Command]
docker run -d --name shokoserver --restart always -p 8111:8111 -v "$HOME/.shoko:/home/shoko/.shoko" -v "/path/to/anime:/mnt/anime" -v "/path/to/import:/mnt/import" -e PUID=$UID -e PGID=$GID ghcr.io/shokoanime/server:latest
```

With Shoko Server running, open your browser and navigate to http://localhost:8111/ to access the Web UI. If Shoko
Server is running on a different computer, replace localhost with the IP address of the computer hosting Shoko Server.

:::warning Accessing Shoko Over The Internet
While it is possible to access Shoko over the internet, we strongly advise against it. Shoko Server was not originally
designed with this feature in mind and could expose you to potential security risks. Although we are working on
making this feature safer, we recommend avoiding it for now. If you need to access Shoko outside of your local
network, consider using a VPN or setting up a reverse proxy with a service like
[NGINX](https://www.nginx.com/).
:::

If you successfully connected to your running instance of Shoko Server and the Web UI was installed correctly, you
should see the following screen. If you encounter an error, please retrace your steps and ensure everything was setup
properly. If you still can't get it to work, feel free to ask for help on our Discord server.

![Shoko Server - First Run - Welcome](/images/shoko-server/shoko-server-first-run-welcome.jpg)

On the first run, a default background image is displayed on the login screen. However, once you start building your
collection, the background image will be pulled from images associated with the series in your collection.

## Local Account

![Shoko Server - First Run - Local Account](/images/shoko-server/shoko-server-first-run-local-account.jpg)

You'll need to create an account to use Shoko. This account allows Shoko to manage links to all supported metadata
sites, enabling synchronization of watch states and collection status.

There are no specific password requirements for your local account. However, we strongly recommend saving your login
information, as we currently do not offer an easy way to reset your password. If you do forget it, refer to
the [Frequently Asked Questions](/faq) page for instructions on how to reset it.

## AniDB Account

![Shoko Server - First Run - AniDB Account](/images/shoko-server/shoko-server-first-run-anidb-account.jpg)

Shoko uses AniDB to compare your file hashes with its extensive database, allowing for quick identification and
addition of series to your collection. To set this up, enter your AniDB username and password, then click the
**Next** button to have Shoko perform a login test.

If the login test fails, double-check your credentials, wait a minute, and try again. Attempting to log in too many
times in quick succession can result in a temporary ban from AniDB.

:::warning AniDB Password Issues
AniDB's API has a known issue with passwords containing non-alphanumeric characters. This is an issue on their end
with no estimated time for a fix. To avoid getting your account temporarily banned, please update your password
to exclude these characters before attempting to login.
:::

### What is AniDB?

AniDB is a **free** and comprehensive anime database and file tracker, heavily utilized by Shoko to provide metadata
for the series and files in your collection. Currently, **AniDB is required** to use Shoko, so you'll need to create
an account if you don't already have one. If you're unfamiliar with how AniDB operates, review their
[AniDB Policies](https://anidb.net/policy) page for more information on what they do with the data sent to them.

## Metadata Sites

![Shoko Server - First Run - Start Server](/images/shoko-server/shoko-server-first-run-metadata-sites.jpg)

Shoko uses multiple metadata sites to gather information and images for the series in your collection. While these
options are mostly self-explanatory, we recommend taking a few minutes to review and configure them according to
your preferences.

:::tip Relation Depth
This setting determines how deep Shoko should go for related series when gathering information for a single
series in your collection. If you're importing a **large collection**, we recommend setting this value to **1**
to avoid temporary bans from AniDB.
:::

## Start Shoko Server

![Shoko Server - First Run - Start Server](/images/shoko-server/shoko-server-first-run-starting-server.jpg)

With the initial configuration complete, it's time to start Shoko Server. Click the **Start Server** button to begin
the process, which should only take a few minutes.

If you encounter an error during this process, try starting the server again. If the error persists, we recommend
joining our Discord server for assistance in resolving the issue.

## Import Folders

![Shoko Server - First Run - Start Server](/images/shoko-server/shoko-server-first-run-import-folders.jpg)

Import folders are the physical locations where your files are stored, and they are critical for Shoko's functionality.
These locations must be consistently accessible and remain online to prevent Shoko from mistakenly removing files from
your collection. While you can use removable or cloud-based media, Shoko is not optimized for these storage types.
Operations like automatic imports or file checks might inadvertently remove items from your collection due to the
nature of these storage solutions.

When setting up an import folder, you have two options. The first option, **Watch For New Files**, instructs Shoko to
monitor the folder for any new files or changes, automatically importing any newly detected files. The second option
involves using **Drop Folders** to move files from a **Drop Source** to a **Drop Destination**, helping with file
management and organization.

:::tip Best of Both Worlds
You can use both Import Folder Types simultaneously, enabling Shoko to monitor your drop source and automatically
move files upon detecting any changes.
:::

:::tip Custom Icon Example
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero ultrices tincidunt. Nullam nec
:::

To create a new import folder, select **Add Import Folder**. Enter your preferred name for the folder and specify its
location by choosing from the available options or entering it manually. Next, select the **Import Folder Type** that
best suits your needs for this folder. Once done, click the **Save** button to finalize its addition. If you need to add
more folders, make sure to do so before moving on to the next steps.

:::info IP Addresses Allowed
You can use an IP Address in place of a hostname when setting up an import folder.
:::

## Data Collection

![Shoko Server - First Run - Start Server](/images/shoko-server/shoko-server-first-run-data-collection.jpg)

We prioritize improving our software while respecting your privacy. To achieve this, we use [Sentry](https://sentry.io/),
a third-party service that helps us track errors and monitor performance. This approach allows us to enhance
Shoko's functionality based on real-world usage.

We understand concerns around data privacy and want to be transparent about what we collect. The information we
gather is strictly related to Shoko's performance, such as error messages and usage metrics. This data helps us
quickly address issues and enhance the software's stability and user experience. Our focus is solely on improving
Shoko, not on collecting personal details.

Rest assured, we don't collect any personal information that could identify you. We're not interested in the titles
in your collection or what you watch. Our focus is solely on enhancing Shoko's performance, using non-personal,
aggregate data to guide our improvements. Your privacy is important to us, and we stick to collecting only what we
need to make Shoko work better for you.

:::info Additional Information on Data Collection
If you have any questions or need further clarification regarding our data collection practices, please feel free
to reach out to us on our Discord server. We're committed to transparency and are here to address any concerns
or queries you might have.
:::

## Installation & Setup Complete

![Shoko Server - Dashboard](/images/shoko-server/shoko-server-dashboard.jpg)

If you've made it this far, congratulations, Shoko Server is now successfully set up!

This guide covers the basic requirements for setting up Shoko Server. If you want to customize your experience
further, explore the [Settings](/shoko-server/settings) section under Shoko Server. These settings allow you to
personalize Shoko to suit your preferences and make the most of your collection.

While this guide covers the essentials, there's much more to Shoko Server. Feel free to explore the additional
features at your own pace. They’re designed to enhance your experience and provide greater flexibility with your
media collection.
