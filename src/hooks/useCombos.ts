import { useContext } from 'react'
import { ComboContext } from '../store/Combos/ComboContext'

export default function useCombos() {
  const context = useContext(ComboContext)

  if (!context) {
    throw new Error('useCombos must be used within a ComboProvider')
  }

  return {
    combos: context.combos,
    customCombos: context.customCombos,
    starterCombos: context.starterCombos,
    addCombo: context.addCombo,
    updateCombo: context.updateCombo,
    deleteCombo: context.deleteCombo,
    replaceCustomCombos: context.replaceCustomCombos,
  }
}
