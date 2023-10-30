'use client';
import { share } from '@/utils';
import Image from 'next/image';
import * as React from 'react';

const RelationReportHeader = () => {
  const handleCloseButtonClick = () => {};

  const dataToShare: ShareData = {
    title: '2024 우리 모임 관계도',
    text: '관계도 관련 설명 어쩌구 저ㄱ쩌구~~ 링크는 스플링크입니당',
    url: `https://storyplay.com`,
  };

  const handleShareIconClick = async () => {
    console.log('handleShareIconClick');
    const result = await share(dataToShare);
    if (result === 'copiedToClipboard') {
      alert('링크를 클립보드에 복사했습니다.');
    } else if (result === 'failed') {
      alert('공유하기가 지원되지 않는 환경입니다.');
    }
    // if (androidWebView) {
    //   nativeShare(
    //     { url: `${BASE_URL}/result/shared/${drinkId}` },
    //     function (result_cd: any, result_msg: any, extra: any) {
    //       console.log(result_cd + result_msg + JSON.stringify(extra));
    //     }
    //   );
    // } else {
    //   const result = await share(dataToShare);
    //   if (result === "copiedToClipboard") {
    //     alert("링크를 클립보드에 복사했습니다.");
    //   } else if (result === "failed") {
    //     alert("공유하기가 지원되지 않는 환경입니다.");
    //   }
    // }
  };

  return (
    <header className="w-full flex justify-between px-4 pt-4">
      <Image
        className="z-10 cursor-pointer"
        src="/images/buttons-btn-modal-share.svg"
        alt="Share Icon"
        width={32}
        height={32}
        priority
        onClick={handleShareIconClick}
      />
      <Image
        className="z-10 cursor-pointer"
        src="/images/buttons-btn-modal-close.svg"
        alt="Close Icon"
        width={32}
        height={32}
        priority
        onClick={handleCloseButtonClick}
      />
    </header>
  );
};

export default RelationReportHeader;
