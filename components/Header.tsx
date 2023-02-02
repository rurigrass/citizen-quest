import Link from "next/link"
import Router, { useRouter } from "next/router"
import { supabase } from "../lib/supabaseClient";
import ToggleLanguage from "./ToggleLanguage"

const Header = ({ isAuth = false, signOut = null }: { isAuth?: boolean, signOut?: any }) => {
    const router = useRouter();
    const { locale, locales } = useRouter()

    console.log("HEADERAUTH?: ", isAuth);


    return (
        <header className="flex justify-between px-5 py-2 h-14 bg-nice-purple sticky border-b-2 border-b-black">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <h1 className="text-3xl font-bold" onClick={() => router.pathname === "/" && router.reload()}>Citizen Quest</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-1 text-green-green">
                <ToggleLanguage locales={locales} />
                {isAuth &&
                    <button className="button bg-nice-yellow hover:bg-nice-blue hover:text-white m-1 py-1" onClick={signOut}>Sign out</button>
                }
            </div>
        </header >
    )
}

export default Header