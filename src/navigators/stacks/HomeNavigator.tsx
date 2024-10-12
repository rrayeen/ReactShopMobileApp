import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from '../../models/Tabs/Home/Home';
import Product from '../../models/Tabs/Home/Product';
import {navigatorConfig} from '../navigatorConfig';
import {HomeStackRouts} from '../routes';

export type HomeStackParamList = {
  [HomeStackRouts.HOME]: undefined;
  [HomeStackRouts.PRODUCT]: {
    id: number;
  };
};
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{...navigatorConfig}}
      initialRouteName={HomeStackRouts.HOME}>
      <Stack.Screen name={HomeStackRouts.HOME} component={Home} />
      <Stack.Screen name={HomeStackRouts.PRODUCT} component={Product} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
