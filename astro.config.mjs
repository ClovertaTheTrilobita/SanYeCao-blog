// @ts-check
import { defineConfig } from 'astro/config';

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
})
