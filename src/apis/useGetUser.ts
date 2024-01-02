import fetcher from '@/lib/fetcher';
import { GetUserType } from '@/types/relationreport';
import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/_internal';

interface IUseGetUser {
  options?: Partial<
    PublicConfiguration<GetUserType, any, BareFetcher<GetUserType>>
  >;
}

export default function useGetUser({ options }: IUseGetUser) {
  const { data, error, mutate, isLoading } = useSWR<GetUserType>(
    `/v3/users`,
    fetcher.get,
    options,
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
