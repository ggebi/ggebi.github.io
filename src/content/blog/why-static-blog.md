---
title: '정적 블로그를 세팅하며: Astro 7 + GitHub Pages'
description: 'Astro 7의 콘텐츠 컬렉션과 GitHub Actions 배포로 블로그 뼈대를 잡은 기록. 마크다운 스키마, 공유 카드, 다크 모드, 그리고 각각을 고른 이유.'
pubDate: 2026-11-18
tags: [astro, github-pages, markdown, og-image]
draft: false
lang: ko
---

블로그를 다시 만들었다. 이번에는 프레임워크를 고르는 데 시간을 쓰지 않고, 글을 쌓는 구조를 먼저 정했다. 남은 것은 그 결정들의 기록이다.

## 왜 정적 사이트인가

글은 자주 바뀌지 않는다. 하루에 한 번 쓰면 많은 편이고, 대부분의 방문자는 이미 만들어진 HTML을 읽기만 한다. 그런 콘텐츠에 서버와 데이터베이스를 붙이면 얻는 것보다 관리해야 할 것이 늘어난다.

정적 사이트는 빌드 시점에 모든 페이지를 HTML로 굽는다.

- 요청마다 렌더링하지 않으므로 응답이 빠르고, 캐시가 단순하다.
- 클라이언트 자바스크립트가 거의 없어서 첫 화면이 가볍다.
- 서버·DB·런타임 패치가 없으니 몇 년을 두고도 썩지 않는다.

대신 동적 기능은 포기해야 한다. 댓글, 검색, 조회수 같은 것은 외부 서비스나 빌드 타임 인덱스로 대신한다. 블로그에서는 충분히 받아들일 수 있는 교환이다.

## Astro를 고른 이유

정적 사이트 생성기는 많다. Astro를 고른 이유는 세 가지였다.

**기본 출력이 HTML과 CSS다.** 프레임워크를 쓰지 않는 한 런타임 자바스크립트가 붙지 않는다. 화면 일부에만 인터랙션이 필요하면 그 부분만 섬(island)으로 올릴 수 있다.

**콘텐츠를 스키마로 검증한다.** 마크다운 frontmatter를 Zod 스키마로 정의해 두면, 날짜 형식이 틀렸거나 제목을 빠뜨린 글은 빌드 단계에서 걸린다. 오타 하나로 이상한 카드가 배포되는 일이 줄어든다.

**7.0에서 마크다운 파이프라인이 가벼워졌다.** 기본 프로세서가 remark/rehype 기반에서 자체 파이프라인(Sätteri)으로 바뀌면서 `@astrojs/markdown-remark`가 기본 의존성에서 빠졌다. 플러그인을 따로 쓰지 않는다면 빌드가 그만큼 단순하다.

## 구조: 파일이 곧 URL

글은 `src/content/blog/` 아래 마크다운 파일 하나로 끝난다. 컬렉션 정의는 이렇게 생겼다.

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

`glob` 로더는 파일 경로에서 id를 만든다. `src/content/blog/hello.md` 는 `/hello/` 가 되고, 하위 폴더를 쓰면 `2026/hello.md` 가 `/2026/hello/` 가 된다. URL을 따로 매핑하지 않아도 되는 게 편하다.

`draft` 는 빌드에서 걸러낸다. 개발 중에는 보이고 배포 결과에는 들어가지 않는다.

```ts
const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
```

## 공유 카드부터 챙긴다

글을 쓰는 목적의 절반은 누군가 읽는 것이다. 링크를 붙였을 때 카드가 깨져 있으면 그 전에 클릭이 사라진다. 그래서 레이아웃을 만들 때 OG 태그를 먼저 넣었다.

```html
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://ggebi.github.io/hello/" />
<meta property="og:image" content="https://ggebi.github.io/og-default.png" />
<meta name="twitter:card" content="summary_large_image" />
```

카드에서 자주 틀리는 지점은 세 가지다.

1. **이미지 경로가 상대 경로면 안 된다.** 크롤러는 페이지를 렌더링하지 않고 메타 태그만 읽는다. Astro 설정의 `site` 를 기준으로 절대 URL을 만든다.
2. **이미지는 PNG나 JPG가 안전하다.** SVG는 플랫폼마다 처리 방식이 다르다. 1200×630 비율이 X와 링크드인 모두에서 잘린다.
3. **캐시가 오래 남는다.** 링크드인은 이미지를 오래 보관하므로, 카드를 바꿨으면 Post Inspector 같은 도구로 한 번 갱신해 줘야 한다.

## 배포는 푸시 한 번

`main` 에 푸시하면 Actions가 빌드해서 Pages에 올린다. 워크플로우는 공식 액션 두 개로 끝난다.

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v5
```

`pages` 와 `id-token` 권한이 없으면 업로드 단계에서 막힌다. `concurrency` 는 배포가 겹치지 않게 잡아 둔다. 저장소 설정에서 Pages의 소스를 **GitHub Actions** 로 한 번만 바꾸면 이후에는 손댈 일이 없다.

## 다크 모드와 코드 블록

테마는 CSS 변수 두 벌로 처리했다. 문제는 첫 페인트다. 스크립트가 본문 뒤에서 돌면 흰 화면이 번쩍인다. 그래서 테마 결정만 인라인 스크립트로 `<head>` 에 넣었다.

```html
<script is:inline>
  var stored = localStorage.getItem('theme');
  var dark = matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = stored || (dark ? 'dark' : 'light');
</script>
```

코드 블록은 Shiki가 빌드 시점에 인라인 스타일로 굽는다. 라이트/다크 두 테마를 함께 넣고, CSS 변수만 골라 쓰면 자바스크립트 없이 전환된다.

```css
.prose .astro-code span {
  color: var(--shiki-light);
}
:root[data-theme='dark'] .prose .astro-code span {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}
```

## 남은 것

지금은 글 목록, 본문, 태그, RSS까지다. 다음에 손볼 것들은 이렇다.

- 글마다 OG 이미지를 자동으로 그리기 (제목을 넣은 카드)
- 정적 검색 인덱스
- 시리즈물을 묶어 볼 수 있는 구조

도구는 준비됐다. 이제 남은 일은 글을 쓰는 쪽이다.
