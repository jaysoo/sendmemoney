import got from 'got';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useApiHostUrl } from '@sendmemoney/shared-contexts/api-context';
import { Fundraiser } from '@sendmemoney/shared-models/fundraiser';

export function useListFundraisers(email = '', page = 1, perPage = 10) {
  const queryKey = email ? `fundraisers-${email}` : 'all-fundraisers';
  const hostUrl = useApiHostUrl();
  return useQuery<Fundraiser[]>(
    queryKey,
    () =>
      got
        .get(`api/fundraisers?page=${page}&perPage=${perPage}&email=${email}`, {
          prefixUrl: hostUrl,
        })
        .json<Fundraiser[]>(),
    {
      staleTime: 30 * 1000,
    }
  );
}

export function useGetFundraiser(id: string) {
  const hostUrl = useApiHostUrl();
  const queryClient = useQueryClient();
  return useQuery<Fundraiser>(
    `fundraiser-${id}`,
    () =>
      got
        .get(`api/fundraisers/${id}`, { prefixUrl: hostUrl })
        .json<Fundraiser>(),
    {
      staleTime: Infinity,
      initialData: () => {
        return queryClient
          .getQueryData<Fundraiser[]>('all-fundraisers')
          ?.find((d) => d._id === id);
      },
    }
  );
}

export function useCreateFundraiser() {
  const hostUrl = useApiHostUrl();
  const queryClient = useQueryClient();

  const mutation = useMutation<Fundraiser, unknown, Partial<Fundraiser>>(
    async (newFundraiser) =>
      got
        .post('api/fundraisers', { json: newFundraiser, prefixUrl: hostUrl })
        .json<Fundraiser>(),
    {
      onSuccess: () => queryClient.invalidateQueries('all-fundraisers'),
    }
  );

  return mutation;
}

export function useDeleteFundraiser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, string>(
    async (id: string) => {
      await got.delete(`/api/fundraisers/${id}`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('all-fundraisers'),
    }
  );

  return mutation;
}
