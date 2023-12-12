'use client';
import * as React from 'react';
import StartRelationReportHeader from './components/StartRelationReportHeader';
import StartRelationReportMemberList from './components/StartRelationReportMemberList';
import * as gaEvent from '@/utils/gaEvent';

// 시작 멤버 선택 페이지
const StartRelationReportPage = () => {
  const isEventLoggedRef = React.useRef(false);

  React.useEffect(() => {
    if (isEventLoggedRef.current === false) {
      isEventLoggedRef.current = true;
      gaEvent.viewListRelationStartingMember();
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
