import Train from '../components/Train'
import PageHeader from '../components/PageHeader'
import { appConfig } from '../config/app.config'
import { useLocation } from 'react-router'
import { timerPresets } from '../config/timer.config'
import { availableDisciplines } from '../data/availableDisciplines'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'

type TrainLocationState = {
  selectedDiscipline?: Discipline
  selectedPreset?: TimerPreset
}

export default function TrainPage() {
  const location = useLocation()
  const state = location.state as TrainLocationState | null

  const selectedPreset = state?.selectedPreset ?? timerPresets[0]

  const selectedDiscipline =
    state?.selectedDiscipline ?? availableDisciplines[0]
  return (
    <>
      <PageHeader
        eyebrow="Ready, Set, Hiya!"
        title={appConfig.name}
        backHref="/"
      />
      <Train
        selectedDiscipline={selectedDiscipline}
        selectedPreset={selectedPreset}
      />
    </>
  )
}
