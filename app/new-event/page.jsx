'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function NewEventPage() {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the name value here if needed
        router.push("/q&a/qrcode");
    };

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