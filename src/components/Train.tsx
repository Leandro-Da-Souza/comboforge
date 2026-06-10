import { useTrainingTimer } from '../hooks/useTrainingTimer'
import '../styles/train.css'
import { formatTime } from '../utils/time'

export default function Train() {
  const { status, timer, startSession, pauseSession, endSession } =
    useTrainingTimer()

  const startButtonLabel =
    status === 'paused' ? 'Resume' : status === 'ended' ? 'Restart' : 'Start'

  const canPause = status === 'running'
  const canEnd = status !== 'idle' && status !== 'ended'

  return (
    <main className="train-screen">
      <header className="train-header">
        <p className="eyebrow">Boxing</p>
        <h1>ComboForge</h1>
        <p className="session-status">Status: {status}</p>
      </header>

      <section className="timer-panel">
        <p className="round-label">
          {timer.phase === 'round' ? `Round ${timer.currentRound}` : 'Rest'}
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

      <nav className="bottom-nav" aria-label="Primary Navigation">
        <button type="button" aria-current="page">
          Train
        </button>
        <button type="button">Combos</button>
        <button type="button">History</button>
        <button type="button">Settings</button>
      </nav>
    </main>
  )
}
