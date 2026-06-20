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
import { formatCombo, getCombosByDiscipline } from '../utils/combo'
import { useComboRotation } from '../hooks/useComboRotation'
import { usePresetSelection } from '../hooks/usePresetSelection'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import type { Discipline } from '../types/core'
import DisciplineSelector from './DisciplineSelector'
import { availableDisciplines } from '../data/availableDisciplines'
import { useEffect } from 'react'

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

  const { selectDiscipline, selectedDiscipline, availableCombos } =
    useDisciplineSelection(starterCombos, availableDisciplines[0])

  const { currentCombo, upcomingCombo, resetCombos, rotateCombo } =
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
    resetCombos(availableCombos)
    startSession()
  }

  function handleEndSession(): void {
    resetCombos(availableCombos)
    endSession()
  }

  function handleDisciplineSelect(discipline: Discipline): void {
    const nextCombos = getCombosByDiscipline(discipline, starterCombos)
    selectDiscipline(discipline)
    resetCombos(nextCombos)
  }

  useEffect(() => {
    if (status !== 'running') return
    if (availableCombos.length === 0) return

    const intervalId = window.setInterval(() => {
      rotateCombo()
    }, 3500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [status, availableCombos.length, rotateCombo])

  return (
    <section className="train-screen">
      <SessionStatus status={status} />

      {isSetup ? (
        <>
          <PresetSelector
            presets={timerPresets}
            selectedPresetId={selectedPresetId}
            canChangePreset={canChangePreset}
            onPresetSelect={handlePresetSelect}
          />
          <DisciplineSelector
            disciplines={availableDisciplines}
            currentDiscipline={selectedDiscipline}
            onDisciplineSelect={handleDisciplineSelect}
          />
        </>
      ) : null}

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
