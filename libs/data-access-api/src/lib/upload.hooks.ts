import got from 'got';
import * as React from 'react';
import { useApiHostUrl } from '@sendmemoney/shared-contexts/api-context';

export function useUpload(
  files: File[],
  { onSuccess }: { onSuccess?: (s: string) => void }
) {
  const hostUrl = useApiHostUrl();
  React.useEffect(() => {
    if (files.length === 0) return;

    const formData = new FormData();
    const file = files[0];
    formData.append('file', file);

    const request = got.post('api/file-upload', {
      prefixUrl: hostUrl,
      headers: {},
      json: formData,
    });

    request.json<{ url: string }>().then((response) => {
      onSuccess && onSuccess(response.url);
    });

    return () => request.cancel();
  }, [files]);
}
