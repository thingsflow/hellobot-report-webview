'use client';
import useGetPlayData from '@/apis/useGetPlayData';
import { t } from '@/utils/translate';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import Skeleton from 'react-loading-skeleton';

const CreateRelationReportTitle = () => {
  const params = useParams();
  const { data } = useGetPlayData({
    fixedMenuSeq: params.fixedMenuSeq as string,
  });

  return (
    <div className="flex flex-col w-full px-4 py-8">
      <h2 className="text-[22px] font-bold text-gray-900 whitespace-pre-wrap">
        {t('relationshipmap_create_screen_description_main')}
      </h2>
      <div className="flex mt-4">
        {data?.skill ? (
          <>
            <div className="w-[72px] h-[56px] flex-shrink-0">
              <Image
                className="flex-shrink-0 object-contain rounded-l-lg h-[56px]"
                src={data?.skill?.newSkillBannerImageUrl || ''}
                width={72}
                height={56}
                alt="Skill Image"
              />
            </div>
            <div className="flex items-center w-full pl-4 font-medium bg-gray-100 rounded-r-lg h-[56px] ">
              <h2 className="line-clamp-2">{data?.skill?.name}</h2>
            </div>
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
