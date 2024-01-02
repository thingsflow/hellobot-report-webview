declare global {
  interface Window {
    Kakao: any;
    webkit?: {
      messageHandlers?: {
        hbReport?: {
          postMessage?: (parameter: any) => void;
        };
      };
    };
    androidHellobotWebViewApi?: {
      hbReport?: (parameter: string) => void;
    };
  }
}

export {};
