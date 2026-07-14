import { describe, expect, it } from 'vitest'
import { formatSessionDuration, getSessionStats } from '../utils/session'
import type { SessionHistory } from '../types/session'
import { timerPresets } from '../config/timer.config'
import { difficultyPresets } from '../config/difficulty.config'

const sessionSetup = {
  selectedDiscipline: 'boxing' as const,
  selectedPreset: timerPresets[0],
  selectedDifficulty: difficultyPresets[0],
}

describe('session utils', () => {
  it('formats session duration as mm:ss', () => {
    expect(formatSessionDuration(65)).toBe('01:05')
  })

  it('calculates stats from completed sessions only', () => {
    const sessions: SessionHistory = [
      {
        id: 'completed-session',
        createdAt: '2026-07-14T18:00:00.000Z',
        sessionSetup,
        endReason: 'completed',
        finishedRounds: 3,
        startedAt: '2026-07-14T18:00:00.000Z',
        endedAt: '2026-07-14T18:09:00.000Z',
        durationSeconds: 540,
        combosUsed: [],
      },
      {
        id: 'abandoned-session',
        createdAt: '2026-07-14T19:00:00.000Z',
        sessionSetup,
        endReason: 'abandoned',
        finishedRounds: 1,
        startedAt: '2026-07-14T19:00:00.000Z',
        endedAt: '2026-07-14T19:02:00.000Z',
        durationSeconds: 120,
        combosUsed: [],
      },
    ]

    expect(getSessionStats(sessions)).toEqual({
      sessionsCompleted: 1,
      totalTrainingSeconds: 540,
      totalRoundsCompleted: 3,
    })
  })
})
