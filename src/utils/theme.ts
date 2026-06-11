import type { ThemeName } from '../types/theme'

export const themeOptions: Array<{
  name: ThemeName
  displayName: string
}> = [
  { name: 'brutalist', displayName: 'Brutalist Athletic' },
  { name: 'muaythai', displayName: 'Traditional Muay Thai' },
  { name: 'poster', displayName: 'Fight Night Poster' },
]

export function isThemeName(value: string | null): value is ThemeName {
  return themeOptions.some((theme) => theme.name === value)
}

export function getStoredTheme(): ThemeName {
  try {
    const storedTheme = localStorage.getItem('theme')
    return isThemeName(storedTheme) ? storedTheme : 'brutalist'
  } catch {
    return 'brutalist'
  }
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.dataset.theme = theme

  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Ignore storage failures. The active document theme still updates.
  }
}
