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

An AniDB ban is a common occurrence during the Shoko importing process for many users, usually triggered by excessive
connection attempts or large importing sessions, though it doesn't imply any wrongdoing on your part. You simply need
to wait for the ban to lift, which can range from 15 minutes to 24 hours, depending on severity.

AniDB's API imposes two distinct types of bans, namely **HTTP** and **UDP**. In case a user receives a temporary ban
for one
of these, Shoko will automatically cease sending data associated with the banned API. However, it will continue to
utilize the other API whenever feasible. It's important to note that this doesn't guarantee that all your commands
will be executed successfully since each API handles different sets of data. As a result, you may notice your queue
idling even when there are pending commands awaiting processing.

## Rate Limit & Enforcement

AniDB provides access to two different APIs, an HTTP API and a UDP API. Below are the official rate limits and the code
snippet from Shoko showing we enforce their specified rate limit.

### HTTP API

> You should not request more than one page every two seconds.
>
> [AniDB Wiki - HTTP API](https://wiki.anidb.net/HTTP_API_Definition#Flooding_and_Caching)

Code in Shoko to enforce this.

```c#
//ShokoServer/Shoko.Server/Providers/AniDB/HTTP/HttpRateLimiter.cs
public class HttpRateLimiter : AniDBRateLimiter
{
    protected override int ShortDelay { get; init; } = 2000;
    protected override int LongDelay { get; init; } = 4000;
    protected override long shortPeriod { get; init; } = 1000000;
    protected override long resetPeriod { get; init; } = 1800000;
}
```

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

Code in Shoko to enforce this.

```c#
//ShokoServer/Shoko.Server/Providers/AniDB/UDP/UDPRateLimiter.cs
public class UDPRateLimiter : AniDBRateLimiter
{
    protected override int ShortDelay { get; init; } = 2000;
    protected override int LongDelay { get; init; } = 4000;
    protected override long shortPeriod { get; init; } = 3600000;
    protected override long resetPeriod { get; init; } = 1800000;
}
```

## Mitigating AniDB Bans

Unfortunately, there's no surefire way to completely avoid bans when using AniDB, as their anti-leech system is quite
old and unlikely to be updated soon. However, there are some steps you can take to reduce the chances of getting banned:

### Exclusively Utilize Shoko

Shoko is designed to be the only anime-related tool you need, reducing the need for supplementary tools like
HAMA or AniDB media player plugins. When used alongside Shoko, these tools can expedite the occurrence of
your next ban.

### Adjust Your AniDB Settings

Be mindful of the amount of data you request. In the Settings section, you'll find options in the AniDB section
to select specific information for download. Customize these settings to only fetch the data that's important to you.
If you typically download content that has already finished airing, you can also consider spacing out your updates,
such as once a week, to lower the risk of bans.

### Utilize the XML Cache

When starting an import or handling a large number of series or episodes, it's a good idea to use a cache of XML
files available for download from the provided link. These files, placed in the XML cache directory, contain series
and episode information from AniDB. They allow Shoko to continue functioning smoothly, even in case of a ban. If
these cached files are recent enough, Shoko may not have to request updated information from AniDB unless you
specify otherwise.

:::info XML Cache Count
<XMLCacheInfo/>
:::

Please note, this is not a dump of the data on AniDB. These are files created and used by Shoko that is checked against
AniDB's data. [Click Here](https://files.shokoanime.com/files/shoko-server/other/Anime_HTTP.zip) to download the XML Cache and
follow the instructions below to utilize it.

#### XML Cache Location

<EasyTable :columns="osLocationColumns" :data="osLocationData" />

Unzip **Anime_HTTP.zip** and extract it into the directory listed above, depending on your platform. If prompted to
overwrite existing files, select yes and wait for it to be finished. Then proceed with importing your files.

For newer series, we recommend using the **Update AniDB Info** action for said series to pull the latest data.
