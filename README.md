# test-sites

## Installing

You can run `npm install` from the top-level directory to install dependencies for all sites and the server.

## List all sites

You can list all available site names by running `npm run list`.

Or you can import the list for programmatic use:

```ts
import { listSites } from "test-sites/listSites.ts";

const sites = await listSites();
```

## Serve a site for testing

First, run `npm run build` to build all sites.

Then run `npm run serve -- --site SITE_NAME` to serve a specific site. `SITE_NAME` is the name of the site to serve, and you can list all available names as shown in the previous chapter.

You can also specify `--port PORT_NUMBER` if you want to. When not specified, port 3000 is used.

Or you can import and run the steps programatically:

```ts
import { buildSites } from "test-sites/buildSites.ts";
import { serveSite } from "test-sites/serveSite.ts";

await buildSites({
  // Choose whether or not to log build progress to the console
  log: false,
});

await serveSite({
  // Choose which of the sites to serve
  site: "vanilla",
  // Optionally, change the port
  port: undefined,
});
```

## Adding a new site

Add a new folder to `sites`. Initialize the project in that folder, using whatever tool is provided byt the developers of the framework. Make sure that the project adheres to these requirements:

1. The `name` inside the `package.json` file is identical to the name of the folder.
2. Calling `npm run build` will build a production-grade version of the site and put it in the `dist` folder inside the project folder.
3. The final build uses only static files that can be served by a static file server.
