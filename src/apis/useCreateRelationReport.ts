import { fetcher } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';

export default function useCreateRelationReport() {
  const { data, trigger, isMutating } = useSWRMutation(
    '/api/relation-report',
    fetcher.post,
  );

  return { trigger, data, isMutating };
}
