import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
				github: "https://github.com/ShokoAnime"
			},
			editLink: {
				baseUrl: "https://github.com/ShokoAnime/ShokoDocs"
			},
			lastUpdated: true,
			components: {
				PageSidebar: "./src/components/PageSidebar.astro",
			},
			customCss: [
				'./src/styles/custom.css',
				'@fontsource-variable/lexend-deca',
			],
			sidebar: [
				{
					autogenerate: {
						directory: "getting-started"
					},
					label: "Getting Started"
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
								{ label: 'Unrecognized Files', link: '/shoko-server/utilities/unrecognized-files'},
								{ label: 'Series Without Files', link: '/shoko-server/utilities/series-without-files'},
								{ label: 'File Search', link: '/shoko-server/utilities/file-search'},
							],
						},
						{
							label: 'Misc',
							items: [
								{ label: 'Understanding AniDB Bans', link: '/shoko-server/anidb-ban'},
								{ label: 'Web UI Themes', link: '/shoko-server/themes'},
							],
						},
					],
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
				},
			],
		}),
		astroExpressiveCode({
			themes: ['dracula-soft'],
		}),
		react()
	],
});
