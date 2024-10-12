import {View, Text, AppStateStatus, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  focusManager,
  IsRestoringProvider,
  QueryClientProvider,
  QueryClientProviderProps,
} from '@tanstack/react-query';
import {
  persistQueryClient,
  PersistQueryClientOptions,
} from '@tanstack/react-query-persist-client';
import {persistOptions} from './queryClient';
import {useOnlineManager} from './useOnlineManager';
import {useAppState} from '../hooks/useAppState';

type PersistQueryClientProviderProps = QueryClientProviderProps & {
  persistOption: Omit<PersistQueryClientOptions, 'queryClient'>;
  onSuccess: () => void;
};

const PersistQueryProvider = ({
  children,
  onSuccess,
  client,
  ...props
}: PersistQueryClientProviderProps) => {
  const [isRestoring, setIsRestoring] = useState(true);
  const refs = React.useRef({persistOptions, onSuccess});
  useOnlineManager();
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }
  useAppState({onChange: onAppStateChange});
  useEffect(() => {
    refs.current = {persistOptions, onSuccess};
  });

  useEffect(() => {
    let isStale = false;
    setIsRestoring(true);
    const [unsubscribe, promise] = persistQueryClient({
      ...refs.current.persistOptions,
      queryClient: client,
    });

    promise.then(() => {
      if (!isStale) {
        refs.current.onSuccess?.();
        setIsRestoring(false);
      }
    });

    return () => {
      isStale = true;
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={client} {...props}>
      <IsRestoringProvider value={isRestoring}>{children}</IsRestoringProvider>
    </QueryClientProvider>
  );
};

export default PersistQueryProvider;
