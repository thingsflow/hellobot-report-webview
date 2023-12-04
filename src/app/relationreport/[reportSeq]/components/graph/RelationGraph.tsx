import React from 'react';
import ReactFlow, {
  EdgeTypes,
  useEdgesState,
  useNodesState,
  SelectionMode,
  ReactFlowRefType,
} from 'reactflow';

import CommonEdge from './Edge';
import CommonNode from './Node';
import DefaultNode from './DefaultNode';

import { generateEdges, generateNodes } from '@/utils/relationReportGraph';
import CustomControls from './Controls';
import DefaultEdge from './DefaultEdge';
import useGetRelationReport from '@/apis/useGetRelationReport';
import { useParams } from 'next/navigation';
import { RelationReportModalContext } from '../../page';
import { toast } from 'react-toastify';
import { t } from '@/utils/translate';

const nodeTypes = {
  commonNode: CommonNode,
  defaultNode: DefaultNode,
};
const edgeTypes: EdgeTypes = {
  common: CommonEdge,
  default: DefaultEdge,
};

const RelationGraph = () => {
  const params = useParams();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdge, onEdgesChange] = useEdgesState([]);
  const reactFlowRef = React.useRef<ReactFlowRefType | null>(null);
  const { setIsAllLoading, setIsOnlyEdge } = React.useContext(
    RelationReportModalContext,
  );
  const toastRef = React.useRef<any>(null);

  const { data } = useGetRelationReport({
    reportSeq: params.reportSeq as string,
  });

  React.useEffect(() => {
    const DEFAULT_NODE_COUNT = 1;
    if (!data) return;

    !data.edges?.length && setIsOnlyEdge(true);

    const nodes = generateNodes(data?.playDatas);
    const edges = generateEdges(data, nodes);

    setNodes(nodes);
    setEdge(edges);
    if (!data.edges) return;
    if (
      data.edges?.length >=
      edges.length - nodes.length + DEFAULT_NODE_COUNT
    ) {
      setIsAllLoading(false);
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
        toastRef.current = null;
      }
    } else {
      setIsAllLoading(true);

      if (!toastRef.current) {
        const toastId = toast(t('relationshipmap_popup_toast__update'), {
          isLoading: true,
        });
        toastRef.current = toastId;
      }
    }
  }, [data]);

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
        fitView={data?.playDatas?.length === 1 ? false : true} // 초기 렌더링 시 그래프 사이즈를 화면 사이즈에 맞추기(1명이면 false)
        fitViewOptions={{
          padding: 0.25,
        }}
        preventScrolling={true}
        zoomOnPinch={true} // pinch 액션으로 줌인, 줌아웃 가능 여부
        selectionOnDrag={true} // 드래그 이벤트로 그래프 이동 가능 여부
        zoomOnScroll={true}
        panOnScroll={false} // 그래프 위에서 스크롤 작동하게하기
        panOnDrag={true}
        proOptions={{ hideAttribution: true }} // reactflow 프로 사용자만 감출 수 있는..
        selectionMode={SelectionMode.Partial}
        maxZoom={2}
        minZoom={0.1}
      >
        <CustomControls />
      </ReactFlow>
    </>
  );
};

export default RelationGraph;
