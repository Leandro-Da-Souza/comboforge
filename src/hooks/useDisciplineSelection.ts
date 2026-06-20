import { useState } from 'react'
import type { Combo, Discipline } from '../types/core'
import { getCombosByDiscipline } from '../utils/combo'

export function useDisciplineSelection(
  combos: Combo[],
  initialDiscipline: Discipline,
) {
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline>(initialDiscipline)
  const availableCombos = getCombosByDiscipline(selectedDiscipline, combos)

  function selectDiscipline(discipline: Discipline) {
    setSelectedDiscipline(discipline)
  }

  return {
    selectDiscipline,
    selectedDiscipline,
    availableCombos,
  }
}
