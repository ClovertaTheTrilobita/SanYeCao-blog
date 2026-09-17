// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import rehypeMermaid from "rehype-mermaid";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeImageCaptions from "./src/plugins/rehype-image-captions.mjs";
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
  integrations: [sitemap(), svelte()],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
    rehypePlugins: [
      rehypeImageCaptions,
      rehypeMermaid,
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
})
