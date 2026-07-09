import { storage } from '../../utils/storage'
import { SettingsContext } from './SettingsContext'
import { STORAGE_KEYS } from '../../config/storage.config'
import { guestModeSettings } from '../../config/guest.config'
import { useCallback, useState, useEffect, type ReactNode } from 'react'
import type { Settings } from '../../types/settings'

type SettingsProviderProps = {
  children: ReactNode
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => {
    return storage.get(STORAGE_KEYS.settings, guestModeSettings)
  })

  const setSpeechEnabled = useCallback((value: boolean) => {
    setSettings((current) => ({
      ...current,
      speech: {
        ...current.speech,
        enabled: value,
      },
    }))
  }, [])

  const setSpeechRate = useCallback((value: number) => {
    setSettings((current) => ({
      ...current,
      speech: {
        ...current.speech,
        rate: value,
      },
    }))
  }, [])

  const setSpeechPitch = useCallback((value: number) => {
    setSettings((current) => ({
      ...current,
      speech: {
        ...current.speech,
        pitch: value,
      },
    }))
  }, [])

  const setSpeechVolume = useCallback((value: number) => {
    setSettings((current) => ({
      ...current,
      speech: {
        ...current.speech,
        volume: value,
      },
    }))
  }, [])

  useEffect(() => {
    storage.set(STORAGE_KEYS.settings, settings)
  }, [settings])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSpeechEnabled,
        setSpeechRate,
        setSpeechPitch,
        setSpeechVolume,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
