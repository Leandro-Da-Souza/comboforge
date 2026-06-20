import type { Combo, Discipline } from '../types/core'

export function formatCombo(actions: string[]) {
  return actions.join(' -> ')
}

export function getCombosByDiscipline(
  discipline: Discipline,
  combos: Combo[],
): Combo[] {
  return combos.filter((combo) => combo.discipline === discipline)
}
