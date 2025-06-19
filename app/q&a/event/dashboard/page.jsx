'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Demo users for the right panel
const demoUsers = [
    { name: "Alice", mic: true, hand: false, status: "mic opened" },
    { name: "Bob", mic: false, hand: true, status: "raising hand" },
    { name: "Charlie", mic: false, hand: false, status: "mic closed" },
    { name: "Dave", mic: false, hand: false, status: "mic closed" },
    { name: "Eve", mic: false, hand: true, status: "raising hand" },
];

export default function EventDashboardPage() {
    const [showQR, setShowQR] = useState(false);
    const router = useRouter();

    return (
        <main className="flex flex-row items-start min-h-screen bg-gray-900 text-gray-50 relative w-full">
            {/* QR Toggle Button and QR Code at the very top, not affecting messages */}
            <div className="absolute top-8 left-8 flex flex-col items-start z-20">
                <button
                    className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    onClick={() => setShowQR((prev) => !prev)}
                >
                    {showQR ? 'Hide QR Code' : 'Show QR Code'}
                </button>
                {showQR && (
                    <div className="mt-4">
                        <Image
                            src="/qrcodesample.jpg"
                            quality={10}
                            width={300}
                            height={300}
                            alt="QR Code"
                            className="mb-4"
                        />
                    </div>
                )}
            </div>
            {/* Back Button */}
            <button
                className="absolute top-8 right-8 bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-600 z-20"
                onClick={() => router.push('/')}
            >
                ← Back
            </button>
            {/* Main Q&A/messages area */}
            <div className="flex-1 flex flex-col items-center mt-24">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center mt-8">
                    <MessagesList
                        messages={[
                            { user: "Alice", text: "How do I join the event?" },
                            { user: "Bob", text: "Is there a recording available?" },
                            { user: "Charlie", text: "Can I ask anonymous questions?" },
                            { user: "Dave", text: "What time does it start?" },
                            { user: "Eve", text: "Will there be a Q&A session?" },
                            { user: "Frank", text: "How do I submit my question?" },
                            { user: "Grace", text: "Is there a dress code?" },
                            { user: "Heidi", text: "Can I bring a guest?" },
                            { user: "Ivan", text: "What platform are we using?" },
                            { user: "Judy", text: "Are there any prerequisites?" },
                            { user: "Karl", text: "How long will the event last?" },
                            { user: "Leo", text: "Will there be any breaks?" },
                            { user: "Mallory", text: "How do I access the event materials?" }
                        ]}
                    />
                </div>
            </div>
            {/* Right panel: users list */}
            <UserPanel users={demoUsers} />
        </main>
    );
}

// Separate functional component for messages
function MessagesList({ messages }) {
    const [replyIndex, setReplyIndex] = useState(null);
    const [replyText, setReplyText] = useState('');

    if (!Array.isArray(messages) || !messages.length) {
        return <div className="text-gray-400">No messages found.</div>;
    }

    const handleReplyClick = (idx) => {
        setReplyIndex(idx);
        setReplyText('');
    };

    const handleSendReply = () => {
        alert(`Reply sent: ${replyText}`);
        setReplyIndex(null);
        setReplyText('');
    };

    return (
        <ul className="space-y-2 mt-4">
            {messages.map((msg, idx) => (
                <li key={idx} className="bg-gray-700 rounded px-4 py-2 flex flex-col gap-2">
                    <div>
                        <span className="font-semibold text-blue-300">{msg.user || 'User'}:</span>{' '}
                        <span>{msg.text || msg.message || ''}</span>
                    </div>
                    <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 w-max"
                        onClick={() => handleReplyClick(idx)}
                    >
                        Send Reply
                    </button>
                    {replyIndex === idx && (
                        <div className="flex flex-col gap-2 mt-2">
                            <input
                                type="text"
                                className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white"
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                            />
                            <button
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-max"
                                onClick={handleSendReply}
                                disabled={!replyText.trim()}
                            >
                                Send
                            </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}

// Separate functional component for the user panel
function UserPanel({ users }) {
    return (
        <aside className="w-72 min-w-[220px] bg-gray-800 p-6 rounded-lg shadow-lg mt-24 mr-8 flex flex-col gap-4 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-2 text-white">Users</h3>
            {users.map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-700 rounded px-3 py-2">
                    <span className="font-medium">{user.name}</span>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.status === "mic opened"
                                ? "bg-green-600 text-white"
                                : user.status === "raising hand"
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-500 text-white"
                        }`}
                    >
                        {user.status}
                    </span>
                    <span
                        className={`ml-2 text-xl ${
                            user.mic
                                ? "text-green-400"
                                : "text-gray-400"
                        }`}
                        title={user.mic ? "Mic Opened" : "Mic Closed"}
                    >
                        🎤
                    </span>
                    {user.hand && (
                        <span title="Hand Raised" className="text-yellow-400 text-xl">✋</span>
                    )}
                </div>
            ))}
        </aside>
    );
}