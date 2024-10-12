import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Loader from '../../components/LoadingScreen/Loader';
import {navigatorConfig} from '../navigatorConfig';
import {LoaderStackRouts} from '../routes';

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
