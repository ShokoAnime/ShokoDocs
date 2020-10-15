+++
title = "Shoko Server - Windows Setup"
lastMod = 2019-04-24

[[pageNav]]
navTitle = "Getting Started"
name = "Install & First Run"
id = "install-first-run"
[[pageNav]]
name = "Inputting Your AniDB Account"
id = "inputting-your-anidb-account"
[[pageNav]]
name = "Setting Up Import Folders"
id = "setting-up-import-folders"
[[pageNav]]
name = "Additional Configuration"
id = "additional-configuration"

markup = "mmark"
+++

## Is Shoko Server Mandatory?

The short answer is **Yes**.

Shoko Server is the back-end of the entire Shoko suite, which means every single program and plugin provided uses it for accessing and maintaining your anime collection. This makes Shoko Server **mandatory** and also means Shoko Server **must be running** to use any of the programs or plugins that connect to it. With the exception of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background so you don't need to worry about Shoko Server eating up resources.

## Install & First Run

{{< alert type="primary" heading="Server GUI and WebUI" >}}

Starting with **Version 4.0**, server no longer has native Windows GUI, for configuration and installation please refer to [WebUI section](/server/webui/).

{{< /alert >}}

If you haven't already done so, you'll need to download [Shoko Server](http://shokoanime.com/downloads/#stable-releases), and then install it. The installer was designed to be pretty straight forward so just follow the directions until you're done. Please note, Administrator rights are required to install and for the initial run, however after that you can run as a normal use.

Shoko Server stores all your collection metadata in an SQLite database which is created by default the first time you run Shoko Server. This file is located in **%ProgramData%\\ShokoServer\\SQLite** and is automatically maintained by Shoko so you don't need to anything after its been created.

{{< alert type="primary" heading="Concerning MySQL and SQL Server" >}}

Previously, Shoko did support both MySQL and SQL Server as possible database options due to multiple issues such as database access times and overall speed that were present when using an SQLite database with a large collection. Starting with **Version 3.6**, we've been steadily making improvements to address these issues that the benefits once provided by MySQL and SQL Server are now negligible. To that end and to reduce unrelated issues that could arise when using MySQL or SQL Server, support for MySQL and SQL Server as a database option has been deprecated and the option to select either of them has been removed.

Users who are currently using either MySQL or SQL Server can still edit their database information by directly editing **settings.json** located in **%ProgramData%\\ShokoServer**.

{{< /alert >}}

## Inputting Your AniDB Account

{{< page-column image-url="/assets/images/server/Shoko-Server-Settings.jpg" image-alt="Shoko Server - Settings Tab" >}}

With Shoko Server installed and your database created and configured, its time to configure the essential settings. If you're looking for a more in-depth explanation of each function, use the menu on the left and under **Configuring Shoko Server** select the tab you're looking for more information on.

The first thing you probably noticed after your database was done was a pop-up asking you to input your **AniDB Username**and your **AniDB Password**. If you haven't already done so, input them and click the **Test & Save Login** button. An AniDB account is required to use Shoko, if you don't have one you'll need to {{< external-link link="https://anidb.net/perl-bin/animedb.pl?show=signup" text="Create an Account" >}} which should only take a couple of minutes.

{{< alert type="primary" heading="Why Do I Need An AniDB Account?" >}}

AniDB is one of the biggest information databases for anime and stores every file hash a user submits. When Shoko hashes your files, these hashes are compared with the ones from AniDB and when matched, if provides Shoko with all the information related to that series.

**Shoko does not send any personal information to AniDB nor do they require it.**

{{< /alert >}}

{{< /page-column >}}

## Setting Up Import Folders

{{< page-column image-url="/assets/images/server/Shoko-Server-Import-Folders.jpg" image-alt="Shoko Server - Import Folders Tab" >}}

Import Folders are the physical locations of where your files are. This means two things, they **must be accessible by Shoko Server** and they are **always online**. If using **removable media**, make sure its connected before running any **import functions** or **file checking functions** to avoid Shoko removing the entries from your collection database.

There are **two different Import Folder Systems** you can use. The first is **Single Folder** which has Shoko add the contents of the folder to your collection. The second is **Drop Source/Destination** which has Shoko move files from the **Drop Source** into the **Drop Destination**. You can use both of these systems at the same time and/or use them both for the same import folder.

Click **New Folder** to open the **Import Folder Window**, select the provider for the import folder and then select the location. Decide on the **Import Folder System** you'll be using for this Import Folder and then click the **Save** button to add the Import Folder. If you need to add additional folders then make sure to do that as well before moving on.

For in-depth information on Import Folders and how they work, check the [Import Folders](../config) documentation.

{{< /page-column >}}

## Additional Configuration

This install and setup guide is only meant to cover the minimal requirements required to get Shoko Server up and running. However, Shoko does provide fine-grained options for those who are not satisfied with the default settings. We **highly recommend** going through all the available options in Shoko Server, Shoko Server Web UI and Shoko Desktop to fully fine-tune Shoko and your collection.

[Shoko Server - Configure Settings](../config)

