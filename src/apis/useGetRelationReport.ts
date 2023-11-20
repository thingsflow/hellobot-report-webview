import { RelationReportModalContext } from '@/app/relationreport/[reportSeq]/page';
import { fetcher } from '@/lib/fetcher';
import { GetPlayDataType, GetRelationReportType } from '@/types/relationreport';
import React from 'react';
import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/_internal';

const useGetRelationReport = ({
  reportSeq,
  options,
}: {
  reportSeq?: string;
  options?: Partial<
    PublicConfiguration<GetPlayDataType, any, BareFetcher<GetPlayDataType>>
  >;
}) => {
  const { isAllLoading } = React.useContext(RelationReportModalContext);

  const { data, error, mutate, isLoading, isValidating } =
    useSWR<GetRelationReportType>(
      `/api/relation-report/${reportSeq}`,
      fetcher.get,
      { ...options, refreshInterval: isAllLoading ? 1000 : 0 },
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
};

export default useGetRelationReport;
