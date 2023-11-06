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

import {
  NodeData,
  generateEdgeData,
  generateNodeData,
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

const initialNodes: Node<NodeData>[] = generateNodeData([
  '1김은빈',
  '2현아',
  '3네글자야',
  '4네글자야',
  '5현아',
  '6현아',
  '7현아',
  '8현아',
  '9네글자야',
  '10네글자야',
  '11네글자야',
  '12네글자야',
  '13네글자야',
  '14네글자야',
  '15네글자야',
  '16네글자야',
  '17네글자야',
  '18네글자야',
  '19네글자야',
  '20네글자야',
]);

const initialEdges: Edge[] = generateEdgeData(initialNodes);

const RelationGraph = () => {
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
        fitView={true} // 초기 렌더링 시 그래프 사이즈를 화면 사이즈에 맞추기 2명이면 false
        preventScrolling={false}
        zoomOnPinch={true} // pinch(?)액션으로 줌인, 줌아웃 가능 여부
        selectionOnDrag={true} // 드래그 이벤트로 그래프 이동 가능 여부
        zoomOnScroll={true}
        panOnScroll={true} // 그래프 위에서 스크롤 작동하게하기
        panOnDrag={true}
        proOptions={{ hideAttribution: true }} // reactflow 프로 사용자만 감출 수 있는..
        selectionMode={SelectionMode.Partial}
        maxZoom={2}
        minZoom={0.1}
        // onNodeDrag={(event, node) => {
        //   console.log('node drag', event.clientX, event.clientX);
        // }}
        // onMouseMove={(e) => {
        //   console.log('onMouseMove', e.clientX, e.clientY);
        // }}
      >
        <CustomControls />
      </ReactFlow>
    </>
  );
};

export default RelationGraph;
