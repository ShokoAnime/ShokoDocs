### Server
{{% hr %}}

{{< faq-section type="server" >}}
{{% faq type="server" id="import-issues" question="My Files Are Not Being Imported!" %}}

There are a number of possible reasons why you're files are not being imported. First, double-check your import folder settings and make sure you’ve selected the correct options that reflects your setup. If everything looks correct and running the **Run Import** action still fails to properly import your files then what's likely happening is one of two things. The files have been imported but the crc32 value does not match any files on AniDB or there were errors during the hashing process and Shoko server was unable to get the hash and compare it.

Using **Shoko Desktop**, navigate to **Utilities > Unrecognized Files** and if your files are showing up there, you can manually link them to the correct episode. if Shoko server was unable to get the hash, make sure no other program is accessing the files in question and try again by clicking **Run Import**.

{{% /faq %}}
{{% faq type="server" id="change-drop-destination" question="Can I Change My Drop Destination?" %}}

Yes, you are able to change your **Drop Destination** as many times as you want to fit your current setup. However please note that files located in your previous **Drop Destination** are not automatically moved into your **new Drop Destination** so its possible a series may be split and located in multiple folders.

{{% /faq %}}
{{% faq type="server" id="db-support" question="Why Was Support For MySQL / SQL Server Dropped?" %}}

Previously, Shoko did support both MySQL and SQL Server as possible database options due to multiple issues such as database access times and overall speed that were present when using an SQLite database with a large collection. Starting with **Version 3.6**, we've been steadily making improvements to address these issues that the benefits once provided by MySQL and SQL Server are now negligible. To that end and to reduce unrelated issues that could arise when using MySQL or SQL Server, support for MySQL and SQL Server as a database option has been deprecated and the option to select either of them has been removed.

{{% /faq %}}
{{% faq type="server" id="update-db-info" question="I Use MySQL / SQL Server, How Do I Update My DB Info?" %}}

Navigate to **C:\ProgramData\ShokoServer** and open the file labeled **settings.json**. You'll need to update the DB specific properties depending on what DB you use.

**MySQL Settings**

<table class="table table-bordered">
    <thead>
    <tr>
        <th>Property</th>
        <th>Property Value </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>DatabaseType</td>
        <td>MySQL</td>
    </tr>
    <tr>
        <td>MySQL_Hostname</td>
        <td>Default is localhost. If your MySQL DB is on another computer, use that IP.</td>
    </tr>
    <tr>
        <td>MySQL_SchemaName</td>
        <td>The name you gave to the Database.</td>
    </tr>
    <tr>
        <td>MySQL_Username</td>
        <td>Either the MySQL root account or the account you created.</td>
    </tr>
    <tr>
        <td>MySQL_Password</td>
        <td>The password you selected.</td>
    </tr>
    </tbody>
</table>

**SQL Server Settings**

<table class="table table-bordered">
    <thead>
    <tr>
        <th>Property</th>
        <th>Property Value </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>DatabaseType</td>
        <td>SQL Server</td>
    </tr>
    <tr>
        <td>SQLServer_Hostname</td>
        <td>Default is localhost. If your SQL Server DB is on another computer, use that IP.</td>
    </tr>
    <tr>
        <td>SQL_SchemaName</td>
        <td>The name you gave to the Database.</td>
    </tr>
    <tr>
        <td>SQL_Username</td>
        <td>Either the SQL root account or the account you created.</td>
    </tr>
    <tr>
        <td>SQL_Password</td>
        <td>The password you selected.</td>
    </tr>
    </tbody>
</table>

{{% /faq %}}
{{< /faq-section >}}
