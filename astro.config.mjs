import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import astroExpressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "ShokoDocs",
      logo: {
        light: "./src/assets/light-logo.png",
        dark: "./src/assets/dark-logo.png"
      },
      social: {
        discord: "https://discord.com/invite/vpeHDsg",
        github: "https://github.com/withastro/starlight"
      },
      editLink: {
        baseUrl: "https://github.com/ShokoAnime/ShokoDocs"
      },
      lastUpdated: true,
      components: {
        TableOfContents: "./src/components/TableOfContents.astro",
        SiteTitle: "./src/components/SiteTitle.astro"
      },
      sidebar: [
        {
          autogenerate: {
            directory: "getting-started"
          },
          label: "Getting Started"
        },
        {
          autogenerate: {
            directory: "shoko-server"
          },
          label: "Shoko Server",
          collapsed: true,
        },
        {
          autogenerate: {
            directory: "plex-integration"
          },
          label: "Plex Integration",
          collapsed: true,
        },
        {
          autogenerate: {
            directory: "jellyfin-integration"
          },
          label: "Jellyfin Integration",
          collapsed: true,
        },
        {
          autogenerate: {
            directory: "kodi-integration"
          },
          label: "Kodi Integration",
          collapsed: true,
        },
        {
          autogenerate: {
            directory: "changelog"
          },
          label: "Changelog",
          collapsed: true,
        },
        {
          label: "FAQ",
          link: "faq"
        },
        {
          label: "Contribute",
          link: "contribute"
        }
      ],
      customCss: [
        './src/styles/custom.css',
        '@fontsource/lexend-deca',
        '@fontsource/lexend-deca/600.css',
      ],
    }),
    astroExpressiveCode({
      themes: ['dracula-soft'],
    }),
    react()
  ],
});
