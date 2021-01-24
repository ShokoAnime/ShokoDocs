+++ title = "First Run Setup"
description = "Information on going through the First Run Setup in Shoko Server."
layout = "single"
[[pageNav]]
navTitle = "First Run Setup"
name = "Initializing Server"
id = "initializing-server"
[[pageNav]]
name = "Database Setup"
id = "database-setup"
[[pageNav]]
name = "Local User Account"
id = "local-user-account"
[[pageNav]]
name = "AniDB Account"
id = "anidb-account"
[[pageNav]]
name = "Community Sites"
id = "community-sites"
[[pageNav]]
name = "Start Server"
id = "start-server"
[[pageNav]]
name = "Import Folders"
id = "import-folders"
+++

## Initializing Server{.page-first-header}

![Shoko-Server-First-Run-Start](/assets/images/shoko-server/Shoko-Server-First-Run-Start.jpg)

After you've installed Shoko Server, run it so it can initialize which should only take a couple of seconds. As Shoko
Server uses a Web UI, nothing will initially open so you'll need to click on the Shoko Server icon in your tray and
click **Web UI** to open the browser based UI. You can also access the Web UI by typing in **http://localhost:8111/** in
your browser's address bar.

We've designed the Web UI to be as user-friendly as possible and pretty straightforward to reduce confusion for first
time users.

### Database Setup

![Shoko-Server-First-Run-DB](/assets/images/shoko-server/Shoko-Server-First-Run-DB.jpg)

While you have the option to change the **Database Type**, we strongly advise leaving it as **SQLite** as the other
options are no longer supported and for legacy users only.

### Local User Account

![Shoko-Server-First-Run-Local](/assets/images/shoko-server/Shoko-Server-First-Run-Local.jpg)

In order to access Shoko Server, you'll need to create an account which will link to any community sites you decide to
integrate. At this time, Shoko Server only supports one local account so multiple users with separate collections on the
same computer is not possible.

### AniDB Account

![Shoko-Server-First-Run-AniDB](/assets/images/shoko-server/Shoko-Server-First-Run-AniDB.jpg)

Shoko uses AniDB to compare your file hashes with its extensive database to quickly figure out and add series to your
collection. AniDB also provides additional series and episode information that enhances your collection. At this time,
Shoko Server only supports one AniDB account per local account so multiple AniDB users on the same computer is not
possible. Shoko will **authenticate the username and password** you've inputted, if unsuccessful please double-check
your credentials as you will not be able to proceed.

If you don't have an account, [click here](https://anidb.net/) to create one.

### Community Sites

![Shoko-Server-First-Run-Community-Sites](/assets/images/shoko-server/Shoko-Server-First-Run-Community-Sites.jpg)

Shoko provides integration for multiple community sites allowing you to download additional metadata for the series in
your collection. Most of the options are self-explanatory, so we'll only cover ones that can either affect performance
or cause unwanted issues.

<table class="table table-bordered">
    <thead>
    <tr>
        <th>Site</th>
        <th>Option</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>AniDB</td>
        <td>Related Depth</td>
        <td>Determines how deep Shoko should go to gather information on related series for a single series in your collection. If importing a big collection, we recommend changing the value for this setting to <strong>1</strong> to avoid temporary bans from AniDB.</td>
    </tr>
    </tbody>
</table>

### Start Server

![Shoko-Server-First-Run-Server](/assets/images/shoko-server/Shoko-Server-First-Run-Server.jpg)

With the main settings configured, you can now start Shoko Server.

This should only take a couple of minutes. If you receive any errors, or it fails to continue forward, join us on
Discord, so we can help you fix the issue.

### Import Folders

![Shoko-Server-First-Run-Import](/assets/images/shoko-server/Shoko-Server-First-Run-Import.jpg)

Import Folders are the physical location(s) of where your files are stored. This means two things, they **must be
accessible by Shoko Server** and they are **always online**. If using **removable media**, make sure its connected
before running any **import functions** or **file checking functions** to avoid Shoko removing the entries from your
collection database.

There are **two different Import Folder Types** you can use. The first is **Watch For New Files** which has Shoko add
the contents of the folder to your collection. The second is **Drop Type** which has Shoko move files from the **Drop
Source** into the **Drop Destination**. You can use both of these systems at the same time and/or use them both for the
same import folder.

Click **Add Import Folder** to add a new import folder, input the name you'd like to use for the import folder and then
select or type the location. Decide on the **Import Folder Type** you'll be using for this Import Folder and then click
the
**Save** button to add the Import Folder. If you need to add additional folders then make sure to do that as well before
moving on.

### Installation & Setup Complete

![Shoko-Server-Dashboard](/assets/images/shoko-server/Shoko-Server-Dashboard.jpg)

Congrats, you've successfully installed and setup Shoko Server!

The install and setup guide is only meant to cover the minimal requirements required to get Shoko Server up and
running. However, Shoko does provide fine-tuned options for those who are not satisfied with the default settings. We
highly recommend going through all the available options in the **Settings** tab fine-tune Shoko and your collection.

