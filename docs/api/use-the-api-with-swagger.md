---
title: Use the API with Swagger
description: Open Swagger, the API page built into Shoko Server, sign in with an API key, and run a request from your browser.
---

# Use the API with Swagger

A few things in Shoko Server have no button in the Web UI yet, such as nesting groups, holding parts of the queue or
hiding a source's episodes. The docs for those send you to Shoko's API instead. You don't need any tools for that:
Shoko Server has a page built in, Swagger, that lists every route of the API and lets you run them from your browser.

## Open Swagger

Go to `http://<your-server>:8111/swagger/`, the same address and port as the Web UI with `/swagger/` at the end.

The routes are grouped by topic. The picker at the top right (**Select a definition**) chooses which API you're
looking at:

- **Server V3** is Shoko Server's current API, the one the docs use.
- **Server V2** is the older API, listed only while it's turned on.
- A plugin with an API of its own adds an entry of its own.

The docs write a route as its method and path, such as `PUT /api/v3/Group/{groupID}`. The parts in braces are values
you fill in when you run it. **Server V3** lists its routes without the `/api/v3` at the start, so that one shows up as
`PUT /Group/{groupID}`.

## Sign In

Most routes need an API key, which tells Shoko who's asking.

1. Create a key under **Settings** → [API Keys](/shoko-server/settings/api-keys) → **Generate API Key**, and copy it.
   Routes that change settings or the whole collection only work with a key from an admin account.
2. In Swagger, click **Authorize**. Paste the key into the first `apikey` field (the header one) and click
   **Authorize**, then **Close**.

If you can't reach the Web UI to create a key, have Swagger sign you in instead: run `POST /Auth/SignIn` (under
**Authentication**) with this body, and use the `Token` from the answer as the key.

```json
{ "User": "<username>", "Password": "<password>", "Device": "swagger", "Expires": "1d" }
```

`Expires` is optional; with it, the key stops working after a day.

Swagger remembers the key in your browser until you click **Logout** in the same dialog. While Shoko Server is in
[setup mode or failure mode](/shoko-server/concepts/setup-mode-and-failure-mode), the routes that still answer don't
need a key at all, unless you've set a
[setup token](/shoko-server/concepts/setup-mode-and-failure-mode#protect-them-with-a-setup-token): then the token is
the key.

## Run a Request

1. Find the route, and click it to open it.
2. Click **Try it out**.
3. Fill in the parameters and, for routes that take one, the request body. The body box starts with an example of every
   field the route accepts; remove the ones you don't want to send.
4. Click **Execute**.

The answer appears below, with its status code. Swagger also shows the request as a `curl` command, which you can copy
into a script.

Swagger lists the REST routes only. The live events Shoko pushes to its clients, over SignalR, take the same API key
and are described in [SignalR Hubs](/api/signalr-hubs).

## If It Didn't Work

- **`/swagger/` answers with "Not Found":** Swagger is turned off, or moved. **Enable Swagger UI**
  (`Web.EnableSwaggerUI` in `settings-server.json`, or the `SHOKO_SWAGGER_ENABLED` environment variable) turns it on,
  and **Swagger UI Prefix** (`Web.SwaggerUIPrefix`, or `SHOKO_SWAGGER_PREFIX`) is the path it's served at, `swagger` by
  default. Both take effect after a restart.
- **Behind a reverse proxy, Swagger doesn't load:** the proxy has to pass `/swagger/` and `/api/` through to Shoko. See
  [Networking & Reverse Proxies](/shoko-server/networking).
- **The answer is `401`:** the request had no valid API key. Authorize again, and check that the key wasn't deleted
  under **API Keys**.
- **The answer is `403`:** the route needs an admin account. Use a key from one.

## Related

- [API Keys](/shoko-server/settings/api-keys): creating and removing keys.
- [SignalR Hubs](/api/signalr-hubs): the live events, for client developers.
- [Setup Mode & Failure Mode](/shoko-server/concepts/setup-mode-and-failure-mode): what still answers while the server
  isn't fully up.
- [Recover from a Failed Start](/shoko-server/how-to/recover-from-a-failed-start): fixing a failed plugin through
  Swagger.
