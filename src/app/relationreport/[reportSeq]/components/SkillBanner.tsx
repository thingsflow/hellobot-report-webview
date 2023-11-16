import useGetRelationReport from '@/apis/useGetRelationReport';
import { t } from '@/utils/translate';
import webview from '@/utils/webview';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';

const SkillBanner = () => {
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const handleBannerButtonClick = () => {
    webview.goSkillDetailPage({ seq: data?.skill?.seq });
  };

  // TODO: 스킬 데이터 연동
  return (
    <div className="cursor-pointer h-[86px] flex bg-gray-500 items-center px-5 gap-4">
      <div className="w-[22px] h-[22px] bg-gray-400 flex-shrink-0"></div>
      {/* <Image
        className="bg-gray300"
        src={''}
        width={22}
        height={22}
        alt="Skill Icon"
      /> */}
      <div>
        <h5 className="flex text-white" onClick={handleBannerButtonClick}>
          <span className="pt-[1px] font-medium">{data?.skill?.name}</span>
          <Image
            className="bg-gray300 fill-white"
            src={'/images/arrow-right-white.svg'}
            width={16}
            height={16}
            alt="Skill Icon"
          />
        </h5>
        <div className="flex">
          <div className="flex items-center gap-1">
            <Image
              className="bg-gray300 fill-white"
              src={'/images/ic-star.svg'}
              width={12}
              height={12}
              alt="Skill Icon"
            />
            <div className="text-white pt-[4px] opacity-70">4.5 (1,234)</div>
          </div>
          <div className="text-white opacity-30 px-2 pt-[4px]">|</div>
          <div className="text-white pt-[4px] opacity-70">
            {t('chat_recommend_screen_label_views', { value: '300만+' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBanner;
