// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Fetch products from the database
// export const fetchProducts = async () => {
//     const { data, error } = await supabase
//       .from('products')
//       .select('*');
    
//     // Log the response data to check what is being returned
//     console.log('Fetched products:', data);
  
//     if (error) {
//       console.error('Error fetching products:', error);
//       return [];
//     }
//     return data;
//   };
  

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Fetch products from the database
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