import {useQuery} from '@tanstack/react-query';
import {getAllProducts, getProduct} from './products';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  created_at: string;
};

export const getAllProduct = () => {
  const {data, status, isPending, isError, error, isFetching} = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });

  return {data, status, isPending, isError, error, isFetching};
};

export function useGetProduct({id}: {id: number}) {
  const {data, isPending, isFetching, status, error} = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  });
  return {data, isPending, isFetching, status, error};
}
