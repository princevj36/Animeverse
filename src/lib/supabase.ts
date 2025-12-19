import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'Missing Supabase environment variables. Please check your .env file.';
  console.error(errorMessage);
  // This will make the error more visible in development
  if (import.meta.env.DEV) {
    alert(errorMessage);
  }
  throw new Error(errorMessage);
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection on startup
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    console.log('Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
}

// Call the test function when the module loads
if (import.meta.env.DEV) {
  testSupabaseConnection().then(connected => {
    if (!connected) {
      console.warn('Supabase connection test failed. Check your network and credentials.');
    }
  });
}