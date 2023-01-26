import { useRouter } from 'next/router';
import { useState } from 'react';
import { IQuestion, IQuiz } from '../typings';
import { motion } from "framer-motion";
import ResizeablePanel from './ResizeablePanel';

const Quiz = ({ questions }: { questions: IQuestion[] }) => {
    const { locale, locales } = useRouter();
    const labels = ["A", "B", "C", "D", "E"];
    const lang = locale?.slice(0, 2) === "en" ? "en" : "es";
    const initialState: IQuiz = {
        currentQuestion: 0,
        answers: [],
        selectedAnswer: "",
        numberOfQuestions: 0,
    };

    const [state, setState] = useState(initialState);
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    let { currentQuestion, answers, selectedAnswer, numberOfQuestions } = state;
    const question = questions[currentQuestion];
    numberOfQuestions = questions.length;
    let progress = Math.round(currentQuestion / numberOfQuestions * 100)

    console.log(state);


    const checkAnswer = () => {
        setShowAnswer(true)
        setState({
            ...state,
            answers: [...state.answers, state.selectedAnswer === question.answer[lang]],
            selectedAnswer: "",
        })
    }

    const nextQuestion = () => {
        setShowAnswer(false)
        setState({ ...state, currentQuestion: ++currentQuestion, })
    }

    const isAnswerCorrect = (answer: boolean) => {
        return (
            <>{answer ? (
                <h2 className='text-nice-greenMiddle text-4xl font-bold'>
                    Correct!
                </h2>
            ) : (
                <h2 className='text-nice-red text-4xl font-bold'>
                    Incorrect
                </h2>)}</>
        )
    }

    return (
        <div className='relative'>
            {progress >= 0 &&
                <div
                    className='absolute -top-16 left-0 right-0 mx-auto w-3/4 bg-nice-yellow h-4 rounded-full outline outline-1 outline-black border-b-4 border-r-4'>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative bg-nice-purple h-3 transition rounded-xl" >
                        <div className='absolute w-1/3 bg-white opacity-20 h-1 right-2 top-0.5 rounded-full' />
                    </motion.div>
                </div>
            }
            {question !== undefined ?
                <>
                    <div className=' flex flex-col'>
                        {showAnswer === false ?
                            <>
                                <h2 className='font-bold text-4xl font-outline-1 text-nice-purple mb-7'>{question.question[lang]}</h2>
                                {question.answers[lang].map(
                                    (answer, i) => (
                                        <button className={answer === selectedAnswer ? 'button-pressed bg-nice-purple text-white' : 'button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'} key={i} onClick={() => setState({ ...state, selectedAnswer: question.answers[lang][i] })
                                        }>
                                            {labels[i]}: {answer}
                                        </button>))}
                                <button className='button bg-nice-greenMiddle text-white w-1/2 mx-auto disabled:opacity-50 m-1 mt-4' disabled={state.selectedAnswer === ""} onClick={() => checkAnswer()}>Check</button>
                            </>
                            :
                            <>
                                {isAnswerCorrect(answers[currentQuestion])}
                                <div className='font-bold text-2xl font-outline-1 text-nice-purple my-4 space-y-4'>
                                    <p>{question.question[lang]} </p>
                                    <ResizeablePanel>
                                        <div className='text-nice-greenMiddle text-2xl p-4 bg-nice-yellow rounded-lg border-t-4 border-l-4 border-black'>
                                            {question.answer[lang]}
                                        </div>
                                    </ResizeablePanel>
                                </div>
                                <button className='button bg-nice-greenMiddle text-white w-1/2 mx-auto disabled:opacity-50 m-1 mt-4' onClick={() => nextQuestion()}>Next Question</button>
                            </>
                        }
                    </div>
                </>
                :
                <>
                    good job
                    {/* ONLY SHOW ONCE COMPLETED */}
                </>
            }
        </div >
    )

}

export default Quiz