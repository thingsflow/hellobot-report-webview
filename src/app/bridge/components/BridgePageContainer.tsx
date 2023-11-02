import { RelationReportHeader } from '@/app/relationreport/components';
import BridgeGraphContainer from './BridgeGraphContainer';
import Divider from '@/components/Divider';
import BridgeGraphPreview from './BridgeGraphPreview';
import StartButton from './StartButton';

const BridgePageContainer = () => {
  return (
    <div className="bg-gray-50 relative ">
      <BridgeGraphContainer />
      <Divider />
      <div className="w-full h-[850px] bg-yellow-200"></div>
      <BridgeGraphPreview />
      <StartButton />
    </div>
  );
};

export default BridgePageContainer;
