import type { TrainingStatus } from '../types/training'
import '../styles/session-status.css'

type SessionStatusProps = {
  status: TrainingStatus
}

const statusLabel: Record<TrainingStatus, string> = {
  idle: 'Ready',
  running: 'Training',
  paused: 'Paused',
  ended: 'Complete',
}

export default function SessionStatus({ status }: SessionStatusProps) {
  return (
    <section className="session-status-panel">
      <h3 className="session-status">{statusLabel[status]}</h3>
    </section>
  )
}
