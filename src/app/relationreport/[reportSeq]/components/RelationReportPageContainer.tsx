'use client';
import * as React from 'react';
import { RelationGraphContainer } from '.';
import RelationReportBottomContainer from './RelationReportBottomContainer';

const RelationReportPageContainer = () => {
  return (
    <div className="relative overflow-y-hidden h-[calc(var(--vh)*100)]">
      <RelationGraphContainer />
      <RelationReportBottomContainer />
    </div>
  );
};

export default RelationReportPageContainer;
