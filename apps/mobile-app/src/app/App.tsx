import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';
import { ApiContextProvider } from '@sendmemoney/shared-contexts/api-context';
import { MobileScreenLanding } from '@sendmemoney/mobile-screen-landing';
import { MobileScreenDetails } from '@sendmemoney/mobile-screen-details';
import { MobileScreenDonate } from '@sendmemoney/mobile-screen-donate';

const Stack = createStackNavigator();

const queryClient = new QueryClient();

// TODO: This should go into a config
const API_HOST_URL = 'http://localhost:4200';

function AppNavigationBar({ navigation, previous, scene }: StackHeaderProps) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={scene.descriptor.options.title} />
    </Appbar.Header>
  );
}

function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
      />
      <ApiContextProvider hostUrl={API_HOST_URL}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                  header: AppNavigationBar,
                }}
              >
                <Stack.Screen
                  name="Landing"
                  options={{ title: 'Top Fundraisers' }}
                  component={MobileScreenLanding}
                />
                <Stack.Screen name="Details" component={MobileScreenDetails} />
                <Stack.Screen
                  name="Donate"
                  component={MobileScreenDonate}
                  options={{ title: 'Your Donation' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </QueryClientProvider>
      </ApiContextProvider>
    </>
  );
}

export default App;
