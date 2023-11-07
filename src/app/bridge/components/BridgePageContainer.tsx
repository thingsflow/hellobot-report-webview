import BridgeGraphContainer from './BridgeGraphContainer';
import Divider from '@/components/Divider';
import BridgeGraphPreview from './BridgeGraphPreview';
import FixedBottomButton from '@/components/FixedBottomButton';
import webview from '@/utils/webview';

const BridgePageContainer = () => {
  const handleStartButtonClick = () => {
    webview.goChatRoomPage({
      chatRoomId: 52,
    });
  };

  return (
    <div className="bg-gray-50 relative ">
      <BridgeGraphContainer />
      <Divider />
      <div className="w-full h-[850px] bg-yellow-200"></div>
      <BridgeGraphPreview />
      <FixedBottomButton title="시작하기" onClick={handleStartButtonClick} />
    </div>
  );
};

export default BridgePageContainer;
