'use client';

import * as React from 'react';
import * as gaEvent from '@/utils/gaEvent';
import StartRelationReportHeader from './components/StartRelationReportHeader';
import StartRelationReportMemberList from './components/StartRelationReportMemberList';

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
