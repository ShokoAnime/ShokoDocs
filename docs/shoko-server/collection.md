---
title: Collection
description: An overview of the Collection in Shoko's Web UI.
---

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

#### Display Options

These options which are accessed via the cog icon contain several checkboxes which control how much information is shown
in the collection view.

## Group Page

When clicking on a poster in the collection you will be taken to the corresponding **Group** page (if the series is
part of a group with more than one entry). From here you will be able to see all of the series in said group, sorted by
their release date. Along with this, there is a timeline to help visualise the air dates of larger groups.

### Edit Group

![Shoko Server - Collection - Group - Edit](/images/shoko-server/shoko-server-collection-group-edit.png)

While in this view it should also be noted that the **Filter Presets** button will switch to a new **Edit Group**
button. This will open a modal (shown below) which will allow you to: rename the group, set the default series, move a
series out of the group, or rename/move all of the files in the group according to your configuration.

## Series Page

When clicking on the poster of a stand alone entry from the collection or group views you will be taken to the series
page. This page contains almost all of the metadata for a given series while giving you access to several key features.

#### Overview

The Overview tab displays: **Metadata Sites**, Episode On Deck, Related Anime, Similar Anime, and Top 20 Actors. While fairly self explanatory it should be noted that the **Metadata Sites** section is where you can [manage TMDB links](/shoko-server/tmdb-features#managing-tmdb-links)

#### Episodes

![Shoko Server - Collection - Series - Episodes](/images/shoko-server/shoko-server-collection-series-episodes.jpg)

The Episodes tab displays a list of episodes as well as a sidebar for filtering them. Individual episodes can be hidden
or marked as watched by hovering over the thumbnail. By clicking **File Info** under an episode, you will also have
access to some advanced controls for the individual files assigned to it. These controls will allow you to: Force
Update Info, Add to MyList, Mark as Variation, Copy ShokoID, or even Delete the file itself.


#### Images

The Images tab displays all of the posters, backdrops and logos which a series contains and is only relevant if a
series has a TMDB link ([as detailed here](/shoko-server/tmdb-features#additional-image-support)).

### Edit Series

![Shoko Server - Collection - Series - Edit](/images/shoko-server/shoko-server-collection-series-edit.png)

The **Edit Series** button opens a modal containing a large list of options.


### Edit Tags

The **Edit Tags** button opens a modal which allows you to control any custom tags that you may want to assign to a
series. This also includes the ability to add, edit, or remove any existing custom tags as well.
