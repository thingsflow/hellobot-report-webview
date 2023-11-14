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
    howToImageUrl?: string;
    previewImageUrl?: string;
    skillSeq?: number;
    skill?: {
      chatbot?: {
        activeProfileUrl?: string;
        name?: string;
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
      viewCount?: number;
    };
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
}

export interface CreateRealtionReportInputType {
  title?: string;
  shareScope?: ShareScope;
  skillSeq: number;
  playDataSeq: number;
}

export type ShareScope = 'PUBLIC' | 'PRIVATE';

export interface CreateRealtionReportType {
  data: {
    title?: string;
    shareScope?: ShareScope;
    skillSeq: number;
    seq: number;
    link?: string;
  };
}

export type PlatForm = 'web' | 'android' | 'ios';
