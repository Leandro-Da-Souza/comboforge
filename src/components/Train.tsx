import { useState } from 'react'
import { useTrainingTimer } from '../hooks/useTrainingTimer'
import { useTheme } from '../hooks/useTheme'
import '../styles/train.css'
import { formatTime } from '../utils/time'
import { timerPresets } from '../config/timer.config'
import type { TimerPreset } from '../types/timer'
import { themeOptions } from '../utils/theme'

export default function Train() {
  const [selectedPresetId, setSelectedPresetId] = useState(timerPresets[0].id)
  const currentPreset =
    timerPresets.find((preset) => preset.id === selectedPresetId) ??
    timerPresets[0]
  const {
    status,
    timer,
    startSession,
    pauseSession,
    endSession,
    resetSession,
  } = useTrainingTimer(currentPreset.config)
  const { theme: currentTheme, setTheme } = useTheme()

  const startButtonLabel =
    status === 'paused' ? 'Resume' : status === 'ended' ? 'Restart' : 'Start'

  const canPause = status === 'running'
  const canChangePreset = status === 'idle' || status === 'ended'
  const canEnd = status !== 'idle' && status !== 'ended'

  function handlePresetSelect(preset: TimerPreset): void {
    setSelectedPresetId(preset.id)
    resetSession(preset.config)
  }

  return (
    <section className="train-screen">
      <header className="train-header">
        <p className="eyebrow">{currentPreset.name}</p>
        <h1>ComboForge</h1>
        <p className="session-status">Status: {status}</p>
        <section
          className="theme-select"
          role="group"
          aria-label="Theme Selector"
        >
          {themeOptions.map((theme) => (
            <button
              type="button"
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              aria-pressed={theme.name === currentTheme}
            >
              {theme.displayName}
            </button>
          ))}
        </section>
      </header>

      <section className="preset-selector" aria-label="Timer preset">
        {timerPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-pressed={preset.id === selectedPresetId}
            disabled={!canChangePreset}
            onClick={() => handlePresetSelect(preset)}
          >
            {preset.name}
          </button>
        ))}
      </section>

      <section className="timer-panel">
        <p className="round-label">
          {timer.phase === 'round'
            ? `Round ${timer.currentRound} / ${timer.totalRounds}`
            : 'Rest'}
        </p>
        <p className="timer-display">{formatTime(timer.remainingSeconds)}</p>
      </section>

      <section className="combo-panel">
        <p className="combo-label">Current Combo</p>
        <h2>{'Lead Jab -> Rear Cross'}</h2>
        <p className="upcoming-combo">{'Next: Lead Hook -> Rear Cross'}</p>
      </section>

      <section className="training-controls">
        <button type="button" onClick={startSession}>
          {startButtonLabel}
        </button>
        <button type="button" onClick={pauseSession} disabled={!canPause}>
          Pause
        </button>
        <button type="button" onClick={endSession} disabled={!canEnd}>
          End
        </button>
      </section>
    </section>
  )
}
