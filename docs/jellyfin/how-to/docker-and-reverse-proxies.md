---
title: Docker & Reverse Proxies | Jellyfin
description: Run Jellyfin with Shokofin and Shoko Server in Docker, or connect them through a reverse proxy.
---

# Docker & Reverse Proxies

Run Jellyfin and Shoko Server as containers, or behind a reverse proxy, and connect Shokofin to Shoko Server reliably.
When you're done, Shokofin connects on its own, maps your media folders, and keeps its generated files across container
updates.

## Before You Start

- Shoko Server is running and has identified the files you want in Jellyfin. See
  [Installing Shoko Server](/getting-started/installing-shoko-server).
- Shokofin is [installed](/jellyfin/installing-shokofin) in Jellyfin.
- You know which host folders contain your anime. Both containers need access to the same files, but they don't need to
  mount them at the same path.

## In Shoko Server

1. Put the Shoko Server and Jellyfin containers on the same Docker network. Containers on a shared network (including
   the default network of a single compose file) can reach each other by container name.
2. Mount your anime into the Shoko container and add the mount as a managed folder in the Shoko Web UI under
   **Settings** → **Import** → **Managed Folders** (on Shoko Server 5.x these are called import folders).
3. Keep port `8111` reachable from the Jellyfin container. Publishing the port to the host is only needed for access
   from outside Docker, such as your browser.

A minimal compose file for both containers looks like this:

```yaml
services:
  shoko:
    container_name: shoko
    image: ghcr.io/shokoanime/server:latest
    restart: always
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    ports:
      - "8111:8111"
    volumes:
      - ./shoko-config:/home/shoko/.shoko
      - /srv/media/anime:/mnt/anime

  jellyfin:
    container_name: jellyfin
    image: jellyfin/jellyfin:latest
    restart: always
    ports:
      - "8096:8096"
    volumes:
      - ./jellyfin-config:/config
      - ./jellyfin-cache:/cache
      - /srv/media/anime:/media/anime:ro
```

Shoko sees the files under `/mnt/anime` and Jellyfin under `/media/anime`. That's fine: Shokofin only needs the folder
tree *below* the mount to be the same. A file at `/mnt/anime/Series/Show/01.mkv` in Shoko must exist at
`/media/anime/Series/Show/01.mkv` in Jellyfin. See [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping).

## In Shokofin

1. In the Shokofin settings, open **Connection** and set **Private Host URL** to the Shoko container's name and port,
   for example `http://shoko:8111`.

   :::warning Don't use localhost
   Inside the Jellyfin container, `localhost` and `127.0.0.1` point at the Jellyfin container itself. Use the container
   name, or the host's LAN IP address if the containers aren't on a shared network.
   :::

2. Leave **Public Host URL** empty unless you want the "Shoko" links on item pages to open a different address, for
   example `https://shoko.example.com`. Images never need it; they're served through Jellyfin.
3. Enter an administrator **Username** and **Password** and click **Connect**.
4. Open **SignalR** and enable **Auto Connect on Start**, then click **Connect** to start the connection now.

:::warning Start order matters
**Auto Connect on Start** tries to connect only once, when Jellyfin starts. If Shoko Server isn't ready yet, Shokofin
stays disconnected until you click **Connect** under **SignalR** → **Connection Status**. Start Shoko Server first, for
example with `depends_on: [shoko]` on the Jellyfin service, or reconnect manually after a restart.
:::

## In Jellyfin

1. Keep Jellyfin's data volume (`/config` in the example above) on persistent storage. Shokofin generates its
   [Virtual File System](/jellyfin/concepts/virtual-file-system) inside Jellyfin's data directory. If that directory is
   lost when the container is recreated, the VFS is rebuilt on the next scan, and trickplay files that were still stored
   in it have to be regenerated.
2. Mounting the media read-only (`:ro`) works. Shokofin only needs write access to your media to move trickplay folders
   and external subtitle or audio files next to the video files. With a read-only mount these stay inside the VFS
   instead.
3. Create the library with the paths as Jellyfin sees them (`/media/anime` above), following the
   [Quick Start](/jellyfin/quick-start#creating-a-library).

The symbolic links in the VFS point to paths inside the Jellyfin container, so they look broken when you browse them
from the host. That's expected and harmless.

## Using a Reverse Proxy

If Jellyfin reaches Shoko Server through a reverse proxy, set **Private Host URL** to the proxied address, for example
`https://shoko.example.com`. The proxy must:

- serve Shoko Server on its own domain or sub-domain; running it under a path such as `example.com/shoko/` isn't
  supported,
- forward WebSocket upgrade requests for `/signalr/`, and
- allow long-lived connections, since the SignalR connection stays open.

Example configurations are on [Networking & Reverse Proxies](/shoko-server/networking#reverse-proxies). Going direct
between containers (`http://shoko:8111`) is simpler and avoids the proxy entirely.

## Check That It Worked

- **Connection** shows the Shoko Server version under **Server Version**.
- **SignalR** → **Connection Status** shows **Enabled, Connected**.
- **Library** → **Library Settings** lists your media folder with the Shoko managed folder it's mapped to.
- After you've run **Dashboard** → **Libraries** → **Scan All Libraries** (Jellyfin 10.11 and later) and the second
  scan Shokofin starts on its own has finished, the library shows your anime.

## If It Didn't Work

- The connection fails: test from inside the Jellyfin container, e.g. `docker exec jellyfin curl http://shoko:8111`.
  If that fails, the containers can't reach each other.
- A folder shows as not mapped: the folder tree below the mounts differs. See
  [A media folder shows Not Mapped](/jellyfin/troubleshooting#a-media-folder-shows-not-mapped).
- SignalR stays disconnected after a restart: see
  [SignalR is disabled after a restart](/jellyfin/troubleshooting#signalr-is-disabled-after-a-restart).

## Related

- [Media Folder Mapping](/jellyfin/concepts/media-folder-mapping)
- [The Virtual File System](/jellyfin/concepts/virtual-file-system)
- [Real-Time Updates (SignalR)](/jellyfin/concepts/real-time-updates)
- [Networking & Reverse Proxies](/shoko-server/networking)
- [Settings Reference: Connecting to Shoko Server](/jellyfin/configuring-shokofin#connecting-to-shoko-server)
