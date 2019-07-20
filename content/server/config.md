+++
title = "Shoko Server - Configure Settings"
lastMod = 2019-04-24

[[pageNav]]
navTitle = "Actions Tab"
name = "What Are Actions?"
id = "what-are-actions"
[[pageNav]]
name = "Available Actions"
id = "available-actions"
[[pageNav]]
navTitle = "Import Folders Tab"
name = "What Are Import Folders?"
id = "what-are-import-folders"
[[pageNav]]
name = "How Long Will Importing Take?"
id = "how-long-will-importing-take"
[[pageNav]]
name = "Adding A New Import Folder"
id = "adding-a-new-import-folder"
[[pageNav]]
navTitle = "Cloud Tab"
name = "Supported Cloud Hosts"
id = "supported-cloud-hosts"
[[pageNav]]
name = "Adding A Cloud Host"
id = "adding-a-cloud-host"
[[pageNav]]
navTitle = "Integrity Tab"
name = "What Is An Integrity Check?"
id = "what-is-an-integrity-check"
[[pageNav]]
name = "Adding An Integrity Check"
id = "adding-an-integrity-check"
[[pageNav]]
navTitle = "Settings Tab"
name = "Available Settings"
id = "available-settings"
[[pageNav]]
name = "Shoko Server Web UI"
id = "shoko-server-web-ui"

markup = "mmark"
+++

## What Are Actions?

{{< page-column image-url="/assets/images/server/Shoko-Server-Actions.jpg" image-alt="Shoko Server - Actions Tab" >}}

By default, all tasks related to maintaining and updating your collection are done automatically. By default, every task runs on a **timer**, these timers determine how often certain data sets are updated which in most cases, works just fine. However, for various reasons you may need to run one of these tasks manually which is made possible by using an **Action**. Most actions are comprised of multiple related tasks with the action name relating to the task or tasks it performs.

While manually running task provides a finer control over your collection, there are a few things to remember.

- Actions are stackable and are added to your queue.
- The time required to finish a task depends on your collection size and the task itself.
- Its not possible to cancel a single task, clicking the cancel button will cancel all remaining tasks.
- The Commands Toolbar at the bottom keeps track of your remaining tasks while showing the tasks being executed.

{{< /page-column >}}

## Available Actions

Below are the available **Actions** that can be run manually along with their description.

<table class = "table table-bordered">
<thead>
<tr>
    <th width = "20%">Available Actions</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Run Import</td>
    <td>Scans your <strong>Local</strong> and <strong>Cloud</strong> import folders and adds any new files that are discovered to
        your collection. If new files are found, all associated tasks are also executed.
    </td>
</tr>
<tr>
    <td>Remove Missing Files</td>
    <td>Scans your <strong>Currently Available</strong> import folders and will remove all entries in the database that do not have
        a physical file match. If you have import folders that are shared network drives or external drives, make sure they are
        accessible by Shoko Server before running this command.
    </td>
</tr>
<tr>
    <td>Sync MyList</td>
    <td>Syncs your collection metadata with your AniDB MyList.</td>
</tr>
<tr>
    <td>Sync Trakt Collection</td>
    <td>Syncs your collection metadata with your Trakt account.</td>
</tr>
<tr>
    <td>Sync Hashes</td>
    <td>Syncs your files hashes (ED2k, CRC32, MD5, SHA1) with the Web Cache.
    </td>
</tr>
<tr>
    <td>Upload Local Votes To AniDB</td>
    <td>Syncs your votes with AniDB.
    </td>
</tr>
<tr>
    <td>Sync Plex Watch Status</td>
    <td>Syncs your local watch states with your Plex account.
    </td>
</tr>
<tr>
    <td>Update All AniDB Series Info</td>
    <td>Updates all AniDB series information in your collection.</td>
</tr>
<tr>
    <td>Update All TvDB Info</td>
    <td>Updates all series TvDB information in your collection.</td>
</tr>
<tr>
    <td>Update All Trakt Info</td>
    <td>Updates all Trakt series information in your collection.</td>
</tr>
<tr>
    <td>Update All Stats</td>
    <td>Updates all series stats such as watched state and missing files with.</td>
</tr>
<tr>
    <td>Update All Media Info</td>
    <td>Updates all technical details about the files in your collection.</td>
</tr>
<tr>
    <td>Update Images</td>
    <td>Checks current image settings and updates series images to match. Currently this action will only <strong>increase</strong>
        the amount of available images, not <strong>decrease</strong> them.
    </td>
</tr>

</tbody>
</table>

## What Are Import Folders?

{{< page-column image-url="/assets/images/server/Shoko-Server-Import-Folders.jpg" image-alt="Shoko Server - Import Folders Tab" >}}

Import Folders are the physical locations of where your files are. This means two things, they **must be accessible by Shoko Server** and they are **always online**. If using **removable media**, make sure its connected before running any **import functions** or **file checking functions** to avoid Shoko removing the entries from your collection database.

There are **two different Import Folder Systems** you can use. The first is **Single Folder** which has Shoko add the contents of the folder to your collection. The second is **Drop Source/Destination** which has Shoko move files from the **Drop Source** into the **Drop Destination**. You can use both of these systems at the same time and/or use them both for the same import folder.

There are two options available for managing Import Folders.

{{< /page-column >}}

<table class = "table table-bordered">
<thead>
<tr>
    <th width = "20%">Option</th>
    <th>Description</th>
</tr>
</thead>

<tbody>
<tr>
    <td>Remove</td>
    <td>Will remove the <strong>selected</strong> import folder. This will not <strong>physically</strong> delete the
        files but will remove them from your collection.
    </td>
</tr>

<tr>
    <td>New Folder</td>
    <td>Allows you to add a new Import Folder for use with Shoko Server.</td>
</tr>
</tbody>
</table>

## How Long Will Importing Take?

This is no simple answer to this question as the time required to import a file varies based on multiple criteria such as the file size, the series it belongs to and the metadata associated with the series. However there is a process every imported file goes through which is detailed below.

**1. Hashing The File**

The file is first hashed, the amount of time this takes depends on a couple different factors such as the file size, your CPU and the HDD read/write speed that contains the file.

**2. Comparing Hash On AniDB**

Once the file has been hashed, the hash is sent to AniDB for comparison. If the hash is found on AniDB then the file is associated with the episode the hash belongs to and the series the episode belongs to is added to your collection. If this is a new series, then additional commands are added to the General Worker to pull the needed data for the series from AniDB.

**3. Downloading Additional Metadata**

If the file belongs to a new series, information related to the series and each episode in the series is downloaded from The TvDB. If additional community sites are enabled, such as Trakt.TV then additional commands are added to the **General Worker** to update the metadata on your profile on those sites.

## Adding A New Import Folder

{{< page-column image-url="/assets/images/server/Shoko-Server-Add-Import-Folder.jpg" image-alt="Shoko Server - Add Import Folder" >}}

Click New Folder to add a import folder for your collection.

A new window will open allowing you to specify the import folder's settings. To make things easier and reduce the chance of making a mistake, we recommend clicking the **Folder Icon** to select the location of the import folder. If your import folders are external hard drives, network drives or hosted on the cloud, make sure to update their locations if they happen to change. Otherwise you'll start to receive errors and depending on the actions you run, the entries for those files in your database could be deleted.

Each Import Folder you add has its own setting that can be configured depending on your setup.

{{< /page-column >}}

<table class = "table table-bordered">
<thead>
<tr>
    <th width = "20%">Option</th>
    <th>Description</th>
</tr>
</thead>

<tbody>
<tr>
    <td>Provider</td>
    <td> The Import Folder type, if you've added a <strong>Cloud Account</strong> you'll be able to select it otherwise <strong>Local
        File System</strong> will be selected by default. Please note, Import Folders are linked to
        a <strong>Single </strong><strong>Provider</strong> and <strong>cannot be used with Import Folders from another
            Provider</strong>.
    </td>
</tr>

<tr>
    <td>Import Folder Path</td>
    <td> The location of the Import Folder, if it's a <strong>Local Provider </strong>then you'll select the folder and if it's
        a<strong>Cloud Provider</strong> then you'll select the folder from a list of available folders.
    </td>
</tr>

<tr>
    <td>Drop Source</td>
    <td>An Import Folder marked as a Drop Source will have it's files moved to the folder marked as a <strong>Drop
        Destination</strong>. To have Shoko Server moves files automatically from a Drop Source once detected, make sure to
        enable <strong>Watch For New Files</strong> for the that Drop Source.
    </td>
</tr>

<tr>
    <td>Drop Destination</td>
    <td>Used in conjunction with at lease one <strong>Drop Source</strong>. All files will be moved and sorted into the
        specified <strong>Drop Destination</strong> with files belonging to the same series automatically grouped up and placed
        in a new folder with the series named based on your <strong>Preferred Language Preference</strong> setting.
        You can only have one <strong>Drop Destination per Provider</strong> and cannot use <strong>Drop
            Sources</strong> from a different Provider.
    </td>
</tr>

<tr>
    <td>Watch For New Files</td>
    <td>An Import Folder marked with <strong>Watch For New Files </strong>will have any files detected imported into your
        collection. Useful if use a custom sorting solution and don't want Shoko Server moving your files for you and don't want
        to have to manually execute <strong>Run Import</strong> each time you add files to your Import Folder.
    </td>
</tr>
</tbody>
</table>

## Supported Cloud Hosts

{{< page-column image-url="/assets/images/server/Shoko-Server-Cloud-Accounts.jpg" image-alt="Shoko Server - Cloud Accounts Tab" >}}

We currently support the following cloud hosts. While we cannot guarantee we'll add your cloud host, if it's not listed below you can always request support for it by creating an issue on GitHub.

- Amazon Cloud Drive
- Google Drive
- One Drive

Please make sure to keep the following in mind when using a cloud host.

- You cannot mix Import Folders from two different cloud accounts.
- You cannot mix Local Import Folders with Cloud Import Folders.
- If you remove a Cloud Account, all associated import folders and files will be removed from your database.
- If the Import Folder option Watch For New Files is selected, the import folder will be checked every 3 minutes for new files.

{{< /page-column >}}

## Adding A Cloud Host

{{< page-column image-url="/assets/images/server/Shoko-Server-Add-Cloud-Account.jpg" image-alt="Shoko Server - Add Cloud Account" >}}

First click the **Add Account** button to open the **Cloud Accounts** window.

Select the **Service Provider** you'd like to add then assign a **Name** for the cloud account, you can name it whatever you'd like as it's just used as a reference for you. Once your'e done click the **Connect** button, you'll be taken to your selected **Service Providers** website where you'll be asked to login into your account. This is what allows Shoko access to your cloud account, we don't store your username or password nor do you have to input it each time Shoko access your cloud account. Read and follow all prompts, once done click the Save button to add your cloud account.

{{< /page-column >}}

## What Is An Integrity Check?

{{< page-column image-url="/assets/images/server/Shoko-Server-Integrity.jpg" image-alt="Shoko Server - Integrity Tab" >}}

A **Integrity Check** allows you to scan your **Import Folders** for possible file corruption. Any Import Folders you add to a **Integrity Check** will have their files rehashed with the new value compared to the original value stored in your database from when the file was first imported. Files that have the **same hash value** pass and are not marked as corrupted, however files that **do not have the same hash value** are marked as corrupted and displayed in the results panel below. With this utility you can replace corrupted files in your collection preventing playback errors from happening in the future.

#### Managing Previous Integrity Checks

You can view previous integrity checks by click the **Drop-Down** box and selecting the previous integrity check you'd like to view. You can also delete an integrity check by click the **Red X** button, you'll be prompted to confirm deletion.

{{< /page-column >}}

## Adding An Integrity Check

{{< page-column image-url="/assets/images/server/Shoko-Server-Add-Integrity-Check.jpg" image-alt="Shoko Server - Add Integrity Check" >}}

Click the **Add Integrity Check** button to open the **Select Import Folders** window. Now select the import folders whose files you wish to have checked for possible corruption, once done click the **OK** button. The integrity check will already be loaded, to start it click the **Green Arrow**. Depending on how big the import folder is, the integrity check may take some time. You can see how many files are left below along with the status of the integrity check, if you'd like to pause the integrity clicking the **Blue Pause** button.

{{< /page-column >}}

## Available Settings

{{< page-column image-url="/assets/images/server/Shoko-Server-Settings.jpg" image-alt="Shoko Server - Settings Tab" >}}

Only a handful of settings are available for configuration in Shoko Server. The rest can be configured either in the Shoko Server Web UI or Shoko Desktop.

{{< /page-column >}}

<table class = "table table-bordered">
<thead>
<tr>
    <td width = "20%">Option</td>
    <td>Description</td>
</tr>
</thead>

<tbody>
<tr>
    <td>Server Port</td>
    <td>The port Shoko Server will use, by default it’s set to <strong>8111</strong>.</td>
</tr>
<tr>
    <td>Image Path</td>
    <td>The location where Shoko Server will download and store all images. Clicking <strong>Set Default</strong> will set
        the path to <strong>C:\ProgramData\ShokoServer</strong> while clicking <strong>Select Custom Folder</strong> will
        allow you to choose a custom location. If using a <strong>Custom Location</strong>, it cannot be a location where
        administrative rights are required.
    </td>
</tr>
<tr>
    <td>Minimize On Startup</td>
    <td>If enabled, Shoko Server will start minimized.</td>
</tr>
<tr>
    <td>Start With Windows</td>
    <td>If enabled, adds a RegKey that makes Shoko Server start with Windows.</td>
</tr>
<tr>
    <td>Update AniDB Info</td>
    <td>Opens the AniDB account window allowing you to update your AniDB login.</td>
</tr>
<tr>
    <td>Launch Web UI</td>
    <td>When clicked, will open the Shoko Server Web UI.
    </td>
</tr>
</tbody>
</table>

## Shoko Server Web UI

The Shoko Server Web UI is the eventual replacement to the Shoko Server GUI. As its still in development, some functionality present in Shoko Server's GUI is not available in the Web UI. However we **highly recommend** all users become familiar with the Web UI as it contains additional functionality not available in Shoko Server's GUI.

Learn more about the [Shoko Server Web UI](/server/webui).