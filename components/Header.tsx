import Link from "next/link"
import Router, { useRouter } from "next/router"
import ToggleLanguage from "./ToggleLanguage"

const Header = () => {
    const router = useRouter();
    const { locale, locales } = useRouter()

    return (
        <header className="flex justify-between px-5 py-2 h-14 bg-nice-purple sticky border-b-2 border-b-black">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <h1 className="text-3xl font-bold" onClick={() => router.pathname === "/" && router.reload()}>Citizen Quest</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-5 text-green-green">
                <ToggleLanguage locales={locales} />
            </div>
        </header >
    )
}

export default Header