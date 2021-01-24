+++ title = "Installing & Configuring My Anime 3"
description = "Information on how to install My Anime 3 plugin, a MediaPortal plugin."
aliases = ["/myanime3"]
layout = "single"
[[pageNav]]
navTitle = "Install & Config"
name = "Installing My Anime 3"
id = "installing-my-anime-3"
[[pageNav]]
name = "Initial Setup"
id = "initial-setup"
[[pageNav]]
name = "Main Settings"
id = "main-settings"
[[pageNav]]
name = "Display Settings"
id = "display-settings"
[[pageNav]]
name = "Other Settings"
id = "other-settings"
+++

## Is Shoko Server Mandatory?{.page-first-header}

My Anime 3 is not a standalone plugin and **requires Shoko Server** installed, configured and running in order to work
properly. If you haven't done this yet, [Download Shoko Server](https://shokoanime.com/downloads/) from our main website
and use the installation guides located in the menu on the left to properly install and configure Shoko Server.

{{< alert type="warning" heading="My Anime 3 - Future Development" >}} My Anime 3 is no longer in active development and
has entered maintenance mode. Any developers interested in further developing My Anime 3, please contact **Elemental
Crisis** on the Shoko Discord. {{< /alert >}}

### Installing My Anime 3

Like other MediaPortal plugins, My Anime 3 uses the MPEI installer, so you should already be familiar with how to
install plugins. Please note, My Anime 3 only supports the skins listed below.

While we have no plans to add support for additional skins, we'll always accept PR's on Github for new skins.

- Ares
- Avallanche
- Avalon
- Default Wide HD
- Streamed MP
- Titan

### Initial Setup

![MediaPortal Config](/assets/images/my-anime-3/MediaPortal-Config.jpg)

Once My Anime 3 has been installed, open the **MediaPortal Configuration** window and from the list of **plugins**,
select My Anime 3. Please note, Shoko Server will need to be running in order to make any changes.

We recommend going through each of the settings tab as there are a lot of unique options just for My Anime 3 and how it
functions in MediaPortal.

### Main Settings

![My Anime 3 - Main Screen](/assets/images/my-anime-3/My-Anime-3-Main.jpg)

Unless you're running MediaPortal on another computer or changed the port Shoko Server uses, the default settings do not
need to be changed. We also recommend using Shoko Server to **modify your import folders** to avoid potential problems.
Keep in mind, if running MediaPortal on another machine, you'll need to properly map the **Import Folder** path in **
Local Mapping**.

If **Ask before starting streaming playback** is checked, My Anime 3 will ask each time during file playback if you want
to stream the file. We recommend unchecking this box for users using MediaPortal and My Anime 3 on a different computer.

### Display Settings

![My Anime 3 - Display](/assets/images/my-anime-3/My-Anime-3-Display.jpg)

These are all **personal preference** settings that affect what you see and don't see in My Anime 3 so there is no right
or wrong way to configure them. You can also set the default audio language and subtitle language to avoid having to
change if the series you are watching doesnt't have the correct ones as default.

### Other Settings

![My Anime 3 - Other](/assets/images/my-anime-3/My-Anime-3-Other.jpg)

The Other section just contains a couple settings related to FFDShow processing. There really isn't a need to change the
defaults unless you want to increase or decrease the wait times for the listed setting.
