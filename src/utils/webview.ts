type WebviewActionTypes = 'shareButtonClick' | 'closeButtonClick';
interface WebviewActionParameter {
  title?: string;
  url?: string;
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

const shareButtonClick = (parameter: WebviewActionParameter) => {
  sendEvent({ action: 'shareButtonClick', parameter });
};

const closeButtonClick = () => {
  sendEvent({ action: 'closeButtonClick' });
};

export default { shareButtonClick, closeButtonClick };
