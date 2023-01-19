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

