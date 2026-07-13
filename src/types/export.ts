import type { Combo } from './core'
import type { SessionHistory } from './session'
import type { Settings } from './settings'

export type AppDataExport = {
  version: 1
  exportedAt: string
  data: {
    settings: Settings
    customCombos: Combo[]
    sessionHistory: SessionHistory
  }
}
