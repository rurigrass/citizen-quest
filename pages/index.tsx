import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
// import ToggleColorMode from '../components/ToggleColorMode';
import en from '../content/en';
import es from '../content/es';
import { IState } from '../typings';
import { supabase } from '../lib/supabaseClient';
import Quiz from '../components/Quiz';
import Header from '../components/Header';
import ResizeablePanel from '../components/Motion/ResizeablePanel';

export default function Home() {
  const initialState = {
    showExercise: false,
    showGameSettings: false,
    quizQuestions: [],
    isExerciseDone: false,
    score: 0
  };

  const [state, setState] = useState<IState>(initialState)
  const { showExercise, showGameSettings, quizQuestions, isExerciseDone, score } = state;
  const { locale, locales } = useRouter()
  const lang = locale?.slice(0, 2) === "en" ? en : es;
  // const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  // const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();


  const updateScore = (score: string[]) => {
    console.log("this is the score: ", score);
  }


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
        <div className='bg-nice-green mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 text-center rounded-xl border-b-8 border-r-8 border-blacks outline outline-1 outline-black flex flex-col'>
          {!showExercise ? (
            <>
              <h1 className='font-bold text-4xl text-nice-purple mb-7'>{lang.menu.title}</h1>
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1 disabled:opacity-50' disabled={state.showGameSettings === true} onClick={() => setState({ ...state, showGameSettings: !showGameSettings })}>New Game</button>
              <ResizeablePanel delayTime={0.25}>
                {showGameSettings &&
                  <div className='bg-nice-orange p-5 rounded-lg border-t-4 border-l-4 border-black outline outline-1 outline-black'>
                    {/* setting sliders go here */}
                    <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1' onClick={() => setState({ ...state, showExercise: true })}>Start Game</button>
                  </div>
                }
              </ResizeablePanel>
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'>Leaderboard</button>
            </>
          ) : (
            <>
              {quizQuestions &&
                <Quiz
                  questions={quizQuestions}
                  updateScore={updateScore}
                />
              }
            </>
          )}
        </div>
      </div>
    </>
  )
}


