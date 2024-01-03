import { getRadiusOffset } from './relationReportGraph';

describe('관계도 그래프 유틸 함수', () => {
  test('노드 개수에 맞는 반지름 비율을 반환', () => {
    expect(getRadiusOffset(3)).toBe(1);
  });
});
