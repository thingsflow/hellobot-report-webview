export interface Error {
  code?: string;
  message?: string;
  reason?: string;
  error?: {
    code?: string;
    message?: string;
    reason?: string;
  };
}

export type RelationType = 'Friend' | 'Companion' | 'Family' | 'Partner';

export interface PlayData {
  seq?: number;
  name?: string;
  resultName?: string;
  isAlreadyAdded?: boolean; // 해당 관계도에 이미 추가된 사용자인가?
  isAdded?: boolean; // client only (모임 생성 화면 내에서 해당 플레이데이터가 선택되었는가?)
}

export interface Skill {
  seq?: number;
  name?: string;
  discountPrice?: number;
  priceAmount?: number;
  discountPriceAmount?: number;
  newSkillBannerImageUrl?: string;
  chatbot?: {
    seq?: number;
    activeProfileUrl?: string;
    name?: string;
  };
  badge?: {
    title?: string;
    imageUrl?: string;
  };
  description?: string;
  featuredBannerImageUrl?: string;
  evalAvgScore?: number;
  totalEvalutationCount?: number;
}

export type ShareScope = 'PUBLIC' | 'PRIVATE';

export type PlatForm = 'web' | 'android' | 'ios';

export interface RelationReport {
  seq?: number;
  title?: string;
  imageUrl?: string; // 스튜디오에서 설정한 ogImageUrl
  shareScope?: ShareScope;
  reportLink?: string; // 웹뷰 url
  playDatas?: Array<{
    seq?: number;
    name?: string;
    resultName?: string;
  }>;
  edges?: Array<{
    source?: number; // playData의 seq. source와 target중 항상 작은 것이 source가 됨.
    target?: number; // playData의 seq. source와 target중 항상 큰 것이 target이 됨.
    label?: string; // 엣지에 표시될 label
    detail?: string; // 상세 결과 텍스트
  }>;
  userSeq?: number; // 보고서 생성자 아이디
  skillSeq?: number; // 스킬 아이디
  isPlayDataAdded?: boolean; // 관계도에 추가할 플레이 데이터가 없어서 추가 했을 때 추가 되었으면 true. 그 외엔 false
  hasPlayDataAdded?: boolean; // 유저가 해당 관계도에 플레이 데이터를 추가한 적 있는지 (참여중, 참여가능)
  isPlayDataAddable?: boolean; // 추가가 가능한 상태인지. 현재의 조건은 플레이데이터가 없어야 되고, 스킬이 동일해야 한다. (앱에서 팝업 띄우는 여부)
  ownerPlayDataName?: string; // '수지 외 1명'에서 '수지'.
  extraUsersCount?: number; // '수지 외 1명'에서 1.
  skill?: Skill;
  sampleImageUrl?: string;
  isViewerOwner?: boolean;
}

// ----------- API TYPES ------------
export interface GetPlayDataType extends Error {
  data?: {
    playDatas?: Array<PlayData>;
    skill?: Skill;
  };
}

export interface GetBridgeDataType extends Error {
  data?: {
    seq?: number;
    relationType?: RelationType;
    previewImageUrl?: string;
    skillSeq?: number;
    title?: string;
    subTitle?: string;
    skill?: {
      chatbot?: {
        seq?: number;
        activeProfileUrl?: string;
        name?: string;
      };
      badge?: {
        title?: string;
        imageUrl?: string;
      };
      seq?: number;
      name?: string;
      description?: string;
      priceAmount?: number;
      discountPriceAmount?: number;
      newSkillBannerImageUrl?: string;
      featuredBannerImageUrl?: string;
      evalAvgScore?: number;
      totalEvalutationCount?: number;
    };
  };
}

export interface CreateRelationReportType extends Error {
  data: {
    title?: string;
    shareScope?: ShareScope;
    skillSeq: number;
    seq: number;
    reportLink?: string;
  };
}

export interface CreateRealtionReportInputType {
  title?: string;
  shareScope?: ShareScope;
  skillSeq: number;
  playDataSeq: number;
}

export interface UpdateRelationReportType extends Error {
  data?: RelationReport;
}

export interface UpdateRelationReportInputType {
  playDataSeqs?: Array<number>;
  shareScope?: ShareScope;
  title?: string;
}

export interface GetRelationReportType extends Error {
  data?: RelationReport;
}
