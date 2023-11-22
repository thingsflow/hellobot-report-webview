import { fetcher } from '@/lib/fetcher';
import { GetBridgeDataType } from '@/types/relationreport';
import useSWR from 'swr';

export default function useGetBridgeData({ bridgeSeq }: { bridgeSeq: string }) {
  const { data, error, mutate, isLoading } = useSWR<GetBridgeDataType>(
    `/api/relation-report-bridge/${bridgeSeq}`,
    fetcher.get,
  );

  if (data?.error || error) {
    throw Error(data?.error?.message || error.message);
  }

  return {
    loading: isLoading,
    data: data?.data,
    mutate,
    error,
  };
}
