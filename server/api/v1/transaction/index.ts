import { useSupabase } from "~/composables/useSupabase";
import type { TransactionDTO } from "~/types/transaction.model";

export default defineEventHandler(async () => {
  const supabase  = useSupabase();

  const { data, error } = await supabase
    .from("transactions")
    .select()
    .order("createdAt", { ascending: true });

  if (error) {
    console.error("Error fetching transactions:", error);
    return [] as TransactionDTO.Content[];
  }

  return data as TransactionDTO.Content[];
});
