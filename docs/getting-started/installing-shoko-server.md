---
title: Installing Shoko Server
Description: Instructions on how to install Shoko Server.
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
  },
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
3. Replace the ``PUID``, ``PGID``, and ``/path/to/anime`` in the file with your specific values.
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
3. Configure **Container Images**:
	- Image Repository: `ghcr.io/shokoanime/server`
	- Image Tag: `latest`
4. Set **Container Environment Variables**:
	- These settings ensure Shoko runs as the built-in `Apps` user. Verify this user has access to your media folder.
	  <EasyTable :columns="containerColumns" :data="containerData" />
5. Configure **Port Forwarding**:
	- Container Port: `8111`
	- Node Port: Choose any available port
6. Set up **Storage**:
	- **Optional**: Mount Shoko config
		- Host Path: Path to store Shoko config
		- Mount Path: `/home/shoko/.shoko`
	- **Required**: Mount media folder
		- Host Path: Your media folder location
		- Mount Path: Desired container media folder path
7. Portal Configuration (**Optional**):
	- Enable WebUiPortal: Checked
	- Port: Use the Node Port from step 5. This allows access to the Shoko Web UI via the App's Web Portal.
8. Container User and Group ID:
	- If desired, leave as default to run as root.
	- Configure to run with a user that has permission to modify files. Note: The Docker startup script will attempt to
	  create a Shoko user and may fail to start if unsuccessful.
9. Click **Save** and wait for the container status to change to "Running".
10. Access the setup page by clicking **Web Portal** under Application Info.

### Common Issues

You may encounter the following issues when setting up Shoko Server with TrueNAS Scale:

- Application is stuck in Deploying state:
	- Navigate to **Workloads -> View Logs** to see what went wrong.
- Shoko server does not see my media folder:
	- Check the permissions on your media folder and ensure the user specified in the Container Environment Variables has
	  access.



