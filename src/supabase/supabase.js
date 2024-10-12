import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://mmhehytxuczxkcfinnly.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1taGVoeXR4dWN6eGtjZmlubmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3ODA0OTcsImV4cCI6MjAzMTM1NjQ5N30.r02QqjgTy60HXgwV1hGEy_7anZsMm2XmvaJyqrCB3YU';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
