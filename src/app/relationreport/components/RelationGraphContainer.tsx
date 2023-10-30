'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';

const RelationGraphContainer = () => {
  return (
    <div className="w-full h-[812px]">
      <div className="absolute top-0 w-full h-[812px]">
        <RelationGraph />
      </div>
      <RelationReportHeader />
      <RelationReportTitle title={'무의식 속 내 모습 [우리 모임] 관계도'} />
    </div>
  );
};

export default RelationGraphContainer;
