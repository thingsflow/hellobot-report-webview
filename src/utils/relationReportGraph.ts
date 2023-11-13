import { Node } from 'reactflow';

const mockResult = [
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
  '🌪️💥폭풍우와 번개처럼 항상 긴장과 충돌의 상태',
  '서로를 이해하고 함께 어울리는 조각을 찾아가',
  '두개의 태양!☀️☀️ 우린 함께라면 불가능도 가능하게 만드는 무적파워!',
  '좀비처럼 감정이 사라져 가고 상처로 가득 찬 관계',
  '서로의 다양성을 인정하고 존중해',
  '말안해도 눈빛👀만 봐도 통하는 사이',
];

const mockResultText = [
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '병오일주',
  '병오일주',
  '병오일주',
  '병오일주',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
  '긴 결과 텍스트 히히히히히히호홓',
];

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
      return 1.2;
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

export const generateNodeData = (names: string[]) => {
  if (typeof window === 'undefined') return [];

  const deviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth || 375;
  const deviceHeight = window.innerHeight || 812;

  if (names.length < 2) {
    // 관계도에 한 명만 추가되어있는 경우
    const PADDING_X = 110; // 그래프 양 옆 패딩의 합
    const PADDING_TOP = 223; // 그래프 상단 패딩 높이

    return [
      {
        id: 'first_node',
        data: {
          index: 0,
          userName: names[0],
          resultText: mockResultText[0],
          isDefaultNode: false,
        },
        position: {
          x: PADDING_X / 2,
          y: PADDING_TOP,
        },
        type: 'commonNode',
      },
      {
        id: 'add_node',
        data: { index: 1, isDefaultNode: true },
        position: {
          x: deviceWidth - PADDING_X,
          y: deviceWidth - PADDING_X + PADDING_TOP,
        },
        type: 'defaultNode',
      },
    ];
  } else if (names.length >= 20) {
    // 관계도에 20명이 모두 추가된 경우
    const result = [];
    const nodeCount = names.length;
    const radiusOffset = getRadiusOffset(names.length);
    const radius = (deviceWidth / 2) * radiusOffset;

    const centerX = deviceWidth / 2;
    const centerY = deviceHeight / 2;

    const angleIncrement = (2 * Math.PI) / nodeCount;
    const angleRadians = (270 * Math.PI) / 180; // 그래프 상단 꼭지점 위치를 맞추기 위해 그래프를 270도 회전시킨다.

    for (let i = 0; i < names.length + 1; i++) {
      const angle = i * angleIncrement;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const rotatedX = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
      const rotatedY = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

      result.push({
        id: `node${i}`,
        data: {
          index: i,
          userName: names[i],
          resultText: mockResultText[i],
          isDefaultNode: false,
        },
        position: {
          x: rotatedX,
          y: rotatedY,
        },
        type: 'commonNode',
      });
    }

    return result;
  }

  // 관계도에 2명 이상 20명 이하 추가되어있는 경우
  const result = [];
  const nodeCount = names.length + 1;
  const radiusOffset = getRadiusOffset(names.length);
  const radius = (deviceWidth / 2) * radiusOffset;

  const centerX = deviceWidth / 2;
  const centerY = deviceHeight / 2;

  const angleIncrement = (2 * Math.PI) / nodeCount;
  const angleRadians = (270 * Math.PI) / 180; // 그래프 상단 꼭지점 위치를 맞추기 위해 그래프를 270도 회전시킨다.

  for (let i = 0; i < names.length + 1; i++) {
    const angle = i * angleIncrement;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const rotatedX = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
    const rotatedY = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

    const isLastIndex = i === names.length;

    result.push({
      id: `node${i}`,
      data: {
        index: i,
        userName: names[i],
        resultText: mockResultText[i],
        isDefaultNode: isLastIndex ? true : false,
      },
      position: {
        x: rotatedX,
        y: rotatedY,
      },
      type: isLastIndex ? 'defaultNode' : 'commonNode',
    });
  }

  return result;
};

export const generateEdgeData = (nodes: Node<NodeData>[]) => {
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
      const isDefaultEdge =
        nodes[i].data.isDefaultNode || nodes[j].data.isDefaultNode;

      result.push({
        id: `${nodes[i].id}${nodes[j].id}}`,
        source: nodes[i].id,
        target: nodes[j].id,
        type: isDefaultEdge ? 'default' : 'common',
        data: {
          text: mockResult[i],
          isOnlyEdge: false,
        },
      });
    }
  }

  return result;
};
