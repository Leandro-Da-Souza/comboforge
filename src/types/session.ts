import type { Combo, DifficultyPreset, Discipline } from './core'
import type { TimerPreset } from './timer'
import type { TrainingEndReason } from './training'

export type SessionSetup = {
  selectedDiscipline: Discipline
  selectedPreset: TimerPreset
  selectedDifficulty: DifficultyPreset
}

export type SessionSummary = {
  sessionSetup: SessionSetup
  endReason: TrainingEndReason
  finishedRounds: number
  startedAt: string
  endedAt: string
  durationSeconds: number
  combosUsed: Combo[]
}

export type SessionRecord = SessionSummary & {
  id: string
  createdAt: string
}

export type SessionHistory = SessionRecord[]
