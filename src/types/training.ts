import type { TimerConfig, TimerState } from './timer'

export type TrainingStatus = 'idle' | 'running' | 'paused' | 'ended'

export type TrainingState = {
  status: TrainingStatus
  timer: TimerState
}

export type TrainingAction =
  | { type: 'start'; config: TimerConfig }
  | { type: 'pause' }
  | { type: 'end'; config: TimerConfig }
  | { type: 'tick' }
