import { useState } from "react"
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

const Login = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();

    const signInWithEmail = async () => {
        try {
            if (email && password) {
                const resp = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                if (resp.error) throw resp.error;
                const userId = resp.data.user?.id
                console.log("userId: ", userId);
                router.push("/");
            }
        } catch { }
    }

    return (
        <>
            <Header />
            <div className="bg-nice-orange -mt-14">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="px-8 py-6 mt-4 text-left bg-nice-green shadow-lg border-b-8 border-r-8 outline outline-1 rounded-xl">
                        <h3 className="text-3xl font-bold text-center text-nice-purple">Log In</h3>
                        {/* <p>Enter your e-mail and password to login </p> */}
                        <div>
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-nice-purple "
                                    placeholder="you@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-nice-purple"
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    className="button bg-nice-greenMiddle text-white mx-auto disabled:opacity-50 hover:ml-1"
                                    onClick={signInWithEmail}
                                >Login</button>
                            </div>
                            <div className="mt-4 flex items-baseline justify-between space-x-2">
                                <a href="#" className="text-sm hover:underline hover:text-nice-blue" onClick={() => router.push("/signup")}>Sign Up</a>
                                <a href="#" className="text-sm hover:underline">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
