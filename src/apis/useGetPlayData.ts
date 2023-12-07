import { fetcher } from '@/lib/fetcher';
import { GetPlayDataType } from '@/types/relationreport';
import React from 'react';
import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/_internal';

export default function useGetPlayData({
  fixedMenuSeq,
  reportSeq,
  options,
}: {
  fixedMenuSeq: string;
  reportSeq?: string;
  options?: Partial<
    PublicConfiguration<GetPlayDataType, any, BareFetcher<GetPlayDataType>>
  >;
}) {
  const { data, error, mutate, isLoading } = useSWR<GetPlayDataType>(
    fixedMenuSeq !== 'undefined'
      ? `/v2/fixed-menus/${fixedMenuSeq}/play-datas?${
          reportSeq ? `reportSeq=${reportSeq}` : ''
        }`
      : '',
    fetcher.get,
    options,
  );

  if (data?.error || error) {
    throw Error(data?.error?.message || error.message);
  }

  return {
    loading: isLoading,
    data: { playDatas: data?.data?.playDatas, skill: data?.data?.skill },
    mutate,
    isLoading,
  };
}
