/**
 * 마크다운 파이프라인을 거치지 않는 독립 HTML 글.
 *
 * 위젯처럼 손으로 만든 인터랙티브 페이지는 마크다운으로 옮기기 어려워서
 * `public/notes/<slug>/index.html` 에 그대로 두고, 메인 목록에는 여기 적은
 * 메타데이터로 카드를 올린다. (메타 태그를 긁어 오는 대신 손으로 적는다 —
 * 빌드가 HTML 구조에 기대지 않고, 요약 문구를 목록용으로 다듬을 수 있다.)
 *
 * 새 글을 추가할 때:
 *   1. `public/notes/<slug>/index.html` 을 넣는다. (URL 은 `/notes/<slug>/`)
 *   2. 아래 배열에 항목 하나를 더한다. 날짜는 frontmatter 와 같은 기준(UTC 날짜)으로 쓴다.
 *
 * 태그·RSS 는 마크다운 글만 다룬다. 독립 글은 여기서 목록에만 올라간다.
 */

export type StandaloneNote = {
  /** public/ 기준 경로. `/notes/<slug>/` 처럼 슬래시로 끝난다. */
  url: string;
  title: string;
  /** 목록 카드에 나오는 한 줄 요약. */
  description: string;
  /** 날짜만 쓴다. `new Date('2026-11-18')` 는 UTC 자정 — frontmatter 의 날짜와 같은 기준. */
  pubDate: Date;
  lang: 'ko' | 'en';
};

export const notes: StandaloneNote[] = [
  {
    url: '/notes/tail-latency/',
    title: '평균 20ms의 함정 — P99 지연 시간과 Fan-out의 수학',
    description:
      '평균 응답 시간 20ms인 시스템이 왜 사용자에게는 느리게 느껴지는지, 하위 호출 N개를 병렬로 부를 때 지연 확률이 1−(1−p)^N으로 급증하는 이유, 그리고 실무에서 꼬리를 다루는 방법을 직접 만져보는 위젯과 함께 정리한 글.',
    pubDate: new Date('2026-11-18'),
    lang: 'ko',
  },
];
