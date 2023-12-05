import React from 'react';
import ReactFlow, {
  Edge,
  EdgeTypes,
  Node,
  useEdgesState,
  useNodesState,
  SelectionMode,
  ReactFlowRefType,
} from 'reactflow';

import StartNode from './StartNode';
import AddNode from './AddNode';
import DottedEdge from './DottedEdge';

const nodeTypes = {
  startNode: StartNode,
  addNode: AddNode,
};
const edgeTypes: EdgeTypes = {
  dottedEdge: DottedEdge,
};

const generaateNodes = () => {
  if (typeof window === 'undefined') return [];

  const PADDING_X = 114; // 그래프 양 옆 패딩의 합
  const PADDING_BOTTOM = 140; // 그래프 하단 패딩 높이
  const NODE_HEIGHT = 90; // 노드의 높이
  const width = window.innerWidth >= 600 ? 600 : window.innerWidth;
  const x = width - PADDING_X;
  const y = window.innerHeight - PADDING_BOTTOM - NODE_HEIGHT;

  return [
    {
      id: 'start_node',
      position: {
        x: 57,
        y: 278,
      },
      type: 'startNode',
      data: {},
      draggable: false,
    },
    {
      id: 'add_node',
      position: {
        x,
        y,
      },
      type: 'addNode',
      data: {},
      draggable: false,
    },
  ];
};

const initialNodes: Node[] = generaateNodes();

const initialEdges: Edge[] = [
  {
    id: 'start_add',
    source: 'start_node',
    target: 'add_node',
    type: 'dottedEdge',
  },
];

const BridgeGraph = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowRef = React.useRef<ReactFlowRefType | null>(null);

  return (
    <>
      <ReactFlow
        ref={reactFlowRef}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        preventScrolling={false}
        zoomOnPinch={false} // pinch(?)액션으로 줌인, 줌아웃 가능 여부
        selectionOnDrag={false} // 드래그 이벤트로 그래프 이동 가능 여부
        zoomOnScroll={false}
        panOnScroll={false} // 그래프 위에서 스크롤 작동하게하기
        panOnDrag={false}
        proOptions={{ hideAttribution: true }} // reactflow 프로 사용자만 감출 수 있는..
        selectionMode={SelectionMode.Partial}
        draggable={false}
        nodesDraggable={false}
        selectNodesOnDrag={false}
      ></ReactFlow>
    </>
  );
};

export default BridgeGraph;
