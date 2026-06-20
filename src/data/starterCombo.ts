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
    name: 'Hook Cross',
    discipline: 'boxing',
    actions: ['Lead Hook', 'Rear Cross'],
  },
  {
    id: 'kickboxing-1',
    name: 'Jab Kick',
    discipline: 'kickboxing',
    actions: ['Lead Jab', 'Rear Kick'],
  },
  {
    id: 'kickboxing-2',
    name: 'Jab Cross Kick',
    discipline: 'kickboxing',
    actions: ['Lead Jab', 'Rear Cross', 'Lead Kick'],
  },
  {
    id: 'muai-thai-1',
    name: 'Cross Hook Knee',
    discipline: 'muay-thai',
    actions: ['Rear Cross', 'Lead Hook', 'Rear Knee'],
  },
  {
    id: 'muay-thai-2',
    name: 'Jab Knee Elbow',
    discipline: 'muay-thai',
    actions: ['Lead Jab', 'Rear Knee', 'Lead Elbow'],
  },
]
