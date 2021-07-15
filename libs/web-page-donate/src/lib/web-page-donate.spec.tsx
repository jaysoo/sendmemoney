import { render } from '@testing-library/react';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { WebPageDonate } from './web-page-donate';

describe('WebPageDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ApiContextProvider hostUrl={'/'}>
        <QueryClientProvider client={new QueryClient()}>
          <WebPageDonate fundraiserId="1234" />
        </QueryClientProvider>
      </ApiContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
