'use client';
import * as React from 'react';
import { RelationGraph, RelationReportHeader, RelationReportTitle } from '.';
import InviteFriendsPopup from './InviteFriendsPopup';
import { ToastContainer, toast } from 'react-toastify';

const RelationGraphContainer = () => {
  const [isInviteFriendsPopupOpen, setInviteFriendsPopupOpen] =
    React.useState(false);

  return (
    <div className="w-full h-[812px]">
      <div className="absolute top-0 w-full h-[812px]">
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
      {isInviteFriendsPopupOpen && (
        <InviteFriendsPopup
          onClose={() => setInviteFriendsPopupOpen(false)}
          onCopyLinkClick={() => toast('클립보드에 링크가 복사되었습니다.')}
        />
      )}
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        icon={false}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
        closeButton={false}
        className="toast-black"
      />
    </div>
  );
};

export default RelationGraphContainer;
