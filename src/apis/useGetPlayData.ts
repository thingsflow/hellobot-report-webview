import { fetcher } from '@/lib/fetcher';
import { GetPlayDataType } from '@/types/relationreport';
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
    fixedMenuSeq &&
      `/v2/fixed-menus/${fixedMenuSeq}/play-datas?${
        reportSeq ? `reportSeq=${reportSeq}` : ''
      }`,
    fetcher.get,
    options,
  );

  // data에 isAdded라는 클라이언트 state를 추가합니다.
  const playDatasWithIsAdded = data?.data?.playDatas?.map((item, _, array) => {
    if (item.isAdded !== undefined) return item;

    return {
      ...item,
      isAdded: array.length === 1 ? true : false, // 플레이 데이터가 1개이면 디폴트로 선택
    };
  });

  if (
    !isLoading &&
    (!data?.data?.playDatas || data?.data.playDatas.length === 0)
  ) {
    console.error('플레이데이터 정보가 없습니다.');
  }

  return {
    loading: isLoading,
    data: { playDatas: playDatasWithIsAdded, skill: data?.data?.skill },
    mutate,
    isLoading,
  };
}
