---
title: Configuring Shokofin
description: Information on how to configure Shokofin to fit your setup.
---

<script setup>
const containerColumns = [
  { name: 'Advanced', header: '⚠' },
  { name: 'Option', header: 'Option', width: '20%' },
  { name: 'Description', header: 'Description' },
  { name: 'Default', header: 'Default' },
];

const connectingData = [
  {
    Option: "Private Host URL",
    Description: "The local IP or hostname that your running Shoko Server can be accessed directly from wherever Jellyfin is running."
  },
  {
    Option: "Public Host URL (Optional)",
    Description: "A public IP or hostname that can be used to access Shoko Server when the private host URL is not accessible from your browser when accessing Jellyfin. Most commonly used when Jellyfin is accessed outside your network or other complex network setups. If you do not know what any of this means, leave this field empty."
  },
  {
    Option: "Username",
    Description: "The username to your administrator account for Shoko Server."
  },
  {
    Option: "Password",
    Description: "The password to your administrator account for Shoko Server."
  },
];

const titleSettingsData = [
  {
    Advanced: "",
    Option: "Main Title Source",
    Description: "Enable and order available sources in the priority you want used for the main title of your series.",
    Default: "Shoko"
  },
  {
    Advanced: "",
    Option: "Alternate/Original Title Source",
    Description: "Enable and order available sources in the priority you want used for the alternative title of your series.",
    Default: "None"
  },
  {
    Advanced: "",
    Option: "Add Prefix to Episodes",
    Description: "Adds the type and number to the title of non-standard episodes such as specials. (e.g. S1, O1)",
    Default: "✓"
  },
  {
    Advanced: "⚠",
    Option: "Allow Any Title in Selected Language",
    Description: "Allows for alternative titles to be utilized if an official title is not present in the given language. Only applies to AniDB title selectors when using a title override that follows language settings.",
    Default: ""
  },
];

const descriptionSettingsData = [
  {
    Advanced: "⚠",
    Option: "Cleanup AniDB Descriptions",
    Description: "Prettifies AniDB descriptions and converts them to markdown supported by Jellyfin.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Description Source",
    Description: "Enable and order available sources in the priority you want used for the descriptions of your series.",
    Default: "Shoko"
  },
];

const tagGenreSettingsData = [
  {
    Advanced: "⚠",
    Option: "Ignore Unverified Tags",
    Description: "Don't use any user-submitted tags that have not been verified by AniDB.",
    Default: "✓"
  },
  {
    Advanced: "⚠",
    Option: "Tag Sources",
    Description: "Select which types of tag categories you want to use ranging from setting to themes to technical aspects.",
    Default: "All except Ungrouped and Unsorted"
  },
  {
    Advanced: "⚠",
    Option: "Tag Inclusion Filters",
    Description: "Filter which kind of tags to include ranging from spoilers to tag relationships.",
    Default: "All except Spoilers"
  },
  {
    Advanced: "⚠",
    Option: "Minimum Weight for Tags",
    Description: "Choose the minimum weight a tag must have to be included, not including weightless tags.",
    Default: "All Allowed"
  },
  {
    Advanced: "⚠",
    Option: "Maximum Depth for Tags",
    Description: "The maximum relative depth of a tag to be included based on it's source category.",
    Default: "0"
  },
  {
    Advanced: "⚠",
    Option: "Genre Sources",
    Description: "Select which types of genre categories you want to use ranging from elements to source material to target audience.",
    Default: "General Elements, Source Material, Target Audience"
  },
  {
    Advanced: "⚠",
    Option: "Genre Inclusion Filters",
    Description: "Filter which kind of genres to include ranging from spoilers to tag relationships.",
    Default: "All except Spoilers"
  },
  {
    Advanced: "⚠",
    Option: "Minimum Weight for Genres",
    Description: "Choose the minimum weight a genre must have to be included, not including weightless tags.",
    Default: "2 Stars"
  },
  {
    Advanced: "⚠",
    Option: "Maximum Depth for Genres",
    Description: "The maximum relative depth of a genre to be included based on it's source category.",
    Default: "1"
  },
];

const imageSettingsData = [
  {
    Advanced: "",
    Option: "Add Language Code",
    Description: "Adds the language code to any image metadata provided which Jellyfin can use to prioritize images based on a library's configured language. If a library has no language set, Jellyfin will prioritize the English labeled images.",
    Default: ""
  },
  {
    Advanced: "⚠",
    Option: "Respect Preferred Image",
    Description: "Respect the preferred image flag sent from Shoko Server when selecting the correct image to use for the library. Setting this will also set the language code to the preferred language code for the library if 'Add Language Code' is enabled, thus ensuring it is always selected for the library.",
    Default: "✓"
  },
];

const contentRatingLocationSettingsData = [
  {
    Advanced: "⚠",
    Option: "Content Rating Sources",
    Description: "Enable and order available sources in the priority you want used for the media content ratings (TV-G, TV-PG, TV-MA, XXX) of your series.",
    Default: "TMDB, AniDB"
  },
  {
    Advanced: "⚠",
    Option: "Production Location Sources",
    Description: "Enable and order available sources in the priority you want used for the production locations of your series.",
    Default: "AniDB, TMDB"
  },
];

const thirdPartyIDSettingsData = [
  {
    Advanced: "",
    Option: "Add Third Party IDs",
    Description: "Enable which third party IDs to provide for other plugins to consume with supported media items.",
    Default: "AniDB"
  },
];

const shokofinSettingsData = [
  {
    Advanced: "⚠",
    Option: "Automatically Merge Multiple Versions of Videos",
    Description: "Enable to allow Shokofin to merge alternate versions of the same media into a single displayed entry.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Use Groups for Shows",
    Description: "Enable this to have Shokofin group your media the same way that can be seen in Shoko Server. This requires grouping to be setup and configured within Shoko Server itself for this setting to work.",
    Default: ""
  },
  {
    Advanced: "⚠",
    Option: "Season Ordering",
    Description: "Choose the behavior of how seasons are ordered. You can choose between letting Shoko Server decide, order by release date, or order chronologically using AniDB relations.",
    Default: "Let Shoko decide"
  },
  {
    Advanced: "",
    Option: "Specials Placement Within Seasons",
    Description: "Change this to adjust where specials are placed in their respective season or filter them out entirely.",
    Default: "Always place specials after the normal episodes"
  },
  {
    Advanced: "",
    Option: "Separate Movies From Shows",
    Description: "Enable this to filter out movies from a Jellyfin Shows library. Also separates movies from displaying alongside shows within a native Jellyfin collection and places each type under their respective headings.",
    Default: ""
  },
  {
    Advanced: "",
    Option: "Add Missing Episodes/Seasons",
    Description: "Add episode/season entries for media that is not currently present in your local collection. Display settings for each Jellyfin user will have to be adjusted to show missing episode information to make use of this feature.",
    Default: "✓"
  },
  {
    Advanced: "⚠",
    Option: "Disable Movie Library Filtering",
    Description: "By default we filter out anything that is not a movie in Jellyfin Movie libraries. Enable this if you want everything to show up as movies in your Jellyfin Movie libraries instead.",
    Default: "✓"
  },
  {
    Advanced: "⚠",
    Option: "Force Movie Special Features",
    Description: "Append all specials that belong to an AniDB movie series as special features for the movie(s). By default only some specials will be automatically recognized as special features, but by enabling this option you will force all specials to be used as special features. This setting applies to movie series across all library types, and will break movie series that contain specials in a show type library.",
    Default: ""
  },
];

const shokofinCollectionSettingsData = [
  {
    Advanced: "",
    Option: "Collections",
    Description: "Configure how native Jellyfin collections should be created if at all based on Shoko Server provided metadata.",
    Default: "Do not create collections"
  },
  {
    Advanced: "⚠",
    Option: "Require Two Entries for a Collection",
    Description: "If collection creation is enabled, only create a collection when the collection will contain at least two items.",
    Default: "✓"
  },
];

const shokofinLibrarySettingsData = [
  {
    Advanced: "",
    Option: "Import Folder Mapping",
    Description: "Only displays when an existing library is being configured. Displays the identified import folder name that the library is mapped to inside Shoko Server. A deletion button will be displayed as a way to remove the mapping configuration and allow Shokofin to remap the folder on the next library scan.",
    Default: "N/A"
  },
  {
    Advanced: "",
    Option: "Use the Virtual File System (**VFS**)",
    Description: "This feature allows you to disregard the underlying disk file structure while automagically meeting Jellyfin's requirements for file organization. It also ensures that no unrecognized files appear in your library and allows us to fully leverage Jellyfin's native features better than we otherwise could. This enables us to effortlessly support trailers, special features, and theme videos for series, seasons and movies, as well as merge partial episodes into a single entry. All this is possible because we disregard the underlying disk file structure to create our own using symbolic links.\nRefer to our [Recommendations](/jellyfin/recommendations/#virtual-file-system-vfs) page for additional information on what to expect whether you choose to use this feature or not.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Legacy Library Filtering",
    Description: "Adjust how Shokofin filters out unrecognized media from your library. Set to Strict to hide all media not yet recognized by Shoko Server. Set to Lax to allow unrecognized media to appear in the library. Set to Auto to have Shokofin filter out unrecognized media only if no other providers are enabled for the library. Only applies to libraries not using the VFS. VFS managed libraries will always act as though Strict has been set.",
    Default: "Strict"
  },
];

const shokofinVFSSettingsData = [
  {
    Advanced: "",
    Option: "Add Trailers",
    Description: "Makes trailers appear as a native feature that Jellyfin can use.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Add Credits as Theme Videos",
    Description: "Make OPs/EDs appear as a native theme video that Jellyfin can use.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Add Credits as Special Features",
    Description: "Make OPs/EDs show up as native special features within Jellyfin.",
    Default: ""
  },
  {
    Advanced: "",
    Option: "Add Release Group to Path",
    Description: "Will add full or short release group names to all automatically linked files in the VFS. 'No Group' will be used if the file is not associated with a release group in Shoko Server. \n\n**Warning:** The release group in the file name may change if the release group info is incomplete, unavailable, or otherwise updated in Shoko Server at a later date. This may cause episode/movie entries to be 'removed' and 'added' as new entries when that happens. **Use at your own risk.**",
    Default: ""
  },
  {
    Advanced: "",
    Option: "Add Resolution to Path",
    Description: "Will add the resolution of the media to all automatically linked files in the VFS if available. \n\n**Warning:** Though rare, we may fail to read the media info in Shoko Server when the files were first added (e.g. because of a corrupt file, encountering an unsupported new codec, etc.), then reading it later. This may cause episode/movie entries to be 'removed' and 'added' as new entries when that happens. **Use at your own risk.**",
    Default: ""
  },
];

const advancedShokofinVFSSettingsData = [
  {
    Advanced: "⚠",
    Option: "Resolve Links Before VFS",
    Description: "If a library contains symbolic links to media, it will follow them until a final 'real' file is found and use the path of said file for the VFS.",
    Default: ""
  },
  {
    Advanced: "⚠",
    Option: "Attach VFS to Libraries",
    Description: "Makes the VFS file structure that Shokofin automatically created show up as a library folder. This allows reusing the same media folder(s) across multiple libraries without needing other workarounds. Useful for separating movies and series into separate libraries while still using the same media folder for both.",
    Default: "✓"
  },
  {
    Advanced: "⚠",
    Option: "VFS Location",
    Description: "Change the location that Shokofin will place the VFS structure it generates on your system. Changing this will cause your library to 'remove' and 're-add' itself because of the path changes. You will need to manually move your VFS root if you plan to keep it when toggling this setting. Trick-play files will need to be backed-up beforehand and moved back the next library scan if you want to avoid regenerating them after you change this setting. \n**You have been warned.**",
    Default: "Jellyfin Data Directory"
  },
];

const shokofinSyncSettingsData = [
  {
    Option: "Enable Synchronization Features",
    Description: "Enable syncing certain data between Jellyfin and Shoko Server. The specific behavior on what gets synced and when can be configured using the remaining options in this section. Leaving this setting unchecked will disable synchronization entirely, regardless of other synchronization settings."
  },
  {
    Option: "Sync Watch-State on Import or Refresh",
    Description: "When media gets scanned into your library or when a library's metadata gets refreshed, sync watch-state between Jellyfin and Shoko Server."
  },
  {
    Option: "Sync Watch-State After Playback",
    Description: "Sync watch-state with Shoko Server when you finish watching a movie, episode, or other video."
  },
  {
    Option: "Sync Watch-State Events During Playback",
    Description: "Sync partial watch-state to Shoko Server on play/pause/stop/resume events during media playback."
  },
  {
    Option: "Sync Watch-State Live During Playback",
    Description: "Sync partial watch-state to Shoko Server at a regular interval during media playback."
  },
  {
    Option: "Lazy Sync Watch-State Events With Shoko",
    Description: "Wait about 10 seconds before syncing any of the above configured watch-state events to Shoko Server. This will prevent accidental clicks and/or previews from marking a file as watched in Shoko Server, and will also keep them more in sync with Jellyfin since it's closer to how Jellyfin handles the watch-state internally."
  },
  {
    Option: "Sync Watch-State for Restricted Videos",
    Description: "Allow syncing watch-state for adult content to Shoko Server."
  },
  {
    Option: "Username",
    Description: "The user in Shoko Server to sync the above watch-state events to."
  },
  {
    Option: "Password",
    Description: "The password for the specified Shoko Server account."
  },
];

const shokofinSignalRStatusData = [
  {
    Option: "Connection Status",
    Description: "Shows the current status of the SignalR connection. Will display if SignalR is disabled or enabled and if SignalR is currently connected or in the process of reconnecting to your running Shoko Server. SignalR can also be manually connected or disconnected using the button below this indicator."
  },
];

const shokofinSignalRSettingsData = [
  {
    Advanced: "",
    Option: "Auto Connect on Start",
    Description: "Attempt to connect to your running Shoko Server when Jellyfin starts up.",
    Default: ""
  },
  {
    Advanced: "⚠",
    Option: "Auto Reconnect Intervals",
    Description: "A comma separated list of intervals given in seconds to try to reconnect to your running Shoko Server if Shokofin ever gets disconnected. The provided list will have duplicates removed and will be performed in sorted order starting from the shortest time span when reconnecting. Once the longest interval has been reached and fails to reconnect, Shokofin will stop attempting to reconnect and leave SignalR disconnected until otherwise reconnected.",
    Default: "0, 2, 10, 30, 60, 120, 300"
  },
  {
    Advanced: "⚠",
    Option: "Event Sources",
    Description: "Choose which event sources to react to for metadata events.",
    Default: "Shoko, AniDB, TMDB"
  },
];

const shokofinEventSettingsData = [
  {
    Advanced: "",
    Option: "File Events",
    Description: "Have Shokofin listen for file events from Shoko Server when new media gets added or moved around in the file system and trigger library updates accordingly. Especially useful if your Jellyfin library is using a network share for it's media location where native file events may not be available for Jellyfin's real time monitoring to function. Can be used as a complete replacement for Jellyfin's built-in real time monitoring or used alongside it.",
    Default: "✓"
  },
  {
    Advanced: "",
    Option: "Metadata Events",
    Description: "Have Shokofin listen for metadata update events from Shoko Server when metadata gets added, updated, or removed and trigger library updates accordingly. Can be useful when media was missing episode titles or other info initially but was added or updated at a later time.",
    Default: ""
  },
];

const miscShokofinSettings = [
  {
    Advanced: "⚠",
    Option: "Show in Menu",
    Description: "Creates a shortcut to the Shokofin plugin settings in the Jellyfin dashboard's sidebar.",
    Default: ""
  },
  {
    Advanced: "⚠",
    Option: "Ignored Folder Names",
    Description: "A comma separated list of folder names to ignore during a library scan. Useful for skipping folders generated by a NAS or other pieces of software that access the file system where media resides. Only applicable to libraries not managed by the VFS as files not recognized by Shoko Server are already ignored.",
    Default: ".streams, @recently-snapshot"
  },
];
</script>

# Configuring Shokofin

With Shokofin installed, there's a couple things that need to be done before it can be used as a metadata provider for
your anime collection. The goal is to get Shokofin configured to your liking in a way so that you don't have to visit
the settings very often once set.

## Connecting to Shoko Server

Before you start using the plugin, it is important to connect it to a running instance of **Shoko Server**. Head over to
Shokofin's plugin settings and provide the private host, username, and password to get that connected.

<EasyTable :columns="containerColumns" :data="connectingData" />

After you've established a connection to a running instance of **Shoko Server**, feel free to skim through the plugin
settings detailed below and adjust Shokofin to your liking. If the defaults work just fine, go ahead and skip to
[Creating a Shoko Library.](#creating-a-shoko-library)

## Configuring the Plugin Settings

The following will detail what each setting does and common use cases where necessary. Do note that certain options when
changed will require a library recreation for existing libraries that use Shokofin as a provider and will be indicated
where appropriate. Additional information on the subject can be found in the
[Recommendations](/jellyfin/recommendations/#library-re-creation-is-your-friend) section of the docs for
Shokofin.

:::warning Attention Windows Users
If you are running **Jellyfin** on **Windows**, some additional setup is required to ensure the
[Virtual File System (VFS)](#vfs) feature can function. The VFS is an important quality of life
feature and is normally enabled by default. More info on what the VFS is and what it means for you if you choose not
to use it is detailed in our [Recommendations](/jellyfin/recommendations/#symbolic-links-on-windows)
section. Or you can jump straight
to [Microsoft's guide](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device)
to enable developer mode which will allow Shokofin to create symbolic links on Windows and allows the VFS to
function. Restarting Jellyfin is required once developer mode has been enabled.
:::

:::info Advanced Options
Shokofin provides some advanced options that are normally hidden. They can be made accessible in the plugin settings
by clicking the Shoko Server version number under the Connection Settings section 7 times to enable **Advanced Mode**.
Advanced options will be
indicated using the **⚠** symbol in the sections below.
:::

### Metadata

The following settings will allow you to customize what information Shokofin will pull in as metadata for your media
entries. Any changes to these settings will require you to replace all metadata for libraries that use the plugin as a
provider.

##### Title Settings

<EasyTable :columns="containerColumns" :data="titleSettingsData" />

##### Description Settings

<EasyTable :columns="containerColumns" :data="descriptionSettingsData" />

##### Tag & Genre Settings

<EasyTable :columns="containerColumns" :data="tagGenreSettingsData" />

##### Image Settings

<EasyTable :columns="containerColumns" :data="imageSettingsData" />

##### Miscellaneous Settings

<EasyTable :columns="containerColumns" :data="contentRatingLocationSettingsData" />

##### Third Party Integration

<EasyTable :columns="containerColumns" :data="thirdPartyIDSettingsData" />

### Library

Configure the behavior for how your media will be grouped and displayed within a library. Any changes to these settings
will require you to remove the library in Jellyfin, wait for the library to fully disappear from the Jellyfin homepage,
and create it once again following the instructions at [Creating a Shoko Library.](#creating-a-shoko-library)

##### Basic Settings

<EasyTable :columns="containerColumns" :data="shokofinSettingsData" />

##### Collection Settings

<EasyTable :columns="containerColumns" :data="shokofinCollectionSettingsData" />

##### New/Existing Library Settings

<EasyTable :columns="containerColumns" :data="shokofinLibrarySettingsData" />

### VFS

The Virtual File System (VFS) allows you to disregard the underlying disk file structure, automatically meeting
Jellyfin's system requirements for file organization through the use of symbolic links. This setup ensures that no
unrecognized files appear in your library and allows you to fully leverage Jellyfin's native features effortlessly.
While this approach is relatively new and still undergoing testing, it is stable enough for daily use. We encourage
adopting this system and reporting any issues you encounter to help improve it further. Below are some settings you can
use to tweak the VFS's behavior to your liking.

Refer to our [Recommendations](/jellyfin/recommendations/#virtual-file-system-vfs) page for additional information on
what to expect whether you choose to use this feature or not.

##### Basic Settings

<EasyTable :columns="containerColumns" :data="shokofinVFSSettingsData" />

##### VFS Location Settings

<EasyTable :columns="containerColumns" :data="advancedShokofinVFSSettingsData" />

### Users

Configure watch-state synchronization for each Jellyfin user. By default, all synchronization features are disabled and
must be configured and linked to a user in Shoko Server if desired.

##### User Settings

<EasyTable :columns="containerColumns" :data="shokofinSyncSettingsData" />

### SignalR

SignalR is a feature that allows for real-time communication with your running Shoko Server so that Shokofin has the
ability to react to certain types of events such as file events and refresh events. This means that when Shoko Server
identifies new media or updates metadata for your media, Shokofin can immediately import new or update existing media in
your library.

##### Connection Status

<EasyTable :columns="containerColumns" :data="shokofinSignalRStatusData" />

##### SignalR Settings

<EasyTable :columns="containerColumns" :data="shokofinSignalRSettingsData" />

##### New/Existing Library Settings

<EasyTable :columns="containerColumns" :data="shokofinEventSettingsData" />

### Misc

The following section is for any additional settings not covered by the other sections and does not show up unless
Advanced Mode is enabled.

##### Miscellaneous Settings

<EasyTable :columns="containerColumns" :data="miscShokofinSettings" />

## Creating a Shoko Library

Before creating a library, be sure the plugin is configured to your liking as certain options may require creating a
library from scratch when changed due to how Jellyfin works internally. More information on the subject can be found in
the [Recommendations](/jellyfin/recommendations/#library-re-creation-is-your-friend) section of the docs
for Shokofin. Creating a new library rather than enabling Shokofin on an existing library is required due to the nature
of how Jellyfin and Shokofin work together.

![Shokofin - Library Dashboard](/images/shokofin/Shokofin-Library-Dashboard.png)

Let's get started by adding a new library in Jellyfin's dashboard. All important options that will impact your
experience with Shokofin is detailed as follows:

### Content Type

![Shokofin - Library Settings - Content Type](/images/shokofin/Shokofin-Library-Content-Type.png)

The "Shows" type is best for most use cases, as Shokofin will still display anime movies in the library unless
configured to separate movies from shows. If you configured Shokofin to separate movies, you will need to create a
"Movies" library as well as a "Shows" library.

Setting the type to "Mixed Movies and Shows" *will* work, but is not recommended due to quirks within Jellyfin, and with
how Shokofin works as a plugin. Any other library type is otherwise unsupported.

### Folders

![Shokofin - Library Settings - Folders](/images/shokofin/Shokofin-Library-Folders.png)

When specifying the media library's file path, be aware that any path you give must point to a directory with the same
contents that Shoko Server sees in it's configured import folder(s).

For example, if Shoko Server knows the import folder for your collection as `C:\ShokoImport\`, and Jellyfin is given a
folder `/mnt/anime`, as long as both directories contain the same things, Shokofin will be able to identify your media.
Pointing Jellyfin to further nested folders seen within Shoko's import folder will also work, such as `/mnt/anime/shows`
and `/mnt/anime/movies` given that both `C:\ShokoImport\shows` and `C:\ShokoImport\movies` also exist.

If you intend to have multiple Shokofin managed libraries to separate movies from shows, be sure that the folders
specified for each library are different from each other due to how Jellyfin keeps track of metadata internally. You can
also work around this using multiple volume/bind mounts or with a symbolic link or by enabling the **Physically Attach VFS to Libraries** _advanced_ setting in the [VFS tab](#vfs) of the plugin settings. You can read more about this in
the [Recommendations](/jellyfin/recommendations/#reusing-folders-across-libraries) section of our docs.

### Language and Country

![Shokofin - Library Settings - Language and Country](/images/shokofin/Shokofin-Library-Lang-and-Country.png)

With Shokofin, setting the preferred download language will not do anything unless a corresponding override was set in
the plugin's [Metadata Settings.](#metadata-settings) If a relevant override is set that makes use of the library's
language preferences, this is the value that will be used for determining the overridden metadata.

Country is not used by Shokofin at this time and can be left unset.

### Embedded Info

![Shokofin - Library Settings - Embedded Info](/images/shokofin/Shokofin-Library-Embedded-Info.png)

To prevent any possible clashing with Shokofin's metadata retrieval, leave these two options disabled as it can result
in mixed metadata and other strange behavior.

### Real Time Monitoring

![Shokofin - Library Settings - Real Time Monitoring](/images/shokofin/Shokofin-Library-Real-Time-Monitoring.png)

Real time monitoring can be enabled if you desire, which will let Jellyfin listen to file system events for new and
modified files. This option will not do anything however if your file system does not support these events, and is
especially common with network mounts like NFS or SMB shares. As an alternative, Shokofin provides a feature called
SignalR in it's plugin settings which will allow Shokofin to maintain a constant connection to Shoko Server to receive
and trigger updates for new and updated files/metadata. More information on configuring this feature can be found in the
[SignalR](#signalr) section of this page.

### Metadata Downloaders

![Shokofin - Library Settings - Metadata Downloaders](/images/shokofin/Shokofin-Library-Metadata-Downloaders.png)

When using Shokofin, it is recommended to not enable any other metadata providers for all library types to prevent mixed
metadata along with a slew of other problems from occurring. This is due to other metadata providers identifying the
media incorrectly or just clashing in general with how your collection is organized.

### Automatically Refresh Metadata

![Shokofin - Library Settings - Automatically Refresh](/images/shokofin/Shokofin-Library-Automatically-Refresh.png)

Setting the library to automatically refresh can be configured if you would like. This feature may be unnecessary if you
utilize [SignalR](#signalr) to have Shokofin refresh metadata on-demand as new metadata is found.

### Metadata Savers

![Shokofin - Library Settings - Metadata Savers](/images/shokofin/Shokofin-Library-Metadata-Savers.png)

:::danger Important
**DO NOT** enable metadata saving using NFO files with libraries managed by Shoko, and if any are present among
your media library, **DELETE THEM NOW**. The reasoning behind this is that Jellyfin prioritizes metadata from NFO
files above any other metadata provider. This results in weird or broken behavior since Shokofin is unable to
override metadata that's sourced from an NFO.

Either find any files in your library that have the `.nfo` extension using your file explorer and delete them, or
run the following command in a terminal according to your operating system. Be sure to substitute the path with the
location of your library.

###### Windows (Powershell):

```powershell
Get-ChildItem -Path 'C:\path\to\library\' '*.nfo' | Remove-Item
```

###### Linux:

```sh
find /path/to/library/ -name "*.nfo" -type f -delete
```
:::

### Image Fetchers

![Shokofin - Library Settings - Image Fetchers](/images/shokofin/Shokofin-Library-Image-Fetchers.png)

Shoko should be enabled and set as the top-most image fetcher for all library types and categories. Any additional
metadata providers may be enabled, but can have mixed results where incorrect images are fetched. One that is
known to work without issue alongside Shokofin is the **Screen Grabber** fetcher.

### Saving Artwork Into Media Folders

![Shokofin - Library Settings - Saving Artwork](/images/shokofin/Shokofin-Library-Saving-Artwork.png)

When using the [VFS](#vfs) feature provided by Shokofin, it is recommended to leave this option
disabled as the artwork would end up saved into the symbolic linked file structure that Shokofin creates within the data
directories of Jellyfin. For non-VFS managed libraries, this is not an issue and can be set according to personal
preference.

### Merge Series Across Folders

![Shokofin - Library Settings - Merge Series](/images/shokofin/Shokofin-Library-Merge-Series.png)

If you are using the [VFS](#vfs) feature provided by Shokofin, this setting will not change any
behavior. For non-VFS managed libraries, it is recommended to enable this no matter what. Enabling lets Shokofin
better group your media into series that reflect your Shoko library without being limited by Jellyfin and the media's
underlying folder structure.

## Wrapping Up

Once you've confirmed the creation of your library after all that configuration, your library should be well on it's way
with pulling in metadata and getting your library ready for use. This may be a time consuming process, so feel free to
read through the [Shokofin FAQs](/faq#shokofin) or the
[Recommendations](/jellyfin/recommendations/) of Shokofin for any other
expectations and useful knowledge when it comes to the plugin.
