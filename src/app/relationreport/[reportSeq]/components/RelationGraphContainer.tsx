'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';

const RelationGraphContainer = () => {
  return (
    // 100px: 하단 바텀시트(닫힌 상태) 영역 높이
    // 187px: 상단 타이틀 영역 높이
    <div className={`w-full h-[calc(var(--vh)*100-100px)] overflow-hidden`}>
      <div
        className={`absolute top-0 w-full h-[calc(var(--vh)*100-152px-100px)] overflow-hidden mt-[calc(152px)] touch-none`} // 그래프 내 브라우저 finch 액션 막기
      >
        <RelationGraph />
      </div>
      <RelationReportHeader />
      <RelationReportTitle />
    </div>
  );
};

export default RelationGraphContainer;
