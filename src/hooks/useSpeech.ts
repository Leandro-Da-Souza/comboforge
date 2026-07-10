import { useCallback } from 'react'
import useSettings from './useSettings'

export function useSpeech() {
  const { settings } = useSettings()
  const { enabled, rate, pitch, volume } = settings.speech

  const speak = useCallback(
    (text: string) => {
      if (!enabled) return

      if (!('speechSynthesis' in window)) {
        console.error('No speechSynthesis available in window')
        return
      }

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      window.speechSynthesis.speak(utterance)
    },
    [enabled, rate, pitch, volume],
  )

  return { speak }
}
