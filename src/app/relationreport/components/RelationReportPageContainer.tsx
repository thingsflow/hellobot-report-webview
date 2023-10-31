'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  RelationGraphContainer,
  RelationReportDetail,
  RelationReportFooter,
  RelationReportHeader,
  SkillBanner,
} from '.';
import CommonPopup from '@/components/CommonPopup';
import InviteFriendsPopup from './InviteFriendsPopup';

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
    <div className="bg-gray-50 relative">
      <RelationGraphContainer />
      <SkillBanner />
      <RelationReportDetail />
      <RelationReportFooter />
      <InviteFriendsPopup />
    </div>
  );
};

export default RelationReportPageContainer;
