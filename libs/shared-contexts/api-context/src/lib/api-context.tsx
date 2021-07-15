import * as React from 'react'; // this is needed for react-native

interface ApiContextValues {
  hostUrl: string;
}

const ApiContext = React.createContext<ApiContextValues | null>(null);

export function useApiHostUrl(): string {
  const ctx = React.useContext(ApiContext);
  if (ctx === null) {
    throw new Error(`Missing <ApiContextProvider hostUrl={...}> in the app!`);
  }
  return ctx.hostUrl;
}

export function ApiContextProvider(
  props: ApiContextValues & { children: React.ReactNode }
) {
  return (
    <ApiContext.Provider value={props}>{props.children}</ApiContext.Provider>
  );
}
