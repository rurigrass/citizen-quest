import Link from "next/link"
import Router, { useRouter } from "next/router"
import { supabase } from "../lib/supabaseClient";
import ToggleLanguage from "./ToggleLanguage"

const Header = ({ isAuth = false, signOut = null }: { isAuth?: boolean, signOut?: any }) => {
    const router = useRouter();
    const { locale, locales } = useRouter()

    return (
        <header className="flex justify-between px-5 py-2 h-14 bg-nice-purple sticky border-b-2 border-b-black">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <h1 className="text-xl sm:text-3xl font-bold" onClick={() => router.pathname === "/" && router.reload()}>Citizen Quest</h1>
                </Link>
            </div>
            <div className="flex items-center text-green-green">
                {isAuth ?
                    <button className="button bg-nice-yellow hover:bg-nice-blue hover:text-white m-1 py-1 hover:ml-1.5" onClick={signOut}>Sign out</button>
                    :
                    <button className="button bg-nice-yellow hover:bg-nice-blue hover:text-white m-1 py-1 hover:ml-1.5" onClick={() => router.push("/login")}>Login</button>
                }
                <ToggleLanguage locales={locales} />
            </div>
        </header >
    )
}

export default Header