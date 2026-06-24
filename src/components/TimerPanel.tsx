import type { TimerState } from '../types/timer'
import { formatTime } from '../utils/time'
import '../styles/timer-panel.css'
import type { Discipline } from '../types/core'
import { formatDiscipline } from '../utils/discipline'

type TimerPanelProps = {
  timer: TimerState
  discipline: Discipline
}

export default function TimerPanel({ timer, discipline }: TimerPanelProps) {
  return (
    <section className="timer-panel">
      <div className="round-label">
        <p>
          discipline:{' '}
          <span className="separator">{formatDiscipline(discipline)}</span>
        </p>
        {timer.phase === 'round' ? (
          <p>
            <span>Round {timer.currentRound}</span>
            <span className="separator"> / </span>
            <span>{(timer.totalRounds + '').padStart(2, '0')}</span>
          </p>
        ) : (
          <span>Rest</span>
        )}
      </div>
      <p className="timer-display">{formatTime(timer.remainingSeconds)}</p>
    </section>
  )
}
