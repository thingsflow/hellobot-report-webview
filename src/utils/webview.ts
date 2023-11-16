type WebviewActionTypes =
  | 'doShare'
  | 'goBack'
  | 'goSkillDetailPage'
  | 'goRelationReportListPage'
  | 'goChatRoomPage';
interface WebviewActionParameter {
  shareTitle?: string;
  shareLink?: string;
  seq?: number;
}

const sendEvent = ({
  action,
  parameter,
}: {
  action: WebviewActionTypes;
  parameter?: WebviewActionParameter;
}) => {
  // IOS
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

  // Web
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

const doShare = (parameter: WebviewActionParameter) => {
  sendEvent({ action: 'doShare', parameter });
};

const goBack = () => {
  sendEvent({ action: 'goBack' });
};

const goSkillDetailPage = (parameter: WebviewActionParameter) => {
  sendEvent({ action: 'goSkillDetailPage', parameter });
};

const goRelationReportListPage = () => {
  sendEvent({ action: 'goRelationReportListPage' });
};

const goChatRoomPage = (parameter: WebviewActionParameter) => {
  sendEvent({ action: 'goChatRoomPage', parameter });
};

export default {
  doShare,
  goBack,
  goSkillDetailPage,
  goRelationReportListPage,
  goChatRoomPage,
};
