import { useContext } from 'react'
import { SessionHistoryContext } from '../store/SessionHistory/SessionHistoryContext'

export default function useSessionHistory() {
  const context = useContext(SessionHistoryContext)

  if (!context) {
    throw new Error(
      'useSessionHistory must be used within SessionHistoryProvider',
    )
  }

  return {
    sessionHistory: context.sessionHistory,
    addSessionHistory: context.addSessionHistory,
    deleteSessionFromHistory: context.deleteSessionFromHistory,
    replaceSessionHistory: context.replaceSessionHistory,
  }
}
