---
title: Contribute to Shoko
description: Help Make Shoko even better!
---

<script setup>
const projectsColumns = [
  { name: 'Project', header: 'Project', width: '20%' },
  { name: 'Language', header: 'Language', width: '15%' },
  { name: 'Maintainer(s)', header: 'Maintainer(s)' },
  { name: 'Additional Notes', header: 'Additional Notes' }
];

const projectsData = [
  {
    Project: '[Shoko Server](https://github.com/ShokoAnime/ShokoServer)',
    Language: 'C# / .NET',
    'Maintainer(s)': 'Da3dsoul',
    'Additional Notes': 'Tons of small tasks to help get you familiar with the codebase.'
  },
  {
    Project: '[Shoko Web UI](https://github.com/ShokoAnime/Shoko-WebUI)',
    Language: 'JS / React',
    'Maintainer(s)': 'Avael / Mohan226 / Elemental Crisis',
    'Additional Notes': 'Bug fixes and minor enhancements to help get you familiar with the codebase.'
  },
  {
    Project: '[ShokoDocs](https://github.com/ShokoAnime/ShokoDocs)',
    Language: 'Markdown',
    'Maintainer(s)': 'Elemental Crisis',
    'Additional Notes': 'Updating and adding new pages.'
  },
  {
    Project: '[ShokoMetadata](https://github.com/Cazzar/ShokoMetadata.bundle)',
    Language: 'Python',
    'Maintainer(s)': 'Cazzar',
    'Additional Notes': 'No active work at the moment, but ongoing refactoring and improvements are always welcome.'
  },
  {
    Project: '[Shoko Relay](https://github.com/natyusha/ShokoRelay.bundle)',
    Language: 'Python',
    'Maintainer(s)': 'Natyusha',
    'Additional Notes': 'No active work at the moment, but ongoing refactoring and improvements are always welcome.'
  },
  {
    Project: '[Shokofin](https://github.com/ShokoAnime/Shokofin)',
    Language: 'C#',
    'Maintainer(s)': 'Revam',
    'Additional Notes': 'No active work at the moment, but ongoing refactoring and improvements are always welcome.'
  },
  {
    Project: '[Shokodi](https://github.com/ShokoAnime/Shokodi)',
    Language: 'C#',
    'Maintainer(s)': 'Da3dsoul',
    'Additional Notes': 'No active work at the moment, but ongoing refactoring and improvements are always welcome.'
  },
  {
    Project: '[My Anime 3](https://github.com/ShokoAnime/MyAnime3)',
    Language: 'C#',
    'Maintainer(s)': 'Da3dsoul',
    'Additional Notes': 'Major refactor & possible rebuild for MediaPortal 2.'
  }
];
</script>

# Contribute to Shoko

Shoko is fully open-source, offering plenty of opportunities to contribute, no matter your skill level. Contributions
aren't limited to coding; as we're always looking for help with documentation, testing, UI design, and more.

## What About Donations?

Although we sincerely appreciate your willingness to donate, the Shoko team does not accept monetary contributions. We
believe the best way to support the project is by offering your time and skills to help improve Shoko.

## Shoko Suite Status

Below is a list of all the projects currently supported by the Shoko Team, along with their programming language, point
of contact, and additional notes. If you don't see a project that matches your skills or interests but would still like
to contribute, feel free to reach out to us on our Discord server for other opportunities.

<EasyTable :columns="projectsColumns" :data="projectsData" />
