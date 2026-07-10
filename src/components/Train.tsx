import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import TimerPanel from './TimerPanel'
import ComboPanel from './ComboPanel'
import TrainingControls from './TrainingControls'
import SessionStatus from './SessionStatus'
import Modal from './ui/Modal'
import Button from './ui/Button'
import SessionSummaryDetails from './SessionSummaryDetails'
import { formatCombo } from '../utils/combo'
import { useComboRotation } from '../hooks/useComboRotation'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import { useEffect, useMemo } from 'react'
import type { DifficultyPreset, Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import TrainingSessionMeta from './TrainingSessionMeta'
import type { SessionRecord, SessionSummary } from '../types/session'
import useSessionHistory from '../hooks/useSessionHistory'
import { useNavigate } from 'react-router'
import useCombos from '../hooks/useCombos'
import { useSpeech } from '../hooks/useSpeech'

type TrainProps = {
  selectedDiscipline: Discipline
  selectedPreset: TimerPreset
  selectedDifficulty: DifficultyPreset
}

export default function Train({
  selectedDiscipline,
  selectedPreset,
  selectedDifficulty,
}: TrainProps) {
  const {
    status,
    timer,
    endReason,
    finishedRounds,
    startSession,
    pauseSession,
    endSession,
    resetSession,
    countdownRemainingSeconds,
    startedAt,
  } = useTrainingTimer(selectedPreset.config)

  const { combos } = useCombos()

  const { availableCombos } = useDisciplineSelection(combos, selectedDiscipline)

  const { currentCombo, upcomingCombo, resetCombos, rotateCombo, combosUsed } =
    useComboRotation(availableCombos)

  const { addSessionHistory } = useSessionHistory()

  const navigate = useNavigate()

  const sessionSetup = useMemo(
    () => ({
      selectedDiscipline,
      selectedPreset,
      selectedDifficulty,
    }),
    [selectedDiscipline, selectedPreset, selectedDifficulty],
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
      combosUsed,
    }
  }, [status, endReason, finishedRounds, sessionSetup, startedAt, combosUsed])

  const { speak } = useSpeech()

  const startButtonLabel =
    status === 'paused' ? 'Resume' : status === 'ended' ? 'Restart' : 'Start'

  const isCountingDown = status === 'countdown'
  const isRunning = status === 'running' || status === 'countdown'
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
    startSession()
  }

  function handleEndSession(): void {
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
    resetSession(selectedPreset.config)
    void navigate('/history')
  }

  function handleDiscardSession(): void {
    resetSession(selectedPreset.config)
  }

  const isSessionSummaryOpen = Boolean(sessionSummary)

  useEffect(() => {
    if (status !== 'running') return
    if (!startedAt) return

    resetCombos(availableCombos, true)
  }, [status, startedAt, availableCombos, resetCombos])

  useEffect(() => {
    if (status !== 'running') return
    if (timer.phase !== 'round') return
    if (availableCombos.length === 0) return

    const intervalId = window.setInterval(() => {
      rotateCombo()
    }, sessionSetup.selectedDifficulty.rotationIntervalMilliseconds)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [
    status,
    timer.phase,
    availableCombos.length,
    rotateCombo,
    sessionSetup.selectedDifficulty.rotationIntervalMilliseconds,
  ])

  useEffect(() => {
    if (status !== 'running') return
    if (timer.phase !== 'round') return
    if (!currentCombo) return

    speak(formatCombo(currentCombo.actions))
  }, [status, timer.phase, currentCombo, speak])

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
              : isCountingDown
                ? countdownRemainingSeconds === 0
                  ? 'Fight'
                  : String(countdownRemainingSeconds)
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
              <SessionSummaryDetails session={sessionSummary}>
                <div className="session-summary-actions">
                  <Button variant="secondary" onClick={handleDiscardSession}>
                    Discard
                  </Button>
                  <Button variant="primary" onClick={handleSaveSession}>
                    Save
                  </Button>
                </div>
              </SessionSummaryDetails>
            </div>
          )}
        </Modal>
      </div>
    </section>
  )
}
