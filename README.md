# ggebi.github.io

[ggebi](https://github.com/ggebi) 의 기술 블로그. Astro 로 만든 정적 사이트를 GitHub Pages 에
GitHub Actions 로 배포한다.

- 주소: <https://ggebi.github.io>
- 피드: <https://ggebi.github.io/rss.xml>

## 스택

| 구성 | 선택 | 이유 |
| --- | --- | --- |
| 프레임워크 | [Astro](https://astro.build) | 기본 출력이 HTML/CSS 이고 클라이언트 JS 가 0 에 가깝다 |
| 콘텐츠 | Content Collections (`glob` loader) | 마크다운 frontmatter 를 Zod 스키마로 검증한다 |
| 코드 하이라이트 | Shiki (light/dark 두 테마) | 빌드 시점에 인라인 스타일로 굽는다 |
| 배포 | GitHub Actions → GitHub Pages | `main` 에 푸시하면 자동 배포 |

## 구조

```
.
├── .github/workflows/deploy.yml   # 빌드 + Pages 배포
├── public/
│   ├── favicon.svg
│   ├── og-default.png             # 공유 카드 기본 이미지 (1200×630)
│   └── robots.txt
├── src/
│   ├── consts.ts                  # 사이트 이름·설명·OG 기본값
│   ├── content.config.ts          # 블로그 컬렉션 스키마
│   ├── content/blog/              # 글 (마크다운)
│   ├── layouts/BaseLayout.astro   # <head> 메타 태그, 헤더, 푸터, 테마 토글
│   ├── lib/format.ts              # 날짜·URL·읽는 시간 유틸
│   ├── pages/
│   │   ├── index.astro            # 글 목록
│   │   ├── [...slug].astro        # 글 본문
│   │   ├── tags/index.astro       # 태그 목록
│   │   ├── tags/[tag].astro       # 태그별 글
│   │   ├── rss.xml.js             # RSS 피드
│   │   └── 404.astro
│   └── styles/global.css          # 디자인 토큰과 타이포그래피
├── templates/post.md              # 새 글 템플릿
└── astro.config.mjs               # site, sitemap, Shiki 테마
```

## 로컬 실행

Node 24 이상이 필요하다.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과를 로컬에서 확인
```

## 글 쓰기

1. `templates/post.md` 를 `src/content/blog/` 아래로 복사한다.
2. frontmatter 를 채운다.

```yaml
---
title: 글 제목
description: 한 줄 요약
pubDate: 2026-01-01
tags: [astro, github-pages]
draft: false
lang: ko
---
```

3. 파일 경로가 곧 URL 이 된다. `src/content/blog/hello.md` → `/hello/`
4. `draft: true` 인 글은 `npm run dev` 에서만 보이고 배포 결과에는 들어가지 않는다.

## 공유 카드(OG)

`BaseLayout.astro` 가 모든 페이지에 다음을 넣는다.

- `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale`
- 글 페이지에는 `article:published_time`, `article:modified_time`, `article:tag`
- `twitter:card=summary_large_image` 와 `twitter:image`
- JSON-LD (`BlogPosting` / `WebSite`)

이미지는 `site` 를 기준으로 절대 URL 이 된다. 기본값은 `public/og-default.png` 이고,
글마다 다른 이미지를 쓰려면 frontmatter 에 `ogImage: /og/my-post.png` 를 넣는다.
X 와 LinkedIn 크롤러는 PNG/JPG 를 가장 안정적으로 읽는다. 크기는 1200×630.

## 배포

`main` 에 푸시하면 `.github/workflows/deploy.yml` 이 빌드해서 Pages 로 올린다.
최초 1회만 저장소 설정에서 **Settings → Pages → Build and deployment → Source: GitHub Actions**
를 선택하면 된다. 배포 후 <https://ggebi.github.io> 에서 확인한다.

## 라이선스

글과 이미지의 저작권은 작성자에게 있다. 코드 스니펫은 자유롭게 참고해도 된다.
