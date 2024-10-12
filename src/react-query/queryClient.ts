import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {QueryCache, QueryClient} from '@tanstack/react-query';
import {create} from 'react-test-renderer';
import {PersistenceStorage} from '../storage';
import {
  PersistQueryClientOptions,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client';

const FIVE_DAYS = 1000 * 60 * 60 * 24 * 5;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: FIVE_DAYS,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      if (error) {
        console.error(' Error in query: ', error);
        return;
      }
    },
  }),
});
const clientPersister = createSyncStoragePersister({
  storage: PersistenceStorage,
  retry: removeOldestQuery,
});

export const persistOptions: PersistQueryClientOptions = {
  queryClient,
  persister: clientPersister,
  maxAge: FIVE_DAYS,
  dehydrateOptions: {
    shouldDehydrateQuery: query => Boolean(query.gcTime !== 0),
  },
};
