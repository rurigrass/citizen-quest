import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
// import ToggleColorMode from '../components/ToggleColorMode';
import ToggleLanguage from '../components/ToggleLanguage';
import en from '../content/en';
import es from '../content/es';
import { IQuestion, IState } from '../typings';
import { supabase } from '../lib/supabaseClient';
import Question from '../components/Question';
import Header from '../components/Header';
import Answers from '../components/Answers';

export default function Home() {
  const initialState = {
    showExercise: true,
    showGameSettings: false,
    quizQuestions: [],
    isExerciseDone: false,
    score: 0
  };

  const [state, setState] = useState<IState>(initialState)
  const { showExercise, showGameSettings, quizQuestions, isExerciseDone, score } = state;

  // const [isExerciseShown, setIsExerciseShown] = useState(false)


  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const { locale, locales } = useRouter()
  const lang = locale === "en-UK" ? en : es;
  // const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  // const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  // const { isOpen, onToggle } = useDisclosure()
  // console.log(state);



  //LOGIN STUFF
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

  //FETCH THE QUESTIONS
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase.from("questions").select()
        if (error) throw error;
        setState(state => ({ ...state, quizQuestions: data }))
      } catch (error: any) { alert(error.message) }
    };
    fetchQuestions()
  }, [])

  return (
    <>
      <Head>
        <title>Citizen Quest</title>
      </Head>
      <Header />
      <div className='h-screen -mt-14 bg-nice-orange flex min-h-screen justify-center items-center'>
        <div className='bg-nice-green p-9 text-center rounded-xl border-b-8 border-r-8 border-blacks outline outline-1 outline-black flex flex-col'>
          {!showExercise ? (
            <>
              <h1 className='font-bold text-4xl text-nice-purple mb-7'>{lang.menu.title}</h1>
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1' onClick={() => setState({ ...state, showGameSettings: !showGameSettings })}>New Game</button>
              {showGameSettings &&
                <div className='bg-nice-orange p-5 rounded-lg border-t-4 border-l-4 border-black outline outline-1 outline-black my-4'>
                  {/* setting sliders go here */}
                  <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1' onClick={() => setState({ ...state, showExercise: true })}>Start Game</button>
                </div>
              }
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'>Leaderboard</button>
            </>
          ) : (
            <>
              {quizQuestions &&
                <>
                  <Question
                    questions={quizQuestions}
                  />
                  <button className='button bg-nice-greenMiddle mt-8 mx-32 hover:text-white' onClick={() => console.log(state)}>Select</button>
                </>
              }
            </>
          )}
        </div>
      </div>
    </>
  )
}
