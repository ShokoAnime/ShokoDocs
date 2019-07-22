+++
title = "My Anime 3 - Install"
lastMod = 2019-04-22

[[pageNav]]
navTitle = "Getting Started"
name = "Is Shoko Server Mandatory?"
id = "is-shoko-server-mandatory"
[[pageNav]]
name = "Getting Ready "
id = "getting-ready"
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

markup = "mmark"
+++

## Is Shoko Server Mandatory?

The short answer is **Yes**.

Shoko Server is the back-end of the entire Shoko suite, which means every single program and plugin provided uses it for accessing and maintaining your anime collection. This makes Shoko Server **mandatory** and also means Shoko Server **must be running** to use any of the programs or plugins that connect to it. With the exception of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background so you don't need to worry about Shoko Server eating up resources.

## Getting Ready
If you haven't already done so, you'll need to download My Anime 3, and then run the MPEI installer. The MPEI is designed by the Media Portal team and makes installing plugins simple and is pretty straight forward. Select the skins you want to install support for, if unsure you can leave them all checked.

My Anime 3 only supports the following skins. While we have no plans to add support for additional skins, we'll always accept PR's on Github for new skins.

- Ares
- Avallanche
- Avalon
- Default Wide HD
- Streamed MP
- Titan

## Initial Setup

{{< page-column image-url="/assets/images/myanime3/MediaPortal-Config.jpg" image-alt="MediaPortal Config" >}}

Once My Anime 3 has been installed, open the **MediaPortal Configuration** window and from the list of **plugins**, select My Anime 3. Please note, Shoko Server will need to be running in order to make any changes.

We recommend going through each of the settings tab as there are a lot of unique options just for My Anime 3 and how it functions in MediaPortal.

{{< /page-column >}}

## Main Settings

{{< page-column image-url="/assets/images/myanime3/My-Anime-3-Main.jpg" image-alt="My Anime 3 - Main Screen" >}}

As the name suggests, the settings in the Main section are vital for My Anime 3 to work properly.

Unless you're running MediaPortal on another computer or changed the port Shoko Server uses, the default settings do not need to be changed. We also recommend using Shoko Server to **modify your import folders** to avoid potential problems. Keep in mind, if running MediaPortal on another machine, you'll need to properly map the **local path**. Depending on if you have the option checked or not, you'll either be asked to steam the file instead of playing it locally or it will automatically be streamed.

{{< /page-column >}}

## Display Settings

{{< page-column image-url="/assets/images/myanime3/My-Anime-3-Display.jpg" image-alt="My Anime 3 - Display" >}}

Settings in the Display section will dictate how information and images are displayed within My Anime 3.

These are all **personal preference** settings that affect what you see and don't see in My Anime 3 so there is no right or wrong way to configure them. You can also set the default audio language and subtitle language to avoid having to change if the series you are watching doesnt't have the correct ones as default.

{{< /page-column >}}

## Other Settings

{{< page-column image-url="/assets/images/myanime3/My-Anime-3-Other.jpg" image-alt="My Anime 3 - Other" >}}

The Other section just contains a couple settings related to FFDShow processing. There really isn't a need to change the defaults unless you want to increase or decrease the wait times for the listed setting.

{{< /page-column >}}