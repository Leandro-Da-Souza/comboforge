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
import TrainingSessionMeta from './TrainingSessionMeta'

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

  const isRunning = status === 'running'
  const canEnd = status !== 'idle' && status !== 'ended'
  const isSetup = status === 'idle' || status === 'ended'
  const isActiveSession = status === 'running' || status === 'paused'
  const isResting = status === 'running' && timer.phase === 'rest'

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
    if (timer.phase !== 'round') return
    if (availableCombos.length === 0) return

    const intervalId = window.setInterval(() => {
      rotateCombo()
    }, trainingConfig.comboRotationIntervalMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [status, timer.phase, availableCombos.length, rotateCombo])

  return (
    <section className="train-screen">
      <div className="train-timer-zone">
        <TrainingSessionMeta discipline={selectedDiscipline} timer={timer} />
        <TimerPanel timer={timer} />
        <SessionStatus status={status} />
      </div>

      <div className="train-action-zone">
        <ComboPanel
          currentCombo={
            isSetup
              ? 'Tap Start'
              : isResting
                ? 'Rest'
                : formatCombo(currentCombo?.actions ?? [])
          }
          upcomingCombo={
            isResting
              ? 'Next round soon'
              : isActiveSession
                ? `Next: ${formatCombo(upcomingCombo?.actions ?? [])}`
                : 'Rest'
          }
          availableCombos={availableCombos}
        />

        <TrainingControls
          startButtonLabel={startButtonLabel}
          onStart={handleStartSession}
          onPause={pauseSession}
          onEnd={handleEndSession}
          isRunning={isRunning}
          canEnd={canEnd}
        />
      </div>
    </section>
  )
}
