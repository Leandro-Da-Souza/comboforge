export type Discipline = 'boxing' | 'kickboxing' | 'muay-thai'
export type Stance = 'orthodox' | 'southpaw'

export type Technique = {
    id: string,
    name: string,
    discipline: Discipline[]
}

export type Combo = {
    id: string,
    name: string,
    actions: string[]
}