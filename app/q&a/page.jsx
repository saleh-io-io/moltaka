'use client';
import React, { useState, useRef } from 'react';
import '../globals.css';

export default function Page() {
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Voice recording logic
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }
    if (!recording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        setQuestion(event.results[0][0].transcript);
        setRecording(false);
      };
      recognition.onend = () => setRecording(false);
      recognition.onerror = () => setRecording(false);
      recognition.start();
      recognitionRef.current = recognition;
      setRecording(true);
    } else {
      recognitionRef.current && recognitionRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === '') return;
    setSubmitted(true);
  };

  const handleAskAnother = () => {
    setQuestion('');
    setSubmitted(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen gap-10 flex-col bg-gray-900">
      <div className='bg-gray-800 p-10 rounded-lg shadow-lg flex flex-col items-center gap-6'>
        <div className='flex flex-col items-center gap-2'>
          <h3>Enter your Question</h3>
        </div>
        {!submitted ? (
          <form className="flex flex-col items-center gap-4 w-full max-w-md" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your question here..."
              className="border p-2 w-full"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <button
              type="button"
              className={`bg-gray-700 text-white p-2 rounded ${recording ? 'bg-red-500' : ''}`}
              onClick={handleVoiceInput}
              disabled={recording}
            >
              {recording ? 'Recording...' : '🎤 Record Voice'}
            </button>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 self-end rounded">
              Submit
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-green-400">Your question has been submitted!</p>
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleAskAnother}
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
