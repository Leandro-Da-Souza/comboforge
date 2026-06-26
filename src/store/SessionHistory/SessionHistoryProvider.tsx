import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { SessionHistory, SessionSummary } from '../../types/session'
import { STORAGE_KEYS } from '../../config/storage.config'
import { storage } from '../../utils/storage'
import { SessionHistoryContext } from './SessionHistoryContext'

type SessionHistoryProviderProps = {
  children: ReactNode
}

export default function SessionHistoryProvider({
  children,
}: SessionHistoryProviderProps) {
  const [sessionHistory, setSessionHistory] = useState<SessionHistory>(() =>
    storage.get(STORAGE_KEYS.sessionHistory, []),
  )

  const addSessionHistory = useCallback((summary: SessionSummary) => {
    setSessionHistory((currentHistory) => [...currentHistory, summary])
  }, [])

  useEffect(() => {
    storage.set(STORAGE_KEYS.sessionHistory, sessionHistory)
  }, [sessionHistory])

  return (
    <SessionHistoryContext.Provider
      value={{ sessionHistory, addSessionHistory }}
    >
      {children}
    </SessionHistoryContext.Provider>
  )
}
