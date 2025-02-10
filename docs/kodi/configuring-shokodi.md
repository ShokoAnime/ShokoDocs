---
title: Configuring Shokodi
description: Information on how to configure Shokodi, a Kodi plugin.
---

# Configuring Shokodi

Now that Shokodi is installed, you'll be spending the next five minutes configuring it to your preferences. The goal
is to make it that once you've completed this setup, you won't need to make any more changes for the foreseeable future,
unless you choose to do so.

## Opening Shokodi Settings

While viewing the list of your installed video add-ons, right-click on Shokodi and choose the **Settings** option.
If you accidentally clicked on Shokodi itself, you'll receive an error notification indicating either the inability
to locate the Shoko Server or login issues.

### Shoko Settings

![Shokodi - Shoko Settings](/images/shokodi/shokodi-shoko-settings.jpg)

The Shoko Settings section should be considered the **First Run** steps. You'll need to run both the
**Connection Wizard** and the **Login Wizard** to allow Shoko and Shokodi to connect. Refer to the table below
for the required information

<EasyTable
:columns="[
{ name: 'Option', header: 'Option' },
{ name: 'Description', header: 'Description' }
]"
:data="[
{
Option: 'IP Address',
Description: 'The IP address for the computer Shoko Server is on.'
},
{
Option: 'Port',
Description: 'The port Shoko Server is using.'
},
{
Option: 'Username',
Description: 'Your Shoko username.'
},
{
Option: 'Password',
Description: 'Your Shoko password.'
}
]"
/>

### Main Menu Settings

![Shokodi - Main Menu Settings](/images/shokodi/shokodi-main-menu.jpg)

The Main Menu section will display the listed options on Shokodi's main menu if toggled, along with your filters.

<EasyTable
:columns="[
{ name: 'Option', header: 'Option' },
{ name: 'Description', header: 'Description' }
]"
:data="[
{
Option: 'Show Search',
Description: 'Will show the search option on the menu.'
},
{
Option: 'Show Unsorted',
Description: 'Will show the unsorted files option on the menu that lists all unrecognized files.'
}
]"
/>

### Browsing Settings

![Shokodi - Browsing Settings](/images/shokodi/shokodi-browsing.jpg)

The Browsing section contains various display-related and context menu settings for how your collection will be
presented within Shokodi. Please note that not all available settings are covered below; only the ones with the
most significant impact are discussed. The remaining settings should be self-explanatory.

<EasyTable
:columns="[
{ name: 'Option', header: 'Option' },
{ name: 'Description', header: 'Description' }
]"
:data="[
{
Option: 'Use Server Title',
Description: 'When toggled, will use the settings as defined in Shoko Server.'
},
{
Option: 'Language',
Description: 'The language to show titles in, only available when Use Server Title is not toggled.'
},
{
Option: 'Title Type',
Description: 'Determines the source for the title shown, only available when Use Server Title is not toggled.'
},
{
Option: 'Fix Desynced Watched Status in Kodi Database',
Description: 'When ran, will update the Kodi database with watched state info from Shoko.'
},
{
Option: 'Fix Desynced Images in Kodi Database',
Description: 'When ran, will forcefully update all series images to match what Shoko has.'
}
]"
/>

### Tag Filter Settings

![Shokodi - Tag Filter Settings](/images/shokodi/shokodi-tag-filter.jpg)

The Tag Filter section allows you to specify the corrective actions you wish to apply to the series tags sent from
Shoko. This includes actions like hiding spoiler tags and removing unnecessary tags. Since these actions are
self-explanatory, we will focus on explaining the filter setting.

<EasyTable
:columns="[
{ name: 'Option', header: 'Option', width: '20%' },
{ name: 'Description', header: 'Description' }
]"
:data="[
{
Option: 'Filter Tags To',
Description: 'Will either show toggled tag filter items, or hide them. In the above example, only Shorten Tag List will be active.'
}
]"
/>

### Search Settings

![Shokodi - Search Settings](/images/shokodi/shokodi-search.jpg)

The Search Settings section sets the maximum limit for the number of tags and general search results for your query.
It's advisable not to input higher numbers, as doing so may result in unforeseen issues.

### Video Settings

![Shokodi - Video Settings](/images/shokodi/shokodi-video-settings.jpg)

The Video Settings section, which is also referred to as the Watched Status settings section, encompasses a range of
options related to watch states, series voting, Trakt integration, and general Kodi player settings. These options
are all fairly self-explanatory, so there's no need to single out any specific ones for emphasis.

### Advanced Settings

![Shokodi - Video Settings](/images/shokodi/shokodi-video-settings.jpg)

The Advanced Settings section is typically reserved for troubleshooting and should generally be left untouched.
However, there are two settings related to Seiyuu that are worth mentioning.

<EasyTable
:columns="[
{ name: 'Option', header: 'Option', width: '20%' },
{ name: 'Description', header: 'Description' }
]"
:data="[
{
Option: 'Disable Kodi\'s Internal Cast Menu',
Description: 'If enabled, will not display the episode cast information.'
},
{
Option: 'Use Seiyuu Picture For Case Data',
Description: 'If enabled, will use the Seiyuu images downloaded by Shoko.'
}
]"
/>
