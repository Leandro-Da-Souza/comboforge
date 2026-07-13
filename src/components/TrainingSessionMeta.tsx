import type { Difficulty, Discipline } from '../types/core'
import type { TimerState } from '../types/timer'
import { formatDiscipline } from '../utils/discipline'

type TrainingSessionMetaProps = {
  discipline: Discipline
  timer: TimerState
  difficulty: Difficulty
}

export default function TrainingSessionMeta({
  discipline,
  timer,
  difficulty,
}: TrainingSessionMetaProps) {
  return (
    <section className="training-session-meta" aria-label="Training session">
      <p>
        <span>Discipline</span>
        <strong>{formatDiscipline(discipline)}</strong>
      </p>
      <p>
        <span>Difficulty</span>
        <strong>{difficulty}</strong>
      </p>
      <p>
        <span>{timer.phase === 'round' ? 'Round' : 'Rest'}</span>
        {timer.phase === 'round' ? (
          <strong>
            {timer.currentRound} / {String(timer.totalRounds).padStart(2, '0')}
          </strong>
        ) : (
          <strong>Break</strong>
        )}
      </p>
    </section>
  )
}
