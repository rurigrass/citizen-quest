import { useState } from "react"
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

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

    return (<div >
        <div >
            <div>
                <h2>Sign Up</h2>
                <p>Enter your e-mail and password to sign up</p>
            </div>
            <div>
                <label>E-mail Address</label>
                <input />
            </div>
            <div>
                <label>Password</label>
                <input />
            </div>
            <button>Sign Up</button>
        </div>
    </div>)
}

export default SignUp
