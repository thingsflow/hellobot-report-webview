import Image from 'next/image';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { RelationReportModalContext } from '../../page';

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
  const { setIsAddFriendsPopupOpen } = React.useContext(
    RelationReportModalContext,
  );

  const handleNodeClick = () => {
    setIsAddFriendsPopupOpen(true);
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
        <div className="flex items-center justify-center w-[70px] h-[70px] bg-yellow-400 rounded-full">
          <Image
            className="flex-shrink-0"
            src="/images/icon-plus-40.svg"
            alt="Plus Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="flex w-16 absolute bottom-[-23px] absolute-center">
          <div className="inline-block text-gray-900 font-bold text-[13px] pt-[1px]">
            추가하기
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
