---
title: Installing Shokofin | Jellyfin
description: Information on how to install and configure Shokofin for Jellyfin.
---

<script setup>
const containerColumns = [
  { name: 'Shokofin', header: 'Shokofin' },
  { name: 'Jellyfin', header: 'Jellyfin' },
  { name: 'ShokoServer', header: 'Shoko Server' }
];

const compatibilityTableData = [
  {
    Shokofin: '`0.x.x`',
    Jellyfin: '`10.7`',
    ShokoServer: '`4.0.0` &mdash; `4.1.2`'
  },
  {
    Shokofin: '`1.x.x`',
    Jellyfin: '`10.7`',
    ShokoServer: '`4.1.0` &mdash; `4.1.2`'
  },
  {
    Shokofin: '`2.x.x`',
    Jellyfin: '`10.8`',
    ShokoServer: '`4.1.2`'
  },
  {
    Shokofin: '`3.x.x`',
    Jellyfin: '`10.8`',
    ShokoServer: '`4.2.0`'
  },
  {
    Shokofin: '`4.0.0` &mdash; `4.1.1`',
    Jellyfin: '`10.9`',
    ShokoServer: '`4.2.2`'
  },
  {
    Shokofin: '`4.2.0` &mdash; `4.2.2`',
    Jellyfin: '`10.9`',
    ShokoServer: '`4.2.2` &mdash; `5.0.0`'
  },
  {
    Shokofin: '`5.0.0`',
    Jellyfin: '`10.10`',
    ShokoServer: '`5.0.0`'
  },
  {
    Shokofin: '`5.0.1` &mdash; `5.0.4`',
    Jellyfin: '`10.10`',
    ShokoServer: '`5.0.0` &mdash; `5.1.0`'
  },
  {
    Shokofin: '`5.0.5` &mdash; `5.0.6`',
    Jellyfin: '`10.11`',
    ShokoServer: '`5.1.0`'
  },
  {
    Shokofin: '`dev`',
    Jellyfin: '`10.11`',
    ShokoServer: '`daily`'
  }
];
</script>

# Installing Shokofin

**Shokofin** is a plugin for **Jellyfin** that works in tandem with **Shoko Server** to provide metadata tailored to
your personal anime collection. For information on what Shoko Server is and the benefits that can come from using it to
identify and manage your collection, visit our [Home page](https://shokoanime.com/) or explore these docs before you
attempt to set up Shokofin.

:::warning Pre-Requirements
**Before installing Shokofin it is required that you have already set up and are using Shoko Server** and that the files
you intend to display in Jellyfin are indexed (_and optionally managed_) by Shoko Server. **Otherwise, the plugin won't
be able to provide any metadata for your files**, because there is simply no metadata to provide for them. You can use
the [Installing Shoko Server](/getting-started/installing-shoko-server) guide to properly install and configure Shoko
Server before setting up Shokofin.
:::

## Taking the First Step

There are multiple ways to install this plugin, but the recommended way is to use our **Official Jellyfin Repository**.

Below lists the corresponding versions of Jellyfin and Shoko Server that are compatible with Shokofin. Be sure to
install the correct version for your setup to guarantee functionality.

<EasyTable :columns="containerColumns" :data="compatibilityTableData" />

### Official Repository

1. Navigate to the **Dashboard**.
2. Under the **Plugins** section in the side-bar, go to **Catalog**.
3. At the top of the catalog page, click the **⚙ Gear** icon that's next to the help button.
4. Add new repository by clicking on the **+ Plus** icon and enter the following details;
   - **Repository Name:** `Shokofin Stable`
   - **Repository URL:** `https://raw.githubusercontent.com/ShokoAnime/Shokofin/metadata/stable/manifest.json`
5. Click on **Catalog** under the **Plugins** section in the sidebar.
6. Find **Shoko** under the **Anime** section and click it.
7. Click the **Install** button. You will get a pop-up warning you about using untrusted plugins. Click **Ok**.
8. **Restart Jellyfin** to apply the changes.

-----

:::warning Development Builds
If you want to help test and/or improve the plugin, you can install the **development** builds**¹** by adding the following repository**²** instead of the stable one:

**Repository Name**: `Shokofin Development` <br/>
**Repository URL**: `https://raw.githubusercontent.com/ShokoAnime/Shokofin/metadata/dev/manifest.json`

**¹** _The development builds may require a development build of Shoko Server to function properly, are not guaranteed to be stable, and may contain breakage changes and/or minor bugs between releases._

**²** _Having both the stable repository and development repository added at the same time is not recommended and may cause issues in some cases._
:::

### Github Releases

1. Download the `shoko_*.zip` file from
   the [latest release from GitHub](https://github.com/ShokoAnime/shokofin/releases/latest).
2. Extract the contained `*.dll`s and `meta.json`, place the files in a folder named `Shokofin`, and copy this folder to
   the `plugins` folder inside the Jellyfin data directory. Refer to the "Data Directory" section on
   [this page](https://jellyfin.org/docs/general/administration/configuration.html) for where to find your Jellyfin
   install.
3. Start or restart your server to apply the changes.

## Next Steps

Congratulations! If everything went well, Shokofin should now be installed. Proceed to the next page for instructions on
how to connect Shokofin to your Shoko Server instance along with any other configuration steps needed to properly setup
Shokofin for recognizing your anime library.
