import { useState } from 'react'
import type { TimerPreset } from '../types/timer'

export function usePresetSelection(presets: TimerPreset[]) {
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id)

  const selectedPreset =
    presets.find((preset) => preset.id === selectedPresetId) ?? presets[0]

  function selectPreset(preset: TimerPreset) {
    setSelectedPresetId(preset.id)
  }

  return {
    selectedPresetId,
    selectedPreset,
    selectPreset,
  }
}
