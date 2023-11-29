import BridgeGraphContainer from './BridgeGraphContainer';
import Button from '@/components/Button';
import webview from '@/utils/webview';
import Image from 'next/image';
import useGetBridgeData from '@/apis/useGetBridgeData';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';
import { t } from '@/utils/translate';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import * as gaEvent from '@/utils/gaEvent';

const BridgePageContainer = () => {
  const params = useParams();
  const { data, loading } = useGetBridgeData({
    bridgeSeq: params.bridgeSeq as string,
  });

  const handleStartButtonClick = () => {
    webview.goSkillDetailPage({
      skillSeq: data?.skill?.seq,
    });
  };

  React.useEffect(() => {
    if (data?.relationType) {
      gaEvent.viewBridgeRelationshipMap({
        type: data.relationType,
        menuSeq: data.skillSeq,
        menuName: data.skill?.name,
      });
    }
  }, [data]);

  return (
    <div className="relative bg-white ">
      <BridgeGraphContainer />
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
      {/* IOS에서 safe area로 인해 빈 공간 생김. 흰색 배경으로 채우기 */}
      <div className="fixed -bottom-[50px] w-full h-[130px] bg-white overflow-hidden">
        <Button
          title={t('bridge_relationshipmap_screen_button_start')}
          onClick={handleStartButtonClick}
        />
      </div>
      {loading && <Loading />}
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        icon={false}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
        closeButton={false}
        className="toast-black"
        limit={1}
        autoClose={3000}
        enableMultiContainer={false}
      />
    </div>
  );
};

export default BridgePageContainer;
