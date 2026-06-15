import { themeOptions } from '../utils/theme'
import { useTheme } from '../hooks/useTheme'
import '../styles/visuals.css'

export default function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme()

  return (
    <section className="theme-select" role="group" aria-label="Theme Selector">
      {themeOptions.map((theme) => (
        <button
          type="button"
          key={theme.name}
          onClick={() => setTheme(theme.name)}
          aria-pressed={theme.name === currentTheme}
        >
          {theme.displayName}
          {theme.name === currentTheme ? (
            <span aria-hidden="true">&#9745;</span>
          ) : (
            <span aria-hidden="true">&#9744;</span>
          )}
        </button>
      ))}
    </section>
  )
}
