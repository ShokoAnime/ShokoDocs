import fs from 'node:fs';
import container from 'markdown-it-container';
import taskLists from 'markdown-it-task-lists';
import { defineConfig } from 'vitepress';
import lightbox from 'vitepress-plugin-lightbox';
import { generateOgImages } from '../scripts/generateOgImages';

// @ts-ignore
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite';

// The stable site is served from the domain root, the daily build from a sub-path (e.g. DOCS_BASE=/daily/).
const SITE_URL = 'https://docs.shokoanime.com';
const base = process.env.DOCS_BASE ?? '/';
const branch = process.env.DOCS_BRANCH ?? 'master';
const isDaily = base !== '/';

// Pages that exist in the stable build, so daily pages can tell whether a stable counterpart exists.
// CI points DOCS_STABLE_DIST at the stable build output; without it every daily page assumes one exists.
function listStablePages(): string[] | undefined {
  const dir = process.env.DOCS_STABLE_DIST;
  if (!isDaily || !dir || !fs.existsSync(dir)) return undefined;
  return (fs.readdirSync(dir, { recursive: true }) as string[])
    .map((file) => file.replace(/\\/g, '/'))
    .filter((file) => file.endsWith('.html') && !file.startsWith('daily/'))
    .map((file) => file.replace(/\.html$/, ''));
}

export default defineConfig({
  base,
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/ShokoAnime/ShokoDocs',
      }),
      GitChangelogMarkdownSection({
        sections: {
          disableContributors: true,
        },
      }),
    ],
  },
  title: 'Shoko Docs',
  description: 'Resource Center for  the Shoko Suite',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico` }],
    ...(isDaily ? [['meta', { name: 'robots', content: 'noindex' }] as [string, Record<string, string>]] : []),
  ],
  themeConfig: {
    isDaily,
    stableUrl: SITE_URL,
    stablePages: listStablePages(),
    logo: '/images/logo.svg',
    outline: [2, 3],
    editLink: {
      pattern: `https://github.com/ShokoAnime/ShokoDocs/edit/${branch}/docs/:path`,
    },
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: isDaily ? 'Daily' : 'Stable',
        items: [
          { text: 'Stable', link: `${SITE_URL}/`, target: '_self' },
          { text: 'Daily', link: `${SITE_URL}/daily/`, target: '_self' },
        ],
      },
      {
        text: 'Latest News',
        link: 'https://shokoanime.com/blog',
      },
      {
        text: 'Downloads',
        link: 'https://shokoanime.com/downloads',
      },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          {
            text: 'Installing Shoko Server',
            link: '/getting-started/installing-shoko-server',
          },
          {
            text: 'Running Shoko Server',
            link: '/getting-started/running-shoko-server',
          },
          {
            text: 'Upgrading to Shoko 6',
            link: '/getting-started/upgrading-to-shoko-6',
          },
          {
            text: 'Available Programs & Plugins',
            link: '/getting-started/available-programs-plugins',
          },
        ],
      },
      {
        text: 'Shoko Server',
        collapsed: true,
        items: [
          {
            text: 'Dashboard',
            link: '/shoko-server/dashboard',
          },
          {
            text: 'Collection',
            link: '/shoko-server/collection',
          },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'Unrecognized Files',
                link: '/shoko-server/unrecognized-files',
              },
              {
                text: 'Release Management',
                link: '/shoko-server/release-management',
              },
              {
                text: 'Series Without Files',
                link: '/shoko-server/series-without-files',
              },
              {
                text: 'File Search',
                link: '/shoko-server/file-search',
              },
              {
                text: 'File Rename',
                link: '/shoko-server/file-rename',
              },
            ],
          },
          {
            text: 'Logs',
            link: '/shoko-server/logs',
          },
          {
            text: 'Actions',
            link: '/shoko-server/actions',
          },
          {
            text: 'Settings',
            collapsed: true,
            link: '/shoko-server/settings/',
            items: [
              { text: 'General', link: '/shoko-server/settings/general' },
              { text: 'Import', link: '/shoko-server/settings/import' },
              { text: 'Hashing & Release', link: '/shoko-server/settings/hashing-and-release' },
              { text: 'AniDB', link: '/shoko-server/settings/anidb' },
              { text: 'Metadata', link: '/shoko-server/settings/metadata' },
              { text: 'Collection', link: '/shoko-server/settings/collection' },
              { text: 'Integrations', link: '/shoko-server/settings/integrations' },
              { text: 'Scheduled Actions', link: '/shoko-server/settings/scheduled-actions' },
              { text: 'Plugin Management', link: '/shoko-server/settings/plugin-management' },
              { text: 'User Management', link: '/shoko-server/settings/user-management' },
              { text: 'API Keys', link: '/shoko-server/settings/api-keys' },
            ],
          },
          {
            text: 'Misc',
            collapsed: true,
            items: [
              {
                text: 'Understanding AniDB Bans',
                link: '/shoko-server/understanding-anidb-bans',
              },
              {
                text: 'WebUI Themes',
                link: '/shoko-server/webui-themes',
              },
              {
                text: 'Metadata Links',
                link: '/shoko-server/metadata-links',
              },
              {
                text: 'Metadata Features',
                link: '/shoko-server/metadata-features',
              },
              {
                text: 'Networking & Reverse Proxies',
                link: '/shoko-server/networking',
              },
            ],
          },
        ],
      },
      {
        text: 'Plex Integration',
        collapsed: true,
        items: [
          {
            text: 'Installing Agents & Scanners',
            link: '/plex/installing-agents-scanners',
          },
          {
            text: 'Configuring Shoko Metadata',
            link: '/plex/configuring-shoko-metadata',
          },
          {
            text: 'Configuring Shoko Relay',
            link: '/plex/configuring-shoko-relay',
          },
          {
            text: 'Shoko Relay Utility Scripts',
            link: '/plex/shoko-relay-utility-scripts',
          },
          {
            text: 'Syncing Watched States',
            link: '/plex/syncing-watched-states',
          },
        ],
      },
      {
        text: 'Jellyfin Integration',
        collapsed: true,
        items: [
          {
            text: 'Get Started',
            collapsed: false,
            items: [
              { text: 'Installing Shokofin', link: '/jellyfin/installing-shokofin' },
              { text: 'Quick Start', link: '/jellyfin/quick-start' },
            ],
          },
          {
            text: 'How-To Guides',
            collapsed: false,
            items: [
              { text: 'Docker & Reverse Proxies', link: '/jellyfin/how-to/docker-and-reverse-proxies' },
              { text: 'Re-create a Library Safely', link: '/jellyfin/how-to/re-create-a-library-safely' },
              { text: 'One Show for a Whole Franchise', link: '/jellyfin/how-to/one-show-for-a-whole-franchise' },
              { text: 'Use TMDB Seasons', link: '/jellyfin/how-to/use-tmdb-seasons' },
              { text: 'Separate Shows and Movies', link: '/jellyfin/how-to/separate-shows-and-movies' },
              { text: 'Titles & Artwork in Your Language', link: '/jellyfin/how-to/titles-and-artwork-in-your-language' },
              { text: 'Sync Watch State', link: '/jellyfin/how-to/sync-watch-state' },
              { text: 'New Episodes Automatically', link: '/jellyfin/how-to/new-episodes-automatically' },
              { text: 'Place Specials & Extras', link: '/jellyfin/how-to/place-specials-and-extras' },
              { text: 'Hide Episodes', link: '/jellyfin/how-to/hide-episodes' },
              { text: 'Include or Exclude Folders', link: '/jellyfin/how-to/include-or-exclude-folders' },
              { text: 'Choose the Default Version', link: '/jellyfin/how-to/choose-the-default-version' },
              { text: 'Ratings & Parental Controls', link: '/jellyfin/how-to/ratings-and-parental-controls' },
            ],
          },
          {
            text: 'Understanding Shokofin',
            collapsed: true,
            items: [
              { text: 'The Virtual File System', link: '/jellyfin/concepts/virtual-file-system' },
              { text: 'Media Folder Mapping', link: '/jellyfin/concepts/media-folder-mapping' },
              { text: 'Library Structures & Seasons', link: '/jellyfin/concepts/library-structures-and-seasons' },
              { text: 'Episode Types, Specials & Extras', link: '/jellyfin/concepts/episode-types-specials-and-extras' },
              { text: 'Titles, Descriptions & Images', link: '/jellyfin/concepts/titles-descriptions-and-images' },
              { text: 'Tags, Genres & Content Ratings', link: '/jellyfin/concepts/tags-genres-and-content-ratings' },
              { text: 'Watch State Sync', link: '/jellyfin/concepts/watch-state-sync' },
              { text: 'Real-Time Updates (SignalR)', link: '/jellyfin/concepts/real-time-updates' },
              { text: 'Collections, Playlists & Versions', link: '/jellyfin/concepts/collections-playlists-and-versions' },
            ],
          },
          {
            text: 'Reference',
            collapsed: false,
            items: [
              { text: 'Settings Reference', link: '/jellyfin/configuring-shokofin' },
              { text: 'Scheduled Tasks', link: '/jellyfin/scheduled-tasks' },
            ],
          },
          {
            text: 'Help',
            collapsed: false,
            items: [
              { text: 'Troubleshooting', link: '/jellyfin/troubleshooting' },
              { text: 'Best Practices', link: '/jellyfin/recommendations' },
            ],
          },
        ],
      },
      {
        text: 'Kodi Integration',
        collapsed: true,
        items: [
          {
            text: 'Installing Shokodi',
            link: '/kodi/installing-shokodi',
          },
          {
            text: 'Configuring Shokodi',
            link: '/kodi/configuring-shokodi',
          },
        ],
      },

      {
        text: 'Writing Plugins',
        collapsed: true,
        link: '/writing-plugins/',
        items: [
          { text: 'Your First Plugin', link: '/writing-plugins/getting-started' },
          { text: 'The Plugin Lifecycle', link: '/writing-plugins/plugin-lifecycle' },
          { text: 'Configuration & Secrets', link: '/writing-plugins/configuration' },
          { text: 'Form UI', link: '/writing-plugins/form-ui' },
          { text: 'Extension Points', link: '/writing-plugins/extension-points' },
          { text: 'Serving a Metadata Source', link: '/writing-plugins/metadata-sources' },
          { text: 'Actions & Background Work', link: '/writing-plugins/actions-and-jobs' },
          { text: 'Web APIs & Events', link: '/writing-plugins/web-apis-and-events' },
          { text: 'Storing Data', link: '/writing-plugins/storing-data' },
          { text: 'Publishing a Plugin', link: '/writing-plugins/publishing' },
          { text: 'Troubleshooting', link: '/writing-plugins/troubleshooting' },
          { text: 'Migrating from 5.x', link: '/writing-plugins/migrating-from-5x' },
        ],
      },

      {
        text: 'Renaming Plugins',
        collapsed: true,
        items: [
          {
            text: 'Available Renamers',
            link: '/renamer-plugins/available-renamers',
          },
          {
            text: 'WebAOM',
            collapsed: true,
            items: [
              {
                text: 'Getting Started',
                link: '/renamer-plugins/webaom/getting-started',
              },
              {
                text: 'Renaming',
                link: '/renamer-plugins/webaom/renaming',
              },
              {
                text: 'Moving',
                link: '/renamer-plugins/webaom/moving',
              },
            ],
          },
          {
            text: 'Lua Renamer',
            collapsed: true,
            items: [
              {
                text: 'Getting Started',
                link: '/renamer-plugins/lua/getting-started',
              },
              {
                text: 'Script Authoring',
                link: '/renamer-plugins/lua/script-authoring',
              },
              {
                text: 'FAQ',
                link: '/renamer-plugins/lua/faq',
              },
            ],
          },
        ],
      },
      {
        text: 'Changelog',
        collapsed: true,
        items: [
          {
            text: 'Shoko Server',
            link: '/changelog/shoko-server',
          },
          {
            text: 'Shoko WebUI',
            link: '/changelog/shoko-webui',
          },
          {
            text: 'Shoko Desktop',
            link: '/changelog/shoko-desktop',
          },
          {
            text: 'Shoko Metadata',
            link: '/changelog/shoko-metadata',
          },
          {
            text: 'Shoko Relay',
            link: '/changelog/shoko-relay',
          },
          {
            text: 'Shokofin',
            link: '/changelog/shokofin',
          },
          {
            text: 'My Anime 3',
            link: '/changelog/my-anime-3',
          },
        ],
      },
      {
        text: 'FAQ',
        link: '/faq',
      },
      {
        text: 'Contribute',
        link: '/contribute',
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ShokoAnime/',
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/vpeHDsg',
      },
    ],
  },
  markdown: {
    theme: {
      light: 'github-light-high-contrast',
      dark: 'github-dark-high-contrast',
    },
    config: (md) => {
      md.use(lightbox, {});
      md.use(taskLists);
      md.use(container, 'important', {
        render(tokens, idx) {
          const token = tokens[idx];
          const title = token.info.trim().slice('important'.length).trim();
          if (token.nesting === 1) {
            return `<div class="important custom-block"><p class="custom-block-title">${title ? title : 'Important'}</p>\n`;
          } else {
            return '</div>\n';
          }
        },
      });
    },
    container: {
      tipLabel: 'Tip',
      warningLabel: 'Warning',
      dangerLabel: 'Danger',
      infoLabel: 'Note',
      detailsLabel: 'Details',
    },
  },

  buildEnd(config) {
    generateOgImages(config);
  },

  transformHead({ pageData }) {
    const filename = pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/\//g, '_')
      .replace(/\s+/g, '-')
      .toLowerCase();

    const ogImageUrl = `${SITE_URL}${base}images/og-images/${filename}.png`;
    const url = `${SITE_URL}${base}${pageData.relativePath.replace(/\.md$/, '')}`;

    return [
      ['meta', { property: 'og:title', content: pageData.frontmatter.title || 'Shoko' }],
      ['meta', { property: 'og:description', content: pageData.frontmatter.description || 'Documentation' }],
      ['meta', { property: 'og:image', content: ogImageUrl }],
      ...(url ? [['meta', { property: 'og:url', content: url }]] : []),
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:title', content: pageData.frontmatter.title || 'Shoko' }],
      ['meta', { property: 'twitter:description', content: pageData.frontmatter.description || 'Documentation' }],
      ['meta', { property: 'twitter:image', content: ogImageUrl }],
    ];
  },
});
