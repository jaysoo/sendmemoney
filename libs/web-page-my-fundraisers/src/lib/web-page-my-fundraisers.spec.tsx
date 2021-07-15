import { render } from '@testing-library/react';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { WebPageMyFundraisers } from './web-page-my-fundraisers';

describe('WebPageDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ApiContextProvider hostUrl={'/'}>
        <QueryClientProvider client={new QueryClient()}>
          <WebPageMyFundraisers ownedBy={'jack@example.com'} />
        </QueryClientProvider>
      </ApiContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
