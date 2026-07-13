import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { SessionHistory, SessionRecord } from '../../types/session'
import { STORAGE_KEYS } from '../../config/storage.config'
import { storage } from '../../utils/storage'
import { SessionHistoryContext } from './SessionHistoryContext'
import { difficultyPresets } from '../../config/difficulty.config'

function normalizeSessionHistory(history: SessionHistory): SessionHistory {
  return history.map((session) => ({
    ...session,
    sessionSetup: {
      ...session.sessionSetup,
      selectedDifficulty:
        session.sessionSetup.selectedDifficulty ?? difficultyPresets[0],
    },
    combosUsed: session.combosUsed ?? [],
  }))
}

type SessionHistoryProviderProps = {
  children: ReactNode
}

export default function SessionHistoryProvider({
  children,
}: SessionHistoryProviderProps) {
  const [sessionHistory, setSessionHistory] = useState<SessionHistory>(() => {
    const storedSessions = storage.get<SessionHistory>(
      STORAGE_KEYS.sessionHistory,
      [],
    )

    return normalizeSessionHistory(storedSessions)
  })

  const addSessionHistory = useCallback((record: SessionRecord) => {
    setSessionHistory((currentHistory) => [...currentHistory, record])
  }, [])

  const deleteSessionFromHistory = useCallback((recordId: string) => {
    setSessionHistory((currentHistory) =>
      currentHistory.filter((session) => session.id !== recordId),
    )
  }, [])

  const replaceSessionHistory = useCallback((history: SessionHistory) => {
    setSessionHistory(normalizeSessionHistory(history))
  }, [])

  useEffect(() => {
    storage.set(STORAGE_KEYS.sessionHistory, sessionHistory)
  }, [sessionHistory])

  return (
    <SessionHistoryContext.Provider
      value={{
        sessionHistory,
        addSessionHistory,
        deleteSessionFromHistory,
        replaceSessionHistory,
      }}
    >
      {children}
    </SessionHistoryContext.Provider>
  )
}
