import fetcher from '@/lib/fetcher';
import {
  UpdateRelationReportInputType,
  UpdateRelationReportType,
} from '@/types/relationreport';
import useSWRMutation from 'swr/mutation';

export default function useUpdateRelationReport({
  reportSeq,
}: {
  reportSeq: string;
}) {
  const { data, trigger, isMutating } = useSWRMutation<
    UpdateRelationReportType,
    any,
    any,
    UpdateRelationReportInputType
  >(`/api/relation-report/${reportSeq}`, fetcher.patch);

  return { trigger, data, loading: isMutating };
}
