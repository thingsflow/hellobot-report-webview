import * as React from 'react';
import { copyToClipboard } from '@/utils';
import shareWithKakao from '@/utils/shareWithKakao';
import Image from 'next/image';
import { toast } from 'react-toastify';

const RelationReportShare = () => {
  const handleCopyLinkButtonClick = () => {
    copyToClipboard('https://storyplay.com');
    toast('클립보드에 링크가 복사되었습니다.');
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        <h3 className="font-bold text-[20px] mb-1">
          가족이 모이면 이런 관계도가 보여요!
        </h3>
        <div className="w-full h-[300px] bg-gray-300"></div>
        <p className="whitespace-pre-wrap text-[#7E8185] text-center mt-8">
          {'지금 링크를 공유하고\n우리 모임의 관계도를 확인해 보세요.'}
        </p>
        <div className="flex gap-3 mt-6">
          <div
            className="w-12 h-12 rounded-full bg-[#FFE812] flex items-center justify-center"
            onClick={shareWithKakao}
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
