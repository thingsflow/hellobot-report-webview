'use client';
import BridgeGraph from './graph/BridgeGraph';
import BridgeReportTitle from './BridgeReportTitle';
import BridgeReportHeader from './BridgeReportHeader';
import BridgeReportSkillBanner from './BridgeReportSkillBanner';
import useGetBridgeData from '@/apis/useGetBridgeData';
import Loading from '@/components/Loading';
import { RelationType } from '@/types/relationreport';
import { useParams } from 'next/navigation';

const BridgeGraphContainer = () => {
  const params = useParams();
  const { data, loading } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  return (
    <div className="w-full h-[calc(100vw+278px)]">
      <div className="absolute top-0 w-full h-[calc(100vw+278px)]">
        <BridgeGraph />
      </div>
      <BridgeReportHeader />
      <BridgeReportTitle />
      <BridgeReportSkillBanner />
      {loading && <Loading />}
    </div>
  );
};

export default BridgeGraphContainer;
