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
  'bg-[#818CF8]',
  'bg-[#38BDF8]',
  'bg-[#FF5D7A]',
  'bg-[#F59E0B]',
  'bg-[#3B82F6]',
  'bg-[#7C42FF]',
  'bg-[#0DA4C9]',
  'bg-[#FF90CA]',
  'bg-[#0EA5E9]',
  'bg-[#BE7AFE]',
  'bg-[#E38A38]',
  'bg-[#10B981]',
  'bg-[#5B5FFF]',
  'bg-[#DD3588]',
  'bg-[#06C8D4]',
  'bg-[#0E7490]',
  'bg-[#EF4444]',
  'bg-[#7AB6FF]',
  'bg-[#3D41CD]',
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
        <div className="flex absolute w-[70px] top-[70px] absolute-center justify-center">
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
