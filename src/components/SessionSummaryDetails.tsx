import type { SessionSummary } from '../types/session'
import {
  formatSessionDiscipline,
  formatSessionDuration,
  formatSessionTime,
} from '../utils/session'
import { formatCombo } from '../utils/combo'
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

      <section className="session-summary-combos">
        <header className="session-summary-combos-header">
          <p>Combos used</p>
          <span>{session.combosUsed.length}</span>
        </header>

        {session.combosUsed.length > 0 ? (
          <ul>
            {session.combosUsed.map((combo) => (
              <li key={combo.id}>
                <strong>{combo.name}</strong>
                <span>{formatCombo(combo.actions)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="session-summary-combos-empty">
            No combos were recorded.
          </p>
        )}
      </section>

      {children && <div className="session-summary-footer">{children}</div>}
    </article>
  )
}
