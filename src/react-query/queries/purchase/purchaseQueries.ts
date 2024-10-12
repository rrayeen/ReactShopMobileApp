import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getRecipe,
  getHistoryPurchases,
  addRecipe,
  newRecipeType,
  updateProductQuantity,
} from './purchase';
import {useAppDispatch} from '../../../store/store';
import {clearCart} from '../../../store/cartSlice';
import Toast from 'react-native-toast-message';

export function getUserHistory(userId: string) {
  const {
    data: purchaseHistory,
    isPending,
    status,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['history'],
    queryFn: () => getHistoryPurchases(userId),
  });

  return {purchaseHistory, isPending, status, isFetching, isFetched};
}

export function useUserRecipe(id: string) {
  const {data, isPending, isFetching, status} = useQuery({
    queryKey: ['recipe'],
    queryFn: () => getRecipe(id),
  });
  return {data, isPending, isFetching, status};
}

export function useNewRecipe() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {error, isPending, status, mutate} = useMutation({
    mutationFn: (recipe: newRecipeType) => addRecipe(recipe),
    onSuccess: () => {
      dispatch(clearCart());
      //queryClient.refetchQueries({queryKey: ['history']});
    },
  });
  return {error, isPending, status, mutate};
}

export function useUpdateQnatity() {
  const {mutate, isPending, status, error} = useMutation({
    mutationFn: ({id, quantity}: {id: number; quantity: number}) =>
      updateProductQuantity({id, quantity}),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Purchase success',
      });
    },
  });

  return {mutate, isPending, status, error};
}
