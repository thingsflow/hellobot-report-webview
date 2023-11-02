import Image from 'next/image';
import * as React from 'react';

const ChatBotBanner = ({ title = '판밍밍', image, stars, views }: any) => {
  const handleBannerButtonClick = () => {};

  return (
    <div
      className="cursor-pointer h-[100px] flex items-center px-5 gap-4"
      onClick={handleBannerButtonClick}
    >
      <div className="w-[52px] h-[52px] bg-gray-400 flex-shrink-0"></div>
      {/* <Image
        className="bg-gray300"
        src={''}
        width={22}
        height={22}
        alt="Skill Icon"
      /> */}
      <div>
        <h5
          className="text-gray-900 flex items-center"
          onClick={handleBannerButtonClick}
        >
          <div>{title}</div>
          <div className="text-[11px] text-[#A0A4A8] font-bold px-2 py-1 bg-[#f5f5f5] rounded-xl ml-[5px]">
            타로챗봇
          </div>
        </h5>
        <div className="text-[#7E8185] text-[13px]">
          중국에서 사주명리를 공부했어요
        </div>
      </div>
    </div>
  );
};

export default ChatBotBanner;
