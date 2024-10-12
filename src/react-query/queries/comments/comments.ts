import {supabase} from '../../../supabase/supabase';

export interface commentType {
  id: number;
  userComment: string;
  userIcon: string;
  userName: string;
  userId: string;
}
export type newCommentType = Omit<commentType, 'id'> & {
  productId: number;
};

export async function getComments(id: number) {
  let {data, error} = await supabase
    .from('commentsTab')
    .select('*')
    // Filters
    .eq('productId', id);
  if (error) throw new Error(error.message);
  return data;
}
export async function deleteComment(id: number) {
  const {error} = await supabase.from('commentsTab').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function addComment(newComment: newCommentType) {
  const {data, error} = await supabase
    .from('commentsTab')
    .insert([newComment])
    .select()
    .single();

  if (error) throw new Error();

  return data;
}
