+++
title = "Shoko Server - Linux Setup"
lastMod = 2019-04-24

[[pageNav]]
navTitle = "Getting Started"
name = "Installing Docker"
id = "installing-docker"
[[pageNav]]
name = "Running Shoko Server"
id = "running-shoko-server"
[[pageNav]]
name = "Managing Shoko Docker"
id = "managing-shoko-docker"
[[pageNav]]
navTitle = "Advanced Settings"
name = "UID / GID"
id = "uid-gid"
[[pageNav]]
name = "Creating settings.json"
id = "creating-settings-json"
[[pageNav]]
name = "Modify settings.json"
id = "modify-settings-json"

markup = "mmark"
+++

## Is Shoko Server Mandatory?

The short answer is **Yes**.

Shoko Server is the back-end of the entire Shoko suite, which means every single program and plugin provided uses it for accessing and maintaining your anime collection. This makes Shoko Server **mandatory** and also means Shoko Server **must be running** to use any of the programs or plugins that connect to it. With the exception of file importing, Shoko Server is no more resource intensive than other programs you probably have running in the background so you don't need to worry about Shoko Server eating up resources.

## Installing Docker

{{< tabs tabTotal="2" tabID="1" tabName1="Linux" tabName2="Synology NAS" >}}
{{< tab tabNum="1" >}}

Installing **Docker** will depend on what distribution you are running.

For most users installing docker from their package manager is advised, this way you will keep up with the latest updates and security updates. On the homepage of {{< external-link link="https://docs.docker.com/install/" text="Docker" >}} you can find the installation procedure for your distribution of the **Docker Community Edition**.

{{< /tab >}}
{{< tab tabNum="2" >}}

{{< page-column image-url="/assets/images/server/Synology-Docker-Install.jpg" image-alt="Synology Docker Install" >}}

Use the Package Center to install Docker.

{{< /page-column >}}

{{< /tab >}}
{{< /tabs >}}

## Running Shoko Server

{{< tabs tabTotal="2" tabID="2" tabName1="Linux" tabName2="Synology NAS" >}}
{{< tab tabNum="1" >}}

#### Getting the latest Shoko Server Docker Image

The latest Docker image is available on [Docker Hub](https://hub.docker.com/r/cazzar/shokoserver/). To get the image run the following in the command line.

```bash
docker pull cazzar/shokoserver
```

#### Docker Run

To run a basic docker container for Shoko Server, you can run the following from the command line.

```bash
docker run -p 8111 cazzar/shokoserver
```

This command will run a new empty docker instance with Shoko Server installed. At the same time port **8111** will be made available on the host to reach Shoko Server remotely. At this point you'll be able to use Shoko Desktop to connect to the server.

#### Advanced Docker Options

<table class = "table table-bordered">
<thead>
<tr>
	<th>Command</th>
	<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
	<td>
		<pre><code class = "language-bash">-p 8111:8111/tcp</code></pre>
	</td>
	<td>
		<p><a href = "https://docs.docker.com/engine/reference/run/#expose-incoming-ports" target = "_blank" rel = "noopener">Publishes the containers Ports.</a></p>
		<p>Simply put, you are binding the port on container to the port on host, otherwise a random port will be chosen on the host.</p>
		<p>TCP is used since UDP is not required.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">-v "/path/to/shoko/settings:/home/shoko/.shoko"</code></pre>
	</td>
	<td>
		<p><a href = "https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target = "_blank" rel = "noopener">Mounts volumes.</a></p>
		<p>To preserve settings between updates, the settings folder must be remapped to a location outside the container.</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">-v "/path/to/anime:/anime"</code></pre>
	</td>
	<td>
		<p><a href = "https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target = "_blank" rel = "noopener">Mounts volumes.</a></p>
		<p>In order for Shoko Server to manage your collection, you must map at least one volume to the container.</p>
		<p>Note: You can have multiple volumes, and they can be named any way you like (/anime, /tv_shows, /media, etc.)</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">-v "/path/to/import:/import"</code></pre>
	</td>
	<td>
		<p><a href = "https://docs.docker.com/engine/reference/run/#volume-shared-filesystems" target = "_blank" rel = "noopener">Mounts volumes.</a></p>
		<p>Optional: You may also map a import volume, there is no difference between this and the previous command - This is just another example to illustrate how adding additional volumes work.</p>
		<p>Note: You can have multiple volumes, and they can be named any way you like (also try: /downloads, /completed_torrents, etc.)</p>
	</td>
</tr>
<tr>
	<td>
		<pre><code class = "language-bash">cazzar/shokoserver</code></pre>
	</td>
	<td>
		<p><a href = "https://docs.docker.com/engine/reference/run/" target = "_blank" rel = "noopener">Specifies the Image to derive the container from.</a></p>
	</td>
</tr>
</tbody>
</table>

Putting everything together will get us the following configuration

```bash
docker run -d --name shokoserver --restart always -p 8111:8111/tcp -v "/path/to/shoko/settings:/home/shoko/.shoko" -v "/path/to/anime:/anime" -v "/path/to/import:/import" cazzar/shokoserver
```

This will provide you a Docker Shoko Server instance that runs in the background with persistent configuration, as well as expose it on your server to connect with Shoko Desktop / WebUI.

Note: If you run the Docker container as any other **uid/gid other than the default Shoko user** see the [Advanced Settings](#advanced-settings) section.
								
{{< /tab >}}
{{< tab tabNum="2" >}}

{{< page-column image-url="/assets/images/server/Synology-Docker-Registry-Settings.jpg" image-alt="Synology Docker Registry Settings" >}}

Open **Docker** from the **Main Menu**, select **Docker Registry** and than click the **Settings** button at the top.

By default, Synology's Docker is only configured to allow images downloaded from it's own private registry. Shoko Server is published to the Docker Hub, and that registry needs to be added to Synology Docker.

{{< /page-column >}}
{{% page-column image-url="/assets/images/server/Synology-Docker-Enter-Registry-Details.jpg" image-alt="Synology Docker Enter Registry Details" %}}

Click the **Add** button to add a new entry and input the following information.

<table class = "table table-bordered">
<thead>
<tr>
    <th>Name</th>
    <th>Value</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Registry Name</td>
    <td>Docker Hub</td>
</tr>
<tr>
    <td>Registry URL</td>
    <td>https://registry.hub.docker.com</td>
</tr>
<tr>
    <td>Trust SSL Self-Signed Certificate</td>
    <td>&#x2714;</td>
</tr>
</tbody>
</table>

Once down, click **Confirm** and then **Close**. 

{{% /page-column %}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Search-for-Shoko-Server.jpg" image-alt="Synology Docker Search for Shoko Server" >}}

You can now search repositories from the Docker Hub Registry. Enter **cazzar/shokoserver** into the search box above and click the **Search** button.

Check to make sure your results are accurate and click on the **cazzar/shokoserver** to chose a release to download.

{{% alert type="primary" heading="Available Releases" %}}

At this time there are only two releases available - 'Latest' and 'Daily'. There is no difference between the two builds. However they are updated frequently. A separate stable release will become available soon.

{{% /alert %}}
{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Download-Started.jpg" image-alt="Synology Docker Download Started" >}}

After selecting the release, a notification under images will appear and Shoko Server download will begin.

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Launch-Image.jpg" image-alt="Synology Docker Launch Image" >}}

Wait for the download to complete, then click Launch to create a container for Shoko Server (download size may differ).

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Advanced-Settings.jpg" image-alt="Synology Docker Advanced Settings" >}}

Click on **Advanced Settings**.

While not required, we recommend checking **Enable Auto Start** to start the container automatically. 

Learn more about {{< external-link link="https://docs.docker.com/config/containers/start-containers-automatically/" text="Enable Auto Restart." >}}

Once done, click on **Volume**. 

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Add-Volumes.jpg" image-alt="Synology Docker Add Volumes" >}}

Here you will mount volumes to folders on the host. This is done to preserve your settings between updates and to grant the container access to your shared folders.

Click on **Port Settings** to continue.

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Bind-Ports.jpg" image-alt="Synology Docker Bind Ports" >}}

Bind Local TCP Port 8111 to Container TCP Port 8111.

Once done, click **Next** to review your settings. 

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Create-Container.jpg" image-alt="Synology Docker Create Container" >}}

Review your settings and, if everything is correct, click **Apply**.

You can now view your newly created Shoko Server container by selecting **Container** from the menu on the left.

{{< /page-column >}}

{{< /tab >}}
{{< /tabs >}}

## Managing Shoko Docker

{{< tabs tabTotal="2" tabID="3" tabName1="Linux" tabName2="Synology NAS" >}}
{{< tab tabNum="1" >}}

#### Docker Compose

To make management easier, we can combine all the previous items in a docker compose file.

In order to make this work, install **docker-compose**, a guide how to can be found [here](https://docs.docker.com/compose/install/) on the Docker website. Once docker-compose is installed create a docker-compose.yml file anywhere on your system. Open the file and put the following inside.

```bash
version: "3"
services:
    shoko_server:
        container_name: shokoserver
        image: cazzar/shokoserver
        restart: always
        ports:
            - "8111:8111/tcp"
        volumes:
            - "/path/to/config:/home/shoko/.shoko"
            - "/path/to/anime:/anime"
            - "/path/to/import:/import"
```

This combines all of our previous configuration in an easy to read and edit format, and will allow you to create a powerful startup script that could (for example) include a MySQL server, a download client, and anything else you can think off that's available in a docker format.

{{< /tab >}}
{{< tab tabNum="2" >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-View-Details.jpg" image-alt="Synology Docker View Details" >}}

While viewing the Docker panel in the Synology web interface, click on **Container** to view the running containers.

If everything was set up correctly, Shoko Server should be automatically running and the details button will become available. Select the container and then click **Details**.

{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Details-Overview.jpg" image-alt="Synology Docker Details Overview" >}}

Here you can view and verify the Port settings and volume settings, as well as other information.

Once done, click **Terminal**.

{{% alert type="primary" heading="Verify Information" %}}

Please take a moment to check out the **MONO_VERSION** environment variable. When requesting support, please mention the **MONO_VERSION** you are using.

{{% /alert %}}
{{< /page-column >}}
{{< page-column image-url="/assets/images/server/Synology-Docker-Terminal.jpg" image-alt="Synology Docker Docker Terminal" >}}

The terminal view gives you the output of the Shoko Server session. It is a useful aid in quickly determining if there is an issue.

{{% alert type="primary" heading="Terminal Logging" %}}

The terminal view displays work being performed by the Shoko Server in real time. However, the web interface may not be able to handle the amount of information being displayed at once. In addition, there is no way to pause the display and the terminal window does not scroll. It is a useful tool to check the status of your server without Web UI - but for detailed logging information, please see the logs located in Shoko's log folder.

{{% /alert %}}
{{< /page-column >}}
{{< /tab >}}
{{< /tabs >}}

## Advanced Settings

Running shoko via docker has some additional features / options that might be useful some users.

#### UID / GID

In order to run the docker as a specific UID / GID you can specify it in the environment variables.

By default shoko runs with UserID 1000 and GroupID 100.

<table class = "table table-bordered">
<thead>
<tr>
    <th>Command</th>
    <th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
    <td>
        <pre><code class = "language-bash">-e PUID=xxx -e PGID=xxx</code></pre>
    </td>
    <td>
        <p><a href = "https://docs.docker.com/compose/environment-variables/" target = "_blank" rel = "noopener">Set EnvironmentVariables.</a></p>
        <p>To make docker run as a certain user/group you can define this through the ENV variables.</p>
        <p>This makes working with permissions a lot easier since you can match your docker with the local accounts on your machine withoutdoing much work</p>
        <p>If you getting errors with Denied folder access then the wrong PUID and PGID could be the cause.</p>
        <p>PGID 101 should be your admin group.</p>
        <p>To find the PUID on any user, login with said user with SSH or Telnet with <a href = "https://www.putty.org/" target = "_blank"rel = "noopener">Putty</a> or something similar with the <code class = "language-bash">ID</code> command.</p>
    </td>
</tr>
</tbody>
</table>

#### Creating settings.json

The default settings.json is stored within the image. When Shoko Server for Linux is started for the first time, it checks for the presence of settings.json and if it does not exist, then it copies the one from the image.

If at any time you need to reset the configuration back to the default settings, shut down Shoko Server for Linux and delete the settings.json file.

To create the settings.json file, start Shoko Server for Linux.

<table class="table table-bordered">
<thead>
<tr>
    <th>Default Setting</th>
    <th>Options</th>
    <th>Notes</th>
</tr>
</thead>

<tbody>
<tr>
    <td>/home/shoko/.shoko/Shoko.CLI/settings.json</td>
    <td>
        <p>Volume can be mounted to relocate files.</p>
    </td>
    <td>
        <p>Default Location for settings.json. </p>
        <p>Please note that this is the location as seen within the container.</p>
        <p>Depending on your installation, the actual location for settings.json may be in an alternate location.</p>
    </td>
</tbody>
</table>

#### Modify settings.json

Since Shoko Server for Linux runs without a graphical interface configurations must be made to the configuration file directly. Please note that the configurations shown below are the minimum required configurations needed to start the server. Not all configurable options are defined below. The default settings.json is stored within the image. When Shoko Server for Linux is started for the first time, it checks for the presence of settings.json. If it does not exist, it will copy the default one from the image. If at any time you need to reset the configuration back to the default settings, shut down Shoko Server for Linux and delete the settings.json file. To create the settings.json file, start Shoko Server for Linux.

{{% alert type="primary" heading="Concerning MySQL and SQL Server" %}}

Previously, Shoko did support both MySQL and SQL Server as possible database options due to an issue regarding some issues when using SQLite with a large collection. Starting with Version 3.6, we've been steadily making improvements to address this issue that the benefits once provided by MySQL and SQL Server are negligible. To that end support for MySQL and SQL Server as a database option has been deprecated.

Users who are currently using either MySQL or SQL Server can still edit their database information by directly editing **settings.json** located in the configuration folder defined in the docker run command.

{{% /alert %}}

<table class = "table table-bordered">
<thead>
<tr>
    <th>Default Setting</th>
    <th>Options</th>
    <th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
    <td>"DatabaseType": "SQLite",</td>
    <td>"SQLite", "SQLServer", "MySQL"</td>
    <td>By default it should be <strong>SQLite</strong>.</td>
</tr>
<tr>
    <td>"SQLServer_DatabaseServer": "localhost",</td>
    <td>"localhost", "xxx.xxx.xxx.xxx"</td>
    <td>SQLServer ONLY: This is the IP Address of the SQL Server</td>
</tr>
<tr>
    <td>"SQLServer_DatabaseName": "",</td>
    <td>"Shoko Server", "my_existing_name"</td>
    <td>SQLServer ONLY: This is the name of the SQL Server Database. If the database does not exist then it will be created.</td>
</tr>
<tr>
    <td>"SQLServer_Username": "",</td>
    <td>"sa","my_existing_username"</td>
    <td>SQLServer ONLY: This is username for the SQL Server Database.</td>
</tr>
<tr>
    <td>"SQLServer_Password": "",</td>
    <td>"my_sql_password"</td>
    <td>SQLServer ONLY: This is the password for the user account above, to be used for the SQL Server Database.</td>
</tr>
<tr>
    <td>"MySQL_Hostname": "localhost",</td>
    <td>"localhost", "xxx.xxx.xxx.xxx"</td>
    <td>MySQL ONLY: This is the IP Address of the MySQL Server</td>
</tr>
<tr>
    <td>"MySQL_SchemaName": "",</td>
    <td>"Shoko Server", "my_existing_name"</td>
    <td>MySQL ONLY: This is the name of the MySQL Server Schema. If the schema does not exist then it will be created.</td>
</tr>
<tr>
    <td>"MySQL_Username": "",</td>
    <td>"root","my_existing_username"</td>
    <td>MySQL ONLY: This is the username for the MySQL Server Database.</td>
</tr>
<tr>
    <td>"MySQL_Password": "",</td>
    <td>"my_mysql_password"</td>
    <td>MySQL ONLY: This is the password for the user account above, to be used for the MySQL Server Database.</td>
</tr>
<tr>
    <td>"AniDB_Username": "",</td>
    <td>"","my_AniDB_Username"</td>
    <td>OPTIONAL: This is your AniDB username. It is recommended to add your username if you are using an existing database.
    </td>
</tr>
<tr>
    <td>"AniDB_Password": "",</td>
    <td>"","my_AniDB_Password"</td>
    <td>OPTIONAL: This is your AniDB password. It is recommended to add your username if you are using an existing database.</td>
</tr>
</tbody>
</table>