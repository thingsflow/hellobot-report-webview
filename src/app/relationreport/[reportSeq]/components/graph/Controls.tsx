import Image from 'next/image';
import * as React from 'react';
import {
  Controls,
  ControlButton,
  useReactFlow,
  useViewport,
  useNodes,
  Node,
} from 'reactflow';
import { useRelationReportContext } from '../../context';

const CustomControls = ({
  setNodes,
}: {
  setNodes: React.Dispatch<
    React.SetStateAction<Node<any, string | undefined>[]>
  >;
}) => {
  const { fitView, setCenter } = useReactFlow();
  const { zoom } = useViewport();
  const nodes = useNodes();

  const { initialNodes } = useRelationReportContext();
  const [currentNodeCount, setCurrentNodeCount] = React.useState(0);
  const [currentIcon, setCurrentIcon] = React.useState<'fitView' | 'zoomIn'>(
    'zoomIn',
  );

  React.useEffect(() => {
    // nodes가 2개에서 3개로 늘어나는 시점에 그래프의 ceneter 위치가 변경됨. 이때에만 fitView 다시 호출해주기
    setCurrentNodeCount((prevCount) => {
      if (prevCount === 2 && nodes.length === 3) {
        fitView({
          duration: 500,
          padding: 0.25,
        });
      }
      return nodes.length;
    });
  }, [nodes, currentNodeCount]);

  const onFitViewHandler = () => {
    setCurrentIcon('zoomIn');

    setNodes(initialNodes);
    setTimeout(() => {
      fitView({
        duration: 500,
        padding: 0.25,
      });
    }, 0);
  };

  const onZoomInHandler = () => {
    setCurrentIcon('fitView');
    setCenter(nodes[0].position.x, nodes[0].position.y, {
      zoom: zoom + 0.5,
      duration: 500,
    });
  };

  return (
    <Controls
      className="w-10 h-10"
      position={'bottom-right'}
      showZoom={false}
      showInteractive={false}
      showFitView={false}
    >
      {currentIcon === 'fitView' ? (
        <ControlButton
          className="w-10 h-10 react-flow__controls-fitview"
          onClick={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
        >
          <Image
            src="/images/zoom-fullscreen.svg"
            alt="FitView Icon"
            width={40}
            height={40}
          />
        </ControlButton>
      ) : (
        <ControlButton
          className="w-10 h-10 react-flow__controls-zoomin shrink-0 "
          onClick={onZoomInHandler}
          title="fit view"
          aria-label="fit view"
        >
          <Image
            className="w-[40px] h-[40px] shrink-0 "
            src="/images/zoom.svg"
            alt="ZoomIn Icon"
            width={40}
            height={40}
          />
        </ControlButton>
      )}
    </Controls>
  );
};

export default CustomControls;
