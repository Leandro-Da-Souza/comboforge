import type { TrainingStatus } from '../types/training'

type SessionStatusProps = {
  status: TrainingStatus
}

export default function SessionStatus({ status }: SessionStatusProps) {
  return (
    <section className="train-header">
      <p className="session-status">Status: {status}</p>
    </section>
  )
}
