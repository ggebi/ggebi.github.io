import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts';
import { notes } from './src/data/notes';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site: https://ggebi.github.io
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // `public/notes/<slug>/` 의 독립 HTML 글은 빌드 페이지 목록에 잡히지 않으므로
      // `src/data/notes.ts` 에 적힌 주소를 사이트맵에 직접 더한다.
      // (URL 은 trailing slash 를 유지한 절대 주소여야 한다.)
      customPages: notes.map((note) => new URL(note.url, SITE_URL).href),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  devToolbar: {
    enabled: false,
  },
});
