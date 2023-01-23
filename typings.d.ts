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
    en: string[]
    es: string[]
  }
}

export type TAnswers = {
  en: string[]
  es: string[]
}

export interface IState {
  showExercise: boolean,
  showGameSettings: boolean,
  quizQuestions: IQuestion[] | [],
  isExerciseDone: boolean,
  score: number
}
