import type { Discipline } from '../types/core'

const formattedDisciplines: Record<Discipline, string> = {
  kickboxing: 'Kickboxing',
  boxing: 'Boxing',
  'muay-thai': 'Muay Thai',
}

export function formatDiscipline(discipline: Discipline): string {
  return formattedDisciplines[discipline]
}
