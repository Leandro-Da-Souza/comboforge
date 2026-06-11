export type TimerPhase = 'round' | 'rest'

export type TimerState = {
  currentRound: number
  totalRounds: number
  phase: TimerPhase
  remainingSeconds: number
  roundDurationSeconds: number
  restDurationSeconds: number
}

export type TimerConfig = {
  totalRounds: number
  roundDurationSeconds: number
  restDurationSeconds: number
}

export type TimerPreset = {
  id: string
  name: string
  config: TimerConfig
}
