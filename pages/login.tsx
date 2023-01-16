import { useState } from "react"
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

const SignUp = () => {
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

    return (<div>
        <div >
            <div >
                <h2>Log in</h2>
                <p>Enter your e-mail and password to log in</p>
            </div>
            <div>
                <label>E-mail Address</label>
                <input />
            </div>
            <div>
                <label>Password</label>
                <input />
            </div>
            <button>Login</button>
        </div>
    </div>)
}

export default SignUp
