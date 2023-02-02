import { useState } from "react"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Header from "../components/Header";

const SignUp = () => {
    const [username, setUsername] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();

    const signUpWithEmail = async () => {
        try {
            if (email && password) {
                const resp = await supabase.auth.signUp({
                    email: email,
                    password: password
                });
                if (resp.error) throw resp.error;
                const userId = resp.data.user?.id
                if (userId && username) {
                    await createUser(userId, username);
                }
                console.log("userId: ", userId);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (userId: string, username: string) => {
        try {
            const { error } = await supabase.from("users").insert({ id: userId, username: username });
            if (error) throw error
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <>
            <Header />
            <div className="bg-nice-orange -mt-14">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="px-8 py-6 mt-4 bg-nice-green border-b-8 border-r-8 outline outline-1 rounded-xl">
                        <h3 className="text-3xl font-bold text-center text-nice-purple">Sign Up</h3>
                        {/* <p>Enter your e-mail and password to sign up</p> */}
                        <div>
                            <div className="mt-4">
                                <label className="block" htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-nice-purple"
                                    placeholder="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
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
                            <div className="mt-4 grid justify-items-end">
                                <div>
                                    <button
                                        className="button bg-nice-greenMiddle text-white mx-auto disabled:opacity-50 hover:ml-1"
                                        onClick={signUpWithEmail}
                                    >Sign Up</button>
                                </div>
                                {/* <a href="#" className="text-sm hover:underline">Forgot password?</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
