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
        progress: 0
    };

    const [state, setState] = useState(initialState);
    let { currentQuestion, answers, numberOfQuestions, selectedAnswer, progress } = state;
    const question = questions[currentQuestion];
    numberOfQuestions = questions.length;
    progress = Math.round(currentQuestion / numberOfQuestions * 100)

    // console.log("current question object", question.question);
    // console.log("current question", currentQuestion);
    // console.log(questions);
    // console.log(numberOfQuestions);
    console.log(progress)





    // console.log(selectedAnswer);
    const selectAnswer = () => {
        // let answerIsTrue: boolean = null
        // console.log(question.answer[lang]);

        if (state.selectedAnswer === question.answer[lang]) {
            console.log("you got it!")
            // const answerIsTrue = true
            setState({ ...state, currentQuestion: ++currentQuestion, answers: [...answers, true], selectedAnswer: "" })
        } else {
            console.log("noooo!");
            setState({ ...state, currentQuestion: ++currentQuestion, answers: [...answers, false], selectedAnswer: "" })
            // answerIsTrue = false
        }

    }

    return (
        <div className='relative'>
            {question &&
                <>
                    {progress >= 0 &&
                        <div className='absolute -top-7 left-0 right-0 mx-auto w-3/4 bg-nice-yellow h-4 rounded-full outline outline-1 outline-black border-b-4 border-r-4'>
                            <div className={`relative bg-nice-purple h-3 w-[${progress}%] rounded-xl `} >
                                <div className='absolute w-1/3 bg-white opacity-20 h-1 right-2 top-0.5 rounded-full' />
                                {progress}
                            </div>
                        </div>
                    }
                    <div className='py-9 px-3 md:px-9 flex flex-col'>
                        <h2 className='font-bold text-4xl font-outline-1 text-nice-purple mb-7'>{question.question[lang]}</h2>
                        {question.answers[lang].map(
                            (answer, i) => (
                                <button className={answer === selectedAnswer ? 'button-pressed bg-nice-purple text-white' : 'button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'} key={i} onClick={() => setState({ ...state, selectedAnswer: question.answers[lang][i] })
                                }>
                                    {labels[i]}: {answer}
                                </button>))
                        }
                        <button className='button bg-nice-greenMiddle text-white w-1/2 mx-auto disabled:opacity-50 m-1 mt-4' disabled={selectedAnswer === "" ? true : false} onClick={() => selectAnswer()}>Select</button>
                    </div>
                </>
            }
        </div>
    )

}

export default Quiz