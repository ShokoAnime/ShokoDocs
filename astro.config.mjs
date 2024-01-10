import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

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
          label: "Shoko Server"
        },
        {
          autogenerate: {
            directory: "shoko-metadata"
          },
          label: "Shoko Metadata (Plex)"
        },
        {
          autogenerate: {
            directory: "shokodi"
          },
          label: "Shokodi (Kodi)"
        },
        {
          autogenerate: {
            directory: "shokofin"
          },
          label: "Shokofin (Jellyfin)"
        },
        {
          autogenerate: {
            directory: "changelog"
          },
          label: "Changelog"
        },
        {
          label: "FAQ",
          link: "faq"
        }
      ],
      customCss: [
        './src/styles/custom.css',
        '@fontsource/lexend-deca',
        '@fontsource/lexend-deca/600.css'

      ]
    }),
    react()
  ]
});
