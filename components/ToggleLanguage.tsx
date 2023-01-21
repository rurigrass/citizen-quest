/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Backdrop from './Backdrop';

const ToggleLanguage = ({ locales }: { locales: string[] | undefined }) => {
    const router = useRouter()
    const { asPath, locale } = router;
    const [dropdownOpen, setDropdownOpen] = useState(true)
    const openDropdown = () => setDropdownOpen(true)
    const closeDropdown = () => setDropdownOpen(false)

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 50,
                stiffness: 500
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        },
    }

    return (
        <div>
            <button className={dropdownOpen ? 'button-pressed bg-nice-blue text-white m-1 py-1' : 'button bg-nice-yellow hover:bg-nice-blue hover:text-white m-1 py-1'}
                onClick={() => (dropdownOpen ? closeDropdown() : openDropdown())}>
                {locale?.substring(0, 2)}
            </button>
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {
                    dropdownOpen &&
                    <Backdrop onClick={() => dropdownOpen ? closeDropdown() : openDropdown()}>
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            variants={dropIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ul className='absolute mt-12 right-[102px] z-20 rounded-xl overflow-auto'>
                                {locales && locales.filter(language => language !== locale).map((l, i) =>
                                    <Link key={i} href={asPath} locale={l}><li className='z-30 button bg-nice-yellow hover:bg-nice-blue hover:text-white py-1' key={i}>{l.substring(0, 2)}</li></Link>
                                )}
                            </ul>
                        </motion.div>
                    </Backdrop>
                }
            </AnimatePresence>
        </div >
    )
}

export default ToggleLanguage