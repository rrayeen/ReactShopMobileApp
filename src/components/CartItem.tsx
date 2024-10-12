import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-easy-icon';
import {formatCurrency} from '../../utils/helper';
import {Colors} from '../constant/Colors';
import {
  cartType,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../store/cartSlice';
import {useAppDispatch} from '../store/store';
import {CImage} from './CImage';
import {CText} from './CText';
import Separator from './Separator';

type props = {
  cartLength: number;
  index: number;
  cart: cartType;
};

const CartItem = ({cart, index, cartLength}: props) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(removeItem(cart.id));
  };
  const handleAddQuantity = () => {
    dispatch(increaseQuantity(cart));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(cart.id));
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemInfo}>
        <CImage
          resizeMode="cover"
          source={cart.image}
          height={70}
          width={90}
          containerStyle={{
            borderRadius: 15,
          }}
        />
        <CText size="xl_bold" color="lightBlue">
          {cart.name}
        </CText>
        <CText color="lightBlue" size="lg_bold">
          {formatCurrency(cart.price * cart.cartQuantity)}
        </CText>
      </View>
      <View style={styles.buttons}>
        <View style={styles.quantitybuttons}>
          <Pressable
            disabled={cart.cartQuantity <= 1}
            onPress={() => {
              if (cart.cartQuantity > 1) handleDecreaseQuantity();
            }}>
            <Icon
              type="feather"
              name="minus-circle"
              color={cart.cartQuantity <= 1 ? 'gray' : Colors.blue}
              size={30}></Icon>
          </Pressable>

          <CText color="lightBlue" size="lg_bold">
            {cart.cartQuantity}
          </CText>
          <Pressable
            disabled={cart.cartQuantity > 4}
            onPress={() => {
              if (cart.cartQuantity <= 4) handleAddQuantity();
            }}>
            <Icon
              type="feather"
              name="plus-circle"
              color={cart.cartQuantity > 4 ? 'gray' : Colors.blue}
              size={30}></Icon>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            handleDelete();
          }}>
          <Icon
            type="feather"
            name="trash-2"
            color={Colors.deepRed}
            size={30}></Icon>
        </Pressable>
      </View>
      {index !== cartLength - 1 && (
        <Separator size={'100%'} mt={20} mb={20} color={'darkGray'} depth={1} />
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  quantitybuttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
  itemInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 25,
  },
});
