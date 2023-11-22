import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import { RelationReportModalContext } from '../../page';
import Image from 'next/image';
import webview from '@/utils/webview';
import useGetPlayData from '@/apis/useGetPlayData';
import Loading from '@/components/Loading';
import { PlayData } from '@/types/relationreport';
import { useParams } from 'next/navigation';
import useUpdateRelationReport from '@/apis/useUpdateRelationReport';
import { t } from '@/utils/translate';
import useGetRelationReport from '@/apis/useGetRelationReport';
import * as gaEvent from '@/utils/gaEvent';

interface IAddFriendsPopup {
  onClose: () => void;
}

const AddFriendsPopup = ({ onClose }: IAddFriendsPopup) => {
  const params = useParams();
  const { data: relationReportData } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { isAddFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  const { data, loading, mutate } = useGetPlayData({
    fixedMenuSeq: String(relationReportData?.skill?.seq),
    reportSeq: params.reportSeq as string,
  });

  const { trigger } = useUpdateRelationReport({
    reportSeq: params.reportSeq as string,
  });

  React.useEffect(() => {
    if (isAddFriendsPopupOpen) {
      gaEvent.viewListAddMemberPopup();
    }
  }, [isAddFriendsPopupOpen]);

  const handleOtherRelationReportButtonClick = () => {
    webview.goRelationReportListPage();
  };

  const handleOtherResultButtonClick = () => {
    webview.goChatRoomPage({
      skillSeq: data.skill?.seq,
      chatbotSeq: data.skill?.chatbot?.seq,
    });
  };

  const handlePlayDataItemClick = async (targetData: PlayData) => {
    if (!targetData.seq) {
      console.error('플레이데이터 정보가 유효하지 않습니다.');
      return;
    }

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

    await trigger({
      playDataSeqs: [targetData.seq],
    });

    onClose();
  };

  if (!isAddFriendsPopupOpen) {
    return null;
  }

  return (
    <>
      <CommonPopup
        title={t('relationshipmap_add_popup_title')}
        onClose={onClose}
      >
        <div className="relative flex flex-col gap-4">
          {data.playDatas ? (
            <div className="flex flex-col h-[390px] w-full overflow-scroll scrollbar-hide">
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
                        {t('relationshipmap_add_popup_button_added')}
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold"
                        onClick={() => handlePlayDataItemClick(item)}
                      >
                        {t('relationshipmap_add_popup_button_add')}
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
              <p className="mt-8 text-gray-500">
                {t('relationshipmap_add_popup_description_empty')}
              </p>
            </div>
          )}
          <div
            className="flex items-center justify-center w-full h-12 font-bold text-white bg-gray-900 cursor-pointer rounded-3xl"
            onClick={handleOtherResultButtonClick}
          >
            {t('relationshipmap_add_popup_button_new_result')}
          </div>
        </div>
        <div
          className="cursor-pointer absolute text-white text-[14px] -bottom-8 right-1/2 translate-x-1/2"
          onClick={handleOtherRelationReportButtonClick}
        >
          {t('relationshipmap_add_popup_button_other_map')}
        </div>
      </CommonPopup>
      {loading && <Loading />}
    </>
  );
};

export default AddFriendsPopup;
