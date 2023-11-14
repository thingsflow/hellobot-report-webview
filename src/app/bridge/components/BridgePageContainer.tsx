import BridgeGraphContainer from './BridgeGraphContainer';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import webview from '@/utils/webview';
import Image from 'next/image';
import useGetBridgeData from '@/apis/useGetBridgeData';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';

const BridgePageContainer = () => {
  const params = useParams();
  const { data, loading } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  const handleStartButtonClick = () => {
    webview.goSkillDetailPage({
      chatRoomId: data?.skill?.seq,
    });
  };

  console.log(!!data?.previewImageUrl, data);
  return (
    <div className="relative bg-gray-50 ">
      <BridgeGraphContainer />
      <Divider />
      {data?.previewImageUrl && (
        <div className="relative w-full h-auto">
          <Image
            src={data.previewImageUrl || ''}
            alt="Preview Image"
            width={200}
            height={500}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}
      {data?.howToImageUrl && (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src={data.howToImageUrl || ''}
            alt="HowTo Image"
            width={200}
            height={500}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}
      <Button title="시작하기" onClick={handleStartButtonClick} />
      {loading && <Loading />}
    </div>
  );
};

export default BridgePageContainer;
