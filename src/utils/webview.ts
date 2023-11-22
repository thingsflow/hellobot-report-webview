type WebviewActionTypes =
  | 'doShare'
  | 'goBack'
  | 'goSkillDetailPage'
  | 'goRelationReportListPage'
  | 'goChatRoomPage'
  | 'logEvent';

interface DoShareType {
  shareTitle?: string;
  shareLink?: string;
}

interface goSkillDetailPageType {
  skillSeq?: number;
}

interface goChatRoomPageType {
  skillSeq?: number;
  chatbotSeq?: number;
}

interface logEventType {
  name: string;
  params?: {
    string_param?: string;
    number_param?: number;
    bool_param?: boolean;
  };
}

const sendEvent = ({
  action,
  parameter,
}: {
  action: WebviewActionTypes;
  parameter?:
    | DoShareType
    | goSkillDetailPageType
    | goChatRoomPageType
    | logEventType;
}) => {
  const platform = localStorage.getItem('platform');
  console.log('platform: ', platform);

  if (platform === 'ios') {
    if (window?.webkit?.messageHandlers?.hbReport?.postMessage) {
      window.webkit.messageHandlers.hbReport.postMessage({
        action,
        ...(parameter && { parameter }),
      });
      console.log('ios로 이벤트 전송');
      console.log('action: ', action);
      console.log('parameter: ', parameter);
      return;
    }
  }

  if (platform === 'android') {
    if (window?.androidHellobotWebViewApi?.hbReport) {
      window.androidHellobotWebViewApi.hbReport(
        JSON.stringify({
          action,
          ...(parameter && { parameter }),
        }),
      );
      console.log('android로 이벤트 전송');
      console.log('action: ', action);
      console.log('parameter: ', parameter);
      return;
    }
  }

  if (platform === 'web') {
    if (window?.parent) {
      window.parent.postMessage(
        {
          action,
          ...(parameter && { parameter }),
        },
        '*',
      );
      console.log('web으로 이벤트 전송');
      console.log('action: ', action);
      console.log('parameter: ', parameter);
    }
  }
  return;
};

const doShare = (parameter: DoShareType) => {
  sendEvent({ action: 'doShare', parameter });
};

const goBack = () => {
  sendEvent({ action: 'goBack' });
};

const goSkillDetailPage = (parameter: goSkillDetailPageType) => {
  sendEvent({ action: 'goSkillDetailPage', parameter });
};

const goRelationReportListPage = () => {
  sendEvent({ action: 'goRelationReportListPage' });
};

const goChatRoomPage = (parameter: goChatRoomPageType) => {
  sendEvent({ action: 'goChatRoomPage', parameter });
};

const logEvent = (parameter: logEventType) => {
  sendEvent({
    action: 'logEvent',
    parameter: parameter,
  });
};

export default {
  doShare,
  goBack,
  goSkillDetailPage,
  goRelationReportListPage,
  goChatRoomPage,
  logEvent,
};
