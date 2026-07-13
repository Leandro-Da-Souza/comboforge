import Train from '../components/Train'
import PageHeader from '../components/PageHeader'
import { appConfig } from '../config/app.config'
import { useLocation } from 'react-router'
import { timerPresets } from '../config/timer.config'
import { availableDisciplines } from '../data/availableDisciplines'
import type { SessionSetup } from '../types/session'
import { difficultyPresets } from '../config/difficulty.config'

export default function TrainPage() {
  const location = useLocation()
  const state = location.state as SessionSetup | null

  const selectedPreset = state?.selectedPreset ?? timerPresets[0]

  const selectedDiscipline =
    state?.selectedDiscipline ?? availableDisciplines[0]

  const selectedDifficulty = state?.selectedDifficulty ?? difficultyPresets[0]

  return (
    <>
      <PageHeader title={appConfig.name} backHref="/" />
      <Train
        selectedDiscipline={selectedDiscipline}
        selectedPreset={selectedPreset}
        selectedDifficulty={selectedDifficulty}
      />
    </>
  )
}
