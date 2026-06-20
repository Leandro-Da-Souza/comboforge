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
      <p className="session-status">Status: {statusLabel[status]}</p>
    </section>
  )
}
