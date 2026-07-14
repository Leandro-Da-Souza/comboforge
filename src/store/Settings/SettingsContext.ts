import { createContext } from 'react'
import type { Settings } from '../../types/settings'

export type SettingsStore = {
  settings: Settings
  setSpeechEnabled: (value: boolean) => void
  setSpeechRate: (value: number) => void
  setSpeechPitch: (value: number) => void
  setSpeechVolume: (value: number) => void
  replaceSettings: (value: Partial<Settings>) => void
}

export const SettingsContext = createContext<SettingsStore | null>(null)
