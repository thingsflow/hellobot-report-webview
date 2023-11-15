import { t } from '@/utils/translate';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const RelationReportFooter = () => {
  const router = useRouter();

  return (
    <div className="px-6 py-8">
      <p className="text-gray-700 text-center">
        🤔 {t('relationshipmap_screen_description_create')}
      </p>
      <div
        className="cursor-pointer w-full h-12 bg-[#FFE967] flex items-center justify-center font-bold rounded-[26px] mt-4"
        onClick={() => router.push('/relationreport/create')}
      >
        {t('relationshipmap_create_screen_button_create')}
      </div>
    </div>
  );
};

export default RelationReportFooter;
