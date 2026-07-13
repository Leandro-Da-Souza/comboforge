import type { DifficultyPreset } from '../types/core'

export const difficultyPresets: DifficultyPreset[] = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Slower callouts for clean technique.',
    rotationIntervalMilliseconds: 6000,
  },
  {
    id: 'normal',
    name: 'Normal',
    description: 'Balanced pace for steady rounds.',
    rotationIntervalMilliseconds: 4000,
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'Fast callouts for pressure rounds.',
    rotationIntervalMilliseconds: 2500,
  },
]
