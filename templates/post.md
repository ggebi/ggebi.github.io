---
title: 글 제목 (60자 안쪽이 검색·공유 카드에서 잘리지 않습니다)
description: 목록과 OG 카드에 나오는 한 줄 요약. 100~160자 정도가 보기 좋습니다.
pubDate: 2026-01-01
# updatedDate: 2026-01-05
tags: [astro, github-pages]
draft: true
lang: ko
# ogImage: /og/my-post.png
---

도입부. 이 글을 왜 쓰는지 한두 문단.

## 소제목

본문입니다. 코드는 백틱 세 개로 감쌉니다.

```ts
const answer = 42;
```

### 더 작은 소제목

- 목록
- 목록

> 인용은 이렇게.

| 항목 | 값 |
| --- | --- |
| 예시 | 1 |

## 마무리

정리 한 문단.

---

<!--
작성 규칙
- `draft: true` 인 글은 로컬 `npm run dev` 에서만 보이고, 빌드/배포 결과에는 들어가지 않습니다.
  발행할 때 `draft` 를 지우거나 `false` 로 바꿉니다.
- 파일 경로가 곧 URL 입니다. `src/content/blog/hello.md` → `/hello/`
- 하위 폴더로 묶어도 됩니다. `src/content/blog/2026/hello.md` → `/2026/hello/`
- 태그는 자유롭게. `/tags/` 페이지에 자동으로 모입니다.
-->
