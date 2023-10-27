'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  RelationGraph,
  RelationReportDetail,
  RelationReportFooter,
  RelationReportHeader,
  RelationReportTitle,
  SkillBanner,
} from '.';

async function getData(token?: string | null) {
  const res = await fetch('https://dev-api.hellobot.co/v1/chatbots/27', {
    method: 'GET',
    headers: {
      Authorization: `user ${token}`,
    },
  });

  return res.json();
}

const RelationReportPageContainer = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const lang = searchParams.get('lang');

  return (
    <div className="border border-black border-solid bg-gray-50">
      <RelationReportHeader />
      <RelationReportTitle title={'무의식 속 내 모습 [우리 모임] 관계도'} />
      <RelationGraph />
      <SkillBanner />
      <RelationReportDetail />
      <RelationReportFooter />
    </div>
  );
};

export default RelationReportPageContainer;
