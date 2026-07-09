import type { Stance } from './core'

type UserSettings = {
  name: string
  stance: Stance
}

type SpeechSettings = {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string
}

export type Settings = {
  user: UserSettings
  speech: SpeechSettings
}
