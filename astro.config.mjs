import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ShokoDocs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			editLink: {
				baseUrl: 'https://github.com/ShokoAnime/ShokoDocs',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Getting Started',
					// Autogenerate a group of links for the 'getting-started' directory.
					autogenerate: { directory: 'getting-started' },
				},
			],
			components: {
				TableOfContents: './src/components/TableOfContents.astro',
			},
		}),
	],
});
