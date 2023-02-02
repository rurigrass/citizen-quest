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
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  const initialState = {
    showExercise: false,
    showGameSettings: false,
    quizQuestions: [],
    showLeaderboard: false,
    scores: [],
  };

  const [state, setState] = useState<IState>(initialState)
  const { showExercise, showGameSettings, quizQuestions, showLeaderboard, scores } = state;
  const { locale, locales } = useRouter()
  const lang = locale?.slice(0, 2) === "en" ? en : es;
  // const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  // const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();

  console.log(isAuthenticated);


  //FETCH USER
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
        const { data } = await supabase.from("users").select("username").match({ id: userId })
        if (data) {
          setUserName(data[0].username)
        }
      }
    };
    getUser();
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

  // FETCH SCORES FROM HIGHEST TO LOWEST
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const { data, error } = await supabase.from("scores").select().order('score', { ascending: false })
        if (error) throw error;
        setState(state => ({ ...state, scores: data }))
      } catch (error: any) { alert(error.message) }
    };
    fetchScores()
  }, [])

  //Push completed quiz data to Scores supabase table
  const updateScore = async (answers: string[]) => {
    try {
      if (userId && answers) {
        const [number_of_questions, score] = [answers.length, answers.filter(Boolean).length]
        const { data, error } = await supabase.from("scores").insert({
          user_id: userId,
          username: userName,
          country: "spain",
          number_of_questions: number_of_questions,
          score: score
        })
        if (error) throw error;
        console.log("answers submitted: ", answers);
        console.log("pushed data: ", data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1 disabled:opacity-50' disabled={showGameSettings === true} onClick={() => setState({ ...state, showGameSettings: !showGameSettings })}>New Game</button>
              <ResizeablePanel isVisible={showGameSettings} delayTime={0.25}>

                <div className='bg-nice-orange p-5 rounded-lg border-t-4 border-l-4 border-black outline outline-1 outline-black'>
                  {/* setting sliders go here */}
                  <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1' onClick={() => setState({ ...state, showExercise: true })}>Start Game</button>
                </div>

              </ResizeablePanel>
              <button className='button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1' onClick={() => setState({ ...state, showLeaderboard: !showLeaderboard })}>Leaderboard</button>
              <ResizeablePanel isVisible={showLeaderboard} delayTime={0.25} >

                <div className='bg-nice-orange p-5 rounded-lg border-t-4 border-l-4 border-black outline outline-1 outline-black'>
                  <Leaderboard scores={scores} />
                </div>

              </ResizeablePanel>
            </>
          ) : (
            <>
              {quizQuestions &&
                <Quiz
                  questions={quizQuestions}
                  updateScore={updateScore}
                  isAuthenticated={isAuthenticated}
                />
              }
            </>
          )}
        </div>
      </div>
    </>
  )
}


