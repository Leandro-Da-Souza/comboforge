import type { DifficultyPreset } from '../types/core'
import Button from './ui/Button'
import '../styles/difficulty-selector.css'

type DifficultySelectorProps = {
  presets: DifficultyPreset[]
  selectedDifficultyId: string
  onDifficultySelect: (difficulty: DifficultyPreset) => void
}

export default function DifficultySelector({
  presets,
  selectedDifficultyId,
  onDifficultySelect,
}: DifficultySelectorProps) {
  return (
    <section className="difficulty-selector" aria-label="Difficulty preset">
      {presets.map((difficulty) => (
        <Button
          key={difficulty.id}
          type="button"
          variant="secondary"
          pressed={difficulty.id === selectedDifficultyId}
          onClick={() => onDifficultySelect(difficulty)}
          className="difficulty-selector-button"
        >
          <div className="difficulty-selector-title">
            <p>{difficulty.name}</p>
            <span>{difficulty.rotationIntervalMilliseconds / 1000}s</span>
          </div>
          <p className="difficulty-selector-description">
            {difficulty.description}
          </p>
        </Button>
      ))}
    </section>
  )
}
