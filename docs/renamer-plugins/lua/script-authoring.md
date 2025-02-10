---
title: Script Authoring
description: Notes on writing or editing lua scripts
---

# Script Authoring

Lua Renamer provides a programming interface for more versatile file structure and renaming scenarios. This page details how to author scripts and the scripting environment.

Check out [This short guide](https://learnxinyminutes.com/docs/lua/) if you are new to Lua.

## With VS Code (Recommended)

1. VS Code + [the Lua extension](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) is recommended for script editing.
   - The script environment provides [LuaCATS annotations](https://luals.github.io/wiki/annotations/) for type linting.
2. Open the plugin's lua subfolder in VS Code via `File -> Open Folder...`
3. You can create a new .lua script or edit the existing `default.lua` (editing default.lua will not change existing scripts on the server, but will be used when new scripts are created)
4. When your script is ready to test, copy the script content into the Renamer config in the WebUI. See [Usage](./getting-started#usage)

## The Environment

The lua environment is sandboxed, removing operations from standard libraries such as `io`, and `os`. See BaseEnv in [LuaContext](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/LuaContext.cs).  
The script is run in a fresh environment for every file.  
Only the output variables defined in [env.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/env.lua) will have any effect outside of the script.

- [env.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/env.lua)\*: The starting environment, output variable values will change renaming/moving behaviour
- [defs.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/defs.lua)\*: Table definitions available from Shoko
- [enums.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/enums.lua)\*: Enumeration definitions
- [lualinq.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/lualinq.lua): A modified utility library ([original](https://github.com/xanathar/lualinq), [docs](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/LuaLinq.pdf)) that adds functional query methods similar to [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/linq/)
- [utils.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/utils.lua): Additional utility functions can be defined here

\* This file is not executed, it serves as documentation/annotations

## Script Settings

In addition to the `filename`, `destination` and `subfolder` output variables, these variables affect the result of your script.

- `use_existing_anime_location` If true, the subfolder with the most files of the same anime is reused if one exists. This takes precedence over the subfolder set in the script (default: false)
- `replace_illegal_chars` If true, replaces all illegal path characters in subfolder and file name with alternatives. See [ReplaceMap in Utils.cs](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/Utils.cs) (default: false)
- `remove_illegal_chars` If true, removes all illegal path characters in subfolder and file name. If false, illegal characters are replaced with underscores or replaced if `replace_illegal_chars` is true. (default: false)
- `skip_rename` If true, the result of running the script is discarded when renaming. (default: false)
- `skip_move` If true, the result of running the script is discarded when moving. (default: false)

## Notes for File Moving

### Destination

<wbr/>Import folders are only valid destination candidates if they exist and have either the `Destination` or `Both` Drop Type. Using `use_existing_anime_location` may bypass this restriction, allowing `None` but not `Source`. This may change in the future.

Destination defaults to the nearest (to the file) valid import folder.  
Destination is set via one of:

- <wbr/>Import folder name (string)
- Server folder path (string)
- <wbr/>Import folder reference (selected from `importfolders` array or `file.importfolder`)

If destination set via path, it is matched to import folder path with converted directory seperators but no other special handling (relative path or expansion).

### Subfolder

Subfolder defaults to the anime title in your preferred language.  
Subfolder is set via one of:

- Subfolder name (string)
- Path segments (array-table, e.g. `{"parent dir name", "subdir name", "..."}`)

If set via a string subfolder name, directory separators within the string are ignored or replaced depending on preference.  
Also see [`use_existing_anime_location` in Script Settings](#script-settings)
