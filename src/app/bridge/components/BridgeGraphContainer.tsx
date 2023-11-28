'use client';
import BridgeGraph from './graph/BridgeGraph';
import BridgeReportTitle from './BridgeReportTitle';
import BridgeReportHeader from './BridgeReportHeader';
import BridgeReportSkillBanner from './BridgeReportSkillBanner';
import useGetBridgeData from '@/apis/useGetBridgeData';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';
import SkillBanner from '@/components/SkillBanner';
import webview from '@/utils/webview';

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
      <SkillBanner
        name={data?.skill?.name}
        image={data?.skill?.newSkillBannerImageUrl}
        evalAvgScore={data?.skill?.evalAvgScore}
        badgeTitle={data?.skill?.badge?.title}
        loading={loading}
        onClick={() => {
          webview.goSkillDetailPage({ skillSeq: data?.skill?.seq });
        }}
      />
      {loading && <Loading />}
    </div>
  );
};

export default BridgeGraphContainer;
