import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightImageZoom from 'starlight-image-zoom';

// https://astro.build/config
export default defineConfig({
  // base: '/docs-new',
  integrations: [
    starlight({
      title: 'ShokoDocs',
      logo: {
        light: './src/assets/light-logo.png',
        dark: './src/assets/dark-logo.png',
      },
      social: {
        discord: 'https://discord.com/invite/vpeHDsg',
        github: 'https://github.com/ShokoAnime',
      },
      editLink: {
        baseUrl: 'https://github.com/ShokoAnime/ShokoDocs',
      },
      lastUpdated: true,
      components: {
        PageSidebar: './src/components/PageSidebar.astro',
      },
      customCss: ['./src/styles/custom.css', '@fontsource-variable/open-sans'],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      sidebar: [
        {
          autogenerate: {
            directory: 'getting-started',
          },
          label: 'Getting Started',
          collapsed: true,
        },
        {
          label: 'Shoko Server',
          collapsed: true,
          items: [
            { label: 'Dashboard', link: '/shoko-server/dashboard/' },
            { label: 'Logs', link: '/shoko-server/logs/' },
            { label: 'Actions', link: '/shoko-server/actions/' },
            { label: 'Settings', link: '/shoko-server/settings/' },
            {
              label: 'Utilities',
              items: [
                { label: 'Unrecognized Files', link: '/shoko-server/utilities/unrecognized-files' },
                { label: 'Release Management', link: '/shoko-server/utilities/release-management' },
                { label: 'Series Without Files', link: '/shoko-server/utilities/series-without-files' },
                { label: 'File Search', link: '/shoko-server/utilities/file-search' },
                { label: 'File Rename', link: '/shoko-server/utilities/file-rename' },
              ],
            },
            {
              label: 'Misc',
              items: [
                { label: 'Understanding AniDB Bans', link: '/shoko-server/anidb-ban' },
                { label: 'Web UI Themes', link: '/shoko-server/themes' },
              ],
            },
          ],
        },
        {
          autogenerate: {
            directory: 'plex-integration',
          },
          label: 'Plex Integration',
          collapsed: true,
        },
        {
          autogenerate: {
            directory: 'jellyfin-integration',
          },
          label: 'Jellyfin Integration',
          collapsed: true,
        },
        {
          autogenerate: {
            directory: 'kodi-integration',
          },
          label: 'Kodi Integration',
          collapsed: true,
        },
        {
          label: 'Renaming Plugins',
          collapsed: true,
          items: [
            { label: 'Getting Started', link: '/renaming-plugins/available-renamers' },
            {
              label: 'Lua Renamer',
              items: [
                { label: 'Getting Started', link: '/renaming-plugins/lua-renamer/getting-started' },
                { label: 'Script Authoring', link: '/renaming-plugins/lua-renamer/script-authoring' },
                { label: 'Frequently Asked Questions', link: '/renaming-plugins/lua-renamer/faq' },
              ],
            },
          ],
        },
        {
          autogenerate: {
            directory: 'changelog',
          },
          label: 'Changelog',
          collapsed: true,
        },
        {
          label: 'FAQ',
          link: 'faq',
        },
        {
          label: 'Contribute',
          link: 'contribute',
        },
      ],
      plugins: [starlightImageZoom()],
    }),
    react(),
  ],
});
