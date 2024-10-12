import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {SCREEN_WIDTH} from '../../utils/dimension';
import {validateEmail} from '../../utils/helper';
import BackButton from '../components/Buttons/BackButton';
import CButton from '../components/Buttons/CButton';
import ControlledInput from '../components/ControlledInput';
import Loader from '../components/LoadingScreen/Loader';
import Screen from '../components/Screen';
import {CartStackRouts} from '../navigators/routes';
import {CartStackScreenProps} from '../navigators/stacks/CartNavgator';
import {
  useNewRecipe,
  useUpdateQnatity,
} from '../react-query/queries/purchase/purchaseQueries';
import {selectUser} from '../store/authSlice';
import {selectCart} from '../store/cartSlice';
import {useAppDispatch, useAppSelector} from '../store/store';

type DataProps = {
  username: string;
  email: string;
  phone: string;
  address: string;
  cartNumber: string;
  cvc: string;
  expiry: string;
};

const Payment = ({navigation}: CartStackScreenProps<'Payment'>) => {
  const {
    mutate: updateQnatity,
    isPending: updateQnatityPending,
    status: updateQnatityStatus,
    error: updateQnatityError,
  } = useUpdateQnatity();
  const {
    mutate: MutatenewRecipe,
    isPending: newRecipePending,
    status: newRecipeStatus,
    error: newRecipeError,
  } = useNewRecipe();

  const user = useAppSelector(selectUser);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: '',
      phone: '',
      address: user?.adress || '',
      cartNumber: '',
      cvc: '',
      expiry: '',
    },
  });
  const id = Math.random().toString(16).slice(2);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleSubmitData = async (data: DataProps) => {
    if (!isValid) return;

    const items = cart.map(el => {
      return {
        name: el.name,
        quantity: el.cartQuantity,
      };
    });
    const deliveredDay = new Date();
    const recipe = {
      username: data.username,
      id,
      items: JSON.stringify(items),
      number: +data.phone,
      location: data.address,
      totalPrice: +cart.reduce((total, el) => total + el.price, 0),
      totalItem: +cart.reduce((total, el) => total + el.cartQuantity, 0),
      userId: user?.id || '',

      deliveredDay: deliveredDay.setDate(deliveredDay.getDate() + 3),
    };

    //dispatch(clearCart());
    MutatenewRecipe(recipe);
    //refetch
    cart.map(el => {
      //quantity --
      updateQnatity({id: el.id, quantity: el.quantity - el.cartQuantity});
    });
  };
  useEffect(() => {
    if (newRecipeStatus === 'success' && updateQnatityStatus === 'success') {
      navigation.replace(CartStackRouts.CART);
    }
  }, [newRecipeStatus, updateQnatityStatus]);

  return (
    <>
      {updateQnatityPending || newRecipePending ? (
        <Loader />
      ) : (
        <Screen containerStyle={{paddingVertical: 80}}>
          <BackButton
            backVoid={() => {
              navigation.goBack();
            }}></BackButton>
          <View style={{flexDirection: 'column', gap: 20, marginBottom: 60}}>
            <ControlledInput
              control={control}
              rules={{required: true}}
              placeholderText="Name"
              labelText="Name"
              labelSize="lg_bold"
              name="username"
              editable={false}
              maxLength={20}
              inputWrapperStyle={{width: SCREEN_WIDTH * 0.6}}
              bottomText={errors.username?.message}
            />

            <ControlledInput
              control={control}
              rules={{
                required: true,
                validate(value) {
                  const validEmail = validateEmail(value);
                  if (!validEmail) {
                    return Promise.resolve('Invalid Email');
                  }
                  return Promise.resolve(true);
                },
              }}
              placeholderText="Email"
              labelText="Email"
              labelSize="lg_bold"
              name="email"
              bottomText={errors.email?.message || 'Email is required'}
            />

            <ControlledInput
              control={control}
              rules={{required: true, pattern: /^\d+$/}}
              placeholderText="Phone"
              labelText="Phone"
              labelSize="lg_bold"
              name="phone"
              bottomText={errors.phone?.message || 'Only Numbers'}
              maxLength={16}
            />

            <ControlledInput
              control={control}
              rules={{required: true}}
              placeholderText="Address"
              labelText="Address"
              labelSize="lg_bold"
              name="address"
              editable={true}
              maxLength={30}
              inputWrapperStyle={{width: SCREEN_WIDTH * 0.8}}
              bottomText={errors.address?.message || 'Address is required'}
            />
            <ControlledInput
              control={control}
              rules={{
                required: true,
                pattern: /^\d+$/,
                minLength: 16,
                maxLength: 16,
              }}
              placeholderText="Cart Number"
              labelText="Cart Number"
              labelSize="lg_bold"
              name="cartNumber"
              editable={true}
              maxLength={16}
              bottomText={
                errors.cartNumber?.message || 'Cart Number is required'
              }
              inputWrapperStyle={{width: SCREEN_WIDTH * 0.8}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <ControlledInput
                control={control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  minLength: 3,
                  maxLength: 3,
                }}
                placeholderText="CVC"
                labelText="CVC"
                labelSize="lg_bold"
                name="cvc"
                editable={true}
                maxLength={3}
                inputWrapperStyle={{width: SCREEN_WIDTH * 0.3}}
                bottomText={errors.cvc?.message || 'CVC is required'}
              />
              <ControlledInput
                control={control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  minLength: 4,
                  maxLength: 4,
                  validate: (value: string) => {
                    const year = parseInt(value);
                    if (year <= new Date().getFullYear()) {
                      return Promise.resolve(`> ${new Date().getFullYear()}`);
                    }
                    return Promise.resolve(true);
                  },
                }}
                placeholderText="Expiry"
                labelText="Expiry"
                labelSize="lg_bold"
                name="expiry"
                editable={true}
                maxLength={4}
                inputWrapperStyle={{width: SCREEN_WIDTH * 0.3}}
                bottomText={errors.expiry?.message || 'Expiry is required'}
                bottomTextSize="sm_medium"
                bottomTextColor="deepRed"
              />
            </View>
          </View>
          <CButton
            text={'Payment'}
            buttonType="success"
            height={60}
            width={'100%'}
            onPress={handleSubmit(handleSubmitData)}></CButton>
        </Screen>
      )}
    </>
  );
};

export default Payment;
