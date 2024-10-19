import { createClient } from "@supabase/supabase-js";
import _ from "lodash";
import type { Transaction } from "~/types/transaction.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params?.id;

  const obj = _.pick(body, [
    "id",
    "amount",
    "type",
    "description",
    "category",
    "createdAt",
  ]);
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("transactions")
    .update(obj)
    .eq("id", id);
  if (error) {
    console.error("Error fetching transactions:", error);
    return {} as Transaction;
  }

  return data;
});
