'use client';
import * as React from 'react';
import { copyToClipboard } from '@/utils';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';
import EditMoimPopup from './components/popup/EditMoimPopup';

interface IRelationReportModalContext {
  isInviteFriendsPopupOpen: boolean;
  setInviteFriendsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddFriendsPopupOpen: boolean;
  setIsAddFriendsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editMoimPopupInfo: {
    title: string;
    isPrivate: boolean;
  } | null;
  setEditMoimPopupInfo: React.Dispatch<
    React.SetStateAction<{
      title: string;
      isPrivate: boolean;
    } | null>
  >;
  isAllLoading: boolean;
  setIsAllLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
  isInviteFriendsPopupOpen: false,
  setInviteFriendsPopupOpen: () => {},
  isAddFriendsPopupOpen: false,
  setIsAddFriendsPopupOpen: () => {},
  editMoimPopupInfo: null,
  setEditMoimPopupInfo: () => {},
  isAllLoading: false,
  setIsAllLoading: () => {},
};

export const RelationReportModalContext =
  React.createContext<IRelationReportModalContext>(initialState); // TODO: 타입 정의

const RelationReportPage = () => {
  const [isInviteFriendsPopupOpen, setInviteFriendsPopupOpen] =
    React.useState(false);
  const [isAddFriendsPopupOpen, setIsAddFriendsPopupOpen] =
    React.useState(false);
  const [isAllLoading, setIsAllLoading] = React.useState(false);
  const [editMoimPopupInfo, setEditMoimPopupInfo] = React.useState<{
    title: string;
    isPrivate: boolean;
  } | null>(null);

  return (
    <RelationReportModalContext.Provider
      value={{
        isInviteFriendsPopupOpen,
        setInviteFriendsPopupOpen,
        isAddFriendsPopupOpen,
        setIsAddFriendsPopupOpen,
        editMoimPopupInfo,
        setEditMoimPopupInfo,
        isAllLoading,
        setIsAllLoading,
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
      {editMoimPopupInfo && <EditMoimPopup />}
    </RelationReportModalContext.Provider>
  );
};

export default RelationReportPage;
