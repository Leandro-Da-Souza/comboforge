/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTrainingTimer } from '../hooks/useTrainingTimer'
import type { TimerConfig } from '../types/timer'

const config: TimerConfig = {
  totalRounds: 2,
  roundDurationSeconds: 3,
  restDurationSeconds: 2,
}

describe('useTrainingTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with a countdown before entering the running state', () => {
    const { result } = renderHook(() => useTrainingTimer(config))

    act(() => {
      result.current.startSession()
    })

    expect(result.current.status).toBe('countdown')
    expect(result.current.countdownRemainingSeconds).toBe(3)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.status).toBe('countdown')
    expect(result.current.countdownRemainingSeconds).toBe(2)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.status).toBe('countdown')
    expect(result.current.countdownRemainingSeconds).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.status).toBe('countdown')
    expect(result.current.countdownRemainingSeconds).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.status).toBe('running')
    expect(result.current.countdownRemainingSeconds).toBeUndefined()
    expect(result.current.startedAt).toEqual(expect.any(String))
  })
})
