'use client';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';
import EditMoimPopup from './components/popup/EditMoimPopup';
import PreventSharePopup from './components/popup/PreventSharePopup';
import { useParams, useSearchParams } from 'next/navigation';
import { Node } from 'reactflow';

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
  isPreventSharePopupOpen: boolean;
  setIsPreventSharePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAllLoading: boolean;
  setIsAllLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOnlyEdge: boolean; // 관계도에 엣지가 한 개 인가?
  setIsOnlyEdge: React.Dispatch<React.SetStateAction<boolean>>;
  playData?: any[];
  setPlayData: React.Dispatch<React.SetStateAction<any[]>>;
  initialNodes: Node<any, string | undefined>[]; // 그래프의 초기 위치로 뒤돌리기위한 첫 노드 정보
  setInitialNodes: (
    value: React.SetStateAction<Node<any, string | undefined>[]>,
  ) => void;
}

const initialState = {
  isInviteFriendsPopupOpen: false,
  setInviteFriendsPopupOpen: () => {},
  isAddFriendsPopupOpen: false,
  setIsAddFriendsPopupOpen: () => {},
  isPreventSharePopupOpen: false,
  setIsPreventSharePopupOpen: () => {},
  editMoimPopupInfo: null,
  setEditMoimPopupInfo: () => {},
  isAllLoading: false,
  setIsAllLoading: () => {},
  isOnlyEdge: false,
  setIsOnlyEdge: () => {},
  setOnAddNodeClick: () => {},
  playData: [],
  setPlayData: () => {},
  initialNodes: [],
  setInitialNodes: () => {},
};

export const RelationReportModalContext =
  React.createContext<IRelationReportModalContext>(initialState);

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
    </RelationReportModalContext.Provider>
  );
};

export default RelationReportPage;
