+++ title = "Installing Shoko Desktop"
description = "Information on how to install Shoko Desktop."
aliases = ["/desktop"]
layout = "single"
[[pageNav]]
navTitle = "Install Platforms"
name = "Windows"
id = "windows"
[[pageNav]]
name = "Shoko Desktop Under Linux"
id = "linux-with-wine-using-bottles"
+++

### Windows {.page-first-header}

Navigate to the [Shoko Downloads](https://shokoanime.com/downloads/) page and download **Shoko Server**, unless told otherwise, we always recommend 
downloading the **Stable** version. The installer will guide you through the installation process and should only take 
a couple of minutes.

### Linux with Wine using Bottles

1. Install Bottles (https://usebottles.com). This may require installing Flatpak and adding the Flathub repository if you don't have it already.
2. Before adding a bottle, go to Bottles preferences and under the "Runners" tab, install the latest Caffe or Proton GE. Other runners may also be installed, but we have verified that Caffe and Proton GE work. Other runners might work and might give better performance. We just know that the Soda runner can be slow and certain errors might pop up that prevent Shoko Desktop being utilized for all its functions.
3. Add a Bottle and give it a name like "Shoko Desktop" and under environment, select "Custom" and then choose one of the runners that were installed in the last step (Caffe or Proton GE). Then hit "Create." It may take a second for the Bottle to be done creating.
4. Select the Bottle and under *Options > Dependencies*, install dotnetcoredesktop6, cjkfonts, and tahoma32.
5. Next under *Options > Settings > Components*, enable DXVK and VKD3D. This is to hopefully increase compatibility, but not might be strictly necessary. It might help with reducing the application from going black which can be fixed by resizing the Shoko Desktop window when it's running.
6. Lastly, download the latest stable Shoko Desktop installer from https://shokoanime.com/downloads/shoko-desktop/ and put it somewhere you remember. If you want to use the daily build, download it from the same page and extract it somewhere.
    - For stable, under the current configuration, select "Run Executable..." and navigate to where you downloaded the installer. The installer window should pop up, so just follow its instructions to install. If the installer window doesn't show up after a while, you may need to close Bottles completely, reopen it, and retry running the executable.
    - For daily, select "Add Shortcuts..." and navigate to where you extracted Shoko Desktop to and select ShokoDesktop.exe.

Congratulations! You should now be able to run Shoko Desktop using the shortcut created in Bottles. Feel free to tweak other settings that might help improve performance for your system such as using discrete graphics, but what is now setup is the minimum needed to get things working.

#### Potential issues and fixes:
- If Bottles has issues running the Shoko Desktop installer (or ShokoDesktop.exe for those using the daily build), you may need to copy the executable or folder into the wine prefix for the bottle due to how Flatpak does its sandboxing. You would then have to run the executable from where it is located inside the prefix. Another option is to expose more directories to Flatpak which would reduce the amount of sandboxing and security of it. You can follow https://docs.usebottles.com/flatpak/expose-directories to see how to do so, but this should only be used as a last resort. If you have to go this route and are just trying to run the Shoko Desktop installer, you should be able to revert the changes made once the installer has finished.
- If Shoko Desktop goes black while using it, resize the window. This will force a render since Wine is a bit weird with how Shoko Desktop draws itself.

