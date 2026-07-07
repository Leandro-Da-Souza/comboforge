import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import useCombos from '../hooks/useCombos'
import '../styles/combos.css'
import ComboForm from '../components/ComboForm'
import ComboList from '../components/ComboList'
import type { Combo } from '../types/core'
import Prompt from '../components/ui/Prompt'

export default function CombosPage() {
  const { starterCombos, customCombos, deleteCombo } = useCombos()
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [comboIsEditing, setComboIsEditing] = useState<Combo | null>(null)
  const [comboPendingDelete, setComboPendingDelete] = useState<Combo | null>(
    null,
  )

  function handlePendingDelete(combo: Combo) {
    setComboIsEditing(null)
    setComboPendingDelete(combo)
  }

  function handleDeleteCombo() {
    if (!comboPendingDelete) return

    deleteCombo(comboPendingDelete.id)
    setComboPendingDelete(null)
  }

  return (
    <>
      <PageHeader eyebrow="Library" title="Combos" />

      <section className="combos-page" aria-label="Combo library">
        <section
          className="combo-routing-note"
          aria-label="How combos are used"
        >
          <p>How training uses combos</p>
          <h2>Matched by discipline</h2>
          <span>
            When you start a workout, ComboForge pulls every starter and custom
            combo that matches the selected discipline.
          </span>
        </section>

        <ComboList
          combos={starterCombos}
          eyebrow="Built in"
          title="Starter Library"
          sourceLabel="starter"
          description=""
        />

        <ComboList
          combos={customCombos}
          eyebrow="Your Work"
          title="Custom Combos"
          description=""
          sourceLabel="custom"
          headerChild={
            <div className="combo-section-actions">
              <span>{customCombos.length} combos</span>

              <Button
                variant="primary"
                aria-label="add combo"
                className="combo-section-actions-add"
                onClick={() => setIsCreateOpen((prev) => !prev)}
              >
                Add Combo
              </Button>
            </div>
          }
          onEditCombo={setComboIsEditing}
        />
        <Modal show={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
          <ComboForm onCreated={() => setIsCreateOpen(false)} />
        </Modal>

        <Modal
          show={comboIsEditing !== null}
          onClose={() => setComboIsEditing(null)}
        >
          {comboIsEditing && (
            <ComboForm
              combo={comboIsEditing}
              onSaved={() => setComboIsEditing(null)}
              onDelete={handlePendingDelete}
            />
          )}
        </Modal>
        <Prompt
          show={comboPendingDelete !== null}
          title="Delete combo?"
          message="This removes the custom combo from your local library."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDeleteCombo}
          onCancel={() => setComboPendingDelete(null)}
        />
      </section>
    </>
  )
}
