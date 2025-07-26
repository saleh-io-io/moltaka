import '../globals.css';
import { login, signup, loginWithGithub } from './acion-server';


export default function SignInPage() {
    return (
        <main className="min-h-screen justify-center items-center bg-gray-900 flex flex-col gap-10">
            <form className='flex justify-center items-center h-full  gap-10 flex-col' >
                <h1 className="text-4xl font-bold mb-2">Moltaka</h1>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                {/* signin with github button */}
                <button formAction={login}>
                    <h3 className="text-2xl font-bold mb-4">Login</h3>
                </button>
                <button formAction={signup}>
                    <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
                </button>
            </form>
            <form className='flex justify-center items-center  gap-10 flex-col' >            <button formAction={loginWithGithub} >
                <h3 className="text-2xl font-bold mb-4">Sign in with GitHub</h3>
            </button>
            </form>


        </main>
    )
}
