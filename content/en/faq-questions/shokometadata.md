#### Shoko Metadata
{{% hr %}}

{{< faq-section type="shokometadata" >}}
{{% faq type="shokometadata" id="plex-missing-poster-or-info" question="Fixing Missing Posters/Information In Plex When Using ShokoMetadata?" %}}

This can happen when a problem occurs while scanning files and downloading the respective metadata.

To fix this, please follow these steps:

1. Unmatch the Series/Movie in question (you can find that in the Context menu for the entry, usually accessible by clicking the 3 Dots)
1. Create a file called **.plexignore** in the folder of the Series/Movie, which only contains "*"
1. Rescan your library, the Series/Movie should get removed
1. Run package clean up (found under Settings -> Trouble Shooting of the Plex Media Server) as well as database optimization
1. Remove the .plexignore file
1. Rescan your library
1. All media files and information should now be available and properly displayed.

If you still have problems after following those steps, feel free to hop on our discord.

{{% /faq %}}
{{< /faq-section >}}
