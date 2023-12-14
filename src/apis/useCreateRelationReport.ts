import { fetcher } from '@/lib/fetcher';
import useSWRMutation from 'swr/mutation';

export default function useCreateRelationReport() {
  const { data, trigger, isMutating, error } = useSWRMutation(
    '/api/relation-report',
    fetcher.post,
  );

  if (data?.error || error) {
    throw Error(data?.error?.message || error.message);
  }

  return { trigger, data, isMutating };
}
