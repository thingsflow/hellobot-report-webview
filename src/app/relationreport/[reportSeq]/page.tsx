'use client';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InviteFriendsPopup, RelationReportPageContainer } from './components';
import AddFriendsPopup from './components/popup/AddFriendsPopup';
import EditMoimPopup from './components/popup/EditMoimPopup';
import PreventSharePopup from './components/popup/PreventSharePopup';
import airbridge from 'airbridge-web-sdk-loader';
import { useParams, useSearchParams } from 'next/navigation';

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
  isOnlyEdge: boolean;
  setIsOnlyEdge: React.Dispatch<React.SetStateAction<boolean>>;
  playData?: any[];
  setPlayData: React.Dispatch<React.SetStateAction<any[]>>;
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
};

export const RelationReportModalContext =
  React.createContext<IRelationReportModalContext>(initialState);

const RelationReportPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const share = searchParams.get('share');
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
  // 관계도에 엣지가 한 개 인가?
  const [isOnlyEdge, setIsOnlyEdge] = React.useState(false);

  React.useEffect(() => {
    if (share === 'true') {
      airbridge.openDeeplink({
        type: 'redirect',
        deeplinks: {
          ios: `hellobot-test://relation/report?link=${window.location.href}`,
          android: `hellobot://relation/report?link=${window.location.href}`,
          desktop: `${window.location.protocol}//${window.location.host}/relationreport/568`,
        },
        fallbacks: {
          ios: `${window.location.protocol}//${window.location.host}/relationreport/${params.reportSeq}`,
          android: `${window.location.protocol}//${window.location.host}/relationreport/${params.reportSeq}`,
        },
      });
      sessionStorage.setItem('isDeepLinkCompleted', 'true');
    }
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
        isPreventSharePopupOpen,
        setIsPreventSharePopupOpen,
        playData,
        setPlayData,
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
