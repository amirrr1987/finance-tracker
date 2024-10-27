import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  return createClient(supabaseUrl, supabaseKey);
};
