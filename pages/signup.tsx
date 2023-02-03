import { useState } from "react"
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import ResizeablePanel from "../components/Motion/ResizeablePanel";
import { GetServerSideProps } from "next";

const SignUp = (user: any) => {
    const [username, setUsername] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false)

    console.log(user);


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
                setSignUpSuccess(true)
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
                        {!signUpSuccess ?
                            <>
                                <h3 className="text-3xl font-bold text-center text-nice-purple">Sign Up</h3>
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
                            </>
                            :
                            <>
                                <h3 className="text-3xl font-bold text-center text-nice-purple mb-4">Sign Up Successful</h3>
                                <ResizeablePanel>
                                    <div className="bg-nice-yellow p-5 rounded-lg border-t-4 border-l-4 border-black outline outline-1 outline-black">
                                        <p>📩 Please Check your email to verify your account</p>
                                    </div>
                                </ResizeablePanel>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default SignUp

export const getServerSideProps = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log("user ", user);
    return {
        props: {
            user
        },
    }
}

