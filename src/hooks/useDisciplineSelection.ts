import { useState, useMemo } from 'react'
import type { Combo, Discipline } from '../types/core'
import { getCombosByDiscipline } from '../utils/combo'

export function useDisciplineSelection(
  combos: Combo[],
  initialDiscipline: Discipline,
) {
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline>(initialDiscipline)

  const availableCombos = useMemo(
    () => getCombosByDiscipline(selectedDiscipline, combos),
    [selectedDiscipline, combos],
  )

  function selectDiscipline(discipline: Discipline) {
    setSelectedDiscipline(discipline)
  }

  return {
    selectDiscipline,
    selectedDiscipline,
    availableCombos,
  }
}
