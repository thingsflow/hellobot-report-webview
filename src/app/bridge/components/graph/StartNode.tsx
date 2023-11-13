import webview from '@/utils/webview';
import Image from 'next/image';
import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

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

const StartNode: FC<NodeProps> = () => {
  const handleNodeClick = () => {
    webview.goChatRoomPage({ chatRoomId: 52 });
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={sourceHandleStyle}
        isConnectableStart={false}
      />
      <div
        className="relative flex flex-col justify-center cursor-pointer"
        onClick={handleNodeClick}
      >
        <div className="flex items-center justify-center w-[80px] h-[80px] bg-yellow-400 rounded-full">
          <Image
            className="flex-shrink-0"
            src="/images/icon-plus-40.svg"
            alt="Plus Icon"
            width={24}
            height={24}
          />
        </div>
        <div className="flex w-full absolute bottom-[-23px] items-center justify-center text-gray-900 font-bold text-[13px] pt-[1px] ">
          <div className="">시작하기</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={targetHandleStyle}
        isConnectableStart={false}
      />
    </>
  );
};

export default memo(StartNode);