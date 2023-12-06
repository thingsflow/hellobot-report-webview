import RelationReportContext from '@/app/relationreport/[reportSeq]/RelationReportContext';
import { ERROR_CODE } from '@/consts/common';
import { fetcher } from '@/lib/fetcher';
import { GetPlayDataType, GetRelationReportType } from '@/types/relationreport';
import { t } from '@/utils';
import { redirect } from 'next/navigation';
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
  const { isAllLoading } = React.useContext(RelationReportContext);

  const { data, error, mutate, isLoading, isValidating } =
    useSWR<GetRelationReportType>(
      `/api/relation-report/${reportSeq}`,
      fetcher.get,
      { ...options, refreshInterval: isAllLoading ? 1000 : 0 },
    );

  if (data?.error || error) {
    if (data?.error?.code === ERROR_CODE.REPORT_PERMISSION_ERROR) {
      redirect('/relationreport/permissionerror');
    }

    throw Error(data?.error?.message || error.message);
  }

  return {
    loading: isLoading || isValidating,
    data: data?.data,
    mutate,
    isLoading,
  };
};

export default useGetRelationReport;
