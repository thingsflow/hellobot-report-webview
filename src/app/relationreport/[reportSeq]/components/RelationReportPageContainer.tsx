'use client';
import * as React from 'react';
import { RelationGraphContainer } from '.';
import RelationReportBottomContainer from './RelationReportBottomContainer';

const RelationReportPageContainer = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <RelationGraphContainer />
      <RelationReportBottomContainer />
    </div>
  );
};

export default RelationReportPageContainer;
