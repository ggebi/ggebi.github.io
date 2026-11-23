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
 * 이 배열은 메인 목록(src/pages/index.astro), RSS(src/pages/rss.xml.js),
 * 사이트맵(astro.config.mjs 의 customPages)이 함께 읽는다. 여기 한 항목만 더하면
 * 세 곳에 모두 따라 들어간다. (태그 페이지는 마크다운 글만 다룬다.)
 */

export type StandaloneNote = {
  /** public/ 기준 경로. `/notes/<slug>/` 처럼 슬래시로 끝난다. */
  url: string;
  title: string;
  /** 목록 카드에 나오는 한 줄 요약. */
  description: string;
  /** 날짜만 쓴다. `new Date('2026-11-18')` 는 UTC 자정 — frontmatter 의 날짜와 같은 기준. */
  pubDate: Date;
  /** RSS 의 categories 로 들어간다. 없으면 생략된다. */
  tags?: string[];
  lang: 'ko' | 'en';
};

export const notes: StandaloneNote[] = [
  {
    url: '/notes/tail-latency/',
    title: '평균 20ms의 함정 — P99 지연 시간과 Fan-out의 수학',
    description:
      '평균 응답 시간 20ms인 시스템이 왜 사용자에게는 느리게 느껴지는지, 하위 호출 N개를 병렬로 부를 때 지연 확률이 1−(1−p)^N으로 급증하는 이유, 그리고 실무에서 꼬리를 다루는 방법을 직접 만져보는 위젯과 함께 정리한 글.',
    pubDate: new Date('2026-11-18'),
    tags: ['backend', 'latency', 'performance'],
    lang: 'ko',
  },
  {
    url: '/notes/home-mesh-topology/',
    title: '집 와이파이 뜯어고치기 1부 — 공유기를 하나 더 놓았더니 방마다 다시 잡아야 했다',
    description:
      '공유기를 하나 더 놓았더니 방을 옮길 때마다 와이파이를 다시 잡아야 했습니다. 이름만 같게 맞추면 될 줄 알았는데 로밍은 여전히 뚝뚝 끊기고, NAS와 크롬캐스트는 서로를 못 찾았어요. 원인은 새 공유기가 아니라 아파트 벽 포트가 단자함으로 가는 1:1 직통이라는 사실, 그리고 공유기 두 대가 집에 울타리를 두 개 만드는 이중 NAT였습니다.',
    pubDate: new Date('2026-11-23'),
    tags: ['network', 'home-network', 'nat'],
    lang: 'ko',
  },
  {
    url: '/notes/wifi-attenuation-tcp/',
    title: '집 와이파이 뜯어고치기 2부 — 벽 하나 넘었다고 속도가 반 토막 나는 이유',
    description:
      '유선 백홀을 깔았는데도 방문만 닫으면 왜 속도가 반 토막 날까요? 2.4·5·6GHz 파장의 벽 투과 감쇠와 계단식 속도 하락, 그리고 무선 손실을 도로 정체로 오해해 브레이크를 밟는 TCP 혼잡 제어 이야기를 그림 4장과 시뮬레이터로 정리한 글.',
    pubDate: new Date('2026-11-23'),
    tags: ['network', 'wifi', 'tcp', 'performance'],
    lang: 'ko',
  },
];
