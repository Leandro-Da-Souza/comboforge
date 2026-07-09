import { useEffect, useReducer } from 'react'
import type { TrainingAction, TrainingState } from '../types/training'
import type { TimerConfig } from '../types/timer'
import { defaultTimerConfig } from '../config/timer.config'
import { createTimerState, resetTimerProgress } from '../utils/timer'

function trainingTimerReducer(
  state: TrainingState,
  action: TrainingAction,
): TrainingState {
  switch (action.type) {
    case 'start': {
      if (state.status === 'paused') {
        return {
          ...state,
          status: state.countdownRemainingSeconds ? 'countdown' : 'running',
        }
      }

      return {
        status: 'countdown',
        timer:
          state.status === 'ended'
            ? createTimerState(action.config)
            : state.timer,
        countdownRemainingSeconds: 3,
        finishedRounds: 0,
        endReason: undefined,
      }
    }

    case 'countdownTick': {
      if (state.status !== 'countdown') return state

      if ((state.countdownRemainingSeconds ?? 0) > 0) {
        return {
          ...state,
          countdownRemainingSeconds: state.countdownRemainingSeconds! - 1,
        }
      }

      return {
        ...state,
        status: 'running',
        countdownRemainingSeconds: undefined,
        startedAt: new Date().toISOString(),
      }
    }

    case 'pause': {
      return {
        ...state,
        status: 'paused',
      }
    }

    case 'end': {
      const timer = state.timer
      const completedRounds =
        timer.phase === 'rest' ? timer.currentRound : timer.currentRound - 1

      return {
        ...state,
        status: 'ended',
        timer: createTimerState(action.config),
        countdownRemainingSeconds: undefined,
        finishedRounds: Math.max(completedRounds, 0),
        endReason: 'abandoned',
      }
    }

    case 'tick': {
      if (state.status !== 'running') return state

      const timer = state.timer

      if (timer.remainingSeconds > 1) {
        return {
          ...state,
          timer: {
            ...timer,
            remainingSeconds: timer.remainingSeconds - 1,
          },
        }
      }

      if (timer.phase === 'round') {
        if (timer.currentRound >= timer.totalRounds) {
          return {
            ...state,
            status: 'ended',
            timer: resetTimerProgress(timer),
            countdownRemainingSeconds: undefined,
            finishedRounds: timer.totalRounds,
            endReason: 'completed',
          }
        }

        return {
          ...state,
          timer: {
            ...timer,
            phase: 'rest',
            remainingSeconds: timer.restDurationSeconds,
          },
        }
      }

      return {
        ...state,
        timer: {
          ...timer,
          currentRound: timer.currentRound + 1,
          phase: 'round',
          remainingSeconds: timer.roundDurationSeconds,
        },
      }
    }

    case 'reset': {
      return {
        status: 'idle',
        timer: createTimerState(action.config),
        finishedRounds: 0,
        endReason: undefined,
      }
    }

    default: {
      return state
    }
  }
}

export function useTrainingTimer(config: TimerConfig = defaultTimerConfig) {
  const [state, dispatch] = useReducer(trainingTimerReducer, {
    status: 'idle',
    timer: createTimerState(config),
    finishedRounds: 0,
  })

  useEffect(() => {
    if (state.status !== 'countdown') return

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'countdownTick' })
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [state.status, state.countdownRemainingSeconds])

  useEffect(() => {
    if (state.status !== 'running') return
    if (state.timer.remainingSeconds <= 0) return

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [state.status, state.timer.remainingSeconds])

  function startSession() {
    dispatch({ type: 'start', config })
  }

  function pauseSession() {
    dispatch({ type: 'pause' })
  }

  function endSession() {
    dispatch({ type: 'end', config })
  }

  function resetSession(config: TimerConfig) {
    dispatch({ type: 'reset', config })
  }

  return {
    status: state.status,
    timer: state.timer,
    endReason: state.endReason,
    finishedRounds: state.finishedRounds,
    countdownRemainingSeconds: state.countdownRemainingSeconds,
    startedAt: state.startedAt,
    startSession,
    pauseSession,
    endSession,
    resetSession,
  }
}
