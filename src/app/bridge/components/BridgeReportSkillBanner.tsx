import Image from 'next/image';
import * as React from 'react';

const BridgeReportSkillBanner = ({
  title = '2024년 신년운세 보고서',
  image,
  stars,
  views,
}: any) => {
  const handleBannerButtonClick = () => {};

  return (
    <div className="w-full px-4">
      <div className="cursor-pointer flex bg-white border border-gray-200 border-solid rounded-xl p-3">
        <div className="w-[98px] h-[73px] bg-gray-400 flex-shrink-0 rounded-lg mr-3"></div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-[20px] h-[20px] bg-gray-400 mr-[5px]"></div>
            <div className="text-[#7E8185] text-[11px]">사주 by 판밍밍</div>
          </div>
          <h5 className="font-medium">{title}</h5>
          <div className="flex">
            <div className="flex gap-1 items-center">
              <Image
                className="bg-gray300 fill-white"
                src={'/images/ic-star.svg'}
                width={16}
                height={16}
                alt="Skill Icon"
              />
              <div className="text-[#555759] pt-[4px] text-[13px]">
                4.5 ・ 조회수 300만+
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeReportSkillBanner;
