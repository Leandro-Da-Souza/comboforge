import { createContext } from 'react'
import type { SessionHistory, SessionRecord } from '../../types/session'

export type SessionHistoryStore = {
  sessionHistory: SessionHistory
  addSessionHistory: (record: SessionRecord) => void
  deleteSessionFromHistory: (recordId: string) => void
  replaceSessionHistory: (history: SessionHistory) => void
}

export const SessionHistoryContext = createContext<SessionHistoryStore | null>(
  null,
)
