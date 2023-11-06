'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';
import { RelationReportModalContext } from '../page';

const RelationGraphContainer = () => {
  const { setInviteFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  return (
    <div className="w-full h-[calc(100vh-86px)] sm:h-[800px] bg-gray-50">
      <div className="absolute top-0 w-full h-[calc(100vh-86px)] sm:h-[800px]">
        <RelationGraph />
      </div>
      <RelationReportHeader
        title={'무의식 속 내 모습 [우리 모임] 관계도'}
        shareLink="https://storyplay.com"
      />
      <RelationReportTitle
        title={'무의식 속 내 모습 [우리 모임] 관계도'}
        onKakaoTalkButtonClick={() => setInviteFriendsPopupOpen(true)}
      />
    </div>
  );
};

export default RelationGraphContainer;
