import Link from "next/link"
import { useRouter } from "next/router"
import ToggleLanguage from "./ToggleLanguage"

const Header = () => {
    const { locale, locales } = useRouter()

    return (
        <header className="flex justify-between px-5 py-2 h-14 bg-nice-purple sticky border-b-2 border-b-black">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <h1 className="text-3xl font-bold">Citizen Quest</h1>
                </Link>
            </div>
            <div className="flex items-center space-x-5 text-green-green">
                <ToggleLanguage locales={locales} />
                <h3 className="text-white bg-green-green px-4 py-1 rounded-full">Post</h3>
            </div>
        </header>
    )
}

export default Header