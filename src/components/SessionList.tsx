import type { SessionHistory, SessionRecord } from '../types/session'
import {
  formatSessionDiscipline,
  formatSessionDuration,
  formatSessionTime,
  groupSessionsByDate,
} from '../utils/session'
import '../styles/session-list.css'
import { useState } from 'react'
import Modal from './ui/Modal'
import SessionSummaryDetails from './SessionSummaryDetails'
import Button from './ui/Button'
import { Trash } from 'lucide-react'
import useSessionHistory from '../hooks/useSessionHistory'

type SessionListProps = {
  sessions: SessionHistory
}

export default function SessionList({ sessions }: SessionListProps) {
  const [displayedSession, setDisplayedSession] =
    useState<SessionRecord | null>(null)

  const { deleteSessionFromHistory } = useSessionHistory()

  function handleSelectedSession(record: SessionRecord) {
    setDisplayedSession(record)
  }

  function clearSelectedSession(): void {
    setDisplayedSession(null)
  }

  function handleDeleteSession(record: SessionRecord) {
    deleteSessionFromHistory(record.id)
    setDisplayedSession(null)
  }

  if (!sessions.length) {
    return (
      <section className="session-list-empty">
        <h3>No sessions saved yet</h3>
        <p>Finish a workout and save it to start building your log.</p>
      </section>
    )
  }

  const groupedSessions = groupSessionsByDate(sessions)

  return (
    <section className="session-list" aria-label="Saved training sessions">
      {Object.entries(groupedSessions).map(([date, dateSessions]) => (
        <section className="session-day" key={date}>
          <h2 className="session-day-title">{date}</h2>
          <ol className="session-day-list">
            {dateSessions.map((session) => {
              const preset = session.sessionSetup.selectedPreset
              const resultLabel =
                session.endReason === 'completed' ? 'Complete' : 'Abandoned'

              return (
                <li
                  className="session-list-item"
                  key={session.id}
                  onClick={() => handleSelectedSession(session)}
                >
                  <article className="session-list-card">
                    <header>
                      <div>
                        <p className="session-list-time">
                          {formatSessionTime(session.endedAt)}
                        </p>
                        <h3>{preset.name}</h3>
                      </div>
                      <span className="session-list-result">{resultLabel}</span>
                    </header>

                    <p className="session-list-meta">
                      <span>{formatSessionDiscipline(session)}</span>
                      <span>
                        {session.finishedRounds}/{preset.config.totalRounds}{' '}
                        rounds
                      </span>
                      <span>
                        {formatSessionDuration(session.durationSeconds)}
                      </span>
                    </p>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
      <Modal show={displayedSession !== null} onClose={clearSelectedSession}>
        {displayedSession && (
          <SessionSummaryDetails session={displayedSession}>
            <Button
              type="button"
              variant="danger"
              aria-label="Delete session"
              onClick={() => handleDeleteSession(displayedSession)}
            >
              <Trash aria-hidden="true" size={18} />
            </Button>
          </SessionSummaryDetails>
        )}
      </Modal>
    </section>
  )
}
