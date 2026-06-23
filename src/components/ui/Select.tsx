import '../../styles/ui/select.css'

type SelectOption<T extends string> = {
  label: string
  value: T
}

type SelectProps<T extends string> =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    options: SelectOption<T>[]
  }

export default function Select<T extends string>({
  label,
  options,
  ...props
}: SelectProps<T>) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select className="select-control" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
