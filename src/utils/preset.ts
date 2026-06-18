import type { TimerPreset } from '../types/timer'
import { timerPresets } from '../config/timer.config'

export function getTimerPresetById(id: string): TimerPreset {
  return timerPresets.find((preset) => preset.id === id) ?? timerPresets[0]
}
