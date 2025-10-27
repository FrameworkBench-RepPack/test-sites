# test-sites

## Installing

You can run `npm install` from the top-level directory to install dependencies for all sites and the server.

## Serve a site for testing

First, run `npm run build` to build all sites.

Then run `npm run serve -- --site SITE_NAME` to serve a specific site. `SITE_NAME` must be the name of the subfolder in the `sites` folder that you want to serve.

You can also specify `--port PORT_NUMBER` if you want to. When not specified, port 3000 is used.

## Adding a new site

Add a new folder to `sites`. Initialize the project in that folder, using whatever tool is provided byt the developers of the framework. Make sure that the project adheres to these requirements:

1. The `name` inside the `package.json` file is identical to the name of the folder.
2. Calling `npm run build` will build a production-grade version of the site and put it in the `dist` folder inside the project folder.
3. The final build uses only static files that can be served by a static file server.
