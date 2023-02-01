import React from "react"

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

export interface TAnswers {
  en: string
  es: string
}

export interface IState {
  showExercise: boolean,
  showGameSettings: boolean,
  quizQuestions: IQuestion[] | any[],
  isExerciseDone: boolean,
  showLeaderboard: boolean
}

export interface IQuiz {
  currentQuestion: number,
  answers: boolean[],
  numberOfQuestions: number,
  selectedAnswer: string
}
