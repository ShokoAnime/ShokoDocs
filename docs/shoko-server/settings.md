---
title: Settings
description: An overview of the Settings available in Shoko's Web UI.
---

<script setup>
const importOptionsColumns = [
    { name: 'Option', header: 'Option' },
    { name: 'Description', header: 'Description' }
];

const importOptionsData = [
    {
      Option: 'Import on Start',
      Description: 'When enabled, Shoko will start importing files when the program is first launched.'
    },
    {
      Option: 'Rename on Import',
      Description: 'When enabled and there is a renamer configured, Shoko will rename imported files.'
    },
    {
      Option: 'Move on Import',
      Description: 'When enabled and when there is both a source and destination import folder. Shoko will move files to the destination import folder'
    },
    {
      Option: 'Move After Rename',
      Description: 'When enabled and when there is a renamer configured and there is both a source and destination import folder, Shoko will rename the file first and then move it.'
    },
    {
      Option: 'Set File as Watched if Episode is Watched',
      Description: 'When MyList functionality is enabled, an episode marked as watched on AniDB will have the file marked as watched when imported.'
    },
    {
      Option: 'Video Extensions',
      Description: 'All the formats Shoko will import within the set import folders.'
    }
];
</script>

# Settings

The Settings section allows you to customize data collection and metadata handling for your series in Shoko. It’s
organized into six main categories: General, Import, AniDB, Metadata Sites, User Management, and API Keys. These
settings enable you to control the type and amount of information Shoko collects, ensuring that it only downloads
and stores what’s necessary.

This approach helps prevent the accumulation of unwanted metadata, streamlining your
collection’s overall size. Each section offers a range of options, from simple operational tweaks to in-depth data
and user management, allowing you to tailor Shoko’s performance to your specific needs.

## General

![Shoko Server - Settings - General](/images/shoko-server/shoko-server-settings-general.jpg)

General is the catch-all section generally containing settings related to how Shoko itself looks, how you receive
information and how you want to store information.

### Version Information

Version information lists the installed version for both Shoko Server and the Web UI as well as what channel each
software is currently on. As Shoko Server and the Web UI are independent pieces of software, its possible to update one
while not updating the other, though we always recommend updating both to reduce potential problems. Users using a
daily buiild of either can click on the link next to the version number to see how many new commits there have been
since they lasted updated.

:::warning Switching Channels
While you are more than welcome to switch both Server and Web UI channels, you can only switch back to stable when a
new version of **Shoko Server** is released. Keep in mind dailies are meant for testing new features and can break
your collection so unless you absolutely need to, which you probably don't, stick to Stable.
:::

### Theme Options

The Theme Options in Shoko serve as a gateway for users to customize the software's interface according to their
personal aesthetic preferences. While Shoko is pre-installed with a default theme, users looking to diversify their
experience can visit the Web UI Themes section on our website to explore and download a range of available themes.

For those interested in creating a unique interface, the [Web UI Theme](/shoko-server/webui-themes) section provides
detailed instructions on how to create and install custom themes.

### Notifications

Notifications, or toasts as we call them are enabled and configured here. If you decide you don't want to see them
anymore, you can disable them by unchecking the **enable** checkmark in the header. You can also change the display
position if you decide you don't want them showing at the top of the screen.

### Log Options

Log Options allows you to customize how Shoko handles your older log files. You can have Shoko auto-compress
your older log files and even delete log files older than a certain timeframe. While we **always**
recommend keeping at least a week's worth of logs, its entirely up to you how long you want to keep them. Unless
told by Shoko Staff, there is no reason for you to enable **Trace Logs** as this will just exponentially increase your
log filesize.

## Import

![Shoko Server - Settings - Import](/images/shoko-server/shoko-server-settings-import.jpg)

All import settings deal with how Shoko handles importing your files. As this section is of high importance, please
refer to the table below for information on each option.

<EasyTable :columns="importOptionsColumns" :data="importOptionsData" />

## AniDB

![Shoko Server - Settings - AniDB](/images/shoko-server/shoko-server-settings-anidb.jpg)

AniDB settings contain your AniDB login credentials, what data Shoko will download from AniDB for the series and
files in your collection, and what data you want Shoko to send to AniDB.

### Login Options

These settings are what Shoko will use to connect to AniDB to download and upload data. Generally you won't be
changing your AniDB login credentials or port, but if you do, make sure to click the **Test** button after to verify
Shoko was able to log in with the new information. If you are dumping files using AVDump, make sure to input your
**AVDump Key**, which can be found in the account tab of your [AniDB Profile](https://anidb.net/user/setting). If the
key (which is labelled as "UDP API Key") is blank, simply enter one the same way you would for password creation and
click save.

### Download Options

These settings control the extra data Shoko fetches from AniDB. This additional information is used within the Web
UI and also exposed via our API and potentially used by any plugin you might be using.

:::info Relation Depth
This setting determines how deep Shoko should go to gather information on related series for a single series in your
collection. When importing a dozen or so new series, we recommend changing the value for this setting to **1** to avoid
temporary bans from AniDB.
:::

### MyList Options

These settings pertain to the AniDB Mylist feature and how you want Shoko to interact with it. Apart from marking an
episode as watched, the other additional options are executed based on a predefined schedule, which is determined in
the update options section.

### Update Options

These settings control the frequency of data exchange between Shoko and AniDB. We typically recommend not altering
the default values unless you experience temporary AniDB bans during these operations or desire more frequent
updates for your AniDB MyList.

## Collection

![Shoko Server - Settings - Collection](/images/shoko-server/shoko-server-settings-collection.jpg)

Collection settings affect how series and grouped within your collection and how series and episode names are displayed
for yoru collection. Please note, these settings can affect more than just the Web UI as multiple plugins do provide
the ability to use Shoko's grouping method and/or language settings. Please refer to their documentation for more
information on how they incorporate that.

### Relation Settings

These settings, once enabled, dictate how Shoko should categorize series within your collection. The grouping of
series is primarily influenced by two key factors: the related anime information provided by AniDB and your exclusion
list. Shoko relies on AniDB's classification to determine how series are grouped, aligning with how they are listed
on AniDB. Additionally, you can exclude certain related items from the grouping decision by selecting the corresponding
checkbox for that type. It's important to note that this setting is applied universally and cannot be customized
on a per-case basis.

### Language Settings

These settings define the language or languages that Shoko will use for displaying both Series Titles and Episode
Titles. This information is sourced from AniDB, and since it's possible for a series title or episode title to be
absent in a specific language, we recommend adding at least one fallback language. Synonyms are typically shorter
titles assigned to series by fans and occasionally provided on AniDB. If this setting is enabled, synonyms will also
be considered when naming a series if Shoko cannot find a match using your preferred series title languages.

:::info Applying Changes
Once you've made changes to either section, you'll need to run either the **Recreate All Groups** or the **Rename
All Groups** action depending on which changes you made.
:::

## Metadata Sites

![Shoko Server - Settings - Metadata Sites](/images/shoko-server/shoko-server-settings-metadata.jpg)

Shoko uses various metadata sites to pull additional information for the series in your collection and for tracking
watched states with certain sites and plugins.

### TMDB Options

TMDB serves as one of our primary metadata providers, offering both data and images for the series in your collection.
While it's not mandatory, we strongly recommend enabling the Auto Link setting to ensure that your collection benefits
from episode data. You can also specify the language in which you want TMDB data to be downloaded. However, if the
data is not available in your selected language, it will be downloaded in English. Additionally, extra images like
posters, backdrops, and banners will be fetched for the series in your collection. If you choose to enable this feature,
you can also specify how many images of each type you'd like to download for each series.

### Trakt Options

If you use Trakt, you can enable it and integrate it with Shoko to have your watch states uploaded to Trakt. However,
this is a one-way process and we do not pull watch states from Trakt into Shoko.

### Plex Options

You can link Shoko to Plex to track watch states including episode progression for display within Shoko. Once linked,
select your Plex server and then from the populated list, select the plex library. Users who are **not Plex Pass**
members will need to manually sync their watch states via the **Sync Plex Watch Status** action or use a
[Utility Script](/plex/syncing-watched-states#using-a-utility-script-advanced).

## User Management

![Shoko Server - Settings - User Management](/images/shoko-server/shoko-server-settings-users.jpg)

This section allows you to manage your Shoko users. While Shoko does not provide a full-fledged user management system,
it does offer basic functionality for multiple Shoko accounts. This can be useful with certain third-party plugins
and metadata sites to track separate watch states.

By default, the first user is selected, but clicking on the edit icon for a different user will load their
information. You can enable specific features for users, such as admin mode and Trakt integration. However, we do
not recommend enabling the AniDB user option for a second user because we currently do not support multiple AniDB accounts.

You can also set an avatar to be used within the Web UI and change your account password if desired. Lastly, you
can restrict access to certain series based on tags associated with those series by adding them to the
restricted list for the user.

:::warning Restricting Tags
Any tag added here takes precedence over any other settings related to series viewing no matter what is set.
:::

## API Keys

![Shoko Server - Settings - API Keys](/images/shoko-server/shoko-server-settings-api.jpg)

Every issued API key is displayed here for your review. In most cases, unless you intend to generate a new key for a
plugin or service you're developing, you likely won't need to make changes in this section. If you do need to generate
a new API Key, simply click the button and then copy the key. Keep in mind that once you leave this section, you won't
be able to see the generated key again, so be sure to copy it first.

Additionally, please refrain from removing keys that you did not generate yourself, as they are often automatically
generated by a plugin you are using. Removing such keys can potentially break the associated plugin's functionality.
