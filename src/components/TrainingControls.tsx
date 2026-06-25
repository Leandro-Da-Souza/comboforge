import Button from './ui/Button'
import '../styles/training-controls.css'

type TrainingControlsProps = {
  startButtonLabel: string
  onStart: () => void
  onPause: () => void
  onEnd: () => void
  isRunning: boolean
  canEnd: boolean
}

export default function TrainingControls({
  startButtonLabel,
  onStart,
  onPause,
  onEnd,
  isRunning,
  canEnd,
}: TrainingControlsProps) {
  return (
    <section className="training-controls">
      {!isRunning ? (
        <Button variant="primary" type="button" onClick={onStart}>
          {startButtonLabel}
        </Button>
      ) : null}

      {isRunning ? (
        <Button variant="secondary" type="button" onClick={onPause}>
          Pause
        </Button>
      ) : null}

      {canEnd ? (
        <Button variant="danger" type="button" onClick={onEnd}>
          End
        </Button>
      ) : null}
    </section>
  )
}
