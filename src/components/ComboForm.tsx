import useCombos from '../hooks/useCombos'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { Combo, Discipline, Intensity } from '../types/core'
import Button from './ui/Button'
import Select from './ui/Select'
import '../styles/combo-form.css'

type ComboFormValues = {
  name: string
  discipline: Discipline
  intensity: Intensity
  actionsText: string
}

type ComboFormProps = {
  onCreated?: () => void
}

const disciplineOptions: Array<{ label: string; value: Discipline }> = [
  { label: 'Boxing', value: 'boxing' },
  { label: 'Kickboxing', value: 'kickboxing' },
  { label: 'Muay Thai', value: 'muay-thai' },
]

const intensityOptions: Array<{ label: string; value: Intensity }> = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

export default function ComboForm({ onCreated }: ComboFormProps) {
  const { addCombo } = useCombos()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComboFormValues>({
    defaultValues: {
      discipline: 'boxing',
      intensity: 'beginner',
    },
  })

  const parseActions = (actions: string) => {
    return actions
      .split(',')
      .map((action) => action.trim())
      .filter(Boolean)
  }

  const onSubmit: SubmitHandler<ComboFormValues> = (data) => {
    const combo: Combo = {
      id: crypto.randomUUID(),
      name: data.name,
      discipline: data.discipline,
      intensity: data.intensity || 'beginner',
      actions: parseActions(data.actionsText),
    }

    addCombo(combo)
    reset()
    onCreated?.()
  }

  return (
    <form
      className="combo-form"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event)
      }}
    >
      <header className="combo-form-header">
        <p>Create combo</p>
        <h2>New sequence</h2>
      </header>

      <label className="combo-form-field">
        <span>Name</span>
        <input
          {...register('name', { required: true })}
          placeholder="Jab Cross Hook"
        />
        {errors.name && <small>Name is required.</small>}
      </label>

      <div className="combo-form-grid">
        <div className="combo-form-control-group">
          <Select
            label="Discipline"
            options={disciplineOptions}
            {...register('discipline', { required: true })}
          />
          <small>Used in workouts with this discipline.</small>
        </div>
        <Select
          label="Intensity"
          options={intensityOptions}
          {...register('intensity', { required: true })}
        />
      </div>

      <label className="combo-form-field">
        <span>Actions</span>
        <textarea
          {...register('actionsText', { required: true })}
          placeholder="Lead Jab, Rear Cross, Lead Hook"
          rows={4}
        />
        {errors.actionsText && <small>Add at least one action.</small>}
      </label>

      <Button type="submit" variant="primary">
        Save combo
      </Button>
    </form>
  )
}
