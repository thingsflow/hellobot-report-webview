import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// 외부 파일에서 불러오면 적용되지 않는 이슈가 있음
export const RELATION_REPORT_NODE_COLORS = [
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
            RELATION_REPORT_NODE_COLORS[data.index]
          } flex items-center justify-center xs:min-w-[70px] xs:h-[70px] min-w-[60px] h-[60px] px-2 rounded-full text-white text-lg font-bold`}
        >
          {data.userName}
        </div>
        <div className="flex absolute xs:w-[70px] xs:top-[70px] w-[60px] top-[60px] absolute-center justify-center">
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
