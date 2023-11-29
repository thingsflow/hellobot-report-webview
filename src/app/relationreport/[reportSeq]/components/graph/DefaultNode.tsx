import Image from 'next/image';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { RelationReportModalContext } from '../../page';
import { t } from '@/utils';
import * as gaEvent from '@/utils/gaEvent';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { useParams } from 'next/navigation';
import useGetPlayData from '@/apis/useGetPlayData';
import webview from '@/utils/webview';

const sourceHandleStyle: CSSProperties = {
  background: 'transparent',
  borderColor: 'transparent',
  right: '50%',
};
const targetHandleStyle: CSSProperties = {
  background: 'transparent',
  borderColor: 'transparent',
  left: '50%',
};

const DefaultNode: FC<NodeProps> = () => {
  const params = useParams();
  const { setIsAddFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );
  const { data: relationReportData } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  const { data } = useGetPlayData({
    fixedMenuSeq: String(relationReportData?.skill?.seq),
    reportSeq: params.reportSeq as string,
    options: {
      revalidateOnFocus: true,
    },
  });

  const handleNodeClick = () => {
    gaEvent.touchRelationAdd();

    if (data.playDatas?.length) {
      setIsAddFriendsPopupOpen(true);
      return;
    }

    webview.goSkillDetailPage({
      skillSeq: relationReportData?.skillSeq,
    });
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={targetHandleStyle}
        isConnectableStart={false}
      />
      <div
        className="relative flex flex-col justify-center cursor-pointer"
        onClick={handleNodeClick}
      >
        <div className="flex items-center justify-center xs:w-[70px] xs:h-[70px] w-[60px] h-[60px] bg-yellow-400 rounded-full">
          <Image
            className="flex-shrink-0"
            src="/images/icon-plus-40.svg"
            alt="Plus Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="flex w-16 absolute bottom-[-23px] absolute-center ml-[7px]">
          <div className="inline-block text-gray-900 font-bold text-[13px] pt-[1px]">
            {t('relationshipmap_add_popup_title')}
          </div>
          <Image
            className="inline-block"
            src="/images/arrow-right.svg"
            alt="Arrow Icon"
            width={16}
            height={16}
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={sourceHandleStyle}
        isConnectableStart={false}
      />
    </>
  );
};

export default memo(DefaultNode);
