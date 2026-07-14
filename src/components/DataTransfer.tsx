import Button from './ui/Button'
import '../styles/data-transfer.css'
import { downloadJSON } from '../utils/download'
import { createAppDataExport, parseAppDataImport } from '../utils/exportImport'
import useSettings from '../hooks/useSettings'
import useCombos from '../hooks/useCombos'
import useSessionHistory from '../hooks/useSessionHistory'
import { useRef, useState, type ChangeEvent } from 'react'
import type { AppDataExport } from '../types/export'

export default function DataTransfer() {
  const { customCombos, replaceCustomCombos } = useCombos()
  const { settings, replaceSettings } = useSettings()
  const { sessionHistory: history, replaceSessionHistory } = useSessionHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const [pendingImport, setPendingImport] = useState<AppDataExport | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState<string | null>(null)

  function handleExport() {
    const payload = createAppDataExport(settings, customCombos, history)

    downloadJSON(payload, 'comboforge-export.json')
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const payload = parseAppDataImport(text)

      setPendingImport(payload)
      setImportError(null)
      setImportSuccess(null)
    } catch {
      setPendingImport(null)
      setImportSuccess(null)
      setImportError('Choose a valid ComboForge JSON export file.')
    }
  }

  function handleConfirmImport() {
    if (!pendingImport) {
      return
    }

    replaceSettings(pendingImport.data.settings)
    replaceCustomCombos(pendingImport.data.customCombos)
    replaceSessionHistory(pendingImport.data.sessionHistory)

    setPendingImport(null)
    setImportError(null)
    setImportSuccess('Import complete.')
  }

  function handleCancelImport() {
    setPendingImport(null)
    setImportError(null)
  }

  return (
    <section className="data-transfer" aria-labelledby="data-transfer-title">
      <header className="data-transfer-header">
        <h2 id="data-transfer-title">Data Transfer</h2>
        <p>Export a local backup or restore ComboForge from a JSON file.</p>
      </header>

      <div className="data-transfer-actions">
        <div className="data-transfer-action">
          <div>
            <h3>Export Data</h3>
            <p>Download settings, custom combos, and session history.</p>
          </div>
          <Button variant="primary" onClick={handleExport}>
            Export
          </Button>
        </div>

        <div className="data-transfer-action">
          <div>
            <h3>Import Data</h3>
            <p>Replace current local data with a ComboForge backup.</p>
          </div>
          <Button variant="secondary" onClick={() => inputRef.current?.click()}>
            Import
          </Button>
          <input
            id="import-file"
            type="file"
            accept=".json,application/json"
            hidden
            ref={inputRef}
            onChange={(event) => void handleImport(event)}
          />
        </div>
      </div>

      {importError ? (
        <p className="data-transfer-message data-transfer-message-error">
          {importError}
        </p>
      ) : null}

      {importSuccess ? (
        <p className="data-transfer-message data-transfer-message-success">
          {importSuccess}
        </p>
      ) : null}

      {pendingImport ? (
        <div className="data-transfer-confirmation" role="alert">
          <div>
            <h3>Confirm Import</h3>
            <p>
              This will replace current local settings, custom combos, and
              session history.
            </p>
            <dl>
              <div>
                <dt>Custom combos</dt>
                <dd>{pendingImport.data.customCombos.length}</dd>
              </div>
              <div>
                <dt>Sessions</dt>
                <dd>{pendingImport.data.sessionHistory.length}</dd>
              </div>
            </dl>
          </div>
          <div className="data-transfer-confirmation-actions">
            <Button variant="secondary" onClick={handleCancelImport}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmImport}>
              Replace
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
