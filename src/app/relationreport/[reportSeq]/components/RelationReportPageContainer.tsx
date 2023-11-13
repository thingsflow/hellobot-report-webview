'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  RelationGraphContainer,
  RelationReportDetail,
  RelationReportFooter,
  RelationReportShare,
  SkillBanner,
} from '.';
import Divider from '@/components/Divider';

const RelationReportPageContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const lang = searchParams.get('lang');

  return (
    <div className=" relative">
      <RelationGraphContainer />
      <SkillBanner />
      <RelationReportDetail />
      <Divider />
      <RelationReportShare />
      <Divider />
      <RelationReportFooter />
    </div>
  );
};

export default RelationReportPageContainer;
