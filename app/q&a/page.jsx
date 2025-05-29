import React from 'react' 
import '../globals.css';

export default function page() {
  return (
    <main className="flex justify-center items-center min-h-screen gap-10 flex-col">
        <div>
            <h3>Enter your Question</h3>
        </div>
        <form className="flex flex-col  items-center w-1/3 gap-2.5">
            <input type="text" placeholder="Type your question here..." className="border p-2 " />
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 mx-22 self-end">Submit</button>
        </form>
    </main>
  )
}
