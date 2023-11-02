import { FC } from 'react';
import { EdgeProps, BaseEdge, getStraightPath } from 'reactflow';

const DottedEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const [path] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        strokeWidth: '1px',
        stroke: 'rgba(0, 0, 0, 0.20)',
        strokeDasharray: 2,
      }}
    />
  );
};

export default DottedEdge;
