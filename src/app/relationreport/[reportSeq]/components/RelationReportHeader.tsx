'use client';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { share } from '@/utils';
import Webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';
import { environment } from '../../../../../environments/environment';
import { t } from '@/utils/translate';

const RelationReportHeader = () => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const handleCloseButtonClick = () => {
    Webview.goBack();
  };

  const dataToShare: ShareData = {
    title: data?.title,
    url: environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
  };

  const handleShareIconClick = async () => {
    const isAndroidWebView = window.androidHellobotWebViewApi?.hbReport;

    if (isAndroidWebView) {
      Webview.doShare({
        shareTitle: data?.title,
        shareLink:
          environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
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
        src="/images/buttons-btn-modal-share.svg"
        alt="Share Icon"
        width={32}
        height={32}
        priority
        onClick={handleShareIconClick}
      />
      <Image
        className="z-10 cursor-pointer"
        src="/images/buttons-btn-modal-close.svg"
        alt="Close Icon"
        width={32}
        height={32}
        priority
        onClick={handleCloseButtonClick}
      />
    </header>
  );
};

export default RelationReportHeader;
