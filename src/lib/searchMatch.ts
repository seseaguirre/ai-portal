import { searchAnswers, genericAnswer } from '@/data/search-answers'
import type { Citation, SearchAnswer, SearchResult } from '@/types'

export interface MatchedAnswer {
  answer: string
  citations: Citation[]
  results: SearchResult[]
  matched: boolean
}

export const matchAnswer = (query: string): MatchedAnswer => {
  const q = query.toLowerCase()
  let best: SearchAnswer | null = null
  let bestScore = 0

  for (const answer of searchAnswers) {
    const score = answer.keywords.reduce(
      (total, keyword) => (q.includes(keyword) ? total + 1 : total),
      0,
    )
    if (score > bestScore) {
      bestScore = score
      best = answer
    }
  }

  if (best && bestScore > 0) {
    return {
      answer: best.answer,
      citations: best.citations,
      results: best.results,
      matched: true,
    }
  }

  return {
    answer: genericAnswer.answer,
    citations: genericAnswer.citations,
    results: [],
    matched: false,
  }
}

export const exampleQuestions = searchAnswers.map((a) => a.question)
