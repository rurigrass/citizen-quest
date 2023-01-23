import { useRouter } from 'next/router';
import { useState } from 'react';
import { IQuestion } from '../typings';


const Question = ({ questions }: { questions: IQuestion[] }) => {
    const { locale } = useRouter();
    const labels = ["A", "B", "C", "D", "E"];
    const lang = locale === "en-UK" ? "en" : "es";
    const initialState = {
        currentQuestion: 0,
        answers: [],
        numberOfQuestions: questions.length,
        correctAnswers: [],
        selectedAnswer: ""
    };


    // console.log("locale: ", lang);


    const [state, setState] = useState(initialState);
    const { currentQuestion, answers, numberOfQuestions, correctAnswers, selectedAnswer } = state;
    const question = questions[currentQuestion];

    // console.log(questions);
    // console.log("current question object", question.question);
    console.log("current question", currentQuestion);




    // console.log(selectedAnswer);
    // const selectAnswer = (answer) => {
    //     console.log(answer);

    // }


    // console.log(questions[currentQuestion]);




    return (
        <>
            {/* question && */}
            {question &&
                <>
                    <h2 className='font-bold text-4xl font-outline-1 text-nice-purple mb-7'>{question.question[lang]}</h2>
                    {question.answers[lang].map(
                        (answer, i) => (
                            <button className={answer === selectedAnswer ? 'button-pressed bg-nice-purple text-white' : 'button bg-nice-yellow hover:bg-nice-purple hover:text-white m-1'} key={i} onClick={() => setState({ ...state, selectedAnswer: question.answers[lang][i] })
                            }>
                                {labels[i]}: {answer}
                            </button>))
                    }
                </>
            }
        </>
    )

}

export default Question