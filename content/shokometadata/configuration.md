+++
title = "Configure Plex/Shoko for ShokoMetadata"
lastMod = 2019-04-24

[[pageNav]]
navTitle = "Configure Plex/Shoko for ShokoMetadata"
name = "Linking Plex with Shoko"
id = "linking-plex-with-shoko"
[[pageNav]]
name = "Creating Libraries"
id = "creating-libraries"
[[pageNav]]
name = "Finish linking Plex with Shoko"
id = "finish-linking-plex-with-shoko"

markup = "mmark"
+++

Credits to igloo4#9768 on Discord for the [initial write up](https://pastebin.com/urr37buE)

## Linking Plex with Shoko

Open up Shoko Server if it is not already open. Then, open Shoko Desktop.
 
In **Settings > Users**
Type your **plex username** in the "**Plex Users**" field
Click "**Save**", then click "**Link To Plex**"
 
A small window should pop up. In the new little window, click "**Link**", then click the hyperlink "**Click here to log in**"
The link should take you to plex, asking for permission to share libraries with shoko. Login and accept.
 
Go back to the small window. Where they hyperlink was, it should now say "**Done**"


## Creating Libraries

Open Plex and create your new anime library (I'd recommend at least one library for series and one for movies)
 
In the **advanced** tab of the "**Add Library**" popup, set Scanner to "**Shoko Series Scanner**", and set Agent to **"ShokoTV" or "ShokoMovies"** (depends on the library type)
Scroll down to see the new **ShokoMovies/ShokoTV settings**
 
Enter your **Shoko username** (found in Shoko Desktop: Settings > Users) and **password** (if you do not have one, leave this field blank)
Enter the IP and Port information found in Shoko Desktop: Settings > Essential
 
Click the big orange "**Add Library**" button
 
Repeat this step for as many libraries as you would like to create.

## Finish linking Plex with Shoko

Once Plex has finished creating your libraries (once the orange spinning bars in the top right disappear), **shut down plex**.
Then, **shutdown Shoko Server**
**>Make sure both are actually closed, not just minimized to the system tray (notification area)**
 
Start **Shoko Server**, then start **Plex** and **Shoko Desktop**
 
In Shoko Desktop: **Settings > Essential**, at the very bottom of the page, you will find **Plex Settings** for ShokoMetadata
 
Follow the instructions there to find your **Plex Host** and **Plex Library IDs**.
 
That's it!

