import { themeOptions } from '../utils/theme'
import { useTheme } from '../hooks/useTheme'
import Button from './ui/Button'
import '../styles/theme-selector.css'

export default function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme()

  return (
    <section className="theme-select" role="group" aria-label="Theme Selector">
      {themeOptions.map((theme) => (
        <Button
          type="button"
          variant="secondary"
          key={theme.name}
          onClick={() => setTheme(theme.name)}
          pressed={theme.name === currentTheme}
        >
          {theme.displayName}
          {theme.name === currentTheme ? (
            <span aria-hidden="true">&#9745;</span>
          ) : (
            <span aria-hidden="true">&#9744;</span>
          )}
        </Button>
      ))}
    </section>
  )
}
