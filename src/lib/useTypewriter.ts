import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Reveals text a few words at a time to simulate a streaming AI answer.
 * Under prefers-reduced-motion it shows the full text immediately.
 */
export function useTypewriter(fullText: string, wordsPerTick = 2, tickMs = 45) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(fullText)
      setDone(true)
      return
    }

    setShown('')
    setDone(false)
    const words = fullText.split(' ')
    let count = 0

    const id = window.setInterval(() => {
      count += wordsPerTick
      if (count >= words.length) {
        setShown(fullText)
        setDone(true)
        window.clearInterval(id)
      } else {
        setShown(words.slice(0, count).join(' '))
      }
    }, tickMs)

    return () => window.clearInterval(id)
  }, [fullText, wordsPerTick, tickMs])

  return { shown, done }
}
