import { useContext } from 'react'
import { SettingsContext } from '../store/Settings/SettingsContext'

export default function useSettings() {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return {
    settings: context.settings,
    setSpeechEnabled: context.setSpeechEnabled,
    setSpeechRate: context.setSpeechRate,
    setSpeechPitch: context.setSpeechPitch,
    setSpeechVolume: context.setSpeechVolume,
  }
}
