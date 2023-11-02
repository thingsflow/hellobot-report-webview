'use client';
import Webview from '@/utils/webview';
import Image from 'next/image';
import * as React from 'react';

const CreateRelationReportTitle = () => {
  const handleBackButtonClick = () => {
    Webview.closeButtonClick();
  };

  return (
    <div className="flex flex-col w-full py-8 px-4">
      <h2 className="text-[22px] font-bold text-gray-900 whitespace-pre-wrap">
        {'아래 스킬 결과로\n새로운 관계도 모임을 생성합니다.'}
      </h2>
      <div className="flex">
        <div className="rounded-l-lg w-[72px] h-[56px] bg-gray-300 flex-shrink-0"></div>
        <div className="rounded-r-lg pl-4 bg-gray-100 w-full flex items-center font-medium ">
          <h2 className="line-clamp-2">2024년 신년운세 보고서</h2>
        </div>
      </div>
    </div>
  );
};

export default CreateRelationReportTitle;
