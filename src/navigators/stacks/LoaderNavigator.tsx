import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {LoaderStackRouts} from '../routes';
import {navigatorConfig} from '../navigatorConfig';
import Loader from '../../components/LoadingScreen/Loader';

type loaderStackParamList = {
  [LoaderStackRouts.LOADER]: undefined;
};

export type LoaderStackProps<T extends keyof loaderStackParamList> =
  NativeStackScreenProps<loaderStackParamList, T>;

const Stack = createNativeStackNavigator<loaderStackParamList>();

const LoaderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigatorConfig}>
      <Stack.Screen name={LoaderStackRouts.LOADER} component={Loader} />
    </Stack.Navigator>
  );
};

export default LoaderNavigator;