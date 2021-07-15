import * as ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';

import App from './app/app';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    type: 'light'
  },
  typography: {
    h1: {
      fontWeight: 300,
      fontSize: '3rem'
    },
    h2: {
      fontWeight: 300,
      fontSize: '2.5rem'
    },
    h3: {
      fontWeight: 300,
      fontSize: '2rem'
    },
    h4: {
      fontWeight: 200,
      fontSize: '1.7rem'
    },
    h5: {
      fontWeight: 200,
      fontSize: '1.3rem'
    },
    h6: {
      fontWeight: 200,
      fontSize: '1.1rem'
    },
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
  }
});

ReactDOM.render(
  <Auth0Provider
    domain={process.env.NX_AUTH0_CLIENT_DOMAIN as string}
    clientId={process.env.NX_AUTH0_CLIENT_ID as string}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ApiContextProvider hostUrl={process.env.NX_API_HOST as string}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApiContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Auth0Provider>,

  document.getElementById('root')
);
