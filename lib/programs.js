export const PROGRAMS = {
  art: {
    key: 'art',
    academyName: '서울대Hi5미술학원',
    academyNameShort: '하이파이브 미술학원',
    bank: '기업은행 070-157736-01-014 (예금주:김민호)',
    bankLine: '기업은행 070-157736-01-014  예금주 : 김민호',
    cashReceiptNote: null,
  },
  ani: {
    key: 'ani',
    academyName: 'AniHi만화학원',
    academyNameShort: 'AniHi 만화학원',
    bank: '국민은행 285101-04-351373 (예금주:박소연)',
    bankLine: '국민은행 285101-04-351373  예금주 : 박소연',
    cashReceiptNote: null,
  },
};

export function getProgramInfo(programKey) {
  return PROGRAMS[programKey] === undefined ? PROGRAMS.art : PROGRAMS[programKey];
}
