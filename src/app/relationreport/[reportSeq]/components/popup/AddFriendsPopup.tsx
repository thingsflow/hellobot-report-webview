import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { RelationReportModalContext } from '../../page';
import Image from 'next/image';
import webview from '@/utils/webview';
import useGetPlayData from '@/apis/useGetPlayData';
import Loading from '@/components/Loading';
import { PlayData } from '@/types/relationreport';
import { useParams } from 'next/navigation';

interface IAddFriendsPopup {
  onClose: () => void;
  onConfirmButtonClick: () => void;
}

const AddFriendsPopup = ({
  onClose,
  onConfirmButtonClick,
}: IAddFriendsPopup) => {
  const params = useParams();
  const { isAddFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );
  const { data, loading, mutate } = useGetPlayData({
    fixedMenuSeq: '34603', // TODO: 실제 스킬 시퀀스로 변경
    reportSeq: params.reportSeq as string,
  });

  const handleOtherRelationReportButtonClick = () => {
    webview.goRelationReportListPage();
  };

  const handleOtherResultButtonClick = () => {
    webview.goChatRoomPage({ chatRoomId: 52 });
  };

  const handlePlayDataItemClick = (targetData: PlayData) => {
    // TODO: 관계도에 플레이데이터 추가 API 연동
    mutate({
      data: {
        skill: data.skill,
        playDatas:
          data?.playDatas?.map((data) => {
            if (targetData.seq === data.seq) {
              return {
                ...data,
                isAlreadyAdded: true,
              };
            }
            return data;
          }) || [],
      },
    });
  };

  if (!isAddFriendsPopupOpen) {
    return null;
  }

  return (
    <>
      <CommonPopup title={'추가하기'} onClose={onClose}>
        <div className="relative flex flex-col gap-4">
          {data.playDatas ? (
            <div className="flex flex-col h-[390px] w-full overflow-scroll">
              {data.playDatas?.map((item) => {
                return (
                  <div
                    className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid"
                    key={item.seq}
                  >
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-gray-600 text-[13px] line-clamp-1">
                        {item.resultName}
                      </div>
                    </div>
                    {item.isAlreadyAdded ? (
                      <div className="w-[74px] rounded-[20px] bg-gray-400 h-10 flex items-center justify-center text-gray-200 text-[14px] font-bold">
                        추가됨
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold"
                        onClick={() => handlePlayDataItemClick(item)}
                      >
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
              <p className="mt-8 text-gray-500">저장된 결과가 없어요.</p>
            </div>
          )}
          <div
            className="flex items-center justify-center w-full h-12 font-bold text-white bg-gray-900 cursor-pointer rounded-3xl"
            onClick={handleOtherResultButtonClick}
          >
            새로운 결과 보러가기
          </div>
        </div>
        <div
          className="cursor-pointer absolute text-white text-[14px] -bottom-8 right-1/2 translate-x-1/2"
          onClick={handleOtherRelationReportButtonClick}
        >
          다른 관계도 보러가기
        </div>
      </CommonPopup>
      {loading && <Loading />}
    </>
  );
};

export default AddFriendsPopup;
