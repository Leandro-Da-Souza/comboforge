import '../styles/preset.css'
import type { TimerPreset } from '../types/timer'
import Button from './ui/Button'
import { HandFist } from 'lucide-react'
import { formatTime } from '../utils/time'

type PresetSelectorProps = {
  presets: TimerPreset[]
  selectedPresetId: string
  canChangePreset: boolean
  onPresetSelect: (preset: TimerPreset) => void
}

export default function PresetSelector({
  presets,
  selectedPresetId,
  canChangePreset,
  onPresetSelect,
}: PresetSelectorProps) {
  return (
    <section className="preset-selector" aria-label="Timer preset">
      {presets.map((preset) => (
        <Button
          key={preset.id}
          type="button"
          variant="secondary"
          pressed={preset.id === selectedPresetId}
          disabled={!canChangePreset}
          onClick={() => onPresetSelect(preset)}
          className="preset-selector-button"
        >
          <div className="preset-selector-title">
            <p>{preset.name}</p>
            <span>
              <HandFist aria-hidden="true" size={18} />
            </span>
          </div>
          <div className="preset-selector-info">
            <span>{preset.config.totalRounds} rds</span>
            <span>{formatTime(preset.config.roundDurationSeconds)} round</span>
            <span>{formatTime(preset.config.restDurationSeconds)} rest</span>
          </div>
        </Button>
      ))}
    </section>
  )
}
