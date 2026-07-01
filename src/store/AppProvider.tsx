import SessionHistoryProvider from './SessionHistory/SessionHistoryProvider'
import ComboProvider from './Combos/ComboProvider'
import type { ReactNode } from 'react'

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <SessionHistoryProvider>
      <ComboProvider>{children}</ComboProvider>
    </SessionHistoryProvider>
  )
}
