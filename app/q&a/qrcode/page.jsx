'use client';
import React from 'react';

const QR_SIZE = 180;
const DOT_SIZE = 18;
const GRID = 5;

// Calculate offset to center the grid
const gridSize = DOT_SIZE * GRID;
const offset = (QR_SIZE - gridSize) / 2;

// Static fake QR data (5x5 grid, 1=light dot, 0=dark dot)
const qrData = [
    1, 0, 1, 0, 1,
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
];

// Static fake digits
const fakeDigits = '482195736';

export default function QRCodePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                {/* QR code container */}
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
                        {/* Add three finder patterns for realism */}
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
                {/* Static digits below */}
                <div className="font-mono text-2xl tracking-widest text-gray-50 bg-gray-800 px-6 py-2 rounded-lg shadow-md select-all">
                    {fakeDigits}
                </div>
            </div>
        </main>
    );
}
