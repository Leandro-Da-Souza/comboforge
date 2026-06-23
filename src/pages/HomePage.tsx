import { useNavigate } from 'react-router'
import PageHeader from '../components/PageHeader'
import { appConfig } from '../config/app.config'
import PresetSelector from '../components/PresetSelector'
import { timerPresets } from '../config/timer.config'
import { availableDisciplines } from '../data/availableDisciplines'
import { usePresetSelection } from '../hooks/usePresetSelection'
import { starterCombos } from '../data/starterCombo'
import type { TimerPreset } from '../types/timer'
import { useDisciplineSelection } from '../hooks/useDisciplineSelection'
import '../styles/home.css'
import type { SessionSetup } from '../types/session'
import QuickStart from '../components/QuickStart'
import Select from '../components/ui/Select'
import type { Discipline } from '../types/core'
import { NavLink } from 'react-router'

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

        <QuickStart
          selectedPreset={selectedPreset}
          selectedDiscipline={selectedDiscipline}
          onStart={handleTrainNavigation}
        />
      </div>

      <div className="home-setup">
        <div className="home-section-heading">
          <p className="home-kicker">Preset</p>
          <NavLink to="/combos">Custom -&gt;</NavLink>
          <Select
            label="Discipline"
            value={selectedDiscipline}
            options={availableDisciplines.map((discipline) => ({
              label: discipline,
              value: discipline,
            }))}
            onChange={(event) => {
              handleDisciplineSelect(event.target.value as Discipline)
            }}
          />
        </div>
        <PresetSelector
          presets={timerPresets}
          selectedPresetId={selectedPresetId}
          canChangePreset={true}
          onPresetSelect={handlePresetSelect}
        />
      </div>
    </section>
  )
}
