'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';

const RelationGraphContainer = () => {
  return (
    <div className={`w-full h-[calc(100dvh-86px)] bg-white overflow-hidden`}>
      <div
        className={`absolute top-0 w-full h-[calc(100dvh-86px)] overflow-hidden`}
      >
        <RelationGraph />
      </div>
      <RelationReportHeader />
      <RelationReportTitle />
    </div>
  );
};

export default RelationGraphContainer;
