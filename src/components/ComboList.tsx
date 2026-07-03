import { formatCombo } from '../utils/combo'
import { formatDiscipline } from '../utils/discipline'
import type { Combo } from '../types/core'
import type { ReactNode } from 'react'

type ComboListProps = {
  combos: Combo[]
  title: string
  description: string
  eyebrow: string
  sourceLabel: string
  headerChild?: ReactNode | null
}

export default function ComboList({
  combos,
  eyebrow,
  title,
  description,
  sourceLabel,
  headerChild,
}: ComboListProps) {
  return (
    <section className="combo-section">
      <header className="combo-section-header">
        <div>
          <p className="combo-section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="combo-section-description">{description}</p>
        </div>
        {headerChild ?? <span>{combos.length} combos</span>}
      </header>

      {combos.length > 0 ? (
        <ul className="combo-list">
          {combos.map((combo) => (
            <li className="combo-list-item" key={combo.id}>
              <article className="combo-card">
                <header>
                  <div>
                    <p className="combo-card-discipline">
                      {formatDiscipline(combo.discipline)}
                    </p>
                    <h3>{combo.name}</h3>
                  </div>
                  <span className="combo-card-source">{sourceLabel}</span>
                </header>

                <p className="combo-card-actions">
                  {formatCombo(combo.actions)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="combo-list-empty">
          <h3>No combos yet</h3>
          <p>
            Create your own sequences later and they will show up here alongside
            the starter library.
          </p>
        </div>
      )}
    </section>
  )
}
