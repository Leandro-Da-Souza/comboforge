import { createContext } from 'react'
import type { Combo } from '../../types/core'

export type ComboStore = {
  starterCombos: Combo[]
  customCombos: Combo[]
  combos: Combo[]
  addCombo: (combo: Combo) => void
  updateCombo: (combo: Combo) => void
  deleteCombo: (comboId: string) => void
  replaceCustomCombos: (customCombos: Partial<Combo>[]) => void
}

export const ComboContext = createContext<ComboStore | null>(null)
