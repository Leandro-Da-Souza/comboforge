import { useState } from 'react'
import '../styles/combo-panel.css'
import type { Combo } from '../types/core'
import Modal from './ui/Modal'
import { ListChecks } from 'lucide-react'
import { formatCombo } from '../utils/combo'
import Button from './ui/Button'

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
        <Button
          type="button"
          variant="primary"
          className="combo-move-list-button"
          aria-label="Open move list"
          onClick={() => setShowModal(true)}
        >
          <ListChecks aria-hidden="true" size={18} />
        </Button>
      </div>
      <h2>{currentCombo}</h2>
      <p className="upcoming-combo">{upcomingCombo}</p>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="move-list">
          <header className="move-list-header">
            <h3 className="move-list-title">Move List</h3>
          </header>

          <ul className="move-list-items">
            {availableCombos.map((combo) => (
              <li key={combo.id} className="move-list-item">
                <span>
                  <strong>{combo.name}</strong>
                </span>
                <span>{formatCombo(combo.actions)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </section>
  )
}
