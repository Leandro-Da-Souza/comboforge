import type { TimerConfig, TimerState } from './timer'

export type TrainingStatus = 'idle' | 'running' | 'paused' | 'ended'

export type TrainingEndReason = 'completed' | 'abandoned'

export type TrainingState = {
  status: TrainingStatus
  timer: TimerState
  endReason?: TrainingEndReason
  finishedRounds: number
}

export type TrainingAction =
  | { type: 'start'; config: TimerConfig }
  | { type: 'pause' }
  | { type: 'end'; config: TimerConfig }
  | { type: 'tick' }
  | { type: 'reset'; config: TimerConfig }
