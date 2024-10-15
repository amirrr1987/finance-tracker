import { createClient } from "@supabase/supabase-js";
import type { Transaction } from "~/types/transaction.model";

export default defineEventHandler(async (event) => {
  // محیط‌های مختلف را بررسی کنید تا مطمئن شوید از مقادیر صحیح استفاده می‌کنید.
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  // ایجاد کلاینت Supabase
  const supabase = createClient(supabaseUrl, supabaseKey);

  const body = await readBody(event);
  // درخواست برای دریافت داده‌ها
  const { data, error } = await supabase
    .from("transactions")
    .insert(body)
    .select();

  if (error) {
    console.error("Error fetching transactions:", error);
    return {} as Transaction;
  }

  return data as unknown as Transaction;
});