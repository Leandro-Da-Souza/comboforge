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
      return {
        status: 'running',
        timer:
          state.status === 'ended'
            ? createTimerState(action.config)
            : state.timer,
      }
    }
    case 'pause': {
      return {
        ...state,
        status: 'paused',
      }
    }
    case 'end': {
      return {
        status: 'ended',
        timer: createTimerState(action.config),
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
            status: 'ended',
            timer: resetTimerProgress(state.timer),
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

    default: {
      return state
    }
  }
}

export function useTrainingTimer(config: TimerConfig = defaultTimerConfig) {
  const [state, dispatch] = useReducer(trainingTimerReducer, {
    status: 'idle',
    timer: createTimerState(config),
  })

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

  return {
    status: state.status,
    timer: state.timer,
    startSession,
    pauseSession,
    endSession,
  }
}
