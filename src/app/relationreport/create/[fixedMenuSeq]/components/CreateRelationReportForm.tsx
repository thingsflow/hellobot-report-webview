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
  CreateRelationReportType,
  PlayData,
} from '@/types/relationreport';
import useCreateRelationReport from '@/apis/useCreateRelationReport';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { t } from '@/utils/translate';
import { toast } from 'react-toastify';
import * as gaEvent from '@/utils/gaEvent';

const CreateRelationReportForm = () => {
  const params = useParams();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { data, mutate } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
    options: {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  });
  const { trigger, isMutating } = useCreateRelationReport();
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isSelectStartMemberPopupOpen, setIsSelectStartMemberPopupOpen] =
    React.useState(false);
  const [isEventLogged, setIsEventLogged] = React.useState(false);

  React.useEffect(() => {
    if (data?.skill && !isEventLogged) {
      setIsEventLogged(true);
      gaEvent.viewRelationCreateNew({
        menuSeq: data.skill?.seq,
        menuName: data.skill?.name,
      });
    }
  }, [data, isEventLogged]);

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
      toast(t('relationshipmap_create_screen_alert_no_starting_member'));
      return;
    }

    if (title.length === 0) {
      toast(t('relationshipmap_create_screen_alert_no_group_name'));
      return;
    }

    const requestData: CreateRealtionReportInputType = {
      title: title,
      shareScope: isPrivate ? 'PRIVATE' : 'PUBLIC',
      skillSeq: Number(params.fixedMenuSeq as string),
      playDataSeq: selectedUser.seq!,
    };
    const response: CreateRelationReportType = await trigger(requestData);

    gaEvent.createdRelationNew({
      menuSeq: data.skill?.seq,
      menuName: data.skill?.name,
    });

    response?.data.reportLink && router.push(response?.data.reportLink);
  };

  const handleToggleButton = (isPrivateFrom: boolean) => {
    // isPrivateFrom: 공유 범위 변경 전 값
    if (
      confirm(
        t(
          isPrivateFrom === true
            ? 'relationshipmap_edit_popup_alert_status_public'
            : 'relationshipmap_edit_popup_alert_status_private',
        ),
      )
    ) {
      setIsPrivate((prev) => !prev);
    }
    inputRef?.current?.focus();
  };

  return (
    <>
      <div className="pt-8 px-4 pb-[96px]">
        <h5 className="font-bold text-gray-900">
          {t('select_member_screen_title')}
          <span className="text-[#F23658]">*</span>
        </h5>
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
                    <span
                      className="font-bold pt-[1px]"
                      dangerouslySetInnerHTML={{
                        __html: t('relationshipmap_create_screen_button_more'),
                      }}
                    />
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
            {t('relationshipmap_edit_popup_label_group_name')}{' '}
            <span className="text-[#F23658]">*</span>
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
              {t('relationshipmap_edit_popup_label_status')}{' '}
              <span className="text-[#F23658]">*</span>
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
                onToggle={() => handleToggleButton(isPrivate)}
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
