import PageHeader from '../components/PageHeader'
import useCombos from '../hooks/useCombos'
import '../styles/combos.css'
import { formatCombo } from '../utils/combo'
import { formatDiscipline } from '../utils/discipline'

export default function CombosPage() {
  const { starterCombos, customCombos } = useCombos()

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Combos"
        description="Manage custom combinations and starter libraries."
      />

      <section className="combos-page" aria-label="Combo library">
        <section className="combo-section">
          <header className="combo-section-header">
            <div>
              <p className="combo-section-eyebrow">Built in</p>
              <h2>Starter Library</h2>
            </div>
            <span>{starterCombos.length} combos</span>
          </header>

          <ul className="combo-list">
          {starterCombos.map((combo) => (
            <li className="combo-list-item" key={combo.id}>
              <article className="combo-card">
                <header>
                  <div>
                    <p className="combo-card-discipline">
                      {formatDiscipline(combo.discipline)}
                    </p>
                    <h3>{combo.name}</h3>
                  </div>
                  <span className="combo-card-source">Starter</span>
                </header>

                <p className="combo-card-actions">
                  {formatCombo(combo.actions)}
                </p>
              </article>
            </li>
          ))}
          </ul>
        </section>

        <section className="combo-section">
          <header className="combo-section-header">
            <div>
              <p className="combo-section-eyebrow">Your work</p>
              <h2>Custom Combos</h2>
            </div>
            <span>{customCombos.length} combos</span>
          </header>

          {customCombos.length > 0 ? (
            <ul className="combo-list">
              {customCombos.map((combo) => (
                <li className="combo-list-item" key={combo.id}>
                  <article className="combo-card">
                    <header>
                      <div>
                        <p className="combo-card-discipline">
                          {formatDiscipline(combo.discipline)}
                        </p>
                        <h3>{combo.name}</h3>
                      </div>
                      <span className="combo-card-source">Custom</span>
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
              <h3>No custom combos yet</h3>
              <p>
                Create your own sequences later and they will show up here
                alongside the starter library.
              </p>
            </div>
          )}
        </section>
      </section>
    </>
  )
}
