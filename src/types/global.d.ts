import { InitContent, SetViewerStyle } from './webview';

declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        hbReport: {
          postMessage: (parameter: any) => void;
        };
      };
    };

    androidHellobotWebApi: {
      //   initContent?: (parameter: InitContent) => void;
    };

    androidHellobotWebViewApi: {
      hbReport?: (parameter: string) => void;
    };

    // initContent: (parameter: InitContent) => void;
  }
}

export {};
