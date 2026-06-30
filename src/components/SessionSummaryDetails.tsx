import type { SessionSummary } from '../types/session'
import {
  formatSessionDiscipline,
  formatSessionDuration,
  formatSessionTime,
} from '../utils/session'
import '../styles/session-summary.css'
import type { ReactNode } from 'react'

type SessionSummaryDetailsProps = {
  session: SessionSummary
  children?: ReactNode | null
}

export default function SessionSummaryDetails({
  session,
  children = null,
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
      {children && <div className="session-summary-footer">{children}</div>}
    </article>
  )
}
