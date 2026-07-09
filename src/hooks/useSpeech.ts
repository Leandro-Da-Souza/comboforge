import { useCallback } from 'react'

export function useSpeech() {
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('No speechSynthesis available')
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    window.speechSynthesis.speak(utterance)
  }, [])

  return { speak }
}
