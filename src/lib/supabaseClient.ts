import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  console.log('Fetched products:', data);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
};