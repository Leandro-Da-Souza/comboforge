export type TimerPhase = 'round' | 'rest'

export type TimerConfig = {
  totalRounds: number
  roundDurationSeconds: number
  restDurationSeconds: number
}

export type TimerState = TimerConfig & {
  currentRound: number
  phase: TimerPhase
  remainingSeconds: number
}

export type TimerPreset = {
  id: string
  name: string
  config: TimerConfig
}
