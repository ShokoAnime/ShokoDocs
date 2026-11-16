---
title: Revert the Web UI to a Stable Version
description: Put a working stable Web UI back through Swagger when the installed one doesn't load or a dev build broke it, and clear what your browser kept.
---

# Revert the Web UI to a Stable Version

The Web UI updates separately from Shoko Server. If an update, or a switch to the **Dev** channel, leaves you with a Web
UI that doesn't load or doesn't work, you can't use its own settings to go back. Shoko Server can still install another
release for you, through its API. This guide does that from Swagger, the API page built into the server.

## Install the Stable Web UI

1. Open `http://<your-server>:8111/swagger/`. See
   [Use the API with Swagger](/api/use-the-api-with-swagger) for finding your way around it.
2. Sign in without the Web UI: run `POST /Auth/SignIn` with your username and password, and paste the `Token` from the
   answer into **Authorize**. The steps are under
   [Sign In](/api/use-the-api-with-swagger#sign-in).
3. Run `POST /WebUI/Update` (under **Webui**) with **channel** set to `Stable` and **version** left empty. Shoko Server
   downloads the latest stable release and answers `204` once it's installed.

If the latest stable release is the one that's broken, install an older one: `GET /WebUI/History` with **channel** set
to `Stable` lists the releases, and putting one of their versions in **version** installs that one.

## Open the Web UI Again

Close the browser tab with the Web UI and open it in a new tab. Don't just refresh the old one: the old version may
still be loaded in it.

If it still doesn't work and you had ticked **Remember Me** when you signed in, clear what the browser kept for the
site, as below, and open it in a new tab again.

### Clear the Site's Local Storage

1. Open the browser's developer tools with **F12**, or from the browser menu under **More Tools** → **Developer tools**
   (Chromium-based browsers such as Chrome and Edge) or **More Tools** → **Web Developer Tools** (Firefox).
2. Open the **Application** tab (Chromium) or the **Storage** tab (Firefox).
3. In the side bar, open **Local Storage** and click the site you're on, such as `http://localhost:8111`.
4. Delete everything listed:
   - **Chromium:** click the clear button (🚫) between the **Filter** box and the ❌ button.
   - **Firefox:** right-click any entry and choose **Delete All**.

   If nothing is listed, there's nothing to clear.

Then close the tab and open the Web UI in a new one. You'll have to sign in again.

## If It Didn't Work

- **`/WebUI/Update` answers `409`:** no stable release fits your server. Check the answer for the reason; usually the
  server itself needs an update first.
- **`/WebUI/Update` answers `502`:** the server couldn't reach the release download. Check its internet connection and
  try again.
- **The answer is `400` with "not found in the release history":** the version you entered isn't one listed by
  `GET /WebUI/History`. Copy it exactly.
- **Swagger itself doesn't open:** see
  [If It Didn't Work](/api/use-the-api-with-swagger#if-it-didn-t-work) in the Swagger guide.

## Related

- [General Settings](/shoko-server/settings/general#version-information): the Web UI's version and channel, once it
  works again.
- [Use the API with Swagger](/api/use-the-api-with-swagger): opening Swagger and signing in.
