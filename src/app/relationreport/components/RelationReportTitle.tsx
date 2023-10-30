import Image from 'next/image';
import * as React from 'react';

interface IRelationReportTitle {
  title: string;
}

const RelationReportTitle = ({ title }: IRelationReportTitle) => {
  const handleInviteFriendButtonClick = () => {};

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
          className="flex gap-1 text-gray-700 text-xs text-normal border border-gray-200 border-solid px-4 py-2 rounded-3xl bg-white cursor-pointer"
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
