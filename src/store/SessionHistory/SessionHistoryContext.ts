import { createContext } from 'react'
import type { SessionHistory, SessionSummary } from '../../types/session'

export type SessionHistoryStore = {
  sessionHistory: SessionHistory
  addSessionHistory: (summary: SessionSummary) => void
}

export const SessionHistoryContext = createContext<SessionHistoryStore | null>(
  null,
)
