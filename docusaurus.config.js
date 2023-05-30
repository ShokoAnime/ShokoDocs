const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
	title: 'ShokoDocs',
	tagline: 'Anime Management Made Easy',
	favicon: 'img/favicon.ico',

	// TODO - Update the following once ready.
	url: 'https://your-docusaurus-test-site.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'facebook', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			(
				{
					docs: {
						sidebarPath: require.resolve('./sidebars.js'),
						showLastUpdateTime: true,
						routeBasePath: '/',
						// TODO - Update the following once ready.
						editUrl:
							'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
					},
					theme: {
						customCss: require.resolve('./src/css/custom.css'),
					},
				}
			),
		],
	],

	themeConfig:
		(
			{
				docs: {
					sidebar: {
						autoCollapseCategories: true,
					},
				},
				// TODO - Update the following once ready.
				// Replace with your project's social card
				image: 'img/docusaurus-social-card.jpg',
				navbar: {
					title: `Shoko Docs`,
					logo: {
						alt: 'My Site Logo',
						className: 'shoko-icon',
						src: 'img/logo.svg',
						srcDark: 'img/logo.svg',
					},
					items: [
						{
							to: 'https://shokoanime.com/blog',
							label: 'Blog',
							position: 'right',
						},
						{
							to: 'https://shokoanime.com/downloads',
							label: 'Downloads',
							position: 'right',
						},
						{
							to: 'https://discord.gg/vpeHDsg',
							label: 'Discord',
							position: 'right',
							className: 'custom-icon icon-discord',
						},
						{
							to: 'https://github.com/ShokoAnime/ShokoDocs',
							label: 'GitHub',
							position: 'right',
							className: 'custom-icon icon-github',
						},
					],
				},
				footer: {
					copyright: `Copyright © ${new Date().getFullYear()} Shoko Docs. Built with Docusaurus.`,
				},
				prism: {
					theme: lightCodeTheme,
					darkTheme: darkCodeTheme,
				},
			}
		),
};

module.exports = config;
