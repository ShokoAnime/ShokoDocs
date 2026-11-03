---
title: Choose the Default Version | Jellyfin
description: Merge multiple releases of the same episode or movie into one entry and pick which release plays by default.
---

# Choose the Default Version

If you keep more than one release of an episode or movie, such as a TV rip and a Blu-ray, Shokofin can merge them into a
single entry with a version picker. You decide which release becomes the primary version, which is the one that plays
when you just press play.

```text
Before                                   After
Season 1                                 Season 1
├── Episode 1                            └── Episode 1   ▾ Versions: BD 1080p (default) · TV 720p
└── Episode 1
```

## Before You Start

- Merging only happens between videos in the **same Jellyfin library** that are linked to the same Shoko episode.
- The Multiple Versions settings are only visible in [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode).
- Don't run the merge or split tasks while a library scan is running.

## In Shoko Server

The sort order can only use information Shoko has about each file, so make sure release info is filled in.

1. In the Shoko Web UI, open **Settings** → **Hashing & Release** and check that the release providers you want are
   enabled and ordered under **Release Provider Options**.
2. For files that are missing their release group, run **Actions** → **AniDB** → **Update Missing AniDB Release Groups**.
3. Files you linked by hand have no release info yet. Add it under **Utilities** → **Unrecognized Files** → **Link With
   Providers**, where you can pick the release group.

## In Shokofin

1. Enable [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode) if you haven't already.
2. Open the **Library** tab and go to **Multiple Versions Settings**.
3. Make sure **Automatically Merge Multiple Versions** is enabled. It is on by default and merges versions after library
   scans and refreshes.
4. Under **Multiple Versions Sort Selectors**, tick the selectors you care about and use the arrows to put them in
   priority order. The first selector decides; the next one only breaks ties.

   | Selector | Prefers |
   |---|---|
   | **Imported At \| Newly imported first** | The release Shoko imported most recently. Enabled by default. |
   | **Created At \| Newly created first** | The release Shoko first saw most recently. |
   | **Resolution \| Highest resolution first** | The release with the most pixels. |
   | **Release Group Name \| Alphabetically sorted** | Release groups in alphabetical order. Files without a group go last. |
   | **File Source \| Better sources first** | Blu-ray, then Web, DVD, VCD, LaserDisc, TV, VHS, Camera and Other. |
   | **File Version \| Higher versions first** | A `v2` release over the original `v1`. |
   | **File Variation \| Non-variations first** | Releases that aren't marked as a variation in Shoko. |

   For example, to prefer Blu-ray releases and then the highest resolution, enable **File Source** and
   **Resolution** and move **File Source** to the top.

   To mark a release as a variation in the Shoko Web UI, open the series, go to the **Episodes** tab, click **File Info**
   under the episode and use **Mark as Variation** on the file.

5. Click **Save**.
6. Optional: open the **VFS** tab and enable
   **Use Source File As Version Identifier** <Badge type="danger" text="Advanced" /> <Badge type="tip" text="Next release" />. The version picker then shows
   the real file names instead of the generated VFS names, which makes the versions easier to tell apart. Only applies
   to libraries using the VFS.

## In Jellyfin

New versions are merged automatically. To apply a changed sort order to items that are already merged:

1. Make sure no library scan is running.
2. Go to **Dashboard** → **Scheduled Tasks** and find the **Shokofin** category.
3. Run **Merge Episodes** and **Merge Movies**. Each re-splits and re-merges every entry using the current settings.

To undo merging entirely, disable **Automatically Merge Multiple Versions** and run **Split Episodes** and
**Split Movies** instead.

## Check That It Worked

Open an episode with several releases. It appears once, with a version selector, and the release at the top of your
selector order plays by default.

The order of the *other* versions in the picker is decided by Jellyfin, not by these selectors: Jellyfin lists regular
video files first, then 2D before 3D, then wider videos before narrower ones.

## If It Didn't Work

- The versions weren't merged: they're in different libraries, or at least one of them isn't linked to the same Shoko
  episode. Check the file in Shoko, and see
  [A series is missing from the library](/jellyfin/troubleshooting#a-series-is-missing-from-the-library).
- The wrong version is the default: a selector higher in the list is deciding, or the files are missing the release info
  that selector needs. Fix the release info in Shoko, then run the merge tasks again.
- Nothing changed after saving: the new order only applies to entries merged after the change, so run the merge tasks.

## Related

- [Collections, Playlists & Versions](/jellyfin/concepts/collections-playlists-and-versions): how merging works.
- [Scheduled Tasks](/jellyfin/scheduled-tasks): the merge and split tasks.
- [Settings Reference: Library](/jellyfin/configuring-shokofin#library).
- [Release Management](/shoko-server/release-management) in Shoko Server.
