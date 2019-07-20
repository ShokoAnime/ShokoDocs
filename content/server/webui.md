+++
title = "Shoko Server - Web UI"
lastMod = 2019-04-24

[[pageNav]]
navTitle = "Access & Login"
name = "Accessing The Web UI"
id = "accessing-the-web-ui"
[[pageNav]]
name = "How To Login"
id = "how-to-login"
[[pageNav]]
navTitle = "Dashboard"
name = "Dashboard Overview"
id = "dashboard-overview"
[[pageNav]]
name = "Widgets"
id = "widgets"
[[pageNav]]
navTitle = "Import Folders"
name = "Import Folders Overview"
id = "import-folders-overview"
[[pageNav]]
navTitle = "Actions"
name = "Actions Overview"
id = "actions-overview"
[[pageNav]]
navTitle = "Settings"
name = "Settings Overview"
id = "settings-overview"
[[pageNav]]
name = "How"
id = "available"
[[pageNav]]
navTitle = "Interactive Log"
name = "Interactive Log Overview"
id = "interactive-log-overview"

markup = "mmark"
+++

## Accessing The Web UI

Depending on the OS you're using, accessing the Web UI can be done using one of the following methods.

Please note, the examples provided are based on the **default settings**.

<table class = "table table-bordered">
<thead>
<tr>
    <th width = "50%">Method</th>
    <th>OS</th>
</tr>
</thead>

<tr>
    <td>Right-Click Shoko Server in System Tray.</td>
    <td>Windows Only</td>
</tr>

<tr>
    <td>In the Settings tab in Shoko Server.</td>
    <td>Windows Only</td>
</tr>

<tr>
    <td>http://127.0.0.1:8111/</td>
    <td>Windows & Linux</td>
</tr>

<tr>
    <td>PC IP:SHOKO PORT</td>
    <td>Windows & Linux</td>
</tr>

<tbody>
</table>

## How To Login

{{< page-column image-url="/assets/images/server/Shoko-Server-WebUI-Login.jpg" image-alt="Shoko Server - Web UI - Login" >}}

Once the Web UI loads, you'll be presented with the login window containing **version information** and login info on the left and the actual user inputs on the right. Unless changed, you'll be using the **default Shoko user account** to login, the username is **default** and **there is no password** so leave the password input blank.

Please note, at this time you can only create and modify Shoko accounts using Shoko Desktop.

{{< /page-column >}}

## Dashboard Overview

{{< page-column image-url="/assets/images/server/Shoko-Server-WebUI-Dashboard.jpg" image-alt="Shoko Server - Web UI - Dashboard" >}}

The Dashboard is the main hub designed to allow you to quickly make changes or run actions without having to change tabs.

While present on all tabs, the **Navbar** at the top contains a notification count for each Command Queue as well as buttons to configure the currently logged in user's profile and a silence all notifications button. Additionally, you can hide the sidebar by clicking the hamburger button to the right of programs name.

{{< /page-column >}}

## Widgets

There are currently 5 widgets on the Dashboard that display information and provide functionality. These widgets are Commands,Recent Files, Shoko News, Quick Actions and Import Folders Overview. While there are plans for additional widgets and eventually allow user-created ones, there is no ETA for this.

<table class = "table table-bordered">
<thead>
<tr>
    <th width = "20%">Widget</th>
    <th>Description</th>
</tr>
</thead>

<tbody>

<tr>
    <td>Commands</td>
    <td>The Commands widget provides an overview of the three Command Workers used by Shoko Server. Information on the task
        currently running is shown as well as the remaining number of queued tasks for that worker. Please note, at this time there
        is <strong>no way</strong> to cancel or pause a task within the Web UI.
    </td>
</tr>

<tr>
    <td>Recent Files</td>
    <td>The Recent Files widget provides a listing of the 10 previous imported files and their status. A file that was successfully
        imported, which means a matching hash was found on AniDB is labeled as <strong>Imported</strong> and
        marked <strong>green</strong>. A file that was not successfully imported, which means a matching hash was not found on AniDB
        is labeled as <strong>Imported</strong> and marked <strong>yellow</strong>.
    </td>
</tr>

<tr>
    <td>Shoko News</td>
    <td>The Shoko News widget display the last 5 news posts from the Shoko site so you'll always current on the latest Shoko news.
        You're welcome.
    </td>
</tr>

<tr>
    <td>Quick Actions</td>
    <td>The Quick Actions widget are a set of the most commonly used actions in Shoko Server. As the Actions tab has not been
        implemented yet, you can't customize them.
    </td>
</tr>

<tr>
    <td>Import Folders Overview</td>
    <td>The Import Folders Overview widget allows you to quickly add a new Import Folder or edit existing ones. Please note, at this
        time <strong>Cloud Import Folders</strong> are not supported in the Web UI.
    </td>
</tr>

</tbody>
</table>

## Import Folders Overview

{{< page-column image-url="/assets/images/server/Shoko-Server-WebUI-Import-Folders.jpg" image-alt="Shoko Server - Web UI - Import Folders" >}}

The Import Folders tab is broken into two different sections, **Import Folders Overview** and **Series In Import Folder**.

The Import Folders Overview contains a listing of your Import Folders, its type, location and current status. Clicking the **Manage** button will allow you to add a new import folder or edit / delete an existing import folder. Please note that at this time, **Cloud Import Folders** are not supported in the Web UI.

The Series In Import Folder provides a listing of all the seres in the selected import folder. The series name, its location, how many files and the total size is shown.

{{< /page-column >}}

## Actions Overview

The Actions tab has not been implemented yet.

However, the five most common actions can be ran on the **Dashboard**. However for the remaining tasks you'll need to use the Shoko Server GUI.

## Settings Overview

{{< page-column image-url="/assets/images/server/Shoko-Server-WebUI-Settings.jpg" image-alt="Shoko Server - Web UI - Settings" >}}

The Settings tab allows you to further customize Shoko and fine-tune such as what Community Sites to enable support for, what tasks to run and how often to run these tasks.

Please note, settings **are not automatically saved** when you make a change. Instead you must confirm the change by clicking the the sections corresponding **save** button located in the panel header. This must be done for each panel you make a change in if you want your settings to update.

Settings that are not self-explanatory will have a **help icon** next to them to provide further details.

{{< /page-column >}}

## Interactive Log Overview

{{< page-column image-url="/assets/images/server/Shoko-Server-WebUI-Interactive-Log.jpg" image-alt="Shoko Server - Web UI - Interactive Log" >}}

The Interactive Log provides an easy way to view certain entries in your log.

Users can filter by specific keywords and include or exclude log types. Please note, as this is loading directly from your log file, there may be an increase in wait time depending on the size of your log file.

If it looks like the log is not loading correctly, make sure **Auto Refresh** is enabled. You can enable it by clicking the check-mark in the upper-right

{{< /page-column >}}