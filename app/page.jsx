import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen gap-10 flex-col bg-gray-900">
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
  );
}











































































































































