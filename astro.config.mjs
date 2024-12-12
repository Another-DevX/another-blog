import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import admonitionsPlugin from './bin/remark-admonitions.js';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://anotherdev.eth.limo',
  integrations: [mdx(), sitemap(), tailwind(), icon()],
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [remarkMath, admonitionsPlugin],
    rehypePlugins: [rehypeKatex, rehypeSlug, rehypeAutolinkHeadings],
  },
  output: 'static',
});