---
title: Re-create a Library Safely | Jellyfin
description: Delete and re-create a Shokofin library, for example to apply structure changes or move to the VFS, without losing anyone's watch progress.
---

# Re-create a Library Safely

Some changes only fully apply to a library that's built from scratch, and deleting a library can also be the quickest
fix when things look wrong. This guide backs up everyone's watch state to Shoko Server first, re-creates the library,
and then restores the watch state.

## Before You Start

- **Check whether you really need to re-create.** Many changes only need a metadata refresh with **Replace all
  metadata**. The [change impact table](/jellyfin/configuring-shokofin#change-impact) lists which settings need what.
  Typical reasons to re-create are changing the library structure, season merging, specials placement, or moving a
  legacy library to the VFS.
- **Plan some time.** A large library can take a while to scan. Users will see an empty or partial library in the
  meantime.
- **Watch state is backed up per person.** Each Jellyfin user whose progress you want to keep needs their own account in
  Shoko. Jellyfin ties an episode's watch state to the show's Shoko ID plus the season
  and episode number, so it survives a re-create as long as those stay the same. Movies only keep it when they have a
  TMDB ID (enable TMDB under **Add Third Party IDs**); otherwise it's tied to the file path. Changing the
  structure, merging or specials placement usually changes those numbers, so don't rely on it.
- **Automatic watch state migration** <Badge type="tip" text="Next release" />: Shokofin can carry watch state over
  automatically for some changes inside an existing VFS library, such as a series moving to a different show. That doesn't cover deleting and re-creating a
  library, so follow the steps below.
- **Moving to the VFS on Windows?** Enable Developer Mode and restart Jellyfin first. See
  [storage requirements](/jellyfin/concepts/virtual-file-system#storage-requirements).

## In Shoko Server

Create an account for each person who watches in Jellyfin, unless they already have one.

1. Open **Settings** → **User Management**.
2. Under **Current Users**, press the **Add User** button (person with a plus).
3. Enter a **Username**, **Password** and **Confirm Password**, then press **Add**.

These accounts don't need **Administrator**.

## In Shokofin: Back Up Watch State

1. In the Shokofin settings, open the **Users** tab.
2. In **Configure settings for**, pick a Jellyfin user.
3. Enable **Enable Synchronization Features**.
4. Enter that person's Shoko **Username** and **Password**, then press **Save**. Shokofin signs in once and stores an API
   key; the password isn't kept.
5. Repeat for every user.
6. In Jellyfin, open **Dashboard** → **Scheduled Tasks**, find **Export User Data** under **Shokofin**, and run it. Wait
   until it finishes.

Export sends Jellyfin's watched state, play count and resume position to Shoko. See
[Watch State Sync](/jellyfin/concepts/watch-state-sync) for exactly what's included.

## In Jellyfin: Re-create the Library

1. Note the library's settings: name, content type, folders, and the metadata and image fetcher order. You'll re-enter
   them.
2. Open **Dashboard** → **Libraries**, open the library's menu, and remove it.
3. Wait until the library has disappeared from the home screen for all users. This can take a moment while Jellyfin
   removes the items.
4. Now make the setting changes you came here for. In the Shokofin settings, change anything global. To move from a
   legacy mode to the VFS, set **Library** → **Library Settings** → **Default Library Operation Mode** to
   **Virtual File System (VFS)**, because the new library will be created with that default.
5. Create the library again, following [Quick Start: creating a library](/jellyfin/quick-start#creating-a-library).
6. Run **Dashboard** → **Libraries** → **Scan All Libraries** (Jellyfin 10.10 starts it on its own). With the VFS, this
   first scan shows nothing yet; when it finishes, Shokofin starts a second full scan automatically, which fills the
   library. Wait for both to finish.

## In Shokofin: Restore Watch State

1. Open **Dashboard** → **Scheduled Tasks** and run **Import User Data** under **Shokofin**.
2. Wait until it finishes.

Import only fills in or updates Jellyfin's data where Shoko's is newer, so it's safe to run even if some progress was
kept.

## Check That It Worked

- The library shows the expected shows, seasons and movies. If you changed the structure, spot-check a franchise you
  know well.
- Open a show you've partly watched: watched episodes are marked and resume positions are back.
- In **Library** → **Library Settings**, the library's folders are mapped (no **Not Mapped** rows).

## If It Didn't Work

- The library stays empty after both scans →
  [Troubleshooting: the new library is empty](/jellyfin/troubleshooting#the-new-library-is-empty).
- Watch state didn't come back → check that each user was linked *before* exporting, and see
  [Troubleshooting: watch state does not reach Shoko](/jellyfin/troubleshooting#watch-state-does-not-reach-shoko).
- Some series are missing →
  [Troubleshooting: a series is missing from the library](/jellyfin/troubleshooting#a-series-is-missing-from-the-library).
- Your changes still don't show →
  [Troubleshooting: settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).

## Related

- [Sync Watch State](/jellyfin/how-to/sync-watch-state), to keep watch state in Shoko all the time so a re-create
  never needs an export step
- [The Virtual File System](/jellyfin/concepts/virtual-file-system)
- [Settings Reference → Change Impact](/jellyfin/configuring-shokofin#change-impact)
- [Scheduled Tasks](/jellyfin/scheduled-tasks)
