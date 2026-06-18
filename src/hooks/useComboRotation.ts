import { useState } from 'react'
import type { Combo } from '../types/core'

type ComboRotation = {
  currentCombo: Combo | undefined
  upcomingCombo: Combo | undefined
  rotateCombo: () => void
  resetCombos: () => void
}

function getNextCombo(combos: Combo[]): Combo | undefined {
  if (combos.length === 0) return undefined
  const randomIndex = Math.floor(Math.random() * combos.length)
  return combos[randomIndex]
}

export function useComboRotation(combos: Combo[]): ComboRotation {
  const [currentCombo, setCurrentCombo] = useState<Combo | undefined>(
    () => combos[0],
  )

  const [upcomingCombo, setUpcomingCombo] = useState<Combo | undefined>(
    () => combos[1] ?? combos[0],
  )

  function rotateCombo() {
    setCurrentCombo(upcomingCombo)
    setUpcomingCombo(getNextCombo(combos))
  }

  function resetCombos() {
    setCurrentCombo(combos[0])
    setUpcomingCombo(combos[1] ?? combos[0])
  }

  return {
    currentCombo,
    upcomingCombo,
    rotateCombo,
    resetCombos,
  }
}
