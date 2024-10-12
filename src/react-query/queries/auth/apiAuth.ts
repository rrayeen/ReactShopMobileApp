import {user} from '../../../store/authSlice';
import {supabase} from '../../../supabase/supabase';

export type loginType = {
  email: string;
  password: string;
};
export type newUserType = {
  email: string;
  password: string;
  username: string;
  adress: string;
};
export async function login({email, password}: loginType) {
  let {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  //getting User information
  let {data: Users, error: error1} = await supabase
    .from('Users')
    .select('*')
    // Filters
    .eq('id', data.user?.id);
  if (error1) throw new Error(error1.message);

  return Users?.at(0) as user;
}

export async function logout() {
  let {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

//checking if there are a valid session
export async function checkSession() {
  const {
    data: {session},
    error,
  } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session) return null;
  //getting User information
  let {data: Users, error: error1} = await supabase
    .from('Users')
    .select('*')
    // Filters
    .eq('id', session?.user?.id);
  if (error1) throw new Error(error1.message);

  return Users?.at(0) as user;
}

export async function singup({email, password, username, adress}: newUserType) {
  //signUp
  let {data, error} = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.user) return null;
  //adding user to database

  //icon
  const icon = 'https://static.thenounproject.com/png/5593059-200.png';

  const {data: session, error: error2} = await supabase
    .from('Users')
    .insert([{id: data.user.id, username, adress, icon}])
    .select()
    .single();
  if (error2) {
    throw new Error(error2.message);
  }
  if (!session) return null;
  //getting User information
  let {data: Users, error: error1} = await supabase
    .from('Users')
    .select('*')
    // Filters
    .eq('id', data.user.id);
  if (error1) throw new Error(error1.message);

  return Users?.at(0) as user;
}

//create new user
// export async function newUser(user: newUserType) {
//   const {data, error} = await supabase
//     .from('Users')
//     .insert([user])
//     .select()
//     .single();
//   if (error) throw new Error(error.message);

//   return data;
// }
