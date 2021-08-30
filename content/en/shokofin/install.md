+++
title = "Configuring Shokofin"
description = "Information on how to install & configure Shokofin, a Jellyfin Plugin."
aliases = ["/install"]
[[pageNav]]
navTitle = "Install & Config"
name = "Official Repository"
id = "official-repository"
[[pageNav]]
name = "Github Releases"
id = "github-releases"
[[pageNav]]
name = "Setup"
id = "setup"
+++

## Install{.page-first-header}

There are multiple ways to install this plugin, but the recommended way is to use the official Jellyfin repository. Be sure to configure your plugin settings before using it on a library. Read more on that in the next section after you've finished your install.

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

Before you start using the plugin it is important to make sure the connection settings are correct, otherwise the plugin will be unable to gather metadata from your running instance of **Shoko Server**. If you're running both Jellyfin and Shoko Server on the same machine and haven't changed the default username/password in Shoko Server, then you're all set to go, but if not then you need to provide the `Host`, `Username` and `Password` credentials in the plugin settings as shown below.

![Shokofin - Connection Options](/assets/images/shokofin/Shokofin-Connection-Options.jpg)

After you've tweaked the connection settings then you're free to change any of the other settings to your liking, but remember; you need to refresh (or rebuild) your library/libraries if you make any changes to the plugin settings.
