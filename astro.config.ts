import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBase } from './src/lib/rehype-base';

// SITE_URL / BASE_PATH は GitHub Pages のプロジェクトページ(https://<user>.github.io/<repo>/)で
// 動作確認するときだけ上書きする。独自ドメイン運用ではデフォルトのまま。
const site = process.env.SITE_URL ?? 'https://fumblewaals.com';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [[rehypeBase, { base }]] }),
  },
});
