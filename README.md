# Shoko Docs - Resource Center for the Shoko Suite

This repository contains the source code for the Shoko Docs Resource Center, which provides comprehensive documentation
and resources for the Shoko suite of programs and plugins.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Adding New Content](#adding-new-content)
  - [Documentation Pages](#adding-new-documentation-pages)
  - [Editing Existing Documentation](#editing-existing-documentation)
  - [Your Program or Plugin](#your-program-or-plugin)
- [Built With](#built-with)
- [Contact](#contact)

## Overview

The Shoko Docs Resource Center serves as a central hub for documentation about the Shoko suite of programs and plugins.
It provides detailed guides, API references, and tutorials for users and developers working with Shoko-related projects.

## Installation

To set up the development environment for the Shoko Docs:

```bash
# Clone the repository
git clone https://github.com/ShokoAnime/shoko-docs.git

# Navigate to the project directory
cd shoko-docs

# Install dependencies
pnpm install
```

## Usage

The project includes the following npm scripts:

```json
"scripts": {
"docs:dev": "vitepress dev docs",
"docs:build": "vitepress build docs",
"docs:preview": "vitepress preview docs"
}
```

To start the development server:

```bash
pnpm docs:dev
```

After starting the development server, you can access the documentation site locally at http://localhost:5173. Make
changes to the content and see them reflected in real-time.

To build the documentation site for production:

```bash
pnpm docs:build
```

To preview the production build:

```bash
pnpm docs:preview
```

## Adding New Content

We welcome contributions to improve and expand the Shoko documentation. Here's how you can add new content:

### Adding New Documentation Pages

Documentation pages are written in Markdown format and are located in the docs directory. To add a new page:

- Create a new .md file in the appropriate subdirectory of the docs folder
- Use existing documentation pages as a reference for structure and formatting
- Write your content using Markdown syntax
- Update the sidebar configuration in .vitepress/config.js if necessary
- Submit a pull request with your new documentation page

### Editing Existing Documentation

If you find any errors or outdated information in the existing documentation, feel free to submit a pull request with
the necessary changes. You can find the edit link for each page at the bottom of the page itself.

### Your Program or Plugin

If you have a program or plugin that integrates with Shoko and would like to add documentation for it:

- Create a new directory in `docs` with the name of your program/plugin.
- Structure it so that it follows the same structure as the rest of the documentation.
- If applicable, provide screenshots, code snippets, and examples to make the documentation more informative.

## Built With

- [VitePress](https://vitepress.dev/)
- [Vue.js](https://vuejs.org/)
- [Markdown](https://www.markdownguide.org/)

## Contact

The best way to get in touch with the Shoko team is via our Discord server.

Shoko Team - [Discord Server](https://discord.gg/vpeHDsg)
