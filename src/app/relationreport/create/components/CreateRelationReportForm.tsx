import FixedBottomButton from '@/components/FixedBottomButton';
import Toggle from '@/components/Toggle';
import Image from 'next/image';
import React from 'react';
import SelectStartMemberPopup from './SelectStartMemberPopup';

const dataOverThree = [
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
    isAdded: false,
  },
  {
    id: 3,
    name: 'Daniel Lee',
    result: '결과가 긴 결과아하하 이게 뭔말이야 나도 몰라 하하하ㅏ',
    isAdded: false,
  },
  {
    id: 4,
    name: '써네쨩',
    result: '병오일주',
    isAdded: false,
  },
];
const dataUnderThree = [
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
    isAdded: false,
  },
];

const mockData: any[] | [] = dataOverThree;

const CreateRelationReportForm = () => {
  const [title, setTitle] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isSelectStartMemberPopupOpen, setIsSelectStartMemberPopupOpen] =
    React.useState(false);

  const handleLoadMoreMemberButtonClick = () => {
    setIsSelectStartMemberPopupOpen(true);
  };

  return (
    <>
      <div className="pt-8 px-4 pb-[96px]">
        <h5 className="text-gray-900 font-bold">시작 멤버 선택</h5>
        <p className="whitespace-pre-wrap text-gray-500 text-xs">
          {
            '선택한 유저를 기준으로 새로운 관계도가 만들어 집니다.\n관계도를 시작할 첫번째 멤버를 선택해 주세요'
          }
        </p>
        <div className="flex flex-col w-full">
          {mockData.length > 3 ? (
            <>
              {mockData.slice(0, 3).map((item) => (
                <div
                  className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid"
                  key={item.id}
                >
                  <div className="flex flex-col">
                    <div className="text-gray-900 font-medium">{item.name}</div>
                    <div className="text-gray-600 text-[13px] line-clamp-1">
                      {item.result}
                    </div>
                  </div>
                  {item.isAdded ? (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-gray-900 h-10 flex items-center justify-center text-white text-[14px] font-bold">
                      선택됨
                    </div>
                  ) : (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold">
                      선택
                    </div>
                  )}
                </div>
              ))}
              <div
                className="w-full flex items-center justify-center my-2 h-10"
                onClick={handleLoadMoreMemberButtonClick}
              >
                <p className="text-[#555759] text-[14px] flex items-center border border-solid px-6 py-[7px] rounded-full border-gray-300">
                  <span className="font-bold pt-[1px]">멤버&nbsp;</span>
                  <span className="pt-[1px]">더보기</span>
                  <Image
                    className="inline-block"
                    src="/images/arrow-right.svg"
                    alt="Arrow Icon"
                    width={16}
                    height={16}
                  />
                </p>
              </div>
            </>
          ) : (
            <>
              {mockData.map((item) => (
                <div
                  className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid"
                  key={item.id}
                >
                  <div className="flex flex-col">
                    <div className="text-gray-900 font-medium">{item.name}</div>
                    <div className="text-gray-600 text-[13px] line-clamp-1">
                      {item.result}
                    </div>
                  </div>
                  {item.isAdded ? (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-gray-900 h-10 flex items-center justify-center text-white text-[14px] font-bold">
                      선택됨
                    </div>
                  ) : (
                    <div className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold">
                      선택
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="pt-8">
          <h5 className="text-gray-900 font-bold mb-4">모임 이름</h5>
          <div className="relative">
            <input
              type="text"
              className="w-full h-12 bg-[#f5f5f5] rounded-lg text=[#242526] px-4 py-3 pr-11"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="모임 이름을 입력해주세요"
            />
            <Image
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 bg-[#f5f5f5]"
              src="/images/btn-input-clear.svg"
              width={24}
              height={24}
              alt="Clear Icon"
              onClick={() => setTitle('')}
            />
          </div>
          <div className="flex flex-col pt-8">
            <h5 className="text-gray-900 font-bold mb-4">공개 여부</h5>
            <div className="flex items-center justify-between">
              <div className="h-12 flex items-center">
                <Image
                  src="/images/coaching-lock.svg"
                  width={24}
                  height={24}
                  alt="Lock Icon"
                />
                <p className="text=[#242526]">이 관계도 나만보기</p>
              </div>
              <Toggle
                isOn={isPrivate}
                onToggle={() => setIsPrivate((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
      <FixedBottomButton title="새로운 모임 만들기" />
      {isSelectStartMemberPopupOpen && (
        <SelectStartMemberPopup
          onClose={() => setIsSelectStartMemberPopupOpen(false)}
          onSelect={() => {}}
        />
      )}
    </>
  );
};

export default CreateRelationReportForm;
