import type { Discipline } from '../types/core'
import Button from './ui/Button'

type DisciplineSelectorProps = {
  disciplines: Discipline[]
  currentDiscipline: Discipline
  onDisciplineSelect: (discipline: Discipline) => void
}

export default function DisciplineSelector({
  disciplines,
  currentDiscipline,
  onDisciplineSelect,
}: DisciplineSelectorProps) {
  return (
    <section className="discipline-selector">
      {disciplines.map((discipline) => (
        <Button
          key={discipline}
          variant="secondary"
          pressed={currentDiscipline === discipline}
          onClick={() => onDisciplineSelect(discipline)}
        >
          {discipline}
        </Button>
      ))}
    </section>
  )
}
