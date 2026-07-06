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
  combo?: Combo
  onSaved?: () => void
  onDelete?: (combo: Combo) => void
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

export default function ComboForm({
  onCreated,
  combo,
  onSaved,
  onDelete,
}: ComboFormProps) {
  const { addCombo, updateCombo } = useCombos()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComboFormValues>({
    defaultValues: {
      name: combo?.name ?? '',
      discipline: combo?.discipline ?? 'boxing',
      intensity: combo?.intensity ?? 'beginner',
      actionsText: combo?.actions.join(', ') ?? '',
    },
  })

  const isEditing = Boolean(combo)

  const parseActions = (actions: string) => {
    return actions
      .split(',')
      .map((action) => action.trim())
      .filter(Boolean)
  }

  const onSubmit: SubmitHandler<ComboFormValues> = (data) => {
    const savedCombo: Combo = {
      id: combo?.id ?? crypto.randomUUID(),
      name: data.name,
      discipline: data.discipline,
      intensity: data.intensity,
      actions: parseActions(data.actionsText),
    }

    if (combo) {
      updateCombo(savedCombo)
      reset()
      onSaved?.()
    } else {
      addCombo(savedCombo)
      reset()
      onCreated?.()
    }
  }

  return (
    <form
      className="combo-form"
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event)
      }}
    >
      <header className="combo-form-header">
        <h2>{isEditing ? 'Edit Combo' : 'New Combo'}</h2>
      </header>

      <label className="combo-form-field">
        <span>Name</span>
        <input
          {...register('name', { required: true })}
          placeholder={combo?.name ?? 'Jab Cross Hook'}
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

      <div className="combo-form-button-group">
        {isEditing && combo && (
          <Button
            type="button"
            variant="danger"
            onClick={() => onDelete?.(combo)}
          >
            Delete
          </Button>
        )}
        <Button type="submit" variant="primary">
          {isEditing ? 'Save Changes' : 'Save Combo'}
        </Button>
      </div>
    </form>
  )
}
