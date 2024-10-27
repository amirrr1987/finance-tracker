// import { createClient } from "@supabase/supabase-js";
import type { TransactionDTO } from "~/types/transaction.model";
import _ from "lodash";
// import { useSupabase } from "~/composables/useSupabase";
export default defineEventHandler(async (event) => {
  const body: TransactionDTO.CreateOne.Request = await readBody(event);
  const dataa = _.pick(body, ["transaction", "supabase"]);
  const obj = _.omit(dataa, ["id"]);


  console.log(typeof dataa.supabase);
  
  // console.log("🚀 ~ defineEventHandler ~ obj:", dataa.supabase.form);

  // const 
  // console.log("🚀 ~ defineEventHandler ~ obj:", dataa.transaction);
  // console.log("🚀 ~ defineEventHandler ~ obj:", obj);
  const { data, error } = await dataa.supabase
    .from("transactions")
    .insert(obj)
    .select();

  if (error) {
    console.error("Error fetching transactions:", error);
    return { error } as unknown;
  }

  return data as unknown as TransactionDTO.Content;
});
