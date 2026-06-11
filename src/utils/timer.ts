import type { TimerConfig, TimerState } from '../types/timer'

export function createTimerState(config: TimerConfig): TimerState {
  return {
    currentRound: 1,
    phase: 'round',
    remainingSeconds: config.roundDurationSeconds,
    totalRounds: config.totalRounds,
    roundDurationSeconds: config.roundDurationSeconds,
    restDurationSeconds: config.restDurationSeconds,
  }
}

export function resetTimerProgress(timer: TimerState): TimerState {
  return {
    currentRound: 1,
    phase: 'round',
    remainingSeconds: timer.roundDurationSeconds,
    totalRounds: timer.totalRounds,
    roundDurationSeconds: timer.roundDurationSeconds,
    restDurationSeconds: timer.restDurationSeconds,
  }
}
