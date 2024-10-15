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

  // درخواست برای دریافت داده‌ها
  const { data, error } = await supabase
    .from("transactions")
    .select()
    .eq("id", event.context.params?.id).single()

  if (error) {
    console.error("Error fetching transactions:", error);
    return [] as Transaction[];
  }

  return data as Transaction[];
});
