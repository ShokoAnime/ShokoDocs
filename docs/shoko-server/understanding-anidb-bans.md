---
title: Understanding AniDB Bans
description: Information on how to minimize your chances of receiving an AniDB Ban.
---

<script setup>
const osLocationColumns = [
  { name: 'OS', header: 'OS' },
  { name: 'Location', header: 'Location' }
];

const osLocationData = [
  {
    OS: 'Windows',
    Location: 'C:\\ProgramData\\ShokoServer'
  },
  {
    OS: 'Linux/macOS',
    Location: '~/.shoko/Shoko.CLI/'
  }
];
</script>

# Understanding AniDB Bans

Many people get a temporary AniDB ban at some point, usually during a large import or after too many requests in a
short time. It doesn't mean you did anything wrong. You only need to wait for it to lift, which takes anywhere from 15
minutes to 24 hours.

AniDB has two APIs, **HTTP** and **UDP**, and bans them separately. While one is banned, Shoko stops sending it
requests and keeps using the other. The top bar shows **AniDB UDP Ban Detected!** or **AniDB HTTP Ban Detected!**;
click it to see when Shoko checks again.

- A **UDP ban** holds file lookups, MyList updates and staff details.
- An **HTTP ban** holds fetching anime, but a series can still be created when Shoko has a cached copy of the anime
  (see [Utilize the XML Cache](#utilize-the-xml-cache)).

The tasks that need the banned API wait in the [queue](/shoko-server/concepts/the-queue), so the queue can sit idle
with tasks left until the ban is over.

Not every UDP problem is a ban. If Shoko can't log in to AniDB or never identifies a file and no ban is shown, the
UDP packets may not get through at all; see
[Check That Shoko Can Reach AniDB](/shoko-server/networking#check-that-shoko-can-reach-anidb).

## Rate Limit & Enforcement

AniDB provides access to two different APIs, an HTTP API and a UDP API. Below are the official rate limits and how
Shoko keeps to them.

### HTTP API

> You should not request more than one page every two seconds.
>
> [AniDB Wiki - HTTP API](https://wiki.anidb.net/HTTP_API_Definition#Flooding_and_Caching)

Shoko sends one HTTP request at a time, at least two seconds apart. Once it has been busy for about ten seconds, it
waits six seconds between requests, and it goes back to two seconds after two minutes without a request. The HTTP API
is mainly used to fetch the information of an anime and its episodes.

Shoko also doesn't fetch the same anime again too soon. Once it has fetched an anime, it uses what it has for the next
24 hours, even when you ask for an update, **Update AniDB Info - Force** included. Only **Refresh Anime Airing Soon**
fetches the anime about to air an episode past that wait. The wait is a setting, **Minimum Hours To Redownload Anime
Info** (`AniDb.MinimumHoursToRedownloadAnimeInfo` in `settings-server.json`, from 0 to 48 hours), not shown in the Web
UI.

<!-- TODO: once the Web UI can run executable actions, mention the "Update AniDB Info - Force" action: it skips the wait and ignores HTTP bans too (it asks for confirmation and can extend a ban), so warn about that. -->

AniDB caches its own answers too: what the HTTP API sends can be up to about 4 hours old. So a change made on AniDB can
take a few hours to reach Shoko, even right after the wait is over.

### UDP API

> Short Term:
> A Client MUST NOT send more than 0.5 packets per second (that's one packet every two seconds, not two packets a second!)
> The server will start to enforce the limit after the first 5 packets have been received.
>
> Long Term:
> A Client MUST NOT send more than one packet every four seconds over an extended amount of time.
> An extended amount of time is not defined. Use common sense.
>
> [AniDB Wiki - UDP API](https://wiki.anidb.net/UDP_API_Definition#Flood_Protection)

Shoko paces the UDP API the same way, counted separately from the HTTP API: two seconds between packets at first, six
seconds once it has been busy for about ten seconds, and back to two seconds after two minutes without a packet. The
UDP API is used to look up your files, update your MyList and fetch the details of staff and release groups.

## Mitigating AniDB Bans

There's no sure way to avoid bans completely: AniDB's anti-leech system is old and unlikely to change soon. These
steps lower the chances. If bans keep getting in your way, ask on our [Discord server](https://discord.gg/vpeHDsg) for
help with your setup.

### Exclusively Utilize Shoko

Shoko is meant to be the only tool that talks to AniDB for your collection, so you don't need tools like HAMA or
AniDB plugins for your media server or player. Used alongside Shoko, they can bring on your next ban sooner.

### Adjust Your AniDB Settings

Be mindful of the amount of data you request. The [Download Options](/shoko-server/settings/anidb#download-options)
under **Settings** → **AniDB** decide what Shoko fetches from AniDB besides the anime itself. Customize them to only
fetch the data that's important to you. How often Shoko updates its AniDB data is up to the triggers of the AniDB
[scheduled actions](/shoko-server/settings/scheduled-actions). If your collection is mostly anime that has finished
airing, you can space those out, such as once a week, to lower the risk of bans. For a first import, see
[Import a Large Collection](/shoko-server/how-to/import-a-large-collection).

### Identify Files Another Way

Every new file costs one AniDB UDP request to look up, so a big import keeps the UDP API busy for hours or days. A
release provider from a plugin that identifies files without asking AniDB takes most of that load off: placed above
AniDB under [Auto-Linking Release Providers](/shoko-server/settings/hashing-and-release#release-provider-options), it
answers for the files it knows, and AniDB is only asked about the rest. The UDP API is then left mostly to MyList
updates and the files nothing else knows. See [Release
Providers](/shoko-server/concepts/recognized-and-unrecognized-files#release-providers).

### Utilize the XML Cache

Before a large import, you can put a cache of XML files in Shoko's XML cache folder. The files hold the information
of many anime and their episodes from AniDB. Shoko reads them when it can't reach AniDB's HTTP API, for example during an HTTP
ban, so series can still be created while you're banned. Outside a ban, Shoko still asks AniDB for every anime it
doesn't have yet, so the cache doesn't save requests.

:::info XML Cache Count
<XMLCacheInfo/>
:::

This isn't a dump of AniDB's data: these are files Shoko created and uses, checked against AniDB's data.
[Download the XML cache](https://files.shokoanime.com/files/shoko-server/other/Anime_HTTP.zip) and follow the
instructions below to use it.

#### XML Cache Location

<EasyTable :columns="osLocationColumns" :data="osLocationData" />

Extract **Anime_HTTP.zip** into the folder listed above for your platform. If you're asked whether to overwrite
existing files, choose yes and wait for it to finish. Then import your files.

For newer series, use **Update AniDB Info** on the series (**Edit Series** → **Update Actions**) to get the latest
data from AniDB, once the [wait between fetches](#http-api) is over.
