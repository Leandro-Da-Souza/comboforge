import { describe, expect, it } from 'vitest'
import { createTimerState, resetTimerProgress } from '../utils/timer'
import type { TimerConfig, TimerState } from '../types/timer'

describe('timer utils', () => {
  it('creates an initial timer state from config', () => {
    const config: TimerConfig = {
      totalRounds: 3,
      roundDurationSeconds: 180,
      restDurationSeconds: 60,
    }

    expect(createTimerState(config)).toEqual({
      currentRound: 1,
      phase: 'round',
      remainingSeconds: 180,
      totalRounds: 3,
      roundDurationSeconds: 180,
      restDurationSeconds: 60,
    })
  })

  it('resets timer progress while preserving timer config', () => {
    const timer: TimerState = {
      currentRound: 2,
      phase: 'rest',
      remainingSeconds: 30,
      totalRounds: 5,
      roundDurationSeconds: 180,
      restDurationSeconds: 60,
    }

    expect(resetTimerProgress(timer)).toEqual({
      currentRound: 1,
      phase: 'round',
      remainingSeconds: 180,
      totalRounds: 5,
      roundDurationSeconds: 180,
      restDurationSeconds: 60,
    })
  })
})
