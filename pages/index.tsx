import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
// import ToggleColorMode from '../components/ToggleColorMode';
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
  // const boxBackground = useColorModeValue("niceGreen", "niceBlue")
  // const mainBackground = useColorModeValue("niceOrange", "nicePurple")
  // const { isOpen, onToggle } = useDisclosure()



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
    <h1 className="text-4xl font-bold underline text-nice-blue bg-nice-purple">
      Hello world!
      <div className='bg-nice-purple h-10 w-10' ></div>
    </h1>
    // <>
    //   <Head>
    //     <title>Citizen Quest</title>
    //   </Head>
    //   <div>
    //     <ToggleLanguage locales={locales} />
    //     {/* <ToggleColorMode /> */}
    //   </div>
    //   <div>
    //     <div>
    //       {!isExerciseShown ? (
    //         <>
    //           <h2 className='font-bold text-3xl text-nice-blue'>{lang.menu.title}</h2>
    //           <button onClick={() => console.log('click')}>New Game</button>
    //           {/* look this up its cool <Collapse in={isOpen} animateOpacity> */}
    //           <div>
    //             <button onClick={() => setState({ ...state, isExerciseShown: true })}>Start Game</button>
    //           </div>
    //           {/* </Collapse> */}
    //           <button>Leaderboard</button>
    //         </>
    //       ) : (
    //         <>
    //           {questions &&
    //             <Question
    //               questions={questions}
    //             />
    //           }
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </>
  )
}
