---
title: Available Renamers
description: A list of available renamer for use with Shoko.
---

<script setup>
const renamerColumns = [
  { name: 'Renamer', header: 'Renamer' },
  { name: 'Description', header: 'Description' }
];

const renamerData = [
  {
    Renamer: "WebAOM",
    description: "Default renamer built into Shoko."
  },
  {
    Renamer: "Lua Renamer",
    description: "Uses the Lua scripting language to create custom renaming scripts."
  }
];
</script>

# Available Renamers

Shoko allows user to create custom renaming plugins for use with the file renamer utility. Below are the currently
available renamers that can be used with Shoko.

<EasyTable :columns="renamerColumns" :data="renamerData" />