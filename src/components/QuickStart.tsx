import { formatTime } from '../utils/time'
import Button from './ui/Button'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import '../styles/quickstart.css'
import { formatDiscipline } from '../utils/discipline'

type QuickStartProps = {
  selectedPreset: TimerPreset
  selectedDiscipline: Discipline
  onStart: () => void
}

export default function QuickStart({
  selectedPreset,
  selectedDiscipline,
  onStart,
}: QuickStartProps) {
  return (
    <div className="quick-start">
      <div>
        <p className="quick-start-kicker">Quick Start</p>
        <h2>{selectedPreset.name}</h2>
      </div>

      <dl className="quick-start-summary">
        <div>
          <dt>Discipline</dt>
          <dd>{formatDiscipline(selectedDiscipline)}</dd>
        </div>
        <div>
          <dt>Rounds</dt>
          <dd>{selectedPreset.config.totalRounds}</dd>
        </div>
        <div>
          <dt>Round</dt>
          <dd>{formatTime(selectedPreset.config.roundDurationSeconds)}</dd>
        </div>
        <div>
          <dt>Rest</dt>
          <dd>{formatTime(selectedPreset.config.restDurationSeconds)}</dd>
        </div>
      </dl>

      <Button
        className="quick-start-button"
        variant="primary"
        onClick={onStart}
      >
        Start Training
      </Button>
    </div>
  )
}
