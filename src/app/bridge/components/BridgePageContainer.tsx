import BridgeGraphContainer from './BridgeGraphContainer';
import Divider from '@/components/Divider';
import BridgeGraphPreview from './BridgeGraphPreview';
import FixedBottomButton from '@/components/FixedBottomButton';

const BridgePageContainer = () => {
  return (
    <div className="bg-gray-50 relative ">
      <BridgeGraphContainer />
      <Divider />
      <div className="w-full h-[850px] bg-yellow-200"></div>
      <BridgeGraphPreview />
      <FixedBottomButton title="시작하기" />
    </div>
  );
};

export default BridgePageContainer;
