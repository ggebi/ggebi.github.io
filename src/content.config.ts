import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // `src/content/blog/` 아래의 모든 마크다운 파일을 글 하나로 읽는다.
  // 하위 폴더를 써도 되고, 파일 경로가 그대로 URL 이 된다. (예: 2026/hello.md → /2026/hello/)
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(300),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['ko', 'en']).default('ko'),
    // 글마다 다른 OG 이미지를 쓰고 싶을 때 public/ 기준 경로를 넣는다. 없으면 기본 이미지.
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
