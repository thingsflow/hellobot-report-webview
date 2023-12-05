'use client';
import useGetBridgeData from '@/apis/useGetBridgeData';
import { share } from '@/utils';
import Webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { t } from '@/utils/translate';
import { toast } from 'react-toastify';
import * as gaEvent from '@/utils/gaEvent';

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
    url: `https://dev.hellobot.co/relation-report-bridge/${data?.seq}`,
  };

  const handleShareIconClick = async () => {
    gaEvent.touchRelationShare({
      screenName: 'bridge_relationship_map',
    });

    const isAndroidWebView = window.androidHellobotWebViewApi?.hbReport;

    if (isAndroidWebView) {
      Webview.doShare({
        shareTitle: data?.skill?.name,
        shareLink: `https://dev.hellobot.co/relation-report-bridge/${data?.seq}`,
      });
    } else {
      const result = await share(dataToShare);

      if (result === 'copiedToClipboard') {
        toast(t('relationshipmap_invite_popup_toast_copied'));
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
