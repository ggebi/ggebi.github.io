import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { notes } from '../data/notes';
import { postUrl } from '../lib/format';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  // 마크다운 글과 독립 HTML 글(src/data/notes.ts)을 한 피드로 합친다.
  // notes.ts 에 항목 하나만 더하면 RSS 에도 그대로 따라 들어온다.
  const items = [
    ...notes.map((note) => ({
      title: note.title,
      description: note.description,
      pubDate: note.pubDate,
      link: note.url,
      categories: note.tags,
    })),
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post.id),
      categories: post.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
    customData: '<language>ko</language>',
  });
}
