import { createClient } from "@supabase/supabase-js";
import _ from "lodash";

export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key is missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const body = await readBody(event);
  const obj = _.pick(body, ["email"]);
  console.log(obj);
  
  try {
    const { data } = await supabase.auth.signInWithOtp({
      email: obj.email,
      options: {
        emailRedirectTo: process.env.DEV
          ? "http://localhost:3000/"
          : "https://finance-tracker-amirmaghami.netlify.app/",
      },
    });
    return data as unknown;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [] as unknown;
  }
});
