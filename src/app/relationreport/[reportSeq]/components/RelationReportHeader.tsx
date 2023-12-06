'use client';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { share } from '@/utils';
import Webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';
import { t } from '@/utils/translate';
import * as gaEvent from '@/utils/gaEvent';
import RelationReportContext from '../RelationReportContext';

const RelationReportHeader = () => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { setIsPreventSharePopupOpen } = React.useContext(
    RelationReportContext,
  );

  React.useEffect(() => {
    if (data?.title) {
      gaEvent.viewRelationshipMap({
        relationshipMapName: data?.title,
        isJoinedRelationshipMap: !!data.hasPlayDataAdded,
        relationshipMapMemberCount: data.extraUsersCount || 0 + 1,
        menuName: data.skill?.name,
        menuSeq: data.skillSeq,
      });
    }
  }, [data]);

  const handleCloseButtonClick = () => {
    Webview.goBack();
  };

  const dataToShare: ShareData = {
    title: data?.title,
    url: `${process.env.NEXT_PUBIC_SKILLSTORE_URL}/relation-reports/diagram?relationSeq=${params.reportSeq}&share=true`,
  };

  const handleShareIconClick = async () => {
    if (data?.shareScope === 'PRIVATE') {
      setIsPreventSharePopupOpen(true);
      return;
    }

    gaEvent.touchRelationShare({
      screenName: 'relationship_map',
    });

    const isAndroidWebView = window.androidHellobotWebViewApi?.hbReport;
    if (isAndroidWebView) {
      Webview.doShare({
        shareTitle: data?.title,
        shareLink: `${process.env.NEXT_PUBIC_SKILLSTORE_URL}/relation-reports/diagram?relationSeq=${params.reportSeq}&share=true`,
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

export default RelationReportHeader;
