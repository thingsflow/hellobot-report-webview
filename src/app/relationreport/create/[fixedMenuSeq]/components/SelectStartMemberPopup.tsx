import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { t } from '@/utils/translate';
import useGetPlayData from '@/apis/useGetPlayData';
import { useParams } from 'next/navigation';
import { PlayData } from '@/types/relationreport';

interface ISelectStartMemberPopup {
  onClose: () => void;
  onSelect: (targetData: PlayData) => void;
  selectedSeq?: number;
}

// 시작멤버 선택화면에서 선택한 프로필을 리스트 맨 앞으로 옮기기
const SelectStartMemberPopup = ({
  onClose,
  onSelect,
  selectedSeq,
}: ISelectStartMemberPopup) => {
  const params = useParams();
  const { data, mutate } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
    options: {
      revalidateIfStale: false,
    },
  });

  const handleSelectButtonClick = (targetData: PlayData) => {
    onSelect(targetData);

    // 선택한 플레이데이터를 맨 앞으로 보내기
    const newPlayDatas = [...(data.playDatas || [])];
    const targetDataIndex = newPlayDatas?.findIndex(
      (data) => data.seq === targetData.seq,
    );

    newPlayDatas.unshift(newPlayDatas.splice(targetDataIndex!, 1)[0]);

    mutate(
      {
        data: {
          skill: data.skill,
          playDatas: newPlayDatas,
        },
      },
      { revalidate: false },
    );

    onClose();
  };

  return (
    <CommonPopup
      title={t('relationshipmap_create_screen_label_start_member')}
      onClose={onClose}
    >
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col h-[390px] w-full overflow-scroll scrollbar-hide">
          {data.playDatas?.map((item) => (
            <div
              className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid"
              key={item.seq}
            >
              <div className="flex flex-col">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div
                  className="text-gray-600 
                    text-[13px] line-clamp-1"
                >
                  {item.resultName}
                </div>
              </div>
              {item.seq === selectedSeq ? (
                <div
                  className="cursor-pointer w-[74px] rounded-[20px] bg-gray-900 h-10 flex items-center justify-center text-white text-[14px] font-bold shrink-0"
                  onClick={() => handleSelectButtonClick(item)}
                >
                  {t('relationshipmap_create_screen_button_selected')}
                </div>
              ) : (
                <div
                  className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold shrink-0"
                  onClick={() => handleSelectButtonClick(item)}
                >
                  {t('relationshipmap_create_screen_button_select')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CommonPopup>
  );
};

export default SelectStartMemberPopup;
