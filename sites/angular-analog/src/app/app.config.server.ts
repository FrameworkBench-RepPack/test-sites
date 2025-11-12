import { mergeApplicationConfig, ApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";

import { appConfig } from "./app.config";
import { provideFileRouter } from "@analogjs/router";
import { provideClientHydration } from "@angular/platform-browser";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideFileRouter(),
    provideClientHydration(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
