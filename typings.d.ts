import React from "react"
import internal from "stream"

export interface IQuestion {
  id: bigint
  country: string
  quest: string
  href: string
  question: {
    en: string
    es: string
  }
  answers: {
    en: string[]
    es: string[]
  }
  answer: {
    en: string
    es: string
  }
}

export interface IScore {
  id: bigint
  user_id: bigint
  username: string
  country: string
  number_of_questions: number
  score: number
}

export interface TAnswers {
  en: string
  es: string
}

export interface IState {
  showExercise: boolean,
  showGameSettings: boolean,
  quizQuestions: IQuestion[] | any[],
  showLeaderboard: boolean
  scores: IScore[] | any[]
}

export interface IQuiz {
  currentQuestion: number,
  answers: boolean[],
  numberOfQuestions: number,
  selectedAnswer: string,
  showQuestion: boolean
}
