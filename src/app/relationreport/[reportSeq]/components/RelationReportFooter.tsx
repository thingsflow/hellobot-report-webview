import useGetRelationReport from '@/apis/useGetRelationReport';
import { t } from '@/utils/translate';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';

const RelationReportFooter = () => {
  const router = useRouter();
  const params = useParams();
  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  return (
    <div className="px-6 pt-8 pb-[60px]">
      <p className="text-center text-gray-700">
        🤔 {t('relationshipmap_screen_description_create')}
      </p>
      <div
        className="cursor-pointer w-full h-12 bg-[#FFE967] flex items-center justify-center font-bold rounded-[26px] mt-4"
        onClick={() => router.push('/relationreport/create/' + data?.skillSeq)}
      >
        {t('relationshipmap_create_screen_button_create')}
      </div>
    </div>
  );
};

export default RelationReportFooter;
