'use client'
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from '@/utils/supabase/client';

export default function NewEventPage() {
    // Check if the user is logged in
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the name value here if needed
        router.push("/q&a/event/dashboard");
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
            setIsLoading(false);
        }

        checkLoginStatus();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
    }

    // If the user is not logged in, SHOW A BUTTON TO REDIRECT TO LOGIN PAGE
    // If the user is logged in, show the form to create a new Q&A event
    if (!isLoggedIn) {
        return (
            <main className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center gap-6">
                    <h1 className="text-4xl font-bold text-white mb-2">Moltaka</h1>
                    <h2 className="text-white text-xl">Please login to create a new event</h2>
                    <Link href="/login" className="text-blue-400 hover:underline text-2xl">
                        Login
                    </Link>

                </div>
            </main>
        );
    }


    return (
        <main className="flex justify-center items-center min-h-screen gap-10 flex-col bg-gray-900">
            <div className="max-w-md mx-auto mt-8 p-6 border border-gray-700 rounded-lg shadow bg-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-white">Create Q&amp;A Event</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="qna-name" className="block mb-2 font-medium text-gray-200">
                        Q&amp;A Name:
                    </label>
                    <input
                        id="qna-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Create
                    </button>
                </form>
            </div>




        </main>
    );
}