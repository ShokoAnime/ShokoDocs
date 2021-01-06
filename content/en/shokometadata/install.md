+++ 
title = "Shoko Metadata - Windows Install"
description = "Information on how to install Shoko Metadata on Windows"
aliases = ["/shokometadata"]
layout = "single"
[[pageNav]]
navTitle = "Install Platforms"
name = "Windows"
id = "windows"
[[pageNav]]
navTitle = "Editing Plex Scanners"
name = "Windows"
id = "windows2"
[[pageNav]]
name = "Combining Series & Movies"
id = "combining-series--movies"
+++

## Is Shoko Server Installed?{.page-first-header}

Shoko Metadata is not a standalone plugin and **requires Shoko Server** installed, configured and running in order to
work properly. If you haven't done this yet, [Download Shoko Server](https://shokoanime.com/downloads/) from our main
website and use the installation guides located in the menu on the left to properly install and configure Shoko Server.

## Installing Shoko Metadata

Shoko Metadata has to be **manually installed** so make sure to follow the instructions below. This guide assumes you've
installed Plex into the default install directory, make adjustments as needed to fit your installation.

##### Windows

If you haven't done so, [Download Shoko Metadata](https://shokoanime.com/downloads/) and extract the zip file, inside
the zip folder is a folder labeled **ShokoMetadata.bundle**. Move this folder into the following directory.

```
%LOCALAPPDATA%\Plex Media Server\Plug-ins
```

Now you need to move the **Movie** and **Series** scanners into the scanner folder. If you've never installed custom
scanners before you'll need to create this folder first.

Create a folder labeled **Scanners** in the following directory.

``````
%LOCALAPPDATA%\Plex Media Server
``````

The **Movie** and **Series** scanners are located in the following directory.

``````
%LOCALAPPDATA%\Plex Media Server\Plug-ins\ShokoMetadata.bundle\Contents\Resources
``````

Move both of these folders into the following directory.

``````
%LOCALAPPDATA%\Plex Media Server\Scanners
``````

Proceed to **Editing Plex Scanners** to make the required edits for the scanners to work. 

##### Linux

## Editing Plex Scanners

With Shoko Metadata installed, you'll need to make a few edits to both the **Series** and **Movies** scanner.
If you're only planning to use one of the scanner than you don't need to edit the other one.

<h5 id="windows2">Windows</h5>

**Editing Shoko Movie Scanner**

Navigate to the following folder

``````
%LOCALAPPDATA%\Plex Media Server\Scanners\Movies
``````

Open **Shoko Movie Scanner.py** in your editor of choice and modify the **Prefs** section to match your Shoko setup. For
most users you'll only need to change the **username** and **password**. As Python is space-sensitive make sure to not
add or remove any spaces.

```
Prefs = {
    'Hostname': '127.0.0.1',
    'Port': 8111,
    'Username': 'username',
    'Password': 'password',
}
```

**Editing Shoko Series Scanner**

Navigate to the following folder

``````
%LOCALAPPDATA%\Plex Media Server\Scanners\Series
``````

Open **Shoko Series Scanner.py** in your editor of choice and modify the **Prefs** section to match your Shoko setup.
For most users you'll only need to change the **username** and **password**. As Python is space-sensitive make sure to
not add or remove any spaces.

```
Prefs = {
    'Hostname': '127.0.0.1',
    'Port': 8111,
    'Username': 'username',
    'Password': 'password',
    'IncludeSpecials': True,
    'IncludeOther': True,
    'SingleSeasonOrdering': False
}
```

You'll notice the series scanner has a few more options available than the movie scanner which are detailed below.

<table class="table table-bordered">
    <thead>
    <tr>
        <th>Option</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>IncludeSpecials</td>
        <td>Files marked as specials in Shoko will be shown in the seires as part of Season 0.</td>
    </tr>
    <tr>
        <td>IncludeOther</td>
        <td>Files marked as other in Shoko will be shown in the seires as part of Season 0.</td>
    </tr>
    <tr>
        <td>SingleSeasonOrdering</td>
        <td>Episodes are no longer separated by seasons. All normal episodes are put into Season 1, specials into Season 0, openings/endings into Season -1, and trailers into Season -2.</td>
    </tr>
    </tbody>
</table>

##### Combining Series & Movies

By default, you need a separate library in Plex for Series Movies. However, you can modify the **Shoko Series
Scanner.py** file, so you only have to use one scanner and one library for your entire collection.

Open **Shoko Series Scanner.py** in your editor of choice, if your editor supports it jump to **line 137** and remove
the following code. If your editor doesn't support it just do a search for **ismovie**, and it should take you to the
line of code in question

```                
if (try_get(series_data, "ismovie", 0) == 1 and seasonNumber >= 1): continue # Ignore movies in preference for Shoko Movie Scanner, but keep specials as Plex sees specials as duplicate
```

Remove the line and save and you can now have both anime series and movies in the same library. 
