import * as React from 'react';
import useGetBridgeData from '@/apis/useGetBridgeData';
import { RelationType } from '@/types/relationreport';
import { useParams } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';

const RELATION_REPORT_TYPE_TEXT: { [key in RelationType]: string } = {
  Friend: '친구 관계도',
  Companion: '직장동료 관계도',
  Family: '가족 관계도',
  Partner: '연인 관계도',
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
          <h1 className="text-[22px] font-bold mr-1">
            {RELATION_REPORT_TYPE_TEXT[data.relationType]}
          </h1>
        )}
        <p className="text-gray-600 text-[13px]">
          아래 스킬을 보고 관계도를 완성해 보세요
        </p>
      </div>
    </div>
  );
};

export default BridgeReportTitle;
