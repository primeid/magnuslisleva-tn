import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://magnuslisleva.tn",
  output: "static",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
