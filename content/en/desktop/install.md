+++ title = "Installing Shoko Desktpp"
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

###  Linux with Wine using Bottles 

1. Install Bottles (https://usebottles.com). This may require installing Flatpak and adding the Flathub repository if you don't have it already.
2. Before adding a bottle, go to Bottles preferences and under the "Runners" tab, install the latest Caffe or Proton GE. Other runners may also be installed, but I have verified that Caffe and Proton GE work. Other runners might work and might give better performance. I just know that the Soda runner can be slow and certain errors might popup that prevent Shoko Desktop being utilized for all its functions.
3. Add a Bottle and give it a name like "Shoko Desktop" and under environment, select "Custom" and then choose one of the runners that were installed in the last step (Caffe or Proton GE). Then hit "Create." It may take a second for the Bottle to be done creating.
4. Select the Bottle and under Options > Dependencies, install dotnetcoredesktop6, cjkfonts, and tahoma32.
5. Next under Options > Settings > Components, enable DXVK and VKD3D. This is to hopefully increase compatibility, but not might be strictly necessary. It might help with reducing the application from going black which can be fixed by resizing the Shoko Desktop window when it's running.
6. Lastly, download Shoko Desktop, extract the zip, and put it somewhere you remember. Then in Bottles under the current configuration, select Programs > Add Shortcuts... and navigate to where you downloaded Shoko Desktop and select the ShokoDesktop.exe.

Congratulations! You should now be able to run Shoko Desktop using the shortcut created in Bottles. Feel free to tweak other settings that might help improve performance for your system such as using discrete graphics, but what is now setup is the minimum needed to get things working.

### Potential issues and fixes:
- If Bottles has issues running the ShokoDesktop.exe, you may need to copy the unzipped Shoko Desktop folder into the wine prefix for the bottle due to how Flatpak does its sandboxing. You would then have to create a shortcut to where ShokoDesktop.exe is now located. Another option is to expose more directories to Flatpak which would reduce the amount of sandboxing and security of it. You can follow https://docs.usebottles.com/flatpak/expose-directories to see how to do so, but this should only be used as a last resort.
- If Shoko Desktop goes black while using it, resize the window. This will force a render since Wine is a bit weird with how Shoko Desktop draws itself.
