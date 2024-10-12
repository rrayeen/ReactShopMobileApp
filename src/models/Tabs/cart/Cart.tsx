import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../../../components/Screen';
import Separator from '../../../components/Separator';
import {PersistenceStorage} from '../../../storage';
import {KEYS} from '../../../storage/Keys';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {clearCart, quantityCheck, selectCart} from '../../../store/cartSlice';
import CartItem from '../../../components/CartItem';
import EmptyComponent from '../../../components/EmptyComponent';
import CButton from '../../../components/Buttons/CButton';
import {CartStackScreenProps} from '../../../navigators/stacks/CartNavgator';
import {CartStackRouts} from '../../../navigators/routes';

const Cart = ({navigation}: CartStackScreenProps<'Carte'>) => {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cart) {
      cart.map(el => dispatch(quantityCheck(el)));
    }
  }, [cart]);

  return (
    <Screen>
      {cart.length > 0 ? (
        cart.map((el, index) => (
          <CartItem
            key={index}
            index={index}
            cartLength={cart.length}
            cart={el}
          />
        ))
      ) : (
        <EmptyComponent msg="Your cart is empty" />
      )}
      {cart.length > 0 && (
        <>
          <Separator size={'100%'} mt={20} mb={20} color={'main'} depth={5} />
          <View style={styles.buttons}>
            <CButton
              buttonType="danger"
              text="Clear Cart"
              onPress={() => {
                dispatch(clearCart());
              }}
              width={150}
              height={50}
            />
            <CButton
              buttonType="success"
              text="Checkout"
              onPress={() => {
                navigation.navigate(CartStackRouts.PAYMENT);
              }}
              width={150}
              height={50}
            />
          </View>
        </>
      )}
    </Screen>
  );
};

export default Cart;

const styles = StyleSheet.create({
  buttons: {flexDirection: 'row', justifyContent: 'space-between'},
});
