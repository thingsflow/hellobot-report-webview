'use client';
import * as React from 'react';
import { copyToClipboard } from '@/utils';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';

export const RelationReportModalContext = React.createContext<any>(null); // TODO: 타입 정의

const RelationReportPage = () => {
  const [isInviteFriendsPopupOpen, setInviteFriendsPopupOpen] =
    React.useState(false);
  const [isAddFriendsPopupOpen, setIsAddFriendsPopupOpen] =
    React.useState(false);

  return (
    <RelationReportModalContext.Provider
      value={{
        isInviteFriendsPopupOpen,
        setInviteFriendsPopupOpen,
        isAddFriendsPopupOpen,
        setIsAddFriendsPopupOpen,
      }}
    >
      <RelationReportPageContainer />
      <InviteFriendsPopup
        onClose={() => setInviteFriendsPopupOpen(false)}
        onCopyLinkClick={() => {
          copyToClipboard('https://storyplay.com');
          toast('클립보드에 링크가 복사되었습니다.');
        }}
      />
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        icon={false}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
        closeButton={false}
        className="toast-black"
        limit={1}
        autoClose={3000}
        enableMultiContainer={false}
      />
      <AddFriendsPopup
        onClose={() => setIsAddFriendsPopupOpen(false)}
        onConfirmButtonClick={() => {}}
      />
    </RelationReportModalContext.Provider>
  );
};

export default RelationReportPage;
