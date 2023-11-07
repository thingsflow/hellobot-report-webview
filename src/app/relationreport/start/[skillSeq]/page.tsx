'use client';
import * as React from 'react';
import StartRelationReportHeader from '../components/StartRelationReportHeader';
import StartRelationReportMemberList from '../components/StartRelationReportMemberList';

// 새로운 멤버 추가하기 페이지
const StartRelationReportPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  React.useEffect(() => {
    const { platform } = searchParams;
    if (platform) {
      localStorage.setItem('platform', platform as string);
    }
  }, []);

  return (
    <div className="bg-white">
      <StartRelationReportHeader />
      <StartRelationReportMemberList />
    </div>
  );
};

export default StartRelationReportPage;
