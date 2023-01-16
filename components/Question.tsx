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

    // questions[currentQuestion].answers[lang].map(answer => {
    //     console.log(Object.keys(answer));
    // });


    console.log(questions[currentQuestion]);




    return (
        <>
            <h2 >{question.question[lang]}</h2>
            {question.answers[lang].map(
                (answer, i) => (
                    <button key={i}>
                        {Object.keys(answer)} : {Object.values(answer)}
                    </button>))}
        </>
    )

}

export default Question