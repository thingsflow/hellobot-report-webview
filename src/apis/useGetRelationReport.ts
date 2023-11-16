import { fetcher } from '@/lib/fetcher';
import { GetRelationReportType } from '@/types/relationreport';
import useSWR from 'swr';

export default function useGetRelationReport({
  reportSeq,
}: {
  reportSeq?: string;
}) {
  const { data, error, mutate, isLoading } = useSWR<GetRelationReportType>(
    `/api/relation-report/${reportSeq}`,
    fetcher.get,
  );

  if (error || data?.error) {
    throw Error(data?.error?.message || error.message);
  }

  return {
    loading: isLoading,
    data: data?.data,
    mutate,
    isLoading,
  };
}
