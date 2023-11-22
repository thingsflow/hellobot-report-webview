'use client';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';
import EditMoimPopup from './components/popup/EditMoimPopup';
import webview from '@/utils/webview';

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
  isOnlyEdge: boolean;
  setIsOnlyEdge: React.Dispatch<React.SetStateAction<boolean>>;
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
  isOnlyEdge: false,
  setIsOnlyEdge: () => {},
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
  // 관계도에 엣지가 한 개 인가?
  const [isOnlyEdge, setIsOnlyEdge] = React.useState(false);

  React.useEffect(() => {
    webview.logEvent({
      name: '이벤트명',
      params: {
        id: 123,
        name: '예시 파라미터',
      },
    });
  }, []);

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
        isOnlyEdge,
        setIsOnlyEdge,
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
