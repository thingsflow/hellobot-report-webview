import Image from 'next/image';
import * as React from 'react';
import {
  Controls,
  ControlButton,
  useReactFlow,
  useViewport,
  useNodes,
} from 'reactflow';

const CustomControls = () => {
  const [currentIcon, setCurrentIcon] = React.useState<'fitView' | 'zoomIn'>(
    'zoomIn',
  );
  const { fitView, setCenter } = useReactFlow();
  const { x, y, zoom } = useViewport();
  const nodes = useNodes();
  const [currentNodeCount, setCurrentNodeCount] = React.useState(0);

  React.useEffect(() => {
    // nodes가 2개에서 3개로 늘어나는 시점에 그래프의 ceneter 위치가 변경됨. 이때에만 fitView 다시 호출해주기
    setCurrentNodeCount((prevCount) => {
      if (prevCount === 2 && nodes.length === 3) {
        fitView({
          duration: 500,
        });
      }
      return nodes.length;
    });
  }, [nodes, currentNodeCount]);

  const onFitViewHandler = () => {
    setCurrentIcon('zoomIn');
    fitView({
      duration: 500,
    });
  };

  const onZoomInHandler = () => {
    setCurrentIcon('fitView');
    setCenter(x, y, { zoom: zoom + 0.5, duration: 500 });
  };

  return (
    <Controls
      position={'bottom-right'}
      showZoom={false}
      showInteractive={false}
      showFitView={false}
    >
      {currentIcon === 'fitView' ? (
        <ControlButton
          className="w-6 h-6 react-flow__controls-fitview"
          onClick={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
        >
          <Image
            src="/images/fitview.svg"
            alt="FitView Icon"
            width={24}
            height={24}
          />
        </ControlButton>
      ) : (
        <ControlButton
          className="w-6 h-6 react-flow__controls-zoomin"
          onClick={onZoomInHandler}
          title="fit view"
          aria-label="fit view"
        >
          <Image
            className="flex-shrink-0"
            src="/images/zoom.svg"
            alt="ZoomIn Icon"
            width={24}
            height={24}
          />
        </ControlButton>
      )}
    </Controls>
  );
};

export default CustomControls;
