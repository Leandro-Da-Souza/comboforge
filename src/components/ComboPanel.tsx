import { useState } from 'react'
import '../styles/combo-panel.css'
import type { Combo } from '../types/core'
import Modal from './ui/Modal'
import { ListChecks } from 'lucide-react'
import { formatCombo } from '../utils/combo'

type ComboPanelProps = {
  currentCombo: string
  upcomingCombo: string
  availableCombos: Combo[]
}

export default function ComboPanel({
  currentCombo,
  upcomingCombo,
  availableCombos,
}: ComboPanelProps) {
  const [showModal, setShowModal] = useState(false)
  return (
    <section className="combo-panel">
      <div className="combo-title">
        <p className="combo-label">Current Combo</p>
        <button
          type="button"
          className="combo-move-list-button"
          aria-label="Open move list"
          onClick={() => setShowModal(true)}
        >
          <ListChecks aria-hidden="true" size={18} />
        </button>
      </div>
      <h2>{currentCombo}</h2>
      <p className="upcoming-combo">{upcomingCombo}</p>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="move-list">
          <header className="move-list-header">
            <p className="combo-label">Move List</p>
            <h2>Available Combos</h2>
          </header>

          <ol className="move-list-items">
            {availableCombos.map((combo) => (
              <li key={combo.id}>
                <strong>{combo.name}</strong>
                <span>{formatCombo(combo.actions)}</span>
              </li>
            ))}
          </ol>
        </div>
      </Modal>
    </section>
  )
}
