import { FC } from 'react';
import { EdgeProps, BaseEdge, getStraightPath } from 'reactflow';

const DefaultEdge: FC<EdgeProps> = ({
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
        stroke: '#DDDEE1',
        strokeDasharray: 3,
      }}
    />
  );
};

export default DefaultEdge;
