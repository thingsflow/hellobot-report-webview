import { FC } from 'react';
import {
  EdgeProps,
  BaseEdge,
  getStraightPath,
  EdgeLabelRenderer,
} from 'reactflow';

const Edge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) => {
  const [path, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          strokeWidth: '4px',
          stroke: 'rgba(126, 129, 133, 0.20)',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            padding: 8,
            width: '136px',
            fontSize: 14,
            fontWeight: 400,
            borderRadius: '16px',
            border: '1px solid #DDDEE1',
            background: '#FFF',
          }}
          className="nodrag nopan"
        >
          {data.text}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default Edge;
