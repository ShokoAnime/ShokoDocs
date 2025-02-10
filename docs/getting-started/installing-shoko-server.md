---
title: Installing Shoko Server
description: Instructions on how to install Shoko Server.
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

## Linux

Follow the instructions below to run Shoko on Linux using Docker. This is the recommended method for Linux and NAS
systems that support Docker. Running Shoko directly on Linux (bare metal) is not advised due to the additional
complexity and skill required for proper installation.

Ensure Docker is installed before proceeding. For most users, installing Docker through their package manager is
recommended, as this ensures you stay up-to-date with the latest updates and security patches. You can find the
installation procedure for your distribution of the Docker Community Edition on
the [Docker](https://docs.docker.com/install/) homepage.

## Docker Compose (Recommended)

Docker Compose is automatically included with all recent versions of Docker, so its availability shouldn't be a
concern. However, if you encounter issues or are unsure, please refer to your NAS manual or the vendor's website
for confirmation.

It's important to note that Docker Compose is the **recommended method** for installing Shoko with Docker as it
simplifies service management. We've provided a sample docker-compose.yml file below to streamline the configuration
process. This file consolidates all the settings, making them easy to edit.

If you need to adjust the configuration to suit your setup, feel free to use the **Docker Compose Builder** below to
modify the values according to your preferences. Otherwise, simply copy the generated config.

### Docker Compose Builder

<DockerCompose />

## Docker (QNAP NAS)

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

Follow these steps to set up a Shoko server using a custom app:

1. Navigate to **Apps -> Discover Apps -> Custom App**.
2. Set the **Application Name** to your preference.
3. Configure **Image Configuration**:
   - Repository: `ghcr.io/shokoanime/server`
   - Tag: `latest`
4. Set **Container Configuration**:
   - Timezone: set to your local timezone
   - Environment Variables:
     <EasyTable :columns="containerColumns" :data="containerData" />
     (These settings ensure Shoko runs as the built-in `Apps` user. Verify this user has access to your media folder.)
   - Restart Policy: `Unless Stopped - Restarts the container irrespective of the exit code but stops restarting when the service is stopped or removed.`
5. Configure **Network Configuration**:
   - Add a new port
   - Container Port: `8111`
   - Host Port: `8111`
   - Protocol: `TCP`
   - Extra for Truenas EE:
     - Container Port: `4556`
     - Host Port: `4556`
     - Protocol: `udp`
6. Portal Configuration (**Optional**):
   - Add a portal
   - Name: `Web UI`
   - Protocl: `HTTP`
   - Use Node IP: `checked`
   - Port: Use the Node Port from step 5. This allows access to the Shoko Web UI via the App's Web Portal.
   - Path: `/`
7. **Storage Configuration**:

   - **Optional**: Mount Shoko config -> If not mounted the DB will be lost on container restart
     - Host Path: Path to store Shoko config
     - Mount Path: `/home/shoko/.shoko`
   - **Required**: Mount media folder
     - Host Path: Your media folder location
     - Mount Path: Desired container media folder path

8. Click **Save** and wait for the container status to change to "Running".
9. Access the setup page by clicking **Web UI** under Application Info.

### Common Issues

You may encounter the following issues when setting up Shoko Server with TrueNAS Scale:

- Application is stuck in Deploying state:
  - Navigate to **Workloads -> View Logs** to see what went wrong.
- Shoko server does not see my media folder:
  - Check the permissions on your media folder and ensure the user specified in the Container Environment Variables has
    access.

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
  sudo apt-get install -y dotnet-sdk-8.0 aspnetcore-runtime-8.0
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

#### 6. Make the Shoko.CLI Executable

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

- Create a systemd service file with the following structure:

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

- Replace `/path/to/ShokoServer` with the actual path to your Shoko Server directory. `User=1000` will run the service as the default non-root Ubuntu user. Adjust this value if a different user is required.

- Reload systemd and enable the service:
  ```bash
  sudo systemctl daemon-reload
  sudo systemctl enable shokoserver
  sudo systemctl start shokoserver
  ```
- Check the status to ensure it’s running:
  ```bash
  sudo systemctl status shokoserver
  ```

:::tip
When you first navigate to `http://localhost:8111`, you may see a message stating that "The Shoko Server UI is not installed."

- Click on the **Install Shoko Server UI** button to proceed with the installation.
- Once installed, you will be able to access and use the Shoko Server UI for managing your library.
  :::
