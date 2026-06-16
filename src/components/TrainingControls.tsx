import Button from './ui/Button'

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
      <Button variant="primary" type="button" onClick={onStart}>
        {startButtonLabel}
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={onPause}
        disabled={!canPause}
      >
        Pause
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={onEnd}
        disabled={!canEnd}
      >
        End
      </Button>
    </section>
  )
}
