import { useState, useCallback } from 'react'
import type { Combo } from '../types/core'

type ComboRotation = {
  currentCombo: Combo | undefined
  upcomingCombo: Combo | undefined
  combosUsed: Combo[]
  rotateCombo: () => void
  resetCombos: (nextCombos: Combo[], shouldMarkFirstCombo?: boolean) => void
}

function getNextCombo(
  combos: Combo[],
  currentCombo?: Combo,
): Combo | undefined {
  if (combos.length === 0) return undefined

  const available = combos.filter((combo) => combo.id !== currentCombo?.id)

  const pool = available.length > 0 ? available : combos

  return pool[Math.floor(Math.random() * pool.length)]
}

export function useComboRotation(combos: Combo[]): ComboRotation {
  const [currentCombo, setCurrentCombo] = useState<Combo | undefined>(
    () => combos[0],
  )

  const [upcomingCombo, setUpcomingCombo] = useState<Combo | undefined>(
    () => combos[1] ?? combos[0],
  )

  const [combosUsed, setCombosUsed] = useState<Combo[]>([])

  function markComboUsed(comboToMark: Combo | undefined) {
    setCombosUsed((current) => {
      if (!comboToMark) return current
      if (current.some((combo) => combo.id === comboToMark.id)) return current

      return [...current, comboToMark]
    })
  }

  const rotateCombo = useCallback(() => {
    setCurrentCombo(upcomingCombo)
    setUpcomingCombo(getNextCombo(combos, upcomingCombo))
    markComboUsed(upcomingCombo)
  }, [combos, upcomingCombo])

  function resetCombos(nextCombos: Combo[], shouldMarkFirstCombo = false) {
    const firstCombo = nextCombos[0]

    setCurrentCombo(firstCombo)
    setUpcomingCombo(nextCombos[1] ?? firstCombo)
    setCombosUsed(shouldMarkFirstCombo && firstCombo ? [firstCombo] : [])
  }

  return {
    currentCombo,
    upcomingCombo,
    rotateCombo,
    resetCombos,
    combosUsed,
  }
}
