import webview from '@/utils/webview';
import Image from 'next/image';
import * as React from 'react';

const SkillBanner = ({
  title = '2024년 신년운세 보고서',
  image,
  stars,
  views,
}: any) => {
  const handleBannerButtonClick = () => {
    webview.goSkillDetailPage({ skillId: 2141 });
  };

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
        <h5 className="text-white flex" onClick={handleBannerButtonClick}>
          <span className="pt-[1px] font-medium">{title}</span>
          <Image
            className="bg-gray300 fill-white"
            src={'/images/arrow-right-white.svg'}
            width={16}
            height={16}
            alt="Skill Icon"
          />
        </h5>
        <div className="flex">
          <div className="flex gap-1 items-center">
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
          <div className="text-white pt-[4px] opacity-70">조회수 300만+</div>
        </div>
      </div>
    </div>
  );
};

export default SkillBanner;
