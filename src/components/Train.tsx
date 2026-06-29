import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import TimerPanel from './TimerPanel'
import ComboPanel from './ComboPanel'
import TrainingControls from './TrainingControls'
import SessionStatus from './SessionStatus'
import Modal from './ui/Modal'
import Button from './ui/Button'
import SessionSummaryDetails from './SessionSummaryDetails'
import { starterCombos } from '../data/starterCombo'
import { formatCombo } from '../utils/combo'
import { useComboRotation } from '../hooks/useComboRotation'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import { useEffect, useMemo, useState } from 'react'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import { trainingConfig } from '../config/training.config'
import TrainingSessionMeta from './TrainingSessionMeta'
import type { SessionRecord, SessionSummary } from '../types/session'
import useSessionHistory from '../hooks/useSessionHistory'
import { useNavigate } from 'react-router'

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

  const { availableCombos } = useDisciplineSelection(
    starterCombos,
    selectedDiscipline,
  )

  const { currentCombo, upcomingCombo, resetCombos, rotateCombo } =
    useComboRotation(availableCombos)

  const [startedAt, setStartedAt] = useState<string | undefined>()

  const { addSessionHistory } = useSessionHistory()

  const navigate = useNavigate()

  const sessionSetup = useMemo(
    () => ({
      selectedDiscipline,
      selectedPreset,
    }),
    [selectedDiscipline, selectedPreset],
  )

  const sessionSummary = useMemo<SessionSummary | undefined>(() => {
    if (status !== 'ended' || !endReason || !startedAt) return undefined

    const endedAt = new Date().toISOString()
    const durationSeconds =
      (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 1000

    return {
      sessionSetup,
      endReason,
      finishedRounds,
      startedAt,
      endedAt,
      durationSeconds,
    }
  }, [status, endReason, finishedRounds, sessionSetup, startedAt])

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
    if (status === 'idle' || status === 'ended') {
      setStartedAt(new Date().toISOString())
    }
    resetCombos(availableCombos)
    startSession()
  }

  function handleEndSession(): void {
    resetCombos(availableCombos)
    endSession()
  }

  function handleSaveSession(): void {
    if (!sessionSummary) return

    const record: SessionRecord = {
      ...sessionSummary,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    addSessionHistory(record)
    setStartedAt(undefined)
    void navigate('/history')
  }

  function handleDiscardSession(): void {
    setStartedAt(undefined)
  }

  const isSessionSummaryOpen = Boolean(sessionSummary)

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
        <Modal show={isSessionSummaryOpen} onClose={handleDiscardSession}>
          {sessionSummary && (
            <div className="session-summary-modal">
              <SessionSummaryDetails session={sessionSummary} />
              <div className="session-summary-actions">
                <Button variant="secondary" onClick={handleDiscardSession}>
                  Discard
                </Button>
                <Button variant="primary" onClick={handleSaveSession}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  )
}
