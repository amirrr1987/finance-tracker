import { createClient } from "@supabase/supabase-js";
import type { TransactionDTO } from "~/types/transaction.model";

export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    const { data } = await supabase
      .from("transactions")
      .delete()
      .eq("id", event.context.params?.id);
    return data as unknown as TransactionDTO.Content;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [] as unknown as TransactionDTO.Content;
  }
});
