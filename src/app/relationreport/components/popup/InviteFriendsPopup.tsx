import React, { useEffect } from 'react';
import Image from 'next/image';
import CommonPopup from '@/components/CommonPopup';
import shareWithKakao from '@/utils/shareWithKakao';
import { RelationReportModalContext } from '../../page';

interface IInviteFriendsPopup {
  onClose: () => void;
  onCopyLinkClick: () => void;
}

const InviteFriendsPopup = ({
  onClose,
  onCopyLinkClick,
}: IInviteFriendsPopup) => {
  const { isInviteFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  if (!isInviteFriendsPopupOpen) {
    return null;
  }

  const handleKakaoTalkButtonClick = () => {
    shareWithKakao();
  };

  return (
    <CommonPopup title={'친구 초대'} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-[#7E8185] text-[14px]">
          내가 공유한 링크로 친구가 결제하면 15프로 할인된 가격으로 스킬을
          이용할 수 있어요.
        </p>
        <div>
          <div className="flex mb-2 w-full">
            <div className="bg-gray-50 rounded-l-lg basis-2/3 grow text-gray-600 h-12 flex items-center p-2">
              https://bit.ly/hello_bot
            </div>
            <div
              className="cursor-pointer bg-gray-200 font-semibold rounded-r-lg rounded-sm w-[91px] text-gray-900 h-12 flex items-center justify-center"
              onClick={onCopyLinkClick}
            >
              링크 복사
            </div>
          </div>
          <div           
          id="kakaotalk-sharing-btn"
          className="cursor-pointer basis-1/3 flex gap-2 w-full bg-[#FEE500] h-[45px] justify-center items-center rounded-lg"
          onClick={shareWithKakao}>
            <div>
              <Image
                src="/images/kakao.svg"
                width={18}
                height={18}
                alt="Kakao Icon"
              />
            </div>
            <p
              className="rounded-[6px] font-semibold text-[15px] text-black/[.85]"
              onClick={handleKakaoTalkButtonClick}
            >
              카카오톡 전송
            </p>
          </div>
        </div>
      </div>
    </CommonPopup>
  );
};

export default InviteFriendsPopup;
