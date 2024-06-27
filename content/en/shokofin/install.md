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

The plugin requires a version of Jellyfin greater or equal to **10.7.0** (`>=10.7.0`) and an unstable version of Shoko Server greater or equal to **4.1.1** (`>=4.1.1`) to be installed. It also requires that you have already set up and are using Shoko Server, and that the directories/folders you intend to use in Jellyfin are fully indexed (and optionally managed) by Shoko Server, otherwise the plugin won't be able to funciton properly — it won't be able to find metadata about any entries that are not indexed by Shoko Server since the metadata we want is not available.

## Install

There are many ways to install the plugin, but the recommended way is to use the official Jellyfin repository. Be sure to establish a connection between the plugin and your running instance of **Shoko Server** in the plugin settings before trying to use it on a library. Read more on that in the next section after you've finished your install.

Below is a version compatibility matrix for which version of Shokofin is
compatible with what.

| Shokofin   | Jellyfin | Shoko Server  |
|------------|----------|---------------|
| `0.x.x`    | `10.7`   | `4.0.0-4.1.2` |
| `1.x.x`    | `10.7`   | `4.1.0-4.1.2` |
| `2.x.x`    | `10.8`   | `4.1.2`       |
| `3.x.x`    | `10.8`   | `4.2.0`       |
| `dev`      | `10.8`   | `4.2.2`       |
| Soon™      | `10.9`   | Soon™         |
{.table .table-bordered}

### Official Repository

1. **Access Plugin Repositories:**
   - Go to `Dashboard` -> `Plugins` -> `Repositories`.

2. **Add New Repository:**
   - Add a new repository with the following details:
     * **Repository Name:** `Shokofin Stable`
     * **Repository URL:** `https://raw.githubusercontent.com/ShokoAnime/Shokofin/metadata/stable/manifest.json`

3. **Install Shokofin:**
   - Go to the catalog in the plugins page.
   - Find and install `Shoko` from the `Metadata` section.

4. **Restart Jellyfin:**
   - Restart your server to apply the changes.

### Github Releases

1. **Download the Plugin:**
   - Go to the latest release on GitHub [here](https://github.com/ShokoAnime/shokofin/releases/latest).
   - Download the `shoko_*.zip` file.

2. **Extract and Place Files:**
   - Extract all `.dll` files and `meta.json` from the zip file.
   - Put them in a folder named `Shoko`.
   - Copy this `Shoko` folder to the `plugins` folder in your Jellyfin program
     data directory or inside the Jellyfin install directory. For help finding
     your Jellyfin install location, check the "Data Directory" section on
     [this page](https://jellyfin.org/docs/general/administration/configuration.html).

3. **Restart Jellyfin:**
   - Start or restart your Jellyfin server to apply the changes.

### Setup

Before you start using the plugin it is important to connect the plugin to a running instance of **Shoko Server**. So head over to the plugin settings and provide the `Host`, `Username` and `Password` credentials and click the `Connect` button.

![Shokofin - Connection Settings](/assets/images/shokofin/Shokofin-Connection-Settings.png)

After you've established a connection to a running instance of **Shoko Server** then you're free to either use the plugin as-is or to change any of the other settings to your liking.
