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

export default function ComboProvider({ children }: ComboProviderProps) {
  const [customCombos, setCustomCombos] = useState<Combo[]>(
    storage.get(STORAGE_KEYS.customCombos, []),
  )

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
      }}
    >
      {children}
    </ComboContext.Provider>
  )
}
