import type { TimerConfig, TimerPreset } from '../types/timer'

export const defaultTimerConfig: TimerConfig = {
  totalRounds: 3,
  roundDurationSeconds: 180,
  restDurationSeconds: 60,
}

export const timerPresets: TimerPreset[] = [
  {
    id: '3x3',
    name: '3 x 3 min',
    config: defaultTimerConfig,
  },
  {
    id: '5x3',
    name: '5 x 3 min',
    config: {
      totalRounds: 5,
      roundDurationSeconds: 180,
      restDurationSeconds: 60,
    },
  },
  {
    id: '5x5',
    name: '5 x 5 min',
    config: {
      totalRounds: 5,
      roundDurationSeconds: 300,
      restDurationSeconds: 60,
    },
  },
]
