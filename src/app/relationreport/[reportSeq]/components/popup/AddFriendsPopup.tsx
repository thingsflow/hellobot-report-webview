import React from 'react';
import CommonPopup from '@/components/CommonPopup';
import Image from 'next/image';
import webview from '@/utils/webview';
import useGetPlayData from '@/apis/useGetPlayData';
import { PlayData } from '@/types/relationreport';
import { useParams } from 'next/navigation';
import useUpdateRelationReport from '@/apis/useUpdateRelationReport';
import { t } from '@/utils/translate';
import useGetRelationReport from '@/apis/useGetRelationReport';
import * as gaEvent from '@/utils/gaEvent';
import { useRelationReportContext } from '../../context';
import parse from 'html-react-parser';
interface IAddFriendsPopup {
  onClose: () => void;
}

const AddFriendsPopup = ({ onClose }: IAddFriendsPopup) => {
  const params = useParams();
  const { data: relationReportData } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { isAddFriendsPopupOpen } = useRelationReportContext();

  const { data, mutate: mutatePlayData } = useGetPlayData({
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
    gaEvent.touchRelationAddNewResultButton({
      menuName: data.skill?.name,
      menuSeq: data.skill?.seq,
    });
    webview.goChatRoomPage({
      skillSeq: data.skill?.seq,
      chatbotSeq: data.skill?.chatbot?.seq,
    });
    onClose();
  };

  const handlePlayDataItemClick = async (targetData: PlayData) => {
    if (!targetData.seq) {
      console.error('플레이데이터 정보가 유효하지 않습니다.');
      return;
    }

    await trigger({
      playDataSeqs: [targetData.seq],
    });

    mutatePlayData({
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

    onClose();
  };

  if (!isAddFriendsPopupOpen) {
    return null;
  }

  return (
    <>
      <CommonPopup
        title={t('relationshipmap_add_popup_title')}
        hasPadding={false}
        onClose={onClose}
      >
        <div className="relative flex flex-col ">
          <div className="bg-gray-100 px-5 flex items-start py-3">
            <Image
              className="mr-2 mt-[1.5px]"
              src="/images/question_icon.svg"
              alt="question Icon"
              width={16}
              height={16}
            />
            <div className="inline-flex">
              <span className=" text-xs text-gray-600 mr-1 leading-[20px]">
                {parse(
                  t('relationshipmap_add_popup_description_notice', {
                    value: data.skill?.name,
                  }),
                )}
              </span>
            </div>
          </div>

          <div className="px-5">
            {data.playDatas && data.playDatas.length > 0 ? (
              <div className="flex flex-col h-[310px] w-full overflow-scroll scrollbar-hide">
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
                        <div className="w-[74px] rounded-[20px] bg-gray-400 h-10 flex items-center justify-center text-gray-200 text-[14px] font-bold shrink-0">
                          {t('relationshipmap_add_popup_button_added')}
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold shrink-0"
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
              <div className="flex flex-col justify-start items-center h-[390px] w-full pt-16 ">
                <Image
                  src="/images/panming_sad.png"
                  width={150}
                  height={150}
                  className=" mt-5"
                  alt="panming_sad Image"
                />
                <p className="mt-8 text-gray-500">
                  {t('relationshipmap_add_popup_description_empty')}
                </p>
              </div>
            )}
          </div>
          <div className="w-full mb-3  flex-col justify-center items-center pt-3 border-t border-solid border-gray-200">
            <div className="text-center text-gray-600 text-xs whitespace-pre-wrap">
              {t('relationshipmap_add_popup_description_button')}
            </div>
          </div>
          <div className="px-5">
            <div
              className="flex items-center justify-center w-full h-12 font-bold text-white bg-gray-900 cursor-pointer rounded-3xl "
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
        </div>
      </CommonPopup>
    </>
  );
};

export default AddFriendsPopup;
