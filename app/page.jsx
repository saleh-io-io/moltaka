import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { logout } from "./login/acion";


export default async function Home() {
  const supabase = await createClient();


  const { data: { user } } = await supabase.auth.getUser();
  console.log('user', user);
  if (user) {
    return (
      <main className="flex justify-center items-center min-h-screen gap-10 flex-col bg-gray-900">
        <form >
          <h1 className="text-4xl font-bold mb-2 text-white">Welcome, {user.user_metadata['full_name']}</h1>
          <button formAction={logout} className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
            <h3>Log out</h3>
          </button >
        </form>
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-white mb-2">Moltaka</h1>
          <h1>
            <Link href="/new-event" className="text-blue-400 hover:underline text-2xl">
              Create A New Event Q&amp;A
            </Link>
          </h1>
          <h2>
            <Link href="/q&a/join" className="text-green-400 hover:underline text-xl">
              Join Event Q&amp;A
            </Link>
          </h2>
        </div>
      </main>
    )
  }
  else {
    return (
      <main className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-white mb-2">Moltaka</h1>
          <h2 className="text-white text-xl">Please login to continue</h2>
          <Link href="/login" className="text-blue-400 hover:underline text-2xl">
            Login
          </Link>

        </div>
      </main>
    )

  }
}
