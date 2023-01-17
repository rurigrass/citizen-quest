/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ToggleLanguage = ({ locales }: { locales: string[] | undefined }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const router = useRouter()
    const { asPath, locale } = router;
    // console.log(locales.filter(language => language !== locale));
    console.log(dropdownOpen);



    return (
        <div className="relative">
            <button className='button bg-nice-yellow hover:bg-nice-blue hover:text-white m-1 py-1' onClick={(e) => { e.preventDefault(), setDropdownOpen(!dropdownOpen) }}>
                {locale?.substring(0, 2)}
            </button>
            {dropdownOpen &&
                <>
                    <button onClick={(e) => { e.preventDefault(), setDropdownOpen(false) }} className="fixed w-full h-full bg-nice-purple opacity-50 inset-0 z-10 cursor-default"></button>
                    <ul className='absolute mt-1 right-1 z-20 bg-white rounded-xl overflow-auto'>
                        {locales && locales.filter(language => language !== locale).map((l, i) =>
                            <Link key={i} href={asPath} locale={l}><li className='button bg-nice-yellow hover:bg-nice-blue hover:text-white py-1' key={i}>{l.substring(0, 2)}</li></Link>
                        )}
                    </ul>
                </>
            }
        </div>
        // <select >
        //     <option>{locale?.substring(0, 2)}</option>
        //     {locales && locales.filter(language => language !== locale).map((l, i) =>
        //         <option key={i}><Link key={i} href={asPath} locale={l}>{l.substring(0, 2)}</Link></option>
        //     )}
        // </select>
    )
}

export default ToggleLanguage