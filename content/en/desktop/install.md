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
[[pageNav]]
name = "Shoko Desktop Under MacOS"
id = "macos-with-wineskin"
+++

### Windows {.page-first-header}

Navigate to the [Shoko Downloads](https://shokoanime.com/downloads/) page and download **Shoko Desktop**, unless told otherwise, we always recommend 
downloading the **Stable** version. The installer will guide you through the installation process and should only take 
a couple of minutes.

### Linux with Wine using Bottles

1. Install Bottles (https://usebottles.com). This may require installing Flatpak and adding the Flathub repository if you don't have it already.
2. Before adding a bottle, go to Bottles preferences and under the "Runners" tab, install the latest Caffe or Proton GE. Other runners may also be installed, but we have verified that Caffe and Proton GE work. Other runners might work and might give better performance. We just know that the Soda runner can be slow and certain errors might pop up that prevent Shoko Desktop being utilized for all its functions.
3. Add a Bottle and give it a name like "Shoko Desktop" and under environment, select "Custom" and then choose one of the runners that were installed in the last step (Caffe or Proton GE). Then hit "Create." It may take a second for the Bottle to be done creating.
4. Select the Bottle and under *Options > Dependencies*, install dotnetcoredesktop6, cjkfonts, and tahoma32.
5. Lastly, download the latest stable Shoko Desktop installer from https://shokoanime.com/downloads/shoko-desktop/ and put it somewhere you remember. If you want to use the daily build, download it from the same page and extract it somewhere.
    - For stable, under the current configuration, select "Run Executable..." and navigate to where you downloaded the installer. The installer window should pop up, so just follow its instructions to install. If the installer window doesn't show up after a while, you may need to close Bottles completely, reopen it, and retry running the executable.
    - For daily, select "Add Shortcuts..." and navigate to where you extracted Shoko Desktop to and select ShokoDesktop.exe.

Congratulations! You should now be able to run Shoko Desktop using the shortcut created in Bottles. Feel free to tweak other settings that might help improve performance for your system such as using discrete graphics, but what is now setup is the minimum needed to get things working.

#### Potential issues and fixes:
- If Bottles has issues running the Shoko Desktop installer (or ShokoDesktop.exe for those using the daily build), you may need to copy the executable or folder into the wine prefix for the bottle due to how Flatpak does its sandboxing. You would then have to run the executable from where it is located inside the prefix. Another option is to expose more directories to Flatpak which would reduce the amount of sandboxing and security of it. You can follow https://docs.usebottles.com/flatpak/expose-directories to see how to do so, but this should only be used as a last resort. If you have to go this route and are just trying to run the Shoko Desktop installer, you should be able to revert the changes made once the installer has finished.
- If Shoko Desktop goes black while using it, resize the window. This will force a render since Wine is a bit weird with how Shoko Desktop draws itself. Disabling VKD3D and DXVK can also prevent this from happening entirely.

### MacOS with Wineskin

1. Install Wineskin Server by following the instructions at https://github.com/Gcenx/WineskinServer
2. Run Wineskin Winery. Once open, click the plus symbol and install the latest engine. If you are running MacOS Sonoma 14.0 or newer, using an engine with 'D3DMetal' in its name can reduce or prevent visual issues. Select the engine you just installed and then update the wrapper version.
3. You can now select "Create New Blank Wrapper" and give it a name such as "Shoko Desktop."
4. Download the latest stable Shoko Desktop installer from https://shokoanime.com/downloads/shoko-desktop/ and put it somewhere you remember. If you would instead like to use the daily build, download the zip from the same link and extract it somewhere.
5. Open the Shoko Desktop wrapper that was created which will open Wineskin for some initial setup. Select "Install Software"
    - For installing stable, select "Choose Setup Executable." Navigate to where you placed the Shoko Desktop installer and follow the instructions. On the last step in the installer, uncheck "Launch Shoko Desktop" as there is still some more configuration that needs to be done before it will work. Wineskin may say it did not detect any new executables. This is fine, we will just have to manually point to the exe later.
    - For installing daily, select "Copy a Folder Inside" and find where you put the extracted zip. This will copy the folder into the wrapper's wine prefix under *drive_c > Program Files*
6. Back in Wineskin, select "Cancel" to go back to the first window. Select "Winetricks" and from here, check the boxes for corefonts, tahoma, cjkfonts, and dotnetdesktop6. Click run and wait until winetricks has finished installing everything, then click close.
7. Download https://github.com/unicode-org/icu/releases/download/release-68-2/icu4c-68_2-Win64-MSVC2019.zip and extract it somewhere you will remember. These are some locale files that doesn't come with wine for MacOS for some reason.
8. Back in Wineskin, select "Advanced" and go to the Configuration tab. For the Windows app field, select browse and follow the directories to where Shoko Desktop was installed to. This will be somewhere inside Program Files (x86) for stable users, or Program Files for daily. Click on ShokoDesktop.exe and select Choose.
9. Once again, select browse next to the Windows app field. This time however, right click the Shoko Desktop folder that ShokoDesktop.exe is in and select "Show in Finder." Now copy all dlls from inside the icu4c-68_2-Win64-MSVC2019/bin64 folder from earlier into to the folder with ShokoDesktop.exe.
10. Now in the same folder with ShokoDesktop.exe, edit ShokoDesktop.runtimeconfig.json and add `"System.Globalization.AppLocalIcu": "68.2"` to `configProperties`, like below
```
"configProperties": {
    "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
    "System.Globalization.AppLocalIcu": "68.2"
}
```
11. Now you should be fine to close Wineskin, unless you would like to do some optional steps farther down to make the app look better for Retina displays.

Congratulations! You can now open the wrapper that was created to use Shoko Desktop

#### Configuring the Wine wrapper for Retina displays

In Wineskin:

1. Go to Advanced and under the Tools tab, select Config Utility (winecfg). In the window that opens, under the Graphics tab set the dpi to 192 and select Ok.
2. Back in Wineskin, select Registry Editor (regedit) and navigate to HKCU\Software\Wine\Mac Driver, right click it, select *New > String value* and set the name to "RetinaMode". Double click the new entry and set the value to "Y". You may now close out of everything and use the Shoko Desktop wrapper where it should now render in a higher resolution.

#### Potential issues and fixes:
- In the event that you close Wineskin while setting up and it will no longer open to it when launching the Shoko Desktop wrapper, go to the location of the wrapper in Finder, right click the app, and select Show Package Contents. You can then open the Wineskin.app contained to get back to configuring the wrapper.
- If Shoko Desktop goes black while using it, resize the window. This will force a render since Wine is a bit weird with how Shoko Desktop draws itself. Using an engine with 'D3DMetal' in its name may also prevent this from happening.
