+++
title = "ShokoMetadata - Linux Installation"
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

## Note about folders

For the sake of simplicity, it's assumed that the Data folder for Plex Media Server is found at
>/var/lib/plex/Plex Media Server/
and all steps are executed by the user running the Plex Media Server (usually called **plex**) in a shell (e.g. Bash)

Please adjust your paths accordingly where necessary.

## Setting up Folders

Go to the Plug-ins Directory
>cd /var/lib/plex/Plex Media Server/Plug-ins/

Download latest master build
>wget https://github.com/Cazzar/ShokoMetadata.bundle/archive/master.zip

Extract the downloaded archive/master
>unzip master.zip

Delete the archive
>rm master.zip

Rename the folder created by extraction
>mv ShokoMetadata.bundle-master ShokoMetadata.bundle

Create Scanners directory if not existing
>mkdir -p /var/lib/plex/Plex Media Server/Scanners

copy Scanner files
>cp -R ShokoMetadata.bundle/Contents/Resources/\* ../Scanners/

If you are hosting shoko on a different Machine, are using a different user than "**Default**"  or set a **password**,
you'll have to edit
>/var/lib/plex/Plex Media Server/Scanners/Movies/Shoko Movie Scanner.py
and
>/var/lib/plex/Plex Media Server/Scanners/Series/Shoko Series Scanner.py

change the following fields as necessary
~~~
Prefs = {
    'Hostname': '127.0.0.1',
    'Port': 8111,
    'Username': 'Default',
    'Password': '',
    'IncludeOther': True
}
~~~

And that concludes the installation.