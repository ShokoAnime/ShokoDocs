---
title: Configuring Shoko Relay
description: Information on how to install and configure Shoko Relay (Plex).
---

<script setup>
const serverSettingsColumns = [
  { name: 'Option', header: 'Option' },
  { name: 'Description', header: 'Description' }
];

const serverSettingsData = [
  {
    Option: 'The Shoko Server Username',
    Description: 'The username for the **local account** you created during the **First Run** setup in Shoko Server.'
  },
  {
    Option: 'The Shoko Server Password',
    Description: 'The password for the **local account** you created during the **First Run** setup in Shoko Server.'
  },
  {
    Option: 'The Shoko Server Hostname',
    Description: 'The IP address for the computer where Shoko Server is located. This can be left blank unless Shoko Server is running on a different computer.'
  },
  {
    Option: 'The Shoko Server Port',
    Description: 'The port Shoko Server uses, by default it is **8111**'
  },
  {
    Option: 'Use single season ordering',
    Description: 'If you set **SingleSeasonOrdering** to True during the install process, make sure you check this box.'
  }
];

const recommendedOptionsColumns = [
  { name: 'Option', header: 'Option' },
  { name: 'Setting', header: 'Setting' }
];

const recommendedOptionsData = [
  {
    Option: 'Collections',
    Setting: 'Hide items which are in collections'
  },
  {
    Option: 'Seasons',
    Setting: 'Hide for single-season series'
  }
];

const contentRatingsColumns = [
  { name: 'Tag', header: 'Tag' },
  { name: 'Rating', header: 'Rating' }
];

const contentRatingsData = [
  { Tag: 'Kodomo', Rating: 'TV-Y' },
  { Tag: 'Mina', Rating: 'TV-G' },
  { Tag: 'Shoujo, Shounen', Rating: 'TV-PG' },
  { Tag: 'Josei, Seinen', Rating: 'TV-14' },
  { Tag: 'Sexual Humour', Rating: 'TV-*-D' },
  { Tag: 'Nudity, Sex', Rating: 'TV-*-S' },
  { Tag: '__**__ Violence', Rating: 'TV-14-V' },
  { Tag: '__**__ Nudity, __*+__ Sex', Rating: 'TV-14-S' },
  { Tag: 'Borderline Porn (override)', Rating: 'TV-MA ' },
  { Tag: '__**+__ Nudity, __**__ Sex', Rating: 'TV-MA-S' },
  { Tag: '__**+__ Violence', Rating: 'TV-MA-V' },
  { Tag: '18 Restricted (override)', Rating: 'X' }
];
</script>

# Configuring Shoko Relay

If you chose Shoko Metadata as your Plex Agent/Scanner combo you can skip this page and move directly to
the [Syncing Watched States](/plex/syncing-watched-states) page.

### Creating A Shoko Relay Library

1. Add a Plex Library
    - While Shoko Server is running, open Plex and create a new "TV Shows" library.
    - Ensure that you have completed the **required edits** mentioned on
      the [Installing Agents & Scanners](/plex/installing-agents-scanners) page.

2. Add a Folder to Your Library
    - When prompted to add folders to your library, browse to your anime collection.
    - Even though Shoko will provide the metadata, Plex still needs to know where the physical files are located.

3. Configure the Advanced Settings
    - In the Advanced tab, select: Scanner **Shoko Relay Scanner** and Agent **ShokoRelay**.
    - Enter your Shoko Server credentials which are the only required settings.
    
    ![Shoko Relay - Inputting Server Information](/images/shoko-relay/Shoko-Relay-Inputting-Server-Info.jpg)

   For more information on each of the required settings consult the table below:

   <EasyTable :columns="serverSettingsColumns" :data="serverSettingsData" />

4. Change Recommended Options
    - Changing the following options at the bottom of Advanced Settings page is also recommended:

   <EasyTable :columns="recommendedOptionsColumns" :data="recommendedOptionsData" />

5. Add the Library
    - Once you've reviewed and configured the remaining options, click the **Add Library** button.
    - After adding the library, initiate a scan within Plex and wait for Plex to add your collection.
6. Allow Local Metadata
    - In Plex Navigate to: `Settings > Agents (Legacy) > Shows > ShokoRelay`
    - Move the following entry to the top of the list and enable it:
    - [x] Local Media Assets (TV)

### Recommended Shoko Server Configuration

Enable the following options in Shoko to ensure that Plex has at least one source of metadata for everything:

- `Settings > AniDB > Download Options`
    - [x] Character Images
    - [x] Creator Images
- `Settings > Metadata Sites > TMDB Options`
    - [x] Auto Link
    - [x] Auto Link Restricted
- `Settings > Metadata Sites > TMDB Download Options`
    - [x] Download Alternate Ordering
    - [x] Download Backdrops
    - [x] Download Posters
- `Settings > Collection > Relation Options`
    - [x] Auto Group Series
    - [x] Determine Main Series Using Relation Weighing

## Additional Information

### Troubleshooting

When encountering any issues with the scanner or agent, please note that there are detailed logs available in
the [Plex Media Server Logs Folder](https://support.plex.tv/articles/200250417-plex-media-server-log-files/) which can
help to pinpoint any issues:

- Agent Logs: `\Plex Media Server\Logs\PMS Plugin Logs\com.plexapp.agents.shokorelay.log`
- Scanner Logs: `\Plex Media Server\Logs\Shoko Relay Scanner.log`

:::important
When encountering bad matches/metadata the first thing to check for is if TMDB matches/episode mappings are correct in
Shoko for the series in question. Barring that, check AniDB's episode relations for the affected files.
:::

:::warning
Under extremely specific circumstances Plex will automatically group files together without user intervention. This occurs
when storing files from multiple AniDB entries in a single folder (that has no other subfolders present inside of it)
located in the root directory of a Plex library.

To resolve this there are several different approaches:

1. Nest the entire library within a new folder so folders affected by this are no longer in the root directory
2. Separate the files from each AniDB series into their own separate folders or subfolders
4. Create an empty subfolder in any directory affected by this
:::

### Handling "Stuck" Metadata

In cases where metadata (generally posters) won't update there is a quick 3 step process to fix it:

1. Navigate to the series → More "..." Button → Unmatch
2. Settings → Manage → Troubleshooting → Clean Bundles + Optimize Database
3. Navigate back to the series → More "..." Button → Match → Select top result

If this somehow still fails then a full [Plex Dance](https://forums.plex.tv/t/the-plex-dance/197064) is likely required.

### Cast & Crew Limitations

If "staff listings" are enabled in the settings the following custom agent limitations apply:

- All Cast & Crew members are listed under the cast section only
- Directors, Producers and Writers will be empty when attempting to filter for them in Plex
- All Crew members are available for filtering under Actor only
- The links in the Cast & Crew section under individual episodes won't return any results

### Automatic Season Naming Limitations

Due to custom agent limitations certain season names which contain special files will not name themselves correctly.
These can be renamed manually or with the included [force-metadata.py](/plex/shoko-relay-utility-scripts#force-metadata) script that
accesses the Plex API. The affected season names and their intended names are listed below:

- Season -1 → Credits **OR** [Unknown Season] → Credits
- Season -2 → Trailers
- Season -3 → Parodies
- Season -4 → Other

### Automatic Title Modification

##### Common Prefixes for Series

When a series starts with a common title prefix it will optionally be moved to the end of the title (for improved
alphabetical sorting). A list of the prefixes considered common by the agent are as follows:

- Gekijouban (plus several variants)
- Eiga
- OVA

##### Ambiguous Titles for Episodes

In cases where AniDB uses ambiguous episode titles the series title will be used instead (with the original title
appended to it as necessary). A list of the titles considered ambiguous by the agent are as follows:

- Complete Movie
- Music Video
- OAD
- OVA
- Short Movie
- Special
- TV Special
- Web

:::info
The appended titles will appear after an em dash (**—**) making it easy to search for anything affected by this.
:::

### TMDB Matching

If you have TMDB auto links enabled in Shoko or simply have a link for a given series, it will have access to several
features not available otherwise:

- Plex's default theme song support (using the TvDB ID provided by TMDB)
- Fallback for series/episode descriptions and titles (if AniDB is missing that information)
- Background/backdrop image support as well as additional main series poster options (if available)

With `SingleSeasonOrdering` disabled in the Scanner and Agent the following will also be supported:

- Season support for long running anime (including additional posters)
- Combining multiple Shoko series into a single Plex entry
- Alternate episode ordering for seasons

##### Curated TMDB Mappings

For users who are new to Shoko or don't have any TMDB links, two .csv files are available below which have been
manually checked for accuracy. Either of these files can be imported using Shoko's `/Tmdb/Import` v3 API endpoint in
[/swagger/](https://docs.shokoanime.com/faq#general) (Shoko's public API) to bypass fully auto-linking an unlinked library.

- [Shoko: AniDB → TMDB Mappings](https://gist.github.com/natyusha/129848213161c57101c9f39ed3f263ed)
- [Shoko: AniDB → TMDB Mappings (Comments)](https://gist.github.com/natyusha/b46aeaf2f5f6e5a9333d6f501be6c9ee)

##### Combining Series

This allows shows which are separated on AniDB to be combined into a single entry inside Plex. To Achieve this simply
multi-select (with the primary series as the first selection) the series in your Plex library which you know are part of
a single TMDB entry then select `Merge`.

Using Fairy Tail as an example all of the following series can be safely merged into a single entry in Plex if they are
correctly matched to TMDB in Shoko:

- Fairy Tail
- Fairy Tail (2011)
- Fairy Tail (2014)
- Fairy Tail (2018)

:::important
Only do this when you are happy with the metadata for the series to be merged as you will be unable to correctly refresh
it without splitting the series apart first.
:::

##### Alternate Episode Ordering

It is quite common for anime to have multiple ways of grouping the episodes into seasons. This includes: DVD/BD
ordering, stream site listings or even manga story arcs. If you used Shoko while it still had TvDB support you may find
that series in your Plex library are grouping differently than they used to be. Using Bleach as an example you can see
that [TMDB](https://www.themoviedb.org/tv/30984-bleach/seasons) doesn't split the original run into seasons
while [TvDB](https://thetvdb.com/series/bleach#seasons) does. Fortunately,
TMDB's [Episode Groups](https://www.themoviedb.org/tv/30984-bleach/episode_groups) page provides alternate ordering
options (often including TvDB's) in case you would like to use one of them instead.

If you have "Download Alternate Ordering" enabled under Shoko's "TMDB Download Options" this can be achieved using
Shoko's `/Tmdb/Show/{showID}/Ordering/SetPreferred` v3 API endpoint which is available via [/swagger/](https://docs.shokoanime.com/faq#general).

Once you have authenticated with swagger, you can navigate to the previously mentioned endpoint. Using Bleach as an example once
again, you would enter `30984` (Bleach's TMDB ID) into the `showID` box. Then you would the set the 16 character `AlternateOrderingID`
in the request body to one of the ones available [here](https://www.themoviedb.org/tv/30984-bleach/episode_groups)
(both IDs are available from the URL on TMDB). Lastly, click "Execute" and the order will be applied.

```json
{
  "AlternateOrderingID": "663fb548c10d4be3e80b2f6d"
}
```

:::info
If you select an alternate order for a series TMDB season posters will no longer be automatically added to Plex as those
are only for the default seasons.
:::

### Combining Episodes

Sometimes you may encounter a single episode which is split across multiple files. In order to ensure that all of the
files are treated as a single entity you can follow
Plex's [Naming Conventions](https://support.plex.tv/articles/naming-and-organizing-your-tv-show-files/#toc-6). For an
ideal playback experience, it is recommended to merge these types of files together.

### Minimum Tag Weights

Many tags on AniDB use a [3 Star Weight System](https://wiki.anidb.net/Tags#Star-rating_-_the_Weight_system) which
represents a value from 0 (no stars) to 600 (3 stars) and determines how relevant the tag is to the series it is applied
to. By setting this value in the Agent settings you can filter out tags below a certain star threshold.

### Assumed Content Ratings

If "assumed content ratings" are enabled in the agent settings the [target audience](https://anidb.net/tag/2606/animetb)
and [content indicator](https://anidb.net/tag/2604/animetb) tags from AniDB will be used to roughly match
the [TV Parental Guidelines](http://www.tvguidelines.org/resources/TheRatings.pdf) system. The target audience tags will
conservatively set the initial rating anywhere from TV-Y to TV-14, then the content indicators will be appended. If the
tag weights for the content indicators are high enough (> 400 or **\*\***) the rating will be raised to compensate. A
general overview is listed in the table below:

<EasyTable :columns="contentRatingsColumns" :data="contentRatingsData" />

:::info
Many series are missing these tags on AniDB so adding them is encouraged to help improve everyone's metadata.
:::