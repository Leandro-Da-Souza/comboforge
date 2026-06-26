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
import { useEffect, useMemo } from 'react'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import { trainingConfig } from '../config/training.config'
import TrainingSessionMeta from './TrainingSessionMeta'
import type { SessionSummary } from '../types/session'

type TrainProps = {
  selectedDiscipline: Discipline
  selectedPreset: TimerPreset
}

export default function Train({
  selectedDiscipline,
  selectedPreset,
}: TrainProps) {
  const {
    status,
    timer,
    endReason,
    finishedRounds,
    startSession,
    pauseSession,
    endSession,
  } = useTrainingTimer(selectedPreset.config)

  const sessionSetup = useMemo(
    () => ({
      selectedDiscipline,
      selectedPreset,
    }),
    [selectedDiscipline, selectedPreset],
  )

  const sessionSummary = useMemo<SessionSummary | undefined>(() => {
    if (status !== 'ended' || !endReason) return undefined

    return {
      sessionSetup,
      endReason,
      finishedRounds,
    }
  }, [status, endReason, finishedRounds, sessionSetup])

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
  const comboKey = isSetup
    ? `setup-${status}`
    : isResting
      ? `rest-${timer.currentRound}`
      : (currentCombo?.id ?? 'empty-combo')

  function handleStartSession(): void {
    resetCombos(availableCombos)
    startSession()
  }

  function handleEndSession(): void {
    resetCombos(availableCombos)
    endSession()
  }

  useEffect(() => {
    if (!sessionSummary) return

    console.log(sessionSummary)
  }, [sessionSummary])

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
          comboKey={comboKey}
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
