+++
title = "Shoko Desktop - Utilities"
lastMod = 2019-04-22

[[pageNav]]
navTitle = "Getting Started"
name = "Unrecognized"
id = "Unrecognized"
[[pageNav]]
name = "Unrecognized Toolbar"
id = "unrecognized-toolbar"
[[pageNav]]
name = "Linking Options"
id = "linking-options"
[[pageNav]]
name = "File Options"
id = "file-options"
[[pageNav]]
name = "Ignored"
id = "ignored"
[[pageNav]]
name = "Manually Linked"
id = "manually-linked"
[[pageNav]]
name = "Duplicate Files"
id = "duplicate-files"
[[pageNav]]
name = "Multiple Files"
id = "multiple-files"
[[pageNav]]
name = "Missing MyList Files"
id = "missing-mylist-files"
[[pageNav]]
name = "Series Without Files"
id = "series-without-files"
[[pageNav]]
name = "Missing Episodes"
id = "missing-episodes"
[[pageNav]]
name = "Recommendations"
id = "recommendations"
[[pageNav]]
name = "AniDB AV Dump"
id = "anidb-av-dump"
[[pageNav]]
name = "File Search"
id = "file-search"
[[pageNav]]
name = "File Renaming"
id = "file-renaming"
[[pageNav]]
name = "Update AniDB Info"
id = "update-anidb-info"
[[pageNav]]
name = "Community Data"
id = "community-data"
[[pageNav]]
name = "My Votes"
id = "my-votes"

markup = "mmark"
+++

<section>
<h2 id = "unrecognized">Unrecognized</h2>
<div class = "row">
        <div class = "col-sm-8">
                <p>When importing your files to build your collection, any file that Shoko Server is unable to find on AniDB (by matching hashes) will be listed in
                        the unrecognized tab. Keep in mind that just because a file is listed as unrecognized, it does not always mean a record for that series,
                        episode, movie or special does not exist on AniDB. It simply means that that the version or file you have in your collection is not known to
                        AniDB.</p>
                <p>There are a various reasons as to why your file ended up in the unrecognized list, they usually all fit into
                        one of the following groups.</p>
                <ul>
                        <li>Unknown Release</li>
                        <li>Error When Hashing</li>
                        <li>Corrupted File</li>
                        <li>Not a Video File</li>
                </ul>
                <p>It’s important to note that a corrupted file does not mean a broken file, in other words just because a file is corrupt it does not mean the file
                        has playback issues. What usually happens is the copy you downloaded has slight variations from the official source which results in the
                        CRC32 hash value and hash being different which is why the file is unrecognized. If this is the case then <strong>you should not submit your
                                file to AniDB </strong> as it will be rejected, instead it needs to be Manually Linked. If the file has never been submitted before
                        then there will be nothing to check against which is why the file is unrecognized. You can submit the file to AniDB using AVDump2 which will
                        add the file which will benefit all users of Shoko. To check, simply navigate to the episode on AniDB to which the file corresponds too and
                        look for an entry form the release group you have, if it's there then the file you have is corrupted, if it's not then you can add it.</p>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Main.jpg" data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Main.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Unrecognized Overview"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - Unrecognized Overview
                        </figcaption>
                </figure>
        </div>
</div>

<h3 id = "unrecognized-toolbar">Unrecognized Toolbar</h3>
<div class = "row">
        <div class = "col-sm-8">
                <p>At the top of the Unrecognized List is the Unrecognized Toolbar which provides you with some useful file
                        options. </p>
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Button</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>Refresh</td>
                                <td>The Refresh button will refresh your view, and add any files that have been added since initially selecting the Unrecognized
                                        utility.
                                </td>
                        </tr>
                        <tr>
                                <td>Search</td>
                                <td>Useful for users with a lot of unrecognized files, will search through the unrecognized list for the parameter you've
                                        specified.
                                </td>
                        </tr>
                        <tr>
                                <td>Rescan All</td>
                                <td>Rescans the file(s) sending the file(s) <strong>current hash</strong> to AniDB to check for a match, useful for newer files or
                                        obscure fansub groups.
                                </td>
                        </tr>
                        <tr>
                                <td>Rehash All</td>
                                <td>Rehashes the file(s) sending the file(s) <strong>new hash</strong> to AniDB to check for a match, useful for files that
                                        encountered an issue during the initial hashing.
                                </td>
                        </tr>
                        <tr>
                                <td>Logs</td>
                                <td>Opens the location of the log folder for Shoko Desktop.</td>
                        </tr>
                        </tbody>
                </table>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Toolbar.jpg"
                                data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Toolbar.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Manual Episode Linking"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - Unrecognized Toolbar
                        </figcaption>
                </figure>
        </div>
</div>

<h3 id = "linking-options"> Linking Options</h3>
<div class = "row">
        <div class = "col-sm-8">
                <p>The first two sections, <strong>Link Confirm</strong> and <strong>Link Setup</strong> deal with manually linking your unrecognized file, for
                        example if the file is corrupted or a custom encode. </p>
                <p>After selecting the file or files, select the <strong>Series</strong> the files are apart of. If you are linking a single episode then select the
                        <strong>Single Episode</strong> option in the box below the series box and the <strong>Actual Episode</strong> in the second box. If you
                        have selected multiple unrecognized files then select the <strong>Episode Range </strong>option in the first box and input the episode range
                        in the input fields. In the event that an entire series is listed in the unrecognized files list, you may have to first manually add the
                        series. Click the <strong>New Series</strong> button and follow the steps to manually add the series.</p>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Manual-Options.jpg"
                                data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-Manual-Options.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Manual Episode Linking"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - Manual Episode Linking
                        </figcaption>
                </figure>
        </div>
</div>

<h3 id = "file-options"> File Options</h3>
<div class = "row">
        <div class = "col-sm-8">
                <p>When you select a file, a panel will display below <strong>Link Setup</strong> showing a array of file options and file info. </p>

                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Button</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>Play</td>
                                <td>Opens the file in your selected video player for playback.</td>
                        </tr>
                        <tr>
                                <td>Delete</td>
                                <td>Deletes the selected file.</td>
                        </tr>
                        <tr>
                                <td>Ignore</td>
                                <td>Marks the file as ignored, files marked as ignored will not show up on the unrecognized files list.</td>
                        </tr>
                        <tr>
                                <td>Rescan</td>
                                <td>Rescans the file(s) sending the file(s) <strong>current hash</strong> to AniDB to check for a match, useful for newer files or
                                        obscure fansub groups.
                                </td>
                        </tr>
                        <tr>
                                <td>Rehash</td>
                                <td>Rehashes the file(s) sending the file(s) <strong>new hash</strong> to AniDB to check for a match, useful for files that
                                        encountered an issue during the initial hashing.
                                </td>
                        </tr>
                        <tr>
                                <td>AvDump2</td>
                                <td>Sends the file to the AniDB AvDump utility.</td>
                        </tr>
                        <tr>
                                <td>Open Folder</td>
                                <td>Opens the folder where the selected file is. Please note, this option is not available if the file is located on a <strong>Cloud
                                        Provider</strong>.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-File-Info.jpg"
                                data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Unrecognized-File-Info.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - File Info"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - File Info
                        </figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "ignored">Ignored</h2>
<div class = "row">
        <div class = "col-sm-8">
                <p>The Ignored utility shows all files that you've previously marked as <strong>Ignored</strong> when previously sorting through your <strong>Unrecognized</strong>
                        files. </p>

                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Button</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>Play</td>
                                <td>Opens the file in your selected video player for playback.</td>
                        </tr>
                        <tr>
                                <td>Delete</td>
                                <td>Deletes the selected file.</td>
                        </tr>
                        <tr>
                                <td>Restore</td>
                                <td>Removes the ignored flag adding the file back to the Unrecognized list.
                                </td>
                        </tr>
                        <tr>
                                <td>Open Folder</td>
                                <td>Opens the folder where the selected file is. Please note, this option is not available if the file is
                                        located on a <strong>Cloud Provider</strong>.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Ignored-Main.jpg" data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Ignored-Main.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Ignored Overview"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - Ignored Overview
                        </figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "manually-linked">Manually Linked</h2>
<div class = "row">
        <div class = "col-sm-8">
                <p>All files that you've manually linked in the <strong>Unrecognized</strong> utility will be listed here to
                        keep track of files in your collection that do not have a corresponding hash on AniDB. The Manually Linked
                        toolbar will not be covered below as it's a reduced version of the <a href = "#unrecognized-toolbar">
                                Unrecognized Toolbar</a>.</p>

                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>Play</td>
                                <td>Opens the file in your selected video player for playback.</td>
                        </tr>
                        <tr>
                                <td>Rescan</td>
                                <td>Rescans the file(s) sending the file(s) <strong>current hash</strong> to AniDB to check for a match,
                                        useful for newer files or obscure fansub groups.
                                </td>
                        </tr>
                        <tr>
                                <td>Delete</td>
                                <td>Removes the link to the series/episode and places the file back into the Unrecognized List</td>
                        </tr>
                        <tr>
                                <td>AvDump2</td>
                                <td>Sends the file to the AniDB AvDump utility.</td>
                        </tr>
                        <tr>
                                <td>File Info</td>
                                <td>Shows the series and episode the file is linked to.</td>
                        </tr>
                        </tbody>
                </table>
        </div>

        <div class = "col-sm-3">
                <figure class = "figure">
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Manual-Link.jpg" data-toggle="lightbox" data-lightbox="image-1"> <img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-Manual-Link.jpg"
                                class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Manual Link"/> </a>
                        <figcaption class = "figure-caption">
                                Shoko Desktop - Manual Link
                        </figcaption>
                </figure>
        </div>
</div>
</section>


<section>
<h2 id = "duplicate-files">Duplicate Files</h2>
<p>The list of all files that have two or more versions of the same episode / movie</p>
<div class = "row">
        <div class = "col-sm-8">
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Refresh info from the server
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Re-evaluate All Entries
                                </td>
                                <td>
                                        Rescan all the files to find any missing duplicates
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure>
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-duplicate.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-duplicate.jpg" class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Duplicates"/></a>
                        <figcaption>Duplicates</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "multiple-files">Multiple Files</h2>
<p>
        The list of all files that have two or more versions of the same episode.</p>
<div class = "row">
        <div class = "col-sm-8">
                <p>The Multiple Files tab allows you to clean any duplicate versions you have of the same episode.</p>
                <p>The Auto Deletion Settings allows you to automate the deletion of extra versions, based on paterns. </p>
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Refresh info from the server.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure>
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-multiple.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-multiple.jpg" class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Multiple"/></a>
                        <figcaption>Multiple</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "missing-mylist-files">Missing MyList Files</h2>
<p>Compare your collection with your AniDB MyList.</p>
<div class = "row">
        <div class = "col-sm-8">
                <p>The missing MyList compares your current AniDB collection with your Shoko Managed Collection </p>
                <p>If you have files on AniDB that are not in your current collection, you can allow Shoko to remove all of the missing files from AniDB</p>
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        View Missing Files
                                </td>
                                <td>
                                        List all the files in your AniDB MyList and compare with your current collection.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Remove All Entries from AniDB
                                </td>
                                <td>
                                        Remove all entries from AniDB that are not in your current collection.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missingmylist.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missingmylist.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Missing MyList"/></a>
                        <figcaption>Missing MyList</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "series-without-files">Series Without Files</h2>
<p>Here you can find all the shows that do not have any files assigned to it</p>
<div class = "row">
        <div class = "col-sm-8">
                <p>After refershing the view you can delete the shows that have no episodes from the list by pressing the red X button.</p>
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Refresh the list to get a list of all the Series
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-serieswithoutfiles.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-serieswithoutfiles.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Series Without Files"/></a>
                        <figcaption>Series Without Files</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "missing-episodes">Missing Episodes</h2>
<p>The list of all any missing episodes of series you are collecting.</p>
<div class = "row">
        <div class = "col-sm-8">
                Refresh the list (with any addional filters checked / selected) to receive a list of missing episodes.
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Refresh the list to get a list of all the Series.
                                </td>
                        </tr>

                        <tr>
                                <td>
                                        Export
                                </td>
                                <td>
                                        Export the list to CSV file.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Columns
                                </td>
                                <td>
                                        Show/Hide additional columns
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Only Release Groups I Am Collecting
                                </td>
                                <td>
                                        Show only the entries which match the Groups you selected for collection.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Regular Episodes Only
                                </td>
                                <td>
                                        Don't check for Specials or any non-normal episode.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Airing State
                                </td>
                                <td>
                                        Show All / Still Airing / Finished Airing only.
                                </td>
                        </tr>

                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missing.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missing.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Missing Episodes"/></a>
                        <figcaption>Missing Episodes</figcaption>
                </figure>
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missing-options.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-missing-options.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Missing Episodes Options"/></a>
                        <figcaption>Missing Episodes Options</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "recommendations">Recommendations</h2>
<p>Get AniDB Recommendations based upon your own ratings and AniDB users.</p>
<div class = "row">
        <div class = "col-sm-8">
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Refresh the list to get a list of recommendations
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Items
                                </td>
                                <td>
                                        The amount of recommendations to get from AniDB
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure>
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-recommondations.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-recommondations.jpg" class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - Recommendations"/></a>
                        <figcaption>Recommendations</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "anidb-av-dump">AniDB AV Dump</h2>
<p>Analyse File to push to AniDB.</p>
</section>

<section>
<h2 id = "file-search">File Search</h2>
<div class = "row">
<div class = "col-sm-8">
        <p>Search based on File name, Hash, or last 100 added files.</p>
</div>
<div class = "col-sm-3">
        <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-filesearch.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-filesearch.jpg" class = "img-responsive img-thumbnail"
                alt = "Shoko Desktop - File Search"/></a>
                <figcaption>File Search</figcaption>
        </figure>
</div>
</div>
</section>

<section>
<h2 id = "file-renaming">File Renaming</h2>
<p>Rename files in your Collection based upon tags and info from AniDB</p>
<div class = "row">
        <div class = "col-sm-8">
                <p>With the renaming script you can automatically rename files that are in shoko. </p>
                <p>By checking the "Run this script when importing files into collection" Shoko will automatically rename the files it finds based upon your
                        script.</p>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-renaming.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-renaming.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Renaming"/></a>
                        <figcaption>Renaming</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "update-anidb-data">Update AniDB Data</h2>
<p>Update AniDB information for files that were imported into Shoko.</p>
<div class = "row">
        <div class = "col-sm-8">
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Update Files With Missing Info
                                </td>
                                <td>
                                        Only update files with missing information like resolution or codex info.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Update files to internal Version 2
                                </td>
                                <td>
                                        Add V2 information to existing files.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-updateanidb.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-updateanidb.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Update AniDB Info"/></a>
                        <figcaption>Update AniDB Info</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "community-data">Community Data</h2>
<p>Allows you to do some cleaning of any community sites that you have linked.</p>
<div class = "row">
        <div class = "col-sm-8">
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Trakt
                                </td>
                                <td>
                                        Update information in Trakt with Shoko Info.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure><a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-communitydata.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                        src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-communitydata.jpg" class = "img-responsive img-thumbnail"
                        alt = "Shoko Desktop - Community Data"/></a>
                        <figcaption>Community Data</figcaption>
                </figure>
        </div>
</div>
</section>

<section>
<h2 id = "my-votes">My Votes</h2>
<p>List your collection and show your current AniDB vote, as well as allow you to vote for your current collection.</p>
<div class = "row">
        <div class = "col-sm-8">
                <table class = "table table-striped">
                        <thead>
                        <tr>
                                <th width = "20%">Available Actions</th>
                                <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                        Refresh
                                </td>
                                <td>
                                        Get AniDB vote information of your current collection.
                                </td>
                        </tr>
                        <tr>
                                <td>
                                        Sort Order
                                </td>
                                <td>
                                        Sort by Overall rating, or by Year of first airing.
                                </td>
                        </tr>
                        </tbody>
                </table>
        </div>
        <div class = "col-sm-3">
                <figure>
                        <a href = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-myvotes.jpg" data-toggle="lightbox" data-lightbox="image-1"><img
                                src = "/assets/images/desktop/utilities/Shoko-Desktop-Utilities-myvotes.jpg" class = "img-responsive img-thumbnail"
                                alt = "Shoko Desktop - My Votes"/></a>
                        <figcaption>My Votes</figcaption>
                </figure>
        </div>
</div>
</section>