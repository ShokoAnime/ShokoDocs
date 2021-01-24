+++
title = "Shoko Website Translation"
description = "Learn how you can help make the Shoko website more accessible."
layout = "single"
[[pageNav]]
navTitle = "Translating Shoko Docs"
name = "Getting Started"
id = "getting-started"
[[pageNav]]
name = "Content Folder"
id = "content-folder"
[[pageNav]]
name = "Data Folder"
id = "data-folder"
[[pageNav]]
name = "i18n Folder"
id = "i18n-folder"
[[pageNav]]
name = "Working With Content Blocks"
id = "working-with-content-blocks"
[[pageNav]]
name = "Language Specific CSS"
id = "language-specific-css"
[[pageNav]]
name = "Language Specific Nav Menu"
id = "language-specific-nav-menu"
+++

##### Lets Translate! { class="page-first-header" }

First off, we want to say thank you for taking the time to translate the Shoko Website! Our goal is to reach as many users as possible and by translating the website, you're helping us make that happen.

We've made this quick guide to hopefully make the process easier, please let us know if there are any issues or if you have any ideas on improving it.

{{< alert type="info" heading="Code Edits" >}}
While we've tried to make it as easy as possible, there are a few code edits that need to be made. If you don't feel comfortable making these changes, we will make them for you as we really appreciate you translating Shoko Docs. Just let **Elemental Crisis** know on Discord or indicate it in your **PR**.
{{< /alert >}}

##### Getting Started

We suggest forking the Shoko Website repo ( [Fork a Repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)) as this will make it much easier to submit your changes and even make updates when needed. After doing that you'll need to modify the **config.toml** file and add your language, below is an example of adding **German** as a selectable language.

```toml
 [languages.de]
	contentDir = "content/de"
	title = "Shoko"
	languageName = "Deutsch"
	weight = 2
```

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Parameter</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>languages.xx</td>
      <td>Replace <strong>xx</strong> with your language's <strong>language code</strong>.</td>
    </tr>
    <tr>
      <td>contentDir</td>
      <td>The physical location of the files.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>The website titles, leave as <strong>Shoko</strong>.</td>
    </tr>
    <tr>
      <td>languageName</td>
      <td>The name of the language shown in the.</td>
    </tr>
    <tr>
      <td>weight</td>
      <td>Determines the languages place in the language drop-down.</td>
    </tr>
  </tbody>
</table>

Once done there are three areas where the translatable files are kept.

##### Content Folder

Create a new folder in the **content** folder and name it the same as the **language code** you used in the **config.toml** file. Copy the files you want to translate from the **en** folder into your newly created folder. Make sure to preserve spelling and directory structure. You do not have to copy every single file as you'll be creating a language specific nav menu. 

##### Data Folder

Create a new folder in the **data** folder and name it the same as the **language code** you used in the **config.toml** file. When working with .JSON files, be aware spacing is critical and improper spacing can break the file. Like the content section, you do not have to translate each .JSON file as it will default to the **English** version if there isn't a translated file.

##### i18n Folder

Create a new file in the **i18n** folder and name it the same as the **language code** you used in the **config.toml** file then copy the contents of **en.toml** into it.

```toml
[support]
other = "Support"
```
In the above example, **[support]** is the key and should be left as-is. The only part you will translate is the part in quotation marks which, using the example above would be **"Support"**. If you make any changes to the key, anywhere that key is used will be blank.

##### Working With Content Blocks

You'll notice certain files have their contents broken into what we call **Content Blocks** which are used to separate out the content on the page. These **Content Blocks** provide the capability to translate a pages content while still keeping its style and positioning.

```md
[ContentBlock]

Shoko is an anime cataloging program designed to automate the entire process of cataloging your anime collection regardless of the size and number of files in your collection. With Shoko, you'll spend more time watching and building your collection instead of organizing it.
```

It's important to note that these sections **cannot be moved or rearranged** without breaking the page's layout as these locations are hardcoded.

##### Language Specific CSS

To workaround unforeseen CSS changes that come with translating websites, we've made it so **language specific CSS** files can be added to correct any CSS issues that might arise. Create a new file in the **static/css/lang** folder and name it the same as the **language code** you used in the **config.toml** file.

An example of adding a CSS file for the German language.

```dir
  static/css/lang/de.css
```

You'll also need to add the following conditional statement to the **head.html** file located in **layouts/partials/** in order for the language specific CSS file to load. Using the example below, replace the German language code with your language code and add it below the last language specific file and above the closing conditional tag, **{{end}}**.

```go
  {{else if eq .Site.Language.Lang "de" }}
  <link rel="stylesheet" href="{{"assets/css/lang/de.min.css" | absURL}}">
```

Any rules you add in the file will take priority over the ones found in the **main.css** file. We're more than willing to help if you're unfamiliar with CSS or have questions. Simply join our **Discord** server and let us know what we can do to help. 

##### Language Specific Nav Menu

Currently, there is no way to have **Hugo** use the **English** version of a page if a translation does not exist. To workaround this issue, you'll be creating a **language specific nav menu** that will allow you to specify which pages have been translated. 

Navigate to **layouts/partials/nav-lang** and copy the **nav-en.html** file, then rename it, so the **language code** matches your language. 

An example of adding the nav menu for the German language.

```dir
  nav-de.html
```

Open the file, you'll see a list of links. You'll need to modify the link URL for any page you've translated, so it points to the translated version. 

The first example is how the link for the Shoko Server install page is set up for the EN site. 

**Normal 
```go
<a class="nav-link nav-menu" href="{{"server/install" | relURL}}">How To Install</a>
```

The second example shows the link for the Shoko Server install page for any other language.

**Language Specific
```go
<a class="nav-link nav-menu" href="{{"server/install" | relLangURL}}">How To Install</a>
```

As you can see, we only change a parameter inside the **href** tag. This is the only change inside your file you'll need to make. 

Adder you've finished, navigate to **layouts/partials/ and open **nav-main.html**, at the top you should see something similar to the following. 

```go
{{ if eq .Site.Language.Lang "en" }}
{{partial "nav-lang/nav-en.html" .}}
{{end}}
```
In the below example, we've added the conditional logic for the **German** language as indicated by **de** being used. 

Copy the following example and place above the **{{end}}** tag as seen in the above example. Make sure to change the language code in both lines to the language code that matches your language.

```go
{{else if eq .Site.Language.Lang "de" }}
{{partial "nav-lang/nav-de.html" .}}
```