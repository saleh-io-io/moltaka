import { supabase } from "@/app/lib/supabaseClient";
import { redirect } from "next/navigation";
import {headers} from 'next/headers';

export const signInWithGithub = async () => {
    const origin = headers.get('origin')
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options:{
        redirectTo: `${origin}`
    }
  });

  if (error) {
    console.log("Error signing in with GitHub:", error);
    throw error;
  }else {
    console.log("GitHub sign-in initiated successfully:", data);
    return redirect(data.url);
  } 

}