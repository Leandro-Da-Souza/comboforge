import { formatSessionDuration, getSessionStats } from '../utils/session'
import type { SessionHistory } from '../types/session'
import '../styles/session-stats.css'

type SessionStatsProps = {
  sessions: SessionHistory
}

export default function SessionStats({ sessions }: SessionStatsProps) {
  const stats = getSessionStats(sessions)

  return (
    <section className="session-stats" aria-label="Training statistics">
      <article className="session-stat-card">
        <span>Completed</span>
        <strong>{stats.sessionsCompleted}</strong>
      </article>

      <article className="session-stat-card session-stat-card-featured">
        <span>Training Time</span>
        <strong>{formatSessionDuration(stats.totalTrainingSeconds)}</strong>
      </article>

      <article className="session-stat-card">
        <span>Rounds</span>
        <strong>{stats.totalRoundsCompleted}</strong>
      </article>
    </section>
  )
}
