'use client';

import * as React from 'react';
import { RelationReportPageContainer } from './components';
import { RelationReportProvider } from './context';

const RelationReportPage = () => {
  return (
    <RelationReportProvider>
      <RelationReportPageContainer />
    </RelationReportProvider>
  );
};

export default RelationReportPage;
