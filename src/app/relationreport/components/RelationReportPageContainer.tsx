'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChatBotBanner,
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
    <div className="bg-gray-50 relative">
      <RelationGraphContainer />
      <SkillBanner />
      <RelationReportDetail />
      <ChatBotBanner />
      <Divider />
      <RelationReportShare />
      <RelationReportFooter />
    </div>
  );
};

export default RelationReportPageContainer;
