import {supabase} from '../../../supabase/supabase';
export type ProductTypes = {
  categorie: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  created_at: string;
};

export async function getAllProducts() {
  let {data: product, error} = await supabase.from('product').select('*');

  if (error) throw new Error(error.message);

  return product as ProductTypes[];
}
export async function getProduct(id: number) {
  let {data: product, error} = await supabase
    .from('product')
    .select('*')
    .eq('id', id);
  if (error) throw new Error(error.message);

  return product as ProductTypes[];
}
