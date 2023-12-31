'use client';
import useCreateRelationReport from '@/apis/useCreateRelationReport';
import useGetPlayData from '@/apis/useGetPlayData';
import Loading from '@/components/Loading';
import {
  CreateRealtionReportInputType,
  CreateRelationReportType,
  PlayData,
} from '@/types/relationreport';
import { t } from '@/utils/translate';
import webview from '@/utils/webview';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';

const CreateRelationReportMemberList = () => {
  const router = useRouter();
  const params = useParams();
  const { data, isLoading } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
  });
  const { trigger, isMutating } = useCreateRelationReport();

  const handleUserItemClick = async (playData: PlayData) => {
    const requestData: CreateRealtionReportInputType = {
      skillSeq: Number(params.fixedMenuSeq as string),
      playDataSeq: playData.seq!,
    };

    const response: CreateRelationReportType = await trigger(requestData);

    webview.doReloadRelationReportList();

    response?.data.reportLink && router.push(response?.data.reportLink);
  };

  return (
    <div className="flex flex-col w-full">
      {data.playDatas?.map((playData, index) => {
        return (
          <div
            onClick={() => handleUserItemClick(playData)}
            className="flex justify-between items-center py-3 border-b border-[#f5f5f5] border-solid px-5 "
            key={index}
          >
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{playData.name}</div>
              <div className="text-gray-600 text-[13px] line-clamp-1">
                {playData.resultName}
              </div>
            </div>
            <div className="cursor-pointer w-[74px] rounded-[20px] bg-yellow-400 h-10 flex items-center justify-center text-gray-900 text-[14px] font-bold">
              {t('relationshipmap_create_screen_button_select')}
            </div>
          </div>
        );
      })}
      {(isMutating || isLoading) && <Loading />}
    </div>
  );
};

export default CreateRelationReportMemberList;
