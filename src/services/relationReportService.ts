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
];

export interface NodeData {
  index: number;
  isDefaultNode: boolean;
  userName?: string;
  resultText?: string;
}

export const generateNodeData = (names: string[]) => {
  if (typeof window === undefined) return [];

  const deviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth || 375;
  const deviceHeight = window.innerHeight || 812;

  const nodeCount = names.length + 1;
  const centerX = (deviceWidth / 2) * 0.75;
  const centerY = (deviceHeight / 2) * 0.75;
  const radius = (deviceWidth / 2) * 0.75;
  const angleIncrement = (2 * Math.PI) / nodeCount;
  const result = [];

  for (let i = 0; i < names.length; i++) {
    const angle = i * angleIncrement;
    result.push({
      id: `node${i}`,
      data: {
        index: i,
        userName: names[i],
        resultText: mockResultText[i],
        isDefaultNode: false,
      },
      position: {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      },
      type: 'commonNode',
    });
  }

  const lastIndex = names.length;
  const angle = lastIndex * angleIncrement;

  result.push({
    id: `node${lastIndex}`,
    data: { index: lastIndex, isDefaultNode: true },
    position: {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    },
    type: 'defaultNode',
  });

  return result;
};

export const generateEdgeData = (Nodes: Node<NodeData>[]) => {
  const result = [];

  for (let i = 0; i < Nodes.length; i++) {
    for (let j = 0; j < Nodes.length; j++) {
      if (i === j) break;
      const isDefaultEdge =
        Nodes[i].data.isDefaultNode || Nodes[j].data.isDefaultNode;

      result.push({
        id: `${Nodes[i].id}${Nodes[j].id}}`,
        source: Nodes[i].id,
        target: Nodes[j].id,
        type: isDefaultEdge ? 'default' : 'common',
        data: {
          text: mockResult[i],
        },
      });
    }
  }

  return result;
};
