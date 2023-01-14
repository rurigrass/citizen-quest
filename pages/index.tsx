import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Heading, Button, VStack, useColorModeValue, Collapse, Box, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head'
import ToggleColorMode from '../components/ToggleColorMode';
import ToggleLanguage from '../components/ToggleLanguage';
import en from '../content/en';
import es from '../content/es';
import { IQuestion } from '../typings';
import { supabase } from '../lib/supabaseClient';
import Question from '../components/Question';

export default function Home() {
  const initialState = {
    isExerciseShown: false,
    quizQuestions: [],
    isExerciseDone: false,
    score: 0
  };

  const [state, setState] = useState(initialState)
  const { isExerciseShown, quizQuestions, isExerciseDone, score } = state;

  // const [isExerciseShown, setIsExerciseShown] = useState(false)


  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [questions, setQuestions] = useState<IQuestion[]>()
  const { locale, locales } = useRouter()
  const lang = locale === "en-UK" ? en : es;
  const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  const { isOpen, onToggle } = useDisclosure()



  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };
    getUser();
    // console.log("user id: ", userId);
  }, [userId]);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from("questions").select()
        if (error) throw error;
        setQuestions(data)
      } catch (error: any) { alert(error.message) }
    };
    fetchQuestions()
  }, [])

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
          {!isExerciseShown ? (
            <>
              <Heading mb={6}>{lang.menu.title}</Heading>
              <Button variant="solid" onClick={onToggle}>New Game</Button>
              <Collapse in={isOpen} animateOpacity>
                <Box color='white' bg='niceBlue' width="max" p={12} rounded={6} border="2px solid" borderColor='black'
                  boxShadow="0.3rem 0.3rem 0rem black inset"
                >
                  <Button variant="solid" onClick={() => setState({ ...state, isExerciseShown: true })}>Start Game</Button>
                </Box>
              </Collapse>
              <Button variant="solid">Leaderboard</Button>
            </>
          ) : (
            <>
              {questions &&
                <Question
                  questions={questions}
                />
              }
            </>
          )}
        </VStack>
      </Flex>
    </>
  )
}
