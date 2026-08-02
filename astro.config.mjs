import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://magnuslislevatn.com",
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
  build: {
    inlineStylesheets: "always",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
