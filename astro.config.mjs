// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
import { fileURLToPath } from 'node:url'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  site: "https://blog.cloverta.top",
  redirects: {
    "/": "/zh",
  },
  integrations: [sitemap()],
})
