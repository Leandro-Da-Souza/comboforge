import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import TimerPanel from './TimerPanel'
import ComboPanel from './ComboPanel'
import TrainingControls from './TrainingControls'
import SessionStatus from './SessionStatus'
import { starterCombos } from '../data/starterCombo'
import { formatCombo } from '../utils/combo'
import { useComboRotation } from '../hooks/useComboRotation'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import { useEffect } from 'react'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import { trainingConfig } from '../config/training.config'

type TrainProps = {
  selectedDiscipline: Discipline
  selectedPreset: TimerPreset
}

export default function Train({
  selectedDiscipline,
  selectedPreset,
}: TrainProps) {
  const { status, timer, startSession, pauseSession, endSession } =
    useTrainingTimer(selectedPreset.config)

  const { availableCombos } = useDisciplineSelection(
    starterCombos,
    selectedDiscipline,
  )

  const { currentCombo, upcomingCombo, resetCombos, rotateCombo } =
    useComboRotation(availableCombos)

  const startButtonLabel =
    status === 'paused' ? 'Resume' : status === 'ended' ? 'Restart' : 'Start'

  const canPause = status === 'running'
  const canEnd = status !== 'idle' && status !== 'ended'
  const isSetup = status === 'idle' || status === 'ended'
  const isActiveSession = status === 'running' || status === 'paused'

  function handleStartSession(): void {
    resetCombos(availableCombos)
    startSession()
  }

  function handleEndSession(): void {
    resetCombos(availableCombos)
    endSession()
  }

  useEffect(() => {
    if (status !== 'running') return
    if (availableCombos.length === 0) return

    const intervalId = window.setInterval(() => {
      rotateCombo()
    }, trainingConfig.comboRotationIntervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [status, availableCombos.length, rotateCombo])

  return (
    <section className="train-screen">
      <SessionStatus status={status} />

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
