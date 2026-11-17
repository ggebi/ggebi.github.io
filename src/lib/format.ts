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

type Lang = 'ko' | 'en';

/** YYYY-MM-DD (UTC 기준 — frontmatter 의 날짜를 그대로 보여준다) */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** 목록용 짧은 표기: 2026.11.17 / Nov 17, 2026 */
export function shortDate(date: Date, lang: Lang = 'ko'): string {
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }
  return isoDate(date).replace(/-/g, '.');
}

/** 글 상단용 표기: 2026년 11월 17일 / November 17, 2026 */
export function longDate(date: Date, lang: Lang = 'ko'): string {
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }
  const [y, m, d] = isoDate(date).split('-');
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

/** 읽는 시간 표기: 약 3분 / 3 min read */
export function readingTimeLabel(minutes: number, lang: Lang = 'ko'): string {
  return lang === 'en' ? `${minutes} min read` : `약 ${minutes}분`;
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
