import { defineConfig } from "astro/config";

// BASE_PATH is only set for the test site, which lives under /wci-preview.
export default defineConfig({
  site: "https://www.westcoastinvitational.org",
  base: process.env.BASE_PATH || "/",
  build: { format: "directory" },
});
