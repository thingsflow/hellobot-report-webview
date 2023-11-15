import * as React from 'react';
import useGetBridgeData from '@/apis/useGetBridgeData';
import webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { t } from '@/utils/translate';

const BridgeReportSkillBanner = () => {
  const params = useParams();
  const { data, loading } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  const handleBannerButtonClick = () => {
    webview.goSkillDetailPage({ skillId: data?.skill?.seq });
  };

  return (
    <div
      className="relative w-full px-4 cursor-pointer z-60 "
      onClick={handleBannerButtonClick}
    >
      {loading ? (
        <Skeleton
          className="py-[13px] rounded-lg"
          width={'100%'}
          height={'99px'}
          duration={0.9}
        />
      ) : (
        <div className="flex p-3 bg-white border border-gray-200 border-solid rounded-xl ">
          <Image
            className="flex-shrink-0 object-cover mr-3 rounded-lg w-[98px] h-[73px]"
            src={
              data?.skill?.newSkillBannerImageUrl ||
              '/images/new-skill-banner-default.png'
            }
            alt="Banner Image"
            width={98}
            height={73}
            placeholder="empty"
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <Image
                src={data?.skill?.chatbot?.activeProfileUrl || ''}
                alt="Skill Profile Image"
                width={20}
                height={20}
              />
              <div className="text-[#7E8185] text-[11px]">
                {data?.skill?.chatbot?.name}
              </div>
            </div>
            <h5 className="font-medium">{data?.skill?.name}</h5>
            <div className="flex">
              <div className="flex items-center gap-1">
                <Image
                  className="bg-gray300 fill-white"
                  src={'/images/ic-star.svg'}
                  width={16}
                  height={16}
                  alt="Skill Icon"
                />
                <div className="text-[#555759] pt-[4px] text-[13px]">
                  {data?.skill?.evalAvgScore} ・{' '}
                  {t('home_screen_label_skill_view_count', {
                    value: data?.skill?.badge?.title,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeReportSkillBanner;
