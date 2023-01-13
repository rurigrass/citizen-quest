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
    en: {
      A: string
      B: string
      C: string
    }
    es: {
      A: string
      B: string
      C: string
    }
  }
  answer: {
    en: string
    es: string
  }
}

