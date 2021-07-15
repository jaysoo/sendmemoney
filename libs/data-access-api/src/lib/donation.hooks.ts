import got from 'got';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useApiHostUrl } from '@sendmemoney/shared-contexts/api-context';
import { Donation } from '@sendmemoney/shared-models/donation';

export function useGetDonationTotal(fundraiserId: string) {
  const hostUrl = useApiHostUrl();
  return useQuery<{ total: number }>(
    `donation-total-${fundraiserId}`,
    () =>
      got
        .get(`api/donations/total?fundraiser=${fundraiserId}`, {
          prefixUrl: hostUrl,
        })
        .json<{ total: number }>(),

    {
      staleTime: 30 * 1000,
    }
  );
}

export function useGetLatestDonations(fundraiserId: string) {
  const hostUrl = useApiHostUrl();
  return useQuery<Donation[]>(
    `donations-${fundraiserId}`,
    () =>
      got
        .get(`api/donations/latest?fundraiser=${fundraiserId}`, {
          prefixUrl: hostUrl,
        })
        .json<Donation[]>(),

    {
      staleTime: 30 * 1000,
    }
  );
}

export function useDonate(fundraiserId: string) {
  const hostUrl = useApiHostUrl();
  const queryClient = useQueryClient();

  const mutation = useMutation<Donation, unknown, Partial<Donation>>(
    async (newDonation) =>
      ky
        .post('api/donations', { json: newDonation, prefixUrl: hostUrl })
        .json<Donation>(),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(`donations-${fundraiserId}`);
        await queryClient.invalidateQueries(`donation-total-${fundraiserId}`);
      },
    }
  );

  return mutation;
}
