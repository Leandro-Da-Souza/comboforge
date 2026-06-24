import Button from './ui/Button'
import '../styles/training-controls.css'

type TrainingControlsProps = {
  startButtonLabel: string
  onStart: () => void
  onPause: () => void
  onEnd: () => void
  canPause: boolean
  canEnd: boolean
}

export default function TrainingControls({
  startButtonLabel,
  onStart,
  onPause,
  onEnd,
  canPause,
  canEnd,
}: TrainingControlsProps) {
  return (
    <section className="training-controls">
      {!canPause ? (
        <Button variant="primary" type="button" onClick={onStart}>
          {startButtonLabel}
        </Button>
      ) : null}

      {canPause ? (
        <Button variant="secondary" type="button" onClick={onPause}>
          Pause
        </Button>
      ) : null}

      {canEnd ? (
        <Button variant="secondary" type="button" onClick={onEnd}>
          End
        </Button>
      ) : null}
    </section>
  )
}
