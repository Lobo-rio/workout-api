import { SupabaseClient, createClient } from '@supabase/supabase-js';

const getSupabaseAdminEnv = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return { supabaseUrl, supabaseServiceKey };
};

const getSupabaseAuthEnv = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return { supabaseUrl, supabaseAnonKey };
};

let supabaseAdminClient: SupabaseClient | null = null;

export const getSupabaseAdminClient = () => {
  if (!supabaseAdminClient) {
    const { supabaseUrl, supabaseServiceKey } = getSupabaseAdminEnv();
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return supabaseAdminClient;
};

export const createSupabaseAuthClient = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseAuthEnv();
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
