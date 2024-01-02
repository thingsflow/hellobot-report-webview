import useGetRelationReport from '@/apis/useGetRelationReport';
import { t } from '@/utils/translate';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import * as gaEvent from '@/utils/gaEvent';
import useGetPlayData from '@/apis/useGetPlayData';
import webview from '@/utils/webview';

const RelationReportFooter = () => {
  const router = useRouter();
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });
  const { data: userPlayData } = useGetPlayData({
    fixedMenuSeq: String(data?.skill?.seq),
    reportSeq: params.reportSeq as string,
    options: {
      revalidateOnFocus: true,
    },
  });

  const createNewMoimButtonClick = () => {
    gaEvent.touchRelationCreateNew({
      menuName: data?.skill?.name,
      menuSeq: data?.skillSeq,
    });

    if (!userPlayData.playDatas?.length) {
      webview.goSkillDetailPage({
        skillSeq: data?.skill?.seq,
      });
      return;
    }

    router.push(`/relationreport/create/${data?.skillSeq}`);
  };

  return (
    <div className="px-6 pt-8 pb-[60px]">
      <p className="text-center text-gray-700">
        🤔 {t('relationshipmap_screen_description_create')}
      </p>
      <div
        className="cursor-pointer w-full h-12 bg-[#FFE967] flex items-center justify-center font-bold rounded-[26px] mt-4"
        onClick={createNewMoimButtonClick}
      >
        {t('relationshipmap_create_screen_button_create')}
      </div>
    </div>
  );
};

export default RelationReportFooter;
