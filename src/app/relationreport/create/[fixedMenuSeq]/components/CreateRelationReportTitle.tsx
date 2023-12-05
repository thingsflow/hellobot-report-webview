'use client';
import useGetPlayData from '@/apis/useGetPlayData';
import SkillBanner from '@/components/SkillBanner';
import { t } from '@/utils/translate';
import { useParams } from 'next/navigation';
import * as React from 'react';
import Skeleton from 'react-loading-skeleton';

const CreateRelationReportTitle = () => {
  const params = useParams();
  const { data } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
  });

  return (
    <div className="flex flex-col w-full  py-8">
      <h2 className="text-[22px] font-bold text-gray-900 whitespace-pre-wrap leading-7 px-4">
        {t('relationshipmap_create_screen_description_main')}
      </h2>
      <div className="flex mt-4">
        {data?.skill ? (
          <>
            <SkillBanner
              name={data?.skill?.name}
              image={data?.skill?.newSkillBannerImageUrl}
              evalAvgScore={data?.skill?.evalAvgScore}
              badgeTitle={data?.skill?.badge?.title}
            />
          </>
        ) : (
          <div className="w-full">
            <Skeleton width={'100%'} height={'56px'} duration={0.9} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRelationReportTitle;
