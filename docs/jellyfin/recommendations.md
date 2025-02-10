---
title: Recommendations
description: Learn how to optimize your Shokofin setup for the best experience.
---

# Recommendations

There are a few things we recommend when using Shokofin to make sure the plugin works as expected. Be sure to read the
following so you know what to expect and how to optimize your setup to your needs.

## General

### Refreshing Metadata

Whenever you change a setting for Shokofin, existing media may not use the new changes until a full metadata refresh is
done. This is done by performing a manual scan on the individual library and changing the refresh mode to replace all
metadata. In most cases this will let the new settings take effect for existing media. A few settings will warrant a
library re-creation instead such as anything that alters specials placement.

### Library Re-creation is your friend

If something doesn't work as expected, the cleanest (but not necessarily the best) solution is to delete your existing
library and create a new one. The watch data stored in Jellyfin is stored separate from the library structure and will
survive the recreation. Though do note that some issues can be fixed simply by doing a full refresh on the entry or
library, so you should try that first to see if it resolves the problem.

### Reusing Folders Across Libraries

With how Jellyfin stores metadata about library media folders, reusing the same folder between different libraries can
be problematic. To ensure that Jellyfin works properly if you want to reuse the same folder across libraries, you can
try any of the following:

- **Bare Metal:** Use symbolic links pointing to the root of the media library as a way to have a different media folder
  path that still points to the same media files.
- **Docker:** Use multiple docker volume mounts that mount the same folder to different destinations.
- **All Setups:** Enable the options in Shokofin's plugin settings to enable the VFS for the libraries and enable the **Physically Attach VFS to Libraries** _advanced_ setting to have the plugin automatically do the work for you.

This kind of configuration can be useful if you intend to have separate libraries for movies and series.

### Library File Dates

Sometimes problems may arise from using the `Use date scanned into the library` as the date for newly added files.
This setting can cause issues with sorting and organizing your media, as the date Jellyfin uses may not accurately
reflect the actual creation or modification date of the files. Additionally, this date setting affects the season
and show/series added dates, which can further complicate media organization.

To avoid these issues, it's recommended to change the setting in `Dashboard -> Libraries -> Display -> Date added 
behavior for new content` to `Use file creation date`. This ensures that the date used by Jellyfin for sorting and
organizing your media reflects the actual creation date of the files, providing a more accurate and consistent experience
across individual files, seasons, and entire series.

## Virtual File System (**VFS**)

### Using the VFS

The Virtual File System (VFS) allows you to disregard the underlying disk file structure, automatically meeting
Jellyfin's system requirements for file organization through the use of symbolic links. This setup ensures that no
unrecognized files appear in your library and allows you to fully leverage Jellyfin's native features effortlessly.
While this approach is relatively new and still undergoing testing, it is stable enough for daily use. We encourage
adopting this system and reporting any issues you encounter to help improve it further.

:::warning
The VFS is automatically managed by the plugin and the folders and links it creates on the filesystem should not be
manually altered. Changes in Shoko, such as adjustments to groupings or episode relocations, can trigger automatic
updates in the VFS where it's structure may change. Other plugins may store some types of files directly in the VFS,
such as subtitles and extras in folders not linked by a Shoko ID; these files will be correctly associated with their
respective media items in the underlying library.
:::

#### Symbolic Links on Windows

Symbolic links which are necessary for VFS functionality requires enabling developer mode in Windows. Perform the
following to ensure the VFS can work properly:

1. Follow [Microsoft's official guide](https://learn.microsoft.com/en-us/windows/apps/get-started/developer-mode-features-and-debugging#use-regedit-to-enable-your-device) to enable Developer Mode.
2. Restart Jellyfin afterwards so that Shokofin can recognize symbolic links can be created.
3. Go into the Shokofin plugin settings and ensure that the Virtual File System (VFS) is enabled to make use of the
   feature.

### Not Using the VFS

It is best to adhere to an AniDB-compatible file structure, with the exception of the extras being placed in an `extras`
folder, and OPs/EDs being placed in a `backdrops` folder for native Jellyfin integration. An AniDB-compatible file
structure can easily be accomplished within Shoko Server using
the [renamer system](/shoko-server/utilities/file-rename).
To conditionally place media within a compatible `extras` or `backdrops` folder for Jellyfin to recognize, a more
[custom renamer](/renaming-plugins/available-renamers) configuration would be needed. Alternatively, you can have a file
structure using Shoko's groups too, but this is generally not advised since it can easily be messed up on Jellyfin's
side if the groups change in Shoko.

#### Unrecognized Files

Keep unrecognized files — files not recognized in **Shoko Server** — away from the folders provided to Jellyfin. They
will not be handled by the plugin, and be either filtered out or clutter your library depending on the settings you've
chosen. Some may desire

#### Jellyfin's File Structure Requirements

Jellyfin requires a specific file structure when not using the VFS:

- Adhere to the structure guidelines provided in Jellyfin's [Series Guide](https://jellyfin.org/docs/general/server/media/shows/) and [Movies Guide](https://jellyfin.org/docs/general/server/media/movies/) to ensure compatibility.
- Each AniDB series must be in separate folders from each other, otherwise Jellyfin will combine them incorrectly
  compared to what you have in Shoko Server.
- Failure to meet these requirements may lead to issues with media recognition and metadata handling.

Any changes to file structure may require a full metadata refresh for Jellyfin to reflect your metadata properly.

:::info
Shokofin leverages AniDB as the primary source for metadata. Using Shoko's groups feature allows grouping multiple AniDB
entries under a single show in Jellyfin, though not all configurations are compatible. Refer to the structure
recommendations above.
:::
