---
title: File Rename
description: An overview of the File Rename utility in Shoko's Web UI.
---

# File Rename

The File Rename utility allows you to rename and/or move your files with custom rules. By default, Shoko will
use [the WebAOM built-in plugin](/renamer-plugins/webaom/getting-started) for renaming and moving files. Additional
plugins are supported: check out the [Available Renamers](/renamer-plugins/available-renamers) page for more
information.

![Shoko Server - Rename Preview](/images/shoko-server/shoko-server-rename-preview.png)

## Editing Renamer Configurations

Renamer configurations can be accessed by clicking on the cog wheel on the right side of the rename utility.  
Three subsections are expanded:

- **Renamer Selection:** set the default config and manage configs.
- **Renamer Config:** renamer plugin specific settings.
- **Script:** an additional renamer plugin setting with a larger text area.

![Shoko Server - Renamer Config](/images/shoko-server/shoko-server-renamer-config.png)

### The Default Config

The default config is set in the Renamer Selection section. The default config is used for Shoko's automatic renaming
and moving functions (Rename and Move on Import in Settings/Import).

## Renaming/Moving Files

Files needed to be added to the rename utility before you can preview the their results. Click on Add Files on the right
side of the utility and choose which files to add to the utility. Once files are added, the preview results are
automatically generated.

The Move check box is unset by default, so check the box on the left side of the utility if you want to move files in
addition to renaming. The Import folder name followed by the relative path is displayed above each file name result.

The preview will automatically update as the renamer config is updated. Edit your script/config until the desired
results are displayed.

:::warning Save your Config
Ensure that your config is saved in the Renamer Selection section before you rename/move your files if it has changed.
:::

Once you have renamed your files, check the results for any additional errors (shown in red text and an x status).
