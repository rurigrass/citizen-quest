import { useRouter } from 'next/router';
import { useState } from 'react';
import { IQuestion, IQuiz } from '../typings';

const Quiz = ({ questions }: { questions: IQuestion[] }) => {
    const { locale, locales } = useRouter();
    const labels = ["A", "B", "C", "D", "E"];
    const lang = locale?.slice(0, 2) === "en" ? "en" : "es";
    const initialState: IQuiz = {
        currentQuestion: 0,
        answers: [],
        selectedAnswer: "",
        numberOfQuestions: 0,
        progress: 0,
    };

    const [state, setState] = useState(initialState);
    const [showAnswer, setShowAnswer] = useState(false)
    let { currentQuestion, answers, numberOfQuestions, selectedAnswer, progress } = state;
    const question = questions[currentQuestion];
    numberOfQuestions = questions.length;
    progress = Math.round(currentQuestion / numberOfQuestions * 100)

    // console.log("these are the answers", answers, "current question", currentQuestion, answers[currentQuestion - 1]);
    const isAnswerCorrect = (answer: boolean) => (
        <>{answer ? (<div>true!</div>) : (<div>false!</div>)}</>
    )

    const checkAnswer = () => {
        setShowAnswer(true)
        setState({
            ...state,
            currentQuestion: ++currentQuestion,
            answers: [...state.answers, state.selectedAnswer === question.answer[lang]],
            selectedAnswer: "",
        })
        setTimeout(() => {
            setShowAnswer(false)
        }, 5000);
    }

    return (
        <div className='relative'>
            {question &&
                <>
                    {progress >= 0 &&
                        <div className='absolute -top-7 left-0 right-0 mx-auto w-3/4 bg-nice-yellow h-4 rounded-full outline outline-1 outline-black border-b-4 border-r-4'>
                            <div className={`relative bg-nice-purple h-3 w-[${progress}%] rounded-xl `} >
                                <div className='absolute w-1/3 bg-white opacity-20 h-1 right-2 top-0.5 rounded-full' />
                                {/* {progress} */}
                            </div>
                        </div>
                    }
                    <div className='py-9 px-3 md:px-9 flex flex-col'>
                        <h2 className='font-bold text-4xl font-outline-1 text-nice-purple mb-7'>{question.question[lang]}</h2>
                        {showAnswer === false ?
                            question.answers[lang].map(
                                (answer, i) => (
                                    <button className={answer === selectedAnswer ? 'button-pressed bg-nice-purple text-white' : 'button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'} key={i} onClick={() => setState({ ...state, selectedAnswer: question.answers[lang][i] })
                                    }>
                                        {labels[i]}: {answer}
                                    </button>))
                            : isAnswerCorrect(answers[currentQuestion - 1])
                        }
                        <button className='button bg-nice-greenMiddle text-white w-1/2 mx-auto disabled:opacity-50 m-1 mt-4' disabled={selectedAnswer === "" || showAnswer === true ? true : false} onClick={() => checkAnswer()}>Select</button>
                    </div>
                </>
            }
        </div>
    )

}

export default Quiz