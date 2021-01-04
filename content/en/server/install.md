+++ title = "Installing Shoko Server"
description = "Information on how to install Shoko Server."
layout = "single"
[[pageNav]]
navTitle = "Install Platforms"
name = "Windows"
id = "windows"
[[pageNav]]
name = "Docker"
id = "docker"
[[pageNav]]
name = "Docker Compose"
id = "docker-compose"
[[pageNav]]
name = "Next Steps"
id = "next-steps"
+++

## Is Shoko Server Mandatory?{.page-first-header}

The short answer, **Yes**.

Shoko Server is where all the magic happens. It acts as a central database for every program and plugin under the Shoko suite allowing you to access, maintain and watch your anime collection. This also means that Shoko Server **must be  running** to use any other program or plugin that connect to it. Outside of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background, so you don't need to worry about Shoko Server eating up resources.

##### Windows

![Shoko Server - Windows Install](/assets/images/shoko-server/Shoko-Server-Install-Windows-01.jpg)

Navigate to the [Shoko Downloads](https://shokoanime.com/downloads/) page and download **Shoko Server**, unless told otherwise we always recommend downloading the **Stable** version. The installer will guide you through the installation process and should only take a couple of minutes. 

##### Docker

Make sure you have docker installed before you continue. For most users are installing docker from their package manager is advised, this way you will keep up with the latest updates and security updates. On the homepage of [Docker](https://docs.docker.com/install/) you can find the installation procedure for your distribution of the Docker Community Edition.

First things first, download the image, and unless otherwise told, install the version tagged as `latest`:

```bash
$ docker pull shokoanime/server:latest
``` 

Now, you can run the command below, after substituding the paths below (the second and third volume mount point) with path(s) leading to your library and/or import folders.

```sh
$ docker run -d --name shokoserver --restart always -p 8111:8111 -v "$home/.shoko:/home/shoko/.shoko" -v "/path/to/anime:/mnt/anime" -v "/path/to/import:/mnt/import" -e PUID=$uid -e PGID=$gid shokoanime/server:latest
``` 

If you want a more detailed explaination, then refer to the below table for a break-down of the abive command:

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
		<pre><code class="language-bash">docker run</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/" target="_blank" rel="noopener">Create a docker container from an image.</a></p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class="language-bash">-d</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#detached--d" target="_blank" rel="noopener">Run in detatched mode.</a></p>
		<p>Offloads the process to the background. If you want to control the container, you can either omit this flag or run <code class="language-bash">docker attach</code> followed by the container name to reattach to the container.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class="language-bash">--name shokoserver</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#name---name" target="_blank" rel="noopener">Name the container.</a></p>
		<p>If you do not assign a container name with the <code class="language-bash">--name</code> option, then the daemon generates a random string name for you. Defining a name can be a handy way to add meaning to a container. If you specify a name, you can use it when referencing the container within a Docker network.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class="language-bash">--restart</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#restart-policies---restart" target="_blank" rel="noopener">Automatically restart the server on failure.</a></p>
		<p>Make the container automatically restart if it fails. Shoko is bound to fail a few times, so setting this flag ensures that it will automatically restart and resume where it left of.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class="language-bash">-p 8111:8111</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#expose-incoming-ports" target="_blank" rel="noopener">Publish the container's ports.</a></p>
		<p>Binds the container's port to the same port on the host system, because otherwise a random port will be chosen on the host system - which we don't want to happend.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">-v "$home/.shoko:/home/shoko/.shoko"</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target="_blank" rel="noopener">Mounts volumes.</a></p>
		<p>To preserve settings between updates, the settings folder must be remapped to a location outside the container. By default we map it to a folder in the user's home directory</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">-v "/path/to/anime:/mnt/anime" -v "/path/to/import:/mnt/import"</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target="_blank" rel="noopener">Mounts volumes.</a></p>
		<p>In order for Shoko Server to manage your collection, you must map at least one volume to the container. </p>
		<p><strong>Note:</strong> You can mount multiple library folders, and/or import folders, and they can be named any way you like (e.g. /anime, /import, /export, /tv_shows, etc.).</p>
    {{< alert type="warning" heading="Warning" >}}
    <p>When importing hard-linked files, be sure to mount the common root between your import folder and library folder. Otherwise you will get duplicate files, because the containers sees the mount-points as seperate disks, and will copy-and-delete the file from the import folder to the drop-destination.</p>
    {{< /alert >}}
	</td>
</tr>
<tr>
    <td>
        <pre><code class="language-bash">-e PUID=$uid -e PGID=$gid</code></pre>
    </td>
    <td>
        <p><a href="https://docs.docker.com/engine/reference/run/#env-environment-variables" target="_blank" rel="noopener">Set Environment Variables.</a></p>
        <p>You can instruct the server to run as a certain set of user/group ids. This makes working with permissions a lot easier since you can match your server with a local account without effort.</p>
        <p>The example argument will make the server run with the uid and gid of the current user, to find the value to use for <code>PUID</code> and <code>PGID</code>, you can run log into the target system, either locally or over SSH, and execute the <code class="language-bash">id</code> command, supplied with the username of the user you want to the server to run as.</p>
    </td>
</tr>
<tr>
	<td>
		<pre><code class="language-bash">shokoanime/server:latest</code></pre>
	</td>
	<td>
		<p><a href="https://docs.docker.com/engine/reference/run/" target="_blank" rel="noopener">Specifies the Image to derive the container from.</a></p>
    <p></p>
	</td>
</tr>
</tbody>
</table>

###### Docker Compose

To make management easier, we can combine all the previous items in a docker compose file.

In order to make this work, install docker-compose, a guide how to can be found [here](https://docs.docker.com/compose/install/) on the Docker website. Once <code>docker-compose</code> is installed, create a <code>docker-compose.yml</code> file anywhere on your system. Open the file and put the following inside, but remember to substitute the paths below with path(s) leading to your library and/or import folders.

```yaml
version: "3"
services:
    shoko_server:
        container_name: shokoserver
        image: shokoanime/server:latest
        restart: always
        env:
            - "PUID=${uid}"
            - "PGID=${gid}"
        ports:
            - "8111:8111"
        volumes:
            - "${home}:/home/shoko/.shoko"
            - "/path/to/anime:/mnt/anime"
            - "/path/to/import:/mnt/import"
```

This combines all of our previous configuration in an easy to read and edit format, and will allow you to create a powerful startup script that could (for example) include a MySQL server, a download client, and anything else you can think off that’s available in a docker format.

##### Synology NAS

TBD

### Next steps

Once the server is installed, follow the instructions on the [First Run Setup](/server/setup) page to configure your fresh install of Shoko Server.
