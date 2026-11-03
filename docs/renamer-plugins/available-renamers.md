---
title: Available Renamers
description: The renamers documented here, and where the others come from.
---

<script setup>
const renamerColumns = [
  { name: 'Renamer', header: 'Renamer' },
  { name: 'Description', header: 'Description' }
];

const renamerData = [
  {
    Renamer: "WebAOM",
    Description: "Default renamer built into Shoko."
  },
  {
    Renamer: "Lua Renamer",
    Description: "Uses the Lua scripting language to create custom renaming scripts."
  }
];
</script>

# Available Renamers

Renaming is handled by plugins, so which renamers you can pick from in the
[File Rename](/shoko-server/file-rename) utility depends on which plugins you have installed. WebAOM is built into
Shoko and always there; everything else comes from a plugin you add under
[Plugin Management](/shoko-server/settings/plugin-management), and anyone can write one.

These are the renamers documented here:

<EasyTable :columns="renamerColumns" :data="renamerData" />

Others exist, and new ones turn up as people write them, so this is not a complete list of what's out there. If a
renamer you've installed isn't covered here, check whoever wrote it for its documentation.
