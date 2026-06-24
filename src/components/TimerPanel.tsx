import type { TimerState } from '../types/timer'
import { formatTime } from '../utils/time'
import '../styles/timer-panel.css'

type TimerPanelProps = {
  timer: TimerState
}

export default function TimerPanel({ timer }: TimerPanelProps) {
  return (
    <section className="timer-panel">
      <p className="timer-display">{formatTime(timer.remainingSeconds)}</p>
    </section>
  )
}
