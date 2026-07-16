import { storage } from '../../utils/storage'
import { SettingsContext } from './SettingsContext'
import { STORAGE_KEYS } from '../../config/storage.config'
import { guestModeSettings } from '../../config/guest.config'
import { useCallback, useState, useEffect, type ReactNode } from 'react'
import type { Settings } from '../../types/settings'

type SettingsProviderProps = {
  children: ReactNode
}

function normalizeSettings(settings: Partial<Settings>): Settings {
  return {
    user: {
      name:
        typeof settings.user?.name === 'string'
          ? settings.user.name
          : guestModeSettings.user.name,
      stance:
        settings.user?.stance === 'orthodox' ||
        settings.user?.stance === 'southpaw'
          ? settings.user.stance
          : guestModeSettings.user.stance,
    },
    speech: {
      enabled:
        typeof settings.speech?.enabled === 'boolean'
          ? settings.speech.enabled
          : guestModeSettings.speech.enabled,
      rate:
        typeof settings.speech?.rate === 'number'
          ? settings.speech.rate
          : guestModeSettings.speech.rate,
      pitch:
        typeof settings.speech?.pitch === 'number'
          ? settings.speech.pitch
          : guestModeSettings.speech.pitch,
      volume:
        typeof settings.speech?.volume === 'number'
          ? settings.speech.volume
          : guestModeSettings.speech.volume,
      voice:
        typeof settings.speech?.voice === 'string'
          ? settings.speech.voice
          : guestModeSettings.speech.voice,
    },
  }
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => {
    const storedSettings = storage.get<Partial<Settings>>(
      STORAGE_KEYS.settings,
      guestModeSettings,
    )

    return normalizeSettings(storedSettings)
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

  const replaceSettings = useCallback((settings: Partial<Settings>) => {
    setSettings(normalizeSettings(settings))
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
        replaceSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
