---
title: Titles & Artwork in Your Language | Jellyfin
description: Show titles, descriptions and artwork in your preferred language, with the original Japanese title kept alongside.
---

# Titles & Artwork in Your Language

By the end of this guide, your library shows titles, descriptions and posters in the language you choose, falls back
sensibly when a translation doesn't exist, and keeps the original title (for example the Japanese one) in Jellyfin's
*Original title* field.

```text
Before:  Shingeki no Kyojin                (romanized AniDB title)
After:   Attack on Titan                   (TMDB title in the library's language)
         Original title: 進撃の巨人
```

## Before You Start

- Titles and descriptions in most languages other than English come from TMDB. The series need to be
  linked to TMDB in Shoko. Most are linked automatically; see [Metadata Links](/shoko-server/metadata-links) to check
  or fix links.
- The last step refreshes every item in the library, which can take a while for large libraries. Nothing is
  re-created and watch state isn't affected.

## In Shoko Server

Shoko only downloads TMDB titles and descriptions for the languages you list, so start there.

1. Open Shoko's Web UI and go to **Settings** (the gear icon) → **Collection** → **Language Options**.
2. In **Series Title (Drag to Reorder)**, click the plus icon (**Add Language**) and add your language. Drag it to the
   top of the list.
3. Do the same in **Episode Title (Drag to Reorder)** and **Descriptions (Drag to Reorder)**.
4. Click **Save**.
5. Update the TMDB data of series you already have, so the new language gets downloaded (Shoko only downloads TMDB titles
   and descriptions for the languages in these lists): open a series in **Collection**,
   click **Edit Series** → **Update Actions** → **Update TMDB Info**. To do it for your whole collection, use the TMDB
   update actions under **Actions**.
6. Optional: pick the artwork you like for a series. Open the series, go to **Images** → **Posters**, select an image
   and click **Set As Preferred Poster**. Backdrops and logos work the same way.

## In Jellyfin

1. Go to **Dashboard** → **Libraries**, open your Shokofin library's menu and choose **Manage library**.
2. Set **Preferred download language** to your language, and **Country/Region** to your country.

   ![Shokofin - Library Settings - Language and Country](/images/shokofin/Shokofin-Library-Lang-and-Country.png)
3. Click **OK**. Don't refresh yet.

## In Shokofin

In the Shokofin settings, open the **Metadata** tab.

1. Under **Title Settings** → **Main Title**, tick these title sources and order them with the arrows:
   1. **TMDB | Follow metadata language in library**
   2. **AniDB | Follow metadata language in library**
   3. **Shoko | Let Shoko decide**

   Untick everything else. Series not linked to TMDB skip the first source; anything still missing falls back to
   Shoko's title.
2. Under **Alternate/Original Title**, tick only **AniDB | Use the language from the media's country of origin**.
3. Enable **Allow Any Title in Selected Language** under both titles if your language has few *official* titles on
   AniDB.
4. Click **Save**.
5. Under **Description Settings** → **Description Source**, tick and order:
   1. **TMDB | Follow metadata language in library**
   2. **Shoko | Let Shoko decide**

   For an English library, you can put **AniDB | Follow metadata language in library** second instead: AniDB
   descriptions are only available in English.
6. Click **Save**.
7. Under **Image Settings**, make sure **Respect Preferred Image in Automatic Image Search** is enabled.
8. In **Only Allow Posters By Language**, tick and order:
   1. **Follow metadata language in library**
   2. **No language / Text-less images**
   3. **Use the language from the media's country of origin**

   Do the same for **Only Allow Logos By Language** if you want logos in your language. Leave
   **Only Allow Backdrops/Banners/Thumbnails By Language** empty; most backdrops have no text anyway.
9. Click **Save**.

:::tip Different setups
- **English titles but romanized names for shows**: put **AniDB | Default title** first in **Main Title** and move the
  TMDB source to **Alternate/Original Title**.
- **Episodes in your language, shows by their romanized name**: use per-entity-type overrides, as described in
  [Titles, Descriptions & Images](/jellyfin/concepts/titles-descriptions-and-images#recipes).
:::

## Refresh the Library

1. Go to **Dashboard** → **Libraries**, open the library's menu and choose **Refresh metadata**.
2. Set the refresh mode to **Replace all metadata** and enable **Replace existing images**.
3. Start the refresh and let it finish.

## Check That It Worked

- Open a show that's linked to TMDB. Its name is in your language.
- Open **Edit Metadata** on the show. **Original title** holds the original-language title.
- Open an episode. Its title and description are in your language, when TMDB has a translation.
- The show's poster is in your language, or text-less if no localized poster exists.

## If It Didn't Work

- **Everything is still English or romanized**: the language probably isn't in Shoko's **Language Options** yet, or the
  TMDB data wasn't updated after adding it. Repeat the [In Shoko Server](#in-shoko-server) steps.
- **Only some shows changed**: the others aren't linked to TMDB. Check their links, or accept the AniDB fallback.
- **Nothing changed at all**: the refresh didn't replace existing metadata. See
  [Settings changes are not showing up](/jellyfin/troubleshooting#settings-changes-are-not-showing-up).
- **Titles or artwork from other sites mixed in**: another metadata provider is enabled for the library. See
  [Metadata is wrong or mixed](/jellyfin/troubleshooting#metadata-is-wrong-or-mixed).
- **An episode is still called *Episode 5***: Shokofin skips generic titles like that and moves on to the next source.
  If no source has a real title, the episode has none in any language.

## Related

- [Titles, Descriptions & Images](/jellyfin/concepts/titles-descriptions-and-images)
- [Settings Reference → Metadata](/jellyfin/configuring-shokofin#metadata)
- [Metadata Links in Shoko](/shoko-server/metadata-links)
- [Use TMDB Seasons](/jellyfin/how-to/use-tmdb-seasons)
