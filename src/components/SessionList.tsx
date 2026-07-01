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
import useSessionHistory from '../hooks/useSessionHistory'
import Prompt from './ui/Prompt'

type SessionListProps = {
  sessions: SessionHistory
}

export default function SessionList({ sessions }: SessionListProps) {
  const [displayedSession, setDisplayedSession] =
    useState<SessionRecord | null>(null)
  const [sessionPendingDelete, setSessionPendingDelete] =
    useState<SessionRecord | null>(null)

  const { deleteSessionFromHistory } = useSessionHistory()

  function handleSelectedSession(record: SessionRecord) {
    setDisplayedSession(record)
  }

  function clearSelectedSession(): void {
    setDisplayedSession(null)
  }

  function handlePendingDelete(record: SessionRecord) {
    setDisplayedSession(null)
    setSessionPendingDelete(record)
  }

  function handleDeleteSession(): void {
    if (!sessionPendingDelete) return

    deleteSessionFromHistory(sessionPendingDelete.id)
    setSessionPendingDelete(null)
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
      <Modal
        show={displayedSession !== null}
        onClose={clearSelectedSession}
        className="session-details-modal"
      >
        {displayedSession && (
          <SessionSummaryDetails session={displayedSession}>
            <Button
              type="button"
              variant="danger"
              className="session-delete-button"
              aria-label="Delete session"
              onClick={() => handlePendingDelete(displayedSession)}
            >
              Delete session
            </Button>
          </SessionSummaryDetails>
        )}
      </Modal>
      <Prompt
        show={sessionPendingDelete !== null}
        title="Delete session?"
        message="This removes the workout from your local history."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteSession}
        onCancel={() => setSessionPendingDelete(null)}
      />
    </section>
  )
}
