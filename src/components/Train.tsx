import '../styles/train.css'
import { useState } from 'react'

type TrainingStatus = 'idle' | 'running' | 'paused' | 'ended';

export default function Train() {
    const [status, setStatus] = useState<TrainingStatus>('idle')

    return (
        <main className="train-screen">
            <header className="train-header">
                <p className="eyebrow">Boxing</p>
                <h1>ComboForge</h1>
                <p className="session-status">Status: {status}</p>
            </header>

            <section className="timer-panel">
                <p className="round-label">Round 1</p>
                <p className="timer-display">03:00</p>
            </section>

            <section className="combo-panel">
                <p className="combo-label">Current Combo</p>
                <h2>{'Lead Jab -> Rear Cross'}</h2>
                <p className="upcoming-combo">{'Next: Lead Hook -> Rear Cross'}</p>
            </section>

            <section className="training-controls">
                <button type="button" onClick={() => setStatus('running')}>
                    {status === 'paused' ? 'Resume' : 'Start'}
                </button>
                <button 
                    type="button" 
                    onClick={() => setStatus('paused')}
                    disabled={status !== 'running'}
                >
                    Pause
                </button>
                <button 
                    type="button" 
                    onClick={() => setStatus('ended')}
                    disabled={status === 'idle' || status === 'ended'}
                >
                    End
                </button>
            </section>

            <nav className="bottom-nav" aria-label="Primary Navigation">
                <button type="button" aria-current="page">Train</button>
                <button type="button">Combos</button>
                <button type="button">History</button>
                <button type="button">Settings</button>
            </nav>
        </main>
    )
}