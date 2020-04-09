+++
title = "ShokoMetadata - Windows Installation"
lastMod = 2020-04-09

[[pageNav]]
navTitle = "Folder Setup"
name = "Setting up Folders"
id = "setting-up-folders"

markup = "mmark"
+++

Credits to igloo4#9768 on Discord for the [initial write up](https://pastebin.com/urr37buE)

## Is Shoko Server Mandatory?

The short answer is **Yes**.

Shoko Server is the back-end of the entire Shoko suite, which means every single program and plugin provided uses it for accessing and maintaining your anime collection. This makes Shoko Server **mandatory** and also means Shoko Server **must be running** to use any of the programs or plugins that connect to it. With the exception of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background so you don't need to worry about Shoko Server eating up resources.

## Setting up Folders

Place the folder "ShokoMetadata.bundle" in the directory
>    %LOCALAPPDATA%\\Plex Media Server\\Plug-ins  


Navigate to
>    %LOCALAPPDATA%\\Plex Media Server

and enter the folder called "**Scanners**" (You may have to create it)
 
Inside
>    %LOCALAPPDATA%\\Plex Media Server\\Plug-ins\\ShokoMetadata.bundle\\Contents\\Resources

there are two folders, "**Movies**" and "**Series**"
 
Place both folders (**Movies** and **Series**) in the "**Scanners**" folder you found/created at
>    %LOCALAPPDATA%\\Plex Media Server\\Scanners

If you are using a different user than "**Default**", or created a password,
you'll have to Edit 
>%LOCALAPPDATA%\\Plex Media Server\\Scanners\\Movies\\Shoko Movie Scanner.py
and
>%LOCALAPPDATA%\\Plex Media Server\\Scanners\\Series\\Shoko Series Scanner.py

Change the fields in
~~~~
Prefs = {
    'Hostname': '127.0.0.1',
    'Port': 8111,
    'Username': 'Default',
    'Password': '',
    'IncludeOther': True
}
~~~~
as necessary.

And that concludes the installation.