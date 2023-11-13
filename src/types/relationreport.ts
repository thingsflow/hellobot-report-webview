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

export interface PlayData {
  seq?: number;
  name?: string;
  resultName?: string;
  isAdded?: boolean; // client only
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
