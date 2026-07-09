import type { SessionHistory, SessionSummary } from '../types/session'
import { formatDiscipline } from './discipline'
import { formatTime } from './time'

const sessionDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

const sessionTimeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
})

export function formatSessionDate(value: string): string {
  return sessionDateFormatter.format(new Date(value))
}

export function formatSessionTime(value: string): string {
  return sessionTimeFormatter.format(new Date(value))
}

export function formatSessionDuration(durationSeconds: number): string {
  return formatTime(Math.max(0, Math.round(durationSeconds)))
}

export function formatSessionDiscipline(session: SessionSummary): string {
  return formatDiscipline(session.sessionSetup.selectedDiscipline)
}

export function groupSessionsByDate(sessions: SessionHistory) {
  return sessions.reduce<Record<string, SessionHistory>>((groups, session) => {
    const dateKey = formatSessionDate(session.endedAt)

    return {
      ...groups,
      [dateKey]: [...(groups[dateKey] ?? []), session],
    }
  }, {})
}

export function getSessionStats(sessions: SessionHistory) {
  return {
    sessionsCompleted: sessions.filter(
      (session) => session.endReason === 'completed',
    ).length,
    totalTrainingSeconds: sessions.reduce(
      (total, session) => total + session.durationSeconds,
      0,
    ),
    totalRoundsCompleted: sessions.reduce(
      (total, session) => total + session.finishedRounds,
      0,
    ),
  }
}
