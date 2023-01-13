import { useRouter } from 'next/router';
import { useState } from 'react';
import { IQuestion } from '../typings';


const Question = ({ questions }: { questions: IQuestion[] }) => {
    const { locale } = useRouter();
    const lang = locale === "en-UK" ? "en" : "es";
    const initialState = {
        currentQuestion: 0,
        answers: [],
        numberOfQuestions: questions.length,
        correctAnswers: [],
    };

    // console.log("locale: ", lang);


    const [state, setState] = useState(initialState);
    const { currentQuestion, answers, numberOfQuestions } = state;
    const question = questions[currentQuestion];
    console.log(questions[currentQuestion].answers[lang]);


    return (
        <>
            {/* {questions[currentQuestion].answers[lang].map((answer) => <button key={answer}>{answer}</button>)} */}
        </>
    )

}

export default Question