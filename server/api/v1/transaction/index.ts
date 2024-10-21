import { createClient } from "@supabase/supabase-js";
import type { Transaction } from "~/types/transaction.model";

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("transactions")
    .select()
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [] as Transaction[];
  }

  return data as Transaction[];
});
