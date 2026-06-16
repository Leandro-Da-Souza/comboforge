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
  const isSetup = status === 'idle' || status === 'ended'
  const isActiveSession = status === 'running' || status === 'paused'

  function handlePresetSelect(preset: TimerPreset): void {
    setSelectedPresetId(preset.id)
    resetSession(preset.config)
  }

  return (
    <section className="train-screen">
      <SessionStatus status={status} />

      {isSetup ? (
        <PresetSelector
          presets={timerPresets}
          selectedPresetId={selectedPresetId}
          canChangePreset={canChangePreset}
          onPresetSelect={handlePresetSelect}
        />
      ) : null}
      <TimerPanel timer={timer} />

      <ComboPanel
        currentCombo={isSetup ? 'Tap Start' : 'Lead Jab -> Rear Cross'}
        upcomingCombo={
          isActiveSession ? 'Next: Lead Hook -> Rear Cross' : currentPreset.name
        }
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
