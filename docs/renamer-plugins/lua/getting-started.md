---
title: Getting Started | Lua Renamer
description: Information on how to set up and use Lua Renamer.
---

# Getting Started

Lua Renamer allows users to rename their collection via an Lua 5.4 interface.  
This renamer is fitting for users with more advanced collection renaming/organization requirements.

Limitations: The Lua environment is sandboxed such that interaction with the operating system/file system/networking is unavailable.

For support/questions join the [Shoko Discord server](https://discord.gg/shokoanime) and message `mikill`.

## Installation

1. Download the [the release appropriate for your Shoko Server version](https://github.com/Mik1ll/LuaRenamer/releases).
    - The [latest release](https://github.com/Mik1ll/LuaRenamer/releases/latest) should be compatible with current Stable.
    - Pre-releases will be compatible with Shoko Daily depending on the Abstractions Version, check release notes and [Shoko Server tags](https://github.com/ShokoAnime/ShokoServer/tags) for compatibility.
2. Extract and place the LuaRenamer directory into the Shoko plugins directory:
    - (Windows) `C:\ProgramData\ShokoServer\plugins`
    - (Docker) Wherever the container location `/home/shoko/.shoko/Shoko.CLI/plugins` is mounted.
3. Restart Shoko Server.
4. (Recommended) Install [VS Code](https://code.visualstudio.com/download) and [the Lua extension](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) to edit your script.
5. Follow instructions in the next section to add a script.

## Usage

1. Open the Server WebUI (port 8111 by default) and log in.
2. Navigate to Utilities/File Rename.
3. Click the cog wheel icon to open the renamer config panel.
4. Create a new renamer config, enter a name and select LuaRenamer from the select box. If LuaRenamer is not visible, the renamer failed to load, check the server logs.
5. Add the files (button next to the config cog wheel) you wish to rename. The rename/move preview will automatically populate with changes you make.
6. The Move checkbox chooses whether the files are renamed and moved or only renamed.
7. The config can be set to be the Default, which is used when Rename On Import and Move On Import are set in the Import Settings.
8. Once you are happy with the preview you can save the config and click Rename Files to rename/move+rename the previewed files.

### Renaming on Import

If you wish to rename/move your files on import you must do two things:

1. Set Rename/Move On Import to true in Shoko settings (via WebUI or settings-server.json).
2. Ensure your renamer config is saved as the Default.
