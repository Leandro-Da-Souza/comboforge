import type { Combo } from '../types/core'

export function formatCombo(actions: string[]) {
  return actions.join(' -> ')
}

export function getNextCombo(combos: Combo[]): Combo | undefined {
  if (combos.length === 0) return undefined
  const randomIndex = Math.floor(Math.random() * combos.length)
  return combos[randomIndex]
}
