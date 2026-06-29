import type { SessionSummary } from '../types/session'
import {
  formatSessionDiscipline,
  formatSessionDuration,
  formatSessionTime,
} from '../utils/session'
import '../styles/session-summary.css'

type SessionSummaryDetailsProps = {
  session: SessionSummary
}

export default function SessionSummaryDetails({
  session,
}: SessionSummaryDetailsProps) {
  const preset = session.sessionSetup.selectedPreset
  const resultLabel =
    session.endReason === 'completed' ? 'Completed' : 'Abandoned'

  return (
    <article className="session-summary">
      <header className="session-summary-header">
        <p className="session-summary-eyebrow">Session</p>
        <h2>{preset.name}</h2>
        <span className="session-summary-result">{resultLabel}</span>
      </header>

      <dl className="session-summary-grid">
        <div>
          <dt>Discipline</dt>
          <dd>{formatSessionDiscipline(session)}</dd>
        </div>
        <div>
          <dt>Rounds</dt>
          <dd>
            {session.finishedRounds}/{preset.config.totalRounds}
          </dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatSessionDuration(session.durationSeconds)}</dd>
        </div>
        <div>
          <dt>Ended</dt>
          <dd>{formatSessionTime(session.endedAt)}</dd>
        </div>
      </dl>
    </article>
  )
}
