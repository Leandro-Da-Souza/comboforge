import SessionHistoryProvider from './SessionHistory/SessionHistoryProvider'
import type { ReactNode } from 'react'

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return <SessionHistoryProvider>{children}</SessionHistoryProvider>
}
