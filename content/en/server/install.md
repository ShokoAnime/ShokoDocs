+++ title = "Installing Shoko Server"
description = "Information on how to install Shoko Server."
aliases = ["/server"]
layout = "single"
[[pageNav]]
navTitle = "Install Platforms"
name = "Windows"
id = "windows"
[[pageNav]]
name = "Docker (Linux)"
id = "docker-linux"
[[pageNav]]
name = "Docker Compose (Linux)"
id = "docker-compose-linux"
[[pageNav]]
name = "Next Step"
id = "next-step"
+++

## Is Shoko Server Mandatory?{.page-first-header}

The short answer, **Yes**.

Shoko Server is where all the magic happens. It acts as a central database for every program and plugin under the Shoko
suite allowing you to access, maintain and watch your anime collection. This also means that Shoko Server **must be
running** to use any other program or plugin that connect to it. Outside of file importing, Shoko Server is no more
resource intensive than other programs you probably have running in the background, so you don't need to worry about
Shoko Server eating up resources.

### Windows

![Shoko Server - Windows Install](/assets/images/shoko-server/Shoko-Server-Install-Windows-01.jpg)

Navigate to the [Shoko Downloads](https://shokoanime.com/downloads/) page and download **Shoko Server**, unless told
otherwise we always recommend downloading the **Stable** version. The installer will guide you through the installation
process and should only take a couple of minutes.

### Docker (Linux)

Make sure you have docker installed before you continue. For most users are installing docker from their package manager
is advised, this way you will keep up with the latest updates and security updates. On the homepage
of [Docker](https://docs.docker.com/install/) you can find the installation procedure for your distribution of the
Docker Community Edition.

First things first, download the image, and unless otherwise told, install the version tagged as `latest`.

```bash
$ docker pull shokoanime/server:latest
```

Now, you can run the command below, after substituting the paths below (the second and third volume mount point) with
path(s) leading to your library and/or import folders.

```sh
$ docker run -d --name shokoserver --restart always -p 8111:8111 -v "$HOME/.shoko:/home/shoko/.shoko" -v "/path/to/anime:/mnt/anime" -v "/path/to/import:/mnt/import" -e PUID=$UID -e PGID=$GID --shm-size 256m shokoanime/server:latest
```

If you want a more detailed explanation, then refer to the below table for a break-down of the above command:

<table class="table table-bordered">
	<thead>
	<tr>
		<th>Command</th>
		<th>Purpose</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>
			<pre>docker run</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/" target="_blank" rel="noopener">Create a docker
				container from an image.</a>
		</td>
	</tr>
	<tr>
		<td>
			<pre>-d</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#detached--d" target="_blank" rel="noopener">Run in
				detached mode.</a>
			<br><br>
			Offloads the process to the background. If you want to control the container, you can
			either omit this flag or run docker attach followed by the container name to reattach to the container.
		</td>
	</tr>
	<tr>
		<td>
			<pre>--name shokoserver</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#name---name" target="_blank" rel="noopener">Name the
				container.</a>
			<br><br>
			If you do not assign a container name with the <code>--name</code> option, then the daemon generates a
			random string name for you. Defining a name can be a handy way to add meaning to a container. If you specify
			a name, you can use it when referencing the container within a Docker network.
		</td>
	</tr>
	<tr>
		<td>
			<pre>--restart</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#restart-policies---restart" target="_blank"
			   rel="noopener">Automatically restart the server on failure.</a>
			<br><br>
			Make the container automatically restart
			if it fails. Shoko is bound to fail a few times, so setting this flag ensures that it will automatically
			restart and resume where it left of.
		</td>
	</tr>
	<tr>
		<td>
			<pre>-p 8111:8111</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#expose-incoming-ports" target="_blank"
			   rel="noopener">Publish the container's ports.</a>
			<br><br>
			Binds the container's port to the same port on the host
			system, because otherwise a random port will be chosen on the host system - which we don't want to happen.
		</td>
	</tr>
	<tr>
		<td>
			<pre>-v "$HOME/.shoko:/home/shoko/.shoko"</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target="_blank"
			   rel="noopener">Mounts volumes.</a>
			<br><br>
			To preserve settings between updates, the settings folder must be
			remapped to a location outside the container. By default we map it to a folder in the user's home directory
		</td>
	</tr>
	<tr>
		<td>
			<pre>-v "/path/to/anime:/mnt/anime" -v "/path/to/import:/mnt/import"</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target="_blank"
			   rel="noopener">Mounts volumes.</a>
			<br><br>
			In order for Shoko Server to manage your collection, you must map at
			least one volume to the container.
			<br><br>
			<strong>Note #1:</strong> The first path in the mapping (<code>/path/to/anime</code>) is the location on your host
			computer, the second path (<code>/mnt/anime</code>) in the mapping is where you want to mount it inside the container.
			<br><br>
			<strong>Note #2:</strong> You can mount multiple library folders, and/or import folders, and they can be named
			any way you like (e.g. /anime, /import, /export, /tv_shows, etc.).
			<br><br>
			<strong>Note #3:</strong> When importing hard-linked files, be sure to mount the common root between your import folder and library
			folder. Otherwise you will get duplicate files, because the containers sees the mount-points as separate
			disks, and will copy-and-delete the file from the import folder to the drop-destination.
		</td>
	</tr>
	<tr>
		<td>
			<pre>-e PUID=$UID -e PGID=$GID</pre>
			<pre>-e TZ=Etc/UTC</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#env-environment-variables" target="_blank"
			   rel="noopener">Set Environment Variables.</a>
			<br><br>
			You can instruct the server to run as a certain set of
			user/group ids. This makes working with permissions a lot easier since you can match your server with a
			local account without effort. The example argument will make the server run with the uid and gid of the
			current user, to find the value to use for <code>PUID</code> and <code>PGID</code>, you can run log into the target
			system, either locally or over SSH, and execute the id command, supplied with the username of the user you
			want to the server to run as.
			<br><br>
			You can set the timezone with the <code>TZ</code> environment variable.
		</td>
	</tr>
	<tr>
		<td>
			<pre>shokoanime/server:latest</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/" target="_blank" rel="noopener">Specifies the Image
				to derive the container from.</a>
		</td>
	</tr>
	<tr>
		<td>
			<pre>--shm-size 256m</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources" target="_blank"
			   rel="noopener">Set Larger Shared Memory for AVDump3.</a>
			<br><br>
			AVDump3 requires access to a larger portion of shared IPC memory than the <strong>64MB</strong> available by
			default in docker containers, otherwise it might core dump when starting the dump process. Increasing it to
			<strong>256MB</strong> is enough to avoid this.
			<br><br>
			<strong>Note:</strong> AVDump3 is currently only available on the <strong>daily</strong> version of the server.
			If you're on <strong>stable</strong> then you can ignore this argument.
		</td>
	</tr>
	<tr>
		<td>
			<pre>-e AVDUMP_MONO=true</pre>
		</td>
		<td>
			<a href="https://docs.docker.com/engine/reference/run/#env-environment-variables" target="_blank"
				rel="noopener">Set Environment Variable for AVDump2.</a>
			<br><br>
			AVDump2 currently requires large dependencies, so by specifying this environment variable, it tells the container
			to pull the dependencies for AVDump2 to work.
			<br><br>
			<strong>Note:</strong> AVDump2 is currently only available on the <strong>stable</strong> version of the server.
			If you're on <strong>daily</strong> then you can ignore this argument.
		</td>
	</tr>
	</tbody>
</table>

### Docker Compose (Linux)

To make management easier, we can combine all the previous items in a docker compose file.

In order to make this work, install docker-compose, a guide how to can be
found [here](https://docs.docker.com/compose/install/) on the Docker website. Once **docker-compose** is installed,
create a **docker-compose.yml** file anywhere on your system. Open the file and put the following inside, but remember
to substitute the paths below with path(s) leading to your library and/or import folders.

```yaml
version: "3"
services:
  shoko_server:
    shm_size: 256m
    container_name: shokoserver
    image: shokoanime/server:latest
    restart: always
    environment:
      - "PUID=$UID"
      - "PGID=$GID"
      - "TZ=Etc/UTC"
    ports:
      - "8111:8111"
    volumes:
      - "$HOME/.shoko:/home/shoko/.shoko"
      - "/path/to/anime:/mnt/anime"
      - "/path/to/import:/mnt/import"
```

This combines all of our previous configuration in an easy to read and edit format, and will allow you to create a
powerful startup script that could (for example) include a MySQL server, a download client, and anything else you can
think of that’s available in a docker format.

#### Synology NAS

Make sure you have [Docker](https://www.synology.com/en-global/dsm/packages/Docker) installed on your Synology NAS
before you continue. This package can be found in the Package Center, under Third-party.

You will need to find your User ID (UID) before continuing. Log in to your Synology NAS using SSH and type `id`.
You'll see the UID: note down the number for later. To avoid getting your database cleared on updates, you can also
create a folder in the `docker` shared folder named `shokoserver` on the host and map it to `/home/shoko/.shoko`
in the container with R/W access.

Open Docker from the Application Menu, then go to the Containers tab. You'll need to download the
[Synology Container File](/server/synology-dockerfile.json) and <strong>fill out the anime folder path and replace the <code>PUID</code> your User's ID you previously acquired</strong>.
Once that's done, go to Settings, Import and select the file you've just modified. Name the container `shokoserver`, then apply!

<strong>Note #1:</strong> If you want to edit volumes or environment variables, you'll need to stop the container first.
<br><br>
<strong>Note #2:</strong> If you intend to use the <strong>daily</strong> version of the server then
AVDump3 might crash since we are unable to modify the shared IPC memory size through the proprietary
container format Synology uses, so if you do use this method to install the server then you have been
warned.

#### TrueNAS Scale

**Install Shoko as a Custom App:**

1. Navigate to **Apps -> Discover Apps -> Custom App**.
2. **Application Name:** Choose any name you'd like.
3. **Container Images:**
   - **Image Repository:** `shokoanime/server`
   - **Image Tag:** `latest`
4. **Container Environment Variables:**
   - **Environment Variable Name:** `PUID` | **Environment Variable Value:** `568`
   - **Environment Variable Name:** `PGID` | **Environment Variable Value:** `568`
   - This sets the Shoko user to run as the `Apps` built-in user. Ensure this user has access to your media folder.
5. **Port Forwarding:**
   - **Container Port:** `8111`
   - **Node Port:** {Any free port}
6. **Storage:**
   - [Optional] **Host Path:** Path to store your Shoko config → **Mount Path:** `/home/shoko/.shoko`
     - This mounts the Shoko container's home folder to a persistent host path.
   - [Required] **Host Path:** {Your media folder} → **Mount Path:** {Your desired container media folder}.
     - This allows the Shoko server to access your media.
7. **Portal Configuration:**
   - **Enable WebUiPortal:** Checked
   - **Port:** {Node Port from step 5}
   - This lets you click on the App's Web Portal to access the Shoko Web UI and is optional.
8. **Configure Container User and Group ID:**
   - Leave this alone to run as root, or configure it to run with a user that has access to modify permissions.
   - The Docker startup script attempts to create a Shoko user and will fail to start if it can't.
9. Hit **Save** and wait for the container to change to Running status.
10. Click **Web Portal** under Application Info to begin the setup.

#### Troubleshooting

- **Application is stuck in Deploying state:**
  - Navigate to **Workloads -> View Logs** to see what went wrong.
- **Shoko server does not see my media folder:**
  - Check the permissions on your media folder and ensure the user specified in the Container Environment Variables has access.

## Next Step

Once the server is installed, follow the instructions on the [First Run Setup](/server/setup) page to configure your
fresh install of Shoko Server.
