import { useState } from 'react'
import type { DifficultyPreset } from '../types/core'

export function useDifficultySelection(presets: DifficultyPreset[]) {
  const [selectedDifficultyId, setSelectedDifficultyId] = useState(
    presets[0].id,
  )

  const selectedDifficulty =
    presets.find((preset) => preset.id === selectedDifficultyId) ?? presets[0]

  function selectDifficulty(difficulty: DifficultyPreset) {
    setSelectedDifficultyId(difficulty.id)
  }

  return {
    selectedDifficultyId,
    selectedDifficulty,
    selectDifficulty,
  }
}
