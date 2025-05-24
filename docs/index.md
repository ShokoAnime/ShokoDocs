---
layout: home

hero:
  name: "Shoko Docs"
  text: "Resource Center for the Shoko Suite"
  image:
    src: /images/logo.svg
    alt: Shoko Docs
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started/installing-shoko-server
    - theme: alt
      text: Download Shoko Server
      link: https://shokoanime.com/downloads/shoko-server
---

<Features 
    groupTitle="Quick Links to Popular Pages"
    :features="[
    { 
        title: 'Plex Integration', 
        info: 'Learn how to integrate Shoko with Plex using Shoko Relay or Shoko Metadata.', 
        icon: 'images/plex.svg',
        link: 'plex/installing-agents-scanners'
    },
    { 
        title: 'Jellyfin Integration', 
        info: 'Learn how to integrate Shoko with Plex using Shokofin.', 
        icon: 'images/jellyfin.svg',
        link: 'jellyfin/installing-shokofin'
    },
    { 
        title: 'Kodi Integration', 
        info: 'Learn how to integrate Shoko with Plex using Shokodi', 
        icon: 'images/kodi.svg',
        link: 'kodi/installing-shokodi'
    },
    { 
        title: 'WebUI Theming', 
        info: 'Learn how to customize the Shoko WebUI with themes.', 
        icon: 'Palette',
        link: 'shoko-server/webui-themes'
    },
    { 
        title: 'Renamer Setup', 
        info: 'Learn how to include a Renamer in your Shoko setup.', 
        icon: 'FilePenLine',
        link: 'renamer-plugins/available-renamers'
    },
    { 
        title: 'Frequently Asked Questions', 
        info: 'We\'ve complied a list of the most common questions and answers.', 
        icon: 'CircleHelp',
        link: 'faq'
    }
    ]"
  />
