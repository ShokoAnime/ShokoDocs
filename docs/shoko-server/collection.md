---
title: Collection
description: An overview of the Collection in Shoko's Web UI.
---

<script setup>
const editGroupColumns = [
    { name: 'Name', header: 'Name', width: '23%' },
    { name: 'Description', header: 'Description' }
];

const editGroupData = [
    {
      Name: 'Name',
      Description: 'Allows the user to change the name of the group to a custom one or to any of the names of the series in said group.'
    },
    {
      Name: 'Series',
      Description: 'Allows the user to move any of the series within the group to another group or to change the group\'s main series (the group poster mirrors the main series poster).'
    },
    {
      Name: 'File Actions',
      Description: 'Contains a list of actions for Shoko to run on all of the file within the group.'
    }
];
const editSeriesColumns = [
    { name: 'Name', header: 'Name', width: '23%' },
    { name: 'Description', header: 'Description' }
];

const editSeriesData = [
    {
      Name: 'Name',
      Description: 'Allows the user to change the preferred name for a series to either a custom one or one from a list of AniDB or TMDB (if linked) sourced names.'
    },
    {
      Name: 'Group',
      Description: 'Allows the user to edit the current group name, move the series to an existing group, or move the series to a brand new group.'
    },
    {
      Name: 'Update Actions',
      Description: 'Contains a list of actions for Shoko to run on the series as a whole.'
    },
    {
      Name: 'File Actions',
      Description: 'Contains a list of actions for Shoko to run on all of the files associated with the series.'
    },
    {
      Name: 'Delete Actions',
      Description: 'Contains a list of actions that allow all of the series data to be removed with or without affecting the associated files.'
    }
];
</script>

# Collection

The Collection is where you can navigate to the files that have been recognized by Shoko. From this page you will be
able to see all of your groups and the series that they contain. You can search for specific entries as well as apply a
wide variety of filters to help find something specific.

## Overview

The main collection view contains a search box as well as buttons for accessing: **Filter Presets**, **Filters**, a
view switcher, and the **Display Settings**.

#### Filter Presets

Displays a modal containing a list of filters which are built-in to Shoko. There is currently no way to modify them
without utilising [/swagger/](/faq#general).

#### Filter

Displays a sidebar which will show any active filters and allow access to the **Add Condition** button. Once clicked
the aforementioned button will open a modal allowing the user to select from a number of criteria. After selecting the
criteria it will either be added directly to the filter sidebar or will display further options first. Filters that are
in the sidebar can be removed with the **Remove Criteria** button or modified with the **Edit Criteria** button.

#### Suggestions

Among the filter criteria are a few about **suggestions**. A suggestion is metadata on an entry: another title that one
of your metadata sources ties to it, either as a recommendation ("people who liked this liked that") or as something
similar. They come from AniDB's similar anime and from TMDB's recommendations and similar titles, for both shows and
movies, with more from any plugin that supplies them, such as the AniList plugin's recommendations. Each keeps the
ranking its source gave it, along with a vote count where the source publishes one.

A suggestion counts as **local** when it resolves to a series in your collection, which needs a cross-reference for the
suggested title. Most suggestions aren't local, since they point at titles you don't have, so a small local count is
normal rather than a sign that something is missing. Filtering on local suggestions is how you find the "you have
this, and you also have what it points at" cases.

Suggestions cost nothing extra to collect, since a source returns them alongside metadata Shoko is already fetching.
The AniList plugin is the exception, because AniList only returns its first 50 recommendations per request, so reading
further costs a request per page. How far it reads is one of that plugin's settings, and by default it keeps paging
while the recommendations are still well rated.

Trending isn't part of this, and isn't planned: it's a global popularity chart rather than anything about your
collection.

#### Display Options

These options which are accessed via the cog icon contain several checkboxes which control how much information is shown
in the collection view.

## Group Page

When clicking on a poster in the collection you will be taken to the corresponding **Group** page (if the series is
part of a group with more than one entry). From here you will be able to see all of the series in said group, sorted by
their release date. Along with this, there is a timeline to help visualise the air dates.

### Edit Group

![Shoko Server - Collection - Group - Edit](/images/shoko-server/shoko-server-collection-group-edit.png)

While in this view it should also be noted that the **Filter Presets** button will switch to a new **Edit Group**
button. This will open a modal (shown above) which contains several options across a few categories.

<EasyTable :columns="editGroupColumns" :data="editGroupData" />

#### Managing Groups

Groups decide which series belong together. Media server/player plugins use them too: Shoko Relay turns them into collections
in Plex, and with Shokofin's Shoko Group Structure, a group becomes one show in Jellyfin and its series become that
show's seasons.

- **Move a series to another group:** open the series, click **Edit Series** → **Group** tab, search under
  **Move to group**, then click **Move to existing group**, or **Create and move to new group** to split it out. From
  the group, **Edit Group** → **Series** tab → **Move series to new group** does the same.
- **Rename a group:** **Edit Group** → **Name**, or **Edit Series** → **Group** tab → **Rename group**. A custom name is
  kept until you change it again.
- **Choose the main series:** **Edit Group** → **Series** tab → **Set as main series**. The group's poster follows the
  main series, and plugins such as Shokofin use it for group-wide settings.
- **Group new series automatically:** **Settings** → **Collection** → **Relation Options** → **Auto Group Series** puts
  related series into the same group when they're added. Use **Exclude following relations** to keep relations such as
  **Alternative Version** or **Movie** from pulling series into a group, and **Determine Main Series Using Relation
  Weighing** to let Shoko pick the main series. See [Relation Options](/shoko-server/settings/collection#relation-options).
- **Regroup everything:** **Actions** → **Recreate All Groups** rebuilds every group using the settings above, and
  **Rename All Groups** re-applies the default names.

:::danger Recreate All Groups throws away your manual changes
**Recreate All Groups** rebuilds every group from scratch. Series you moved between groups by hand and custom group
names are lost. Avoid it once you've arranged your groups manually.
:::

#### Nested Groups

Groups can contain other groups, for example a group per franchise that holds a group for the TV series and a group for
the movies. Media server/player plugins can use this: Shokofin turns the groups above your groups into collections in Jellyfin.

The Web UI can't create or edit nested groups yet. Use the API through [/swagger/](/faq#general) instead, with an API key
from an administrator account (**Settings** → **API Keys**).

You'll need the IDs of the groups and series involved. Open a group or series in the Web UI and take the number from the
address bar, for example `123` in `/webui/collection/group/123` or `/webui/collection/series/123`.

- **Create a new parent group around existing groups** with `POST /api/v3/Group`:

  ```json
  { "Name": "Starlight Academy", "HasCustomName": true, "GroupIDs": [12, 34] }
  ```

  The groups `12` and `34` become sub-groups of the new group. Add `"SeriesIDs"` to put series directly into it too.
- **Move an existing group under a parent** with `PUT /api/v3/Group/{groupID}`:

  ```json
  { "ParentGroupID": 56 }
  ```

  Set `"ParentGroupID": 0` to make it a top-level group again.
- **Add sub-groups to an existing group** with `PUT /api/v3/Group/{groupID}` and `{ "GroupIDs": [78, 90] }`.

Updates only add: the groups and series you list are moved into the group, and nothing that's already in it is removed.
Shoko rejects changes that would put a group inside itself or one of its own sub-groups. `GET /api/v3/Group/{groupID}/Parent`
shows a group's parent.

:::info Using Shokofin?
With the Shoko Group Structure, a group that contains sub-groups isn't turned into a show; its sub-groups are, and the
parent group becomes a collection. See
[Nested Groups and Collections](/jellyfin/concepts/library-structures-and-seasons#nested-groups-and-collections).
:::

## Series Page

When clicking on the poster of a stand alone entry from the collection or group views you will be taken to the series
page. This page contains almost all of the metadata for a given series while giving you access to several key features.

#### Overview

The Overview tab displays: **Metadata Sites**, Episode On Deck, Related Anime, Similar Anime, and Top 20 Actors. While
fairly self explanatory it should be noted that the **Metadata Sites** section is where you can
[manage metadata links](/shoko-server/metadata-links#managing-links).

#### Episodes

![Shoko Server - Collection - Series - Episodes](/images/shoko-server/shoko-server-collection-series-episodes.jpg)

The Episodes tab displays a list of episodes as well as a sidebar for filtering them. Individual episodes can be hidden
or marked as watched by hovering over the thumbnail. There is also an **Options** button which will open a modal that
allows the watched states to be set for all of the filtered episodes at the same time. By clicking **File Info** under
an episode, you will also have access to some advanced controls for the individual files assigned to it. These controls
will allow you to: Force Update Info, Add to MyList, Mark as Variation, Copy ShokoID, or even Delete the file itself.

##### Hiding Episodes

Hide an episode to keep it out of view everywhere: in the Web UI's default views, and in media server/player plugins such as
Shokofin, which leave hidden episodes and their files out of your media library.

1. Open the series and go to the **Episodes** tab.
2. Hover over the episode's thumbnail and click the eye icon (**Hide Episode**).

To find hidden episodes again, set the **Hidden Status** filter to **Show Only Hidden Entries**, then use the same eye
icon (**Unhide Episode**) to bring one back. Hiding and unhiding requires an administrator account, and applies to every
user and every program connected to Shoko Server.

:::info Using Shokofin?
Hiding episodes changes more in Jellyfin than just the episode itself, for example which episodes count as the main
episodes of a series. See [Hidden Episodes](/jellyfin/concepts/episode-types-specials-and-extras#hidden-episodes).
:::

:::tip
Episodes with a type other than "Episode" are hidden by default. So if you can't find see your files here be sure to
change the default type filter from "Episodes" to "All" in the **Search & Filter** panel.
:::

#### Credits

The Credits tab displays all of the characters and staff that are associated with the current series. There is also a
sidebar with some basic filtering options as well as a quick action for force refreshing the AniDB data.

#### Images

The Images tab displays all of the posters, backdrops and logos which a series contains and is only relevant if a
series has a TMDB link. More information is available in the
[Extra Images](/shoko-server/metadata-features#extra-images) section of the Metadata Features page.

#### Tags

The Tags tab displays all of the tags that are associated with the current series. There is also a sidebar with some
basic filtering options as well as a quick action for force refreshing the AniDB data.

#### Files

The Files tab displays all of the files that are associated with the current series as well as a display for any files that may be missing (from regular episodes). There is also a sidebar containing an overview of said files.

### Edit Series

![Shoko Server - Collection - Series - Edit](/images/shoko-server/shoko-server-collection-series-edit.png)

The **Edit Series** button opens a modal (shown above) containing a large list of options across several categories.

<EasyTable :columns="editSeriesColumns" :data="editSeriesData" />

### Edit Tags

The **Edit Tags** button opens the **Custom Tags** modal, which allows you to control any custom tags that you may want
to assign to a series. Select a tag and click **Add** or **Remove** to assign or unassign it. Use **Create Tag** to make
a new custom tag, or **Edit Tags** to rename, describe or delete existing ones. Creating and editing tags requires an
administrator account.

:::warning Tags Used by Shokofin
Shokofin stores its per-series settings as custom tags, so they're kept on Shoko Server and apply to every Jellyfin
server connected to it. These tags are set from the **Series** tab in the Shokofin settings. Change them there instead
of adding or removing them by hand:

- `Shokofin/…`: for example the library structure, season ordering, specials placement and season merging for the
  series.
- `Series Type/…`: a series type override.

Shokofin also reads one tag you add yourself: `Target Audience/<rating>` (for example `Target Audience/TV-14`) overrides
the content rating Shokofin shows for that series. See
[Per-Series Settings](/jellyfin/concepts/library-structures-and-seasons#per-series-settings) and
[Ratings & Parental Controls](/jellyfin/how-to/ratings-and-parental-controls).
:::
