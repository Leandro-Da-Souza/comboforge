export type Discipline = 'boxing' | 'kickboxing' | 'muay-thai'
export type Stance = 'orthodox' | 'southpaw'
export type Intensity = 'beginner' | 'intermediate' | 'advanced'

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
