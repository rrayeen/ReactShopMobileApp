import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Purchase from '../../models/Purchase';
import Profile from '../../models/Tabs/profile/Profile';
import {navigatorConfig} from '../navigatorConfig';
import {ProfileStackRouts} from '../routes';

export type ProfileStackParamList = {
  [ProfileStackRouts.PROFILE]: undefined;
  [ProfileStackRouts.PURCHASE]: {
    id: string;
    created_at: Date;
    deliveredDay: number;
    items: string;
    totalItem: number;
    totalPrice: number;
    location: string;
    number: number;
    username: string;
  };
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={navigatorConfig}
      initialRouteName={ProfileStackRouts.PROFILE}>
      <Stack.Screen name={ProfileStackRouts.PROFILE} component={Profile} />
      <Stack.Screen name={ProfileStackRouts.PURCHASE} component={Purchase} />
    </Stack.Navigator>
  );
};
