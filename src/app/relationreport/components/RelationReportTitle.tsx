import Image from 'next/image';
import * as React from 'react';
import { environment } from '../../../../environments/environment';

interface IRelationReportTitle {
  title: string;
}

const RelationReportTitle = ({ title }: IRelationReportTitle) => {
  const handleInviteFriendButtonClick = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(environment.kakaoAppJsKey);
      }

      kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title,
          description: '관계도 설명~~~어쩌구 저쩌구',
          imageUrl:
            'https://github.com/thingsflow/hellobot-report-webview/assets/116791055/36d4b1cf-d3ef-45a9-b6d4-cd9bea0ca390',
          imageWidth: 1200,
          imageHeight: 1200,
          link: {
            mobileWebUrl: 'https://hellobot.co/',
            webUrl: 'https://hellobot.co/',
          },
        },
        buttons: [
          {
            title: '내 결과 보러가기',
            link: {
              mobileWebUrl: 'https://hellobot.co/',
              webUrl: 'https://hellobot.co/',
            },
          },
        ],
      });
    }
  };

  const createNewMoimButtonClick = () => {};

  return (
    <div className="px-5 pt-6">
      <div className="flex mb-3">
        <h1 className="text-[22px] font-bold mr-1">{title}</h1>
        <Image
          src="/images/icon-modify-small.svg"
          alt="Modify Icon"
          width={20}
          height={20}
        />
      </div>
      <div className="flex gap-[6px]">
        <div
          id="kakaotalk-sharing-btn"
          className="z-50 flex gap-1 text-gray-700 text-xs text-normal border border-gray-200 border-solid px-4 py-2 rounded-3xl bg-white cursor-pointer"
          onClick={handleInviteFriendButtonClick}
        >
          <Image
            src="/images/icons-08-button-icon-btn-more.svg"
            alt="Invite Icon"
            width={16}
            height={16}
          />
          <p className="pt-[1px]">친구 초대</p>
        </div>
        <div
          className="flex gap-1 text-gray-700 text-xs text-normal border border-gray-200 border-solid px-4 py-2 rounded-3xl bg-white cursor-pointer"
          onClick={createNewMoimButtonClick}
        >
          <Image
            src="/images/new.svg"
            alt="newboard Icon"
            width={16}
            height={16}
          />
          <p className="pt-[1px]">새로운 모임 만들기</p>
        </div>
      </div>
    </div>
  );
};

export default RelationReportTitle;
