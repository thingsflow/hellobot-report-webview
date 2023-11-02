'use client';
import { share } from '@/utils';
import Webview from '@/utils/webview';
import Image from 'next/image';
import * as React from 'react';

interface IBridgeReportHeader {
  shareTitle: string;
  shareLink: string;
}

const BridgeReportHeader = ({ shareTitle, shareLink }: IBridgeReportHeader) => {
  const handleCloseButtonClick = () => {
    Webview.closeButtonClick();
  };

  const dataToShare: ShareData = {
    title: shareTitle,
    url: shareLink,
  };

  const handleShareIconClick = async () => {
    const isAndroidWebView = window.androidHellobotWebViewApi?.hbReport;

    if (isAndroidWebView) {
      Webview.shareButtonClick({
        title: shareTitle,
        url: shareLink,
      });
    } else {
      const result = await share(dataToShare);
      if (result === 'copiedToClipboard') {
        alert('링크를 클립보드에 복사했습니다.');
      } else if (result === 'failed') {
        alert('공유하기가 지원되지 않는 환경입니다.');
      }
    }
  };

  return (
    <header className="w-full flex justify-between px-4 pt-4">
      <Image
        className="z-10 cursor-pointer"
        src="/images/modal-share-light.svg"
        alt="Share Icon"
        width={32}
        height={32}
        priority
        onClick={handleShareIconClick}
      />
      <Image
        className="z-10 cursor-pointer"
        src="/images/modal-close-light.svg"
        alt="Close Icon"
        width={32}
        height={32}
        priority
        onClick={handleCloseButtonClick}
      />
    </header>
  );
};

export default BridgeReportHeader;
