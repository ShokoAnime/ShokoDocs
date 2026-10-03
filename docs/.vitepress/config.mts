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
            link: '/shoko-server/settings',
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
                text: 'TMDB Features',
                link: '/shoko-server/tmdb-features',
              },
              {
                text: 'Database Conversion',
                link: '/shoko-server/database-conversion',
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
            text: 'Installing Shokofin',
            link: '/jellyfin/installing-shokofin',
          },
          {
            text: 'Configuring Shokofin',
            link: '/jellyfin/configuring-shokofin',
          },
          {
            text: 'Recommendations',
            link: '/jellyfin/recommendations',
          },
          {
            text: 'Scheduled Tasks',
            link: '/jellyfin/scheduled-tasks',
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
    theme: 'github-dark-high-contrast',
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
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:title', content: pageData.frontmatter.title || 'Shoko' }],
      ['meta', { property: 'twitter:description', content: pageData.frontmatter.description || 'Documentation' }],
      ['meta', { property: 'twitter:image', content: ogImageUrl }],
    ];
  },
});
