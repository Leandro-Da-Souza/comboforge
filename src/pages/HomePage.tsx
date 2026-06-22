import { useNavigate } from 'react-router'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import { appConfig } from '../config/app.config'
import PresetSelector from '../components/PresetSelector'
import DisciplineSelector from '../components/DisciplineSelector'
import { timerPresets } from '../config/timer.config'
import { availableDisciplines } from '../data/availableDisciplines'
import { usePresetSelection } from '../hooks/usePresetSelection'
import { starterCombos } from '../data/starterCombo'
import type { TimerPreset } from '../types/timer'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import type { Discipline } from '../types/core'
import { formatTime } from '../utils/time'
import '../styles/home.css'
import type { SessionSetup } from '../types/session'

export default function HomePage() {
  const { selectedPresetId, selectPreset, selectedPreset } =
    usePresetSelection(timerPresets)

  const { selectDiscipline, selectedDiscipline } = useDisciplineSelection(
    starterCombos,
    availableDisciplines[0],
  )

  const navigate = useNavigate()

  const sessionSetup: SessionSetup = {
    selectedDiscipline,
    selectedPreset,
  }

  function handleTrainNavigation() {
    void navigate('/train', {
      state: sessionSetup,
    })
  }

  function handlePresetSelect(preset: TimerPreset) {
    selectPreset(preset)
  }

  function handleDisciplineSelect(discipline: Discipline) {
    selectDiscipline(discipline)
  }

  return (
    <section className="home-screen">
      <div className="home-hero">
        <PageHeader
          eyebrow="All Combos, No Bullshit"
          title={appConfig.name}
          accountLabel="Guest Mode"
          accountHref="/settings"
        />

        <div className="home-quick-start">
          <div>
            <p className="home-kicker">Quick Start</p>
            <h2>{selectedPreset.name}</h2>
          </div>

          <dl className="home-session-summary">
            <div>
              <dt>Discipline</dt>
              <dd>{selectedDiscipline}</dd>
            </div>
            <div>
              <dt>Rounds</dt>
              <dd>{selectedPreset.config.totalRounds}</dd>
            </div>
            <div>
              <dt>Round</dt>
              <dd>{formatTime(selectedPreset.config.roundDurationSeconds)}</dd>
            </div>
            <div>
              <dt>Rest</dt>
              <dd>{formatTime(selectedPreset.config.restDurationSeconds)}</dd>
            </div>
          </dl>

          <Button
            className="home-start-button"
            variant="primary"
            onClick={handleTrainNavigation}
          >
            Start Training
          </Button>
        </div>
      </div>

      <div className="home-setup">
        <div className="home-section-heading">
          <p className="home-kicker">Preset</p>
          <h2>Choose the round format</h2>
        </div>
        <PresetSelector
          presets={timerPresets}
          selectedPresetId={selectedPresetId}
          canChangePreset={true}
          onPresetSelect={handlePresetSelect}
        />

        <div className="home-section-heading">
          <p className="home-kicker">Discipline</p>
          <h2>Choose the combo source</h2>
        </div>
        <DisciplineSelector
          disciplines={availableDisciplines}
          currentDiscipline={selectedDiscipline}
          onDisciplineSelect={handleDisciplineSelect}
        />
      </div>
    </section>
  )
}
