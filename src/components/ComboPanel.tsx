import { useState } from 'react'
import '../styles/combo-panel.css'
import type { Combo } from '../types/core'
import Modal from './ui/Modal'
import { ListChecks } from 'lucide-react'
import Button from './ui/Button'

type ComboPanelProps = {
  currentCombo: string
  upcomingCombo: string
  availableCombos: Combo[]
  comboKey: string
}

export default function ComboPanel({
  currentCombo,
  upcomingCombo,
  availableCombos,
  comboKey,
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
      <div key={comboKey} className="combo-content">
        <h2>{currentCombo}</h2>
        <p className="upcoming-combo">{upcomingCombo}</p>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="move-list">
          <header className="move-list-header">
            <div>
              <p className="combo-label">Move List</p>
              <h3 className="move-list-title">Available Combos</h3>
            </div>
            <span className="move-list-count">
              {availableCombos.length} moves
            </span>
          </header>

          {availableCombos.length > 0 ? (
            <ul className="move-list-items">
              {availableCombos.map((combo) => (
                <li key={combo.id} className="move-list-item">
                  <strong>{combo.name}</strong>
                  <div className="move-list-actions">
                    {combo.actions.map((action, index) => (
                      <span key={`${combo.id}-${action}-${index}`}>
                        {action}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="move-list-empty">No combos available.</p>
          )}
        </div>
      </Modal>
    </section>
  )
}
