---
title: Collection Settings
description: "Collection settings in the Shoko Web UI: title languages and how related series are grouped."
---

# Collection

![Shoko Server - Settings - Collection](/images/shoko-server/shoko-server-settings-collection.jpg)

The **Collection** tab sets the languages used for series and episode names and descriptions, and how Shoko groups
related series. These settings affect more than the Web UI: media server/player plugins can use Shoko's groups and languages
too.

## Language Options

**Series Title**, **Episode Title** and **Descriptions** are lists of languages in order of preference. Use the plus
icon to add a language and drag languages to reorder them. Since a title or description may be missing in a language,
we recommend adding at least one fallback. An empty **Series Title** list falls back to the main title.

Every source's titles are read the same way: a title that's marked main or official, or carries no type at all,
answers for its language. **Also Use Synonyms** lets any other type answer as well, which is what you want when a
language has only a synonym or a short title to offer. Changes to the language lists require a restart.

That includes transcriptions. Romaji, pinyin and Korean transcriptions of a TMDB title are stored as synonyms, so they
only show up with synonyms turned on.

TMDB titles and descriptions are only stored for the languages listed here.

## Relation Options

| Option | What it does | Default |
| --- | --- | --- |
| **Auto Group Series** | Puts related series into the same group when they're added. | Off |
| **Determine Main Series Using Relation Weighing** | Lets Shoko pick each group's main series based on the relations between its series. | Off |
| **Exclude following relations** | Relations that don't count when grouping, for example **Alternative Version** or **Movie**. **Dissimilar Titles** also keeps related series apart when their titles don't resemble each other. | Same Setting, Character, Other |

These settings apply to your whole collection. To adjust individual groups afterwards, see
[Managing Groups](/shoko-server/collection#managing-groups).

:::info Applying Changes
Once you've changed these settings, run **Recreate All Groups** or **Rename All Groups** from **Actions**, depending on
what you changed. **Recreate All Groups** throws away groups you arranged by hand.
:::
