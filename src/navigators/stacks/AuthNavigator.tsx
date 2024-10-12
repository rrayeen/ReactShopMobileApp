import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthStackRouts} from '../routes';
import Login from '../../models/AuthScreens/Login';
import Register from '../../models/AuthScreens/Register';
import {navigatorConfig} from '../navigatorConfig';

export type AuthStackParamList = {
  [AuthStackRouts.LOGIN]: undefined;
  [AuthStackRouts.REGISTER]: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigatorConfig}>
      <Stack.Screen name={AuthStackRouts.LOGIN} component={Login} />
      <Stack.Screen name={AuthStackRouts.REGISTER} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
