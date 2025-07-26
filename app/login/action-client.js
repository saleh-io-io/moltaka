import { createClient } from "@/utils/supabase/client";

export async function isLoggedIn() {
  const supabase =  createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.log('Error fetching user:', error);
    return false;
  }

  return !!user;
}
