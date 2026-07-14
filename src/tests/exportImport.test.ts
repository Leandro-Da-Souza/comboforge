import { createAppDataExport, parseAppDataImport } from '../utils/exportImport'
import { describe, expect, it } from 'vitest'
import { timerPresets } from '../config/timer.config'
import { difficultyPresets } from '../config/difficulty.config'
import type { Combo } from '../types/core'
import type { SessionHistory } from '../types/session'
import { guestModeSettings } from '../config/guest.config'
import { APP_DATA_EXPORT_IMPORT } from '../config/export.config'

const customCombos = [
  {
    id: 'combo-1',
    name: 'Jab Cross',
    discipline: 'boxing',
    intensity: 'beginner',
    actions: ['Lead Jab', 'Rear Cross'],
  },
] satisfies Combo[]

const sessionHistory = [
  {
    id: 'session-1',
    createdAt: '2026-07-14T18:00:00.000Z',
    sessionSetup: {
      selectedDiscipline: 'boxing',
      selectedPreset: timerPresets[0],
      selectedDifficulty: difficultyPresets[0],
    },
    endReason: 'completed',
    finishedRounds: 3,
    startedAt: '2026-07-14T18:00:00.000Z',
    endedAt: '2026-07-14T18:09:00.000Z',
    durationSeconds: 540,
    combosUsed: [],
  },
] satisfies SessionHistory

describe('export / import utils', () => {
  it('creates a v1 payload with the provided data', () => {
    const payload = createAppDataExport(
      guestModeSettings,
      customCombos,
      sessionHistory,
    )

    expect(payload).toMatchObject({
      version: APP_DATA_EXPORT_IMPORT.version,
      data: {
        settings: guestModeSettings,
        customCombos,
        sessionHistory,
      },
    })

    expect(payload.exportedAt).toEqual(expect.any(String))
  })

  it('parses a valid v1 export payload', () => {
    const payload = createAppDataExport(
      guestModeSettings,
      customCombos,
      sessionHistory,
    )

    expect(parseAppDataImport(JSON.stringify(payload))).toEqual(payload)
  })

  it('rejects invalid export payloads', () => {
    expect(() => parseAppDataImport(JSON.stringify({ data: {} }))).toThrow(
      'Invalid ComboForge export file.',
    )
  })

  it('rejects unsupported export versions', () => {
    const payload = {
      version: 999,
      exportedAt: '2026-07-14T18:00:00.000Z',
      data: {
        settings: guestModeSettings,
        customCombos,
        sessionHistory,
      },
    }

    expect(() => parseAppDataImport(JSON.stringify(payload))).toThrow(
      'Invalid ComboForge export file.',
    )
  })
})
