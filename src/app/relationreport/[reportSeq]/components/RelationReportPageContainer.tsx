'use client';

import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationGraphContainer } from '.';
import RelationReportBottomContainer from './RelationReportBottomContainer';
import AddFriendsPopup from './popup/AddFriendsPopup';
import PreventSharePopup from './popup/PreventSharePopup';
import EditMoimPopup from './popup/EditMoimPopup';
import { useRelationReportContext } from '../context';

const RelationReportPageContainer = () => {
  const {
    setInviteFriendsPopupOpen,
    setIsAddFriendsPopupOpen,
    setIsPreventSharePopupOpen,
    editMoimPopupInfo,
  } = useRelationReportContext();

  return (
    <div className="relative overflow-y-hidden h-[calc(var(--vh)*100)]">
      <RelationGraphContainer />
      <RelationReportBottomContainer />
      <InviteFriendsPopup onClose={() => setInviteFriendsPopupOpen(false)} />
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
      <AddFriendsPopup onClose={() => setIsAddFriendsPopupOpen(false)} />
      <PreventSharePopup onClose={() => setIsPreventSharePopupOpen(false)} />
      {editMoimPopupInfo && <EditMoimPopup />}
    </div>
  );
};

export default RelationReportPageContainer;
