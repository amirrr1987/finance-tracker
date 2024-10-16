import { createClient } from "@supabase/supabase-js";
import type { Transaction } from "~/types/transaction.model";
import _ from "lodash";
export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const body: Transaction = await readBody(event);
 const obj = _.omit(body, ["id", "createdAt"]);
  const { data, error } = await supabase
    .from("transactions")
    .insert(obj)
    .select();

  if (error) {
    console.error("Error fetching transactions:", error);
    return { error } as unknown;
  }

  return data as unknown as Transaction;
});
