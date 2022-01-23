+++ title = "Running Shoko Desktop on Linux"
description = "Settings that work for Wine emulation"
aliases = ["/server/linux-desktop"]
layout = "single"
[[pageNav]]
name = "Shoko Desktop Under Linux"
id = "desktop_on_linux"

+++

## Desktop on Linux {.page-first-header}

1. Download the latest Shoko Desktop latest (zip) from Github.
    - Extracting to ```~/``` works fine, but you can also extract directly into the Wine environtment's virtual C:/ later.

2.  Install the following from your distributions repository or flatpak
    - winetricks
    - Lutris *(optional as other tools can be used)*

3. Launch winetricks to configure a wineprefix
    - Choose create new wineprefix (x64_x86 is fine) and \<name it\>.
    - Install a Windows DLL or component 
        - d3dcompiler_47
        - dotnet40 - prereq for dotnet 48
        - dotnet48\*
        - vcrun2013

*You can now exit winetricks if it is still open.*


**At this point the environment is ready and you may choose to use a different tool to proceed**

## Lutris setup

Launch Lutris
1. Click the Add top left and configure the tabs per below
    - Game info
        - Name: *\<give it one\>*
        - Runner: Wine (Runs Windows Games)
    - Game options
        - Executable: *\<path to ShokoDesktop.exe which will be wherever you extracted ShokoDesktop.zip to\>*
        - Wine Prefix: *\<path to your prefix\>*
        - Prefix architecture: Auto (default)
    - Runner options
        - Wine Version: System 7.0-rc6 (staging)) \*\*
        - Use system winetricks - ON
        - Enable DXVK - (OFF!)
2. Save
3. Launch the "game"

*Note: You may get an rt error on launch, after dismissing the error everything should be fine.*
    

\*\* *The following runners have been tested and confirmed to be working*
- 7.0 rc6
- lutris-ge-6.16-1-x86_64
- 6.10
