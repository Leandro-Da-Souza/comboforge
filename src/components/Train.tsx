import { useState } from 'react'
import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import { timerPresets } from '../config/timer.config'
import type { TimerPreset } from '../types/timer'
import PresetSelector from './PresetSelector'
import TimerPanel from './TimerPanel'
import ComboPanel from './ComboPanel'
import TrainingControls from './TrainingControls'
import SessionStatus from './SessionStatus'

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
      <SessionStatus status={status} />
      <PresetSelector
        presets={timerPresets}
        selectedPresetId={selectedPresetId}
        canChangePreset={canChangePreset}
        onPresetSelect={handlePresetSelect}
      />

      <TimerPanel timer={timer} />

      <ComboPanel
        currentCombo={'Lead Jab -> Rear Cross'}
        upcomingCombo={'Next: Lead Hook -> Rear Cross'}
      />

      <TrainingControls
        startButtonLabel={startButtonLabel}
        onStart={startSession}
        onPause={pauseSession}
        onEnd={endSession}
        canPause={canPause}
        canEnd={canEnd}
      />
    </section>
  )
}
