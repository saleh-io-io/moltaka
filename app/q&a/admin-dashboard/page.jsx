'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const QR_SIZE = 180;
const DOT_SIZE = 18;
const GRID = 5;
const gridSize = DOT_SIZE * GRID;
const offset = (QR_SIZE - gridSize) / 2;

const qrData = [
    1, 0, 1, 0, 1,
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
];

const fakeDigits = '482195736';

// Demo users
const demoUsers = [
    { name: 'Alice', mic: false, hand: true },
    { name: 'Bob', mic: true, hand: false },
    { name: 'Charlie', mic: false, hand: false },
];

// Demo Q&A forum data
const demoForum = [
    {
        user: 'Alice',
        question: 'How do I join the event?',
        answer: 'You can join by entering the 9-digit code provided.',
    },
    {
        user: 'Bob',
        question: 'Is there a recording available?',
        answer: 'Yes, the session will be recorded and shared later.',
    },
    {
        user: 'Charlie',
        question: 'Can I ask anonymous questions?',
        answer: 'Currently, all questions are linked to your username.',
    },
];

export default function QRCodePage() {
    const router = useRouter();
    const [showQR, setShowQR] = useState(false);

    return (
        <main className="flex flex-row items-start justify-center min-h-screen bg-gray-900 text-gray-50 relative">
            {/* Back Button outside the container */}
            <button
                className="absolute top-8 left-8 bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-600 z-10"
                onClick={() => router.push('/')}
            >
                ← Back
            </button>
            {/* Toggle QR Button */}
            <button
                className="absolute top-24 left-8 bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600 z-10"
                onClick={() => setShowQR((prev) => !prev)}
            >
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {/* QR Code Container */}
            {showQR && (
                <div className="absolute top-40 left-8 bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center z-20">
                    <div className="w-48 h-48 flex items-center justify-center mb-6">
                        <svg
                            viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
                            className="w-full h-full bg-gray-900 rounded-xl"
                        >
                            {qrData.map((dot, i) => {
                                const x = (i % GRID) * DOT_SIZE + offset;
                                const y = Math.floor(i / GRID) * DOT_SIZE + offset;
                                return (
                                    <rect
                                        key={i}
                                        x={x}
                                        y={y}
                                        width={DOT_SIZE}
                                        height={DOT_SIZE}
                                        rx={4}
                                        fill={dot ? '#fafafa' : '#1f2937'}
                                    />
                                );
                            })}
                            {[0, 4, 20].map((idx, i) => {
                                const x = (idx % GRID) * DOT_SIZE + offset;
                                const y = Math.floor(idx / GRID) * DOT_SIZE + offset;
                                return (
                                    <rect
                                        key={`finder-${i}`}
                                        x={x - 6}
                                        y={y - 6}
                                        width={DOT_SIZE + 12}
                                        height={DOT_SIZE + 12}
                                        rx={6}
                                        fill="none"
                                        stroke="#fafafa"
                                        strokeWidth={4}
                                    />
                                );
                            })}
                        </svg>
                    </div>
                    <div className="font-mono text-2xl tracking-widest text-gray-50 bg-gray-800 px-6 py-2 rounded-lg shadow-md select-all">
                        {fakeDigits}
                    </div>
                    <button
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => setShowQR(false)}
                    >
                        Close QR
                    </button>
                </div>
            )}

            {/* Forum Q&A Section */}
            <section className="flex-1 flex flex-col items-center justify-start min-h-screen py-24">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-white text-center">Q&amp;A Forum</h2>
                    <div className="flex flex-col gap-6">
                        {demoForum.map((item, idx) => (
                            <div key={idx} className="bg-gray-700 rounded p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-blue-300">{item.user}</span>
                                    {/* Show user icons */}
                                    {demoUsers.find(u => u.name === item.user)?.mic && (
                                        <span className="ml-1 text-green-400" title="Mic On">🎤</span>
                                    )}
                                    {demoUsers.find(u => u.name === item.user)?.hand && (
                                        <span className="ml-1 text-yellow-400" title="Hand Raised">✋</span>
                                    )}
                                </div>
                                <div className="mb-1">
                                    <span className="font-semibold text-white">Q:</span> {item.question}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">A:</span> {item.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Users Sidebar */}
            <aside className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-lg mt-24 ml-8 min-w-[220px]">
                <h3 className="text-lg font-semibold mb-2 text-white">Demo Users</h3>
                {demoUsers.map((user, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-700 rounded px-3 py-2">
                        <span className="font-medium">{user.name}</span>
                        <button
                            className={`ml-2 px-2 py-1 rounded ${user.mic ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                            disabled
                        >
                            🎤
                        </button>
                        {user.hand && <span title="Hand Raised" className="text-yellow-400 text-xl">✋</span>}
                    </div>
                ))}
            </aside>
        </main>
    );
}
