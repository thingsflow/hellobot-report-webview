import * as React from 'react';
import { Node } from 'reactflow';

interface IRelationReportContext {
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

const RelationReportContext =
  React.createContext<IRelationReportContext>(initialState);

export default RelationReportContext;
