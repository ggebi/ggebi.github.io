/** 글 URL. content collection 의 id 가 곧 경로다. (예: hello-world → /hello-world/) */
export function postUrl(id: string): string {
  return `/${id.replace(/^\/+|\/+$/g, '')}/`;
}

/** 태그 URL. 한글 태그도 안전하게 인코딩한다. */
export function tagSlug(tag: string): string {
  return encodeURIComponent(tag.trim().toLowerCase().replace(/\s+/g, '-'));
}

export function tagUrl(tag: string): string {
  return `/tags/${tagSlug(tag)}/`;
}

/** YYYY-MM-DD (UTC 기준 — frontmatter 의 날짜를 그대로 보여준다) */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 2026. 11. 18. 목록용 짧은 표기 */
export function shortDate(date: Date): string {
  return isoDate(date).replace(/-/g, '.');
}

/** 2026년 11월 18일 글 상단용 표기 */
export function longDate(date: Date): string {
  const [y, m, d] = isoDate(date).split('-');
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

/** 코드 블록을 뺀 본문 길이로 대략적인 읽는 시간(분)을 구한다. */
export function readingTime(body = ''): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const chars = text.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}
