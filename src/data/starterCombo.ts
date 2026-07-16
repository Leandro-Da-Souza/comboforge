import type { Combo } from '../types/core'

export const starterCombos: Combo[] = [
  {
    id: 'boxing-1',
    name: 'Jab Cross',
    discipline: 'boxing',
    actions: ['Lead Jab', 'Rear Cross'],
  },
  {
    id: 'boxing-2',
    name: 'Jab Cross Hook',
    discipline: 'boxing',
    actions: ['Lead Jab', 'Rear Cross', 'Lead Hook'],
  },
  {
    id: 'kickboxing-1',
    name: 'Jab Kick',
    discipline: 'kickboxing',
    actions: ['Lead Jab', 'Rear Kick'],
  },
  {
    id: 'kickboxing-2',
    name: 'Cross Hook Low Kick',
    discipline: 'kickboxing',
    actions: ['Rear Cross', 'Lead Hook', 'Rear Low Kick'],
  },
  {
    id: 'muay-thai-1',
    name: 'Cross Hook Knee',
    discipline: 'muay-thai',
    actions: ['Rear Cross', 'Lead Hook', 'Rear Knee'],
  },
  {
    id: 'muay-thai-2',
    name: 'Jab Cross Teep',
    discipline: 'muay-thai',
    actions: ['Lead Jab', 'Rear Cross', 'Lead Teep'],
  },
]
