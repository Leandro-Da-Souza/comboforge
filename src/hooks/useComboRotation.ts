import { useState, useCallback } from 'react'
import type { Combo } from '../types/core'

type ComboRotation = {
  currentCombo: Combo | undefined
  upcomingCombo: Combo | undefined
  rotateCombo: () => void
  resetCombos: (nextCombos: Combo[]) => void
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

  const rotateCombo = useCallback(() => {
    setCurrentCombo(upcomingCombo)
    setUpcomingCombo(getNextCombo(combos))
  }, [combos, upcomingCombo])

  function resetCombos(nextCombos: Combo[]) {
    setCurrentCombo(nextCombos[0])
    setUpcomingCombo(nextCombos[1] ?? nextCombos[0])
  }

  return {
    currentCombo,
    upcomingCombo,
    rotateCombo,
    resetCombos,
  }
}
