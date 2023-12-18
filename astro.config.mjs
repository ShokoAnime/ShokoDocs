import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

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
    components: {
      TableOfContents: './src/components/TableOfContents.astro',
      SiteTitle: './src/components/SiteTitle.astro'
    },
    sidebar: [{
      autogenerate: {
        directory: 'getting-started'
      },
      label: 'Getting Started'
    }, {
      label: 'Shoko Suite',
      link: 'shoko-suite'
    }, {
      label: 'FAQ',
      link: 'faq'
    }, {
      autogenerate: {
        directory: 'changelog'
      },
      label: 'Changelog'
    }],
    customCss: ['./src/styles/custom.css']
  }), react(), expressiveCode(), mdx()]
});