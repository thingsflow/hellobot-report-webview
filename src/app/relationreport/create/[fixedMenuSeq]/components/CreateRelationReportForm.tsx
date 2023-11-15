'use client';
import Button from '@/components/Button';
import Toggle from '@/components/Toggle';
import Image from 'next/image';
import React from 'react';
import SelectStartMemberPopup from './SelectStartMemberPopup';
import useGetPlayData from '@/apis/useGetPlayData';
import Skeleton from 'react-loading-skeleton';
import {
  CreateRealtionReportInputType,
  CreateRealtionReportType,
  PlayData,
} from '@/types/relationreport';
import useCreateRelationReport from '@/apis/useCreateRelationReport';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { t } from '@/utils/translate';

const CreateRelationReportForm = () => {
  const params = useParams();
  const { data, mutate } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
    options: {
      revalidateIfStale: false,
    },
  });
  const { trigger, isMutating } = useCreateRelationReport();
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isSelectStartMemberPopupOpen, setIsSelectStartMemberPopupOpen] =
    React.useState(false);
  const handleLoadMoreMemberButtonClick = () => {
    setIsSelectStartMemberPopupOpen(true);
  };

  const handleSelectButtonClick = (targetData: PlayData) => {
    if (data?.playDatas?.length === 1) return;

    mutate(
      {
        data: {
          skill: data.skill,
          playDatas:
            data?.playDatas?.map((data) => {
              return {
                ...data,
                isAdded: targetData.seq === data.seq ? !data.isAdded : false,
              };
            }) || [],
        },
      },
      { revalidate: false },
    );
  };

  const handleCreateNewMoimButtonClick = async () => {
    const selectedUser = data?.playDatas?.find((item) => item.isAdded);
    if (!selectedUser) {
      console.error('시작 멤버를 선택해주세요');
      return;
    }

    const requestData: CreateRealtionReportInputType = {
      title: title,
      shareScope: isPrivate ? 'PRIVATE' : 'PUBLIC',
      skillSeq: Number(params.fixedMenuSeq as string),
      playDataSeq: selectedUser.seq!,
    };

    const response: CreateRealtionReportType = await trigger(requestData);
    response?.data.link && router.push(response?.data.link);
  };

  return (
    <>
      <div className="pt-8 px-4 pb-[96px]">
        <h5 className="font-bold text-gray-900">시작 멤버 선택</h5>
        <p className="text-xs text-gray-500 whitespace-pre-wrap">
          {t('relationshipmap_create_screen_description_start_member')}
        </p>
        <div className="flex flex-col w-full">
          {data?.playDatas ? (
            <>
              {data.playDatas?.slice(0, 3).map((item) => (
                <div
                  className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid"
                  key={item.seq}
                >
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-gray-600 text-[13px] line-clamp-1">
                      {item.resultName}
                    </div>
                  </div>
                  {item.isAdded ? (
                    <div
                      className="cursor-pointer w-[74px] rounded-[20px] bg-gray-900 h-10 flex items-center justify-center text-white text-[14px] font-bold"
                      onClick={() => handleSelectButtonClick(item)}
                    >
                      {t('relationshipmap_create_screen_button_selected')}
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold"
                      onClick={() => handleSelectButtonClick(item)}
                    >
                      {t('relationshipmap_create_screen_button_select')}
                    </div>
                  )}
                </div>
              ))}
              {data.playDatas && data.playDatas?.length > 3 && (
                <div
                  className="flex items-center justify-center w-full h-10 my-2"
                  onClick={handleLoadMoreMemberButtonClick}
                >
                  <p className="text-[#555759] text-[14px] flex items-center border border-solid px-6 py-[7px] rounded-full border-gray-300">
                    {/* TODO: lokalise 수정 필요함 */}
                    {/* {t('relationshipmap_create_screen_button_more')} */}
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
              )}
            </>
          ) : (
            <>
              <div className="py-3 border-b border-[#f5f5f5] border-solid">
                <Skeleton width={'100%'} height={'40px'} duration={0.9} />
              </div>
              <div className="py-3 border-b border-[#f5f5f5] border-solid">
                <Skeleton width={'100%'} height={'40px'} duration={0.9} />
              </div>
              <div className="py-3 border-b border-[#f5f5f5] border-solid">
                <Skeleton width={'100%'} height={'40px'} duration={0.9} />
              </div>
            </>
          )}
        </div>
        <div className="pt-8">
          <h5 className="mb-4 font-bold text-gray-900">
            {t('relationshipmap_edit_popup_label_group_name')}
          </h5>
          <div className="relative">
            <input
              type="text"
              className="w-full h-12 bg-[#f5f5f5] rounded-lg text=[#242526] px-4 py-3 pr-11"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t(
                'relationshipmap_create_screen_input_group_name_placeholder',
              )}
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
            <h5 className="mb-4 font-bold text-gray-900">
              {t('relationshipmap_edit_popup_label_status')}
            </h5>
            <div className="flex items-center justify-between">
              <div className="flex items-center h-12">
                <Image
                  src="/images/coaching-lock.svg"
                  width={24}
                  height={24}
                  alt="Lock Icon"
                />
                <p className="text=[#242526]">
                  {t('relationshipmap_create_screen_description_status')}
                </p>
              </div>
              <Toggle
                isOn={isPrivate}
                onToggle={() => setIsPrivate((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        title={t('relationshipmap_screen_button_create')}
        onClick={handleCreateNewMoimButtonClick}
      />
      {isSelectStartMemberPopupOpen && (
        <SelectStartMemberPopup
          onClose={() => setIsSelectStartMemberPopupOpen(false)}
          onSelect={() => {}}
        />
      )}
      {isMutating && <Loading />}
    </>
  );
};

export default CreateRelationReportForm;
