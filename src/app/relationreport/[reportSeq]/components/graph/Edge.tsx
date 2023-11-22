import React from 'react';
import {
  EdgeProps,
  BaseEdge,
  getStraightPath,
  EdgeLabelRenderer,
} from 'reactflow';
import { RelationReportModalContext } from '../../page';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../../../public/images/generate-loading.json';
import { t } from '@/utils';

const Edge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) => {
  const { isAllLoading, isOnlyEdge } = React.useContext(
    RelationReportModalContext,
  );
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
        {isAllLoading && !data.text ? (
          <>
            {isOnlyEdge ? (
              <>
                <div
                  style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    width: '141px',
                    height: '77px',
                    borderRadius: '16px',
                    border: '1px solid #DDDEE1',
                    background: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    paddingTop: '12px',
                  }}
                  className="nodrag nopan"
                >
                  <p className="text-gray-900 text-[14px] font-bold">
                    🤔 {t('relationshipmap_screen_description_loading')}
                  </p>
                  <div className="w-[38px]">
                    <Lottie loop animationData={lottieJson} play />
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                  width: '60px',
                  height: '38px',
                  borderRadius: '16px',
                  border: '1px solid #DDDEE1',
                  background: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="nodrag nopan"
              >
                <div className="w-[38px]">
                  <Lottie loop animationData={lottieJson} play />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default Edge;
