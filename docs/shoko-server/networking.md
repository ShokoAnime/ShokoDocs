---
title: Networking & Reverse Proxies
description: Ports, reverse proxies and live connections for Shoko Server and the programs that talk to it.
---

# Networking & Reverse Proxies

Shoko Server is a web server. The Web UI, media server/player plugins such as Shokofin, and other tools all talk to it over
HTTP. This page covers what those connections need, and how to put Shoko Server behind a reverse proxy.

:::warning Accessing Shoko Over The Internet
While it is possible to access Shoko over the internet, we strongly advise against it. Shoko Server was not originally
designed with this feature in mind and could expose you to potential security risks. If you need to access Shoko outside
of your local network, consider using a VPN.
:::

## Ports and Who Connects

Shoko Server listens on port `8111` by default. The port can't be changed in the Web UI; change it in the server's
settings file, or on Shoko Server v6 with the `SHOKO_PORT` environment variable.

| Program | Connects to Shoko Server from | Notes |
| --- | --- | --- |
| Web UI | Your browser | Served by Shoko Server itself, by default at `/webui`. |
| Shokofin (Jellyfin) | The Jellyfin server | Uses the API and a live SignalR connection. Jellyfin apps and browsers never connect to Shoko Server; images are passed through Jellyfin. |
| Plex agents and scanners | The Plex Media Server | Uses the API. |

These connections all go *to* Shoko Server: Shoko Server doesn't need to reach Jellyfin for Shokofin to work, so only
port `8111` (or your proxy) has to be reachable from the machine running Jellyfin. Shoko Server's own integrations, such
as AniDB and TMDB, connect out to the internet separately.

## Reverse Proxies

A reverse proxy is optional. For programs on the same machine or Docker network, connecting directly to port `8111` is
simpler. If you do use one, it must:

- serve Shoko Server on its own domain or sub-domain, such as `shoko.example.com`,
- forward WebSocket upgrade requests (used by [SignalR](#signalr)), and
- allow long-lived connections.

:::warning Use a domain or sub-domain, not a path
Shoko Server and its Web UI aren't built to run under a path on another site, such as `example.com/shoko/`. Give Shoko
Server its own domain or sub-domain instead.
:::

Programs that connect to Shoko Server, such as Shokofin's **Private Host URL**, then use that address, for example
`https://shoko.example.com`.

### Trusting Your Proxy

Shoko Server 6.0 can take the client's address, the scheme and the host of a request from the `X-Forwarded-For`,
`X-Forwarded-Proto` and `X-Forwarded-Host` headers your proxy sets — but only from proxies you list. Earlier versions
ignored those headers altogether.

List them under `Web.TrustedProxies` in the settings file, as IP addresses or CIDR ranges:

```json
{
  "Web": {
    "TrustedProxies": ["127.0.0.1", "172.16.0.0/12"]
  }
}
```

The `SHOKO_TRUSTED_PROXIES` environment variable sets the same list, written as a JSON array:

```bash
SHOKO_TRUSTED_PROXIES=["127.0.0.1","172.16.0.0/12"]
```

Restart Shoko Server after changing it. An entry that is neither an IP address nor a CIDR range is skipped, with a
warning naming it in the log. In a chain of proxies, every hop has to be listed for the one in front of it to be
read.

The list is empty by default, and an empty list trusts no one — not even loopback. Nothing breaks: Shoko Server
simply sees each request as coming from the proxy, over the scheme and host the proxy reached it on, so anything
that depends on the original request shows the proxy's instead.

### nginx

```nginx
server {
    listen 443 ssl;
    server_name shoko.example.com;

    location / {
        proxy_pass http://127.0.0.1:8111;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSockets for SignalR
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 1h;
        proxy_send_timeout 1h;
    }
}
```

### Caddy

Caddy forwards WebSockets automatically.

```caddyfile
shoko.example.com {
    reverse_proxy 127.0.0.1:8111
}
```

## SignalR

SignalR is how Shoko Server pushes live events, such as newly identified files, moved files and metadata updates, to the
Web UI and to Shokofin. It is served under `/signalr/` and requires an authenticated user or API key.

A SignalR client tries WebSockets first, then falls back to Server-Sent Events and finally long polling. Everything
works without WebSockets, but less efficiently, so make sure your proxy forwards them.

:::tip Keep tokens out of your logs
With WebSockets, the client sends its access token in the query string of the connection URL. If your proxy writes full
request URLs to its access log, those logs contain API keys. Exclude `/signalr/` from access logging or strip query
strings from the log format.
:::

If SignalR connections keep dropping or reconnecting, check your proxy's idle and read timeouts, and raise them as in
the examples above.

## Related

- [Running Shoko Server](/getting-started/running-shoko-server)
- [Docker & Reverse Proxies for Shokofin](/jellyfin/how-to/docker-and-reverse-proxies)
- [Real-Time Updates (SignalR) in Shokofin](/jellyfin/concepts/real-time-updates)
