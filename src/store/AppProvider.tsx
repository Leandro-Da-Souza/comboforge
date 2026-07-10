import SessionHistoryProvider from './SessionHistory/SessionHistoryProvider'
import ComboProvider from './Combos/ComboProvider'
import SettingsProvider from './Settings/SettingsProvider'
import type { ReactNode } from 'react'

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <SettingsProvider>
      <SessionHistoryProvider>
        <ComboProvider>{children}</ComboProvider>
      </SessionHistoryProvider>
    </SettingsProvider>
  )
}
