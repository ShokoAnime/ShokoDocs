---
title: Installing Shoko Server
description: Information on how to install Shoko Server.
---

<script setup>
const containerColumns = [
  { name: 'name', header: 'Name' },
  { name: 'value', header: 'Value' },
  { name: 'description', header: 'Description' },
];

const containerData = [
  {
    name: 'PUID',
    value: '568',
    description: 'User ID for the Shoko server',
  },
 {
    name: 'PGID',
    value: '568',
    description: 'Group ID for the Shoko server',
  }
];
</script>

# Installing Shoko Server

The installation process for Shoko depends on the platform you're using. We strongly recommend following the provided
guide without deviations unless you're confident in what you're doing.

If your platform isn't listed in the navigation menu on the right, it doesn't necessarily mean that Shoko is
unsupported on your platform. It may simply indicate that a guide hasn't been written yet for your specific platform.

:::info Uncharted Territory
If you're using a platform that isn't listed here and get Shoko Server running, please consider contributing a guide
to help others in the community. You can do this by clicking the **Edit This Page** button at the bottom of this page.
:::

## Docker

Follow the instructions below to run Shoko on Linux using Docker. This is the recommended method for Linux and NAS
systems that support Docker. Running Shoko directly on Linux (bare metal) is not advised due to the additional
complexity and skill required for proper installation.

Ensure Docker is installed before proceeding. For most users, installing Docker through their package manager is
recommended, as this ensures you stay up-to-date with the latest updates and security patches. You can find the
installation procedure for your distribution of the Docker Community Edition in
[Docker's installation guide](https://docs.docker.com/engine/install/).

:::warning Before You Start: Docker Basics
This guide expects you to know your way around Docker. We won't cover Docker itself here, and most Docker installs
that go wrong do so because of something on this list, not because of Shoko. You should be comfortable with:

- **Containers and images**: what they are, and that a container keeps nothing you don't put in a volume. See
  [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- **Volumes (bind mounts)**: how a folder on your host shows up at another path inside the container. See
  [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/).
- **Port mappings**: how `8111:8111` makes the server reachable from your network. See
  [Published ports](https://docs.docker.com/engine/network/#published-ports).
- **Docker Compose**: starting, stopping and updating a stack with `docker compose up -d`, `down` and `pull`, and
  reading its output with [`docker compose logs`](https://docs.docker.com/reference/cli/docker/compose/logs/). See
  [Docker Compose](https://docs.docker.com/compose/).
- **Users and permissions**: finding the user and group IDs to use as **PUID** and **PGID** (`id <username>`), and
  making sure that user can read and write your folders.

New to all of this? Work through Docker's own [Get started](https://docs.docker.com/get-started/) guide first.
:::

### Images and Tags

Shoko Server's images are published to two registries, with the same images and tags on both:

| Registry | Image |
| --- | --- |
| GitHub Container Registry (default) | `ghcr.io/shokoanime/server` |
| Docker Hub | `shokoanime/server` |

| Tag | What you get |
| --- | --- |
| `latest` | The newest stable release. |
| `vX`, `vX.Y`, `vX.Y.Z` | A stable release kept to a major version, a minor version or an exact version, such as `v5`, `v5.3` or `v5.3.3`. |
| `daily` | The newest daily build, for testing what's coming. It can break things, so stick to `latest` unless you need it. |

Every tag works on both amd64 and arm64, and Docker picks the right one for your machine. Adding `-amd64` or
`-arm64` to a tag, such as `latest-arm64`, picks one yourself, which you'll rarely need.

A daily build can upgrade your database past what the stable release can read. Going back from `daily` to `latest`
then has to wait for the next stable release.

## Docker Compose (Recommended)

Docker Compose is automatically included with all recent versions of Docker, so its availability shouldn't be a
concern. However, if you encounter issues or are unsure, please refer to your NAS manual or the vendor's website
for confirmation.

It's important to note that Docker Compose is the **recommended method** for installing Shoko with Docker as it
simplifies service management. We've provided a pre-configured sample `docker-compose.yml` file in the **Docker Compose
Builder** below to streamline the configuration process. Simply adjust the fields in the configuration to suit your
setup.

:::warning
It is important to set the **PUID** and **PGID** to the correct user/group Shoko Server should run as, so make sure to
replace them with values appropriate for your setup!
:::

:::warning Mount Folders You Move Files Between as One Volume
Inside a container, every volume is a mount of its own. A program in the container can't tell that two of them come
from the same disk on the host, and a file only exists relative to the mount it's on, so moving it from one volume
to another can't just change where the file is listed. Shoko has to copy the file and delete the original instead.
That's slow for large files, needs room for both copies while it runs, and turns a hard-linked file into a second
full copy.

If Shoko moves files between managed folders, for example from a drop folder into your library, mount the folder they
have in common once, such as `/srv/media:/mnt/media`, and add `/mnt/media/incoming` and `/mnt/media/anime` as managed
folders. Don't mount `/srv/media/incoming` and `/srv/media/anime` as two volumes.
:::

### Docker Compose Builder

<DockerCompose />

## Docker (QNAP NAS)

This runs Shoko Server in Docker, so the [Docker basics](#docker) above apply here too.

Ensure that Docker is installed on your QNAP NAS before proceeding. You can find this package in the App Center,
listed under the name **Container Station**.

:::tip
Users have reported that managing containers with Container Station can sometimes be challenging. If you encounter
similar issues, we recommend creating the container using the Docker Compose instructions provided above.
:::

You can modify certain settings, like autostart, for the container later using the Container Station GUI.
Alternatively, you can use **Portainer**, which also allows you to manage the Docker Compose setup in a Stack through
an easy-to-use web GUI.

If you have any questions about using Portainer or Docker Compose on your QNAP NAS, feel
free to reach out to the community on our Discord Server.

### Regarding Container Station v3

As of this writing, the current version is 3.0.4.533, which was released with QTS 5.1.0.2466. If you're using an
older version of QTS or QTS hero (the ZFS variant of QTS), the available version and experience with Container Station
may differ significantly. We always recommend keeping your QNAP QTS and App Center updates current for the best
experience and security.

## Docker (Synology NAS)

This runs Shoko Server in Docker, so the [Docker basics](#docker) above apply here too.

Ensure that the [Synology Docker Application](https://www.synology.com/en-global/dsm/packages/Docker) is installed on
your Synology NAS before proceeding. You can find this package in the Package Center, under the **Third-party** section.

:::tip
Since managing containers with the Synology Docker Application can feel a bit clunky, we recommend creating the
container using the instructions provided under Docker Compose above.
:::

If you prefer to use the Synology Docker Application, follow these steps:

1. Open Docker from the Application Menu and navigate to the Containers tab.
2. Download the [Synology Container File](/files/synology-dockerfile.json).
3. Replace the `PUID`, `PGID`, and `/path/to/anime` in the file with your specific values.
4. Once you've made these changes, go to Settings, select Import, and choose the file you've just modified.
5. Name the container ShokoServer, then apply the settings.

:::warning Daily Server and Synology NAS
AVDump3 may crash due to the inability to modify the shm_size in the proprietary container format used by Synology.
As a result, we do not recommend running daily server on Synology NAS at this time.
:::

## TrueNAS Scale

This runs Shoko Server in Docker, so the [Docker basics](#docker) above apply here too.

There are two ways to run Shoko Server on TrueNAS Scale:

- **The catalog app.** [Shoko Server](https://apps.truenas.com/catalog/shoko-server/) has been in TrueNAS's community
  app catalog since [8 July 2025](https://github.com/truenas/apps/commit/9f0f3c720f46f02dea6b6894d03cb7958623c787).
  It's the easiest way, but its image is locked by hash to the latest stable release, so you get a new version only
  when the catalog app is updated, and you can't choose the daily build.
- **A custom app.** You set the image yourself, so you can pick the tag: `latest` for stable releases or `daily` for
  daily builds. You also decide where Shoko Server keeps its data, on a dataset you own.

### The Catalog App

1. Navigate to **Apps -> Discover Apps**.
2. Search for Shoko in the search bar.
3. Set the **Application Name** to your preference.
4. Set **Container Configuration**:
   - Timezone: set to your local timezone
   - Restart Policy: `Unless Stopped - Restarts the container irrespective of the exit code but stops restarting when the service is stopped or removed.`
5. Configure **Network Configuration**:
   - Change the port number to `8111` if you want. (all Shoko docs will mention this port value)
6. **Storage Configuration**:

   - **Optional**: Set the Config Storage Type to Host Path and point the Host Path to an location you control!
     (if you don't do this, it will by default install the database, configs and all image files on your boot drive and not your array!)

   - **Required**: Mount media folder by adding an additional storage.
     - Mount Path: Desired container media folder path (the path Shoko will read the Host path as)
     - Host Path Configuration: Enable ACL
     - Host Path: Your media folder location (an folder you have your anime or "anime" at.)
Note you can add as many of these media folders as you want and you can name the Mount Path whatever you want!
     - ACL Entries: Add one entry for Users and one for Groups. Both IDs should be the same used by Apps (usually **568**). In Access, select **Modify Access** for both entries.
     - ACL Options: Enabling Force Flag applies ACL even if the path has existing data.

7. Click **Save** and wait for the container status to change to "Running".
8. Access the setup page by clicking **Web UI** under Application Info.

### A Custom App

Choose **Custom App** under **Apps -> Discover Apps** instead, and set it up the way the
[Docker Compose Builder](#docker-compose-builder) does:

- **Image:** `ghcr.io/shokoanime/server`, with the tag `latest` or `daily`. See [Images and Tags](#images-and-tags).
- **Environment variables:** `PUID=568` and `PGID=568`, TrueNAS's own `apps` user and group, unless your folders
  belong to another user; `TZ` for your time zone; and `SHOKO_PORT=8111`.
- **Port:** `8111`, or another host port mapped to `8111` in the container.
- **Storage:** a host path on a dataset you own, mounted at `/home/shoko/.shoko` for Shoko Server's data, and your
  media folders as further host paths. Mount the folder your media folders have in common once, as in
  [Mount Folders You Move Files Between as One Volume](#docker-compose-recommended).
- **Restart policy:** Unless Stopped.

### Common Issues

You may encounter the following issues when setting up Shoko Server with TrueNAS Scale:

- Application is stuck in Deploying state:
  - Navigate to **Workloads -> View Logs** to see what went wrong.
- Shoko server does not see my media folder:
  - Check the permissions on your media folder and ensure the user specified in the Container Environment Variables has
    access. (by default User and Group ID 568 should be fine)

## Windows

Windows users have the simplest process.

Start by visiting the [Shoko Downloads](https://shokoanime.com/downloads/) page
and download Shoko Server. Unless instructed otherwise, choose the Stable version. Once the download is complete,
run the installer and follow the on-screen instructions.

The installation should only take a few minutes.

:::warning
We do not recommend using Docker on Windows with WSL or Hyper-V containers. This setup introduces an unnecessary
abstraction layer that may cause unforeseen issues. If you choose to proceed, you do so at your own risk, as we
cannot provide support for this configuration.
:::

## Bare Metal (Ubuntu)

:::danger
This option is **not recommended** because it requires manual updates whenever a new version is released, as automatic updates are not available.

Additionally, a strong understanding of Linux is needed to follow these steps and troubleshoot any issues that may occur. Please note that we are unable to provide direct support for installations performed using this method.
:::

#### Prerequisites

- **Ubuntu 18.04** or later.

#### 1. Update Your System

```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Install Required Dependencies

```bash
sudo apt install -y mediainfo librhash-dev
```

#### 3. Install .NET SDK and Runtime

- Add the Microsoft package repository
  ```bash
  wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  sudo dpkg -i packages-microsoft-prod.deb
  sudo apt-get update
  ```
- Install the .NET runtime and SDK:
  ```bash
  sudo apt-get install -y dotnet-sdk-10.0 aspnetcore-runtime-10.0
  ```

#### 4. Download Shoko Server

Download the latest release from the [Shoko Server Releases](https://github.com/ShokoAnime/ShokoServer/releases) page or use `wget`:

```bash
wget $(curl -s https://api.github.com/repos/ShokoAnime/ShokoServer/releases/latest | jq -r '.assets[] | select(.name | test("Shoko.CLI_Framework_any-x64.zip")) | .browser_download_url')
```

#### 5. Extract the Downloaded Archive

```bash
unzip Shoko.CLI_Framework_any-x64.zip -d ShokoServer
cd ShokoServer
```

#### 6. Make `Shoko.CLI` Executable

```bash
chmod +x Shoko.CLI
```

#### 7. Run Shoko Server

```bash
./Shoko.CLI
```

#### 8. Access the Web Interface

Open your browser and navigate to:

```
http://localhost:8111
```

#### (Optional) Run Shoko Server as a Service

To run Shoko Server as a background service:

#### 1. Create a systemd service file with the following structure:

  ```bash
  sudo nano /etc/systemd/system/shokoserver.service
  ```

  ```ini
  [Unit]
  Description=Shoko Server
  After=network.target

  [Service]
  Type=simple
  User=1000
  ExecStart=/path/to/ShokoServer/publish/Shoko.CLI
  WorkingDirectory=/path/to/ShokoServer/publish
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```

#### 2. Replace `/path/to/ShokoServer` with the actual path to your Shoko Server directory.

:::tip
`User=1000` will run the service as the default non-root Ubuntu user. Adjust this UID if a different user is required.
:::

#### 3. Go to the Shoko Directory and inside /publish, make `Shoko.CLI` executable

```bash
cd /ShokoServer/net8.0/linux-x64/publish/Shoko.CLI
chmod +x Shoko.CLI
```

#### 4. Reload systemd and enable the service:
  ```bash
  sudo systemctl daemon-reload
  sudo systemctl enable shokoserver
  sudo systemctl start shokoserver
  ```
#### 5. Check the status to ensure it’s running:
  ```bash
  sudo systemctl status shokoserver
  ```
#### 6. When you first navigate to `http://localhost:8111`, you may see a message stating that "The Shoko Web UI is not installed."
#### 7. Click on the **Install Shoko Web UI** button to proceed with the installation.
#### 8. Once installed, you will be able to access and use the Shoko Web UI for managing your library.
