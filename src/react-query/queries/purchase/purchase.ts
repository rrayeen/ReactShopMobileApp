import {supabase} from '../../../supabase/supabase';
export interface newRecipeType {
  created_at?: Date;
  username: string;
  location: string;
  number: number;
  totalPrice: number;
  totalItem: number;
  items: string;
  id: string;
  deliveredDay: number;
  userId: string;
}

export async function getRecipe(id: string) {
  let {data: recipe, error} = await supabase
    .from('recipe')
    .select('*')
    .eq('id', id);
  if (error) throw new Error(error.message);
  return recipe as newRecipeType[];
}

export async function getHistoryPurchases(userId: string) {
  if (!userId) return;
  let {data: recipe, error} = await supabase
    .from('recipe')
    .select('*')
    // Filters
    .eq('userId', userId);
  if (error) throw new Error(error.message);
  return recipe as newRecipeType[];
}

//add new recipe when u purchase
export async function addRecipe(recipe: newRecipeType) {
  const {data, error} = await supabase.from('recipe').insert([recipe]).select();

  if (error) throw new Error(error.message);
  return data;
}

// when u purchase quantity is updated
export async function updateProductQuantity({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const {data, error} = await supabase
    .from('product')
    .update({quantity: quantity})
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
