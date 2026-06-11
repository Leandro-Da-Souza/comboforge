import { useState } from 'react'
import type { ThemeName } from '../types/theme'
import { getStoredTheme, applyTheme } from '../utils/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => getStoredTheme())

  function setTheme(theme: ThemeName): void {
    applyTheme(theme)
    setThemeState(theme)
  }

  return {
    theme,
    setTheme,
  }
}
