import { useState, useCallback } from 'react'
import type { SessionSummary } from '../types/session'
import type { SessionHistory } from '../types/session'

export default function useSessionSummary() {
  const [sessionHistory, setSessionHistory] = useState<SessionHistory>([])

  const addSessionHistory = useCallback((summary: SessionSummary) => {
    setSessionHistory((currentHistory) => [...currentHistory, summary])
  }, [])

  return {
    sessionHistory,
    addSessionHistory,
  }
}
