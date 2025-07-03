'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, loginAsAnonymous } from '@/app/login/acion';

export default function JoinPage() {
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 9);
        setCode(value);
        setError('');
    };

    const handleSubmit = (e) => {
        
        e.preventDefault(); 

        if (code.length !== 9) {
            setError('Please enter a valid 9-digit code.');
            return;
        }
        if (!username.trim()) {
            setError('Please enter your name.');
            return;
        }
        loginAsAnonymous(username)
        router.push('/q&a');

    };   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Enter 9-Digit Code</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />
                    <input
                        type="text"
                        value={code}
                        onChange={handleChange}
                        maxLength={9}
                        pattern="\d{9}"
                        placeholder="Enter code"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <div className="text-red-600 mb-3">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
}