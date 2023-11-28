import * as React from 'react';
import useGetBridgeData from '@/apis/useGetBridgeData';
import { RelationType } from '@/types/relationreport';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { t } from '@/utils/translate';

const RELATION_REPORT_TYPE_TEXT: { [key in RelationType]: string } = {
  Friend: t('bridge_relationshipmap_screen_title_friends'),
  Companion: t('bridge_relationshipmap_screen_title_colleague'),
  Family: t('bridge_relationshipmap_screen_title_family'),
  Partner: t('bridge_relationshipmap_screen_title_lover'),
};

const BridgeReportTitle = () => {
  const params = useParams();
  const { data, loading } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  return (
    <div className="px-5 pt-6">
      <div className="flex flex-col mb-3">
        {loading || !data?.relationType ? (
          <Skeleton
            className="py-[13px]"
            width={'40%'}
            height={'22px'}
            duration={0.9}
          />
        ) : (
          <h1 className="text-[22px] font-bold mr-1">{data.title}</h1>
        )}
        <p className="text-gray-600 text-[13px]">
          {data?.subTitle || t('bridge_relationshipmap_screen_description')}
        </p>
      </div>
    </div>
  );
};

export default BridgeReportTitle;
