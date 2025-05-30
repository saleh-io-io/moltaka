import '../globals.css';


export default function SignInPage() {
return (    
    <main className="flex justify-center items-center min-h-screen gap-10 flex-col">
        <div>
        {/* signin with github button */}
        <button 
            // onClick={() => window.location.href = '/auth/github'}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">

        <h3 className="text-2xl font-bold mb-4">Sign In with github</h3>
        </button>

        </div>
    </main>
)
}
