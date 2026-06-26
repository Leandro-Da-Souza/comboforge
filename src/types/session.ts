import type { Discipline } from './core'
import type { TimerPreset } from './timer'
import type { TrainingEndReason } from './training'

export type SessionSetup = {
  selectedDiscipline: Discipline
  selectedPreset: TimerPreset
}

export type SessionSummary = {
  sessionSetup: SessionSetup
  endReason: TrainingEndReason
  finishedRounds: number
}
