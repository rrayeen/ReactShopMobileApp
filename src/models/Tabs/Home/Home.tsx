import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ThemeContext} from '../../../context/ThemeContext';
import {HomeStackScreenProps} from '../../../navigators/stacks/HomeNavigator';
import ControlledInput from '../../../components/ControlledInput';
import {useForm} from 'react-hook-form';

import Screen from '../../../components/Screen';
import {Logout} from '../../../react-query/queries/auth/authQueries';
import {useAppDispatch} from '../../../store/store';
import {setIsAuthenticated, setUser} from '../../../store/authSlice';
import {FlashList} from '@shopify/flash-list';

import {getAllProduct} from '../../../react-query/queries/product/productQueries';
import Loader from '../../../components/LoadingScreen/Loader';
import HeaderMenu from '../../../components/HeaderMenu';

import EmptyComponent from '../../../components/EmptyComponent';
import {shadows} from '../../../constant/Shadows';
import ProductComponent from '../../../components/productComponents/ProductComponent';
import {quantityCheck} from '../../../store/cartSlice';
import PickerOrder from '../../../components/PickerOrder';
import Icon from 'react-native-easy-icon';
import {ProductTypes} from '../../../react-query/queries/product/products';
import {queryClient} from '../../../react-query/queryClient';

const Home = ({navigation}: HomeStackScreenProps<'Home_Home'>) => {
  const [order, setOrder] = useState('');
  const [searchProduct, setSearchProduct] = useState<ProductTypes[]>([]);

  const {control, handleSubmit, getValues, watch, setValue} = useForm({
    defaultValues: {
      search: '',
    },
  });
  const dispatch = useAppDispatch();
  const {mutate: logout, isPending: loginOut, status, isError} = Logout();
  const {
    data: product,
    status: productStatus,
    isPending: productIsPending,
    error: productError,
    isFetching,
  } = getAllProduct();
  // const searchProduct: ProductTypes[] = useMemo(() => {
  //   if (product) {
  //     return product.filter(el =>
  //       el.name.toLowerCase().includes(getValues('search').toLowerCase()),
  //     );
  //   }
  //   return [];
  // }, [product, getValues('search')]);
  const submit = (data: {search: string}) => {
    setSearchProduct(
      product?.filter(el =>
        el.name.toLowerCase().includes(data.search.toLowerCase()),
      ) || [],
    );
  };
  useEffect(() => {
    if (status === 'success') {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
    }
  }, [status]);
  useEffect(() => {
    if (product) {
      product.map(el => dispatch(quantityCheck(el)));
      setSearchProduct(product);
    }
  }, [product]);

  return (
    <>
      {!product || isFetching || loginOut || productIsPending ? (
        <Loader></Loader>
      ) : (
        <Screen
          onRefresh={() => {
            queryClient.refetchQueries({queryKey: ['products']});
          }}
          fullScreen
          noHorizontalPadding>
          <FlashList
            data={
              order === 'Name_asc'
                ? searchProduct.sort((a, b) => a.name.localeCompare(b.name))
                : order === 'Name_desc'
                ? searchProduct.sort((a, b) => b.name.localeCompare(a.name))
                : order === 'Price_asc'
                ? searchProduct.sort((a, b) => a.price - b.price)
                : order === 'Price_desc'
                ? searchProduct.sort((a, b) => b.price - a.price)
                : searchProduct
            }
            renderItem={({item}) => (
              <ProductComponent
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                onClick={() => {
                  navigation.navigate('Product', {id: item.id});
                }}
              />
            )}
            numColumns={1}
            ListHeaderComponent={() => (
              <>
                <HeaderMenu />
                <ControlledInput
                  name="search"
                  control={control}
                  placeholderText="Search . . . "
                  onSubmitEditing={handleSubmit(submit)}
                  labelText=""
                  RightAcessory={() => (
                    <Pressable onPress={handleSubmit(submit)}>
                      <Icon type="feather" name="search" size={25}></Icon>
                    </Pressable>
                  )}
                  inputWrapperStyle={[
                    {margin: 20, marginHorizontal: 30},
                    shadows.large,
                  ]}
                />
                {product && product[0] && (
                  <PickerOrder order={order} setOrder={setOrder} />
                )}
              </>
            )}
            estimatedItemSize={200}
            ListEmptyComponent={() => (
              <EmptyComponent msg="No Products Found" />
            )}></FlashList>
        </Screen>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
