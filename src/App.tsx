/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import RootNavigator from './navigators/stacks/RootNavigator';
import {ThemeProvider} from './context/ThemeContext';
import {CStatusBar} from './components/CStatusBar';
import PersistQueryProvider from './react-query/PersistQueryProvider';
import {persistOptions, queryClient} from './react-query/queryClient';
import {Provider} from 'react-redux';

import Toast, {
  BaseToast,
  ErrorToast,
  BaseToastProps,
  ToastProps,
} from 'react-native-toast-message';

import {store} from './store/store';
import {Colors} from './constant/Colors';

const toastConsfig = {
  success: (props: BaseToastProps) => {
    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: 'green',
          paddingHorizontal: 5,
          paddingVertical: 7,
          height: 'auto',
        }}
        text1Style={{
          fontSize: 24,
          fontWeight: '600',
          fontFamily: 'c-Bold',
        }}
        text2Style={{
          fontSize: 18,
          fontWeight: '400',
          fontFamily: 'c-Medium',
        }}
      />
    );
  },
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.deepRed,
        paddingHorizontal: 5,
        paddingVertical: 7,
        height: 'auto',
      }}
      text1Style={{
        fontSize: 24,
        fontFamily: 'c-Bold',
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: 'c-Medium',
        fontWeight: '400',
      }}
    />
  ),
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <PersistQueryProvider
            client={queryClient}
            persistOption={persistOptions}
            onSuccess={() =>
              setTimeout(() => RNBootSplash.hide({fade: true}), 1000)
            }>
            <NavigationContainer>
              <ThemeProvider>
                <RootNavigator></RootNavigator>
                <Toast config={toastConsfig}></Toast>
              </ThemeProvider>
              <CStatusBar></CStatusBar>
            </NavigationContainer>
          </PersistQueryProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
