import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { WebPageNewFundraiser } from './web-page-new-fundraiser';

describe('WebPageDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ApiContextProvider hostUrl={'/'}>
          <QueryClientProvider client={new QueryClient()}>
            <WebPageNewFundraiser user={{ name: '', email: '' }} />
          </QueryClientProvider>
        </ApiContextProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
