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

import CommonEdge from './Edge';
import CommonNode from './Node';
import DefaultNode from './DefaultNode';
import style from './graph.module.css';
import 'reactflow/dist/style.css';
import {
  NodeData,
  generateEdgeData,
  mockNodes,
} from '@/services/relationReportService';
import CustomControls from './Controls';
import DefaultEdge from './DefaultEdge';

const nodeTypes = {
  commonNode: CommonNode,
  defaultNode: DefaultNode,
};
const edgeTypes: EdgeTypes = {
  common: CommonEdge,
  default: DefaultEdge,
};

const initialNodes: Node<NodeData>[] = [...mockNodes];

const initialEdges: Edge[] = generateEdgeData(initialNodes);

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowRef = React.useRef<ReactFlowRefType | null>(null);

  return (
    <ReactFlow
      ref={reactFlowRef}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView // 초기 렌더링 시 그래프 사이즈를 화면 사이즈에 맞추기
      preventScrolling
      zoomOnPinch // pinch(?)액션으로 줌인, 줌아웃 가능 여부
      selectionOnDrag // 드래그 이벤트로 그래프 이동 가능 여부
      zoomOnScroll={false}
      panOnScroll={false} // 그래프 위에서 스크롤 작동하게하기
      proOptions={{ hideAttribution: true }} // reactflow 프로 사용자만 감출 수 있는..
      selectionMode={SelectionMode.Full}
      // onNodeDrag={(event, node) => {
      //   console.log('node drag', event.clientX, event.clientX);
      // }}
      // onMouseMove={(e) => {
      //   console.log('onMouseMove', e.clientX, e.clientY);
      // }}
    >
      <CustomControls />
    </ReactFlow>
  );
};

export default EdgesFlow;
