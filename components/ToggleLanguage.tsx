/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';

const ToggleLanguage = ({ locales }: { locales: string[] | undefined }) => {
    const router = useRouter()
    const { asPath, locale } = router;
    // console.log(locale);

    return (

        <div>
            <button>
                {locale?.substring(0, 2)}
            </button>
            <div>
                {locales && locales.map((l, i) =>
                    <Link key={i} href={asPath} locale={l}>
                        <div>
                            <img
                                src='https://placekitten.com/100/100'
                                alt='Fluffybuns the destroyer'
                            />
                            <p>{l.substring(0, 2)}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ToggleLanguage