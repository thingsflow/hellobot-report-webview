'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';

const RelationGraphContainer = () => {
  return (
    <div
      className={`w-full h-[calc(100svh-86px-env(safe-area-inset-bottom))] bg-gray-50`}
    >
      <div
        className={`absolute top-0 w-full h-[calc(100svh-86px-env(safe-area-inset-bottom))]`}
      >
        <RelationGraph />
      </div>
      <RelationReportHeader />
      <RelationReportTitle />
    </div>
  );
};

export default RelationGraphContainer;
