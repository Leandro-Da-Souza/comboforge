import '../../styles/ui/button.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  className?: string
  pressed?: boolean
}

export default function Button({
  variant = 'secondary',
  className = '',
  pressed,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </button>
  )
}
