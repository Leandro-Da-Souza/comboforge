import type { AppDataExport } from '../types/export'
import { APP_DATA_EXPORT_IMPORT } from '../config/export.config'
import type { Settings } from '../types/settings'
import type { Combo } from '../types/core'
import type { SessionHistory } from '../types/session'

export const createAppDataExport = (
  settings: Settings,
  customCombos: Combo[],
  history: SessionHistory,
): AppDataExport => {
  return {
    version: APP_DATA_EXPORT_IMPORT.version,
    exportedAt: new Date().toISOString(),
    data: {
      settings: settings,
      customCombos: customCombos,
      sessionHistory: history,
    },
  }
}

export const isAppDataExport = (value: unknown): value is AppDataExport => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const data = (value as AppDataExport).data

  return (
    typeof (value as AppDataExport).version === 'number' &&
    (value as AppDataExport).version === APP_DATA_EXPORT_IMPORT.version &&
    typeof (value as AppDataExport).exportedAt === 'string' &&
    typeof data === 'object' &&
    data !== null &&
    typeof data.settings === 'object' &&
    Array.isArray(data.customCombos) &&
    Array.isArray(data.sessionHistory)
  )
}

export const parseAppDataImport = (json: string): AppDataExport => {
  const parsed = JSON.parse(json) as unknown

  if (!isAppDataExport(parsed)) {
    throw new Error('Invalid ComboForge export file.')
  }

  return parsed
}
