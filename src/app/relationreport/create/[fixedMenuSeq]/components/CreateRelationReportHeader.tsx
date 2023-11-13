'use client';
import Image from 'next/image';
import * as React from 'react';
import { useRouter } from 'next/navigation';

const CreateRelationReportHeader = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
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
      <h1 className="text-[#242526] text-[17px] font-bold">
        새로운 모임 만들기
      </h1>
    </header>
  );
};

export default CreateRelationReportHeader;
