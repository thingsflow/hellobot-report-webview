import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { RelationReportModalContext } from '../../page';
import Image from 'next/image';

const data = [
  {
    id: 1,
    name: '수지',
    result: '병오일주',
    isAdded: true,
  },
  {
    id: 2,
    name: '현아',
    result: '병오일주',
    isAdded: true,
  },
  {
    id: 3,
    name: 'Daniel Lee',
    result: '결과가 긴 결과아하하 이게 뭔말이야 몰라나도 하하하',
    isAdded: false,
  },
  {
    id: 4,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
  {
    id: 5,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
  {
    id: 6,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
  {
    id: 7,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
  {
    id: 8,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
];
const emptyData: [] = [];

const mockData: any[] | [] = data;

interface IAddFriendsPopup {
  onClose: () => void;
  onConfirmButtonClick: () => void;
}

const AddFriendsPopup = ({
  onClose,
  onConfirmButtonClick,
}: IAddFriendsPopup) => {
  const { isAddFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  if (!isAddFriendsPopupOpen) {
    return null;
  }

  return (
    <CommonPopup title={'추가하기'} onClose={onClose}>
      <div className="flex flex-col gap-4 relative">
        {mockData.length > 0 ? (
          <div className="flex flex-col h-[390px] w-full overflow-scroll">
            {mockData.map((item) => {
              return (
                <div className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid" key={item.id}>
                  <div className="flex flex-col">
                    <div className="text-gray-900 font-medium">{item.name}</div>
                    <div className="text-gray-600 text-[13px] line-clamp-1">
                      {item.result}
                    </div>
                  </div>
                  {item.isAdded ? (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-gray-400 h-10 flex items-center justify-center text-gray-200 text-[14px] font-bold">
                      추가됨
                    </div>
                  ) : (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold">
                      추가
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-start items-center h-[390px] w-full pt-16">
            <Image
              src="/images/ic-information.svg"
              width={50}
              height={50}
              alt="Warning Icon"
            />
            <p className="text-gray-500 mt-8">저장된 결과가 없어요.</p>
          </div>
        )}

        <div className="cursor-pointer bg-gray-900 w-full flex items-center justify-center font-bold text-white h-12 rounded-3xl">
          새로운 결과 보러가기
        </div>
      </div>
      <div className="cursor-pointer absolute text-white text-[14px] -bottom-8 right-1/2 translate-x-1/2">
        다른 관계도 보러가기
      </div>
    </CommonPopup>
  );
};

export default AddFriendsPopup;
