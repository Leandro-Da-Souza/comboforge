import { ComboContext } from './ComboContext'
import { STORAGE_KEYS } from '../../config/storage.config'
import { storage } from '../../utils/storage'
import type { Combo } from '../../types/core'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { starterCombos } from '../../data/starterCombo'

type ComboProviderProps = {
  children: ReactNode
}

function isValidDiscipline(value: unknown): value is Combo['discipline'] {
  return value === 'boxing' || value === 'kickboxing' || value === 'muay-thai'
}

function isValidIntensity(
  value: unknown,
): value is NonNullable<Combo['intensity']> {
  return (
    value === 'beginner' || value === 'intermediate' || value === 'advanced'
  )
}

function normalizeCombo(combo: Partial<Combo>): Combo | null {
  if (typeof combo !== 'object' || combo === null) return null
  if (typeof combo.id !== 'string') return null
  if (typeof combo.name !== 'string') return null
  if (!isValidDiscipline(combo.discipline)) return null
  if (!Array.isArray(combo.actions)) return null

  const name = combo.name.trim()

  if (!name) return null

  const actions = combo.actions.reduce<string[]>((validActions, action) => {
    if (typeof action !== 'string') return validActions

    const trimmedAction = action.trim()

    return trimmedAction ? [...validActions, trimmedAction] : validActions
  }, [])

  if (actions.length === 0) return null

  return {
    id: combo.id,
    name,
    discipline: combo.discipline,
    actions,
    ...(isValidIntensity(combo.intensity)
      ? { intensity: combo.intensity }
      : {}),
  }
}

function normalizeCombos(combos: Partial<Combo>[]): Combo[] {
  if (!Array.isArray(combos)) return []

  return combos.flatMap((combo) => {
    const normalizedCombo = normalizeCombo(combo)

    return normalizedCombo ? [normalizedCombo] : []
  })
}

export default function ComboProvider({ children }: ComboProviderProps) {
  const [customCombos, setCustomCombos] = useState<Combo[]>(() => {
    const storedCombos = storage.get<Partial<Combo>[]>(
      STORAGE_KEYS.customCombos,
      [],
    )

    return normalizeCombos(storedCombos)
  })

  const combos = useMemo(() => {
    return [...starterCombos, ...customCombos]
  }, [customCombos])

  const addCombo = useCallback((combo: Combo) => {
    setCustomCombos((currentCombos) => [...currentCombos, combo])
  }, [])

  const updateCombo = useCallback((updatedCombo: Combo) => {
    setCustomCombos((currentCombos) =>
      currentCombos.map((combo) =>
        combo.id === updatedCombo.id ? { ...combo, ...updatedCombo } : combo,
      ),
    )
  }, [])

  const deleteCombo = useCallback((comboId: string) => {
    setCustomCombos((currentCombos) =>
      currentCombos.filter((combo) => combo.id !== comboId),
    )
  }, [])

  const replaceCustomCombos = useCallback((combos: Partial<Combo>[]) => {
    setCustomCombos(normalizeCombos(combos))
  }, [])

  useEffect(() => {
    storage.set(STORAGE_KEYS.customCombos, customCombos)
  }, [customCombos])

  return (
    <ComboContext.Provider
      value={{
        starterCombos,
        customCombos,
        combos,
        addCombo,
        updateCombo,
        deleteCombo,
        replaceCustomCombos,
      }}
    >
      {children}
    </ComboContext.Provider>
  )
}
