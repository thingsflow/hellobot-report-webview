type WebviewActionTypes =
  | 'doShare'
  | 'goBack'
  | 'goSkillDetailPage'
  | 'goRelationReportListPage'
  | 'goChatRoomPage';
interface WebviewActionParameter {
  title?: string;
  url?: string;
  skillId?: number;
  chatRoomId?: number;
}

const sendEvent = ({
  action,
  parameter,
}: {
  action: WebviewActionTypes;
  parameter?: WebviewActionParameter;
}) => {
  // IOS
  if (window.webkit?.messageHandlers?.hbReport?.postMessage) {
    window.webkit.messageHandlers.hbReport.postMessage({
      action,
      ...(parameter && { parameter }),
    });
    return;
  }

  // Web
  if (window.parent) {
    window.parent.postMessage(
      {
        action,
        ...(parameter && { parameter }),
      },
      '*',
    );
    return;
  }

  // Android
  if (window.androidHellobotWebViewApi?.hbReport) {
    window.androidHellobotWebViewApi.hbReport(
      JSON.stringify({
        action,
        ...(parameter && { parameter }),
      }),
    );
    return;
  }
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

export default {
  doShare,
  goBack,
  goSkillDetailPage,
  goRelationReportListPage,
};
