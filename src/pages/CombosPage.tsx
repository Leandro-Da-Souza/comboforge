import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import useCombos from '../hooks/useCombos'
import '../styles/combos.css'
import ComboForm from '../components/ComboForm'
import ComboList from '../components/ComboList'
import type { Combo } from '../types/core'

export default function CombosPage() {
  const { starterCombos, customCombos } = useCombos()
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [comboIsEditing, setComboIsEditing] = useState<Combo | null>(null)

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Combos"
        description="Manage custom combinations and starter libraries."
      />

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
          description="Beginner Combos Built In To The Forge"
        />

        <ComboList
          combos={customCombos}
          eyebrow="Your Work"
          title="Custom Combos"
          description="Custom combos join matching discipline workouts automatically."
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
          <ComboForm />
        </Modal>
      </section>
    </>
  )
}
