'use client';
import * as React from 'react';
import {
  RelationGraphContainer,
  RelationReportDetail,
  RelationReportFooter,
  RelationReportShare,
  SkillBanner,
} from '.';
import Divider from '@/components/Divider';

const RelationReportPageContainer = () => {
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
