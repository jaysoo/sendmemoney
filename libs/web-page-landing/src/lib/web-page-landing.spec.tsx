import { render } from '@testing-library/react';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { WebPageLanding } from './web-page-landing';

describe('WebPageDonate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ApiContextProvider hostUrl={'/'}>
        <QueryClientProvider client={new QueryClient()}>
          <WebPageLanding />
        </QueryClientProvider>
      </ApiContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
