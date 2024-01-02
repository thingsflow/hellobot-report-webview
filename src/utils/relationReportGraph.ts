import { RelationReport } from '@/types/relationreport';
import { Node } from 'reactflow';

export interface NodeData {
  index: number;
  isDefaultNode: boolean;
  userName?: string;
  resultText?: string;
}

// 노드 개수에 따라 그래프의 반지름이 달라져야함. 노드 개수에 따른 반지름을 반환하는 함수.
const getRadiusOffset = (nodeCount: number) => {
  switch (true) {
    case nodeCount <= 3:
      return 1;
    case nodeCount <= 4:
      return 1.2;
    case nodeCount <= 6:
      return 1.4;
    case nodeCount <= 8:
      return 1.8;
    case nodeCount <= 9:
      return 2;
    case nodeCount <= 10:
      return 2.2;
    case nodeCount <= 12:
      return 2.4;
    case nodeCount <= 14:
      return 2.6;
    case nodeCount <= 16:
      return 3.5;
    case nodeCount <= 20:
      return 4;

    default:
      return 1.5;
  }
};

export const generateNodes = (
  playData?: Array<{
    seq?: number;
    name?: string;
    resultName?: string;
  }>,
): Node<
  {
    index: number;
    userName?: string;
    resultText?: string;
    isDefaultNode: boolean;
    seq?: number;
  },
  string | undefined
>[] => {
  if (typeof window === 'undefined' || !playData) return [];

  const deviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth || 375;
  const deviceHeight = window.innerHeight || 812;
  const isPlayDataOver20 = playData.length >= 20;

  if (playData.length < 2) {
    // 관계도에 한 명만 추가되어있는 경우
    const nodeCount = 2;
    const radiusOffset = getRadiusOffset(playData.length);
    const radius = (deviceWidth / 2) * radiusOffset;

    const centerX = deviceWidth / 2;
    const centerY = deviceHeight / 2;

    const angleIncrement = (2 * Math.PI) / nodeCount;
    const angleRadians = (270 * Math.PI) / 120; // 두 노드를 대각선 모양으로 위치시키기위해 그래프를 120도 회전시킨다.

    // 첫 번째 노드 위치 계산
    const firstAngle = 0 * angleIncrement;

    const firstX = centerX + radius * Math.cos(firstAngle);
    const firstY = centerY + radius * Math.sin(firstAngle);

    const firstRotatedX =
      firstX * Math.cos(angleRadians) - firstY * Math.sin(angleRadians);
    const firstRotatedY =
      firstX * Math.sin(angleRadians) + firstY * Math.cos(angleRadians);

    // 두 번째 노드 위치 계산
    const secondAngle = 1 * angleIncrement;

    const secondX = centerX + radius * Math.cos(secondAngle);
    const secondY = centerY + radius * Math.sin(secondAngle);

    const secondRotatedX =
      secondX * Math.cos(angleRadians) - secondY * Math.sin(angleRadians);
    const secontRotatedY =
      secondX * Math.sin(angleRadians) + secondY * Math.cos(angleRadians);

    return [
      {
        id: 'first_node',
        data: {
          index: 0,
          userName: playData[0].name,
          resultText: playData[0].resultName,
          isDefaultNode: false,
          seq: playData[0]?.seq,
        },
        position: {
          x: firstRotatedX,
          y: firstRotatedY,
        },
        type: 'commonNode',
      },
      {
        id: 'add_node',
        data: { index: 1, isDefaultNode: true },
        position: {
          x: secondRotatedX,
          y: secontRotatedY,
        },
        type: 'defaultNode',
      },
    ];
  }

  const result = [];
  const nodeCount = isPlayDataOver20 ? playData.length : playData.length + 1;
  const radiusOffset = getRadiusOffset(playData.length);
  const radius = (deviceWidth / 2) * radiusOffset;

  const centerX = deviceWidth / 2;
  const centerY = deviceHeight / 2;

  const angleIncrement = (2 * Math.PI) / nodeCount;
  const angleRadians = (270 * Math.PI) / 180; // 그래프 상단 꼭지점 위치를 맞추기 위해 그래프를 270도 회전시킨다.

  for (let i = 0; i < playData.length + 1; i++) {
    const angle = i * angleIncrement;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const rotatedX = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
    const rotatedY = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

    const isLastIndex = i === playData.length;

    if (isPlayDataOver20 && playData.length === i) {
      break;
    }

    result.push({
      id: `node${i}`,
      data: {
        index: i,
        userName: playData[i]?.name,
        resultText: playData[i]?.resultName,
        isDefaultNode: isPlayDataOver20 ? false : isLastIndex ? true : false,
        seq: playData[i]?.seq,
      },
      position: {
        x: rotatedX,
        y: rotatedY,
      },
      type: isPlayDataOver20
        ? 'commonNode'
        : isLastIndex
          ? 'defaultNode'
          : 'commonNode',
    });
  }

  return result;
};

export const generateEdges = (
  data: RelationReport,
  nodes: Node<
    {
      index: number;
      userName?: string | undefined;
      resultText?: string | undefined;
      isDefaultNode: boolean;
      seq?: number;
    },
    string | undefined
  >[],
) => {
  if (nodes.length === 0) return [];

  const result = [];

  if (nodes.length <= 2) {
    // 관계도에 한 명만 추가되어있는 경우
    return [
      {
        id: `${nodes[0].id}${nodes[1].id}}`,
        source: nodes[0].id,
        target: nodes[1].id,
        type: 'default',
        data: {
          isOnlyEdge: true,
        },
      },
    ];
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) break;
      const edgeData = data.edges?.find((item) => {
        return (
          (nodes[i].data.seq === item.source &&
            nodes[j].data.seq === item.target) ||
          (nodes[i].data.seq === item.target &&
            nodes[j].data.seq === item.source)
        );
      });
      const isDefaultEdge =
        nodes[i].data.isDefaultNode || nodes[j].data.isDefaultNode;

      result.push({
        id: `${nodes[i].id}${nodes[j].id}}`,
        source: nodes[i].id,
        target: nodes[j].id,
        type: isDefaultEdge ? 'default' : 'common',
        data: {
          text: edgeData?.label,
          isOnlyEdge: false,
        },
      });
    }
  }

  return result;
};
