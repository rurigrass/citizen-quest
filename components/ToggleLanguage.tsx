import Link from 'next/link';
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useRouter } from 'next/router';



const ToggleLanguage = ({ locales }: { locales: string[] | undefined }) => {
    const router = useRouter()
    const { asPath, locale } = router;
    // console.log(locale);


    return (

        <Menu>
            <MenuButton as={Button} variant="solid"
            // rightIcon={<ChevronDownIcon />}
            >
                {locale?.substring(0, 2)}
            </MenuButton>
            <MenuList>
                {locales && locales.map((l, i) =>
                    <Link key={i} href={asPath} locale={l}>
                        <MenuItem minH='48px'>
                            <Image
                                boxSize='2rem'
                                borderRadius='full'
                                src='https://placekitten.com/100/100'
                                alt='Fluffybuns the destroyer'
                                mr='12px'
                            />
                            <p>{l.substring(0, 2)}</p>
                        </MenuItem>
                    </Link>
                )}
            </MenuList>
        </Menu>
    )
}

export default ToggleLanguage