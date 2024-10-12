import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {navigatorConfig} from '../navigatorConfig';
import {CartStackRouts} from '../routes';
import Purchase from '../../models/Purchase';
import Cart from '../../models/Tabs/cart/Cart';
import Payment from '../../models/Payment';
import {newRecipeType} from '../../react-query/queries/purchase/purchase';
import {RouteProp} from '@react-navigation/native';

export type CartStackParamList = {
  [CartStackRouts.CART]: undefined;
  [CartStackRouts.PAYMENT]: undefined;
  [CartStackRouts.PURCHASE]: {
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

export type CartStackScreenProps<T extends keyof CartStackParamList> =
  NativeStackScreenProps<CartStackParamList, T>;

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={navigatorConfig}
      initialRouteName={CartStackRouts.CART}>
      <Stack.Screen name={CartStackRouts.CART} component={Cart} />
      <Stack.Screen name={CartStackRouts.PAYMENT} component={Payment} />
      <Stack.Screen name={CartStackRouts.PURCHASE} component={Purchase} />
    </Stack.Navigator>
  );
};
