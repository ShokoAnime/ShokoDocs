---
title: Web UI Themes
description: Overview of the how themes work in Shoko.
---

<script setup>
const osLocationColumns = [
  { name: 'OS', header: 'OS' },
  { name: 'Location', header: 'Location' }
];

const osLocationData = [
  {
    OS: 'Windows',
    Location: 'C:\\ProgramData\\ShokoServer\\themes'
  },
  {
    OS: 'Linux/macOS',
    Location: '~/.shoko/Shoko.CLI/themes'
  }
];

const jsonThemeColumns = [
  { name: 'Key', header: 'Key' },
  { name: 'Description', header: 'Description' }
];

const jsonThemeData = [
   {
      Key: 'name',
      Description: 'The name of your theme'
    },
    {
      Key: 'version',
      Description: 'The version string, preferred format is X.X.X to keep it simple.'
    },
    {
      Key: 'author',
      Description: 'Author of the theme.'
    },
    {
      Key: 'description',
      Description: 'Description of the theme.'
    },
    {
      Key: 'tags',
      Description: 'List of tags for the theme. A single tag for the type (dark, light, OMLED) and colors (red, blue, green).'
    },
    {
      Key: 'cssUrl',
      Description: 'URL to where the CSS file is hosted.'
    },
    {
      Key: 'updateUrl',
      Description: 'URL to where this file is located. Used for installing and auto-updates.'
    },
];

</script>

# Web UI Themes

Shoko by default includes a fully customizable theme system that allows users to change the look and feel of the Web UI
to their liking. This eliminates the need for third-party plugins like Stylus and allows users to easily create and if
desired, share their themes with the community.

## Understanding Custom Themes

In Shoko, a single theme consists of one or two files, a JSON file that contains the theme information and a CSS file
that contains the styling. If you're developing a local theme, you only need the CSS file, as the JSON file is only
required for sharing themes with the community. Both files are stored in the **themes** folder located in one of the
following directories depending on your operating system.

<EasyTable :columns="osLocationColumns" :data="osLocationData" />

Please note, unless manually installing themes, we recommend using the Web UI to install themes as it simplifies the
process and ensures the theme is correctly installed.

## Downloading & Installing Themes

Web UI Themes are available from our website and can be downloaded from the [Web UI Themes](https://shokoanime.com/downloads/webui-themes)
page. Please note, themes downloaded from the Shoko website are only the JSON file with the CSS file being downloaded
when the theme is installed.

Once you've downloaded your theme, you can install it using the Web UI. Follow the steps below to install your theme.

1. Open the Web UI and navigate to the **Settings** section.
2. Select **General** from the menu.
3. Under **Theme Options**, click the **Upload Theme** button.
4. Select the theme file you downloaded.

:::tip About Installing Themes
Themes are auto-applied once imported, but the settings are not yet saved! Press **Save** if you want to save your new
theme as the theme to use.
:::

## Creating Your Own Theme

Creating a custom theme is a straightforward process that requires you to create one or two files, a JSON file that
contains the theme information and a CSS file that contains the styling. Both files are stored in the **themes**
folder, refer to the locations above for the correct directory.

We **highly** recommend using the templates below to create your custom theme. If you plan to share your theme with the
community, you'll need to use both the JSON and CSS templates. If you're creating a local theme, you only need the CSS
template.

:::info File Names
Be sure to name the files you intend to use using only alphanumeric characters, dashes (\-), or underscores (\_). If you
need spacing between words, then use dashes (\-).
:::

### Theme Template

Below is a template you can use to create your custom theme. Make sure your theme includes both the JSON and CSS files,
otherwise it will not work correctly. We also recommend naming both files the same for easy identification, though this
is not required as the value for the **css** key in the JSON file is used to identify the CSS file.

:::tip HEX Values Not Required
While we use HEX values in the example below and in the default Shoko theme, you can use any valid CSS color value.
:::

:::details Theme JSON Example

```json
{
  "name": "Theme Name",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Description",
  "tags": ["dark", "red", "blue", "green"],
  "cssUrl": "./theme-name.css",
  "updateUrl": "Repo URL"
}
```

<EasyTable :columns="jsonThemeColumns" :data="jsonThemeData" />
:::

:::details Theme CSS Example

```css
& {
  --button-danger: #ff5252;
  --button-danger-border: #0b0e17;
  --button-danger-hover: #fa7676;
  --button-danger-text: #010f1c;
  --button-primary: #3b82f6;
  --button-primary-border: #0b0e17;
  --button-primary-hover: #64b3ff;
  --button-primary-text: #010f1c;
  --button-secondary: #313946;
  --button-secondary-border: #0b0e17;
  --button-secondary-hover: #404a59;
  --button-secondary-text: #cfd8e3;
  --header-background: #191f2c;
  --header-icon: #cfd8e3;
  --header-icon-primary: #3b82f6;
  --header-text: #cfd8e3;
  --header-text-important: #06c270;
  --header-user-background: #3b82f6;
  --header-user-text: #010f1c;
  --panel-background: #191f2c;
  --panel-background-alt: #171c28;
  --panel-background-selected-row: #243148;
  --panel-background-overlay: #212f3de5;
  --panel-background-poster-overlay: #212f3de5;
  --panel-background-transparent: #191f2ca6;
  --panel-border: #0b0e17;
  --panel-icon: #cfd8e3;
  --panel-icon-action: #3b82f6;
  --panel-icon-danger: #ff5252;
  --panel-icon-important: #06c270;
  --panel-icon-warning: #f1c40f;
  --panel-input: #121823;
  --panel-menu-item-background: #0f355a;
  --panel-menu-item-background-hover: #283e61;
  --panel-menu-item-text: #a9d5ff;
  --panel-table-header: #0d141f;
  --panel-tags: #3f4762;
  --panel-text: #cfd8e3;
  --panel-text-danger: #ff5252;
  --panel-text-important: #06c270;
  --panel-text-other: #ac72f5;
  --panel-text-primary: #3b82f6;
  --panel-text-warning: #f1c40f;
  --panel-toggle-background: #0f355a;
  --panel-toggle-background-alt: #6e8aa61a;
  --panel-toggle-background-hover: #283e61;
  --panel-toggle-text: #a9d5ff;
  --panel-toggle-text-alt: #cfd8e3;
  --slider-background: #0b0e17;
  --slider-background-alt: #171c28;
  --slider-color: #3b82f6;
  --slider-color-alt: #3b82f6;
  --topnav-background: #101723;
  --topnav-border: #0b0e17;
  --topnav-icon: #cfd8e3;
  --topnav-icon-important: #06c270;
  --topnav-icon-primary: #cfd8e3;
  --topnav-icon-warning: #f1c40f;
  --topnav-text: #cfd8e3;
  --topnav-text-primary: #3b82f6;
  --logo-outline: #000;
  --logo-skin: #fdf5e8;
  --logo-face-shadow: #fe514d;
  --logo-eye-ref1: #e3e4d6;
  --logo-eye-ref2: #e8c8bb;
  --logo-eye-ref3: #ffc2b2;
  --logo-eye-gradient1: #ae303b;
  --logo-eye-gradient2: #ec4050;
  --logo-eye-gradient3: #fd877d;
  --logo-hair-gradient1: #c33144;
  --logo-hair-gradient2: #6b8cdb;
  --logo-hair-gradient3: #79f0f8;
}
```

:::

### Transparency With Hex Colors

When using Hex colors, you can append a two-digit HEX code to the end of your HEX value to specify the desired opacity
for a variable. In the template provided above, variables like **panel-background-overlay** and
**panel-background-transparent** utilize this method to apply opacity.

The [following site](https://davidwalsh.name/hex-opacity) provides a comprehensive list of values and their corresponding HEX codes you can use.

## Sharing Your Theme

If you’ve made a theme and want to share it, you can submit it to the Shoko Website by following these simple steps:

1. Fork the [Shoko Website repository](https://github.com/ShokoAnime/ShokoSite) by clicking the **Fork** button at the top right.
2. Add your theme files, place both the JSON and CSS files for your theme in the `public/themes` folder.
3. Create a theme info file:
   - Go to the `app/content/downloads/webui-themes` folder.
   - Copy an existing `.mdx` file, rename it to match your theme’s name, and update the information inside to describe your theme.
4. Add images for your theme. put the theme images in the `/images/downloads/webui-themes/` folder. Name the images the same as your theme and make sure to blur any posters shown in them.
5. Submit your changes: Create a pull request with your changes and wait for it to be reviewed and merged.

That’s it! Your theme will be available once the pull request is approved.

:::info Getting Help
If you're having issues with uploading your theme, feel free to ask for help in the [Shoko Discord server](https://discord.gg/shokoanime)
and we can help you get your theme uploaded and shared with the community.
:::
