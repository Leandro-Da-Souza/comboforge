export type Discipline = 'boxing' | 'kickboxing' | 'muay-thai'
export type Stance = 'orthodox' | 'southpaw'
export type Intensity = 'beginner' | 'intermediate' | 'advanced'
export type Difficulty = 'easy' | 'normal' | 'hard'

export type Technique = {
  id: string
  name: string
  discipline: Discipline[]
}

export type Combo = {
  id: string
  name: string
  discipline: Discipline
  actions: string[]
  intensity?: Intensity
}

export type DifficultyPreset = {
  id: Difficulty
  name: string
  description: string
  rotationIntervalMilliseconds: number
}
