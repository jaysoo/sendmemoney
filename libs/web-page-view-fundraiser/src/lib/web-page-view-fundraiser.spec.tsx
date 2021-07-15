import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { WebPageViewFundraiser } from './web-page-view-fundraiser';

describe('WebPageDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ApiContextProvider hostUrl={'/'}>
          <QueryClientProvider client={new QueryClient()}>
            <WebPageViewFundraiser fundraiserId="1234" />
          </QueryClientProvider>
        </ApiContextProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
