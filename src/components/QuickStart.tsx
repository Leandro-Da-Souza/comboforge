import { formatTime } from '../utils/time'
import Button from './ui/Button'
import type { Discipline } from '../types/core'
import type { TimerPreset } from '../types/timer'
import '../styles/quickstart.css'

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
        <p className="kicker">Quick Start</p>
        <h2>{selectedPreset.name}</h2>
      </div>

      <dl className="session-summary">
        <div>
          <dt>Discipline</dt>
          <dd>{selectedDiscipline}</dd>
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

      <Button className="start-button" variant="primary" onClick={onStart}>
        Start Training
      </Button>
    </div>
  )
}
