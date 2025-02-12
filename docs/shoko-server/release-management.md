---
title: Release Management
description: An overview of the Release Management utility in Shoko's Web UI.
---

# Release Management

The Release Management utility displays all series in your collection that contain duplicate episodes for a particular
entry, such as when replacing a file with a better quality version or a different subgroup. This utility allows you
to manage these duplicates by selecting the file(s) you want to keep and the file(s) you want to remove.

![Shoko Server - Release Management](/images/shoko-server/shoko-server-release-management-01.jpg)

You're presented with a list of series that contain duplicate files, clicking on a series will populate the right-pane
with a list of episodes in said series with one or more files. From here there are two ways to handle your duplicated
entries.

## Episode Management

![Shoko Server - Release Management](/images/shoko-server/shoko-server-release-management-02.jpg)

Episode Management is the process of **resolving duplicates on a per-episode level**. This is useful when you want to
keep a specific file from a particular release group or quality for a particular episode. With the episode listing
populated, click on an episode to be shown all files associated with that episode. You can then select the file(s) you
want to keep and the file(s) you want to remove from the drop-down.

You'll notice on the episode header, there is a count to indicate how many files are being kept, and how many are being
removed and how many are marked as variations. A file marked as a variation tells Shoko that while it's a duplicate, its
one you would like to keep. This differs from the keep option as the keep option is the file you want to keep as the
primary file for the episode. An example would be keeping the aired version and the director's cut version of an episode.

After you've selected the files you want to keep and delete, click the **Confirm** button to apply your changes. Please
note, files marked as **Will be Deleted** will immediately be deleted from your system, so make sure to double-check
any entries marked as such before clicking confirm.

## Series Management

Series Management is the process of **resolving duplicates on a series level**. If you need to quickly resolve
duplicates across an entire series, you can use the **Quick Select** option. This will open a modal listing the files
by group, allowing you to select which files to delete by group. Once you select which group(s) to delete, click
the **Confirm** button to apply your changes. As with the episode management, the group marked to be deleted will
immediately be deleted from your system.
