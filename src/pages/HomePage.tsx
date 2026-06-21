import { useNavigate } from 'react-router'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import { appConfig } from '../config/app.config'
import PresetSelector from '../components/PresetSelector'
import DisciplineSelector from '../components/DisciplineSelector'
import { timerPresets } from '../config/timer.config'
import { availableDisciplines } from '../data/availableDisciplines'
import { usePresetSelection } from '../hooks/usePresetSelection'
import { starterCombos } from '../data/starterCombo'
import type { TimerPreset } from '../types/timer'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import type { Discipline } from '../types/core'

export default function HomePage() {
  const { selectedPresetId, selectPreset, selectedPreset } =
    usePresetSelection(timerPresets)

  const { selectDiscipline, selectedDiscipline } = useDisciplineSelection(
    starterCombos,
    availableDisciplines[0],
  )

  const navigate = useNavigate()

  function handleTrainNavigation() {
    navigate('/train', {
      state: {
        selectedDiscipline,
        selectedPreset,
      },
    })
  }

  function handlePresetSelect(preset: TimerPreset) {
    selectPreset(preset)
  }

  function handleDisciplineSelect(discipline: Discipline) {
    selectDiscipline(discipline)
  }

  return (
    <>
      <PageHeader
        title={appConfig.name}
        description="All Combos, No Bullshit"
      />
      <PresetSelector
        presets={timerPresets}
        selectedPresetId={selectedPresetId}
        canChangePreset={true}
        onPresetSelect={handlePresetSelect}
      />
      <DisciplineSelector
        disciplines={availableDisciplines}
        currentDiscipline={selectedDiscipline}
        onDisciplineSelect={handleDisciplineSelect}
      />
      <Button variant="primary" onClick={handleTrainNavigation}>
        Quick Start
      </Button>
    </>
  )
}
