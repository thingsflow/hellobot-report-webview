import * as React from 'react';
import { copyToClipboard } from '@/utils';
import shareWithKakao from '@/utils/shareWithKakao';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { t } from '@/utils/translate';
import { useParams } from 'next/navigation';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { environment } from '../../../../../environments/environment';

const RelationReportShare = () => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const handleCopyLinkButtonClick = () => {
    copyToClipboard(
      environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
    );
    toast(t('relationshipmap_invite_popup_toast_copied'));
    toast(t('relationshipmap_invite_popup_toast_copied'));
  };

  const handleShareWithKakaoButtonClick = () => {
    shareWithKakao({
      title: data?.title,
      description: '뭐가 들어가야하지?',
      imageUrl: data?.imageUrl,
      shareUrl:
        environment.relationReportShareBaseUrl + `?relationSeq=${data?.seq}`,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        <div className="w-full h-[320px] bg-gray-300"></div>
        <p className="whitespace-pre-wrap text-[#7E8185] text-center mt-8">
          {t('relationshipmap_screen_description_share')}
        </p>
        <div className="flex gap-3 mt-6">
          <div
            className="w-12 h-12 rounded-full bg-[#FFE812] flex items-center justify-center"
            onClick={handleShareWithKakaoButtonClick}
          >
            <Image
              src="/images/kakao.svg"
              width={24}
              height={24}
              alt="Kakao Icon"
            />
          </div>
          <div
            className="w-12 h-12 rounded-full border border-solid border-[#E2E3E6] flex items-center justify-center cursor-pointer"
            onClick={handleCopyLinkButtonClick}
          >
            <Image
              src="/images/icons-08-button-icon-btn-more.svg"
              width={24}
              height={24}
              alt="Copy Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationReportShare;
