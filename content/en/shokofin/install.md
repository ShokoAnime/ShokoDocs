+++
title = "Install Shokofin"
description = "Information on how to install Shokofin."
aliases = ["/install"]
[[pageNav]]
navTitle = "Requirements"
[[pageNav]]
navTitle = "Install"
name = "Official Repository"
id = "official-repository"
[[pageNav]]
name = "Github Releases"
id = "github-releases"
[[pageNav]]
name = "Setup"
id = "setup"
+++

## Requirements{.page-first-header}

The plugin requires a version of Jellyfin greater or equal to **10.7.0** (`>=10.7.0`) and an ustable version of Shoko Server greater or equal to **4.1.1** (`>=4.1.1`) to be installed. It also requires that you have already set up and are using Shoko Server, and that the directories/folders you intend to use in Jellyfin are fully indexed (and optionally managed) by Shoko Server, otherwise the plugin won't be able to funciton properly — it won't be able to find metadata about any entries that are not indexed by Shoko Server since the metadata we want is not available.

## Install

There are multiple ways to install this plugin, but the recommended way is to use the official Jellyfin repository. Be sure to establish a connection between the plugin and your running instance of **Shoko Server** in the plugin settings before trying to use it on a library. Read more on that in the next section after you've finished your install.

### Official Repository

1. Navigate to the Dashboard
2. Click on "Plugins" in the side-bar, and click it.
3. Click on "Repositories" on the top of the Plugins page.
2. Add new repository by clicking on the **plus**-icon (+) and enter the following details;
   * Repository Name: `Shokofin Stable`
   * Repository URL: `https://raw.githubusercontent.com/ShokoAnime/Shokofin/master/manifest.json`
3. Click on "Catalog" on the top of the Plugins page.
4. Scroll down and till you find "Shokofin" under the Metadata section, and click it.
5. Click the blue **Install**-button. You will get a pop up warning you about using untrusted plugins. Click Ok.
6. Restart your server to apply the changes.

### Github Releases

1. Download the `shokofin_*.zip` file from the latest release from GitHub [here](https://github.com/ShokoAnime/shokofin/releases/latest).

2. Extract the contained `Shokofin.dll` and `meta.json`, place both the files in a folder named `Shokofin` and copy this folder to the `plugins` folder under the Jellyfin program data directory or inside the portable install directory. Refer to the "Data Directory" section on [this page](https://jellyfin.org/docs/general/administration/configuration.html) for where to find your jellyfin install.

3. Start or restart your server to apply the changes

### Setup

Before you start using the plugin it is important to connect the plugin to a running instance of **Shoko Server**. So head over to the plugin settings and provide the `Host`, `Username` and `Password` credentials and click the `Connect` button.

![Shokofin - Connection Settings](/assets/images/shokofin/Shokofin-Connection-Settings.jpg)

After you've established a connection to a running instance of **Shoko Server** then you're free to either use the plugin as-is or to change any of the other settings to your liking.
