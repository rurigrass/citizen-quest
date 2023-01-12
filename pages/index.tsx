import { useRouter } from 'next/router';
import { Flex, Heading, Button, VStack, useColorModeValue, Collapse, Box, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head'
import ToggleColorMode from '../components/ToggleColorMode';
import ToggleLanguage from '../components/ToggleLanguage';
import en from '../content/en';
import es from '../content/es';
import { createClient } from '@supabase/supabase-js';
import { Question } from '../typings';

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  let { data } = await supabaseAdmin
    .from('questions')
    .select('*')

  console.log(data);

  return {
    props: { questions: data },
  }
}

export default function Home({ questions }: { questions: Question[] }) {
  const { locale, locales } = useRouter()
  const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  const { isOpen, onToggle } = useDisclosure()
  const lang = locale === "en-UK" ? en : es;

  console.log(questions);


  return (
    <>
      <Head>
        <title>Citizen Quest</title>
      </Head>
      <Flex w="100%" h="80px" alignItems="center" justifyContent="right" background="blue.400" padding="10px" gap="10px" borderBottom="2px solid" borderColor="black">
        <ToggleLanguage locales={locales} />
        <ToggleColorMode />
      </Flex>
      <Flex height="80vh" background={mainBackground} alignItems="center" justifyContent="center">
        <VStack direction="column" width={350} background={boxBackground} boxShadow="0.7rem 0.7rem 0rem black" p={12} rounded={6} spacing="10px" border="2px solid" borderColor='black'>
          <Heading mb={6}>{lang.menu.title}</Heading>
          <Button variant="solid" onClick={onToggle}>New Game</Button>
          <Collapse in={isOpen} animateOpacity>
            <Box color='white' bg='niceBlue' width="max" p={12} rounded={6} border="2px solid" borderColor='black'
              boxShadow="0.3rem 0.3rem 0rem black inset"
            >
              <Button variant="solid">Start Game</Button>
            </Box>
          </Collapse>
          <Button variant="solid">Leaderboard</Button>
        </VStack>
      </Flex>
    </>
  )
}
