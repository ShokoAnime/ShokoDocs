import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'ShokoDocs',
    logo: {
      light: './src/assets/light-logo.png',
      dark: './src/assets/dark-logo.png'
    },
    social: {
      discord: 'https://discord.com/invite/vpeHDsg',
      github: 'https://github.com/withastro/starlight'
    },
    editLink: {
      baseUrl: 'https://github.com/ShokoAnime/ShokoDocs'
    },
    lastUpdated: true,
    sidebar: [{
      label: 'Getting Started',
      // Autogenerate a group of links for the 'getting-started' directory.
      autogenerate: {
        directory: 'getting-started'
      }
    }],
    components: {
      TableOfContents: './src/components/TableOfContents.astro',
      SiteTitle: './src/components/SiteTitle.astro'
    },
    customCss: ['./src/styles/custom.css']
  }), react()]
});