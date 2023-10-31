'use client';
import Webview from '@/utils/webview';
import Image from 'next/image';
import * as React from 'react';


const CreateRelationReportHeader = () => {
  const handleBackButtonClick = () => {
    Webview.closeButtonClick();
  };

  return (
    <header className="w-full flex justify-center items-center relative h-[44px]">
      <Image
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2"
        src="/images/buttons-btn-back.svg"
        alt="Back Icon"
        width={24}
        height={24}
        priority
        onClick={handleBackButtonClick}
      />
      <h1 className="text-[#242526] text-[17px] font-bold">시작 멤버 선택</h1>
      
    </header>
  );
};

export default CreateRelationReportHeader;
