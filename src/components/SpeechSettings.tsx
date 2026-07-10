import useSettings from '../hooks/useSettings'
import '../styles/speech-settings.css'

export default function SpeechSettings() {
  const {
    settings,
    setSpeechEnabled,
    setSpeechPitch,
    setSpeechRate,
    setSpeechVolume,
  } = useSettings()

  const speech = settings.speech

  return (
    <section className="speech-settings-form" aria-label="Speech settings">
      <header className="speech-settings-form-header">
        <h2>Speech Settings</h2>
      </header>

      <label className="speech-settings-form-field">
        <span className="speech-settings-label">Enabled</span>
        <span className="speech-settings-toggle">
          <input
            type="checkbox"
            checked={speech.enabled}
            onChange={(event) => setSpeechEnabled(event.target.checked)}
          />
        </span>
      </label>

      <label className="speech-settings-form-field">
        <span className="speech-settings-label">Rate</span>
        <span className="speech-settings-control">
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={speech.rate}
            onChange={(event) => setSpeechRate(event.target.valueAsNumber)}
          />
          <strong>{speech.rate.toFixed(1)}x</strong>
        </span>
      </label>

      <label className="speech-settings-form-field">
        <span className="speech-settings-label">Pitch</span>
        <span className="speech-settings-control">
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={speech.pitch}
            onChange={(event) => setSpeechPitch(event.target.valueAsNumber)}
          />
          <strong>{speech.pitch.toFixed(1)}</strong>
        </span>
      </label>

      <label className="speech-settings-form-field">
        <span className="speech-settings-label">Volume</span>
        <span className="speech-settings-control">
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={speech.volume}
            onChange={(event) => setSpeechVolume(event.target.valueAsNumber)}
          />
          <strong>{Math.round(speech.volume * 100)}%</strong>
        </span>
      </label>
    </section>
  )
}
