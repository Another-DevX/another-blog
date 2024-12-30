import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';/* Handle ::: directives as nodes */
import { remarkAdmonitions } from './src/plugins/remark-admonitions';/* Add admonitions */
import { remarkReadingTime } from './src/plugins/remark-reading-time';
import robotsTxt from 'astro-robots-txt';

import expressiveCode from 'astro-expressive-code';
import { expressiveCodeOptions } from './src/site.config';
import tailwind from '@astrojs/tailwind';
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://an.otherdev.xyz',
  integrations: [
    expressiveCode(expressiveCodeOptions),
    sitemap(),
    tailwind({ applyBaseStyles: false, nesting: true }),
    icon(),
    robotsTxt(),
    wasm(),
    react()
  ],
  trailingSlash: 'always',
  prefetch: true,
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    plugins: [rawFonts(['.ttf', '.woff']), wasm(), topLevelAwait()],
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkReadingTime,
      remarkDirective,
      remarkAdmonitions,
    ],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeAutolinkHeadings],
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    plugins: [rawFonts(['.ttf', '.woff'])],
  },
  output: 'static',
});

function rawFonts(ext) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}