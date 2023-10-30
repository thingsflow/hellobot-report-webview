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

const colorVariants = [
  'bg-[#20DB93]',
  'bg-[#8F58D5]',
  'bg-[#FBAF3E]',
  'bg-[#09F]',
];

const CommonNode: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={targetHandleStyle}
        isConnectableStart={false}
      />
      <div className="relative">
        <div
          className={`${
            colorVariants[data.index]
          }  flex items-center justify-center min-w-[70px] h-[70px] px-2 rounded-full text-white text-lg font-bold`}
        >
          {data.userName}
        </div>
        <div className="flex absolute w-[70px] top-[70px] absolute-center">
          <div className="text-gray-600 text-[13px] pt-[1px] line-clamp-2">
            {data.resultText}
          </div>
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

export default memo(CommonNode);
