'use client';

import * as React from 'react';
import { Node } from 'reactflow';
import { useContext } from 'react';

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
  isNoResultsToAddPopupOpen: boolean;
  setIsNoResultsToAddPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  shareData: {
    title?: string;
    url?: string;
    skillSeq?: number;
    reportSeq?: number;
  } | null;
  setShareData: React.Dispatch<
    React.SetStateAction<{
      title?: string;
      url?: string;
      skillSeq?: number;
      reportSeq?: number;
    } | null>
  >;
}

const initialState = {
  isInviteFriendsPopupOpen: false,
  setInviteFriendsPopupOpen: () => {},
  isAddFriendsPopupOpen: false,
  setIsAddFriendsPopupOpen: () => {},
  isPreventSharePopupOpen: false,
  setIsPreventSharePopupOpen: () => {},
  isNoResultsToAddPopupOpen: false,
  setIsNoResultsToAddPopupOpen: () => {},
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
  shareData: null,
  setShareData: () => {},
};

const RelationReportContext =
  React.createContext<IRelationReportContext>(initialState);

export const RelationReportProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [isInviteFriendsPopupOpen, setInviteFriendsPopupOpen] =
    React.useState(false);
  const [isAddFriendsPopupOpen, setIsAddFriendsPopupOpen] =
    React.useState(false);
  const [isPreventSharePopupOpen, setIsPreventSharePopupOpen] =
    React.useState(false);
  const [isNoResultsToAddPopupOpen, setIsNoResultsToAddPopupOpen] =
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
  const [shareData, setShareData] = React.useState<{
    title?: string;
    url?: string;
    skillSeq?: number;
    reportSeq?: number;
  } | null>(null);

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
        isNoResultsToAddPopupOpen,
        setIsNoResultsToAddPopupOpen,
        playData,
        setPlayData,
        initialNodes,
        setInitialNodes,
        shareData,
        setShareData,
      }}
    >
      {children}
    </RelationReportContext.Provider>
  );
};

export const useRelationReportContext = () => useContext(RelationReportContext);
