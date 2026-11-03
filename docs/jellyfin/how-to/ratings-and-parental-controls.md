---
title: Ratings & Parental Controls | Jellyfin
description: Get sensible content ratings on your anime, fix the rating of a single series, and keep adult titles away from the wrong Jellyfin users.
---

# Ratings & Parental Controls

This guide gets content ratings onto your shows and movies, lets you correct the rating of a series when the automatic
estimate is off, and uses Jellyfin's parental controls to decide who can see what.

## Before You Start

- Content ratings come from TMDB certifications or from an estimate based on AniDB tags. How that estimate
  works is explained in [Tags, Genres & Content Ratings](/jellyfin/concepts/tags-genres-and-content-ratings#content-ratings).
- The rating settings in Shokofin are only visible in
  [Advanced Mode](/jellyfin/configuring-shokofin#advanced-mode).
- The refresh at the end doesn't re-create anything and doesn't touch watch state.

## Choose Where Ratings Come From

1. In Jellyfin, go to **Dashboard** → **Libraries**, open your Shokofin library's menu, choose **Manage library**, and
   set **Country/Region**. TMDB ratings are picked for this country. Leave it empty, or set it to the United States, if
   you want the AniDB estimate to be used as a fallback; the estimate is a US TV rating and only applies there.
2. In the Shokofin settings, enable Advanced Mode, then open **Metadata** → **Miscellaneous Settings** →
   **Content Rating Sources**.
3. Tick the sources you want and order them. The first source that has a rating for an item wins:
   - **TMDB | Follow country/region set in library** first, then
     **AniDB | Approximate content rating based on tags** (the default) prefers official certifications.
   - **AniDB | Approximate content rating based on tags** alone gives every entry a rating in the same US TV scale,
     even when it isn't linked to TMDB.
4. Click **Save**.

## Override the Rating of One Series

Use this when the estimate is clearly wrong, for example a family-friendly show rated TV-14 because of one tag.

### In Shoko Server

1. Open Shoko's Web UI, go to **Collection** and open the series.
2. Click the tag icon (**Edit Tags**) to open the **Custom Tags** dialog.
3. Click **Create Tag**. Name it `Target Audience/` followed by the rating you want, for example `Target Audience/TV-PG`,
   and click **Create**. Valid ratings are `TV-Y`, `TV-Y7`, `TV-G`, `TV-PG`, `TV-14`, `TV-MA` and `XXX`. You can
   append content indicator letters, e.g. `Target Audience/TV-14-V`.
4. Select the new tag and click **Add**, then **Close**.

Once a tag exists, you can add it to other series from the same dialog without creating it again.

The override replaces the AniDB estimate for that series. If **TMDB | Follow country/region set in library** is
first in your source list and TMDB has a rating for your country, the TMDB rating still wins. Move the AniDB source to
the top, or untick TMDB, if you want your overrides to always apply.

### In Jellyfin

1. Open the series, click the **⋮** menu and choose **Refresh metadata**.
2. Set the refresh mode to **Replace all metadata** and start the refresh.

To check it, open **Edit Metadata** on the series: **Parental rating** shows the new value.

## Restrict What Each Jellyfin User Can See

Entries AniDB marks as restricted (hentai) always get the custom rating `XXX` from Shokofin, on the show and on its
episodes, whatever your rating sources are.

1. In Jellyfin, go to **Dashboard** → **Users** and open the user you want to restrict.
2. Open the **Parental control** tab.
3. Set **Maximum allowed parental rating**. For example, `TV-14` hides TV-MA and XXX titles from that user.
4. Optionally enable blocking of items with no or unrecognized rating information, so entries without any rating are
   hidden too.
5. Click **Save**.

## Restricted Media and Watch-State Sync

Shokofin doesn't sync the watch state of restricted media to Shoko unless you allow it per user.

1. In the Shokofin settings, open the **Users** tab and select the Jellyfin user.
2. Enable **Sync Watch-State for Restricted Media** if that user's viewing of restricted titles should reach Shoko.
3. Click **Save**.

See [Sync Watch State](/jellyfin/how-to/sync-watch-state) for the rest of the user settings.

:::warning Don't use Shoko's tag restrictions on Shokofin's account
Shoko can hide series from a Shoko user under **Settings** → **User Management** → **Tag Restrictions**. Those
restrictions apply to everything that uses the account, including Shokofin. Don't set them on the administrator
account Shokofin connects with: the matching series disappear from Jellyfin entirely, which is a common cause of
"missing series" support requests. Restrict people in Jellyfin
instead, as described above. Also note that Shoko's tag restrictions only accept AniDB tags, not custom tags.
:::

## Check That It Worked

- Open a few shows and check **Edit Metadata** → **Parental rating**.
- Sign in as the restricted user. Titles rated above their maximum don't appear in the library, search or home screen.

## If It Didn't Work

- **No ratings at all**: the library's **Country/Region** is set to a country TMDB has no certification for, and the
  AniDB estimate doesn't apply outside the US. Clear the country or set it to the United States.
- **The override tag has no effect**: TMDB is first in **Content Rating Sources** and has a rating. Reorder the sources
  and refresh again.
- **Settings don't seem to apply**: see
  [Settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).
- **Series vanished from Jellyfin after changing Shoko users**: check the Tag Restrictions of the account Shokofin
  connects with. See [A series is missing from the library](/jellyfin/troubleshooting#a-series-is-missing-from-the-library).

## Related

- [Tags, Genres & Content Ratings](/jellyfin/concepts/tags-genres-and-content-ratings)
- [Settings Reference → Metadata](/jellyfin/configuring-shokofin#metadata)
- [Settings Reference → Users](/jellyfin/configuring-shokofin#users)
- [Sync Watch State](/jellyfin/how-to/sync-watch-state)
