### General { .faq-header }

{{% hr %}}

{{< faq-section type="general" >}} {{% faq type="general" id="linux-support" question="Does Shoko Run On Linux?" %}}

Yes it Does!

Using [Docker](https://www.docker.com/) you can run **Shoko Server** natively on Linux. We've created
a [Linux Install Guide](/linux) that we highly recommend all Linux users follow to properly install Shoko Server. If
needed, additional support can be found by visiting our **Discord Server**.

Please keep in mind that Shoko Server on Linux is still in beta so issues are to be expected.

{{% /faq %}} {{% faq type="general" id="anidb-ban" question="I've Been Banned From AniDB?" %}}

The banned message you’re seeing is simply telling you that you’ve been **temporarily banned** for excessive connection
attempts. AniDB will sometimes temporarily ban a user if their system thinks you are attempting to leech data by making
excessive connection attempts within seconds. In reality, you’ve done nothing wrong and just need to wait out the ban
which can last anywhere from 15 minutes to 24 hours depending on the severity. Also keep in mind that browsing AniDB
while Shoko is scraping and downloading data can also increase the chance of getting a temporary ban as your creating
more connection attempts.

There are two different ban types, **HTTP or UDP** that a user can get that's based on AniDB's API. If a user is
temporarily banned from one, Shoko will automatically stop sending data associated with that API but will continue to
use the other API when possible. This does not mean all your commands will go through as each API sends and receives
different data, so you may notice your queue idling even though there are commands waiting to be processed.

##### Reducing & Avoiding AniDB Bans

Unfortunately, there is no way to guarantee that you won't get any bans. AniDB uses an old anti-leech system with no
plans to update or replace with something more modern. There are ways that you can get banned less often, though.

Only use Shoko to download data. Shoko can manage everything you could need. HAMA, AniDB plugins for media players, etc
all will conflict with Shoko and cause a temporary ban.

Pull less data. The AniDB section in the Settings tab in Shoko Desktop has settings to download only certain info. You
can limit it to only download data you care about. If you only grab things that are finished airing, then you can also
increase the time between updates to once a week, for example.

##### XML Cache:

During initial import or when importing many series at once, it helps if you don't need to download everything. You can
get a cache of XML files that hold series info from this [link](https://shokoanime.com/files/shoko-server/other/Anime_HTTP.zip). These go in the XML cache directory, and Shoko will use
them to keep moving forward in case of ban, and if they are recent enough, then it won't even bother calling AniDB for
updated info (unless you tell it to).

<table class="table table-bordered">
    <thead>
    <tr>
        <th>OS</th>
        <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Windows</td>
        <td>C:\ProgramData\ShokoServer\Anime_HTTP</td>
    </tr>
    <tr>
        <td>Linux</td>
        <td>~/.shoko/Shoko.CLI/Anime_HTTP</td>
    </tr>
    </tbody>
</table>

We're always making improvements to our rate limiter to avoid users getting a temporary ban. If you find yourself
getting banned for more than a day, join our **Discord Server**, so we can help diagnose the problem and make the
experience smoother for you.

{{% /faq %}} {{% faq type="general" id="site-streaming" question="Does Shoko Support Streaming From Different Websites?"
%}}

No, Shoko does not support streaming directly from websites such as Crunchy Roll.

{{% /faq %}} {{% faq type="general" id="collection-streaming" question="Does Shoko Allow Me To Stream My Collection" %}}

Yes it does!

Users can stream their anime collection to any Shoko supported program. While the majority of the work is done for you,
there are a few things you'll need to do in order to start streaming. First make sure port **8111** is forwarded to
allow outside access to Shoko. If using Shoko Desktop on another computer, make sure you're using one of the supported
video players listed in **Settings And Video Players**.

{{% /faq %}} {{% faq type="general" id="backup-collection" question="How Do I Backup My Collection?" %}}

While we currently do not offer a solution to backup your database whenever you'd like, we do automatically backup your
database before updating Shoko to the latest version. If you need to restore an older version you'll find your backups
in the following locations.

<table class="table table-bordered">
    <thead>
    <tr>
        <th>OS</th>
        <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Windows</td>
        <td>C:\ProgramData\ShokoServer\DatabaseBackup</td>
    </tr>
    <tr>
        <td>Linux</td>
        <td>~/.shoko/Shoko.CLI/DatabaseBackup</td>
    </tr>
    </tbody>
</table>

{{% /faq %}} {{< /faq-section >}}
