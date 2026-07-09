import type { TimerConfig, TimerState } from './timer'

export type TrainingStatus =
  | 'idle'
  | 'countdown'
  | 'running'
  | 'paused'
  | 'ended'

export type TrainingEndReason = 'completed' | 'abandoned'

export type TrainingState = {
  status: TrainingStatus
  timer: TimerState
  countdownRemainingSeconds?: number
  startedAt?: string
  endReason?: TrainingEndReason
  finishedRounds: number
}

export type TrainingAction =
  | { type: 'start'; config: TimerConfig }
  | { type: 'countdownTick' }
  | { type: 'pause' }
  | { type: 'end'; config: TimerConfig }
  | { type: 'tick' }
  | { type: 'reset'; config: TimerConfig }
