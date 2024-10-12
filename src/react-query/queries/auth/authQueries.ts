import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  checkSession,
  login,
  loginType,
  logout,
  newUserType,
  singup,
} from './apiAuth';
import {useAppDispatch} from '../../../store/store';
import {setIsAuthenticated, setUser, user} from '../../../store/authSlice';
import Toast from 'react-native-toast-message';

export function GetLogin() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {data, status, isPending, mutate, isError, error} = useMutation({
    mutationFn: ({email, password}: loginType) => login({email, password}),

    onSuccess: data => {
      //queryClient.setQueryData(['user'], data);
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(data));
      Toast.show({
        type: 'success',
        text1: 'Welcome Back !',
        text2: `Welcome ${data.username} , You're logged in`,

        swipeable: true,
      });
    },
  });
  return {
    data,
    isPending,
    mutate,
    isError,
    error,
    status,
  };
}
export function Logout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {isPending, status, mutate, isError} = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      Toast.show({
        type: 'error',
        text1: 'Goodbye !',
        text2: `You're Logged Out`,

        swipeable: true,
      });
    },
  });

  return {
    isPending,
    mutate,
    status,
    isError,
  };
}

export function GetSession() {
  const {data, status, isFetching, isPending, isFetched, isError} = useQuery<
    user | null | undefined
  >({
    queryKey: ['user'],
    queryFn: checkSession,
  });
  return {
    data,
    isPending,
    isError,
    status,
    isFetching,
    isFetched,
  };
}

// export function useAuthChangeState() {
//   const queryClient = useQueryClient();
//   useEffect(() => {
//     const {data: authListner} = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === 'SIGNED_OUT') {
//           queryClient.setQueryData(['session'], null);
//         }
//         if (event === 'SIGNED_IN') {
//           queryClient.setQueryData(['session'], session);
//         }
//       },
//     );
//     return authListner.subscription.unsubscribe();
//   }, [queryClient]);
//  }

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const {mutate, status, isPending, error} = useMutation({
    mutationFn: ({email, password, username, adress}: newUserType) =>
      singup({email, password, username, adress}),
    onSuccess: data => {
      queryClient.refetchQueries({queryKey: ['user']});
      Toast.show({
        type: 'success',
        text1: 'Welcome ! ',
        text2: `Welcome ${data?.username} , You're signed up`,

        swipeable: true,
      });
    },
  });

  return {error, mutate, status, isPending};
};
