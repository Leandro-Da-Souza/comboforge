import type { TimerPreset } from '../types/timer'
import Button from './ui/Button'

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
        >
          {preset.name}
        </Button>
      ))}
    </section>
  )
}
