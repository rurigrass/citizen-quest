import { useState } from "react"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Header from "../components/Header";

const SignUp = () => {
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
                console.log("userId: ", userId);
                router.push("/");
            }
        } catch { }
    }

    return (
        <>
            <Header />
            <div className="h-screen -mt-14 bg-nice-orange flex min-h-screen justify-center items-center">
                <div className="bg-nice-green mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 text-center rounded-xl border-b-8 border-r-8 border-blacks outline outline-1 outline-black flex flex-col ">
                    <div>
                        <h2 className="text-4xl font-bold text-nice-purple">Sign Up</h2>
                        <p>Enter your e-mail and password to sign up</p>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-nice-purple mt-4"
                        >E-mail Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-4/5 m-auto rounded-md shadow-sm  focus:ring-nice-purple focus:ring-2 focus:bg-nice-yellow sm:text-md"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-nice-purple mt-4"
                        >Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-4/5 m-auto rounded-md shadow-sm  focus:ring-nice-purple focus:ring-2 focus:bg-nice-yellow sm:text-md"
                            placeholder="password"
                        />
                    </div>
                    <button>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default SignUp
