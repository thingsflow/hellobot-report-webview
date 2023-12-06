'use client';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';
import EditMoimPopup from './components/popup/EditMoimPopup';
import PreventSharePopup from './components/popup/PreventSharePopup';
import { Node } from 'reactflow';
import RelationReportContext from './RelationReportContext';

const RelationReportPage = () => {
  const [isInviteFriendsPopupOpen, setInviteFriendsPopupOpen] =
    React.useState(false);
  const [isAddFriendsPopupOpen, setIsAddFriendsPopupOpen] =
    React.useState(false);
  const [isPreventSharePopupOpen, setIsPreventSharePopupOpen] =
    React.useState(false);
  const [isAllLoading, setIsAllLoading] = React.useState(false);
  const [editMoimPopupInfo, setEditMoimPopupInfo] = React.useState<{
    title: string;
    isPrivate: boolean;
  } | null>(null);
  const [playData, setPlayData] = React.useState<any[]>([]);
  const [isOnlyEdge, setIsOnlyEdge] = React.useState(false);
  const [initialNodes, setInitialNodes] = React.useState<
    Node<any, string | undefined>[]
  >([]);
  console.log(process.env.NODE_ENV);
  // yarn dev : development

  return (
    <RelationReportContext.Provider
      value={{
        isInviteFriendsPopupOpen,
        setInviteFriendsPopupOpen,
        isAddFriendsPopupOpen,
        setIsAddFriendsPopupOpen,
        editMoimPopupInfo,
        setEditMoimPopupInfo,
        isAllLoading,
        setIsAllLoading,
        isOnlyEdge,
        setIsOnlyEdge,
        isPreventSharePopupOpen,
        setIsPreventSharePopupOpen,
        playData,
        setPlayData,
        initialNodes,
        setInitialNodes,
      }}
    >
      <RelationReportPageContainer />
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
    </RelationReportContext.Provider>
  );
};

export default RelationReportPage;
