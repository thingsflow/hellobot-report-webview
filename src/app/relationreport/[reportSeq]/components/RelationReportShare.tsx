import * as React from 'react';
import { copyToClipboard } from '@/utils';
import shareWithKakao from '@/utils/shareWithKakao';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { t } from '@/utils/translate';
import { useParams } from 'next/navigation';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { environment } from '../../../../../environments/environment';
import * as gaEvent from '@/utils/gaEvent';
import { useRelationReportContext } from '../context';

const RelationReportShare = () => {
  const params = useParams();
  const { setIsPreventSharePopupOpen } = useRelationReportContext();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const handleCopyLinkButtonClick = () => {
    gaEvent.touchRelationLinkCopy();

    copyToClipboard(
      environment.relationReportShareBaseUrl +
        `?relationSeq=${data?.seq}&share=true`,
    );
    toast(t('relationshipmap_invite_popup_toast_copied'));
  };

  const handleShareWithKakaoButtonClick = () => {
    if (data?.shareScope === 'PRIVATE') {
      setIsPreventSharePopupOpen(true);
      return;
    }

    gaEvent.touchRelationKakaoShare();

    shareWithKakao({
      title: data?.title,
      description: '우리 사이의 관계가 궁금하다면 지금 확인해보세요!',
      imageUrl: data?.imageUrl,
      shareUrl:
        environment.relationReportShareBaseUrl +
        `?relationSeq=${data?.seq}&share=true`,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        <h3 className="px-4 mb-8 font-bold text-[20px] whitespace-pre-wrap text-center">
          {t('relationshipmap_screen_description_example_family')}
        </h3>
        {data?.sampleImageUrl && (
          // 443: 370에 대한 391의 비율값
          <div className="relative w-full pb-[105.68%]">
            <Image
              src={data.sampleImageUrl || ''}
              alt="Sample Image"
              fill={true}
              layout="fill"
            />
          </div>
        )}
        {data?.shareScope === 'PUBLIC' && (
          <>
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
                  src="/images/icons-08-button-icon-btn-more-light.svg"
                  width={24}
                  height={24}
                  alt="Copy Icon"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RelationReportShare;
