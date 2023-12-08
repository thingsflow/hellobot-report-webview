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

interface INoResultsToAddPopup {
  onClose: () => void;
}

const NoResultsToAddPopup = ({ onClose }: INoResultsToAddPopup) => {
  const params = useParams();
  const { data: relationReportData } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { isNoResultsToAddPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  if (!isNoResultsToAddPopupOpen) {
    return null;
  }

  return (
    <div className="mx-6">
      <CommonPopup
        title={t('relationshipmap_popup_noresult_title')}
        width={288}
      >
        <div className="relative flex flex-col gap-4 items-center">
          <Image
            src="/images/panming_sad.svg"
            width={138}
            height={138}
            className=" mt-5"
            alt="panming_sad Image"
          />
          <div className="text-center text-gray-600 my-4">
            {t('relationshipmap_popup_noresult_description')} <br />
            <div className=" text-xs mt-3">
              {t('relationshipmap_popup_noresult_description_sub')}
            </div>
          </div>
          <div
            className="flex items-center justify-center w-[100px] h-12 font-bold text-gray-900 bg-yellow-400 cursor-pointer rounded-3xl"
            onClick={() => {
              webview.goSkillDetailPage({
                skillSeq: relationReportData?.skillSeq,
              });
            }}
          >
            {t('common_label_ok')}
          </div>
        </div>
        <div
          className="cursor-pointer absolute text-white text-[14px] -bottom-8 right-1/2 translate-x-1/2"
          onClick={onClose}
        >
          {t('register_screen_button_skip')}
        </div>
      </CommonPopup>
    </div>
  );
};

export default NoResultsToAddPopup;
