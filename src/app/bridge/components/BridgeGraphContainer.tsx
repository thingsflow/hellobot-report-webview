'use client';
import BridgeGraph from './graph/BridgeGraph';
import BridgeReportTitle from './BridgeReportTitle';
import BridgeReportHeader from './BridgeReportHeader';
import BridgeReportSkillBanner from './BridgeReportSkillBanner';

const BridgeGraphContainer = () => {
  return (
    <div className="w-full h-[calc(100vh)]">
      <div className="absolute top-0 w-full h-[calc(100vh)]">
        <BridgeGraph />
      </div>
      <BridgeReportHeader
        shareTitle={'가족 관계도'}
        shareLink="https://storyplay.com"
      />
      <BridgeReportTitle title={'가족 관계도'} />
      <BridgeReportSkillBanner
        title={'2024년 신년운세 보고서'}
        chatBotName="사주 by 판밍밍"
        stars={'4.8'}
        views={'20만'}
      />
    </div>
  );
};

export default BridgeGraphContainer;
