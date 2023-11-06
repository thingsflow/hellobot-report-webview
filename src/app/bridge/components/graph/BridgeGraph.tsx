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
  const PADDING_TOP = 267; // 그래프 상단 패딩 높이
  const width = window.innerWidth >= 600 ? 600 : window.innerWidth;
  const x = width - PADDING_X;
  const y = x + PADDING_TOP;

  return [
    {
      id: 'start_node',
      position: {
        x: 57,
        y: 278,
      },
      type: 'startNode',
      data: {},
    },
    {
      id: 'add_node',
      position: {
        x,
        y,
      },
      type: 'addNode',
      data: {},
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
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
        zoomOnPinch={true} // pinch(?)액션으로 줌인, 줌아웃 가능 여부
        selectionOnDrag={false} // 드래그 이벤트로 그래프 이동 가능 여부
        zoomOnScroll={true}
        panOnScroll={false} // 그래프 위에서 스크롤 작동하게하기
        panOnDrag={false}
        proOptions={{ hideAttribution: true }} // reactflow 프로 사용자만 감출 수 있는..
        selectionMode={SelectionMode.Partial}
      ></ReactFlow>
    </>
  );
};

export default BridgeGraph;
