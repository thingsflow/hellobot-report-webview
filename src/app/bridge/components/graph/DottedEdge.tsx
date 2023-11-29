import { FC } from 'react';
import {
  EdgeProps,
  BaseEdge,
  getStraightPath,
  EdgeLabelRenderer,
} from 'reactflow';

const DottedEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
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
          strokeWidth: '1px',
          stroke: 'rgba(0, 0, 0, 0.20)',
          strokeDasharray: 2,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 14,
            fontWeight: 400,
            borderRadius: '16px',
            border: '1px solid #DDDEE1',
            background: '#FAFAFA',
          }}
          className="nodrag nopan"
        >
          {'🤔 '}&nbsp;{'????'}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default DottedEdge;
