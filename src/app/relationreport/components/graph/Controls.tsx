import Image from 'next/image';
import * as React from 'react';
import { Controls, ControlButton, useReactFlow, useViewport } from 'reactflow';

const CustomControls = () => {
  const [currentIcon, setCurrentIcon] = React.useState<'fitView' | 'zoomIn'>(
    'zoomIn',
  );
  const { fitView, setCenter } = useReactFlow();
  const { x, y, zoom } = useViewport();

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
