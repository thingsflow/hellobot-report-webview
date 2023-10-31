'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  RelationGraphContainer,
  RelationReportDetail,
  RelationReportFooter,
  SkillBanner,
} from '.';

const RelationReportPageContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const lang = searchParams.get('lang');

  return (
    <div className="bg-gray-50 relative">
      <RelationGraphContainer />
      <SkillBanner />
      <RelationReportDetail />
      <RelationReportFooter />
    </div>
  );
};

export default RelationReportPageContainer;
