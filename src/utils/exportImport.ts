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
