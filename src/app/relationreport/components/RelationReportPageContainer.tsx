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
    <div>
      <RelationReportHeader />
      <RelationReportTitle />
      <RelationGraph />
      <SkillBanner />
      <RelationReportDetail />
      <RelationReportFooter />
    </div>
  );
};

export default RelationReportPageContainer;
