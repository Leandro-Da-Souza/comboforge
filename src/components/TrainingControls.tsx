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
      <button type="button" onClick={onStart}>
        {startButtonLabel}
      </button>
      <button type="button" onClick={onPause} disabled={!canPause}>
        Pause
      </button>
      <button type="button" onClick={onEnd} disabled={!canEnd}>
        End
      </button>
    </section>
  )
}
