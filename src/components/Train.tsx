import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import { timerPresets } from '../config/timer.config'
import type { TimerPreset } from '../types/timer'
import PresetSelector from './PresetSelector'
import TimerPanel from './TimerPanel'
import ComboPanel from './ComboPanel'
import TrainingControls from './TrainingControls'
import SessionStatus from './SessionStatus'
import { starterCombos } from '../data/starterCombo'
import { formatCombo } from '../utils/combo'
import { useComboRotation } from '../hooks/useComboRotation'
import { usePresetSelection } from '../hooks/usePresetSelection'
import type { Discipline } from '../types/core'
import { useState } from 'react'
import DisciplineSelector from './DisciplineSelector'

const disciplines: Discipline[] = ['boxing', 'kickboxing', 'muay-thai']

export default function Train() {
  const { selectedPresetId, selectedPreset, selectPreset } =
    usePresetSelection(timerPresets)
  const {
    status,
    timer,
    startSession,
    pauseSession,
    endSession,
    resetSession,
  } = useTrainingTimer(selectedPreset.config)
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline>('boxing')

  const availableCombos = starterCombos.filter(
    (combo) => combo.discipline === selectedDiscipline,
  )
  const { currentCombo, upcomingCombo, resetCombos } =
    useComboRotation(availableCombos)

  const startButtonLabel =
    status === 'paused' ? 'Resume' : status === 'ended' ? 'Restart' : 'Start'

  const canPause = status === 'running'
  const canChangePreset = status === 'idle' || status === 'ended'
  const canEnd = status !== 'idle' && status !== 'ended'
  const isSetup = status === 'idle' || status === 'ended'
  const isActiveSession = status === 'running' || status === 'paused'

  function handlePresetSelect(preset: TimerPreset): void {
    selectPreset(preset)
    resetSession(preset.config)
  }

  function handleStartSession(): void {
    resetCombos()
    startSession()
  }

  function handleEndSession(): void {
    resetCombos()
    endSession()
  }

  function handleDisciplineSelect(discipline: Discipline): void {
    setSelectedDiscipline(discipline)
  }

  return (
    <section className="train-screen">
      <SessionStatus status={status} />

      {isSetup ? (
        <PresetSelector
          presets={timerPresets}
          selectedPresetId={selectedPresetId}
          canChangePreset={canChangePreset}
          onPresetSelect={handlePresetSelect}
        />
      ) : null}
      <DisciplineSelector
        disciplines={disciplines}
        currentDiscipline={selectedDiscipline}
        onDisciplineSelect={handleDisciplineSelect}
      />
      <TimerPanel timer={timer} />

      <ComboPanel
        currentCombo={
          isSetup ? 'Tap Start' : formatCombo(currentCombo?.actions ?? [])
        }
        upcomingCombo={
          isActiveSession
            ? `Next: ${formatCombo(upcomingCombo?.actions ?? [])}`
            : selectedPreset.name
        }
      />

      <TrainingControls
        startButtonLabel={startButtonLabel}
        onStart={handleStartSession}
        onPause={pauseSession}
        onEnd={handleEndSession}
        canPause={canPause}
        canEnd={canEnd}
      />
    </section>
  )
}
