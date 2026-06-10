import { useEffect, useReducer } from 'react'

// Later: split ended into completed/abandoned and show summary modal for completed sessions.
type TrainingStatus = 'idle' | 'running' | 'paused' | 'ended'
type TimerPhase = 'round' | 'rest'
type TimerState = {
  currentRound: number
  totalRounds: number
  phase: TimerPhase
  remainingSeconds: number
  roundDurationSeconds: number
  restDurationSeconds: number
}

type TrainingState = {
  status: TrainingStatus
  timer: TimerState
}

type TrainingAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'end' }
  | { type: 'tick' }

function createDefaultTimer(): TimerState {
  return {
    currentRound: 1,
    totalRounds: 3,
    phase: 'round',
    remainingSeconds: 180,
    roundDurationSeconds: 180,
    restDurationSeconds: 60,
  }
}

function trainingTimerReducer(
  state: TrainingState,
  action: TrainingAction,
): TrainingState {
  switch (action.type) {
    case 'start': {
      return {
        status: 'running',
        timer: state.status === 'ended' ? createDefaultTimer() : state.timer,
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
        timer: createDefaultTimer(),
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
            timer: createDefaultTimer(),
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

export function useTrainingTimer() {
  const [state, dispatch] = useReducer(trainingTimerReducer, {
    status: 'idle',
    timer: createDefaultTimer(),
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
    dispatch({ type: 'start' })
  }

  function pauseSession() {
    dispatch({ type: 'pause' })
  }

  function endSession() {
    dispatch({ type: 'end' })
  }

  return {
    status: state.status,
    timer: state.timer,
    startSession,
    pauseSession,
    endSession,
  }
}
