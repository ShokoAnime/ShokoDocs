---
title: Script Authoring | Lua Renamer
description: Notes on writing or editing lua scripts for Shoko.
---

# Script Authoring

Lua Renamer provides a programming interface for more versatile file structure and renaming scenarios. This section details how to author scripts and the scripting environment.

Check out [This short guide](https://learnxinyminutes.com/docs/lua/) if you are new to Lua.

## With VS Code (Recommended)

1. VS Code + [the Lua extension](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) is recommended for script editing.
    - The script environment provides [LuaCATS annotations](https://luals.github.io/wiki/annotations/) for type linting.
2. Open the plugin's lua subfolder in VS Code via `File -> Open Folder...`
3. You can create a new .lua file or edit the existing `default.lua`
    - Editing `default.lua` will not modify existing renamer configs, but will be used as the initial script for new renamer configs
4. When your script is ready to test, copy the script content into the Renamer config in the WebUI. See [Usage](./getting-started#usage)

## The Environment

The lua environment is sandboxed, removing operations from standard libraries such as `io`, and `os`. See BaseEnv in [LuaContext](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/LuaContext.cs).  
The script is run in a fresh environment for every file.  
Only the values of output variables defined in [env.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/env.lua) will affect renaming/moving behaviour.

For documentation/[LuaCATS definitions](https://luals.github.io/wiki/definition-files/) only:

- [env.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/env.lua): The initial environment, output variable values will change renaming/moving behaviour.
- [defs.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/defs.lua): Table definitions available from Shoko.
- [enums.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/enums.lua): Enumeration definitions.

Executed at runtime:

- [lualinq.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/lualinq.lua): A modified utility library ([original](https://github.com/xanathar/lualinq), [docs](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/LuaLinq.pdf)) that adds functional query methods similar to [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/linq/).
- [utils.lua](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/lua/utils.lua): Additional utility functions can be defined here.

## Script Settings

In addition to the `filename`, `destination` and `subfolder` output variables, these variables affect the result of your script.

- `use_existing_anime_location` If true, the renamer will attempt to keep files from the same series together, reusing the destination and subfolder of existing files. This takes precedence over the destination and subfolder set in the script. (default: false)
- `replace_illegal_chars` If true, replaces all illegal path characters in subfolder and file name with alternatives. See [ReplaceMap in Utils.cs for defaults](https://github.com/Mik1ll/LuaRenamer/blob/master/LuaRenamer/Utils.cs). Use `illegal_chars_map` to modify defaults. (default: false)
- `remove_illegal_chars` If true, removes all illegal path characters in subfolder and file name. If false, illegal characters are replaced with underscores or replaced if `replace_illegal_chars` is true. (default: false)
- `skip_rename` If true, the result of running the script is discarded when renaming. (default: false)
- `skip_move` If true, the result of running the script is discarded when moving. (default: false)
- `illegal_chars_map` Mapping of illegal characters to their replacements

## Notes for File Moving

### Destination

Import folders are only valid destination candidates if they exist and have either the `Destination` or `Both` Drop Type. Use of `use_existing_anime_location` may bypass this restriction, allowing `None` but not `Source` (see [Script Settings](#script-settings)).

Destination defaults to the nearest (to the file) valid import folder.

Destination is set via one of:

- Import folder name (string)
- Server folder path (string)
- Import folder reference (table, selected from the `importfolders` array or `file.importfolder`)

If destination set via path, it is matched to import folder path with converted directory seperators but no other special handling (neither relative path nor expansion).

### Subfolder

Subfolder defaults to the anime title preferred by Shoko.

Subfolder is set via one of:

- Subfolder name (string)
- Path segments (array-table, e.g. `{"parent dir name", "subdir name", "..."}`)

If set via a string subfolder name, directory separators within the string are ignored or replaced depending on preference.  
Also see [`use_existing_anime_location` in Script Settings](#script-settings)
