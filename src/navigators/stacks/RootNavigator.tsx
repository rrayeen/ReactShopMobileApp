import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {GetSession} from '../../react-query/queries/auth/authQueries';
import {
  selectIsAuthenticated,
  setIsAuthenticated,
  setUser,
} from '../../store/authSlice';
import {useAppSelector} from '../../store/store';
import {navigatorConfig} from '../navigatorConfig';
import {RootStackRouts} from '../routes';
import AuthNavigator, {AuthStackParamList} from './AuthNavigator';
import LoaderNavigator from './LoaderNavigator';
import TabsNavigator, {TabStackParamList} from './TabsNavigator';

export type RootStackParamList = {
  [RootStackRouts.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [RootStackRouts.TAB_STACK]: NavigatorScreenParams<TabStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const {status, isFetched, data: user} = GetSession();
  useEffect(() => {
    if (isFetched && user) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(user));
      Toast.show({
        type: 'success',
        text1: 'Welcome Back !',
        text2: `Welcome ${user.username} , You're logged in`,
        swipeable: true,
      });
    }
    if (isFetched && !user) {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
    }
  }, [isFetched, user]);

  return (
    <>
      <Stack.Navigator screenOptions={navigatorConfig}>
        {status === 'pending' ? (
          <Stack.Screen
            name={RootStackRouts.LOAD_STACK}
            component={LoaderNavigator}
          />
        ) : isAuth ? (
          <Stack.Screen
            name={RootStackRouts.TAB_STACK}
            component={TabsNavigator}
          />
        ) : (
          <Stack.Screen
            name={RootStackRouts.AUTH_STACK}
            component={AuthNavigator}
          />
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
