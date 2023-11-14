'use client';
import useGetBridgeData from '@/apis/useGetBridgeData';
import { share } from '@/utils';
import Webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { environment } from '../../../../environments/environment';

const BridgeReportHeader = () => {
  const params = useParams();
  const { data } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  const handleCloseButtonClick = () => {
    Webview.goBack();
  };

  const dataToShare: ShareData = {
    title: data?.skill?.name,
    url: `${environment.url}/skills/${data?.skill?.seq}`,
  };

  const handleShareIconClick = async () => {
    const isAndroidWebView = window.androidHellobotWebViewApi?.hbReport;

    if (isAndroidWebView) {
      Webview.doShare({
        shareTitle: data?.skill?.name,
        shareLink: `${environment.url}/skills/${data?.skill?.seq}`,
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
    <header className="flex justify-between w-full px-4 pt-4">
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
