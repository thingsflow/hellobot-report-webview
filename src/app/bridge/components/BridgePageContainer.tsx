import BridgeGraphContainer from './BridgeGraphContainer';
import Divider from '@/components/Divider';
import BridgeGraphPreview from './BridgeGraphPreview';
import Button from '@/components/Button';
import webview from '@/utils/webview';

const BridgePageContainer = () => {
  const handleStartButtonClick = () => {
    webview.goChatRoomPage({
      chatRoomId: 52,
    });
  };

  return (
    <div className="relative bg-gray-50 ">
      <BridgeGraphContainer />
      <Divider />
      <div className="w-full h-[850px] bg-yellow-200"></div>
      <BridgeGraphPreview />
      <Button title="시작하기" onClick={handleStartButtonClick} />
    </div>
  );
};

export default BridgePageContainer;
