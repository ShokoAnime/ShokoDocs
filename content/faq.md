+++
title = "Frequently Asked Questions"
lastMod = 2019-04-12
layout = "faq"
markup = "mmark"
+++

The following are frequent questions we've compiled in one place to better help our users. For more in-depth information on a particular subject, we suggest checking the related page (if available) in the documentation. Additional support can be found by joining our Discord server using the **Support** link located at the bottom of the left navigation menu.

<!--- General --->

## General

{{% faq type="general" id="linux-support" question="Does Shoko Run On Linux?" %}}

Yes it Does!

Using {{< external-link link="https://www.docker.com/" text="Docker" >}} you can run **Shoko Server** natively on Linux. We've created a [Linux Install Guide](/linux) that we highly recommend all Linux users follow to properly install Shoko Server. If needed, additional support can be found by visiting our **Discord Server**. 

Please keep in mind that Shoko Server on Linux is still in beta so issues are to be expected."

{{% /faq %}}

{{% faq type="general" id="anidb-ban" question="I've Been Banned From AniDB?" %}}

The banned message you’re seeing is simply telling you that you’ve been **temporarily banned** for excessive connection attempts. AniDB will sometimes temporarily ban a user if their system thinks you are attempting to leech data by making excessive connection attempts within seconds. In reality you’ve done nothing wrong and just need to wait out the ban which can last anywhere from 15 minutes to 24 hours depending on the severity. Also keep in mind that browsing AniDB while Shoko is scraping and downloading data can also increase the chance of getting a temporary ban as your creating more connection attempts.

There are two different ban types, **HTTP or UDP** that a user can get that's based on AniDB's API. If a user is temporarily banned from one, Shoko will automatically stop sending data associated with that API but will continue to use the other API when possible. This does not mean all your commands will go through as each API sends and receives different data so you may notice your queue idling even though there are commands waiting to be processed.

We're always making improvements to our rate limiter to avoid users getting a temporary ban. If you find yourself getting banned, join our **Discord Server** so we can help diagnose the problem and make the experience smoother for you.

{{% /faq %}}

{{% faq type="general" id="site-streaming" question="Does Shoko Support Streaming From Different Websites?" %}}

No, Shoko does not support streaming directly from websites such as Crunchy Roll.

{{% /faq %}}

{{% faq type="general" id="collection-streaming" question="Does Shoko Allow Me To Stream My Collection" %}}

Yes it does!

Users can stream their anime collection to any Shoko supported program. While the majority of the work is done for you, there are a few things you'll need to do in order to start streaming. First make sure ports **8111** and **8112** are forwarded to allow outside access to Shoko. If using Shoko Desktop on another computer, make sure you're using one of the supported video players listed in **Settings And Video Players**.

{{% /faq %}}

{{% faq type="general" id="download-anime" question="Can Shoko Download Anime?" %}}

No, Shoko does not provide a way for the user to download anime anymore.

While originally supported, this feature was removed to distance the Shoko team from any sort of legal actions for providing a method to download anime.

{{% /faq %}}

{{% faq type="general" id="backup-collection" question="How Do I Backup My Collection?" %}}

While we currently do not offer a solution to backup your database whenever you'd like, we do automatically backup your database before updating Shoko to the latest version. If you need to restore an older version you'll find your backups in the following locations.

{.table .table-bordered}
| OS	  | Backup Location |
| ------- |-----------------| 
| Windows | %ProgramData%\ShokoServer\DatabaseBackup | 
| Linux	  | ~/.shoko/<instance>/DatabaseBackup       |


{{% /faq %}}

<!--- Shoko Server --->

{.faq-type-wrapper}
## Shoko Server

{{% faq type="server" id="server-start" question="After Fresh Install, Shoko Server Will Not Start!" %}}

Some users have reported being unable to start Shoko Server after a fresh install, usually the issue is related to user permissions in **/ProgramData/ShokoServer** and issues with the **urlacl** not being added properly. We've created a .BAT file called **FixPermissions.bat** that is located in your Shoko Server install directory, close Shoko and run that file.

If you are still having issues after running the .BAT file, please join our **Discord Server** so we can provided additional assistance.

{{% /faq %}}

{{% faq type="server" id="import-issues" question="My Files Are Not Being Imported!" %}}

There are a number of possible reasons why you're files are not being imported. First, double-check your import folder settings and make sure you’ve selected the correct options that reflects your setup. If everything looks correct and running the **Run Import** action still fails to properly import your files then what's likely happening is one of two things. The files have been imported but the crc32 value does not match any files on AniDB or there were errors during the hashing process and Shoko server was unable to get the hash and compare it.

Using **Shoko Desktop**, navigate to **Utilities > Unrecognized Files** and if your files are showing up there, you can manually link them to the correct episode. if Shoko server was unable to get the hash, make sure no other program is accessing the files in question and try again by clicking **Run Import**.

{{% /faq %}}

{{% faq type="server" id="cloud-hosting" question="What Cloud Hosting Providers Are Supported?" %}}

Shoko currently supports the following Cloud hosts. If your cloud host is not listed below you can always request support for it by creating an issue on github.

- Amazon Cloud Drive
- Google Drive
- One Drive

{{% /faq %}}

{{% faq type="server" id="mix-providers" question="Can I Mix & Match Providers?" %}}

At this time, **you are unable to mix and match different providers**.

Each provider is treated as it's own set which means its not possible to use a drop source from your local provider with a drop destination from a cloud provider.

{{% /faq %}}

{{% faq type="server" id="change-drop-destination" question="Can I Change My Drop Destination?" %}}

Yes, you are able to change your **Drop Destination** as many times as you want to fit your current setup. However please note that files located in your previous **Drop Destination** are not automatically moved into your **new Drop Destination** so its possible a series may be split and located in multiple folders.

{{% /faq %}}

{{% faq type="server" id="db-support" question="Why Was Support For MySQL / SQL Server Dropped?" %}}

Previously, Shoko did support both MySQL and SQL Server as possible database options due to multiple issues such as database access times and overall speed that were present when using an SQLite database with a large collection. Starting with **Version 3.6**, we've been steadily making improvements to address these issues that the benefits once provided by MySQL and SQL Server are now negligible. To that end and to reduce unrelated issues that could arise when using MySQL or SQL Server, support for MySQL and SQL Server as a database option has been deprecated and the option to select either of them has been removed.

{{% /faq %}}

{{% faq type="server" id="update-db-info" question="I Use MySQL / SQL Server, How Do I Update My DB Info?" %}}

Navigate to **C:\ProgramData\ShokoServer** and open the file labeled **settings.json**. You'll need to update the DB specific properties depending on what DB you use.

**MySQL Settings**

{.table .table-bordered}
| Property         | Property Value |
| --------------   | -------------- |  
| DatabaseType     | MySQL |
| MySQL_Hostname   | Default is localhost. If your MySQL DB is on another computer, use that IP. |
| MySQL_SchemaName | The name you gave to the Database. |
| MySQL_Username   | Either the MySQL root account or the account you created. |
| MySQL_Password   | The password you selected. |

**SQL Server Settings**

{.table .table-bordered}
| Property             | Property Value |
| -------------------  | -------------- |  
| DatabaseType         | SQL Server |
| SQLServer_Hostname   | Default is localhost. If your SQL Server DB is on another computer, use that IP. |
| SQLServer_SchemaName | The name you gave to the Database. |
| SQLServer_Username   | Either the SQLServer root account or the account you created. |
| SQLServer_Password   | The password you selected. |

{{% /faq %}}

<!--- Shoko Desktop --->

{.faq-type-wrapper}
## Shoko Desktop

{{% faq type="desktop" id="groups" question="What Are Groups?" %}}

Groups allow you to organize and visually stack multiple series, movies, and ova's into one single viewable entry in your collection regardless of where and how the files in that group are organized.

A majority of anime have at least one type of related item such as an ova, movie or sequel. Using a group allows the main item and it's related items to be grouped together into one listing reducing multiple entries for the same series. if enabled, Shoko can do all this automatically for you by pulling all related series information from AniDB and creating groups for any anime series and it's related items. You're also able to specify which types of relations you'd like excluded from auto-grouping allowing you to further fine-tune your collection.

{{% /faq %}}

{{% faq type="desktop" id="community-links" question="How Does Community Linking Work?" %}}

During the import process and depending on what **Community Sites** the user has enabled, Shoko will attempt to automatically link a series with these sites. By default, **AniDB** and **The TvDB** are automatically linked as Shoko uses these sites to pull metadata for use in your collection.

For more in-depth information, please read the Community Sites section in Shoko Desktop part of the docs.

{{% /faq %}}

{{% faq type="desktop" id="files-stream" question="My Files Are Being Streamed Instead Of Played Locally!" %}}

Shoko will automatically stream your files during playback if the local path for the import folder is incorrect. Navigate to the **Server Tab**, double-click on one of your Import Folders and add the local path to the folder. Keep in mind, the local path is the **path to that folder from the computer Shoko Desktop is on**. For best results and to avoid unforeseen issues, do not used mapped network drives, use the actual network path.

{{% /faq %}}

<!--- Shoko on Plex --->

{.faq-type-wrapper}
## Shoko on Plex

{{% faq type="shokoPlex" id="access-error" question="I Keep Getting An 401: Unauthorized Error Message" %}}

There are a number of reason you might be receiving this error message, we've outlined some of the most common reasons below.

**Shoko Server Is Unreachable**

If your accessing Shoko Server over your network or the internet you need to make sure you've opened the port Shoko Server uses which is 8111.

**Your Plex Username Has A Space In It**

If your Plex username has a pace in it, you'll not be able to load the channel, instead remove any spaces, reload Plex and try again.

{{% /faq %}}

<!--- Anime Buddy --->

{.faq-type-wrapper}
## Anime Buddy

{{% faq type="animeBuddy" id="anime-buddy-discontinued" question="What Happened to Anime Buddy?" %}}

Anime Buddy was discontinued due to lack of interest from the development team and our inability to update it on the Windows Store due. Additionally, even a simple update to get Anime Buddy working with Shoko would require a lot of work that we decided would be better spent working and improving Shoko itself.

You can read the {{< external-link link="https://shokoanime.com/blog/anime-buddy-discontinued/" text="Blog post" >}} for more information.

{{% /faq %}}