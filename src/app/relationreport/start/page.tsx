'use client';
import * as React from 'react';
import StartRelationReportHeader from './components/StartRelationReportHeader';
import StartRelationReportMemberList from './components/StartRelationReportMemberList';

// 새로운 멤버 추가하기 페이지
const StartRelationReportPage = () => {
  return (
    <div className="bg-white">
      <StartRelationReportHeader />
      <StartRelationReportMemberList />
    </div>
  );
};

export default StartRelationReportPage;
